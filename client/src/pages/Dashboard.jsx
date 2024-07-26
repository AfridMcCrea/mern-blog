import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSideBar from '../components/DashSideBar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';

export default function Dashboard() {
  const [tab , setTab] = useState('');
  const location = useLocation();

  useEffect(()=>{
          const urlParams = new URLSearchParams(location.search);
          const tabFormUrl = urlParams.get('tab');
          if(tabFormUrl){
            setTab(tabFormUrl);
          };
  } , [location.search] );

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
         <DashSideBar/>
      </div>
      
        {/* profile */}
        { tab === 'profile' && <DashProfile/>}
        {/* posts */}
        {tab === 'posts' && <DashPosts/>}
        {/* users */}
        {tab === 'users' && <DashUsers/>}
        {/* comments */}
        {tab === 'comments' && <DashComments/>}
    </div>
  )
}
