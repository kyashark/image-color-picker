document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file-upload");
  const image = document.getElementById("image");
  const pickColor = document.getElementById("color-picker");
  const hexValue = document.getElementById("hex-value");
  const rgbValue = document.getElementById("rgb-value");
  const colorPlate = document.getElementById("color-plate");
  const hexCopyIcon = document.getElementById("hex-copy");
  const rgbCopyIcon = document.getElementById("rgb-copy");
  const message = document.getElementById("message");

  // Handle file upload and set image source
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    hexValue.value = "";
    rgbValue.value = "";
    colorPlate.style.backgroundColor = "#FFFFFF";
  });

  // Use the Eyedropper API for color picking
  pickColor.addEventListener("click", async () => {
    if (!("EyeDropper" in window)) {
      alert("Eyedropper API is not supported in your browser.");
      return;
    }

    const eyedropper = new EyeDropper();
    try {
      const result = await eyedropper.open();
      const hexColor = result.sRGBHex;

      //convert Hex to RGB
      const r = parseInt(hexColor.substring(1, 3), 16);
      const g = parseInt(hexColor.substring(3, 5), 16);
      const b = parseInt(hexColor.substring(5, 7), 16);
      const rgbColor = `rgb(${r}, ${g}, ${b})`;

      // Display the colors in input fields
      rgbValue.value = rgbColor;
      hexValue.value = hexColor;
      colorPlate.style.backgroundColor = hexColor;
    } catch (err) {
      console.error("Eyedropper error:", err);
    }
  });

  // Copy Hex value to clipboard
  hexCopyIcon.addEventListener("click", () => {
    navigator.clipboard
      .writeText(hexValue.value)
      .then(() => {
        if (hexValue.value) {
          message.innerText = "HEX value copied";
        } else {
          message.innerText = "You did not select a color";
        }

        setTimeout(() => {
          message.innerText = "";
        }, 3000);
      })
      .catch((err) => {
        message.innerText = "Failed to copy HEX value: " + err;
      });
  });

  // Copy Hex value to clipboard
  rgbCopyIcon.addEventListener("click", () => {
    navigator.clipboard
      .writeText(rgbValue.value)
      .then(() => {
        if (rgbValue.value) {
          message.innerText = "RGB value copied";
        } else {
          message.innerText = "You did not select a color";
        }

        setTimeout(() => {
          message.innerText = "";
        }, 3000);
      })
      .catch((err) => {
        message.innerText = "Failed to copy RGB value: " + err;
      });
  });
});
