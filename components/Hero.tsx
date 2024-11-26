'use client'

import React from 'react'
import { useSession, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import LinearProgress from '@mui/joy/LinearProgress';




const Hero = () => {
    
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen bg-black"><LinearProgress /></div>
  }

  const renderUnauthenticatedHero = () => (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Discover the Future of Tech</h1>
          <p className="text-xl mb-8">
            Join our innovative platform and unlock endless possibilities. Sign up now to experience a tailored tech journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" variant="default" onClick={()=> signIn()}>Sign Up</Button>
            <Button size="lg" variant="outline" className='text-black' onClick={()=> signIn()}>Learn More</Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
          alt="Tech Future"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-9xl font-bold text-white opacity-20">?</span>
        </div>
      </div>
    </div>
  )

  const renderGoogleAuthenticatedHero = () => (
    <div className="flex flex-col lg:flex-row-reverse h-screen bg-black text-white">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Welcome, {session?.user?.name}!</h1>
          <p className="text-xl mb-8">
            Your Google-powered workspace is ready. Dive into a world of innovation and collaboration.
          </p>
          <Card className="w-full bg-gray-800 text-white mb-8">
            <CardHeader>
              <CardTitle>Your Tech Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Email:</strong> {session?.user?.email}</p>
              <p><strong>Account Type:</strong> Google</p>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" variant="default">My Dashboard</Button>
            <Button size="lg" variant="outline" className='text-black'>Explore Features</Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
          alt="Google Workspace"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )

  const renderGitHubAuthenticatedHero = () => (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Welcome, {session?.user?.name}!</h1>
          <p className="text-xl mb-8">
            Your GitHub-connected developer hub is ready. Let&apos;s build something extraordinary.
          </p>
          <Card className="w-full bg-gray-800 text-white mb-8">
            <CardHeader>
              <CardTitle>Developer Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>GitHub Username:</strong> {session?.user?.name}</p>
              <p><strong>Account Type:</strong> GitHub</p>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" variant="default">View Projects</Button>
            <Button size="lg" variant="outline" className='text-black'>Collaborate</Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
          alt="GitHub Workspace"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )

  if (status === "unauthenticated") {
    return renderUnauthenticatedHero()
  }

  if (session?.user?.image?.includes('googleusercontent.com')) {
    return renderGoogleAuthenticatedHero()
  }

  // Assuming GitHub login for any other case
  return renderGitHubAuthenticatedHero()
}

export default Hero

