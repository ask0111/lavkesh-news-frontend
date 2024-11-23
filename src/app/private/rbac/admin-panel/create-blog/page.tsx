import NewPost from '@/admin-components/blog-editor'
import PublishButton from '@/admin-components/blog-editor/PublishButton'
import React from 'react'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page: React.FC<Props> = async({ searchParams }) => {
const {editId} = await searchParams;
  return (
    <div className='bg-white'>
        <h2 className='text-h2 font-h1 p-2'>Create blog
        </h2>
        <div>
          <NewPost editId={editId} />
        </div>
    </div>
  )
}

export default page