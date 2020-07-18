
let palette = [
    '#000',
    '#fff',
    '#fff',
    '#fa9'
]

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(.6*displayHeight, .6*displayHeight);
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics1 = createGraphics(width, height);
    texture_graphics2 = createGraphics(width, height);
    drawNoiseBackground1(100000, texture_graphics1);
    drawNoiseBackground2(100000, texture_graphics2);
	
    frameRate(1)
}

function draw()
{
    background(palette[0])

    t += TWO_PI/100

    let n = 8

    for(let i = 0; i < n; i++)
    {
        stroke(255)
        strokeWeight(2)
        line(width*i/n, 0, width*i/n, height)
        line(0, height*i/n, width, height*i/n)
    }

    filter(BLUR, 3)
	filter(ERODE)
	
	// Imprint the "paper texture" after everything is drawn
    image(texture_graphics1, 0, 0)

    stroke(palette[1])
    strokeWeight(5)

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if(random() < .7)
            {
                stroke(palette[1])

                push()
                    translate((i+.5)*width/n, (j+.5)*height/n)
                    glyph(0, 0, .8*width/n)
                pop()
            }
        }
    }

    // Imprint the "paper texture" after everything is drawn
    image(texture_graphics2, 0, 0)
}

function glyph(x, y, s, n = 4)
{
    push()
        translate(x - ((n-1)/2)*s/n, y - ((n-1)/2)*s/n)
        for(let i = 0; i < n; i++)
        {
            let p = 1/4
            for(let j = 0; j < n; j++)
            {
                if(random() < p & i > 0)
                {
                    //line(i*s/n, j*s/n, (i-1)*s/n, j*s/n)
                    irregular_stroke(i*s/n, j*s/n, (i-1)*s/n, j*s/n)
                }
                if(random() < p & j > 0)
                {
                    irregular_stroke(i*s/n, j*s/n, i*s/n, (j-1)*s/n)
                }
                if(random() < p & i > 0 & j > 0)
                {
                    irregular_stroke(i*s/n, j*s/n, (i-1)*s/n, (j-1)*s/n)
                }
                if(random() < p & i > 0 & j < n-1)
                {
                    irregular_stroke(i*s/n, j*s/n, (i-1)*s/n, (j+1)*s/n)
                }
            }
        }
    pop()
}

function irregular_stroke(x0, y0, x1, y1, n = 4)
{
    d = sqrt((x0 - x1)**2 + (y0 - y1)**2)

    beginShape()
        for(let i = -2; i < n+2; i++)
        {
            let x = i*x0/(n) + (n-i)*x1/(n) + .04*d*random(-1, 1)
            let y = i*y0/(n) + (n-i)*y1/(n) + .04*d*random(-1, 1)

            curveVertex(x, y)
        }
    endShape()
}

function drawNoiseBackground1(_n, _graphics)
{
    let c = color(255, 5);
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

function drawNoiseBackground2(_n, _graphics)
{
    let c = color(0, 20);
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