"use client"

import { signIn } from "next-auth/react";
import Google from "@/icon/Google";
import Arrow from "@/icon/Arrow";
import { motion } from "motion/react"
import {  useState } from "react";
import Footer from "@/components/Footer";
import { AuthContextType, useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import {  CrownIcon, EyeIcon, FastForward, MessageCircleMore, PenIcon } from "lucide-react";

export default function Home() {
  const {session} = useAuth() as AuthContextType
  const [isSigning, setIsSigning] = useState<boolean>(false)

 

  return (
    <div className=" min-h-dvh flex flex-col items-center overflow-hidden">

      {/* Header Section */}
      <header className="w-full p-4 mb-8 flex justify-between items-center">
        <div className="text-3xl font-bold text-[#6ca8e8]">AGC<span className="text-[#e28f8f]">.</span><span className="text-[#7D7D7D] font-semibold text-[24px]">Info</span></div>
        {/* You can add navigation links or user profile here if needed */}
      </header>

      {/* Welcome Section */}
      <section className="w-full max-w-4xl text-black p-8 mb-8 text-center relative overflow-hidden">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Welcome to our Platform
        </h1>
        <p className="text-lg sm:text-xl opacity-90">
          Find the best services and connect instantly
        </p>

        { !session && <motion.button
        onClick={async () => {
          setIsSigning(true)
          await signIn("google")
          setTimeout(() => {
            setIsSigning(false)
          }, 500)
        }}
        whileTap={{ scale: 0.95 }}
        disabled={isSigning}
        className="py-5"
        >
        <div className="flex items-center justify-center w-48 px-4 h-14 rounded-2xl cursor-pointer bg-[#ffffff] border border-black/20 overflow-hidden relative">
          <div className={`w-full flex items-center justify-around overflow-hidden transition-all duration-100
                ${isSigning ? "opacity-0" : "opacity-100"}
              `}>
            <Google />
            <h1 className="text-lg text-black">Get Started</h1>
            <Arrow />
          </div>
          {isSigning && <span className="spinner w-8 aspect-square absolute" />}
        </div>
      </motion.button>}

       {session && <motion.button
        onClick={async () => {
          setIsSigning(true)
          redirect("/dashboard")
          setTimeout(() => {
            setIsSigning(false)
          }, 500)
        }}
        whileTap={{ scale: 0.95 }}
        disabled={isSigning}
        className="py-5"
        >
        <div className="flex items-center justify-center w-64 px-4 h-14 rounded-2xl cursor-pointer text-blue-500 bg-[#ffffff] border border-black/20 overflow-hidden relative">
          <div className={`w-full flex items-center justify-around overflow-hidden transition-all duration-100
                ${isSigning ? "opacity-0" : "opacity-100"}
              `}>
            <EyeIcon/>
            <h1 className="text-lg text-black">Go to Dashboard</h1>
            <Arrow />
          </div>
          {isSigning && <span className="spinner w-8 aspect-square absolute" />}
        </div>
      </motion.button>}

      </section>

      

      {/* Offerings Section */}
      <section className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Q&A Platform */}
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm ">
            <div className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0">
              <CrownIcon/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Q&A Platform</h3>
              <p className="text-gray-700 text-sm">
                A platform where students can ask questions, share challenges, and connect with peers to get clear, accurate, and objective answers.
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="flex items-start p-4 bg-green-50 rounded-lg shadow-sm">
            <div className="w-8 h-8 text-green-600 mr-4 flex-shrink-0">
              <FastForward/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Quick Access</h3>
              <p className="text-gray-700 text-sm">
                Your go-to hub for study materials, including handmade notes, assignments, past papers, and the latest timetables.
              </p>
            </div>
          </div>

          {/* Attendance Monitor */}
          <div className="flex items-start p-4 bg-purple-50 rounded-lg shadow-sm">
            <div className="w-8 h-8 text-purple-600 mr-4 flex-shrink-0">
              <PenIcon/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Attendance Monitor</h3>
              <p className="text-gray-700 text-sm">
                Stay organized with real-time attendance tracking and quick percentage calculations.
              </p>
            </div>
          </div>

          {/* Global Chats */}
          <div className="flex items-start p-4 bg-red-50 rounded-lg shadow-sm">
            <div className="w-8 h-8 text-red-600 mr-4 flex-shrink-0">
              <MessageCircleMore/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Global Chats</h3>
              <p className="text-gray-700 text-sm">
                Connect with students worldwide, share ideas, ask questions, and learn through real-time conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voting System Section */}
      <section className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Voting System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Votes Card */}
          <div className="bg-orange-100 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-100 ease-in-out transform hover:scale-105 mb-4">
              Monthly votes
            </button>
            <p className="text-gray-800 text-lg font-medium">
              Have an idea or need something extra? We&apos;re always ready to add new features on demand, just let us know what you need!
            </p>
            <div className="flex-1"/>
          </div>

          {/* Weekly Votes Card */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-100 ease-in-out transform hover:scale-105 mb-4">
              Weekly votes
            </button>
            <p className="text-gray-800 text-lg font-medium">
              We consistently provide the most essential study materials every week—curated to match your academic needs and support your ongoing learning.
            </p>
            <div className="flex-1"/>
          </div>
        </div>
      </section>

      <div className="p-5" />

      <div className="w-dvw">
        <Footer />
      </div>


    </div>
  );
}