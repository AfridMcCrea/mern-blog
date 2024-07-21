import React from 'react'
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useEffect , useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSucess } from '../redux/user/userSlice';
export default function DashSideBar() {
    const [tab , setTab] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
  
    useEffect(()=>{
            const urlParams = new URLSearchParams(location.search);
            const tabFormUrl = urlParams.get('tab');
            if(tabFormUrl){
              setTab(tabFormUrl);
            };
    } , [location.search] );
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              label={"User"}
              active={tab === "profile"}
              icon={HiUser}
              labelColor="dark"
              as = 'div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item onClick={handleSignOut} className="curson-pointer" icon={HiArrowSmRight}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
