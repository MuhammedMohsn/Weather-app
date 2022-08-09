/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "15e4e80a13e92527ceb4365f589dd854&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1} . ${d.getDate()} . ${d.getFullYear()}`;
let generate_btn = document.getElementById("generate");
let zip_input = document.getElementById("zip");
let feelings = document.getElementsByClassName("myInput")[0];
let body = document.getElementsByTagName("body");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");

// get data from API
let getDataFromAPI = async (baseUrl, zipCode, apiKey) => {
    let res = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`)
    try {
        let dataFromAPI = await res.json();
        return dataFromAPI;
    }
    catch (err) { console.log("error in getDataFromAPI is :", err); }
}

// post data to API endpoint
let postData = async (path = "", data = {}) => {
    try {
        let temperature = Math.round((data.main.temp - 32) / 1.8);
        const postUrl = await fetch(path, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: newDate, temperature: temperature, content: feelings.value })
        });
        const dataFromServer = await postUrl.json();
        return dataFromServer;
    }
    catch (err) { console.log("error in postData is : ", err) }
}
// update UI with the data from server endpoint
let updateUI = async () => {
    let request = await fetch('/get')
    try {
        let dataFromServer = await request.json();
        date.innerHTML = `Date is : ${dataFromServer.date}`;
        temp.innerHTML = `temperature is : ${dataFromServer.temperature} degrees `
        content.innerHTML = `feelings is : ${dataFromServer.content}`
    }
    catch (err) { console.log("error in updateUI is : ", err) }
}

// the named callback function that executed after click event
function getPostUpdate() {
   let zipCode = zip_input.value;
    getDataFromAPI(url, zipCode, apiKey).then(dataFromAPI => {
        return postData("/post", dataFromAPI)
    }).then((dataFromServer) => {
        updateUI();
    }).catch(err => { console.log("the error is : ", err) });
}
// apply event on generate button
generate_btn.addEventListener('click', getPostUpdate)

