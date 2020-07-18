
let palette = [
    '#8CB369',
    '#F4E285',
    '#BC4B51',
    '#5B8E7D',
    '#F4A259',
]

// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = true

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

let ns = 20

function setup()
{
    // Create canvas
    var canvas = createCanvas(displayHeight, displayHeight, WEBGL);
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    if(capture)
    {
        capturer.start();
    }

    colorMode(HSB)
}

function draw()
{
    randomSeed(42)

    background(255)

    t += TWO_PI/200

    rotate(PI*sin(t), [1, 1, 0])

    noStroke()
    //box(.25*height)
    
    fill(palette[0])
    push()
        rotateY(t)
        rotateX(t)
        scale(1+sin(t+PI))
        translate(-.125*height, -.125*height, .125*height)
        rect(0, 0, .25*height, .25*height)
    pop()

    fill(palette[1])
    push()
        rotateZ(t)
        rotateY(t)
        scale(1+sin(t))
        translate(.125*height, -.125*height, .125*height)
        rotateY(PI/2)
        rect(0, 0, .25*height, .25*height)
    pop()

    fill(palette[2])
    push()
        rotateZ(t)
        rotateY(t)
        scale(1+sin(t))
        translate(-.125*height, -.125*height, .125*height)
        rotateY(PI/2)
        rect(0, 0, .25*height, .25*height)
    pop()

    fill(palette[3])
    push()
        rotateY(t)
        rotateX(t)
        scale(1+sin(t+PI))
        translate(-.125*height, -.125*height, -.125*height)
        rect(0, 0, .25*height, .25*height)
    pop()

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