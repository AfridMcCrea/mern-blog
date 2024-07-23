import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

export default function CreatePage() {
  const [file , setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadEroor , setImageUplaodError] = useState(null);
  const [formData , setFormData] = useState({});
  const [publishError , setPublishError] = useState(null);
  const navigate = useNavigate();


  const handleUploadImage = async() =>{ 
      try {
        if(!file){
          setImageUplaodError('Please select an Image')
          return;
        }
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage , fileName);
        const uploadTask = uploadBytesResumable(storageRef , file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = 
            (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUplaodError('Image upload failed.');
            setImageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              setImageUplaodError(null);
              setImageUploadProgress(null);
              setFormData({...formData , image:downloadUrl});
            })
          }
        );
      } catch (error) {
        setImageUplaodError('Image Upload failed');
        setImageUploadProgress(null);
        console.log(error);
        
      }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }
      
    } catch (error) {
      setPublishError('Something went wrong');
    }

  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Title"
            id="title"
            onChange={(e)=> setFormData({...formData , title : e.target.value})}
          ></TextInput>
          <Select onChange={(e)=> setFormData({...formData , category : e.target.value})}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teel-500 border-dotted p-3">
          <FileInput type="file" accept="images/*" onChange={(e)=>setFile(e.target.files[0])}></FileInput>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {
              imageUploadProgress ? 
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} o/>
              </div>
              : ( 'Upload Image' )
            }

          </Button>
        </div>
        { imageUploadEroor && 
        <Alert color='failure'>
          {imageUploadEroor}</Alert>}
          {formData.image && (
            <img src={formData.image} alt="upload"  className="w-full h-72 object-cover"/>
          )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something...."
          className="h-72 mb-12"
          required
          onChange={(value)=>{
            setFormData({...formData, content: value});
          }}
        ></ReactQuill>
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {
          publishError && 
          <Alert color='failure' className="mt-5">
            {publishError}
          </Alert>
        }
      </form>
    </div>
  );
}
