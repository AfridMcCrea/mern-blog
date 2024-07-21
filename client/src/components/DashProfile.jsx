import { Alert, Button, FileInput, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateStart, updateSuccess, updateFailure , deleteUserStart , deleteUserSuccess , deleteUserFailure , signoutSucess } from "../redux/user/userSlice.js";
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {Link} from 'react-router-dom';
export default function DashProfile() {
  const { currentUser , error , loading} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const [imageFileUploading , setImageFileUploading] = useState(false);
  const [updateUserSuccess , setUpdateUserSucces] = useState(null);
  const [updateUserError , setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModel , setShowModel] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const handleDelete = async (e)=>{
        setShowModel(false);
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`api/user/delete/${currentUser._id}` , {
            method: 'DELETE',

          });
          const data = await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(error.message));
          }
          else{
            dispatch(deleteUserSuccess(data));
          }

          
        } catch (error) {
          
          dispatch(deleteUserFailure(error.message));
        }

  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadingError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSucces(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made.')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload.');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSucces("User's profile updated succesfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);

    }
  };

  const handleSignOut = async ()=>{
    try {
      const res = await fetch('api/user/signout' , {
        method:'post',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signoutSucess());
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleInputImage}
          ref={filePickerRef}
          hidden
        />  
        <div
          className="relative w-32 h-32 self-center shadow-md cursor-pointer overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,99, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadingError && (
          <Alert color="failure">{imageFileUploadingError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          { loading ? 'Loading..' : 'Update' }
        </Button>
        {
          currentUser.isAdmin && (
            <Link to='/create-post'>
            <Button 
              type="button"
              gradientDuoTone='purpleToPink'
              className="w-full"
            >
              Create a Post
            </Button>
            </Link>
            
          )
        }
      </form>
      <div className="text-red-500 flex justify-between mt-3">
        <span onClick={()=> setShowModel(true)} className="cursor-pointer">Delete Acount</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
      </div>
      { updateUserSuccess && <Alert color='success' className="mt-5">{updateUserSuccess}</Alert>}
      { updateUserError && <Alert color='failure' className="mt-5">{updateUserError}</Alert>}
      { error && <Alert color='failure' className="mt-5">{error}</Alert>}
      <Modal show={showModel} onClose={()=> setShowModel(false)} popup size = 'md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account ?</h3>
              <div className="flex justify-center gap-3">
                <Button onClick={handleDelete} color='failure'>Yes I'm sure.</Button>
                <Button color='gray' onClick={()=> setShowModel(false)}>No, cancel.</Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  );
}
