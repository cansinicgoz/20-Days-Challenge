const jokeElement = document.getElementById("joke")
const jokeButton = document.getElementById("jokeBtn")

generateJoke()

jokeButton.addEventListener("click", generateJoke)

async function generateJoke() {
  const apiConfig = {
    headers: {
      Accept: "application/json",
    },
  }

  showLoadingState()

  try {
    const response = await fetch("https://icanhazdadjoke.com", apiConfig)
    const jokeData = await response.json()

    displayJoke(jokeData.joke)
  } catch (error) {
    showErrorMessage()
  }
}

function showLoadingState() {
  jokeElement.classList.add("loading")
  jokeElement.innerHTML = ""
}

function displayJoke(joke) {
  jokeElement.classList.remove("loading")
  jokeElement.classList.add("fade-in")

  jokeElement.innerHTML = joke

  setTimeout(() => {
    jokeElement.classList.remove("fade-in")
  }, 800)
}

function showErrorMessage() {
  jokeElement.classList.remove("loading")
  jokeElement.innerHTML =
    "Sorry, the joke service is currently unavailable. Please try again later."
}