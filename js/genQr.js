document.addEventListener("DOMContentLoaded", () => {
  const inputUrlForm = document.getElementById("inputUrlForm");
  const inputUrl = document.getElementById("inputUrl");
  const qrCodeDiv = document.getElementById("qrCodeDiv");

  inputUrlForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = inputUrl.value.trim();
    if (!url) {
      alert("Please, Insert an URL");
      inputUrl.focus();
      return;
    }
    qrCodeDiv.innerHTML = "";
    try {
      const options = {
        text: url,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H,
      };
      let qrcode = new QRCode(qrCodeDiv, options);
      qrCodeDiv.style.display = "flex";
    } catch (err) {
      alert("An unexpect error ocurred");
      console.error(err);
    }
  });
});
