

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