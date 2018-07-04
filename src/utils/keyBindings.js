import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

// Keys
const B = 66,
      I = 73;

// Strings to insert
const BOLD    = '****',
      ITALIC  = '__',
      HEADER1 = '# ',
      HEADER2 = '## ',
      HEADER3 = '### ',
      HEADER4 = '#### ',
      HEADER5 = '##### ',
      HEADER6 = '###### ';

export function insertMDchars(key) {
  if (hasCommandModifier(key))
    switch (key.keyCode) {
      case B:  return BOLD;
      case I:  return ITALIC;
      case 49: return HEADER1;
      case 50: return HEADER2;
      case 51: return HEADER3;
      case 52: return HEADER4;
      case 53: return HEADER5;
      case 54: return HEADER6;
      default: /* nothing */
    }
  return getDefaultKeyBinding(key);
}

// Available commands
export const commands = [BOLD, ITALIC, HEADER1, HEADER2, HEADER3, HEADER4, HEADER5, HEADER6];
