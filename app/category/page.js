// THIS IS CATEGORIES PAGE. PATH: app\category\page.js

'use client';
import Header from '@/components/header/Header';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';
import CategoryPage from '@/components/mainCategoryPage/CategoryPage'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

function Category() {
  const authenticated = useAppSelector((state) => !!state.auth.user);

  return (
    <>
        {authenticated ? <HeaderAuth/> : <Header/>}
        <CategoryPage />
    </>
  )
}

export default Category