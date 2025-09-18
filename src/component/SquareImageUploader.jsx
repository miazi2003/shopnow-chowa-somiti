import React, { useEffect, useState } from "react";
import axios from "axios";


const SquareImageUploader = ({ onUpload , clearKey = 0 }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
  // যখন parent clearKey বাড়াবে তখন uploader খালি হবে
  setUploadedImages([]);
  onUpload([]);
}, [clearKey]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const newUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_api_key
          }`,
          formData
        );
        const url = res.data.data.url;
        newUrls.push(url);
      } catch (err) {
        console.error("Image upload failed", err);
      }
      const updatedImages = [...uploadedImages, ...newUrls];
      setUploadedImages(updatedImages);
      onUpload(updatedImages);
      setUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    const filtered = uploadedImages.filter((url) => url !== urlToRemove);
    setUploadedImages(filtered);
    onUpload(filtered);
  };

  return (
    <div className="space-y-4">
      <label htmlFor="image-upload" className="block w-full cursor-pointer">
        <div className="w-full h-48 bg-[#A8BBA3] border-2 border-dashed border-lime-400 rounded-md flex items-center justify-center hover:border-lime-300 transition">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-black text-sm text-center">
            {uploading ? "Uploading..." : `আপনার সকল ছবিসমূহ এখানে যুক্ত করুন`} <br/> <br/> <br/>
             (সদস্যের ছবি, পরিচয় পত্র কিংবা নিবন্ধন এর ছবি,স্বাক্ষর এর ছবি, নমীনির পরিচয় পত্র কিংবা নিবন্ধন এর ছবি)
          </span>
        </div>
      </label>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {uploadedImages.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Upload ${index}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(url)}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 text-xs"
              title="Remove"
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquareImageUploader;
