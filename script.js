const correctPassword = "T-rex"; // Change to your desired password

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if (input === correctPassword) {
    // Hide password screen and start animation
    document.getElementById('passwordScreen').style.display = 'none';
    startMatrixAnimation();
  } else {
    alert("Mot de passe incorrect!");
  }
}


const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Matrix rain variables
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const characters = "ABCDEFGHIJKLMNOPQRSTUVXZY01X#@!$%^&*()";
const drops = Array(columns).fill(0);

// Define dinosaur ASCII art arrays (extracted from the referenced page)
// You can add more pieces as desired.
const dinosaurArts = [
  // T-Rex
  [
    "                                              ____",
    "  ___                                      .-~. /_\"-._",
    "`-._~-.                                  / /_ \"~o\  :Y",
    "     \  \                                / : \~x.  ` ')",
    "      ]  Y                              /  |  Y< ~-.__j",
    "     /   !                        _.--~T : l  l<  /.-~",
    "    /   /                 ____.--~ .   ` l /~\ \<|Y",
    "   /   /             .-~~\"        /| .    ',-~\ \L|",
    "  /   /             /     .^   \ Y~Y \.^>/l_   \"--'",
    " /   Y           .-\"(  .  l__  j_j l_/ /~_.-~    .",
    "Y    l          /    \  )    ~~~.\" / `/\"~ / \.__/l_",
    "|     \     _.-\"      ~-{__     l  :  l._Z~-.___.--~",
    "|      ~---~           /   ~~\"---\_  ' __[>",
    "l  .                _.^   ___     _>-y~",
    " \  \     .      .-~   .-~   ~>--\"  /",
    "  \  ~---\"            /     ./  _.-'",
    "   \"-.,_____.,_  _.--~\     _.-~",
    "               ~~     (   _}",
    "                      `. ~(",
    "                        )  \",
    "                  /,`--'~\--'~\"
  ],
  // Brontosaurus (by PapaJ)
  [
    "     ,--.",
    "    `.`_.`\\",
    "         \\ \\",
    "          \\ \\",
    "           \\ \\",
    "            \\ `-''^^^^^''-.",
    "             \\             `-._",
    "             >>   >  <  <__    ^'-----...,,_",
    "           //__/`---'\\__\\\\`'\"\"\"\"'\"'\"\"'''''``",
    "           `\"`\"\"      `\"\"`"
  ]
];

// Randomly choose one dinosaur ASCII art
const selectedArt = dinosaurArts[Math.floor(Math.random() * dinosaurArts.length)];

// Timing for the reveal of ASCII art (in milliseconds)
const revealDelay = 15000; // Delay before starting the reveal (15 seconds)
const revealDuration = 3000; // Duration for full reveal (3 seconds)
const startTime = Date.now();

function drawMatrix() {
  // Create a translucent black background to fade the characters slowly
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set matrix font style
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  // Draw falling characters
  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop if it goes off screen with a random chance
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Draw the dinosaur ASCII art centered on the canvas
function drawDinosaurArt(alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  // Use a larger font for the art for clarity
  const artFontSize = 20;
  ctx.font = artFontSize + "px monospace";
  ctx.fillStyle = "#FFF";

  // Calculate dimensions
  const lineHeight = artFontSize * 1.2;
  const artWidth = Math.max(...selectedArt.map(line => ctx.measureText(line).width));
  const artHeight = selectedArt.length * lineHeight;
  const startX = (canvas.width - artWidth) / 2;
  const startY = (canvas.height - artHeight) / 2;

  // Draw each line of the ASCII art
  selectedArt.forEach((line, index) => {
    ctx.fillText(line, startX, startY + index * lineHeight);
  });
  ctx.restore();
}

function animate() {
  drawMatrix();
  const elapsed = Date.now() - startTime;

  // After the delay, start revealing the dinosaur art gradually
  if (elapsed > revealDelay) {
    const revealAlpha = Math.min((elapsed - revealDelay) / revealDuration, 1);
    drawDinosaurArt(revealAlpha);
  }
  requestAnimationFrame(animate);
}

animate();
