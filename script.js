
const correctPassword = "T-rex"; // Change to your desired password
document.getElementById('matrixCanvas').style.display = 'none'

function checkPassword() {
	const input = document.getElementById('passwordInput').value;
	if (input === correctPassword) {
		// Hide password screen and start animation
		document.getElementById('passwordScreen').style.display = 'none';
		document.getElementById('matrixCanvas').style.display = 'block';
		setInterval(drawMatrix, 50);
		setTimeout(() => {
        fadeCanvas(document.getElementById("matrixCanvas"), "out");
				document.getElementById('finalScreen').style.display = 'block';
    		fadeCanvas(document.getElementById("dinoCanvas"), "in");
				drawAsciiArt();
      }, 7000); // 5000ms = 5 seconds
	canvas.addEventListener('click', (e) => {
	createFirework(e.clientX, e.clientY);
});
setInterval(() => {
	createFirework(random(0, canvas.width), random(0, canvas.height / 2));
}, 1500);
	
	} else {
		alert("Mot de passe incorrect!");
	}
}


const matrixCanvas = document.getElementById('matrixCanvas');
const ctxMatrix = matrixCanvas.getContext('2d');

// Resize canvas to full window size
function resizeCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
	dinoCanvas.width = window.innerWidth;
  dinoCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const fontSize = 16;
const columns = Math.floor(matrixCanvas.width / fontSize);
const drops = Array(columns).fill(0);

function drawMatrix() {
  ctxMatrix.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctxMatrix.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  ctxMatrix.fillStyle = '#0F0';
  ctxMatrix.font = `${fontSize}px monospace`;

  drops.forEach((y, index) => {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = index * fontSize;
    ctxMatrix.fillText(text, x, y * fontSize);
    if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    } else {
      drops[index]++;
    }
  });
}

const asciiCanvas = document.getElementById('dinoCanvas');
const ctxAscii = asciiCanvas.getContext('2d');
resizeCanvas(); // Ensure the ASCII canvas matches the window size

const asciiArt = [
  // T-Rex
  [
    '                                              ____',
    '  ___                                      .-~. /_"-._',
    '`-._~-.                                  / /_ "~o  :Y',
    "                                       / : ~x.  ` ')",
    '      ]  Y                              /  |  Y< ~-.__j',
    '     /   !                        _.--~T : l  l<  /.-~',
    '    /   /                 ____.--~ .   ` l /~ <|Y',
    '   /   /             .-~~"        /| .    \',-~ L|',
    '  /   /             /     .^    Y~Y .^>/l_   "--\'',
    ' /   Y           .-"(  .  l__  j_j l_/ /~_.-~    .',
    'Y    l          /      )    ~~~." / `/"~ / .__/l_',
    '|          _.-"      ~-{__     l  :  l._Z~-.___.--~',
    '|      ~---~           /   ~~"---_  \' __[>',
    'l  .                _.^   ___     _>-y~',
    '        .      .-~   .-~   ~>--"  /',
    '    ~---"            /     ./  _.-\'',
    '   "-.,_____.,_  _.--~     _.-~',
    '               ~~     (   _}',
    '                      `. ~(',
    '                        )  "',
    "                  /,`--'~--'~\"",
  ]
];

const selectedArt = asciiArt[Math.floor(Math.random() * asciiArt.length)];

function drawAsciiArt() {
  ctxAscii.clearRect(0, 0, asciiCanvas.width, asciiCanvas.height);
  ctxAscii.fillStyle = '#FFF';
	const artFontSize = 20;
  ctxAscii.font = artFontSize + 'px monospace';
  const lineHeight = artFontSize * 1.2;
	const artWidth = Math.max(...selectedArt.map(line => ctxAscii.measureText(line).width));
	const artHeight = selectedArt.length * lineHeight;
	const startX = (asciiCanvas.width - artWidth) / 2;
	const startY = (asciiCanvas.height - artHeight) / 2;

	// Draw each line of the ASCII art
	selectedArt.forEach((line, index) => {
		ctxAscii.fillText(line, startX, startY + index * lineHeight);
	});
}

function fadeCanvas(canvas, type, duration = 2000) {
  let opacity = type === "in" ? 0 : 1; // Start opacity
  const interval = 50; // Interval for updates
  const step = interval / duration;

  function fade() {
    opacity += type === "in" ? step : -step; // Increase for "in", decrease for "out"

    if (opacity >= 1) {
      opacity = 1;
      return;
    }
    if (opacity <= 0) {
      opacity = 0;
      canvas.style.display = "none"; // Hide when fully faded out
      return;
    }

    canvas.style.opacity = opacity;
    requestAnimationFrame(fade);
  }

  if (type === "in") canvas.style.display = "block"; // Ensure it's visible before fading in
  fade();
}

// Helper function for random numbers
function random(min, max) {
	return Math.random() * (max - min) + min;
}

// Particle constructor for a single firework particle
function Particle(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.radius = random(2, 4);
	this.speed = random(2, 5);
	this.angle = random(0, Math.PI * 2);
	this.vx = Math.cos(this.angle) * this.speed;
	this.vy = Math.sin(this.angle) * this.speed;
	this.alpha = 1; // opacity for fading effect
}

Particle.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;
	this.alpha -= 0.02;
	// Simulate gravity
	this.vy += 0.05;
};

Particle.prototype.draw = function() {
	ctxAscii.save();
	ctxAscii.globalAlpha = this.alpha;
	ctxAscii.beginPath();
	ctxAscii.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctxAscii.fillStyle = this.color;
	ctxAscii.fill();
	ctxAscii.restore();
};

let particles = [];

// Function to create a firework explosion at (x, y)
function createFirework(x, y) {
	const colors = ['#ff0043', '#14fc56', '#1e90ff', '#fff700'];
	const color = colors[Math.floor(Math.random() * colors.length)];
	for (let i = 0; i < 100; i++) {
		particles.push(new Particle(x, y, color));
	}
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	// Draw a semi-transparent black rectangle to create a trailing effect
	ctxAscii.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctxAscii.fillRect(0, 0, asciiCanvas.width, asciiCanvas.height);

	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.update();
		p.draw();
		// Remove particles that are completely faded out
		if (p.alpha <= 0) {
			particles.splice(i, 1);
		}
	}
}
animate();

// Create fireworks on mouse click

// Create periodic fireworks at random positions in the top half of the canvas
