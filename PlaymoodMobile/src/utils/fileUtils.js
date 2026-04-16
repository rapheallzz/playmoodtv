export const getFileContentType = (file) => {
  if (!file) return '';

  const extension = file.name?.split('.').pop()?.toLowerCase();
  if (extension === 'heic' || extension === 'heif') {
    return 'image/heic';
  }
  if (extension === 'jpg' || extension === 'jpeg') {
    return 'image/jpeg';
  }
  if (extension === 'png') {
    return 'image/png';
  }

  if (file.type) return file.type;

  return '';
};
