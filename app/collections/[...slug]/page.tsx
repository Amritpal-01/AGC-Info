"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Link, MoveLeft, NotepadTextDashed, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'; // Import useParams

export interface IHyperlink {
  title: string;
  description: string;
  link: string;
}

export interface IVideo {
  title: string;
  description: string;
  link: string;
}

export interface ISyllabusItem {
  title: string;
  description: string;
  image: string;
}

// Interface for the 'blog' object
export interface IBlog {
  id: string;
  thumbnail: string | null;
  title: string;
  description: string;
  hyperlinks: IHyperlink[] | null;
  videos: IVideo[] | null;
  syllabus: ISyllabusItem[] | null;
}

// Interface for the main document
export interface IMainDocument {
  id: string;
  blog: IBlog;
}


const Page = () => {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState<IBlog | null>(null)

  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch("/api/mainDocument", {
        method: "POST",
        body: JSON.stringify({ id: slug })
      })

      const data = await res.json()

      setBlog(data.doc.blog)
    }
    getDoc()
  }, [slug]);

  const renderCard = (title: string, description: string, linkOrImage: string, isImage?: boolean) => (
    <div className='flex flex-col p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
      <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
      <p className='text-sm text-gray-600 mt-1'>{description}</p>
      {isImage ? (
        <img src={linkOrImage} alt={title} className='mt-2 rounded-lg object-cover w-full h-auto' />
      ) : (
        <a href={linkOrImage} target="_blank" rel="noopener noreferrer" className='mt-2 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium'>
          View Resource
        </a>
      )}
    </div>
  );

  if (!blog) return;

  return (
    <div>
      <Navbar />
      <main className='min-h-dvh flex flex-col items-center py-8'>
        <div className='w-full max-w-6xl p-4 md:p-8 flex flex-col gap-8 '>

          {/* Title and Description */}
          <div className='flex flex-col gap-2'>
            <button className='text-blue-700 flex gap-2' onClick={() => {redirect("/collections")}}><MoveLeft/> Get Back</button>
            <h1 className='text-gray-900 font-extrabold text-3xl md:text-5xl tracking-tight'>
              {blog.title}
            </h1>
            <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
              {blog.description}
            </p>

            <div className='text-red-600'><b>Disclamer : </b>All this data is AI generated for testing purposes</div>
          </div>

          {/* Thumbnail Image - Conditionally rendered */}
          {blog.thumbnail && (
            <img
              src={blog.thumbnail}
              alt={`${blog.title} thumbnail`}
              className='w-full max-h-96 object-cover rounded-xl shadow-lg'
            />
          )}

          {/* Hyperlinks Section - Conditionally rendered */}
          {blog.hyperlinks && blog.hyperlinks.length > 0 && (
            <section className='flex flex-col gap-4'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex gap-2 items-center'><Link className='text-blue-400 h-10 w-10' /> Hyperlinks</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {blog.hyperlinks.map((link, index) => (
                  <div key={index}>
                    {renderCard(link.title, link.description, link.link)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Videos Section - Conditionally rendered */}
          {blog.videos && blog.videos.length > 0 && (
            <section className='flex flex-col gap-4'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800  flex gap-2 items-center'><Video className='text-red-400 h-10 w-10' /> Videos</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {blog.videos.map((video, index) => (
                  <div key={index}>
                    {renderCard(video.title, video.description, video.link)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Syllabus Section - Conditionally rendered */}
          {blog.syllabus && blog.syllabus.length > 0 && (
            <section className='flex flex-col gap-4'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex gap-2 items-center'><NotepadTextDashed className='text-green-400 h-10 w-10' /> Syllabus</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {blog.syllabus.map((item, index) => (
                  <div key={index}>
                    {renderCard(item.title, item.description, item.image, true)}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Page