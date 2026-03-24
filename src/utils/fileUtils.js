export const getFileContentType = (file) => {
  if (!file) return '';

  const extension = file.name?.split('.').pop()?.toLowerCase();
  if (extension === 'heic') {
    return 'image/heic';
  }

  if (file.type) return file.type;

  return '';
};
