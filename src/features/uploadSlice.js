import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import uploadService from './uploadService';
import BASE_API_URL from '../apiConfig';

const initialState = {
  uploads: [],
  isUploading: false,
};

export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (uploadData, thunkAPI) => {
    const {
      videoFile,
      thumbnailFile,
      videoMetadata,
      previewStart,
      previewEnd,
      duration,
    } = uploadData;

    const { user, userToken } = thunkAPI.getState().auth;
    if (!user || !userToken) {
      return thunkAPI.rejectWithValue('User not authenticated.');
    }

    const uploadId = uuidv4();
    thunkAPI.dispatch(
      addUpload({
        id: uploadId,
        fileName: videoFile.name,
        title: videoMetadata.title,
      })
    );

    try {
      // Step 1A: Get Permission (Presigned URL) for Video
      const videoSignatureFormData = new FormData();
      videoSignatureFormData.append('provider', 'r2');
      videoSignatureFormData.append('fileName', videoFile.name);
      videoSignatureFormData.append('contentType', videoFile.type);

      const videoSignatureResponse = await axios.post(
        `${BASE_API_URL}/api/content/signature`,
        videoSignatureFormData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const { uploadUrl: videoUploadUrl, key: videoKey, publicUrl: videoPublicUrl } = videoSignatureResponse.data;

      // Step 2A: Perform the Actual Upload for Video
      await uploadService.uploadToR2(
        videoFile,
        videoUploadUrl,
        videoFile.type,
        (progress) => {
          thunkAPI.dispatch(updateUploadProgress({ id: uploadId, progress }));
        }
      );

      let thumbnailData = null;
      if (thumbnailFile) {
        // Step 1B: Get Permission (Presigned URL) for Thumbnail
        const thumbSignatureFormData = new FormData();
        thumbSignatureFormData.append('provider', 'r2');
        thumbSignatureFormData.append('fileName', thumbnailFile.name);
        thumbSignatureFormData.append('contentType', thumbnailFile.type);

        const thumbSignatureResponse = await axios.post(
          `${BASE_API_URL}/api/content/signature`,
          thumbSignatureFormData,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const { uploadUrl: thumbUploadUrl, key: thumbKey, publicUrl: thumbPublicUrl } = thumbSignatureResponse.data;

        // Step 2B: Perform the Actual Upload for Thumbnail
        await uploadService.uploadToR2(
          thumbnailFile,
          thumbUploadUrl,
          thumbnailFile.type,
          () => {} // Not tracking thumbnail progress
        );

        thumbnailData = {
          url: thumbPublicUrl || thumbUploadUrl,
          key: thumbKey,
        };
      }

      // Step 3: Create the Record
      const finalPayload = {
        ...videoMetadata,
        userId: user.userId,
        previewStart,
        previewEnd,
        duration,
        languageCode: 'en-US',
        video: {
          url: videoPublicUrl || videoUploadUrl,
          key: videoKey,
        },
        thumbnail: thumbnailData || undefined,
      };

      await axios.post(
        `${BASE_API_URL}/api/content`,
        finalPayload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      thunkAPI.dispatch(setUploadSuccess({ id: uploadId }));
      return { id: uploadId };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Upload failed.';
      thunkAPI.dispatch(setUploadError({ id: uploadId, error: errorMessage }));
      return thunkAPI.rejectWithValue({ id: uploadId, error: errorMessage });
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addUpload: (state, action) => {
      state.uploads.push({
        id: action.payload.id,
        fileName: action.payload.fileName,
        title: action.payload.title,
        status: 'pending',
        progress: 0,
        error: null,
      });
    },
    updateUploadProgress: (state, action) => {
      const upload = state.uploads.find((u) => u.id === action.payload.id);
      if (upload) {
        upload.progress = action.payload.progress;
        upload.status = 'uploading';
      }
    },
    setUploadSuccess: (state, action) => {
      const upload = state.uploads.find((u) => u.id === action.payload.id);
      if (upload) {
        upload.status = 'completed';
        upload.progress = 100;
      }
    },
    setUploadError: (state, action) => {
      const upload = state.uploads.find((u) => u.id === action.payload.id);
      if (upload) {
        upload.status = 'failed';
        upload.error = action.payload.error;
      }
    },
    clearCompletedUploads: (state) => {
      state.uploads = state.uploads.filter(
        (u) => u.status !== 'completed' && u.status !== 'failed'
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.isUploading = false;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.isUploading = false;
      });
  },
});

export const {
  addUpload,
  updateUploadProgress,
  setUploadSuccess,
  setUploadError,
  clearCompletedUploads,
} = uploadSlice.actions;

export default uploadSlice.reducer;
