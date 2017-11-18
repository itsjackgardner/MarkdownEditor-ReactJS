import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

const [B, I, H] = [66, 73, 72];
const BOLD = '****';
const ITALIC = '__';
const HEADER = '# ';

export function insertMDchars(key: SyntheticKeyboardEvent): string {
  if (hasCommandModifier(key))
    switch (key.keyCode) {
      case B:   return BOLD;
      case I:   return ITALIC;
      case H:   return HEADER;
      default:  break;
    }
  return getDefaultKeyBinding(key);
}

// Best function
export function textToInsert(str: string) { return str; }

export const commands = [BOLD, ITALIC, HEADER];
