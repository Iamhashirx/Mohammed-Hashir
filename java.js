// --- 1. VOICE SYSTEM (Female Priority) ---
function speak(text) {
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Attempt to select a female/natural-sounding voice
    const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('google') ||
        v.name.toLowerCase().includes('microsoft zira') // Often a good female voice
    );
    
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
}

// --- 2. INTELLIGENCE ENGINE (Wikipedia Integration) ---
async function fetchWikipediaData(query) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.extract) {
            return data.extract;
        } else {
            return "I couldn't find a specific answer for that in my archives. Could you rephrase your question?";
        }
    } catch (error) {
        return "I am having trouble connecting to my knowledge base right now.";
    }
}

async function processCommand(input) {
    const outputElement = document.getElementById('ai-output');
    input = input.toLowerCase();

    // Specific Personality Responses
    if (input.includes('owner') || input.includes('who created you')) {
        const msg = "I am ALPHA. I was created by Mohammed Hashir, a talented programmer who brought me to life.";
        outputElement.innerText = msg;
        speak(msg);
        return;
    }

    // Knowledge Fetching (General Questions)
    outputElement.innerText = "Searching my archives...";
    const answer = await fetchWikipediaData(input);
    outputElement.innerText = answer;
    speak(answer);
}

// --- 3. INPUT HANDLING ---
function handleText() {
    const input = document.getElementById('cmd-input').value;
    if (input) processCommand(input);
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('cmd-input').value = transcript;
        processCommand(transcript);
    };
    recognition.start();
}