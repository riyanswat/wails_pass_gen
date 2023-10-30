import "./style.css";
import "./app.css";

import logo from "./assets/images/logo-universal.jpg";
import { Generate } from "../wailsjs/go/main/App";

document.querySelector("#app").innerHTML = `
    <h1 id="main-heading">RANDOM PASSWORD GENERATOR</h1>
    <img id="logo" class="logo" draggable="false">
      <div class="result" id="text"></div>
      <span class="result" id="result"></span>
      <div class="input-box" id="input">
        <input class="input" placeholder="Password length" id="length" type="text" autocomplete="off" />
        <button class="btn" onclick="generate()">Generate</button>
      </div>
    </div>
`;
document.getElementById("logo").src = logo;

let lengthElement = document.getElementById("length");
lengthElement.focus();
let resultElement = document.getElementById("result");
let textElement = document.getElementById("text");
// Setup the generate function
window.generate = function () {
  let length = Number(lengthElement.value);
  if (isNaN(length)) {
    document.getElementById("result").innerText =
      "Please enter a valid length!";
    return;
  }
  let maxLength = 24;
  textElement.style.display = "none";
  resultElement.style.display = "block";

  // Check if the input is empty
  if (length == 0) {
    length = 8;
  }
  if (length > maxLength) {
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
