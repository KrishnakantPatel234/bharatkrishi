import React from 'react'

const LoadingState = () => {
  return (
    <div className="w-full min-h-screen">
        <div class="mx-auto min-h-screen w-full rounded-md p-4">
            <div class="flex animate-pulse space-x-4">
                <div class="size-60 rounded-full bg-gray-200"></div>
                <div class="flex-1 space-y-6 py-1">
                <div class="h-20 rounded bg-gray-200"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2 h-16 rounded bg-gray-200"></div>
                        <div class="col-span-1 h-16 rounded bg-gray-200"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2 h-16 rounded bg-gray-200"></div>
                        <div class="col-span-1 h-16 rounded bg-gray-200"></div>
                    </div>
                    <div class="h-12 rounded bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="h-100 col-span-4 rounded bg-gray-200"></div>
                    <div className="h-100 col-span-4 rounded bg-gray-200"></div>
                    <div className="h-100 col-span-4 rounded bg-gray-200"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoadingState;