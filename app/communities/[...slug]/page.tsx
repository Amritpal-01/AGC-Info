"use client"
import Left from '@/components/community/Left'
import Menu from '@/components/community/Menu'
import Bottom from '@/components/community/Bottom'
import React, { useState } from 'react'
import Chats from '@/components/community/Chats'

const Page: React.FC = () => {
  const [isChatToggle, setIsChatToggle] = useState<boolean>(false)

  return (
    <div className='flex flex-col w-dvw h-dvh overflow-hidden relative'>
      <div className='flex flex-1'>
        <Left />
        <div className='flex flex-1'>
          <Menu isChatToggle={isChatToggle} setIsChatToggle={setIsChatToggle} />
          <Chats isChatToggle={isChatToggle} setIsChatToggle={setIsChatToggle} />
        </div>
      </div>
      <Bottom />
    </div>
  )
}

export default Page
