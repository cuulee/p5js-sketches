

let palette = [
    '#8CB369',
    '#F4E285',
    '#F4A259',
    '#5B8E7D',
    '#BC4B51',
]


// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

let n = 10

var k = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(800, 800);
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

    t += TWO_PI/800

    stroke(255)
    noFill()

    rectMode(CENTER)

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            let x = height*(i+.5)/n
            let y = height*(j+.5)/n
            let s = height/n

            push()
                translate(x, y)
                //rotate(t)
                //scale(.5*(1 + sin(.1*t + .5*PI*(n*j+i)/n)))
                //let aux = sin(t + PI*(2*j+5*i)/n)
                //if(abs(aux) < sin(PI*(n-.5)/n))
                r = 0
                {
                    noStroke()
                    //stroke(255, 255*(1-.5*(1+sin(n*t))))
                    stroke(255, 128*(1+cos(t*(abs(i-n/2)+abs(j-n/2)))))
                    fill(255, random(255), 0, 64 + 64*(.5*(1+sin(n*t))))
                    rotate(t*(abs(i-n/2)+abs(j-n/2)))
                    scale(1+.5*(1+sin(t*(abs(i-n/2)+abs(j-n/2)))))
                }
                rect(0, 0, s, s)
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

function drawNoiseBackground(_n, _graphics)
{
    let c = color(255, 255, 255, 30);
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