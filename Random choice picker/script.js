const tagsEl = document.getElementById("tags")
const textarea = document.getElementById("textarea")

textarea.focus()

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value)
  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = ""
    }, 10)

    randomSelect()
  }
})

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim())
  tagsEl.innerHTML = ""
  tags.forEach((tag) => {
    const tagEl = document.createElement("span")
    tagEl.classList.add("tag")
    tagEl.innerText = tag
    tagsEl.appendChild(tagEl)
  })
}

function randomSelect() {
  const times = 20
  let currentHighlighted = null

  const interval = setInterval(() => {
    // Önceki vurguyu kaldır
    if (currentHighlighted) {
      unHighlight(currentHighlighted)
    }
    
    // Yeni rastgele tag seç
    const randomTag = pickRandomTag()
    highlight(randomTag)
    currentHighlighted = randomTag
  }, 300)

  setTimeout(() => {
    clearInterval(interval)
    // Son seçimde önceki vurguyu kaldır
    if (currentHighlighted) {
      unHighlight(currentHighlighted)
    }
    // Son seçimi yap
    const finalTag = pickRandomTag()
    showWinner(finalTag)
  }, times * 300)
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag")
  return tags[Math.floor(Math.random() * tags.length)]
}

function highlight(tag) {
  tag.classList.add("highlight")
}

function unHighlight(tag) {
  tag.classList.remove("highlight")
}

function showWinner(tag) {
  // Tüm tag'lerden winner class'ını kaldır
  const allTags = document.querySelectorAll(".tag")
  allTags.forEach(t => t.classList.remove("winner"))
  
  // Seçilen tag'e winner class'ı ekle
  tag.classList.add("winner")
  
  // Kazanan yazısını göster
  const winnerName = document.getElementById("winner-name")
  const winnerText = document.getElementById("winner")
  
  winnerName.textContent = tag.innerText
  winnerText.classList.add("show")
}
