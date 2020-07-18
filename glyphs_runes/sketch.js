

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
    background(0)

    t += TWO_PI/100

    let n = 8

    for(let i = 0; i < n; i++)
    {
        stroke(255)
        strokeWeight(2)
        line(width*i/n, 0, width*i/n, height)
        line(0, height*i/n, width, height*i/n)
    }
    
    fill(0, 150)
    rect(0, 0, width, height)

    filter(BLUR, 3)
		filter(ERODE)
	
    // Imprint the "paper texture" after everything is drawn
    image(texture_graphics1, 0, 0)

	stroke(255)
    strokeWeight(6)

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if(random() < .9)
            {
                push()
                    translate((i+.5)*width/n, (j+.5)*height/n)
                    glyph(0, 0, .75*width/n)
                pop()
            }
        }
    }

    // Imprint the "paper texture" after everything is drawn
    image(texture_graphics2, 0, 0)
}

function glyph(cx, cy, s, n = 4)
{
    push()
        translate(cx - ((n-1)/2 -.75)*s/n, cy - ((n-1)/2)*s/n)
        for(let i = 0; i < n; i++)
        {
            let p = .75/3
            for(let j = 0; j < n; j++)
            {
                let x0 = (i + 0 -.5*j)*s/n
                let y0 = (j)*s/n
                if(i < n-1 && random() < p)
                {
                    let x1 = x0 + s/n
                    irregular_stroke(x0, y0, x1, y0)
                }

                if(i < n-1 && j < n-1 && random() < p)
                {
                    let x1 = x0 + .5*s/n
                    let y1 = y0 + s/n
                    irregular_stroke(x0, y0, x1, y1)
                }

                if(i > 0 && j < n-1 && random() < p)
                {
                    let x1 = x0 - .5*s/n
                    let y1 = y0 + s/n
                    irregular_stroke(x0, y0, x1, y1)
                }

            }
        }
    pop()
}

function irregular_stroke(x0, y0, x1, y1, n = 4)
{
    d = sqrt((x0 - x1)**2 + (y0 - y1)**2)

    beginShape()
        for(let i = -1; i < n+2; i++)
        {
            let x = i*x0/(n) + (n-i)*x1/(n) + .03*d*random(-1, 1)
            let y = i*y0/(n) + (n-i)*y1/(n) + .03*d*random(-1, 1)

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
    let c = color(0, 30);
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