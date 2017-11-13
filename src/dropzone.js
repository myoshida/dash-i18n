import interact from 'interact.js';

export default function dropzone(target, options = {}) {
  const { ondrop = null } = options;
  const elt = target;
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (ondrop) {
      ondrop(e);
    }
  };
  elt.addEventListener('dragover', handleDragOver, false);
  elt.addEventListener('drop', handleDrop, false);
}

export function readDroppedFiles(e, options = {}) {
  const { onload = null, filter = null } = options;
  const reader = new FileReader();
  const files = e.dataTransfer.files;
  const len = files.length;
  for (let i = 0; i < len; i++) {
    const fname = files[i].name;
    if (!filter || filter(fname)) {
      reader.onload = (upload) => {
        const value = upload.target.result;
        if (onload) { onload(fname, value); }
      };
      reader.readAsText(files[i]);
    }
  }
}
