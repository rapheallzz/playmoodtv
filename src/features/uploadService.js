import axios from 'axios';

const uploadToCloudinary = async (file, signatureData, resourceType, onProgress) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  const chunkSize = 20 * 1024 * 1024; // 20MB

  if (resourceType === 'image' || file.size < chunkSize) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('signature', signatureData.signature);
    formData.append('timestamp', signatureData.timestamp);
    formData.append('api_key', signatureData.api_key);

    const response = await axios.post(uploadUrl, formData, {
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.total
          ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
          : 0;
        onProgress(progress);
      },
    });
    return response.data;
  }

  const uniqueUploadId = `uqid-${Date.now()}`;
  let start = 0;
  let finalResponse;

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    // Use FormData for each chunk, which is the reliable method for signed uploads.
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('api_key', signatureData.api_key);
    formData.append('timestamp', signatureData.timestamp);
    formData.append('signature', signatureData.signature);

    const response = await axios.post(
      uploadUrl,
      formData,
      {
        headers: {
          'X-Unique-Upload-Id': uniqueUploadId,
          'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
        },
        onUploadProgress: (progressEvent) => {
          const chunkLoaded = progressEvent.loaded;
          const totalLoaded = start + chunkLoaded;
          const progress = Math.round((totalLoaded / file.size) * 100);
          onProgress(progress);
        },
      }
    );

    finalResponse = response.data;
    start = end;
  }

  return finalResponse;
};

const uploadService = {
  uploadToCloudinary,
};

export default uploadService;