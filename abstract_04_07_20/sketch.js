
let palette = [
    '#A1C349',
    '#87A330',
    '#E2C044',
    '#FF6542',
    '#89BBFE'
]

// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(600, 600);

    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(.7*width, .7*height);
    drawNoiseBackground(100000, texture_graphics);

    if(capture)
    {
        capturer.start();
    }

    noiseSeed(43)
}

function draw()
{
    //randomSeed(42)

    background(255)

    t += TWO_PI/100

    push()
    
        // Rotate
        translate(.5*width, .5*height)
        rotate(t)
        translate(-.5*width, -.5*height)

        for(let i = 0; i < 200; i++)
        {
            let x = height*noise(.01*i + 1000, .5*cos(t), .5*sin(t))
            let y = height*noise(.01*i + 2000, .5*cos(t), .5*sin(t))
            let s = .001*(200 - i) + .5 + .5*noise(.01*i + 3000, .5*cos(t), .5*sin(t))
            let rot = 2*TWO_PI*i/200 + TWO_PI*noise(.05*i + 4000, .5*cos(t), .5*sin(t))

            strokeWeight(random(1, 1.5))
            fill(palette[int(palette.length*noise(1000*i))])

            push()
                translate(x, y)
                rotate(rot)
                scale(s)
                leaf(0, 0, .25*width)
            pop()
        }

        if (t > TWO_PI)
        {
            // Reset time
            //t = 0

            // End capture
            if(capture)
            {
                noLoop()
                capturer.stop()
                capturer.save()
                return
            }
        }

        // Imprint the "paper texture" after everything is drawn
        image(texture_graphics, .5*(width - texture_graphics.width), .5*(height - texture_graphics.height))

        // Capture frame
        if(capture)
        {
            capturer.capture(document.getElementById('defaultCanvas0'))
        }

    pop()
}

function leaf(x, y, size)
{
    let rand1 = random(100)
    let rand2 = random(100)

    push()
        
        translate(x, y)
        let n = 100
        let r = size 

        // Draw leaf body
        beginShape()
        for(let i = 0; i < n; i++)
        {
            let t = .5*PI*i/n - .25*PI
            let x = r*cos(t) + 15*noise(.1*i, rand1)
            let y = r*sin(t)
            curveVertex(x - r*cos(.25*PI), -y)
        }
        for(let i = 0; i < n; i++)
        {
            let t = .5*PI*i/n - .25*PI
            let x = r*cos(t) + 15*noise(.1*i, rand2)
            let y = r*sin(t)
            curveVertex(-x + r*cos(.25*PI), y)
        }
        endShape(CLOSE)

    pop()
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, 4);
    for (let i = 0; i < _n; i++)
    {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(1, 4);
        let h = random(1, 4);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}