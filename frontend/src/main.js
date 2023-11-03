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
