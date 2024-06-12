export const download = async (src: string, name: string) => {
  const response = await fetch(src);

  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = name;

  link.target = "_blank";
  link.href = blobUrl;
  console.log("@href", link.href);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
