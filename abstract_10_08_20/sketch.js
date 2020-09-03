
// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

var ns = 10

var palette = [
    '#EF6F6C',
    '#667CA3',
    '#59C9A5'
]

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

    noLoop()
}

function draw()
{
    //randomSeed(42)

    background(255)

    t += TWO_PI/800

    strokeWeight(2)

    let n = 100

    strokeWeight(5)
    noFill()
    beginShape(TRIANGLES)
    for(let i = 0; i < n; i++)
    {
        fill(palette[int(random(palette.length))])

        let r = 0
        if(i%2 == 0)
            r = .4*width + width*random(.02)
        else
            r = .38*width

        let x = .5*width + r*cos(map(i, 0, n-1, 0, TWO_PI))
        let y = .5*height + r*sin(map(i, 0, n-1, 0, TWO_PI))

        vertex(x, y)
    }
    endShape()

    fill(0)
    beginShape()
    for(let i = 0; i < n; i++)
    {
        let r = (.35 + random(.01))*width
        let x = .5*width + r*cos(map(i, 0, n-1, 0, TWO_PI))
        let y = .5*height + r*sin(map(i, 0, n-1, 0, TWO_PI))

        vertex(x, y)
    }
    beginContour()
    for(let i = 0; i < n; i++)
    {
        let r = (.34 + random(.01))*width
        let x = .5*width + r*cos(map(i, 0, n-1, TWO_PI, 0))
        let y = .5*height + r*sin(map(i, 0, n-1, TWO_PI, 0))

        vertex(x, y)
    }
    endContour()
    endShape()

    
    let r = .34*width
    noFill()
    for(let j = 0; j < 10; j++)
    {
        fill(palette[int(random(palette.length))])
        beginShape(QUADS)
        for(let i = 0; i < 10; i++)
        {
            let x = .5*width + map(j, 0, 10-1, .2*r, .9*r)*cos( map(j, 0, 10-1, 0, .5*PI) +  map(i, 0, 10-1, 0, TWO_PI))
            let y = .5*width + map(j, 0, 10-1, .2*r, .9*r)*sin( map(j, 0, 10-1, 0, .5*PI) +  map(i, 0, 10-1, 0, TWO_PI))

            vertex(x, y)
        }
        endShape()
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
    let c = color(0, 0, 0, 4);
    for (let i = 0; i < _n; i++)
    {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(1, 6);
        let h = random(1, 6);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}