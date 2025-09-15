const userList = document.getElementById("user-list")
const searchInput = document.getElementById("filter")
const users = []

loadUsers()

async function loadUsers() {
  try {
    const response = await fetch("https://randomuser.me/api?results=50")
    const data = await response.json()

    userList.innerHTML = ""

    data.results.forEach((user) => {
      const userElement = document.createElement("li")
      users.push(userElement)

      userElement.innerHTML = `
                <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                <div class="user-info">
                    <h4>${user.name.first} ${user.name.last}</h4>
                    <p>${user.location.city}, ${user.location.country}</p>
                </div>
            `

      userList.appendChild(userElement)
    })
  } catch (error) {
    console.error("Error loading users:", error)
  }
}

searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase()

  users.forEach((user) => {
    const name = user.querySelector("h4").textContent.toLowerCase()
    const location = user.querySelector("p").textContent.toLowerCase()

    if (name.includes(searchTerm) || location.includes(searchTerm)) {
      user.classList.remove("hide")
    } else {
      user.classList.add("hide")
    }
  })
})
