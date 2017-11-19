import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

const [B, I, H, ENTER] = [66, 73, 72, 13];
const BOLD = '****';
const ITALIC = '__';
const HEADER = '# ';
const GENERATE = '\n';

export function insertMDchars(key: SyntheticKeyboardEvent): string {
  if (hasCommandModifier(key))
    switch (key.keyCode) {
      case B:   return BOLD;
      case I:   return ITALIC;
      case H:   return HEADER;
      default:  /* nothing */
    }
  if (key.keyCode === ENTER) return '\n';
  return getDefaultKeyBinding(key);
}

// Best function
export function textToInsert(str: string) { return str; }

export const commands = [BOLD, ITALIC, HEADER, GENERATE];
