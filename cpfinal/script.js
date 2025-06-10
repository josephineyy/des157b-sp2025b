const stars = document.getElementById('stars');
const heroText = document.getElementById('heroText');
const cityImage = document.getElementById('cityImage');
const heroWrapper = document.getElementById('heroWrapper');
const chatSection = document.getElementById('chatSection');
const messages = document.querySelectorAll('.chat-message');
const starAlliance = document.getElementById('starAlliance');

const stages = [
  { img: 'img/dark.png', starsOpacity: 1 },
  { img: 'img/dark25.png', starsOpacity: 0.6 },
  { img: 'img/dark50.png', starsOpacity: 0.2 }
];

let currentStage = 0;
let isScrolling = false;
let chatVisible = false;
let map;

function updateScene() {
  cityImage.src = stages[currentStage].img;
  heroText.style.transform = `translate(-50%, -50%) scale(${1 - currentStage * 0.1})`;
  heroText.style.opacity = `${1 - currentStage * 0.4}`;
  stars.style.opacity = stages[currentStage].starsOpacity;
}

function showChat() {
  heroWrapper.style.transform = 'translateY(-100vh)';
  chatSection.style.display = 'flex';
  setTimeout(() => {
    messages.forEach((msg, i) => {
      setTimeout(() => {
        msg.style.opacity = 1;
        msg.style.transform = 'translateY(0)';
      }, i * 1000);
    });
  }, 700);
  chatVisible = true;
}

function hideChat() {
  chatSection.style.display = 'none';
  heroWrapper.style.transform = 'translateY(0)';
  messages.forEach(msg => {
    msg.style.opacity = 0;
    msg.style.transform = 'translateY(20px)';
  });
  chatVisible = false;
}

function scrollToMap() {
  starAlliance.style.display = 'block';
  starAlliance.scrollIntoView({ behavior: 'smooth' });

  if (!map) {
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap & CartoDB'
    }).addTo(map);
  }

  setTimeout(() => map.invalidateSize(), 500);
}

function addStar() {
  const location = document.getElementById('locationInput').value;
  if (!location) return alert("Please enter a location.");

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        L.marker([lat, lon], {
          icon: L.divIcon({
            className: 'custom-star-icon',
            html: '⭐',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).addTo(map).bindPopup(`🌟 ${location} has joined the Star Alliance`);
        map.setView([lat, lon], 5);
      } else {
        alert("Location not found. Try a different name.");
      }
    })
    .catch(() => alert("Something went wrong. Please try again."));
}

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (!chatVisible) {
    if (e.deltaY > 0 && currentStage < stages.length - 1) {
      currentStage++;
      updateScene();
    } else if (e.deltaY < 0 && currentStage > 0) {
      currentStage--;
      updateScene();
    } else if (e.deltaY > 0 && currentStage === stages.length - 1) {
      showChat();
    }
  } else {
    if (e.deltaY < 0) {
      hideChat();
    }
  }

  setTimeout(() => {
    isScrolling = false;
  }, 600);
});
