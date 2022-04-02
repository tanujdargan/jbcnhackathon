const colors = ["#360c58", "#a27baa", "#451e6f", "#13002d"];
const backgroundColor = "#000000";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;
let recordingStarted = false;
let frameDelta = 0;

let s;

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  noiseSeed(20);
  rectMode(CENTER);
  noStroke();
  
  let vert = document.getElementById('vertShader').innerText;
  let frag = document.getElementById('fragShader').innerText;
  s = createShader(vert, frag);
}

function draw() {
  frameCount += 1;
  frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  background(backgroundColor);
  shader(s);
  
	s.setUniform('uResolution',[width,height]);
	s.setUniform('uTime',millis()/100);
  s.setUniform('uLowGpu',false);
  s.setUniform('uVeryLowGpu',false);

  s.setUniform('uSpeedColor',20.0);

  s.setUniform('uColor1',hex2rgb(colors[0]));
  s.setUniform('uColor2',hex2rgb(colors[1]));
  s.setUniform('uColor3',hex2rgb(colors[2]));
  s.setUniform('uColor4',hex2rgb(colors[3]));

  rect(0,0,width,height);
}

const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    return [ r / 255, g / 255, b / 255 ];
}