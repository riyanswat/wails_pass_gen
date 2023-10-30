import "./style.css";
import "./app.css";

import logo from "./assets/images/logo-universal.jpg";
import { Generate } from "../wailsjs/go/main/App";

document.querySelector("#app").innerHTML = `
    <img id="logo" class="logo">
      <div class="result" id="text">Please enter the length of the password below:</div>
      <span class="result" id="result"></span>
      <div class="input-box" id="input">
        <input class="input" id="length" type="text" autocomplete="off" />
        <button class="btn" onclick="generate()">Generate</button>
      </div>
    </div>
`;
document.getElementById("logo").src = logo;

let lengthElement = document.getElementById("length");
lengthElement.focus();
let resultElement = document.getElementById("result");

// Setup the generate function
window.generate = function () {
  let length = Number(lengthElement.value);
  let maxLength = 24;
  document.getElementById("text").style.display = "none";
  resultElement.style.display = "block";

  // Check if the input is empty
  if (length == 0) {
    length = 8;
  }
  if (length > 24) {
    resultElement.innerText = `Password length shouldn't exceed ${maxLength}`;
    return;
  }

  // Call App.Generate(length)
  try {
    Generate(length)
      .then((result) => {
        // Update result with data back from App.Generate()
        resultElement.innerText = `Your random password is: ${result}`;
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};
