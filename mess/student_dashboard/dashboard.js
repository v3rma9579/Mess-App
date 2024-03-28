const logoutBtn = document.querySelector(".logout")

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem()
    window.location.replace("../login_page/login.html")
})