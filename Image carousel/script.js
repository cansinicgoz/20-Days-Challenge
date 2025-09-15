const imgs = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

const allImgs = imgs.querySelectorAll('img');
const imgCount = allImgs.length;
let idx = 0;

let interval = setInterval(autoSlide, 5000);

function autoSlide() {
    idx++;
    if (idx > imgCount - 1) {
        idx = 0;
    }
    changeImage();
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);
}

function changeImage() {
    const translateX = -idx * 500;
    imgs.style.transform = `translateX(${translateX}px)`;
}

leftBtn.addEventListener('click', () => {
    idx--;
    if (idx < 0) {
        idx = imgCount - 1;
    }
    changeImage();
    resetInterval();
});

rightBtn.addEventListener('click', () => {
    idx++;
    
    if (idx > imgCount - 1) {
        idx = 0;
    }
    changeImage();
    resetInterval();
});