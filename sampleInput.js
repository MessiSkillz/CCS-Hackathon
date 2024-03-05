let stars = document.querySelectorAll(".fa-solid");
let isClicked = [false, false, false, false];
for(let i = 0; i<=stars.length-1; i++){
    stars[i].addEventListener("mouseenter", function(){
        stars[i].style.boxShadow = "0 0 30px 0";
        stars[i].style.color = "#25D366";
    })
    stars[i].addEventListener("mouseleave", function(){
        if(isClicked[i]==false){
            stars[i].style.boxShadow = "";
            stars[i].style.color = "grey";
        }
    })
    stars[i].addEventListener("click", function(){
        stars[i].style.boxShadow = "0 0 30px 0";
        stars[i].style.color = "#25D366";
        isClicked[i] = true;
        for(let m = 0; m<=3; m++){
            if(m!=i){
                stars[m].style.boxShadow = "";
                stars[m].style.color = "grey";
                isClicked[m] = false;
            }
        }
    })
}

function createJSON(){
    let topic = document.querySelector(".h").querySelector("input").value;
    if(topic==""){
        createAlert("Please specify a topic❗");
        return;
    }
    if(document.querySelector(".col-3").querySelector("input").value==""){
        createAlert("Please enter a sample question❗");
        return;
    }
    let options = document.querySelectorAll(".col-3");
    let options2 = [];
    for(let i = 1; i<=4; i++){
        if(options[i].querySelector("input").value == ""){
            createAlert("One of your multiple choice options is blank❗");
            return;
        }
        else{
            options2.push(options[i].querySelector("input").value);
        }
    }
    let answer = getSelected();
    if(answer=="none"){
        createAlert("Please select an answer by clicking the star next to the correct option❗");
        return;
    }
    let sendData = {
        "topic" : topic,
        "question": document.querySelector(".col-3").querySelector("input").value,
        "options": options2,
        "answer": answer
    }
    localStorage.setItem("data", JSON.stringify(sendData));
    window.location.href = "questionPage.html";
}

function createAlert(msg){
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("alertCheckbox");
    input.autocomplete = "off";
    label.appendChild(input);
    let div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("error");
    label.appendChild(div);
    let span = document.createElement("span");
    span.classList.add("alertClose");
    span.innerHTML = "X";
    div.appendChild(span);
    let span2 = document.createElement("span");
    span2.classList.add("alertText");
    span2.innerHTML = msg;
    div.appendChild(span2);
    label.style.position = "absolute";
    label.style.width = "80%";
    label.style.left = "65%";
    label.style.top = "45%";
    document.body.appendChild(label);
}

function goBack(){
    localStorage.clear();
    window.location.href = "index.html";
  }

function getSelected(){
    for(let i = 0; i<=3; i++){
        if(isClicked[i] == true){
            if(i==0){
                return "A";
            }
            if(i==1){
                return "B";
            }
            if(i==2){
                return "C";
            }
            if(i==3){
                return "D";
            }
        }
    }
    return "none";
}