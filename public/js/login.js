const loginForm = document.getElementById("loginform");
const registerForm = document.getElementById("registerform");

const registerTab = document.getElementById("registerTab");
const loginTab = document.getElementById("loginTab");

 if(loginForm && registerForm) {
   registerTab.addEventListener("click", () => {
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });

  loginTab.addEventListener("click", () => {
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
 }