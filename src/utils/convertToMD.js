import { markdown } from 'markdown';

function convertToMD(content) {
  return markdown.toHTML(content.getPlainText());
}

export default function previewMD(content) {
  var preview = document.getElementById('preview_container');
  preview.innerHTML = convertToMD(content);
}
