"use client"

import { AuthContextType, useAuth } from '@/contexts/AuthContext'
import { DraftingCompassIcon, InfoIcon, LogOutIcon, MenuIcon, SearchIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { StateContextType, useStateContext } from '@/contexts/StateContext'

const Navbar: React.FC = () => {
  const {collectionSearch, setCollectionSearch} = useStateContext() as StateContextType;
  const { session } = useAuth() as AuthContextType
  const pathname = usePathname();
  const [showProfileOptions, setShowProfileOptions] = useState<boolean>(false)
  const [menuToggle, setMenuToggle] = useState<boolean>(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      redirect('/collections');
    }
  };

  const varifyPath = (arr: string) => {
    if(arr === "/") return true;
    const commPath = '/communities';
    const newArr = arr.slice(0,12);

    if(newArr == commPath) return true;

    return false;
  }
  

  if(varifyPath(pathname)) return;

  return (
    <div className='w-full flex justify-between p-4'>
      <div className='flex gap-2 items-center relative'>
        <div className='sm:w-12 w-10 aspect-square bg-black rounded-full relative overflow-hidden'
          onClick={() => { setShowProfileOptions(!showProfileOptions) }}
        >
          {session?.user?.image && <Image
            src={session.user.image}
            alt={"pp"}
            fill
            className='object-cover'
          />}
        </div>
        <h1 className='sm:text-lg text-md font-semibold max-[600px]:flex max-[750px]:hidden'>{session?.user?.name}</h1>

        <div className={`${showProfileOptions ? "w-44 p-2 border border-black/10" : "w-0 p-0"} transition-all duration-300 flex flex-col gap-2 overflow-hidden bg-white shadow-lg shadow-gray-300 rounded-xl absolute top-16 left-0 text-white`}>
          <motion.button
            className='flex gap-2 text-gray-400 w-40 h-8 overflow-hidden hover:bg-gray-100 p-1 rounded-lg'
            whileTap={{ scale: 0.95 }}
          >
            <UserIcon/>
            <h3 className=''>Profile</h3>
          </motion.button>
          <motion.button
            className='flex gap-2 text-red-400 w-40 h-8 overflow-hidden hover:bg-red-100 p-1 rounded-lg'
            whileTap={{ scale: 0.95 }}
            onClick={() => { signOut() }}
          >
            <LogOutIcon />
            <h3 className=''>Log out</h3>
          </motion.button>
        </div>

      </div>

      <div className='z-50 flex gap-3 relative items-center min-w-10 min-h-10'>
        {pathname === "/dashboard" && <><motion.button initial={{scale: 0}} animate={{scale:1}} onClick={() => {redirect("/collections")}} className='absolute px-2 max-[600px]:hidden'>
          <SearchIcon className='text-blue-700'/>
        </motion.button>
          <motion.input  initial={{scale: 0}} animate={{scale:1}}  onChange={(e) => {setCollectionSearch(e.target.value)}} value={collectionSearch} onKeyDown={handleKeyDown} type='search' onSubmit={() => { redirect("/collections") }} className=' max-[600px]:hidden bg-blue-100 border border-black/10 shadow-lg shadow-gray-200 w-96 pl-10 pr-2 py-2 rounded-xl' placeholder='Browse Collections' /></>}
        {pathname === "/dashboard" && <motion.button initial={{scale: 0}} animate={{scale:1}} whileTap={{ scale: 0.95 }} onClick={() => { redirect("/collections") }} className={`min-[600px]:hidden text-blue-700 bg-blue-100 border border-blue-300 w-10 h-10 rounded-xl flex items-center justify-center`}><SearchIcon /></motion.button>}
        {pathname !== "/dashboard" && <motion.button initial={{scale: 0}} animate={{scale:1}} whileTap={{ scale: 0.95 }} onClick={() => { redirect("/dashboard") }} className={`text-green-700 bg-green-100 border border-green-300 w-10 h-10 rounded-xl flex items-center justify-center`}><DraftingCompassIcon /></motion.button>}
        <motion.button initial={{scale: 0}} animate={{scale:1}} whileTap={{ scale: 0.95 }} onClick={() => { redirect("/") }} className={`text-green-700 bg-green-100 border border-green-300 w-10 h-10 rounded-xl flex items-center justify-center`}><InfoIcon /></motion.button>
        <div className='relative h-full flex items-center'>
          <motion.button initial={{scale: 0}} animate={{scale:1}} whileTap={{ scale: 0.95 }} onClick={() => {setMenuToggle(!menuToggle)}} className={`text-black-700 bg-black-100 border border-black-300 w-10 h-10 rounded-xl flex items-center justify-center`}><MenuIcon /></motion.button>
            <div className={`absolute top-full -right-4 h-96 ${menuToggle?"w-64  rounded-bl-xl shadow-gray-300 shadow-2xl":"w-0"} transition-all duration-300 overflow-hidden bg-gradient-to-b from-[#E8EEF2] to-white`}></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
