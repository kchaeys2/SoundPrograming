// The midi notes of a scale
var notes = [ 60, 61, 62, 63, 64, 65 , 66, 67, 69, 71];
var osc;
let btnName = ["C","CP","D","DP","E","F","FP","G","A","B"];
let name = ["도","도#","레","레#","미","파","파#","솔","라","시"];
let permission = false;
let r = 0;
let x,y,z = 0;
let len = 0;

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
      btnName[i].size(windowWidth/10,windowHeight);
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

    /*C = createButton(null);
    D = createButton(null);
    E= createButton(null);
    F = createButton(null);*/

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
  }else{
    vol = 1;
  }
  print(vol);
}
function minus(){
  if(vol > 0){
    vol-=0.1;
  }else{
    vol = 0;
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
  //text(x, windowWidth+90,200);
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
let keys01,keys02,keys03;
function touchStarted(){
  background(255);
  text("touches.length : "+touches.length,windowWidth+10,200);
  text("touches[0] : "+touches[0].x,windowWidth+10,220);
  text("touches[1] : "+touches[1].x,windowWidth+10,240);
  x=touches[0].x;
  y = touches[1].x;
  len = touches.length;
  /*if(len === 1){
    keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    text("len1 == "+len,windowWidth+10,300);
  }
  else if(len === 2){
    keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    keys02 = floor(map(touches[1].x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys02]); 
    text("len22222== "+len,windowWidth+10,300);
  }
  else if(len === 3){
    keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    keys02 = floor(map(touches[1].x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys02]); 
    keys03 = floor(map(touches[2].x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys03]); 
    text("len3== "+len,windowWidth+10,300);
  }<--남소리가 안남*/
  // Map mouse to the key index
  //keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
  //playNote(notes[keys01]); 
}
/*touches.length : (touchStarted 함수에서) 랑 len : (mousePressed) 랑 값이 다름..
  touches.length : 1이면 len : 0 나오고 2이상은 일치함..?
  len은 2개 누른 다음에 하나 누르면 len 1이 작동 안됨 lem 3은 작동 됨 
*/

function mousePressed() {
  text("len : "+len,windowWidth+10,320);
  if(len === 0){
    keys01 = floor(map(mouseX, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    text("len2 == "+len,windowWidth+10,300);
  }
  else if(len === 2){
    keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    keys02 = floor(map(mouseX, 0, windowWidth, 0, notes.length));
    playNote(notes[keys02]); 
    text("len22222== "+len,windowWidth+10,300);
  }
  else if(len === 3){
    keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys01]); 
    keys02 = floor(map(y, 0, windowWidth, 0, notes.length));
    playNote(notes[keys02]); 
    keys03 = floor(map(x, 0, windowWidth, 0, notes.length));
    playNote(notes[keys03]); 
    text("len3== "+len,windowWidth+10,300);
  }//->3개 누른 상태에서 2개 손가락 고정시키고 1개 가지고 소리 내면 x 위치 소리만 남
  //3개 동시에 소리가 안남....
  // Map mouse to the key index
  //keys01 = floor(map(x, 0, windowWidth, 0, notes.length));
  //playNote(notes[keys01]); 

  text("mouseX : "+mouseX,windowWidth+10,260);
  text("x : "+x,windowWidth+10,280);
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