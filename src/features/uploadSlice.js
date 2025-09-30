import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import uploadService from './uploadService';

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
      const videoSignatureResponse = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/signature',
        { type: 'videos' },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const videoSignatureData = videoSignatureResponse.data;

      const videoUploadResponse = await uploadService.uploadToCloudinary(
        videoFile,
        videoSignatureData,
        'video',
        (progress) => {
          thunkAPI.dispatch(updateUploadProgress({ id: uploadId, progress }));
        }
      );

      let thumbnailUploadResponse = null;
      if (thumbnailFile) {
        const thumbSignatureResponse = await axios.post(
          'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/signature',
          { type: 'images' },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const thumbSignatureData = thumbSignatureResponse.data;
        thumbnailUploadResponse = await uploadService.uploadToCloudinary(
          thumbnailFile,
          thumbSignatureData,
          'image',
          () => {} // Not tracking thumbnail progress
        );
      }

      const finalPayload = {
        ...videoMetadata,
        userId: user.userId,
        previewStart,
        previewEnd,
        languageCode: 'en-US',
        video: {
          public_id: videoUploadResponse.public_id,
          url: videoUploadResponse.secure_url,
        },
        thumbnail: thumbnailUploadResponse
          ? {
              public_id: thumbnailUploadResponse.public_id,
              url: thumbnailUploadResponse.secure_url,
            }
          : undefined,
      };

      await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content',
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