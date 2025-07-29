import { AuthContextType, useAuth } from '@/contexts/AuthContext'
import { LogOutIcon } from 'lucide-react'
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
        <h1 className='text-lg font-semibold'>{session?.user?.name}</h1>

        <div className={`${showProfileOptions ? "w-44 p-2" : "w-0 p-0"} transition-all duration-300  overflow-hidden bg-[#d5d5d5]  border border-black/10 rounded-xl absolute -bottom-16 left-0 text-white`}>
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
      <div></div>
    </div>
  )
}

export default Navbar
