const { checkUrl } = require("./checkUrl");

function handleSubmit(event) {
  event.preventDefault();
  const inputText = document.getElementById("url").value;
  const rslt = document.getElementsByClassName("result");
  if (inputText === "" || !checkUrl(inputText)) {
    alert("Please re-enter a URL");
  }
  sendData({ url: inputText }, "/sentiments").then(function (data) {
    console.log(data);
    const div = document.createElement("div");
    const p = document.createElement("p");
    const score_tag = `score_tag: ${data.score_tag}\n`;
    const agreement = `agreement: ${data.agreement}\n`;
    const subjectivity = `subjectivity: ${data.subjectivity}\n`;
    const confidence = `confidence: ${data.confidence}\n`;
    const combinedText = `${score_tag}${agreement}${subjectivity}${confidence}`;
    p.innerHTML = combinedText;
    div.appendChild(p);
    rslt.appendChild(div);
  });
}

async function sendData(data = {}, url = "") {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const rsltData = await response.json();
    return rsltData;
  } catch (error) {
    console.log("error", error);
  }
}

export { handleSubmit, sendData };
