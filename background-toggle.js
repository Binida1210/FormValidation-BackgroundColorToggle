const toggleButton = document.querySelector(".icon");
let isDarkMode = false
const inputs = document.querySelectorAll('input');

toggleButton.addEventListener("click", () => {

    if(isDarkMode){
        toggleButton.style.color = 'rgba(65, 175, 159, 0.9)';
        toggleButton.classList.add("fa-toggle-on");
        toggleButton.classList.remove("fa-toggle-off");

        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        inputs.forEach(function(input) {
            input.style.borderColor = 'black';
        });
    } else {
        toggleButton.style.color = 'white';
        toggleButton.classList.add("fa-toggle-off");
        toggleButton.classList.remove("fa-toggle-on");

        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        inputs.forEach(function(input) {
            input.style.borderColor = 'rgba(65, 175, 159, 0.9)';
        });
    }
    
    isDarkMode = !isDarkMode;
})