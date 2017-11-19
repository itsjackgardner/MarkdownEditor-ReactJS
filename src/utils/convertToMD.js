import { ContentState } from 'draft-js';
import { markdown } from 'markdown';

function convertToMD(content: ContentState): string {
  return markdown.toHTML(content.getPlainText());
}

export default function previewMD(content: ContentState) {
  var preview = document.getElementById('preview_container');
  preview.innerHTML = convertToMD(content);
}
