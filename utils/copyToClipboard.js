export const copyToClipboard = async (text, setCopySuccess) => {
  try {
    await navigator.clipboard.writeText(text)
    setCopySuccess(true);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};