let palette = [
    '#8CB369',
    '#F4E285',
    '#F4A259',
    '#5B8E7D',
    '#BC4B51',
]

let img;

function preload()
{
    img = loadImage('frame.png');
}

function setup()
{
    img.resize(.5*img.width, .5*img.height);
    canvas = createCanvas(img.width, img.height);
    canvas.parent('sketch-holder');
    
    white_noise = createGraphics(width, height);
    white_noise.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(10**5, white_noise, color(255, 5));
    
    black_noise = createGraphics(width, height);
    black_noise.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(10**5, black_noise, color(0, 10));
    
}

function draw()
{
    background(50)
    image(white_noise, 0, 0);

    let n = 2*int(1 + 8*(1 + cos(.002*millis()))/2)

    noStroke()

    randomSeed(42)

    let ns = .05
    let N = 30
    let r = .3*width/N
    for(let i = 0; i < N; i++)
    for(let j = 0; j < (height/width)*N; j++)
    {
            let s = random(.2, 1.8)

            fill(palette[
                    round(2*palette.length*noise(ns*i - .0005*millis(), ns*j)) %
                    palette.length
            ])

            bubble((i+.5)*width/N, (j+.5)*width/N, s*r, n)
    }

    image(black_noise, 0, 0);
    image(img, 0, 0);
}

function bubble(X, Y, R, n, k)
{
    let ns = .5
    let f = 1
    let dt = random(TWO_PI)

    push()
    translate(X, Y)

    beginShape()
    for(let t = 0; t <= 1.1*TWO_PI; t += TWO_PI/30)
    {
        let d = R*(-.5 + noise(ns*cos(f*t), ns*sin(f*t), dt))
        let r = 0 + pow(R**n / (cos(f*t)**n + sin(f*t)**n), 1/n)
        
        let x = r*cos(t)
        let y = r*sin(t)

        curveVertex(x, y)
    }
    endShape(CLOSE)

    pop()
}

function drawNoiseBackground(_n, _graphics, c)
{
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