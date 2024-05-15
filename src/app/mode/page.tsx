import Footer from '@/components/common/Footer'
import Link from 'next/link'
import React, { SVGProps } from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <>
        <div className="flex flex-col items-center justify-center md:h-[600px] bg-homeBack px-4 py-12 sm:px-6 lg:px-8 h-[600px]">
            <div className="max-w-6xl w-full space-y-8">
                <h1 className="text-4xl font-bold text-white text-center">Choose Your Game Mode</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6 flex flex-col items-center justify-center h-full">
                            <div className="bg-[#ec4899] rounded-full p-3 mb-4">
                                <GlobeIcon className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#ec4899] mb-2">Online Multiplayer</h2>
                            <p className="text-gray-500 text-center">Challenge players from around the world in online matches.</p>
                        </div>
                    </div>
                    <Link href={"/levels"} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6 flex flex-col items-center justify-center h-full">
                            <div className="bg-[#fbbf24] rounded-full p-3 mb-4">
                                <BotIcon className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#fbbf24] mb-2">Single Player</h2>
                            <p className="text-gray-500 text-center">Test your skills against a challenging AI opponent.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <Footer />
        </>
        )
}

export default page




function BotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}


function GlobeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}
