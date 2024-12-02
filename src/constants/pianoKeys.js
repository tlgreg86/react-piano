export const PIANO_KEYS = [
  { keyLabel: 'C', type: 'major', isActive: false, keyboardKey: 'a' },
  { keyLabel: 'c', type: 'minor', isActive: false, keyboardKey: 'w' },
  { keyLabel: 'D', type: 'major', isActive: false, keyboardKey: 's' },
  { keyLabel: 'd', type: 'minor', isActive: false, keyboardKey: 'e' },
  { keyLabel: 'E', type: 'major', isActive: false, keyboardKey: 'd' },
  { keyLabel: 'F', type: 'major', isActive: false, keyboardKey: 'f' },
  { keyLabel: 'f', type: 'minor', isActive: false, keyboardKey: 't' },
  { keyLabel: 'G', type: 'major', isActive: false, keyboardKey: 'g' },
  { keyLabel: 'g', type: 'minor', isActive: false, keyboardKey: 'y' },
  { keyLabel: 'A', type: 'major', isActive: false, keyboardKey: 'h' },
  { keyLabel: 'a', type: 'minor', isActive: false, keyboardKey: 'u' },
  { keyLabel: 'B', type: 'major', isActive: false, keyboardKey: 'j' },
];

export const KEY_TO_NOTE = PIANO_KEYS.reduce((acc, key) => {
  acc[key.keyboardKey] = key.keyLabel;
  return acc;
}, {});
