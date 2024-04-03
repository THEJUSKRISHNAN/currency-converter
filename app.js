const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
        newOption.innerText = countryList[currCode];
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
        {
            newOption.selected="selected";
        }else if(select.name === "to" && currCode === "INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].slice(0,2);
  let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newScr;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amVal = amount.value;
  if (amVal === "" && amVal >= 0) {
    amVal = 1;
    amount.value = "1";
  }

  try {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);

    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmaount = amVal * rate;
    message.innerText = `${amVal} ${fromCurr.value} = ${finalAmaount} ${toCurr.value}`;
  } catch (e) {
    console.log(e);
  }
});
