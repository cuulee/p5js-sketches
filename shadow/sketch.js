
let palette = [
    '#DD7373',
    '#3B3561',
    '#EAD94C',
    '#D1D1D1',
    '#51A3A3'
]

var capturer = new CCapture({ format: 'png', framerate: 30 });

var i = 0
var t = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(windowHeight, windowHeight);

    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    capturer.start();
}

function draw()
{
    i += 1
    t += TWO_PI/75

    background(255)

    push()
        translate(.5*height, .5*height)
        scale((1.75 + sin(.25*t)))
        translate(-.5*height, -.5*height)

        rectMode(CENTER)

        let n = 100
        let a = PI/16 + t

        randomSeed(43)
        for(let i = 0; i < n; i++)
        {
            let x = random(height)
            let y = random(height)
            let w = random(.1*height)

            push()
                
                translate(x, y)
                
                push()
                    shearX(.1*cos(2*t))
                    shearY(.1*sin(2*t))
                    noStroke()
                    fill(palette[1])
                    
                    if(true || cos(a) > 0)
                    {
                        rect(-.4*w, -.4*w, w, w)
                    }
                    else
                    {
                        rect(.4*w, .4*w, w, w)
                    }

                pop()

            pop()
        }

        randomSeed(43)
        for(let i = 0; i < n; i++)
        {
            let x = random(height)
            let y = random(height)
            let w = random(.1*height)

            push()
                
                translate(x, y)
                rotate(.25*t)

                push()
                    //stroke(0)
                    noStroke()
                    fill(palette[0])
                    rect(0, 0, w, w)
                pop()

            pop()
        }
    
    pop()

    image(texture_graphics, 0, 0)

    if (i >= 4*75)
    {
        noLoop()
        capturer.stop()
        capturer.save()
        return
    }

    capturer.capture(document.getElementById('defaultCanvas0'))
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