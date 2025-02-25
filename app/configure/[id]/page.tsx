"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import NavBar from '@/app/components/NavBar'

function page() {
  return (
    <div>
      <NavBar />
      <div className="mb-12 max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-3">Configure project</h1>
        <p>Configure your project and deploy it</p>
      </div>
      <div className="flex flex-col gap-4 max-w-lg px-6 py-8 border border-zinc-200 rounded-sm">
        <div>
          <Input type="text" placeholder="project name"></Input>
          <Button>Deploy repository</Button>
        </div>
      </div>
    </div>
  );
}

export default page
