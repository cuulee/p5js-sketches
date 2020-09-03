
// t is the time variable (useful for making perfectly looping gifs)
var t = 0

let n = 10

var k = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(.8*displayHeight, .8*displayHeight);
    canvas.parent('sketch-holder')

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(50000, texture_graphics);
}

function draw()
{
    randomSeed(42)

    background(0)

    t += TWO_PI/400

    stroke(255)
    noFill()

    let l = (3/5)*height/n

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
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
        let w = random(1, 4);
        let h = random(1, 4);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}