const stars = document.getElementById('stars');
const heroText = document.getElementById('heroText');
const cityImage = document.getElementById('cityImage');

const stages = [
  {
    img: 'img/dark.png',
    starsY: 0,
    starsOpacity: 1,
    textY: 0,
    textOpacity: 1
  },
  {
    img: 'img/dark25.png',
    starsY: -100,
    starsOpacity: 1,
    textY: -40,
    textOpacity: 0.5
  },
  {
    img: 'img/dark50.png',
    starsY: -200,
    starsOpacity: 0,
    textY: -80,
    textOpacity: 0
  }
  
];

let currentStage = 0;
let isScrolling = false;

function updateScene() {
  const stage = stages[currentStage];
  cityImage.src = stage.img;
  heroText.style.transform = `translate(-50%, calc(0px + ${stage.textY}px))`;
  stars.style.opacity = stage.starsOpacity;
  heroText.style.transform = `translate(-50%, ${stage.textY}px)`;

  heroText.style.opacity = stage.textOpacity;
}

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentStage < stages.length - 1) {
    currentStage++;
  } else if (e.deltaY < 0 && currentStage > 0) {
    currentStage--;
  }

  updateScene();

  setTimeout(() => {
    isScrolling = false;
  }, 500);
});
