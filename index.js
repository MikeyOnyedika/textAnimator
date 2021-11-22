const animateBtn = document.querySelector(".animate-btn");
const textArea = document.querySelector("#text-area");
const delayChoiceBox = document.getElementById("choice-box");
const customPopup = document.getElementById("custom-popup");
const textEl =  document.getElementById("text-el");

let opacity = 1;
let fadePopupValue = null;
let setUpFadeValue = null;

const POPUP_NONE = 0;
const POPUP_NO_TEXT = 1
const POPUP_NO_DELAY_SELECTED = 2

let popupMessage = "";

//start animation when button is clicked
const btnEventListener = () => {
    const text = textArea.value;
    const delayIndex = delayChoiceBox.selectedIndex;
    const delayValue = delayChoiceBox.options[delayIndex].value;

    console.log("text: " + text)
    console.log("delay: " + delayIndex + delayValue)

    let popupType = POPUP_NONE;
    if (text == ""){
        popupType = POPUP_NO_TEXT
    }else if (delayIndex == 0){
        popupType = POPUP_NO_DELAY_SELECTED
    }

    if (popupType == POPUP_NONE){
        console.log("everything ok") 
        animateText(text, delayValue)
    }else {
        showPopup(popupType)
    }
  
}

//animate the text the user typed into the textarea
function animateText(animationText, animationDelay){
    let count = 0

    const animator = setInterval(writeText, animationDelay)

    function writeText(){
        if (count <= animationText.length){
            const w = animationText.slice(0, count)
            textEl.textContent = w
            playAudio()
            count++ 
        }else {
            clearInterval(animator)
            console.log("Animation finished")
        }   
    }
}

function playAudio(){
    const audio = new Audio('./assets/keyboard_btn_click.mp3');
    audio.play()
}


//setup and display the popup to inform user of invalid input
function showPopup(popup){
    if (popup == POPUP_NO_TEXT){
        popupMessage = "You have not entered any text to animate!"
    }else if (popup == POPUP_NO_DELAY_SELECTED){
        popupMessage = "Animation delay not yet selected!"
    }

    customPopup.innerHTML = `<p>${popupMessage}</p>`
    customPopup.style.opacity = "1"

    if(fadePopupValue != null){
        clearInterval(fadePopupValue)
    }
    if (setUpFadeValue != null){
        clearTimeout(setUpFadeValue)
    }

    setUpFadeValue = setTimeout(setUpFade, 1000)
}


function fadePopup(){
    customPopup.style.opacity = opacity; 
    opacity -= 0.05

    console.log("Fading...")
    if (opacity < 0){
        clearInterval(fadePopupValue)
        customPopup.style.opacity = "0"
        opacity = 1
    }
}

function setUpFade(){
    console.log("Timeout setup")
    fadePopupValue = setInterval(fadePopup, 30)
}

animateBtn.addEventListener('click', btnEventListener);