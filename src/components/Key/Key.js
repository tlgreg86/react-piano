import React from 'react'

const Key = ({keyLabel, classNames, handleClick}) => {
  return (
    <div onClick={() => handleClick(keyLabel)} className={classNames}>
      <p className="key-label">{keyLabel}</p>
    </div>
  )
}

export default Key
