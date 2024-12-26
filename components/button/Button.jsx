import React from 'react'
import './Button.css'

function Button({ variant = "black", size = "md", children, ...props }) {

    const className = `button button-${variant} button-${size}`;

  return (
    <>
        <button className={className} {...props}>{children}</button>
    </>
  )
}

export default Button