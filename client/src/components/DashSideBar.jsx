import React from 'react'
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useEffect , useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashSideBar() {
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
    
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item label={'User'} active={tab === 'profile'} icon={HiUser} labelColor='dark'>
                    Profile
                    </Sidebar.Item>
                </Link>
                
                <Sidebar.Item className='curson-pointer'  icon={HiArrowSmRight} >
                Sign out
                </Sidebar.Item>
                
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
