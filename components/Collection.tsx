import React, { useState } from 'react'
import {  motion } from 'motion/react';
import { collectionType } from '@/app/collections/page'
import { PinIcon, PlusIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { AuthContextType, useAuth } from '@/contexts/AuthContext';

interface CollectionPropsType {
    collection : collectionType;
}

const Collection: React.FC<CollectionPropsType> = ({collection}) => {
    const {session} = useAuth() as AuthContextType
    const [isAdded, setIsAdded] = useState(false)

    const addCollection = async () => {

        const responce = await fetch("/api/collection", {
            method: "PUT",
            body : JSON.stringify({collectionId : collection.id, userId: session?.user.id})
        })

        const data = await responce.json();

        if(data.status = 200) setIsAdded(true);
    }

    return (
        <div key={collection.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 max-[500px]:w-full min-w-[30%]">
            <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800 ml-2">{collection.title}</h3>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => {addCollection()}}  className='h-8 w-8 ml-auto hover:bg-green-100 border hover:border-green-300 border-white/10  rounded-full flex justify-center items-center'>
                        {!isAdded?<PlusIcon className="w-5 h-5 text-green-600" />:<PinIcon  className="w-5 h-5 text-green-600" />}
                    </motion.button>
            </div>
            <p className="text-sm text-gray-600 mb-2 capitalize">Type: {collection.type}</p>
            {collection.items && collection.items.length > 0 && (
                <p className="text-sm text-gray-500 ">Items: {collection.items.join(', ')}</p>
            )}
            <motion.button onClick={() => redirect(`/collections/${collection.id}`)} className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Details &rarr;</motion.button>
        </div>
    )
}

export default Collection
