// server.js (Run this with Node.js)
const express = require('express');
const { exec } = require('child_process');
const app = express();
app.use(express.json());

// Add CORS to allow your frontend to talk to this server
app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); });

app.post('/process', async (req, res) => {
    const { command } = req.body;

    if (command.includes('open vs code')) {
        exec('code'); // This command opens VS Code
        return res.json({ reply: "Opening Visual Studio Code, sir." });
    }

    // CONNECT TO AI (ChatGPT API)
    // You would use the 'openai' npm package here
    // const response = await openai.chat.completions.create({...});
    
    res.json({ reply: "I processed your command: " + command });
});

app.listen(3000, () => console.log('JARVIS Backend running on port 3000'));