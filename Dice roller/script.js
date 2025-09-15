const DICE_SIDES = 6
const ROLL_DURATION = 1000
const ROLL_INTERVAL = 100

let isRolling = false
document.addEventListener("DOMContentLoaded", () => {
  const dice = document.getElementById("dice")
  const rollBtn = document.getElementById("roll-Btn")
  const result = document.getElementById("result")

  const rollDice = () => {
    if (isRolling) return
    isRolling = true
    rollBtn.disabled = true
    dice.classList.add("rolling")

    const rollInterval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * DICE_SIDES) + 1
      dice.textContent = ""
      dice.setAttribute("data-value", randomNumber)
    }, ROLL_INTERVAL)

    setTimeout(() => {
      clearInterval(rollInterval)
      const finalNumber = Math.floor(Math.random() * DICE_SIDES) + 1
      dice.textContent = ""
      dice.setAttribute("data-value", finalNumber)
      dice.classList.remove("rolling")

      rollBtn.disabled = false
      isRolling = false
    }, ROLL_DURATION)
  }

  rollBtn.addEventListener("click", rollDice)
  dice.addEventListener("click", rollDice)
})
