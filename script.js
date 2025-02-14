let highestZ = 1;
let movedPapersCount = 0;
const totalPapers = document.querySelectorAll('.paper').length - 2; // Exclude the empty heart and the final message
const heartFill = document.getElementById("heart-fill");
const finalMessage = document.getElementById("final-message");

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
      movedPapersCount++;

      // Check if all papers have moved
      if (movedPapersCount === totalPapers) {
        showFinalMessage();
        fillHeart();
      }
    });
  }
}

function showFinalMessage() {
  finalMessage.style.display = "block"; // Show the final message
}

function fillHeart() {
  heartFill.style.backgroundImage = "url('path-to-heart-image.png')"; // Set the heart image (or content)
  heartFill.style.transform = "rotate(0deg)"; // Adjust rotation as needed
  heartFill.style.zIndex = highestZ;
  heartFill.innerHTML = ""; // Optionally clear any content inside
  heartFill.style.backgroundSize = "contain"; // Adjust size if needed
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// Play background music on user interaction
document.addEventListener("DOMContentLoaded", function () {
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {
    document.addEventListener("click", () => bgMusic.play(), { once: true });
  });
});