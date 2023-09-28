import React from 'react';
import { MdCloudUpload } from 'react-icons/md';

const UploadImage = ({setImage}) => {
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">

    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-2 pt-5 pb-6">
            <MdCloudUpload className='text-3xl text-gray-500 ' />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click here to upload</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id='file-upload' name = "uploadimage" type="file" accept='image/*' className="hidden" 
        onChange={(e) =>  handleFileInputChange(e)}
         />
    </label>
    </div>
  )
}

export default UploadImage