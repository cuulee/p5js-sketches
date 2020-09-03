let ns = .08;
let N = 20;

function setup()
{
    canvas = createCanvas(800, 800)
    noLoop();

    canvas.parent('sketch-holder');

    colorMode(HSB);
    
    graphics = createGraphics(width, height);
    graphics.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(100000, graphics);
}

function draw()
{
    background(255)

    randomSeed(44)

    noStroke()
    fractal(8, color('red'))
    
    image(graphics, 0, 0);
}

function fractal(n, c)
{
    if(n == 0)
    {
        fill(c)
        strokeWeight(2*exp((n+1)))
        ellipse(width/2, height/2, .9*width, .9*height)
    }
    else
    {
        stroke(0)
        rect(0, 0, width, height)

        for(let i = -10; i < 10; i++)
        {
            line(20*i, 0, width + 5*i, height)
        }

        let k = 3
        for(let i = 0; i < k; i++)
        for(let j = 0; j < k; j++)
        {
            push()
                translate(width*(i)/k, width*(j)/k)
                scale(1/k)
                rotate(.04*random(-PI, PI))
                fractal(
                    int(random(n-1)),
                    color(
                        hue(c) + randomGaussian(0, 10),
                        saturation(c) + randomGaussian(0, 50),
                        brightness(c) + randomGaussian(0, 0)
                    )
                )
            pop()
        }
    }
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, .03);
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