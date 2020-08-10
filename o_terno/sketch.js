/**
 *  This technique tracks a beatThreshold level.
 *  
 *  When the current volume exceeds the beatThreshold, we have a beat, and
 *  "debounce" to ensure each beat only triggers once.
 *  
 *  When a beat is detected, we do two things to "debounce":
 *   - Increase the threshold, so that we don't get another
 *     beat right away, by adding a beatCutoff to the beatThreshold.
 *     The beatCutoff decays back to beatThreshold level at beatDecayRate.
 *   - Wait a certain amount of time before detecting another beat. This is
 *     accomplished by tracking framesSinceLastBeat > beatHoldFrames.
 *
 *  Each run through the Draw loop, the detectBeat() function decides
 *  whether we have a beat or not based on these Beat Detect Variables
 *  and the current amplitude level. 
 *  
 *  Thank you to Felix Turner's "Simple Beat Detection"
 *  http://www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/
 */

let palette = ['#b3313b', '#12476f', '#e88d22']

var soundFile;
var amplitude;

var backgroundColor;

// rectangle parameters
var rectRotate = true;
var rectMin = 15;
var rectOffset = 20;
var numRects = 10;

// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 30;

// what amplitude level can trigger a beat?
var beatThreshold = 0.11;

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

let strokecolor = 255

let beat = false;

// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

function preload() 
{
  soundFile = loadSound('music/Pegando Leve.mp3');
}

function setup() 
{
  canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  frameRate(30)

  amplitude = new p5.Amplitude();

  var smoothing = 0.6;
  fft = new p5.FFT(smoothing, 1024);

  amplitude.setInput(soundFile);
  amplitude.smooth(0.9);

  background(255);
  noStroke()

  texture_graphics = createGraphics(width, height);
  texture_graphics.background(255, 255, 255, 90)

  if(capture)
  {
      capturer.start();
  }

  soundFile.onended(endCapture);

  soundFile.play();
}

function draw() 
{

  let t = 1e-4*millis()

  var level = amplitude.getLevel();
  detectBeat(level);

  var spectrum = fft.analyze();

  // distort the rectangle based based on the amp
  var distortDiam = map(level, 0, 1, 0, 1200);

  var texts = ['o', 'ter', 'no']
  for (var i = 0; i < 3; i++)
  {
    push()
      let r = 50 + .2*distortDiam
      let x = .5*width - width + (i+2)*width/3
      let y = height - r - .5*abs(spectrum[1 + int(i*1024/3)])

      let c = color(palette[i])
      if(beat)
      {
        fill(red(c) + 70, green(c) + 70, blue(c) + 70)
      }
      else
      {
        fill(red(c), green(c), blue(c))
      }

      ellipse(x, y, r, r)

      fill(0)
      textSize(50)
      text(texts[i], x -.035*width*texts[i].length/2, y - r - .2*height)
    
      pop()
  }

  image(texture_graphics, 0, 0)

  // Capture frame
  if(capture)
  {
      //print(frameCount)
      capturer.capture(document.getElementById('defaultCanvas0'))
  }

}

function detectBeat(level) 
{
  if (level > beatCutoff && level > beatThreshold)
  {
    onBeat();
    beatCutoff = level * 1.2;
    framesSinceLastBeat = 0;
  }
  else
  {
    if (framesSinceLastBeat <= beatHoldFrames)
    {
      framesSinceLastBeat++;
    }
    else
    {
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat()
{
  beat = !beat
}

function endCapture()
{
  // End capture
  if(capture)
  {
      noLoop()
      capturer.stop()
      capturer.save()
      return
  }
}