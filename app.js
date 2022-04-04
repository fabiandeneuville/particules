const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particulesTab = undefined;

const sizeInput = document.getElementById("size");
const quantityInput = document.getElementById("quantity");
const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");
const form = document.querySelector("form");
const clear = document.getElementById("clear");

let size = 10;
let quantity = 100;
let red = 255;
let green = 255;
let blue = 255;

sizeInput.addEventListener("change", () => {
    size = sizeInput.value; 
    init();
});

quantityInput.addEventListener("change", () => {
    quantity = quantityInput.value;
    init();
})

redInput.addEventListener("change", () => {
    red = redInput.value;
    init(); 
});

greenInput.addEventListener("change", () => {
    green = greenInput.value;
    init();
});

blueInput.addEventListener("change", () => {
    blue = blueInput.value;
    init();
});

clear.addEventListener("click", () => {
    size = 10;
    quantity = 100;
    red = 255;
    green = 255;
    blue = 255;
})

class Particule{
    constructor(x, y, directionX, directionY, taille, couleur){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }
    dessine(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
    }
    MAJ(){
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0){
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.dessine();
    }
}

function init(){
    particulesTab = [];
    for(let i = 0; i < quantity; i++){
        let taille = (Math.random() + 0.01) * size;
        let x = Math.random() * (window.innerWidth - taille * 2);
        let y = Math.random() * (window.innerHeight - taille * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = `rgba(${red},${green},${blue},${Math.random()})`;
        
        particulesTab.push(new Particule(x, y, directionX, directionY, taille, couleur));
    }
}

function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    for(let i = 0; i < particulesTab.length; i++){
        particulesTab[i].MAJ();
    }
}

init();
animation();

function resize(){
    init();
    animation();
}

let doIt;
window.addEventListener('resize', () => {
    clearTimeout(doIt);
    doIt = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})