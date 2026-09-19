import ExportActions from '../components/ExportActions'
import Hero from '../components/Hero'
import ResultPreview from '../components/ResultPreview'
import TransformationGrid from '../components/TransformationGrid'
import UploadCard from '../components/UploadCard'
import { useHeadshot } from '../hooks/use-headshot'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'

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

            {headshot.hasUpload && headshot.originalImage && (
                <section className="px-4 py-8">
                    <div className="mx-auto max-w-md text-center">
                        <h2 className="mb-4 text-xl font-semibold">Original Upload</h2>
                        <AdvancedImage  // Cloudinary React component to display the original image from 
                            cldImg={headshot.originalImage}
                            plugins={[placeholder({ mode: 'blur' }), lazyload()]}
                            alt="Original Upload"
                            className="mx-auto rounded-xl shadow-lg"
                        />
                    </div>
                </section>
            )
            }


            {headshot.hasUpload && (
                <TransformationGrid
                    title="AI Headshot Styles"
                    presets={headshot.presetImages}
                    selectedPresetId={headshot.selectedPresetId}
                    onSelect={headshot.selectPreset}
                />
            )}


            {headshot.hasUpload && (
                <ResultPreview
                    originalImage={headshot.originalImage}
                    selectedImage={headshot.selectedImage}
                    selectedPreset={headshot.selectedPreset}
                />
            )}

            {
                headshot.hasUpload && headshot.publicId && headshot.selectedPreset && (
                    <ExportActions
                        publicId={headshot.publicId}
                        selectedPreset={headshot.selectedPreset}
                    />
                )
            }

        </div>
    )
}

export default Home