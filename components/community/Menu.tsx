import { Globe } from 'lucide-react';
import React from 'react'

interface MenuPropsType {
    isChatToggle: boolean;
    setIsChatToggle: (panel: boolean) => void;
}

const Menu: React.FC<MenuPropsType> = ({ isChatToggle, setIsChatToggle }) => {
    return (
        <div className='h-full bg-[#e5e7eb] w-72 max-[800px]:w-full py-8 px-2 flex flex-col gap-2'>
            <div className='flex items-center gap-2 pb-4'>
                <div className='w-10 h-10 bg-black/20 rounded-full'></div>
                <h3 className='text-[#5e5e5e] font-bold text-lg'>Community name</h3>
            </div>
            <button onClick={() => {setIsChatToggle(true)}} className='p-2 flex items-center gap-2 text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-xl'><Globe className='h-5 w-5' /> <h1 className='font-semibold'>Globle</h1></button>
            <div className='h-[1px] w-full bg-black/10'></div>
            <button className='p-2 flex items-center gap-2 text-gray-600  hover:bg-blue-300 rounded-xl'> <h1 className='font-semibold'>Catagory 1</h1></button>
            <button className='p-2 flex items-center gap-2 text-gray-600  hover:bg-blue-300 rounded-xl'> <h1 className='font-semibold'>Catagory 2</h1></button>
            <button className='p-2 flex items-center gap-2 text-gray-600  hover:bg-blue-300 rounded-xl'> <h1 className='font-semibold'>Catagory 3</h1></button>

        </div>
    )
}

export default Menu
