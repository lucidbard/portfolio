class Obstacle {
  collided = false;
  sprite;
  constructor(x, y, w, h) {
    this.sprite = new Sprite(x, y, w, h)
  }
}

class Character {
  name
  constructor(myName, x, y, width) {
    this.name = myName
    this.sprite = new Sprite(x, y, width, width)
    this.sprite.draw = this.draw
    this.lx = 1
    this.ly = 0
  }
  hit(x, y) {
    let distance = dist(x, y, this.x, this.y)
    return distance < 15
  }
  click() {
    if (this.hit(mouseX, mouseY)) {
      console.log("You clicked me!")
    }
  }
  draw() {
    fill(255)
    square(0, 0, 30)
    // text(this.name, 0, 100)
    // if(this.sprite !== undefined) {
    let loc = p5.Vector.fromAngle(radians(
      this.rotation
      // 60
      ))
      // console.log(loc)
      fill(255)
      stroke(255,0,0)
    circle(15, 0, 10)
    // circle(loc.x*15, loc.y*30, 10)
    // }
    // console.log(loc)
  }
}
class Player extends Character {
  constructor(name, x, y, w) {
    super(name, x, y, w)
    this.sprite.rotationLock = true
  }
  interact() {
    for (let i = 0; i < people.length; i++) {
      if (people[i] !== this) {
        if (
          dist(
            this.sprite.x + this.lx * 10,
            this.sprite.y + this.ly * 10,
            people[i].sprite.x,
            people[i].sprite.y
          ) < 40
        ) {
          // console.log(people[i].name)
        }
      }
    }
  }
}

let people = []
// timer = 0
// function generation() {
//   for (let i = 0; i < 100; i++) {
//     let james = new Person("James")
//     people.push(james)
//   }
//   people[people.length - 1].waldo = true
// }
function mousePressed() {
  for (let c of people) {
    if(c.overlap)
    c.click()
  }
}

let mainCharacter, playerCharacter, obstacle

function keyPressed() {
        switch (keyCode) {
          case UP_ARROW:
            playerCharacter.sprite.vel.y = -1
            playerCharacter.ly = -1
            break
          case DOWN_ARROW:
            playerCharacter.sprite.vel.y = 1
            playerCharacter.ly = 1
            // playerCharacter.sprite.rotation = 90
            break
          case LEFT_ARROW:
            playerCharacter.sprite.vel.x = -1
            playerCharacter.lx = -1
            // playerCharacter.sprite.rotation = 180
            break
          case RIGHT_ARROW:
            playerCharacter.sprite.vel.x = 1
            playerCharacter.lx = 1
            // playerCharacter.sprite.rotation = 0
            break
        }
            playerCharacter.sprite.rotation=createVector(playerCharacter.lx,playerCharacter.ly).heading() 
}
function keyReleased() {
  // console.log("Released")
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    playerCharacter.sprite.vel.y = 0
    // playerCharacter.ly = 0
  }
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    playerCharacter.sprite.vel.x = 0
    // playerCharacter.lx = 0
  }
  playerCharacter.sprite.rotation=createVector(playerCharacter.lx,playerCharacter.ly).heading() 
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
  people.push(mainCharacter)
  playerCharacter = new Player("Me", width / 4, height / 2, 30)
  people.push(playerCharacter)
  obstacle = new Obstacle(playerCharacter.sprite.x + 50, playerCharacter.sprite.y, 40, 40)
}

function draw() {
  background(0)
}
