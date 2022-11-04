let entityList = []
class Collider {
  pos
  size
  type
  constructor(p, w, h, t) {
    this.pos = p
    this.size = createVector(w, h)
    this.type = "rect"
  }
  test(other, vec) {
    if (vec) {
      // Return true if the passed in rect intersects this.
      // let collideRightX
      let leftX = this.pos.x - this.size.x / 2
      strokeWeight(5)
      line(leftX, this.pos.y - 50, leftX, this.pos.y + 50)
      strokeWeight(1)
      let collideLeftX = leftX > other.size.x + other.size.x
      let topY = this.pos.y - this.size.y / 2
      stroke("red")
      strokeWeight(5)
      line(this.pos.x - 60, topY, this.pos.x + 60, topY)
      strokeWeight(1)
      let collideTopY = topY > other.pos.y - other.size.y / 2

      // let collideBottomY
      // return ((collideRightX || collideLeftX) &&
      //     (collideTopY || collideBottomY)
      //     )
      this.collided = collideTopY && collideLeftX
      return this.collided
    }
  }
}

class Entity {
  pos
  constructor(x, y) {
    this.pos = createVector(x, y)
  }
}

class Obstacle extends Entity {
  collider
  size
  constructor(x, y, w, h) {
    super(x, y)
    this.size = createVector(w, h)
  }
  draw() {
    if (this.collided) {
      fill("red")
    } else {
      fill("white")
    }

    rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
  }
}

class Character extends Entity {
  name
  vel
  lx = 0
  ly = 0
  size
  collider

  constructor(myName, x, y, width) {
    super(x, y)
    this.name = myName
    this.waldo = false
    this.size = createVector(width, width)
    this.collider = new Collider(
      createVector(x, y),
      this.size.x,
      this.size.y,
      "rect"
    )
  }
  hit(x, y) {
    let distance = dist(x, y, this.pos.x, this.pos.y)
    return distance < 15
  }
  click() {
    if (this.hit(mouseX, mouseY)) {
      console.log("You clicked me!")
    }
  }
  move(obstacleList) {
    for (let obstacle of obstacleList) {
      if (obstacle.collider.test(this.collider, this.vel)) {
        return
      }
    }
    this.pos.add(this.vel)
  }
  draw() {
    fill(255)
    square(this.pos.x, this.pos.y, this.size.x)
    text(this.name, this.pos.x, this.pos.y + 30)
    circle(this.pos.x + this.lx * 10, this.pos.y + this.ly * 10, 10)
  }
}
class Player extends Character {
  interact() {
    for (let i = 0; i < entityList.length; i++) {
      if (entityList[i] !== this) {
        if (
          dist(
            this.pos.x + this.lx * 10,
            this.pos.y + this.ly * 10,
            entityList[i].pos.x,
            entityList[i].pos.y
          ) < 40
        ) {
          console.log(entityList[i].name)
        }
      }
    }
  }
  move(other) {
    super.move(other)
    // console.log(keyCode)
    if (keyIsPressed) {
      switch (keyCode) {
        case UP_ARROW:
          this.vel.y = -1
          this.ly = -1
          break
        case DOWN_ARROW:
          this.vel.y = 1
          this.ly = 1
          break
        case LEFT_ARROW:
          this.vel.x = -1
          this.vel.y = -1
          break
        case RIGHT_ARROW:
          this.vel.x = 1
          this.lx = 1
          break
      }
    }
  }
}

timer = 0

function mousePressed() {
  for (let c of entityList) {
    c.click()
  }
}
let mainCharacter, playerCharacter, obstacle
function keyReleased() {
  // console.log("Released")
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    playerCharacter.vel.y = 0
  }
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    playerCharacter.vel.x = 0
  }
  if (key == "x") {
    console.log("Interacting")
    playerCharacter.interact()
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  textAlign(CENTER)
  mainCharacter = new Character("Bob", width / 2, height / 2, 30)
  entityList.push(mainCharacter)
  playerCharacter = new Player("Me", width / 4, height / 2, 30)
  entityList.push(playerCharacter)
  obstacle = new Obstacle(
    playerCharacter.pos.x + 50,
    playerCharacter.pos.y,
    40,
    40
  )
  entityList.push(obstacle)
}

function draw() {
  background(0)
  for (let i = 0; i < entityList.length; i++) {
    entityList[i].draw()
    entityList[i].move(entityList)
  }
  circle(mouseX, mouseY, 20)
}
