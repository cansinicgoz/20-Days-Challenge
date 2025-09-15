const addBtn = document.getElementById("add")
let notes = JSON.parse(localStorage.getItem("notes")) || []

document.addEventListener("DOMContentLoaded", function () {
  notes.forEach((note) => {
    addNewNote(note.text, note.id)
  })
})

addBtn.addEventListener("click", function () {
  addNewNote()
})

function addNewNote(text = "", id = null) {
  const noteId = id || Date.now()
  const note = document.createElement("div")
  note.classList.add("note")
  note.dataset.id = noteId

  const today = new Date()
  const dateStr =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()

  note.innerHTML = `
        <div class="tools">
            <div class="note-date">${dateStr}</div>
            <div class="buttons">
                <button class="edit"><i class="fa-solid fa-edit"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <div class="main ${text ? "" : "hidden"}">${
    text ? marked(text) : ""
  }</div>
        <textarea class="${
          text ? "hidden" : ""
        }" placeholder="Notunuzu buraya yazın...">${text}</textarea>
    `

  const editBtn = note.querySelector(".edit")
  const deleteBtn = note.querySelector(".delete")
  const main = note.querySelector(".main")
  const textArea = note.querySelector("textarea")

  function saveNote() {
    const index = notes.findIndex((n) => n.id == noteId)
    const noteData = { id: noteId, text: textArea.value }

    if (index >= 0) {
      notes[index] = noteData
    } else {
      notes.push(noteData)
    }

    localStorage.setItem("notes", JSON.stringify(notes))
  }

  deleteBtn.addEventListener("click", function () {
    const index = notes.findIndex((n) => n.id == noteId)
    if (index >= 0) {
      notes.splice(index, 1)
      localStorage.setItem("notes", JSON.stringify(notes))
    }
    note.remove()
  })

  editBtn.addEventListener("click", function () {
    main.classList.toggle("hidden")
    textArea.classList.toggle("hidden")

    if (!textArea.classList.contains("hidden")) {
      textArea.focus()
    }
  })

  textArea.addEventListener("input", function () {
    main.innerHTML = marked(textArea.value)
    saveNote()
  })

  document.body.appendChild(note)
}
