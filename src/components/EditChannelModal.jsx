import React, { useState, useEffect } from 'react';

const EditChannelModal = ({
  isOpen,
  onClose,
  creatorName,
  setCreatorName,
  about,
  setAbout,
  instagram,
  setInstagram,
  tiktok,
  setTiktok,
  linkedin,
  setLinkedin,
  twitter,
  setTwitter,
  bannerImage,
  setBannerImageFile, // New prop to set the file in parent
  handleUpdateChannelInfo,
}) => {
  const [bannerImageFile, setLocalBannerImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState('');

  // Generate preview URL when a file is selected
  useEffect(() => {
    if (bannerImageFile) {
      const url = URL.createObjectURL(bannerImageFile);
      setPreviewUrl(url);
      setBannerImageFile(bannerImageFile); // Update parent state
      return () => URL.revokeObjectURL(url); // Cleanup on unmount or file change
    } else {
      setPreviewUrl(null);
      setBannerImageFile(null); // Clear parent state if no file
    }
  }, [bannerImageFile, setBannerImageFile]);

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (e.g., JPEG, PNG) and size (e.g., < 5MB)
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        setFileError('Please upload a JPEG or PNG image.');
        setLocalBannerImageFile(null);
        setPreviewUrl(null);
        setBannerImageFile(null);
        return;
      }
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB.');
        setLocalBannerImageFile(null);
        setPreviewUrl(null);
        setBannerImageFile(null);
        return;
      }
      setFileError('');
      setLocalBannerImageFile(file);
    } else {
      setFileError('');
      setLocalBannerImageFile(null);
      setPreviewUrl(null);
      setBannerImageFile(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Channel</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          {bannerImage && (
            <div className="mt-2 mb-2">
              <img
                src={bannerImage}
                alt="Current Banner"
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-xs text-gray-500 mt-1">Current banner image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            className="mt-2 p-2 border rounded w-full"
          />
          {previewUrl && (
            <div className="mt-2 mb-2">
              <img
                src={previewUrl}
                alt="Banner Preview"
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-xs text-gray-500 mt-1">Preview of new banner</p>
            </div>
          )}
          {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Creator Name</label>
          <input
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="https://instagram.com/yourhandle"
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
          <input
            type="text"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="https://tiktok.com/@yourhandle"
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/yourhandle"
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="https://twitter.com/yourhandle"
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdateChannelInfo}
            className="bg-[#541011] text-white p-2 rounded"
            disabled={fileError || !creatorName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;