console.log("JavaScript yüklendi!")

const nums = document.querySelectorAll(".nums span")
const counter = document.querySelector(".counter")
const final = document.querySelector(".final")
const replay = document.getElementById("replay")
const replay2 = document.getElementById("replay2")

console.log("Elementler:", {nums: nums.length, counter, final, replay})

function resetDOM() {
  counter.classList.remove("hide")
  final.classList.remove("show")
  
  nums.forEach((num) => {
    num.classList.remove("in", "out")
  })
  
  nums[0].classList.add("in")
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1
    
    num.addEventListener("animationend", (e) => {
      if (e.animationName === "goIn" && idx !== nextToLast) {
        num.classList.remove("in")
        num.classList.add("out")
      } else if (e.animationName === "goOut" && num.nextElementSibling) {
        num.nextElementSibling.classList.add("in")
      } else if (e.animationName === "goOut" && !num.nextElementSibling) {
        counter.classList.add("hide")
        final.classList.add("show")
      }
    })
  })
}

// İlk başlatma
runAnimation()

// Replay butonları
replay.addEventListener('click', () => {
  resetDOM()
  setTimeout(() => {
    runAnimation()
  }, 100)
})

replay2.addEventListener('click', () => {
  resetDOM()
  setTimeout(() => {
    runAnimation()
  }, 100)
})