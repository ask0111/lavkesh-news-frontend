import React from 'react'

const MainFooter = () => {
  return (
    <footer className='border'>
        <div className='bg-black'>
            <p className='text-center text-white p-4'>Copyright © {new Date().getFullYear()} TOWN News Theme. powered by town news.</p>
        </div>
    </footer>
  )
}

export default MainFooter