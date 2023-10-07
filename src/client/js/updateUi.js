function updateUI(content) {
  document.getElementById("result").innerHTML = `
  Status: {code: ${content.status.code} , 
  msg: ${content.status.msg},
  credits: ${content.status.credits} , 
  remaining_credits: ${content.status.remaining_credits}}
  `;
}

export { updateUI };
