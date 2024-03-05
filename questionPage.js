let answer = "";
let data = JSON.parse(localStorage.getItem("data"));
console.log(data);

makeFetch();

function makeFetch(){
  fetchData(data)
    .then(() => {
      document.querySelector(".loadScreen").style.visibility = "hidden";
      document.querySelector(".errorOccured").style.visibility = "hidden";
    })
    .catch(function(error){
      document.querySelector(".errorOccured").style.visibility = "visible";
      console.log(error);
      pause(100)
        .then(()=>{
          makeFetch();
        })
    });
}

function pause(time){
  return new Promise(resolve => setTimeout(resolve, time));
}
//var i = 0;
//typeWriter(str);

class TypeWriter {
  constructor(speed = 50) {
    this.speed = speed;
    this.i = 0;
  }

  type(str, element) {
    if (this.i < str.length) {
      element.innerHTML += str.charAt(this.i);
      this.i++;
      setTimeout(() => {
        this.type(str, element);
      }, this.speed);
    }
  }
}

function goBack(){
  localStorage.clear();
  window.location.href = "sampleInput.html";
}

async function fetchData(sendData) {
  const ngrokLink = "https://8bce-35-232-77-175.ngrok-free.app/";
  console.log(sendData);
  const url = ngrokLink + 'run?msg=' + encodeURIComponent(JSON.stringify(sendData));
  console.log(url);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'history',
        'Accept': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error during fetch: ' + response.statusText);
        }
      })
      .then(data => {
        const json = JSON.parse(data.output.replace(/'/g, '"'));
        str = json.question;
        const tp1 = new TypeWriter();
        tp1.type(str, document.querySelector(".question"));
        setOptions(json.options);
        answer = json.answer;
        console.log(answer);
        resolve(); // Resolve the promise once the asynchronous operation is complete
      })
      .catch(error => {
        reject(error); // Reject the promise if there's an error
      });
  });
}


function setOptions(options){
  let typeWriters = [];
  console.log(options.length)
  for(let i = 0; i<=3; i++){
    typeWriters.push(new TypeWriter());
    console.log(options[i])
    typeWriters[i].type(options[i], document.querySelectorAll(".radio-item")[i].querySelector("label"))
  }
}

function checkAnswer(){
  let userInput = getSelectedValue().substring(0,1);
  if(answer==userInput){
    document.querySelector(".main").style.visibility = "visible";
    document.querySelector(".main2").style.visibility = "hidden";
    document.querySelector(".neon").innerHTML = "Generate New";
    let arrow = document.createElement("i");
    //<i class="fa-solid fa-arrow-right fa-beat"></i>
    arrow.classList.add("fa-solid");
    arrow.classList.add("fa-arrow-right");
    arrow.classList.add("fa-beat");
    arrow.style.position = "absolute";
    arrow.style.top = "80%";
    arrow.style.left = "35%";
    arrow.style.width = "100%";
    document.body.appendChild(arrow);
    //document.querySelector(".neon").onclick = page();
    //document.querySelector(".neon").href = "sampleInput.html";
    page();
    //localStorage.clear();
  }
  else{
    let icon = document.querySelector(".wrong");
    document.querySelector(".wrong").style.visibility = "visible";
  }
}

function page(){
  console.log(document.querySelector(".neon"))
  document.body.removeChild(document.querySelector(".neon"));
  let newBtn = document.createElement("a");
  newBtn.classList.add("neon");
  newBtn.href = "sampleInput.html";
  newBtn.style.position = "absolute";
  newBtn.style.left = "50%";
  newBtn.style.top = "75%";
  newBtn.style.color = "white";
  newBtn.innerHTML = "Generate New!";
  document.body.appendChild(newBtn);
}

function getSelectedValue() {
  const radioButtons = document.getElementsByName('radio');
  for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          let id = radioButton.id.substring(5);
          let radioItems = document.querySelectorAll(".radio-item");
          return radioItems[id-1].querySelector("label").innerText;
      }
  }
  return null;
}