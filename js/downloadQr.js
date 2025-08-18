document.addEventListener("DOMContentLoaded", () => {
  const qrcodeDiv = document.getElementById("qrCodeDiv");
  const downloadBtn = document.getElementById("downloadButton");

  downloadBtn.addEventListener("click", () => {
    const qrCodeImage = qrcodeDiv.querySelector("img");
    if (!qrCodeImage) {
      alert("Nothing to download");
      return;
    }
    const imageUrl = qrCodeImage.src;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = "qrcode.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  });
});
