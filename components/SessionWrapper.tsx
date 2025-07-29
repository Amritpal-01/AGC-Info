"use client"

import React from 'react'
import { SessionProvider } from "next-auth/react"

// Define the props interface for SessionWrapper
interface SessionWrapperProps {
  children: React.ReactNode;
}

const SessionWrapper = ({ children }: SessionWrapperProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default SessionWrapper