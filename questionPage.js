

var i = 0;
var txt = 'This is a question!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
typeWriter();

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".question").innerText += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}