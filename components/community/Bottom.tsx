import { DraftingCompassIcon, PenIcon } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const Bottom: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4">
    <div className='min-h-16 bg-white/30 shadow-gray-500 shadow-xl rounded-xl border border-white/20 backdrop-blur-2xl w-80 px-4 flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <div className='w-10 h-10 bg-black/20 rounded-full'></div>
        <h3 className='text-[#5e5e5e] font-semibold'>Name</h3>
      </div>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.85 }}  className={`text-blue-700 bg-blue-100 border border-blue-200 w-10 h-10 rounded-xl shadow-blue-300 shadow-md flex items-center justify-center`}><PenIcon/></motion.button>
    </div>
    </div>
  )
}

export default Bottom
