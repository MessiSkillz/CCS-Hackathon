window.onload = function(){
    let cube = document.querySelector("#cube-container");
    cube.style.transform = "rotateX(-25deg) rotateY(-40deg) translate(-50%, -50%)";
    cube.style.transition = "2s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
}

var i = 0;
var txt = 'Try our AI Powered problem generator, Now!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
typeWriter();

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".textBox").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}