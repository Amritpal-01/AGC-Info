"use client"

import Navbar from '@/components/Navbar'
import { AuthContextType, useAuth } from '@/contexts/AuthContext'
// import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Users,
  MessageSquare,
  PlusCircle,
  Lock,
  Globe,
  HelpCircle,
  Search,
  ViewIcon
} from 'lucide-react'; // Importing icons from lucide-react
import Footer from '@/components/Footer'

// Mock data for demonstration purposes
interface Collection {
  id: string;
  name: string;
  type: 'course' | 'timetable' | 'notes' | 'assignments' | 'other';
  isPublic: boolean;
  items?: string[]; // Example items within a collection
}

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
  const { session } = useAuth() as AuthContextType

  // State for mock collections (initially empty to show 'create collection' option)
  // const [collections, setCollections] = useState<Collection[]>([]);
  const [collections] = useState<Collection[]>([
    { id: 'c1', name: 'Web Dev 101', type: 'course', isPublic: false, items: ['HTML Basics', 'CSS Styling'] },
    { id: 'c2', name: 'Fall 2024 Schedule', type: 'timetable', isPublic: true, items: ['Monday Classes', 'Exam Dates'] },
    { id: 'c3', name: 'Physics Notes', type: 'notes', isPublic: false, items: ['Chapter 1', 'Formulas'] },
    { id: 'c4', name: 'Math Homework', type: 'assignments', isPublic: false, items: ['Assignment 1', 'Assignment 2'] },
  ]);


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





  // Helper function to get icon based on collection type
  const getCollectionIcon = (type: Collection['type']) => {
    switch (type) {
      case 'course': return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case 'timetable': return <Calendar className="w-5 h-5 text-green-500" />;
      case 'notes': return <ClipboardList className="w-5 h-5 text-yellow-500" />;
      case 'assignments': return <BookOpen className="w-5 h-5 text-red-500" />;
      default: return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };


  useEffect(() => {
    if (session === null) redirect("/")
  }, [session])

  if (!session) return <></>

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar/>
      <header className="mb-8 text-center py-5">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">Your Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back! Here&apos;s a quick overview of your academic journey.</p>
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
          <>
            {collections.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don&apos;t have any collections yet.</p>
                <button
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create New Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collections.map(collection => (
                  <div key={collection.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center mb-2">
                      {getCollectionIcon(collection.type)}
                      <h3 className="text-lg font-medium text-gray-800 ml-2">{collection.name}</h3>
                      {collection.isPublic ? (
                        <Globe className="w-4 h-4 ml-auto text-green-600" />
                      ) : (
                        <Lock className="w-4 h-4 ml-auto text-gray-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 capitalize">Type: {collection.type}</p>
                    {collection.items && collection.items.length > 0 && (
                      <p className="text-sm text-gray-500 ">Items: {collection.items.join(', ')}</p>
                    )}
                    <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Details &rarr;</button>
                  </div>
                ))}
                <div className="mt-6 text-center">
                  <button className="inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
                    <ViewIcon className="w-4 h-4 mr-2" />
                    View All Collections
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <button className="inline-flex w-full items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">

                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create New Collection
                  </button>
                </div>
              </div>
            )}



          </>
        </section>

        {/* Attendance Stats Section */}
        {/* <section className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4 cursor-pointer" >
            <h2 className="text-2xl font-semibold text-indigo-600 flex items-center">
              <BarChart2 className="w-7 h-7 mr-3 text-indigo-500" />
              Attendance Stats
            </h2>
            </div>
         
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-indigo-700">{attendanceStats.percentage}%</p>
                  <p className="text-sm text-gray-500">Overall Attendance</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-semibold text-gray-700">{attendanceStats.attendedClasses}/{attendanceStats.totalClasses}</p>
                  <p className="text-sm text-gray-500">Classes Attended</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${attendanceStats.percentage}%` }}
                ></div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800 border border-indigo-200">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="mr-2">✨</span> AI Summary
                </h3>
                <p>{attendanceStats.aiSummary}</p>
              </div>
            </div>
        </section> */}

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
                      <p className="text-sm text-gray-500 w-44">{community.topic} &bull; {community.members.toLocaleString()} members</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Join Chat &rarr;</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
                <Search className="w-4 h-4 mr-2" />
                Explore More Communities
              </button>
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
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">▲</button>
                      <span className="font-bold text-gray-700">{question.upvotes}</span>
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">▼</button>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">{question.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Asked by <span className="font-semibold">{question.user}</span> &bull; {question.timestamp}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{question.answers} Answers</span>
                      </div>
                      <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Discussion &rarr;</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
                <PlusCircle className="w-4 h-4 mr-2" />
                Ask a New Question
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Page
