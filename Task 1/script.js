//input validation
const validParenthesis = function (input) {
  const str = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(" || input[i] === "[" || input[i] === "{") {
      str.push(input[i]);
    } else {
      if (str.length === 0) return false;
      let topStackValue = str[str.length - 1];
      if (
        (input[i] === ")" && topStackValue === "(") ||
        (input[i] === "}" && topStackValue === "{") ||
        (input[i] === "]" && topStackValue === "[")
      ) {
        str.pop(input[i]);
      } else {
        break;
      }
    }
  }
  return str.length === 0;
};

//form validation
function SubmitForm() {
  const output = document.getElementById("validationResult");
  const inputValue = document.getElementById("inputfields").value;
  const btnResult = document.querySelector(".btn-enter");

  if (!inputValue) {
    output.textContent = "Please enter an input";
    output.classList.add("invalid");
    return;
  }

  const isValid = validParenthesis(inputValue);

  if (isValid) {
    output.textContent = "🎉Yes,It's Balanced🎉";
    output.classList.add("output");
    output.classList.remove("invalid");
    btnResult.style.backgroundColor = "green";
    btnResult.innerText = "success";
  } else {
    output.textContent = "No,It's not Balanced ☹️";
    output.classList.add("invalid");
    btnResult.style.backgroundColor = "red";
    btnResult.innerText = "failure";
  }
}
//reset button
document.querySelector(".reset").addEventListener("click", () => {
  document.getElementById("inputfields").value = "";
  validationResult.textContent = " ";
  document.querySelector(".btn-enter").style.backgroundColor = "#4446b3";
  document.querySelector(".btn-enter").textContent = "Enter";
});
