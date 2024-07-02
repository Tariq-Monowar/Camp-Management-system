import * as XLSX from 'xlsx';
import { writeFile } from 'xlsx';

export const resizeImage = (file, maxWidth) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const width = maxWidth;
        const height = (width / img.width) * img.height;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          1 // quality parameter, adjust as needed
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.readAsDataURL(file);
  });
};

// CopyToClipboard.js


export const downloadTableExcels = (filename, sheet, currentTableRef) => {
  const table = currentTableRef.current;
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheet);

  writeFile(wb, `${filename}.xlsx`);
};
