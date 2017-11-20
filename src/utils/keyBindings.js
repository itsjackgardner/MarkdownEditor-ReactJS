import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

const B = 66,
      I = 73,
      H = 88;

const BOLD   = '****',
      ITALIC = '__',
      HEADER = '# ';

export function insertMDchars(key: SyntheticKeyboardEvent): string {
  if (hasCommandModifier(key))
    switch (key.keyCode) {
      case B:   return BOLD;
      case I:   return ITALIC;
      case H:   return HEADER;
      default:  /* nothing */
    }
  return getDefaultKeyBinding(key);
}

// Best function
export function textToInsert(str: string) { return str; }

export const commands = [BOLD, ITALIC, HEADER];
