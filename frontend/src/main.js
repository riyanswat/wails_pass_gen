import "./style.css";
import "./app.css";
import clipboardy from "clipboardy";
import Swal from "sweetalert2";

import { Generate } from "../wailsjs/go/main/App";

// html elements
const lengthElement = document.getElementById("length");
lengthElement.focus();
const resultElement = document.getElementById("result");
const lightDark = document.getElementById("light-dark");
const mainHeading = document.getElementById("main-heading");
const htmlElement = document.querySelector("html");

// ----------

window.generate = function () {
  let length = Number(lengthElement.value);
  if (isNaN(length)) {
    document.getElementById("result").innerText =
      "Please enter a valid length!";
    return;
  }

  let maxLength = 24;
  resultElement.style.display = "block";

  if (length == 0) {
    length = 8;
  }
  if (length > maxLength) {
    resultElement.innerText = `Password length shouldn't exceed ${maxLength}`;
    lengthElement.value = "";
    return;
  }
  // Call App.Generate(length)
  try {
    Generate(length)
      .then((result) => {
        // Update result with data back from App.Generate()
        resultElement.innerHTML = `Your random password is: <strong>${result}</strong>`;
        lengthElement.value = "";
        // ============================================
        // Swal.fire(
        //   "Password copied",
        //   "Your password has been copied to the clipboard",
        //   "success"
        //   );
        // ============================================

        setTimeout(() => {
          Swal.fire(
            "Password copied",
            "Your password has been copied to the clipboard",
            "success"
          );
        }, 300);

        // ============================================

        // Copy the result to the clipboard
        clipboardy.write(result, function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("Password copied to clipboard!");
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};

// Light/Dark mode implementation
lightDark.onclick = function () {
  if (lightDark.innerHTML != "🌙") {
    // Light mode
    lightDark.innerHTML = "🌙";
    mainHeading.style.color = "rgb(23, 31, 44)";
    resultElement.style.color = "rgb(23, 31, 44)";
    // document.body.style.backgroundColor = "rgb(255, 255, 255)";
    document.querySelector("html").style.backgroundColor = "rgb(255, 255, 255)";
    lengthElement.style.backgroundColor = "rgb(23, 31, 44)";
    lengthElement.style.color = "rgb(231, 219, 219)";
    lengthElement.style.caretColor = "rgb(231, 219, 219)";
    // document.querySelector("html").transitionDuration = "1s";
  } else {
    // Dark mode
    lightDark.innerHTML = "☀️";
    mainHeading.style.color = "#64CCC5";
    resultElement.style.color = "#64CCC5";
    // document.body.style.backgroundColor = "rgb(23, 31, 44)";
    document.querySelector("html").style.backgroundColor = "rgb(23, 31, 44)";
    lengthElement.style.backgroundColor = "rgb(231, 219, 219)";
    lengthElement.style.color = "rgb(23, 31, 44)";
    lengthElement.style.caretColor = "rgb(23, 31, 44)";
    // document.querySelector("html").transitionDuration = "1s";
  }
};
