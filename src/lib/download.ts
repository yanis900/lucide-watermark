
export const download = (svgData: string) => {
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "watermark.svg";
  link.click();
  URL.revokeObjectURL(url);
};
