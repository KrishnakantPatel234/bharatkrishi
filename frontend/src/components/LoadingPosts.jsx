import React from 'react'

const LoadingPosts = () => {
  return (
    <div className="w-full min-h-screen">
        <div class="mx-auto min-h-screen w-full rounded-md p-4">
            <div class="flex animate-pulse space-x-4">
                <div className="grid grid-cols-12 h-20 w-full gap-8 px-10">
                    <div className="md:col-span-4 col-span-8 min-h-[600px] bg-gray-200 rounded-lg" >
                    </div>
                    <div className="md:col-span-4 col-span-8 min-h-[600px] bg-gray-200 rounded-lg" >
                    </div>
                    <div className="md:col-span-4 col-span-8 min-h-[600px] bg-gray-200 rounded-lg" >
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default LoadingPosts;