const canvas = document.getElementById("solarSystem");
canvas.width = 1000;
canvas.height = 1000;
// var style = canvas.style;
// style.marginLeft = "auto";
// style.marginRight = "auto";
const ctx = canvas.getContext("2d");

const sun = {
  x: 500,
  y: 500,
  radius: 50,
  color: "yellow",
  mass: 1.989 * Math.pow(10, 30),
};
const planets = [
  {
    name: "Mercury",
    radius: 10,
    distance: 100,
    color: "gray",
    mass: 3.3011 * Math.pow(10, 23),
    speed: 0.02,
  },
  {
    name: "Venus",
    radius: 15,
    distance: 150,
    color: "orange",
    mass: 4.8675 * Math.pow(10, 24),
    speed: 0.015,
  },
  {
    name: "Earth",
    radius: 20,
    distance: 200,
    color: "blue",
    mass: 5.97219 * Math.pow(10, 24),
    speed: 0.01,
  },
  {
    name: "Mars",
    radius: 15,
    distance: 250,
    color: "red",
    mass: 6.4171 * Math.pow(10, 23),
    speed: 0.008,
  },
  {
    name: "Jupiter",
    radius: 70,
    distance: 400,
    color: "brown",
    mass: 1.898 * Math.pow(10, 27),
    speed: 0.004,
  },
  // {
  //   name: "Saturn",
  //   radius: 60,
  //   distance: 550,
  //   color: "gold",
  //   mass: 5.683 * Math.pow(10, 26),
  //   speed: 0.003,
  // },
  // {
  //   name: "Uranus",
  //   radius: 40,
  //   distance: 700,
  //   color: "lightblue",
  //   mass: 8.681 * Math.pow(10, 25),
  //   speed: 0.002,
  // },
  // {
  //   name: "Neptune",
  //   radius: 35,
  //   distance: 850,
  //   color: "darkblue",
  //   mass: 1.024 * Math.pow(10, 26),
  //   speed: 0.0015,
  // },
];

function calculateGravityForce(m1, m2, r) {
  const G = 6.674 * Math.pow(10, -11);
  return (G * m1 * m2) / Math.pow(r, 2);
}

function updatePositionAndVelocity(planet) {
  const distance = planet.distance;
  const angle = planet.angle;
  const speed = planet.speed;

  planet.x = sun.x + distance * Math.cos(angle);
  planet.y = sun.y + distance * Math.sin(angle);

  const E = angle;
  planet.velocity = Math.sqrt(
    calculateGravityForce(sun.mass, planet.mass, distance) / planet.mass
  );

  planet.angle += speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = sun.color;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    updatePositionAndVelocity(planet);

    // Gambar garis lingkaran untuk setiap planet
    ctx.strokeStyle = planet.color;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
    ctx.stroke();

    // Gambar planet
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.fill();

    // Tampilkan kecepatan rotasi di sekitar planet
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    const speedText = `Speed: ${planet.velocity.toFixed(2)} km/s`;
    ctx.fillText(
      speedText,
      planet.x - planet.radius,
      planet.y + planet.radius + 10
    );

    // Tampilkan jarak antara planet-planet yang dinamis
    if (i < planets.length - 1) {
      const nextPlanet = planets[i + 1];
      const distanceBetweenPlanets = Math.sqrt(
        Math.pow(nextPlanet.x - planet.x, 2) +
          Math.pow(nextPlanet.y - planet.y, 2)
      );
      const distanceText = `Distance: ${distanceBetweenPlanets.toFixed(2)} km`;
      ctx.fillText(
        distanceText,
        (planet.x + nextPlanet.x) / 2,
        (planet.y + nextPlanet.y) / 2
      );
    }

    // Tampilkan nama planet di atas planet
    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.fillText(planet.name, planet.x - 15, planet.y - planet.radius - 5);
  }

  requestAnimationFrame(draw);
}

for (const planet of planets) {
  planet.angle = Math.random() * Math.PI * 2;
}

draw();
