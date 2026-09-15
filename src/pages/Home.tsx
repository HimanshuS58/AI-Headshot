import React from 'react'
import Hero from '../components/Hero'
import UploadCard from '../components/UploadCard'
import { useHeadshot } from '../hooks/use-headshot'

const Home = () => {

    const headshot = useHeadshot()  // custom hook

    return (
        <div className='min-h-screen'>
            <header className='border-b border-white/10 px-4 py-4'>
                <div className='text-lg font-bold'>
                    <span>
                        AI <span className='text-indigo-400'>Headshot</span> Generator</span>
                </div>
            </header>

            <Hero />

            <UploadCard 
              uploadStatus={headshot.uploadStatus}
              uploadError={headshot.uploadError}
              onUploadStart={headshot.handleUploadStart}
              onUploadSuccess={headshot.handleUploadSuccess}
              onUploadError={headshot.handleUploadError}
            />

        </div>
    )
}

export default Home