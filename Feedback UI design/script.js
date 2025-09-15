const ratingElements = document.querySelectorAll('.rating');
const submitButton = document.querySelector('#send');
const feedbackPanel = document.querySelector('#panel');
let currentRating = null;

feedbackPanel.addEventListener('click', (e) => {
    if(e.target.closest('.rating')){
        clearActiveRatings();
        e.target.closest('.rating').classList.add('active');
        currentRating = e.target.closest('.rating').querySelector('small').textContent;
    }
});

submitButton.addEventListener('click', () => {
    if(currentRating === null) {
        alert('Please select a rating before sending!');
        return;
    }
    
    feedbackPanel.innerHTML = `
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${currentRating}</strong>
        <p>We'll use your feedback to improve our customer support.</p>
    `;
});

function clearActiveRatings(){
    ratingElements.forEach(rating => {
        rating.classList.remove('active');
    });
}
