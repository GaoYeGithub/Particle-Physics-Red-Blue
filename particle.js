class Particle {
  constructor(x, y, mass, type = 'attract') {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.mass = mass;
    this.type = type;

    if (this.type === 'attract') {
      this.radius = Math.sqrt(this.mass / PI) * SCALE;
      this.color = color(255, 0, 0);
    } else {
      this.radius = Math.sqrt(this.mass / PI) * SCALE;
      this.color = color(0, 0, 255);
    }
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  physics(particle) {
    if (this === particle) return;

    let mass = this.mass * particle.mass;
    let radius = this.radius + particle.radius;
    let distance = this.position.dist(particle.position);

    if (distance <= radius) return;

    let force = p5.Vector.sub(this.position, particle.position)
      .setMag(G * mass / (distance ** 2));

    if (this.type === 'repel') {
      force.mult(-1);
    }

    particle.applyForce(force);
  }

  update() {
    let deltaVelocity = p5.Vector.mult(this.acceleration, deltaTime);
    this.velocity.set(this.velocity.add(deltaVelocity));
    this.position.set(this.position.add(p5.Vector.mult(this.velocity, deltaTime)));
    this.acceleration.set(0, 0);
  }
}
