import axios from 'axios';

const uploadToR2 = (file, uploadUrl, contentType, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);

    // Explicitly set only the signed headers to minimize CORS preflight issues
    xhr.setRequestHeader('Content-Type', contentType);

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error or CORS block during upload. Please ensure the R2 bucket is configured to allow CORS from this origin.'));
    };

    xhr.send(file);
  });
};

const uploadService = {
  uploadToR2,
};

export default uploadService;
