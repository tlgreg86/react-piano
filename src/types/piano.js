import PropTypes from 'prop-types';

// Valid piano note values
export const NOTE_VALUES = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B'];

// PropTypes for a single piano note
export const NotePropType = PropTypes.oneOf(NOTE_VALUES);

// PropTypes for a piano key
export const KeyPropType = PropTypes.shape({
  keyLabel: NotePropType.isRequired,
  type: PropTypes.oneOf(['major', 'minor']).isRequired,
  isActive: PropTypes.bool.isRequired,
  keyboardKey: PropTypes.string.isRequired
});

// PropTypes for an array of piano keys
export const KeysPropType = PropTypes.arrayOf(KeyPropType);
