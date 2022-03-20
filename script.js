
// define elements we need
const container = document.getElementById('container');
const rocket = document.getElementById('rocket');
const btn = document.getElementById('btn');
const portal = document.getElementById('portal');
const score_span = document.getElementById('score');
const score_btn = document.getElementById('btn_score');



// define variables we need

rocket.setAttribute("src", "./img/rocket.png");
let position = 100;
let barriers_posision = 25; 
rocket.style.top = position + "px";
let score = 0;
var speed = 40;
portal.style.left = window.innerWidth-barriers_posision + "px";



// add event listeners for start buttons

score_btn.addEventListener("click",()=>{
    alert(localStorage.getItem("score"));
});
btn.addEventListener("click" , handle_start);






// handler functions

function handle_barriers_move(){                                  
    barriers_posision = 25;
    let random_num = Math.random()*(window.innerHeight-250);
    portal.style.top = random_num + "px";
    clearInterval(window.barrier);
    window.barrier = setInterval(()=>{
        barriers_posision += 10;
        portal.style.left = window.innerWidth-barriers_posision + "px";
        handle_ruuls();
        if(position >= random_num-150 &&
            position-250 <= random_num &&
            barriers_posision > window.innerWidth-200 && 
            barriers_posision < window.innerWidth-150){
                lose();
        }
    },speed);
}

function handle_start(){
    btn.style.display = "none";
    score_btn.style.display = "none";
    handle_barriers_move();
    play();
}

function handle_play_agin(){
    window.location.reload();
}

function handle_mouse_down(){
    rocket.setAttribute("src", "./img/rocket_on_fire.png");
    move(-20);
}

function handle_mouse_up(){
    rocket.setAttribute("src", "./img/rocket.png");
    move(35);
}










// game play functions


function play(){
    window.addEventListener("mousedown", handle_mouse_down);
    window.addEventListener("mouseup", handle_mouse_up);
}

function move(x){
    clearInterval(window.my_interval);
    window.my_interval = setInterval(() => {
        position += x;
        rocket.style.top = position + "px";
        if(position <= -10 || position >(window.innerHeight-150)){
            lose();
        }
    }, 40);
}


function handle_ruuls(){
    if(barriers_posision > window.innerWidth){
        score +=1;
        speed -=1;
        handle_barriers_move();
        score_span.innerHTML = `Score : ${score}`;
        if(parseInt(localStorage.getItem("score")) <= score){
            localStorage.setItem("score", score);
        }
    } 
}


function lose(){
    btn.removeEventListener("click", handle_start);
    window.removeEventListener("mousedown", handle_mouse_down);
    window.removeEventListener("mouseup", handle_mouse_up);
    clearInterval(window.my_interval);
    clearInterval(window.barrier);
    btn.style.display = "block";
    btn.innerHTML = "Play Again";
    btn.addEventListener("click", handle_play_agin);
}