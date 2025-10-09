import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
  setBannerImageFile,
  handleUpdateChannelInfo,
}) => {
  const [bannerImageFile, setLocalBannerImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (bannerImageFile) {
      const url = URL.createObjectURL(bannerImageFile);
      setPreviewUrl(url);
      setBannerImageFile(bannerImageFile);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      setBannerImageFile(null);
    }
  }, [bannerImageFile, setBannerImageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        setFileError('Please upload a JPEG or PNG image.');
        setLocalBannerImageFile(null);
        return;
      }
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB.');
        setLocalBannerImageFile(null);
        return;
      }
      setFileError('');
      setLocalBannerImageFile(file);
    } else {
      setFileError('');
      setLocalBannerImageFile(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[210] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Channel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creator Name</label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full h-32 focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
              {bannerImage && !previewUrl &&(
                <div className="mt-2 mb-2">
                  <img src={bannerImage} alt="Current Banner" className="w-full h-32 object-cover rounded-md" />
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileChange}
                className="mt-1 p-2 border rounded-md w-full text-sm"
              />
              {previewUrl && (
                <div className="mt-2 mb-2">
                  <img src={previewUrl} alt="Banner Preview" className="w-full h-32 object-cover rounded-md" />
                </div>
              )}
              {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instagram */}
            <div className="flex items-center space-x-3">
              <FaInstagram className="w-6 h-6 text-pink-500" />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/yourhandle"
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-pink-500"
              />
            </div>
            {/* TikTok */}
            <div className="flex items-center space-x-3">
              <FaTiktok className="w-6 h-6" />
              <input
                type="text"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@yourhandle"
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-black"
              />
            </div>
            {/* LinkedIn */}
            <div className="flex items-center space-x-3">
              <FaLinkedin className="w-6 h-6 text-blue-500" />
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/yourhandle"
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Twitter */}
            <div className="flex items-center space-x-3">
              <FaXTwitter className="w-6 h-6" />
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/yourhandle"
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button
            onClick={async () => {
              const result = await handleUpdateChannelInfo();
              if (result && result.success) {
                toast.success('Channel information updated successfully!');
                onClose();
              }
            }}
            className="bg-[#541011] text-white p-2 rounded-md hover:bg-red-800 transition-colors"
            disabled={fileError || !creatorName.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;