const loginformhandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  let messageElem = document.querySelector("#login-message");
  if (!messageElem) {
    messageElem = document.createElement("div");
    messageElem.id = "login-message";
    messageElem.style.color = "red";
    document.querySelector("#login-form").appendChild(messageElem);
  }
  messageElem.textContent = "";

  if (!name || !password) return;

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({ name, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    const data = await response.json().catch(() => ({}));
    messageElem.textContent = data.message || "Incorrect username or password.";
  }
};

const signupformhandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#name-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  let messageElem = document.querySelector("#signup-message");
  if (!messageElem) {
    messageElem = document.createElement("div");
    messageElem.id = "signup-message";
    messageElem.style.color = "red";
    document.querySelector("#signup-form").appendChild(messageElem);
  }
  messageElem.textContent = "";

  if (!email || !username || !password) return;

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    const data = await response.json().catch(() => ({}));
    messageElem.textContent = data.message || "Signup failed. Please try again.";
  }
};

document.querySelector("#login-form").addEventListener("submit", loginformhandler);
document.querySelector("#signup-form").addEventListener("submit", signupformhandler);
