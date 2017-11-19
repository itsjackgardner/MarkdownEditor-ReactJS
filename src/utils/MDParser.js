import { ContentState } from 'draft-js';
import { markdown } from 'markdown';

export default function convertToMD(content: ContentState): string {
  return markdown.toHTML(content.getPlainText());
}
