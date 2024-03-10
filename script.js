//change canvas image
const a = document.querySelector('#btncheck1');
const b = document.querySelector('#btncheck2');
const c = document.querySelector('#btncheck3');
const d = document.querySelector('#btncheck4');
const e = document.querySelector('#btncheck5');
const h = document.querySelector('#btncheck6');
const g = document.querySelector('#btncheck7');

function aL(){
    if (!a.checked){
        //console.log("open ar layer");
        document.getElementById('0').style.opacity = 0;
    } else {
        //console.log("close ar layer");
        document.getElementById('0').style.opacity = 100;
    }
}

function bL(){
    if (!b.checked){
        document.getElementById('1').style.opacity = 0;
    } else {
        document.getElementById('1').style.opacity = 100;
    }
}

function cL(){
    if (!c.checked){
        document.getElementById('2').style.opacity = 0;
    } else {
        document.getElementById('2').style.opacity = 100;
    }
}

function dL(){
    if (!d.checked){
        document.getElementById('3').style.opacity = 0;
    } else {
        document.getElementById('3').style.opacity = 100;
    }
}

function eL(){
    if (!e.checked){
        document.getElementById('4').style.opacity = 0;
    } else {
        document.getElementById('4').style.opacity = 100;
    }
}

function fL(){
    if (!f.checked){
        document.getElementById('5').style.opacity = 0;
    } else {
        document.getElementById('5').style.opacity = 100;
    }
}

function gL(){
    if (!g.checked){
        document.getElementById('6').style.opacity = 0;
    } else {
        document.getElementById('6').style.opacity = 100;
    }
}

//animation
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let partiArray;

// mouse position
let mouse = {
    x:null,
    y:null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

//particles
class Particle {
    constructor(x,y,dx,dy,size,color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }
    //method
    draw(opa){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle = "rgba(0,0,0, "+opa+")";
        ctx.fill();
    }
    update(){
        if (this.x > canvas.width || this.x <0){
            this.dx = -this.dx;
        }
        if(this.y > canvas.height || this.y < 0){
            this.dy = -this.dy;
        }

        //collision
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size*10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size *10){
                this.x -=10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size*10){
                this.y +=10;
            }
            if(mouse.y > this.y && this.y > this.size *10){
                this.y -=10;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw(1-(distance/20000));
    }
}

//array
function init(){
    partiArray = [];
    let numOfParti = (canvas.height * canvas.width)/9000 + 50;
    for(let i=0; i< numOfParti;i++){
        let size = (Math.random() * 5) +1;
        let x = (Math.random() * ((innerWidth - size *2) - (size*2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size *2) - (size*2)) + size * 2);

        let dx = (Math.random() * 5)-2.5;
        let dy = (Math.random() * 5) -2.5;
        let color = '#cff0000';

        partiArray.push(new Particle(x,y,dx,dy,size,color));
    }
}

//aniamtion
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<partiArray.length;i++){
        partiArray[i].update();
    }
    connect();
}

function connect(){
    let opa = 0.5;
    for (let i =0; i<partiArray.length;i++){
        for(let j =0; j<partiArray.length;j++){
            let d = ((partiArray[i].x - partiArray[j].x) *(partiArray[i].x - partiArray[j].x) +  (partiArray[i].y - partiArray[j].y) * (partiArray[i].y - partiArray[j].y));

            if(d < (canvas.width/7) * (canvas.height/7)){
                opa = 0.5 - (d/30000);
                ctx.strokeStyle = 'rgba(0, 0, 0, ' + opa + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(partiArray[i].x, partiArray[i].y);
                ctx.lineTo(partiArray[j].x, partiArray[j].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
)

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();
