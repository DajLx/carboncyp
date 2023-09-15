import domtoimage from "dom-to-image";
const getNode = () => document.querySelector("#codeToImage");

const createAndDownloadImage = (dataUrl, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = dataUrl;
  link.click();
};
function filter(node) {
  return node.tagName !== "i";
}

const exportAsImage = {
  nodeToUse: () => getNode(),

  toDownload: {
    JPEG: (name) => {
      domtoimage
        .toJpeg(exportAsImage.nodeToUse())
        .then((dataUrl) => createAndDownloadImage(dataUrl, name))
        .catch((error) => console.log(error));
    },

    PNG: (name, node) => {
      domtoimage
        .toPng(node ? node : exportAsImage.nodeToUse(), { quality: 0.95 })
        .then((dataUrl) => createAndDownloadImage(dataUrl, name));
    },
    SVG: (name) => {
      domtoimage
        .toSvg(exportAsImage.nodeToUse(), { filter: filter })
        .then((dataUrl) => createAndDownloadImage(dataUrl, name));
    },
  },
  toCreateImage: {
    JPEG: async () => {
      const dataUrl = await domtoimage.toJpeg(exportAsImage.nodeToUse(), {
        quality: 1,
      });
      const img = new Image();
      img.src = dataUrl;

      return dataUrl;
    },
    PNG: async () => {
      const dataUrl = await domtoimage.toPng(exportAsImage.nodeToUse(), {
        quality: 1,
      });
     
      return dataUrl;
    },
    SVG: async () => {
      const dataUrl = await domtoimage.toSvg(
        exportAsImage.nodeToUse(),
        {
          filter: filter,
        },
        {
          quality: 1,
        }
      );
      return dataUrl;
    },
  
  },
};

export default exportAsImage;
