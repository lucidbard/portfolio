class Character {
    name;
    x;
    y;
    vx=0;
    vy=0;
    lx=0;
    ly=0;
    constructor(myName, x, y) {
        this.name = myName;
        this.waldo = false;
        this.x = x
        this.y = y
    }
    hit(x, y) {
        let distance = dist(x, y, 
            this.x, 
            this.y) 
        return (distance < 15)
    }
    click() {
        if(this.hit(mouseX, mouseY)) {
            console.log("You clicked me!")
        }
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        fill(255)
        square(this.x, this.y, 30)
        text(this.name, this.x,this.y+30)
        circle(this.x+this.lx*10, this.y+this.ly*10, 10)
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
    move() {
        super.move()
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
let mainCharacter, playerCharacter
function keyReleased() {
    console.log("Released")
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
    mainCharacter = new Character("Bob", width/2, height/2)
    people.push(mainCharacter)
    playerCharacter = new Player("Me", width/4, height/2)
    people.push(playerCharacter)
}

function draw()
{
    background(0)
    for(let i = 0; i < people.length; i++) {
        people[i].draw()
        people[i].move()
    }
    circle(mouseX, mouseY, 20)
}