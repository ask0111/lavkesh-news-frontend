import NewPost from '@/admin-components/blog-editor/TinyMCE'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white'>
        <h2 className='text-h2 font-h1 p-2'>Create blog</h2>
        <div>
          <NewPost />
        </div>
    </div>
  )
}

export default page