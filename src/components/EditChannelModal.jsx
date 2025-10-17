import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [previewUrl, setPreviewUrl] = useState();
  const [fileError, setFileError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        setFileError('Please upload a JPEG or PNG image.');
        setUpImg(null);
        return;
      }
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB.');
        setUpImg(null);
        return;
      }
      setFileError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(file);
    }
  };

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        const newUrl = window.URL.createObjectURL(blob);
        setPreviewUrl(newUrl);
        setBannerImageFile(new File([blob], fileName, { type: blob.type }));
      }, 'image/jpeg');
    });
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
              {bannerImage && !upImg &&(
                <div className="mt-2 mb-2">
                  <img src={bannerImage} alt="Current Banner" className="w-full h-32 object-cover rounded-md" />
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={onSelectFile}
                className="mt-1 p-2 border rounded-md w-full text-sm"
              />
              {upImg && (
                <div>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={makeClientCrop}
                  >
                    <img ref={imgRef} src={upImg} />
                  </ReactCrop>
                </div>
              )}
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
              setIsSaving(true);
              const result = await handleUpdateChannelInfo();
              if (result && result.success) {
                toast.success('Channel information updated successfully!');
                onClose();
              }
              setIsSaving(false);
            }}
            className="bg-[#541011] text-white p-2 rounded-md hover:bg-red-800 transition-colors"
            disabled={isSaving || fileError || !creatorName.trim()}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;