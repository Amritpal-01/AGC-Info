"use client"

import { AuthContextType, useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'
import React, { useEffect, useState, } from 'react'
import {
  BookOpen,
  Users,
  MessageSquare,
  PlusCircle,
  HelpCircle,
  Search,
  Eye,
  LockIcon
} from 'lucide-react'; // Importing icons from lucide-react
import { motion } from 'motion/react'
import Collection from '@/components/Collection'


interface Community {
  id: string;
  name: string;
  topic: string;
  members: number;
}

interface Question {
  id: string;
  title: string;
  user: string;
  upvotes: number;
  answers: number;
  timestamp: string;
}

const Page: React.FC = () => {
  const { session, collections } = useAuth() as AuthContextType
  const [viewAllCollectionsToggle, setViewAllCollectionsToggle] = useState<boolean>(false)


  // Mock communities the user has joined
  const joinedCommunities: Community[] = [
    { id: 'comm1', name: 'React Developers', topic: 'Frontend Frameworks', members: 15000 },
    { id: 'comm2', name: 'Data Science Enthusiasts', topic: 'AI/ML', members: 8000 },
    { id: 'comm3', name: 'Competitive Programming', topic: 'Algorithms', members: 20000 },
  ];

  // Mock user-raised questions
  const userQuestions: Question[] = [
    { id: 'q1', title: 'How to optimize React performance?', user: 'Alice', upvotes: 25, answers: 7, timestamp: '2 days ago' },
    { id: 'q2', title: 'Best resources for learning Python?', user: 'Bob', upvotes: 18, answers: 12, timestamp: '5 days ago' },
    { id: 'q3', title: 'Understanding Firestore security rules', user: 'Charlie', upvotes: 30, answers: 5, timestamp: '1 week ago' },
  ];



  useEffect(() => {
    if (session === null) redirect("/")
  }, [session])

  if (!session) return <></>

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="mb-8 text-center py-5">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">Your Dashboard</h1>
        <p className="text-lg text-gray-600 px-2">Welcome back! Here&apos;s a quick overview of your academic journey.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Collections Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h2 className="text-2xl font-semibold text-indigo-600 flex items-center">
              <BookOpen className="w-7 h-7 mr-3 text-indigo-500" />
              Collections
            </h2>
          </div>

          <div className='w-full min-h-[85%] flex flex-col'>
            {!collections && <div className='w-full h-full flex justify-center items-center'><span className="spinner w-7 aspect-square" /></div>}
            {collections?.length === 0 ? (
              <div className="text-center w-full min-h-full flex flex-col justify-end">
                <div className='flex-1 flex flex-col justify-center items-center'>
                  <LockIcon className='w-20 h-20 text-gray-300'/>
                <p className="text-gray-300 max-[600px]:text-md mb-4 font-bold text-lg">You don&apos;t own any collections yet.</p>
                </div>
                <div className='w-full flex flex-col gap-4 justify-around'>
                  <div className="text-center flex-1/2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { redirect("/collections") }} className="inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-red-600 bg-red-100 hover:bg-red-200 ">
                      <Eye className="w-5 h-5 mr-2" />
                      View All Collections
                    </motion.button>
                  </div>
                  <div className="text-center flex-1/2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { redirect("/collections") }} className="inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-green-700 bg-green-100 hover:bg-green-200 ">

                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add New Collection
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='w-full flex-1 flex flex-col justify-between gap-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collections?.map((collection, i) => {
                    if (i > 3 && !viewAllCollectionsToggle) return;
                    return <Collection key={collection.id} collection={collection} path={"dashboard"} />
                  })}
                </div>
                <div className='w-full flex flex-col gap-4 justify-around'>
                  {(collections && collections.length > 4) && <div className="text-center flex-1/2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setViewAllCollectionsToggle(!viewAllCollectionsToggle) }} className={`inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full ${viewAllCollectionsToggle? "text-green-600 bg-green-100 hover:bg-green-200":"text-red-600 bg-red-100 hover:bg-red-200"} `}>
                      <Eye className="w-5 h-5 mr-2" />
                      {viewAllCollectionsToggle?"View less":"View All Collections"}
                    </motion.button>
                  </div>}
                  <div className="text-center flex-1/2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { redirect("/collections") }} className="inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-green-700 bg-green-100 hover:bg-green-200 ">

                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add New Collection
                    </motion.button>
                  </div>
                </div>
              </div>
            )}



          </div>
        </section>

        {/* Communities Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
          <div className="flex justify-between items-center mb-4 cursor-pointer" >
            <h2 className="text-2xl font-semibold text-indigo-600 flex items-center">
              <Users className="w-7 h-7 mr-3 text-indigo-500" />
              Communities
            </h2>
          </div>
          <div>
            {joinedCommunities.length === 0 ? (
              <p className="text-gray-500 text-center py-4">You haven&apos;t joined any communities yet.</p>
            ) : (
              <ul className="space-y-3">
                {joinedCommunities.map(community => (
                  <li key={community.id} className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full p-2">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="ml-3 flex-grow">
                      <p className="font-medium text-gray-800">{community.name}</p>
                      <p className="text-sm text-gray-500">{community.topic} &bull; {community.members.toLocaleString()} members</p>
                    </div>
                    <motion.button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium min-w-20">Join Chat &rarr;</motion.button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 text-center">
              <motion.button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ">
                <Search className="w-4 h-4 mr-2" />
                Explore More Communities
              </motion.button>
            </div>
          </div>
        </section>

        {/* User Questions Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4 cursor-pointer" >
            <h2 className="text-2xl font-semibold text-indigo-600 flex items-center">
              <HelpCircle className="w-7 h-7 mr-3 text-indigo-500" />
              Your Questions
            </h2>
          </div>
          <div>
            {userQuestions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">You haven&apos;t raised any questions yet.</p>
            ) : (
              <ul className="space-y-4">
                {userQuestions.map(question => (
                  <li key={question.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <motion.button className="text-gray-400 hover:text-indigo-600 transition-colors">▲</motion.button>
                      <span className="font-bold text-gray-700">{question.upvotes}</span>
                      <motion.button className="text-gray-400 hover:text-indigo-600 transition-colors">▼</motion.button>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">{question.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Asked by <span className="font-semibold">{question.user}</span> &bull; {question.timestamp}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{question.answers} Answers</span>
                      </div>
                      <motion.button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Discussion &rarr;</motion.button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 text-center">
              <motion.button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ">
                <PlusCircle className="w-4 h-4 mr-2" />
                Ask a New Question
              </motion.button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page
