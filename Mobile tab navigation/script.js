const nav = document.querySelector("nav")
const list = document.querySelectorAll("nav ul li")
const content = document.querySelectorAll(".content")

list.forEach((li, index) => {
  li.addEventListener("click", () => {
    list.forEach((li) => li.classList.remove("active"))

    content.forEach((img) => img.classList.remove("show"))

    li.classList.add("active")

    content[index].classList.add("show")
  })
})
