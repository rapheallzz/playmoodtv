import axios from 'axios';

const uploadToR2 = async (file, uploadUrl, contentType, onProgress) => {
  const response = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': contentType,
    },
    onUploadProgress: (progressEvent) => {
      const progress = progressEvent.total
        ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
        : 0;
      onProgress(progress);
    },
  });
  return response.data;
};

const uploadService = {
  uploadToR2,
};

export default uploadService;
