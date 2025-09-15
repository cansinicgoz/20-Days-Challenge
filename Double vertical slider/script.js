const sliderContainer = document.querySelector(".slider-container")
const leftSlide = document.querySelector(".left-slide")
const rightSlide = document.querySelector(".right-slide")
const upButton = document.querySelector(".up-button")
const downButton = document.querySelector(".down-button")

const slidesLength = leftSlide.querySelectorAll("div").length
let activeSlideIndex = 0


leftSlide.style.top = `-${(slidesLength - 1) * 100}vh`


upButton.addEventListener("click", () => changeSlide("up"))
downButton.addEventListener("click", () => changeSlide("down"))

function changeSlide(direction) {
  const sliderHeight = sliderContainer.clientHeight

  if (direction === "up") {
    activeSlideIndex++
  } else if (direction === "down") {
    activeSlideIndex--
  }

 
  if (activeSlideIndex > slidesLength - 1) {
    activeSlideIndex = 0
  } else if (activeSlideIndex < 0) {
    activeSlideIndex = slidesLength - 1
  }

 
  rightSlide.style.transform = `translateY(-${
    activeSlideIndex * sliderHeight
  }px)`
  leftSlide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
}
