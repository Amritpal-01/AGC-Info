import { AuthContextType, useAuth } from '@/contexts/AuthContext'
import { ClubIcon, HomeIcon, LogOutIcon, MenuIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react'

const Navbar: React.FC = () => {
  const { session } = useAuth() as AuthContextType
  const [showProfileOptions, setShowProfileOptions] = useState<boolean>(false)

  return (
    <div className='w-full flex justify-between p-4'>
      <div className='flex gap-2 items-center relative'>
        <div className='w-12 aspect-square bg-black rounded-full relative overflow-hidden'
          onClick={() => { setShowProfileOptions(!showProfileOptions) }}
        >
          {session?.user?.image && <Image
            src={session.user.image}
            alt={"pp"}
            fill
            className='object-cover'
          />}
        </div>
        <h1 className='text-lg font-semibold max-[600px]:flex max-[750px]:hidden'>{session?.user?.name}</h1>

        <div className={`${showProfileOptions ? "w-44 p-2" : "w-0 p-0"} transition-all duration-300  overflow-hidden bg-white shadow-lg shadow-gray-300 border border-black/10 rounded-xl absolute -bottom-16 left-0 text-white`}>
          <motion.button 
              className='flex gap-2 text-red-400 w-40 h-8 overflow-hidden hover:bg-red-100 p-1 rounded-lg' 
              whileTap={{ scale: 0.95 }}
              onClick={() => {signOut()}}
            >
            <LogOutIcon />
            <h3 className=''>Log out</h3>
          </motion.button>
        </div>

      </div>
      
        <div className='flex gap-3 relative items-center min-w-10 min-h-10'>
          <div className='absolute px-2 max-[600px]:hidden'>
            <SearchIcon/>
          </div>
          <input className=' max-[600px]:hidden bg-blue-100 border border-black/10 shadow-lg shadow-gray-200 w-96 pl-10 pr-2 py-2 rounded-xl' placeholder='Browse Collections'/>
          <button className={`min-[600px]:hidden text-blue-700 bg-blue-100 border border-blue-300 w-10 h-10 rounded-xl flex items-center justify-center`}><SearchIcon/></button>
          <button className={`text-green-700 bg-green-100 border border-green-300 w-10 h-10 rounded-xl flex items-center justify-center`}><HomeIcon/></button>
          <button className={`text-black-700 bg-black-100 border border-black-300 w-10 h-10 rounded-xl flex items-center justify-center`}><MenuIcon/></button>
        </div>
    </div>
  )
}

export default Navbar
