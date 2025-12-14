// Init Icons
lucide.createIcons();

/* --- 1. Custom Cursor (Desktop Only) --- */
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hoverTriggers = document.querySelectorAll('a, button, .hover-trigger, .tilt-card');

if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        trigger.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

/* --- 2. Matrix Rain (Slower & Brighter) --- */
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

// Using binary + hex characters
const characters = "010101XYZ0011"; 
let columns = Math.floor(width / 20);
let drops = Array(columns).fill(1);

// Speed Control Variables
let lastDrawTime = 0;
const fps = 20; // Lower number = Slower rain
const nextFrameTime = 1000 / fps;

function drawMatrix(currentTime) {
    requestAnimationFrame(drawMatrix);

    // Limit speed
    if (currentTime - lastDrawTime < nextFrameTime) return;
    lastDrawTime = currentTime;

    // Fade out previous frame (creates the trail)
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; 
    ctx.fillRect(0, 0, width, height);
    
    // Set text color (Neon Green)
    ctx.font = '14px JetBrains Mono';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Randomly make some characters white for "glint" effect
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#FFFFFF'; 
        } else {
            ctx.fillStyle = '#00FF41'; 
        }

        ctx.fillText(text, i * 20, drops[i] * 20);

        // Reset drop to top randomly
        if (drops[i] * 20 > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
// Start the animation loop
requestAnimationFrame(drawMatrix);


/* --- 3. Terminal Typing --- */
const terminalLines = [
    { text: "Initializing security protocols...", time: 500 },
    { text: "Connecting to secure server...", time: 1000 },
    { text: "Access granted.", time: 1500, color: "#00ff41" },
    { text: "Loading portfolio modules...", time: 2000 },
    { text: "Welcome, User.", time: 2800, color: "#fff" }
];

const termContent = document.getElementById('terminal-content');

let currentLineIndex = 0;

function addLine() {
    if (termContent && currentLineIndex < terminalLines.length) {
        const lineData = terminalLines[currentLineIndex];
        const line = document.createElement('div');
        line.style.opacity = '0';
        line.style.color = lineData.color || '#888';
        line.innerHTML = `<span class="text-primary mr-2">➜</span> ${lineData.text}`;
        
        termContent.appendChild(line);

        setTimeout(() => {
            line.style.transition = 'opacity 0.5s';
            line.style.opacity = '1';
        }, 100);

        currentLineIndex++;
        setTimeout(addLine, 600); 
    } else if (termContent) {
        const cursor = document.createElement('div');
        cursor.innerHTML = `<span class="text-primary mr-2">➜</span> <span class="cursor-blink"></span>`;
        termContent.appendChild(cursor);
    }
}

setTimeout(addLine, 800);

/* --- 4. Mobile Menu Logic --- */
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
    // Toggle Menu
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('opacity-0');
        if (isHidden) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            // Change icon to X
            menuBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
            lucide.createIcons();
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            // Change icon back to Menu
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            lucide.createIcons();
        }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            lucide.createIcons();
        });
    });
}