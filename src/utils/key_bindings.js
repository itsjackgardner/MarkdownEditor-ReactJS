import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

function insertMDchars(key: SyntheticKeyboardEvent): string {
  if (key.keyCode === 66 && hasCommandModifier(key))
    return 'bold';
  return getDefaultKeyBinding(key);
}

export default insertMDchars;
