import { GenerateMusicForm } from "@/features/generate/components/generate-music-form"

export const GenerateMusic = () => {
    return <div className="border-2 border-red-300 h-full flex items-center justify-center">
        <div className="max-w-xl w-full">
            <div>links to others...</div>
            <div className="bg-surface p-4">
                <GenerateMusicForm />
            </div>
        </div>
    </div>
}