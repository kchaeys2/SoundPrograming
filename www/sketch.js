let r ;
let notes = [60,61,62,63,64,65,66,67,69,71];
let osc = [];
let btnName = ["C","CP","D","DP","E","F","FP","G","A","B"];
let name = ["도","도#","레","레#","미","파","파#","솔","라","시"];
let permission = false;

function setup(){
  createCanvas(windowWidth+200,windowHeight);
  for (var j = 0; j < notes.length; j++) {
    osc.push(new p5.Oscillator("sine"));
    osc[j].amp(0);
  }
  textSize(12);
  if(typeof DeviceMotionEvent.requestPermission === "function"){
    let a
    let b = windowWidth / notes.length;
    for (var i = 0; i < notes.length; i++) {
      a = i * b;
      btnName[i] = createButton(name[i]);
      btnName[i].size(windowWidth/10,windowHeight);
      btnName[i].position(a,0);
    }
    accessBtn = createButton("기울기 활성화");
    accessBtn.mousePressed(iosAccess);
    accessBtn.size(100,50);
    accessBtn.position(windowWidth+50,windowHeight/2);
    plusBtn = createButton("+");
    minBtn = createButton("-");
    minBtn.size(50,50);
    plusBtn.size(50,50);
    plusBtn.position(windowWidth+50,0);
    minBtn.position(windowWidth+100,0);
    plusBtn.mousePressed(plus);
    minBtn.mousePressed(minus);
  }
 
}
let vol = 0.5;
function plus(){
  if(vol < 1.0){
    vol+=0.1;
  }else{
    vol = 1;
  }
}
function minus(){
  if(vol > 0.0){
    vol-=0.1;
  }else{
    vol = 0;
  }
}
function draw(){
  //text("S", windowWidth+90,200);
  //background(255,255,255);
  if(vol>1 || vol<0){
    //osc.freq(0);
  }
  text("볼륨 : "+vol ,windowWidth+10,160);
  if(!permission) return;
  //background(255,255,255);
  r = floor(map(rotationX, 0, 180, 0,8));
  r++;
  text("기울기 : "+r,windowWidth+10,100);

  notes = [12+(12*r),13+(12*r),14+(12*r),15+(12*r),16+(12*r),17+(12*r),
           18+(12*r),19+(12*r),21+(12*r),23+(12*r)];
}

let keys01,keys02,keys03;
let len;
function touchStarted(){
  getAudioContext().resume();
  background(255);
  text("touches.length : "+touches.length,windowWidth+10,180);
  len = touches.length;
  if(touches.length === 1){
    keys01 = floor(map(touches[0].x, 0, windowWidth, 0, notes.length));
    text("touches[0] : "+keys01,windowWidth+10,200);
  }
  else if(touches.length === 2){
    keys01 = floor(map(touches[0].x, 0, windowWidth, 0, notes.length));
    text("touches[0] : "+keys01,windowWidth+10,200);
    keys02 = floor(map(touches[1].x, 0, windowWidth, 0, notes.length));
    text("touches[1] : "+keys02,windowWidth+10,220);
  }
  else if(touches.length === 3){
    keys01 = floor(map(touches[0].x, 0, windowWidth, 0, notes.length));
    text("touches[0] : "+keys01,windowWidth+10,200);
    keys02 = floor(map(touches[1].x, 0, windowWidth, 0, notes.length));
    text("touches[1] : "+keys02,windowWidth+10,220);
    keys03 = floor(map(touches[2].x, 0, windowWidth, 0, notes.length));
    text("touches[2] : "+keys03,windowWidth+10,240);
  }
  
  if (keys01 === 0 || keys02 === 0 || keys03 ===0) {
    osc[0].start();
    osc[0].freq(midiToFreq(notes[0]));
    osc[0].fade(vol,0.2);
  } else if (keys01 === 1|| keys02 === 1 || keys03 === 1) {
    osc[1].start();
    osc[1].freq(midiToFreq(notes[1]));
    osc[1].fade(vol,0.2);
  } else if (keys01 === 2 || keys02 === 2 || keys03 === 2) {
    osc[2].start();
    osc[2].freq(midiToFreq(notes[2]));
    osc[2].fade(vol,0.2);
  } else if (keys01 === 3 || keys02 === 3 || keys03 === 3) {
    osc[3].start();
    osc[3].freq(midiToFreq(notes[3]));
    osc[3].fade(vol,0.2);
  } else if (keys01 === 4 || keys02 === 4 || keys03 === 4) {
    osc[4].start();
    osc[4].freq(midiToFreq(notes[4]));
    osc[4].fade(vol,0.2);
  } else if (keys01 === 5 || keys02 === 5 || keys03 === 5) {
    osc[5].start();
    osc[5].freq(midiToFreq(notes[5]));
    osc[5].fade(vol,0.2);
  } else if (keys01 === 6 || keys02 === 6 || keys03 === 6) {
    osc[6].start();
    osc[6].freq(midiToFreq(notes[6]));
    osc[6].fade(vol,0.2);
  } else if (keys01 === 7 || keys02 === 7 || keys03 === 7) {
    osc[7].start();
    osc[7].freq(midiToFreq(notes[7]));
    osc[7].fade(vol,0.2);
  } else if (keys01 === 8 || keys02 === 8 || keys03 === 8) {
    osc[8].start();
    osc[8].freq(midiToFreq(notes[8]));
    osc[8].fade(vol,0.2);
  } else if (keys01 === 9 || keys02 === 9 || keys03 === 9) {
    osc[9].start();
    osc[9].freq(midiToFreq(notes[9]));
    osc[9].fade(vol,0.2);
  }else{
    osc.amp(0);
  }
}

function touchEnded(){
  for (var i = 0; i < notes.length; i++) {
    osc[i].fade(0,vol);
  }
}


//draw()활성화
function iosAccess(){
  DeviceOrientationEvent.requestPermission()
    .then((response)=>{
    if(response === "granted"){
      permission = true;
    }
  })
  .catch(console.error);
}