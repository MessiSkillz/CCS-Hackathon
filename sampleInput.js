let inputBox = document.querySelector(".col-3");
let to = 35;
for(let i = 0; i<=3; i++){
    let box = document.createElement("div");
    box.classList.add("col-3");
    box.style.position = "absolute";
    box.style.boxShadow = "0 0 60px 0 #524eee";
    box.style.left = "30%";
    box.style.top = to+"%";
    box.innerHTML = inputBox.innerHTML;
    document.body.appendChild(box);
    to+=15;
}