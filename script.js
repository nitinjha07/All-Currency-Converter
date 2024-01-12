let dropdown = document.querySelectorAll(".country select");

for(let select of dropdown){
    for(code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        option.setAttribute("value",code);
        select.appendChild(option);
        if(select.name === "from" && code === "USD"){
            option.selected = "selected";
        }
        if(select.name === "to" && code === "INR"){
            option.selected = "selected";
        }
        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        })
    }
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};

let upadteResult =async () => {
    if(amount.value === "" || amount.value < 1){
        amount.value = 1;
    }
    const fromCurr = document.querySelector("#from").value;
    const toCurr = document.querySelector("#to").value;


    const URL = `${BASE_URL}/${fromCurr.toLowerCase()}/${toCurr.toLowerCase()}.json`;

    console.log(amount.value);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.toLowerCase()];

    let finalAmt = (rate*amount.value).toFixed(4);
    result.innerHTML = `${amount.value} ${fromCurr} = <span>${finalAmt} ${toCurr} </span>`;
};

let btn = document.querySelector(".submit-button");
let amount = document.querySelector(".amount-section input");
let result = document.querySelector(".result p");

window.addEventListener("load",(evt)=>{
    evt.preventDefault();
    upadteResult();
});

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    upadteResult();
})

const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
