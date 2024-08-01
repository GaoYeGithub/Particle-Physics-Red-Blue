const G = 6.67e-11;
const SCALE = 0.001;
let particles = [];
let currentType = 'attract'; // Default particle type

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(51);
  for (const particleA of particles) {
    for (const particleB of particles) {
      if (particleA !== particleB) particleA.physics(particleB);
    }
  }

  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
}

function keyPressed() {
  if (key === '1') {
    currentType = 'attract';
  } else if (key === '2') {
    currentType = 'repel';
  }
}

function mousePressed() {
  particles.push(createParticle(createVector(mouseX, mouseY), currentType));
}

function createParticle(pos, type) {
  let x = pos?.x || random(0, width);
  let y = pos?.y || random(0, height);
  let mass = random(2e8, 1e9);
  return new Particle(x, y, mass, type);
}
