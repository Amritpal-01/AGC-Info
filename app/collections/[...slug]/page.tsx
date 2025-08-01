"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const Page : React.FC = () => {
  return (
    <div>
      <Navbar/>
      <main className='min-h-dvh'></main>
      <Footer/>
    </div>
  )
}

export default Page
