let palette = [
    '#BA3B46',
    '#2081C3'
]

let N = 25

var X
var Y
var vX
var vY
var E

let img;

function preload()
{
    img = loadImage('https://marceloprates.github.io/p5js-sketches/bubbles/oval-frame.png');
}

function setup()
{
    img.resize(.2*img.width, .2*img.height);
    canvas = createCanvas(img.width, img.height);
    canvas.parent('sketch-holder');

    X = []
    Y = []
    vX = []
    vY = []
    E = []
    R = []
    S = []
    for(let i = 0; i < N; i++)
    {
        X[i] = []
        Y[i] = []
        vX[i] = []
        vY[i] = []
        E[i] = []
        R[i] = []
        S[i] = []
        for(let j = 0; j < (height/width)*N; j++)
        {
            X[i][j] = (i+.5)*width/N
            Y[i][j] = (.8*N + j+.5)*width/N

            vX[i][j] = 0
            vY[i][j] = 0

            E[i][j] = 100

            R[i][j] = 0

            S[i][j] = 1
        }
    }

    graphics = createGraphics(width, height);
        graphics.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(100000, graphics);
}

function draw()
{
    background(255)

    let n = 2*int(1 + 20*(1 + sin(.002*millis()))/2)
    
    noStroke()
    fill(200, 100, 100)

    let ns = .1
    let r = .52*width/N
    for(let i = 0; i < N; i++)
    for(let j = 0; j < N; j++)
    {
        if(vY[i][j] != 0 && random() < 1)
        {
            E[i][j] = max(2, E[i][j] - 2)

            R[i][j] += .05*TWO_PI*(-.5 + noise(ns*i, ns*j))

            S[i][j] = min(2, S[i][j]*0.995)

            vX[i][j] = .5*sin(.01*millis() + TWO_PI*noise(i))
        }

        let a = (E[i][j] - 2)/100
        let c1 = color(palette[0])
        let c2 = color(palette[1])
        fill(
            a*red(c1)   + (1-a)*red(c2),
            a*green(c1) + (1-a)*green(c2),
            a*blue(c1)  + (1-a)*blue(c2)
        )

        bubble(X[i][j], Y[i][j], r, E[i][j], S[i][j], R[i][j])

        X[i][j] += vX[i][j]
        Y[i][j] += vY[i][j]
    }

    if(random() < .3)
    {
        let i = int(random(N))
        var j = 0

        while(vY[i][j] != 0 && j < N)
        {
            j += 1
        }
        
        vY[i][j] = -3
    }

    image(graphics, 0, 0)
    image(img, 0, 0)
}

function bubble(i, j, R, e, s, rot)
{
    let dt = random(TWO_PI)

    push()
    translate(i, j)
    scale(s)
    rotate(rot)

    beginShape()
    for(let t = 0; t <= 1.1*TWO_PI; t += TWO_PI/8)
    {
        let r = pow(R**e / (cos(t)**e + sin(t)**e), 1/e)
        
        let x = r*cos(t)
        let y = r*sin(t)

        curveVertex(x, y)
    }
    endShape(CLOSE)

    pop()
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, 5);
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