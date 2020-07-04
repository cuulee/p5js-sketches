palette = [
    '#067BC2',
    '#84BCDA',
    '#ECC30B',
    '#F37748',
    '#D56062'
]

let g = 1e-10
let n = 0
let r = []
let x = []
let vx = []

function setup()
{
    // Create canvas
    var canvas = createCanvas(800, 800);
    canvas.parent('sketch-holder');

    colorMode(HSB)

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    // Init circles
    for (let i = 0; i < n; i++) {
        r.push(.2 * random(width))

        x.push(createVector(
            random(width),
            random(width)
        ))

        vx.push(createVector(
            .0 * random(-width, width),
            .0 * random(-width, width)
        ))
    }
}

function draw() {

    background(255)

    // Check for wall collisions
    for (let i = 0; i < n; i++) {
        // Left wall
        if(x[i].x - r[i] < 0) {
            x[i].x = r[i]
            vx[i].x *= -1
        }
        // Right wall
        if(x[i].x + r[i] > width) {
            x[i].x = width - r[i]
            vx[i].x *= -1
        }
        // Top wall
        if(x[i].y - r[i] < 0) {
            x[i].y = r[i]
            vx[i].y *= -1
        }
        // Bottom wall
        if(x[i].y + r[i] > width) {
            x[i].y = width - r[i]
            vx[i].y *= -1
        }
    }

    // Gravity & Collisions
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (i != j) {
                // Get i and j masses
                mi = r[i]**2
                mj = r[j]**2
                // Compute difference between xi and xj
                diff = p5.Vector.sub(x[i], x[j])
                // Check for collision
                if(diff.mag() < r[i] + r[j])
                {
                    // Make circles lose a little radius at each collision
                    r[i] *= .999
                    r[j] *= .999

                    // Elastic collision
                    cii = (mi-mj)/(mi+mj)
                    cij = (2*mj)/(mi+mj)
                    cji = (2*mi)/(mi+mj)
                    cjj = (mj-mi)/(mi+mj)

                    // Move 
                    x[i] = p5.Vector.add(x[i], diff.mult(mj/(mi+mj)))
                    x[j] = p5.Vector.add(x[j], diff.mult(-mi/(mi+mj)))

                    vi_new = p5.Vector.add(p5.Vector.mult(vx[i], .9*cii), p5.Vector.mult(vx[j], .9*cij))
                    vj_new = p5.Vector.add(p5.Vector.mult(vx[i], .9*cji), p5.Vector.mult(vx[j], .9*cjj))

                    vx[i] = vi_new
                    vx[j] = vj_new
                }
                else
                {
                    // Normalize diff
                    diff = diff.normalize()
                    // Compute gravitational pull 'f'
                    f = diff.mult(g*mi*mj / (1 + diff.mag()**2))
                    // apply acceleration
                    vx[i] = p5.Vector.sub(vx[i], f)
                    vx[j] = p5.Vector.sub(vx[j], f.mult(-1))
                }
            }
        }
    }

    // Draw circles
    randomSeed(42)
    for (let i = 0; i < n; i++) {
        noStroke()
        //fill(random(255), 200, 200)
        fill(palette[int(random(palette.length))])
        //ellipse(x[i].x, x[i].y, 2*r[i])
        pencil_circle(x[i].x, x[i].y, r[i], palette[int(random(palette.length))])
    }

    // Move circles
    for (let i = 0; i < n; i++) {
        x[i] = p5.Vector.add(x[i], vx[i])
    }

    // Add circle
    if(n > 0 && mouseIsPressed && mouseButton == LEFT) {
        r[n-1] += 5e-3*width
        x[n-1].x = mouseX
        x[n-1].y = mouseY
    }

    // Draw texture
    image(texture_graphics, 0, 0)
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


function drawNoiseBackground(_n, _graphics) {
    let c = color(0, 0, 0, .05);
    for (let i = 0; i < _n; i++) {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(1, 4);
        let h = random(1, 4);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}

function mousePressed() {
    r.push(0)

    x.push(createVector(
        mouseX,
        mouseY
    ))

    vx.push(createVector(0, 0))

    n += 1
}