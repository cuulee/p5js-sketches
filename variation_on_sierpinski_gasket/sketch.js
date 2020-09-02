
let ns = .02
let seed = 0

function setup()
{
    seed = random(100)
    canvas = createCanvas(800, 800)
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    noLoop()
}

function draw()
{
    randomSeed(seed)
    background('#c86464')
    fill(255)

    // Draw artwork
    push()
        translate(.5*width, (1 - sqrt(3)/4)*height)
        noStroke()
        scale(.5 * height)
        sierpinski(4)
    pop()

    // Draw border
    noFill()
    stroke(0)
    let n = 10
    let pad
    for(let i = 0; i < n; i++)
    {
        //pad = .05*width*exp(((i-1)/n))
        pad = map(i, 0, n, .04*height, .05*height)
        //strokeWeight(random(1, 2))
        push()
        
            translate(.5*width, .5*height)
            rotate(random(-.01*PI, .01*PI))
            translate(-.5*width, -.5*height)
            rect(pad/2, pad/2, width - pad, height - pad)
        pop()
    }

    // Draw texture
    image(texture_graphics, 0, 0)
}

function sierpinski(level)
{
    if (level == 0 || random(1) < .2)
    {
        beginShape()
        for (let i = 0; i < 3; i++)
        {
            let x = (.5 + random(.5)) * cos(i * TWO_PI / 3 + PI / 6)
            let y = (.5 + random(.5)) * sin(i * TWO_PI / 3 + PI / 6)

            vertex(x, y)
        }
        endShape()
    }
    else
    {
        for (let i = 0; i < 3; i++)
        {
            if (random() < .99)
            {
                let x = .5 * cos(i * TWO_PI / 3 + PI / 6) + .0 * random()
                let y = .5 * sin(i * TWO_PI / 3 + PI / 6) + .0 * random()

                fill(200, 200, random(100, 200))
                push()
                translate(x, y)
                scale(.5)
                sierpinski(level - 1)
                pop()
            }
        }

        //fill(50, 100, random(100, 200))
        fill(random(255))
        noStroke()
        push()
        scale(.5)
        rotate(PI)
        sierpinski(level - 1)
        pop()
    }
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 50, 5);
    for (let i = 0; i < _n; i++)
    {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(2, 4);
        let h = random(2, 4);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}