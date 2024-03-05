

let sideBarIcons = document.querySelector(".icon-bar").querySelectorAll("a");
for(let i = 0; i<=sideBarIcons.length-1; i++){
    let curr = sideBarIcons[i];
    curr.addEventListener("mouseenter", function(){
        curr.style.boxShadow = "0px 0px 100px 0 #524eee";
    });
    curr.addEventListener("mouseleave", function(){
        curr.style.boxShadow = "";
    });
}


function getSelectedValue() {
    const radioButtons = document.getElementsByName('radio');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            let id = radioButton.id.substring(5);
            let radioItems = document.querySelectorAll(".radio-item");
            localStorage.setItem("topic", radioItems[id-1].querySelector("label").innerText);
            return "good";
        }
    }
    return null;
}