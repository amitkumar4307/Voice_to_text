document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const textOutput = document.getElementById('textOutput');
    const status = document.getElementById('status');

    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        status.textContent = 'Sorry, your browser does not support speech recognition.';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Language to recognize
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1; 

    recognition.onstart = () => {
        status.textContent = 'Listening...';
    };

    recognition.onspeechend = () => {
        status.textContent = 'Speech recognition ended.';
    };

    recognition.onerror = (event) => {
        status.textContent = `Error occurred: ${event.error}`;
    };

    recognition.onresult = (event) => {
        
        const transcript = event.results[0][0].transcript;
        textOutput.value = transcript;
        status.textContent = 'Transcription complete.';
    };

    startButton.addEventListener('click', () => {
        recognition.start();
        status.textContent = 'Starting recognition...';
    });
});
