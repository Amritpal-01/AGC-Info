import { DraftingCompassIcon, Plus } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
import { redirect } from 'next/navigation'

const Left : React.FC = () => {
  return (
    <div className='h-full min-w-18 pl-0 p-2 flex flex-col gap-2 bg-[#e5e7eb]'>
      <div className='flex-1 bg-[#f3f4f6] rounded-r-xl flex flex-col items-center gap-2 py-4 border-l-none border border-black/10 shadow-gray-400 shadow-lg'>
        <div className='h-10 w-10 bg-black/30 rounded-2xl'></div>
        <div className='h-10 w-10 bg-black/30 rounded-2xl'></div>
        <div className='h-10 w-10 bg-black/30 rounded-2xl'></div>
        <div className='h-[1px] w-full bg-black/10'></div>
        <div className='h-10 w-10 bg-green-100 rounded-2xl flex justify-center items-center text-green-700 shadow-green-300 shadow-md'>
          <Plus/>
        </div>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.85 }} onClick={() => { redirect("/dashboard") }} className={`text-green-700 bg-green-100 border border-green-200 w-10 h-10 rounded-xl shadow-green-300 shadow-md flex items-center justify-center`}><DraftingCompassIcon /></motion.button>
      </div>
    </div>
  )
}

export default Left
