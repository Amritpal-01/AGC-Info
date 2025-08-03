import React, { useState } from 'react'
import { motion } from 'motion/react';
import { collectionType } from '@/app/collections/page'
import { PinIcon, PinOff } from 'lucide-react';
import { redirect } from 'next/navigation';
import { AuthContextType, useAuth } from '@/contexts/AuthContext';

interface CollectionPropsType {
    collection: collectionType;
    path: string
}

const Collection: React.FC<CollectionPropsType> = ({ collection, path }) => {
    const { session, setUserCollections, collections } = useAuth() as AuthContextType
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const addCollection = async () => {
        setIsLoading(true)

        const responce = await fetch("/api/collection", {
            method: "PUT",
            body: JSON.stringify({ collectionId: collection.id, userId: session?.user.id })
        })

        const data = await responce.json();


        if (data.status === 200) {
            setIsAdded(true)
            if (collections) {
                setUserCollections([...collections, collection])
            } else {
                setUserCollections([collection])
            }
        };
        setIsLoading(false)
    }

    const removeCollection = async () => {
        setIsLoading(true)
        const responce = await fetch("/api/collection", {
            method: "DELETE",
            body: JSON.stringify({ collectionId: collection.id, userId: session?.user.id })
        })

        const data = await responce.json();


        if (data.status === 200) {
            if (collections) {
                const newCollection: collectionType[] = [];

                collections?.map((col) => {
                    if (col.id !== collection.id) {
                        newCollection.push(col);
                    }
                })

                setUserCollections(newCollection)
            } else {
                setUserCollections([])
            }
        };
        setIsLoading(false)
        setIsAdded(false)
    }

    return (
        <div key={collection.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 max-[500px]:w-full min-w-[30%]">
            <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800 ml-2">{collection.title}</h3>
                {(path !== "dashboard") && <motion.button whileTap={{ scale: 0.95 }} onClick={() => {
                    if (isAdded) {
                        removeCollection()
                    } else {
                        addCollection()
                    }
                }} className={`h-8 w-8 ml-auto ${isAdded ? "hover:bg-red-100 border hover:border-red-300" : "hover:bg-green-100 border hover:border-green-300"} border-white/10  rounded-full flex justify-center items-center`}>
                    {!isAdded ? <PinIcon className="w-5 h-5 text-green-600" /> : <PinOff className="w-5 h-5 text-red-600" />}
                </motion.button>}

                {(path === "dashboard") && <motion.button whileTap={{ scale: 0.95 }} onClick={removeCollection} className='h-8 w-8 ml-auto hover:bg-red-100 border hover:border-red-300 border-white/10  rounded-full flex justify-center items-center'>
                    <PinOff className="w-5 h-5 text-red-600" />
                </motion.button>}
            </div>
            <p className="text-sm text-gray-600 mb-2 capitalize">Type: {collection.type}</p>
            {collection.items && collection.items.length > 0 && (
                <p className="text-sm text-gray-500 ">Items: {collection.items.join(', ')}</p>
            )}
            <div className='flex flex-row w-full justify-between items-center mt-3'>
                <motion.button onClick={() => {
                    setIsRedirecting(true)
                    redirect(`/collections/${collection.id}`)
                }} className=" text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer min-w-20">View Details &rarr;</motion.button>
                {isRedirecting && <span className="spinner w-4 aspect-square" />}
            </div>
        </div>
    )
}

export default Collection
