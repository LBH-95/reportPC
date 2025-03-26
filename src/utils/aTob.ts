export const qrSrc = (qrCode: string) => {
  if (qrCode === "") return "";
  const b64 = window.btoa(unescape(encodeURIComponent(qrCode)));
  return `data:image/svg+xml;base64,${b64}`;
};
