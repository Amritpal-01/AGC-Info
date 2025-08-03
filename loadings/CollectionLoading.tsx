import React from 'react'

const CollectionLoading : React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 max-[500px]:w-full min-w-[30%]">
      <div className='w-full flex justify-between items-center m-1'>
        <div className='bg-white w-48 h-7 rounded-xl shadow-2xl'></div>
        <div className='w-5 h-5 bg-red-100 rounded-full'></div>
      </div>
      <div className='bg-white w-24 h-5 mt-3 rounded-xl shadow-2xl'></div>
      <div className='bg-white w-28 h-5 mt-3 rounded-xl shadow-2xl'></div>
      <div className='bg-blue-100 w-20 h-5 mt-3 rounded-xl shadow-2xl'></div>
    </div>
  )
}

export default CollectionLoading
