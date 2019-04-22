import React from 'react'
import PropTypes from 'prop-types'

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

Logger.propTypes = {
  keysLogged: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Logger
