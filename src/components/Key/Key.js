import React from 'react'
import PropTypes from 'prop-types'

const Key = ({keyLabel, classNames, handleClick}) => {
  return (
    <div onClick={() => handleClick(keyLabel)} className={classNames}>
      <p className="key-label">{keyLabel}</p>
    </div>
  )
}

Key.propTypes = {
  keyLabel: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Key
