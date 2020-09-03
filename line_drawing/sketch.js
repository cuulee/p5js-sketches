
let ns = .6
var t = 0
var run = true

function setup()
{
    canvas = createCanvas(800, 800)
    canvas.parent('sketch-holder')

    graphics = createGraphics(width, height);
		graphics.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(100000, graphics);   
}

function draw()
{
    randomSeed(42)
    background(255)

    t += .001

    push()
    translate(.05*width, .05*height)
    scale(.9)

    let n = 50
    for(let i = 0; i < n; i++)
    if(random() < .9)
    {
        strokeWeight(random(1, 3))
        noFill()
        beginShape()
        for(let j = 0; j < n; j+=1)
        {
            let x0 = width*j/n
            let y0 = width*i/n
            //let x1 = width*(j+1)/n  + 10*noise(ns*i/n, ns*j/n, random(100))
            //let y1 = width*(i+1)/n  + 10*noise(ns*i/n, ns*j/n, random(100))

            let r = .5*(width/n)*(1 + 0*noise(ns*i/n, ns*j/n, 1234))
            let a = 40*TWO_PI*(-.5 + noise(ns*i/n + t, ns*j/n))
            
            let k = 2
            let b = 2
            //let a = 0.9*((i-n/2)**k + (j-n/2)**k)**(1/b)
            
            
            let x1 = x0 + r*cos(a)
            let y1 = y0 + r*sin(a) 

            //line(x0, y0, x1, y1)
            curveVertex(x1, y1)
        }
        endShape()
    }
    pop()

    image(graphics, 0, 0)
    
}

function drawNoiseBackground(_n, _graphics)
{
  let c = color(0, 0, 50, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(2, 3);
    let h = random(2, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}