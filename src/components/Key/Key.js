import React from 'react'

const Key = ({keyLabel, classNames}) => {
  return (
    <div className={classNames}>
      <p className="key-label">{keyLabel}</p>
    </div>
  )
}

export default Key
