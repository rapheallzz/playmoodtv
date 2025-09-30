import axios from 'axios';

const uploadToCloudinary = async (file, signatureData, resourceType, onProgress) => {
  const cloudName = 'di97mcvbu';
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

  const uploadParams = {
    api_key: signatureData.api_key,
    timestamp: signatureData.timestamp,
    signature: signatureData.signature,
  };

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const response = await axios.post(
      uploadUrl,
      chunk, // Send the raw chunk data
      {
        headers: {
          'Content-Type': 'application/octet-stream', // Set content type for raw data
          'X-Unique-Upload-Id': uniqueUploadId,
          'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
        },
        params: uploadParams, // Pass signature data as query params
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