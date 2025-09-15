const toggles = document.querySelectorAll('.toggle');
const goodToggle = document.getElementById('good');
const cheapToggle = document.getElementById('cheap');
const fastToggle = document.getElementById('fast');

toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => handleToggleChange(e.target));
});

function handleToggleChange(clickedToggle) {
    if (goodToggle.checked && cheapToggle.checked && fastToggle.checked) {
        if (goodToggle === clickedToggle) {
            fastToggle.checked = false;
        }
        
        if (cheapToggle === clickedToggle) {
            goodToggle.checked = false;
        }
        
        if (fastToggle === clickedToggle) {
            cheapToggle.checked = false;
        }
    }
}
