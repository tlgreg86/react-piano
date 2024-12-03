import React from 'react';
import Key from '../Key/Key';
import PropTypes from 'prop-types';
import { KeysPropType } from '../../types/piano';

const Piano = ({ keys, handleClick }) => {
  return (
    <div className='piano-wrapper'>
      <div className='piano-container'>
        {
          keys.map(({ keyLabel, type, isActive }, i) => {
            return (
              <Key 
                key={`${i}-${keyLabel}`}
                classNames={`key ${keyLabel} ${type} ${isActive && 'active'}`}
                keyLabel={keyLabel}
                handleClick={handleClick}
              />
            )
          })
        }
      </div>
    </div>
  );
};

Piano.propTypes = {
  keys: KeysPropType.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Piano;
