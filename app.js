import express from 'express';
import ollama from 'ollama';
import fs from 'fs';

// ==========================================
// 1. AUTOMATED FRAMEWORK INITIALIZER
// This automatically creates the required open-source files if they don't exist yet!
// ==========================================

if (!fs.existsSync('./LICENSE')) {
    fs.writeFileSync('./LICENSE', `MIT License\n\nCopyright (c) 2026 Priyanshu Kataria\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`);
    console.log("📝 Framework Auto-Generated: LICENSE (MIT Open-Source Requirement Complete)");
}

if (!fs.existsSync('./skill.json')) {
    fs.writeFileSync('./skill.json', JSON.stringify({
        "name": "codemedic_analyzer",
        "version": "1.0.0",
        "description": "Scans raw programming code blocks locally via open-weight AI to pinpoint bugs and vulnerabilities.",
        "input_schema": {
            "type": "object",
            "properties": {
                "code": { "type": "string", "description": "The raw source code snippet requiring static safety analysis." }
            },
            "required": ["code"]
        },
        "output_schema": {
            "type": "object",
            "properties": {
                "analysis": { "type": "string", "description": "Structured markdown text outputting bugs, security gaps, and targeted code remediation." }
            }
        }
    }, null, 2));
    console.log("📝 Framework Auto-Generated: skill.json (Agent Skill Open Standard Compliance Complete)");
}

// ==========================================
// 2. SERVER & INTERFACE DEPLOYMENT
// ==========================================

const app = express();
app.use(express.json());

// Visual HTML User Interface Dashboard Route
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CodeMedic AI Framework</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #121214; color: #e2e2e4; max-width: 900px; margin: 40px auto; padding: 20px; }
            .frame-wrapper { background: #1a1a1e; border: 1px solid #2d2d34; padding: 30px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
            h1 { color: #4fc3f7; margin-top: 0; font-size: 28px; }
            .badge { background: #00e676; color: #000; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; vertical-align: middle; margin-left: 10px; }
            p { color: #a1a1aa; font-size: 14px; }
            textarea { width: 97%; height: 220px; background-color: #09090b; color: #4ade80; font-family: 'Courier New', monospace; border: 1px solid #2d2d34; border-radius: 6px; padding: 12px; font-size: 14px; line-height: 1.5; resize: vertical; }
            button { background-color: #4fc3f7; color: #09090b; border: none; padding: 12px 26px; cursor: pointer; font-size: 15px; font-weight: bold; border-radius: 4px; margin-top: 15px; transition: 0.2s; }
            button:hover { background-color: #29b6f6; opacity: 0.9; }
            .output-panel { margin-top: 30px; padding: 20px; background: #09090b; border-left: 4px solid #4fc3f7; border-radius: 4px; white-space: pre-wrap; color: #e4e4e7; font-size: 14px; line-height: 1.6; }
        </style>
    </head>
    <body>
        <div class="frame-wrapper">
            <h1>🩺 CodeMedic AI <span class="badge">AGENT SKILL COMPLIANT</span></h1>
            <p>Deploy localized open-weight static code intelligence. Scan assets entirely on your local machine for bugs and exposures.</p>
            
            <textarea id="sourceCode" placeholder="// Paste target source code here for evaluation...&#10;function processPayment(amount) {&#10;  var key = 'api_key_hidden'; // Vulnerability benchmark token&#10;}"></textarea>
            <br>
            <button onclick="triggerAnalysis()">Run Framework Diagnostics</button>
            
            <h3>📋 Diagnostic Output Log:</h3>
            <div id="logBox" class="output-panel">Awaiting local source code injection string...</div>
        </div>

        <script>
            async function triggerAnalysis() {
                const targetText = document.getElementById('sourceCode').value;
                const logBox = document.getElementById('logBox');
                
                if (!targetText.trim()) { alert('Please supply a code string first!'); return; }
                logBox.innerText = "⏳ Executing isolated runtime parsing via local Gemma-2... Standby...";

                try {
                    const response = await fetch('/api/scan', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code: targetText })
                    });
                    
                    const dataset = await response.json();
                    logBox.innerText = dataset.analysis || "Framework Error: " + dataset.error;
                } catch (err) {
                    logBox.innerText = "🚨 Interface Connection Dropped: Ensure node engine processes are running safely.";
                }
            }
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// 3. AGENT SKILL CORE COMPLIANCE API ENDPOINT
// ==========================================
app.post('/api/scan', async (req, res) => {
    const codePayload = req.body.code;

    if (!codePayload) {
        return res.status(400).json({ error: "Empty code buffers cannot be processed." });
    }

    try {
        // Core open-weight intelligence loop using Gemma-2 locally
        const aiStream = await ollama.chat({
            model: 'gemma2:2b',
            messages: [
                { 
                    role: 'system', 
                    content: 'You are an elite automated Senior Code Reviewer. Inspect the user programming code. Look for severe bugs, security gaps, bad practices, or syntax mistakes. Provide your output clearly inside three distinct markdown headers: "🐛 Detected Bugs", "🔒 Security Check", and "💡 How to Fix". Keep your answers direct, actionable, and brief.' 
                },
                { role: 'user', content: codePayload }
            ],
        });

        res.json({ analysis: aiStream.message.content });
    } catch (fault) {
        console.error("Local Model Processing Failure:", fault);
        res.status(500).json({ error: "Local inference node connection failed. Verify Ollama is running." });
    }
});

// ==========================================
// 4. RUN SYSTEM BACKEND PROCESS
// ==========================================
app.listen(3000, () => {
    console.log("\n=======================================================");
    console.log("🚀 CodeMedic Framework initialized successfully!");
    console.log("👉 Target UI Dashboard: http://localhost:3000");
    console.log("=======================================================\n");
});
