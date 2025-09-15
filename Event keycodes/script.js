const insert = document.getElementById("insert")

window.addEventListener("keydown", (event) => {
  const keyName = event.key === " " ? "Space" : event.key

  insert.innerHTML = `
        <div class="key">
            ${keyName}
            <small>event.key</small>
        </div>
        
        <div class="key">
            ${event.keyCode}
            <small>event.keyCode</small>
        </div>
       
        <div class="key">
            ${event.code}
            <small>event.code</small>
        </div>
    `
})
