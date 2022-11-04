class Collider {
    position;
    width;
    height;
    type;
    constructor(p, w, h, t) {
        this.p = p;
        this.width = w;
        this.height = h;
        this.type = "rect"
    }
}

class Entity {
    x;
    y;
}

class Obstacle extends Entity {
    constructor(x, y, w, h) {
        super(x,y)
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    collide(other) {
        // Return true if the passed in rect intersects this.
        // let collideRightX
        let leftX = this.x - this.w/2
        strokeWeight(5)
        line(leftX, this.y-50, leftX, this.y+50)
        strokeWeight(1)
        let collideLeftX = leftX > other.x+other.width
        let topY = this.y-this.w/2;
        stroke("red")
        strokeWeight(5)
        line(this.x-60, topY, this.x+60, topY)
        strokeWeight(1)
        let collideTopY = topY > other.y-other.width/2

        // let collideBottomY
        // return ((collideRightX || collideLeftX) &&
        //     (collideTopY || collideBottomY)
        //     )
        this.collided = collideTopY && collideLeftX
        return this.collided
    }
    draw() {
        if(this.collided) {
            fill("red")
        } else {
            fill("white")
        }
        
        rect(this.x, this.y, this.w, this.h)
    }
}

class Character extends Entity {
  name
  vx = 0
  vy = 0
  lx = 0
  ly = 0
  x
  y
  width
  collider

  constructor(myName, x, y, width) {
    super(x, y)
    this.name = myName
    this.waldo = false
    this.x = x
    this.y = y
    this.width = width
    this.collider = new Collider(createVector(x, y), width, width, "rect")
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
  move(obstacle) {
    let move = Vector
    if (!obstacle.collide(this.collider)) {
      this.x += this.vx
      this.y += this.vy
    }
  }
  draw() {
    fill(255)
    square(this.x, this.y, this.width)
    text(this.name, this.x, this.y + 30)
    circle(this.x + this.lx * 10, this.y + this.ly * 10, 10)
  }
}
class Player extends Character {
    interact() {
        for(let i = 0; i < people.length; i++) {
            if(people[i] !== this) {
                if(dist(this.x+this.lx*10,this.y+this.ly*10,people[i].x,people[i].y) < 40) {
                    console.log(people[i].name)
                }
            }
        }
    }
    move(other) {
        super.move(other)
        // console.log(keyCode)
        if(keyIsPressed) {
        switch(keyCode) {
            case UP_ARROW:
                this.vy=-1;
                this.ly=-1
                break;
                case DOWN_ARROW:
                    this.vy=1;
                    this.ly=1
                    break;
                    case LEFT_ARROW:
                        this.vx=-1;
                        this.lx=-1
                        break;
                        case RIGHT_ARROW:
                            this.vx=1;
                            this.lx=1
                break;
        }
    }
    }
}

let people = []
timer = 0
function generation() {
    for(let i = 0; i < 100; i++) {
        let james = new Person("James")
        people.push(james)
    }
    people[people.length-1].waldo = true;
}
function mousePressed() {
    for(let c of people) {
        c.click()
    }
}
let mainCharacter, playerCharacter, obstacle
function keyReleased() {
    // console.log("Released")
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
        playerCharacter.vy = 0
    }
    if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
        playerCharacter.vx = 0
    }
    if(key == "x") {
        console.log("Interacting")
        playerCharacter.interact()
    }
}
function setup()
{
    createCanvas(windowWidth,windowHeight)
    rectMode(CENTER)
    textAlign(CENTER)
    mainCharacter = new Character("Bob", width/2, height/2, 30)
    people.push(mainCharacter)
    playerCharacter = new Player("Me", width/4, height/2, 30)
    people.push(playerCharacter)
    obstacle = new Obstacle(playerCharacter.x+50, playerCharacter.y, 40,40)
}

function draw()
{
    background(0)
    for(let i = 0; i < people.length; i++) {
        people[i].draw()
        people[i].move(obstacle)
    }
    obstacle.draw()
    circle(mouseX, mouseY, 20)
}