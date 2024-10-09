const quoteText = document.querySelector("p"),
    quoteAuthor = document.querySelector(".name"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    quoteBtn = document.querySelector("button");


function randomQuote() {
    //fetching random API inspiration from github page and put into JS 
    fetch("https://randominspirationalquotes.onrender.com").then (res => res.json()).then(result  => {
        console.log(result);
        quoteText.innerText = result.quote;
        quoteAuthor.innerHTML = result.author;
    });
}

//This is for copy
copyBtn.addEventListener("click", ()=> {
    navigator.clipboard.writeText(quoteText.innerHTML);
});


// This is for sound
soundBtn.addEventListener("click", ()=> {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`)
    speechSynthesis.speak(utterance); //method of spekaing
});

quoteBtn.addEventListener("click", randomQuote);