body = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": "You are a helpful assistant. Your job is to explain documents thoroughly and explain at a 3rd grade reading level. You want to define each legal phrase and use simpler words when explaining. You want to make bullet points of all important details, with links to websites for additional information. There should be sections (with titles in all capital letters) for a Summary, Important details, and relevant links."
        }
    ]
}
const form = document.querySelector('#form');
const input = document.querySelector('#input');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    showDiv();
    const inputValue = input.value; // get the value of the input field

    // call your function with inputValue as a parameter
    sendUserMessage2(inputValue);
  });

const form2 = document.querySelector('#form2');
const input2 = document.querySelector('#input2');
form2.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting and reloading the page
  // place function to display disclaimer
  
  
  const inputValue = input2.value; // get the value of the input field

    // call your function with inputValue as a parameter
  sendUserMessage(inputValue);
});
  
// function to show Div upon submit of first Query 
function showDiv() {
  console.log("showing div");
  var div2 = document.getElementById("disclaimer");
  div2.style.display = "block";
}

async function sendUserMessage(message) {
    // Add the user's message to the messages array in the body object
    body.messages.push({
      "role": "user",
      "content": message
    });
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "block";

    if(message.includes("TABLE OF CONTENTS") || message.includes("Table of Contents")){

    
      console.log(message.trim('\n'));
    }
  
    // Make the API call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      }
    });
  
    // Convert the response to JSON
    const jsonResponse = await response.json();
    loadingScreen.style.display = "none";
  
    // Log the response
    const question = message;
    const answer = jsonResponse.choices[jsonResponse.choices.length-1].message.content;
    createCard(question, answer);
    // document.getElementById("questions").innerText += 
    // "Q:" + message + '\n' +
    // jsonResponse.choices[jsonResponse.choices.length-1].message.content + '\n';

    // Remove the user's message from the messages array
    // body.messages.pop();
}

function createCard(question, answer) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('purple-box');
  card.classList.add('text-white');
  card.classList.add('m-3');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const questionTitle = document.createElement('h5');
  questionTitle.classList.add('card-title');
  questionTitle.textContent = 'Question: ' + question;

  const answerTitle = document.createElement('h6');
  answerTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
  answerTitle.textContent = 'Answer:';

  const answerText = document.createElement('p');
  answerText.classList.add('card-text');
  answerText.textContent = answer;

  cardBody.appendChild(questionTitle);
  cardBody.appendChild(answerTitle);
  cardBody.appendChild(answerText);
  card.appendChild(cardBody); 

  const cardContainer = document.getElementById('questions');
  cardContainer.appendChild(card);
}

async function sendUserMessage2(message) {
    // Add the user's message to the messages array in the body object
    body.messages.push({
      "role": "user",
      "content": message
    });
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "block";

  
    // Make the API call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      }
    });
  
    // Convert the response to JSON
    const jsonResponse = await response.json();

    loadingScreen.style.display = "none";
    document.getElementById("box1").className = "card-body";
    document.getElementById("box11").className = "card purple-box text-white";
  
    console.log(jsonResponse.choices)
    // Log the response

    document.getElementById("results").innerText = jsonResponse.choices[jsonResponse.choices.length-1].message.content + '\n';
    body.messages.push(jsonResponse.choices[0].message);
    console.log(body.messages);
    
    // Remove the user's message from the messages array
    // for (var i = 0; i < body.messages.length; i++) {
    //   body.messages.pop();
    // }
    // body.messages = [];
  }
// document.getElementById(form).addEventListener("submit", sendUserMessage());


var fileUploader =  document.getElementById("fileUploader");
fileUploader.addEventListener('change', handleFileUpload, false);

function handleFileUpload(event){
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsBinaryString(file, 'Base64');

  reader.onload = function(e) {
    // Use reader.result
    console.log(reader.result);
    // sendUserMessage2(reader.result);
  };
}
