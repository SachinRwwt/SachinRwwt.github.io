// Initialize Lucide Icons
lucide.createIcons();

/* --- 1. Matrix Rain Background --- */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);
});

const characters = "010101XYZABCDEFGHIJKLMNOPQRSTUVW";
let columns = Math.floor(width / 20);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41'; // Hacker Green
    ctx.font = '14px JetBrains Mono';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
}
drawMatrix();

/* --- 2. Terminal Typing Effect (Screenshot 1 Match) --- */
const terminalContent = document.getElementById('terminal-content');
// The exact lines from your screenshot
const lines = [
    { text: "> Initializing system...", color: "text-primary" },
    { text: "> Loading modules...", color: "text-primary" },
    { text: "> Access granted.", color: "text-primary" },
    { text: "> Welcome to Sachin Singh's Portfolio.", color: "text-white" }
];

let lineIdx = 0;
let charIdx = 0;

function typeLine() {
    if (lineIdx < lines.length) {
        // Create new line if starting
        if (charIdx === 0) {
            const div = document.createElement('div');
            div.className = `mb-1 ${lines[lineIdx].color}`;
            div.id = `term-line-${lineIdx}`;
            terminalContent.appendChild(div);
        }

        const currentDiv = document.getElementById(`term-line-${lineIdx}`);
        currentDiv.textContent += lines[lineIdx].text.charAt(charIdx);
        charIdx++;

        if (charIdx < lines[lineIdx].text.length) {
            setTimeout(typeLine, 30 + Math.random() * 20); // Random typing speed
        } else {
            lineIdx++;
            charIdx = 0;
            setTimeout(typeLine, 400); // Pause between lines
        }
    }
}
// Start typing after 500ms
setTimeout(typeLine, 500);

/* --- 3. Skill Bar Animation --- */
const observerOptions = { threshold: 0.2 };
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.style.transition = "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
            skillObserver.unobserve(bar);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});