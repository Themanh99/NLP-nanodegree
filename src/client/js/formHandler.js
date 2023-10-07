export async function handleSubmit(event) {
  event.preventDefault();

  document.getElementById("result").innerHTML = "";
  const url = document.getElementById("url").value;

  if (url.length == 0) {
    document.getElementById("error").innerHTML =
      "You did not enter URL! Please enter a valid URL";
    return;
  } else if (!checkUrl(url)) {
    document.getElementById("error").innerHTML = "URL is not valid";
    return;
  } else {
    document.getElementById("error").innerHTML = "";
  }

  let data = await sendRequest("/postSentiment", url)
    .then((data) => data.json())
    .then(function (res) {
      console.log(res.status.code);
      Client.updateUI(res);
    });
}

export function checkUrl(inputText) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // Protocol URL
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(inputText);
}

export async function sendRequest(enpointUrl, urlInput) {
  let response = await fetch(enpointUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputUrl: urlInput }),
  });

  return response;
}
