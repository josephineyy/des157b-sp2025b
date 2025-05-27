new p5(p => {
  let stars = [];
  let pulseAngle = 0;
  const TOTAL_STARS = 600;
  const fireRadius = 50;
  const influenceRadius = 200; 

  p.setup = function () {
    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("stars-container");

    for (let i = 0; i < TOTAL_STARS; i++) {
      stars.push({
        x: p.random(p.width),
        y: p.random(p.height),
        baseOpacity: p.random(150, 255),
        flickerSpeed: p.random(0.01, 0.05)
      });
    }

    p.noStroke();
  };

  p.draw = function () {
    p.clear();

    pulseAngle += 0.03;
    const breathing = 1 + 0.05 * Math.sin(pulseAngle);
    const breathingOpacity = 0.5 + 0.5 * Math.sin(pulseAngle); 

    const hovering = isHoveringOverFire();

    drawStars(hovering, breathingOpacity);
    updateFireAndCircles(hovering, breathing);
  };

  function drawStars(hovering, breathingOpacity) {
    const fireEl = document.querySelector(".fire");
    const rect = fireEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let s of stars) {
      const dx = s.x - cx;
      const dy = s.y - cy;
      const distFromFire = Math.sqrt(dx * dx + dy * dy);

      let showStar = true;
      let opacityMod = 1;

      if (hovering && distFromFire <= influenceRadius) {
    
        const visibility = p.map(distFromFire, 0, influenceRadius, 0.1, 0.5);
        if (p.random() > visibility) {
          showStar = false; 
        } else {
          opacityMod = visibility * breathingOpacity;
        }
      }

      if (showStar) {
        const flicker = 0.5 + 0.5 * Math.sin(p.frameCount * s.flickerSpeed + s.x);
        const finalOpacity = s.baseOpacity * flicker * opacityMod;
        p.fill(255, finalOpacity);
        p.circle(s.x, s.y, 2);
      }
    }
  }

  function isHoveringOverFire() {
    const fireEl = document.querySelector(".fire");
    const rect = fireEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return p.dist(p.mouseX, p.mouseY, cx, cy) < fireRadius;
  }

  function updateFireAndCircles(hovering, breathing) {
    const fireEl = document.querySelector(".fire");
    const circles = [
      document.querySelector(".circle1"),
      document.querySelector(".circle2"),
      document.querySelector(".circle3")
    ];

    fireEl.style.boxShadow = hovering
      ? "0 0 40px 20px orange"
      : "0 0 20px 10px orange";

    const base = hovering ? 1.3 : 1;
    for (let i = 0; i < circles.length; i++) {
      let offset = 0.05 * Math.sin(p.frameCount * 0.05 + i);
      circles[i].style.transform = `translate(-50%, -50%) scale(${base + offset * breathing})`;
    }
  }
});
