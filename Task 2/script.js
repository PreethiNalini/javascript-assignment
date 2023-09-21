//zipcode validation
function submit() {
  const zipcode = document.querySelector(".zipcode-inputField").value;
  const url = `http://api.zippopotam.us/us/${zipcode}`;
  const result = document.querySelector(".result");
  //enter a empty input
  if (!zipcode) {
    result.innerText = "please enter input";
  }

  fetch(url)
    .then((res) => res.json())
    .then((msg) => {
      if (msg.places) {
        const state = msg.places[0]["state abbreviation"];
        const country = msg["country abbreviation"];
        const city = msg.places[0]["place name"];
        result.innerText = `{ "state" : "${state}" , "country" : "${country}", "city" : "${city.toUpperCase()}"}`;
      } else {
        result.innerText = "Enter wrong zipcode";
        result.classList.add("invalid ");
        result.classList.remove("result");
      }
    })
    .catch((error) => console.error("Error:", error));
}

//reset button
function reset() {
  document.querySelector(".zipcode-inputField").value = "";
  document.querySelector(".result").innerText = "";
}
