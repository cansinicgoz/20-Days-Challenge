const container = document.querySelector(".container");
const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    const img = document.createElement("div");
    img.style.width = "200px";
    img.style.height = "300px";
    const colors = ['#DC143C', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#F7DC6F', '#85C1E9', '#F8C471', '#82E0AA', '#FF9F43', '#10AC84', '#EE5A24', '#0984e3', '#FF6348', '#2ED573', '#FFA502', '#1e90ff', '#32cd32', '#ff4500', '#00ced1'];
    img.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    img.style.borderRadius = "10px";
    img.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    img.style.display = "flex";
    img.style.alignItems = "center";
    img.style.justifyContent = "center";
    img.style.color = "white";
    img.style.fontSize = "18px";
    img.style.fontWeight = "bold";
    img.textContent = "Random Image";
    
    container.appendChild(img);
});

