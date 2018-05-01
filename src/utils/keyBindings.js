import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

// Keys
const B = 66,
      I = 73,
      X = 88;

// Strings to insert
const BOLD   = '****',
      ITALIC = '__',
      HEADER = '# ';

export function insertMDchars(key) {
  if (hasCommandModifier(key))
    switch (key.keyCode) {
      case B:  return BOLD;
      case I:  return ITALIC;
      case X:  return HEADER;
      default: /* nothing */
    }
  return getDefaultKeyBinding(key);
}

// Definitely required function
export function textToInsert(str) {
  return str;
}

// Available commands
export const commands = [BOLD, ITALIC, HEADER];
