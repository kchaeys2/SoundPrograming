let button;
let permission = false;

function setup(){
  createCanvas(windowWidth,windowHeight);
  if(typeof DeviceMotionEvent.requestPermission === "function"){
    background(255,0,0);
    button = createButton("Click to iOS Sensor");
    button.mousePressed(iosAccess);
  }else{
    background(0,255,0);
    text("is not a ios",100,100);
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
function touchStarted(){
  background(255,255,255);
  text(touches.length,200,200);
  text(touches[0].x,200,220);
  text(touches[0].x,200,240);
  text(touches[1].x,200,260);
  text(touches[1].x,200,280);
}