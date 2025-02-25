import React from 'react'
import { Button } from '@/components/ui/button'
import NavBar from '../components/NavBar'
import { ArrowRight, LoaderCircle } from 'lucide-react';

function page() {
  return (
    <div>
      <NavBar />
      <div className='flex flex-col items-center text-center'>
        <LoaderCircle className='animate-spin' size={32} />
        <h1 className="text-2xl font-semibold mb-2">Deploying repository</h1>
        <p>This may take a few seconds, please do not refresh this page</p>
      </div>

      <h1 className='text-2xl font-semibold'>Repo deployed successfully!</h1>
      <p>Anyone with this link can view this repository</p>
      <Button>
        <ArrowRight
          size={16}
        />
        Continue to dashboard
      </Button>
      <div>
        <a href="">gitpeek.com/</a>
        <Button>Copy Link</Button>
      </div>
    </div>
  );
}

export default page
