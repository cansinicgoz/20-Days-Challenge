const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

empties.forEach(empty => {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
});

function dragStart() {
  this.className += ' hold';
  setTimeout(() => {
    this.className = 'invisible';
  }, 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className = 'empty hovered';
}

function dragLeave(e) {
  this.className = 'empty';
}

function dragDrop(e) {
  this.className = 'empty';
  this.appendChild(fill);
}