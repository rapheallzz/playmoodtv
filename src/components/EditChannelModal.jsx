import React from 'react';

const EditChannelModal = ({ isOpen, onClose, bannerImage, setBannerImage, creatorName, setCreatorName, about, setAbout, handleBannerImageChange, handleUpdateChannelInfo }) => {
  if (!isOpen) return null;

  return (
    <div className=" absolute z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-8 rounded shadow-md w-[90%] max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Channel</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerImageChange}
            className="mt-2"
          />
          {bannerImage && <img src={bannerImage} alt="Banner" className="mt-4 w-full h-32 object-cover" />}
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
          />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
          <button onClick={handleUpdateChannelInfo} className="bg-blue-500 text-white p-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;
