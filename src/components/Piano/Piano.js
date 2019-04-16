import React from 'react'
import Key from '../Key/Key'

const Piano = ({keys}) => {
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
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Piano
