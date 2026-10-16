import express from 'express';
import ollama from 'ollama';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 1. AUTOMATED FRAMEWORK INITIALIZER
// ==========================================

if (!fs.existsSync('./LICENSE')) {
    fs.writeFileSync('./LICENSE', `MIT License\n\nCopyright (c) 2026 Priyanshu Kataria\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`);
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
}

// ==========================================
// 2. SERVER & CINEMATIC INTERFACE DEPLOYMENT
// ==========================================

const app = express();
app.use(express.json());

// Serve static assets (like your bg.jpg image) from the root directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en" class="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nexen.ai // CodeMedic Cinematic AI System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        colors: {
                            crimsonGlow: '#ff2a85',
                            amberGlow: '#00f0ff',
                            panelSurface: 'rgba(10, 10, 18, 0.80)',
                        },
                        fontFamily: {
                            sans: ['Plus Jakarta Sans', 'sans-serif'],
                            mono: ['JetBrains Mono', 'monospace'],
                        }
                    }
                }
            }
        </script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
            body {
                background: url('/bg.jpg') no-repeat center center fixed;
                background-size: cover;
                min-height: 100vh;
                position: relative;
            }
            /* Dark overlay for readability over the synthwave background */
            body::before {
                content: '';
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(5, 5, 12, 0.65);
                z-index: -1;
                pointer-events: none;
            }
        </style>
    </head>
    <body class="text-gray-100 font-sans p-6 md:p-12 selection:bg-crimsonGlow selection:text-white">

        <div class="max-w-4xl mx-auto backdrop-blur-xl bg-panelSurface border border-cyan-500/20 p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
                <div>
                    <span class="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">Nexen.ai Retro Cyber Era</span>
                    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
                        <span class="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">CodeMedic</span> AI System
                    </h1>
                </div>
                <div class="flex items-center gap-3 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full shadow-[0_0_15px_rgba(255,42,133,0.3)]">
                    <span class="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                    <span class="text-xs font-semibold uppercase tracking-wider text-pink-300">Node Active</span>
                </div>
            </div>

            <p class="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                Deploy localized open-weight static code intelligence inside your immersive synthwave hardware sandbox environment.
            </p>

            <div class="relative rounded-2xl bg-black/60 border border-cyan-500/30 focus-within:border-pink-500 transition-all duration-300 shadow-inner mb-6">
                <textarea id="sourceCode" class="w-full h-64 bg-transparent text-cyan-200 font-mono text-sm p-5 resize-y outline-none" placeholder="// Inject raw source code snippet here for system diagnostics...
function processData() {
  var databaseToken = 'sh3829dkwnsl1029'; // Vulnerability asset test
}"></textarea>
            </div>

            <button onclick="triggerAnalysis()" class="px-8 py-4 bg-gradient-to-r from-pink-600 to-cyan-600 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_25px_rgba(0,240,255,0.3)] hover:shadow-[0_15px_35px_rgba(255,42,133,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-3 cursor-pointer">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Execute Analysis Pipeline
            </button>

            <div class="mt-8 text-xs font-bold uppercase tracking-[0.155em] text-cyan-400 mb-3 flex items-center gap-2">
                ⚡ Core Diagnostic Log Feed
            </div>
            <div id="logBox" class="p-6 bg-[#05050a]/90 border border-white/5 border-l-4 border-l-pink-500 rounded-xl font-mono text-sm text-gray-300 leading-relaxed shadow-inner min-h-[120px] whitespace-pre-wrap">
                Awaiting target source string injection to activate processing engine...
            </div>

        </div>

        <script>
            async function triggerAnalysis() {
                const targetText = document.getElementById('sourceCode').value;
                const logBox = document.getElementById('logBox');
                if (!targetText.trim()) { alert('Warning: Active payload code source string is empty!'); return; }
                logBox.innerHTML = "⏳ INJECTING BUFFER DATA INTO LOCAL SANDBOX INFRASTRUCTURE... RUNNING ANALYSIS STATS VIA GEMMA-2 LOCAL ENGINE... STANDBY...";
                try {
                    const response = await fetch('/api/scan', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code: targetText })
                    });
                    const dataset = await response.json();
                    logBox.innerText = dataset.analysis || "System Diagnostic Fault: " + dataset.error;
                } catch (err) {
                    logBox.innerHTML = "🚨 LOG ENGINE CONNECTION FAILURE: Verify Node backend scripts and Ollama dependencies are running properly.";
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
    console.log("🚀 CodeMedic Cinematic Framework Deployed Successfully!");
    console.log("👉 Target Dashboard Address: http://localhost:3000");
    console.log("=======================================================\n");
});
