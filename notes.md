>>> to play an audio file from JS without using the <audio> html tag, do:
    const audio = new Audio("song.mp3")
    audio.play()

>>> If you want to be able to use the style property of an element to access the element's css properties from JS, you should use document.getElementById() instead of document.querySelector() to get the element in the first place

>>> To get the selected option from a choicebox in js do:
    let selectedChoice = choiceBox.options[choiceBox.selectedIndex]

>>> do textarea.value to get the text inside a TextArea from JS