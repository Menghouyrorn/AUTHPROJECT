import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({ ...formData, profilePicture: downloadURL }));
      }
    );
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-extrabold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input type='file' ref={fileRef} onChange={(e) => setImage(e.target.files[0])} hidden accept='image/*' />
        <img src={currentUser.profilePicture} onClick={() => fileRef.current.click()} alt='profile' className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' />
        <p className='text-sm self-center'>
          {imageError ? (<span className='text-red-700'>
            Error uploading image file size must be less then 2 MB
          </span>) : imagePercent > 0 && imagePercent < 100 ? (<span className='text-black'>Uploading...</span>) : imagePercent === 100 ? <span className='text-green-700'>Image Upload successfuly</span> : ''}
        </p>
        <input type='text' defaultValue={currentUser.username} id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
        <input type='email' defaultValue={currentUser.eamil} id='eamil' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
        <input type='password' id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default Profile;