var wave;
var playing = false;
var button;
var ampValue = 0;

function setup() {
  createCanvas(640, 480);

  wave = new p5.Oscillator();
  wave.setType('sine');
  //wave.freq(440);
  wave.amp(0);

  button = createButton('play/pause');
  button.mousePressed(toggle);
}

function draw() {
  wave.freq(ampValue);
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
function deviceMoved(){
  ampValue = accelerationX*1000;
  background(255,255,255);
  Text(accelerationX,10,10);
}