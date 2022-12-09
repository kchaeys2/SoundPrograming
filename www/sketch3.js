let C,CP,D,DP,E,F,FP,G,A,B;
let permission = false;
let wave;
let playing = false;

function setup(){
  createCanvas(windowWidth,windowHeight);
  if(typeof DeviceMotionEvent.requestPermission === "function"){
    background(255,0,0);
    
    accessBtn = createButton("Click to iOS Sensor")
    accessBtn.mousePressed(iosAccess);
  }else{

    wave = new p5.Oscillator();
    wave.setType('sine');
    wave.amp(0);
    text("is not a ios",windowWidth/2,windowHeight/9);
    //도
    sound(261,C,"도",
          windowWidth/8,windowHeight/4);
    //도#
    sound(277,CP,"도#",
      windowWidth/2.5,windowHeight/4);
    //레
    sound(293,D,"레",
          windowWidth/1.5,windowHeight/4);
    //D#
    sound(311,DP,"레#",
      windowWidth/8,windowHeight/1.9);
    //미
    sound(329,E,"미",
          windowWidth/2.5,windowHeight/1.9);
    //파
    sound(349,F,"파",
          windowWidth/1.5,windowHeight/1.9);
    //파#
    sound(369,FP,"파#",
          windowWidth/8,windowHeight/1.25);
    //솔
    sound(391,G,"솔",
          windowWidth/2.5,windowHeight/1.25);

    //라
    sound(440,A,"라",
          windowWidth/1.5,windowHeight/1.25);
    //시
    sound(493,B,"시",
          windowWidth/2.5,windowHeight+windowHeight/12);
    
  }
}

function sound(hz,btnName,name,posX,posY){
  wave.freq(hz);
  btnName = createButton(name);
  btnName.size(windowWidth/4,windowHeight/4);
  btnName.position(posX,posY);
  btnName.mousePressed(toggle);
}
function toggle(){
  if(!playing){
    wave.start();
    wave.amp(0.5,1);
    playing = true;
  }else{
    wave.amp(0,1);
    playing = false;
  }
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

function draw(){
  if(!permission) return;
  background(255,255,255);
  textSize(72);
  text(rotationX,100,100);
}

/**function touchStarted(){
  background(255,255,255);
  text(touches.length,200,200);
  text(touches[0].x,200,220);
  text(touches[0].x,200,240);
  text(touches[1].x,200,260);
  text(touches[1].x,200,280);
}**/

