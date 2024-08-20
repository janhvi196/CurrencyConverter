// const URL = "https://cat-fact.herokuapp.com/facts";
// const URL = "https://cat-fact.herokuapp.com/facts/janhvi";
// const factPara = document.querySelector("#fact");
// const btn = document.querySelector("#btn");

// const getFacts = async () => {
//   console.log("getting data......");
//   let response = await fetch(URL);
//   console.log(response); // JSON Format
//   console.log(response.status);
// let data = await response.json();
//   console.log(data);
//   console.log(data[0]);
//   console.log(data[0].text);
// factPara.innerText = data[0].text;
// factPara.innerText = data[1].text;
//   factPara.innerText = data[2].text;
// };

// function getFacts() {
//   fetch(URL)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       factPara.innerText = data[2].text;
//     });
// }

// btn.addEventListener("click", getFacts);

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList) {
//   console.log(code, countryList(code));
// }



for(let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amtVal);
  if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  // console.log(rate);
  // console.log(amount);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
  // console.log(element);
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode]; // IN, EU
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
})