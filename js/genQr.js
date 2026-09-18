document.addEventListener("DOMContentLoaded", () => {
  const inputUrlForm = document.getElementById("inputUrlForm");
  const inputUrl = document.getElementById("inputUrl");
  const inputTitle = document.getElementById("inputTitle");
  const qrCodeDiv = document.getElementById("qrCodeDiv");
  const downloadButton = document.getElementById("downloadButton");

  inputUrlForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = inputUrl.value.trim();
    const title = inputTitle.value.trim();

    if (!url) {
      alert("Please, Insert an URL");
      inputUrl.focus();
      return;
    }

    qrCodeDiv.innerHTML = "";

    try {
      const tempDiv = document.createElement("div");

      const qrcode = new QRCode(tempDiv, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H,
      });

      const finalCanvas = document.createElement("canvas");
      const ctx = finalCanvas.getContext("2d");

      const qrSize = 250;
      const margin = 20;
      const titlePadding = title ? 35 : 0;
      const borderRadius = 16;

      finalCanvas.width = qrSize + margin * 2;
      finalCanvas.height = qrSize + margin * 2 + titlePadding;

      setTimeout(() => {
        const qrCanvas = tempDiv.querySelector("canvas");

        if (!qrCanvas) {
          alert("Erro ao processar o QR Code. Tente novamente.");
          return;
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

        if (title) {
          ctx.fillStyle = "#000000";
          ctx.font = "bold 15px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            title,
            finalCanvas.width / 2,
            15,
            finalCanvas.width - 20,
          );
        }

        const qrX = margin;
        const qrY = margin + titlePadding;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(qrX, qrY, qrSize, qrSize, borderRadius);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        ctx.restore();

        qrCodeDiv.appendChild(finalCanvas);
        qrCodeDiv.style.display = "flex";
        downloadButton.style.display = "block";

        const newDownloadButton = downloadButton.cloneNode(true);
        downloadButton.parentNode.replaceChild(
          newDownloadButton,
          downloadButton,
        );

        newDownloadButton.addEventListener("click", () => {
          const downloadLink = document.createElement("a");
          const safeTitle = title
            ? title.replace(/[^a-z0-9]/gi, "_")
            : "qrcode";

          downloadLink.download = `${safeTitle}.png`;
          downloadLink.href = finalCanvas.toDataURL("image/png");
          downloadLink.click();
        });
      }, 150);
    } catch (err) {
      alert("An unexpected error occurred");
      console.error(err);
    }
  });
});
