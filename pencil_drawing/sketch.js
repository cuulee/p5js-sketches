let palette = [
    '#0D3B66',
    '#F4D35E',
    '#F95738'
]

let ns = .1

function setup()
{
    canvas = createCanvas(600, 600)
    noLoop();

    canvas.parent('sketch-holder');

    graphics = createGraphics(width, height);
    drawNoiseBackground(1000000, graphics);
}

function draw()
{
    randomSeed(1)
    background(255)

    var X = []
    var Y = []
    var R = []

    for(let i = 0; i < 40; i++)
    {
        var x = random(width)
        var y = random(height)

        while(true)
        {
            var inside = false
            for(let j = 0; j < i; j++)
            {
                var D = sqrt((X[j]-x)**2 + (Y[j]-y)**2)
                if(D < R[j])
                {
                    inside = true
                    break
                }
                
            }

            if(inside)
            {
                x = random(width)
                y = random(height)
            }
            else
            {
                break
            }
        }

        var r = height*random(1/10, 1/2)

        for(let j = 0; j < i; j++)
        {
            let D = sqrt((X[j]-x)**2 + (Y[j]-y)**2)
            r = min(r, D-R[j])
        }

        X.push(x)
        Y.push(y)
        R.push(r)

        noFill()
        pencil_circle(X[i], Y[i], R[i], palette[int(random(palette.length))])
    }

    image(graphics, 0, 0)
}

function pencil_circle(x, y, r, c)
{
    push()
    translate(x, y)
    rotate(random(PI))

    strokeWeight(1)
    stroke(0)
    noFill()

    var x = r*cos(-PI/2 - PI/4)
    var y = r*sin(-PI/2 - PI/4)
    var t = -PI/8

    for(let i = 0; i < 50; i++)
    {
        stroke(c)

        var a = tan(t)
        if(i%2 == 0)
            t += random(.97, 1.0)*PI
        else
            t -= random(.97, 1.0)*PI

        let A = (1+a**2)
        let B = (2*x+2*y*a)
        let C = (x**2+y**2-r**2)

        let dx0 = (-B - sqrt(B**2 - 4*A*C)) / (2*A)
        let dx1 = (-B + sqrt(B**2 - 4*A*C)) / (2*A)
        
        if(abs(dx0) > abs(dx1))
            var dx = dx0
        else
            var dx = dx1

        let ddx = .02*dx*random(-1, +1)
        
        let x1 = x + (dx+ddx)
        let y1 = y + a*(dx+ddx)

        strokeWeight(random(1, 4))
        line(x, y, x1, y1)

        x = x1
        y = y1
    }

    pop()
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, 2);
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