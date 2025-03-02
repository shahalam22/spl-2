'use client';
import Header from '@/components/header/Header';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

function Dashboard() {
    const authenticated = useAppSelector((state) => !!state.auth.user);

  return (  
    <>
        {authenticated? <HeaderAuth/> : <Header/>}
        <div>This is your Dashboard</div>
    </>
  )
}

export default Dashboard