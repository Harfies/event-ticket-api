const QRCode = require("qrcode");

// generate QR as base64 image
const generateQR = async (data) => {
  try {
    const qrImage = await QRCode.toDataURL(data);
    return qrImage;
  } catch (error) {
    console.log("QR error:", error);
  }
};

module.exports = generateQR;
