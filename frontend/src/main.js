import "./style.css";
import "./app.css";
import clipboardy from "clipboardy";

import { Generate } from "../wailsjs/go/main/App";

let lengthElement = document.getElementById("length");
lengthElement.focus();
let resultElement = document.getElementById("result");

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
        resultElement.innerText = `Your random password is: ${result}`;
        lengthElement.value = "";

        // Copy the result to the clipboard asynchronously
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

let lightDark = document.getElementById("light-dark");
lightDark.onclick = function () {
  if (lightDark.innerHTML != "🌙") {
    lightDark.innerHTML = "🌙";
    document.getElementById("main-heading").style.color = "rgb(23, 31, 44)";
    document.getElementById("result").style.color = "rgb(23, 31, 44)";
    document.body.style.backgroundColor = "rgb(255, 255, 255)";
    document.querySelector("html").style.backgroundColor = "rgb(255, 255, 255)";
  } else {
    lightDark.innerHTML = "☀️";
    document.getElementById("main-heading").style.color = "#64CCC5";
    document.getElementById("result").style.color = "#64CCC5";
    document.body.style.backgroundColor = "rgb(23, 31, 44)";
    document.querySelector("html").style.backgroundColor = "rgb(23, 31, 44)";
  }
};
