import React from 'react';
import PropTypes from 'prop-types';
import { NotePropType } from '../../types/piano';

const Logger = ({keysLogged}) => {
  return (
    <div className='logger'>
      {
        keysLogged.map((key, i) => 
          <span key={`${key}-${i}`}>{key}</span>
        )
      }
    </div>
  );
};

Logger.propTypes = {
  keysLogged: PropTypes.arrayOf(NotePropType).isRequired,
};

export default Logger;
