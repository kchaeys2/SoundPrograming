// The midi notes of a scale
var notes = [ 60, 61, 62, 63, 64, 65 , 66, 67, 69, 71];
var osc;
let btnName = ["C","CP","D","DP","E","F","FP","G","A","B"];
let name = ["도","도#","레","레#","미","파","파#","솔","라","시"];
let permission = false;
let r;

function setup() {
  createCanvas(windowWidth+150,windowHeight+20);
    // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.amp(0);
  if(typeof DeviceMotionEvent.requestPermission === "function"){
    let a
    let b = windowWidth / notes.length;
    for (var i = 0; i < notes.length; i++) {
      a = i * b;
      btnName[i] = createButton(name[i]);
      btnName[i].size(windowWidth/7,windowHeight);
      btnName[i].position(a,0);
    }
    /*C = createButton(null);
    D = createButton(null);
    E= createButton(null);
    F = createButton(null);*/
    accessBtn = createButton("Click to iOS Sensor");
    accessBtn.mousePressed(iosAccess);
    plusBtn = createButton("+");
    minBtn = createButton("-");
    minBtn.size(50,50);
    plusBtn.size(50,50);
    plusBtn.position(windowWidth+50,0);
    minBtn.position(windowWidth+100,0);
    plusBtn.mousePressed(plus);
    minBtn.mousePressed(minus);
    /*C.size(50,50);
    D.size(50,50);
    E.size(50,50);
    C.mousePressed(playC);
    D.mousePressed(playD);
    E.mousePressed(playE);
    F.mousePressed(playF);*/

  }

}
/*
function playC(){
  playNote(notes[0]); 
  print("C");
}
function playD(){
  playNote(notes[1]); 
  print("D");
}
function playE(){
  playNote(notes[2]); 
}
function playF(){
  playNote(notes[3]); 
}*/
let vol = 0.5;
function plus(){
  if(vol <= 1){
    vol+=0.1;
  }
  print(vol);
}
function minus(){
  if(vol > 0){
    vol-=0.1;
  }
  print(vol);
}
// A function to play a note
function playNote(note, duration) {
  osc.start();
  osc.freq(midiToFreq(note));
  // Fade it in
  
  osc.fade(vol,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}


function draw(){
  
  if(vol>1 || vol<0){
    //osc.freq(0);
  }
  
  if(!permission) return;
  background(255,255,255);
  textSize(73);
  r = floor(map(rotationX, 0, 180, 0,10));
  text(r,windowWidth/2,windowHeight+10);
  if(r < 0){
    r = -1;
  }
  notes = [0+(12*r),1+(12*r),2+(12*r),3+(12*r),4+(12*r),5+(12*r),
           6+(12*r),7+(12*r),8+(12*r),9+(12*r),10+(12*r),11+(12*r)];
}

function touchStarted(){
  background(255);
  text(touches.length,windowWidth+90,200);
  text(touches[0].x,windowWidth+90,220);
  text(touches[1].x,windowWidth+90,260);
}

var keys;
function mousePressed() {
  // Map mouse to the key index
  keys = floor(map(mouseX, 0, windowWidth, 0, notes.length));
  playNote(notes[keys]); 
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,vol);
}

function iosAccess(){
  DeviceOrientationEvent.requestPermission()
    .then((response)=>{
    if(response === "granted"){
      permission = true;
    }
  })
  .catch(console.error);
}