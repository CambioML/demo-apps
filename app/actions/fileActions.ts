export const getFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(reader.result as ArrayBuffer)));
        resolve(base64String);
      } else {
        reject(new Error('File content is null'));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
