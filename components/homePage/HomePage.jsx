'use client'
import React from 'react'
import Button from '../button/Button'
import RegistrationPage from '../RegistrationPage/RegistrationPage'

function HomePage() {
  const [registerPage, setRegisterPage] = React.useState(false)

  return (
    <>
      {/* Preserved original container structure and classes */}
      <div className='flex flex-col items-center justify-center my-20'>
        {/* Maintained original text elements with exact spacing */}
        <p className='text-sm'>Hub to connect you with others to make a bigger impact</p>
        <h1 className='text-5xl font-bold text-cyan-500 mt-2'>Connect4Change</h1>
        <h2 className='text-2xl font-semibold mt-1'>Empowering Sustainibility Through Collaboration</h2>
        <br />
        
        {/* Preserved original CTA section structure */}
        <div className='flex flex-col items-center justify-between gap-4 mt-12'>
          <h3 className='text-cyan-500 text-xl'>Connect - Share - Impact</h3>
          {/* Maintained button wrapper with direct state control */}
          <Button 
            variant='black' 
            size='md'
            onClick={() => setRegisterPage(true)}
          >
            Join Us
          </Button>
        </div>
      </div>

      {/* Unchanged modal rendering logic */}
      {registerPage && (
        <RegistrationPage onClose={() => setRegisterPage(false)} />
      )}
    </>
  )
}

export default HomePage