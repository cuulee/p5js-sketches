
// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

let n = 20

var k = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(1440, 2960);
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    if(capture)
    {
        capturer.start();
    }
}

function draw()
{
    randomSeed(42)

    background(0)

    t += TWO_PI/400
    t = 9*PI/7

    strokeWeight(4)
    stroke(255)
    noFill()

    let l = (3/5)*height/n

    for(let i = 1; i < width*n/height-1; i++)
    {
        for(let j = 4; j < n-4; j++)
        {
            var o = .5*(i%2)
            var x = (5/3)*(i+0)*l + (5/6)*l
            var y = 2*(j+o)*l + l - (5/6)*l

            strokeWeight(4 - 3*(1 + sin(t + 2*PI*(n*i+j)/n)))
            stroke(255 - 255*(1 + sin(t + 2*PI*(n*i+j)/n)))
            fill(255, 64*(1 + sin(t + 2*PI*(n*i+j)/n)))

            push()
                translate(x, y)
                scale(sin(t + PI*(n*i+j)/n ))
                rotate(t)
                hexagon(0, 0, l)
            pop()
        }
    }

    // Imprint the "paper texture" after everything is drawn
    image(texture_graphics, 0, 0)

    if (t >= TWO_PI)
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

    // Capture frame
    if(capture)
    {
        capturer.capture(document.getElementById('defaultCanvas0'))
    }
}

function hexagon(x0, y0, l)
{
    push()
        translate(x0, y0)
        beginShape()
            for(var i = 0; i < 6; i++)
            {
                let x = x0 + l*cos(TWO_PI*i/6)
                let y = y0 + l*sin(TWO_PI*i/6)
                vertex(x, y)
            }
        endShape(CLOSE)
    pop()
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(255, 255, 255, 20);
    for (let i = 0; i < _n; i++)
    {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(1, 8);
        let h = random(1, 8);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}