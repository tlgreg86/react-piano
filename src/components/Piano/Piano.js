import React from 'react'
import Key from '../Key/Key'

const Piano = ({ keys, handleClick }) => {
  return (
    <div className='piano-wrapper'>
      <div className='piano-container'>
        {
          keys.map(({ keyLabel, type, isActive }, i) => {
            return (
              <Key 
                key={`${i}-${keyLabel}`}
                classNames={`key ${keyLabel} ${type} ${isActive}`}
                keyLabel={keyLabel}
                handleClick={handleClick}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Piano
