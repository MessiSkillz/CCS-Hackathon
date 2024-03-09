fetch("/api/auth").then((res) => {
  if (res.status === 200) {
    window.location.replace("/");
  }
});

document.querySelector("button").addEventListener("click", () => {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.color = "red";
      } else {
        document.getElementById("error").style.display = "none";
        window.location.replace("/");
      }
    });
});
