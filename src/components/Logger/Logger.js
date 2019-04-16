import React from 'react'

const Logger = ({keysLogged}) => {
  return (
    <div className='logger'>
      {
        keysLogged.map((key, i) => 
          <span key={`${key}-${i}`}>{key}</span>
        )
      }
    </div>
  )
}

export default Logger
