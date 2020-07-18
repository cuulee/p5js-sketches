
// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

var ns = .1

function setup()
{
    // Create canvas
    var canvas = createCanvas(900, 900);
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    if(capture)
    {
        capturer.start();
    }
}

function draw()
{
    randomSeed(42)

    background(255)

    t += TWO_PI/200

    noFill()
    
    let m = 40
    let n = 100

    push()
        for (var k = 0; k < m; k++)
        {
            sw = 40*sin(TWO_PI*k/m)
            strokeWeight(sw)

            stroke(200, 50, 50, 200)
            beginShape()
            for (var i = 0; i < n; i++)
            {
                var x =         .05*width + .9*width*i/n + .01*width*cos(-t + 5*TWO_PI*i/n)
                var y = width + .05*width + .9*width*i/n - .01*width*cos(-t + 5*TWO_PI*i/n)

                y -= .1*width*k

                if(y < .05*width)
                    continue
                
                //if(x > .9*width || y > .9*width)
                if(x > .9*width)
                    break
                
                
                curveVertex(x, y)
            }
            endShape()
        }
    pop()

    push()
        for (var k = 0; k < m; k++)
        {
            sw = 40*sin(TWO_PI*k/m)
            strokeWeight(sw)

            stroke(255, 200, 120)
            beginShape()
            for (var i = 0; i < n; i++)
            {
                var x = .03*width   + .05*width + .9*width*i/n + .01*width*cos(-t + 5*TWO_PI*i/n)
                var y = width       + .05*width + .9*width*i/n - .01*width*cos(-t + 5*TWO_PI*i/n)

                y -= .1*width*k

                if(y < .05*width)
                    continue

                //if(x > .9*width || y > .9*width)
                if(y > .9*width)
                    break
                
                curveVertex(x, y)
            }
            endShape()
        }
    pop()

    push()
        for (var k = 0; k < m; k++)
        {
            sw = 40*sin(TWO_PI*k/m)
            strokeWeight(sw)

            stroke(100, 100, 200)
            beginShape()
            for (var i = 0; i < n; i++)
            {
                var x = .06*width   + .05*width + .9*width*i/n + .01*width*cos(-t + 5*TWO_PI*i/n)
                var y = width       + .05*width + .9*width*i/n - .01*width*cos(-t + 5*TWO_PI*i/n)

                y -= .1*width*k

                //if(y < .05*width)
                //    continue

                if(x > .9*width || y > .9*width)
                    break
                
                curveVertex(x, y)
            }
            endShape()
        }
    pop()

    // Imprint the "paper texture" after everything is drawn
    //image(texture_graphics, 0, 0)
    texture_graphics.loadPixels()
    loadPixels()
    let d = pixelDensity();
    for(let x = 0; x < width; x++)
    {
        for(let y = 0; y < height; y++)
        {
            for (let i = 0; i < d; i++) 
            {
                for (let j = 0; j < d; j++) 
                {
                    index = 4 * ((y * d + j) * width * d + (x * d + i));
                    if((pixels[index+0] < 255) || (pixels[index+1] < 255) || (pixels[index+1] < 255))
                    {
                        let a = float(texture_graphics.pixels[index+3])/255
                        pixels[index+0] = (1-a)*pixels[index+0] + a*texture_graphics.pixels[index+0]
                        pixels[index+1] = (1-a)*pixels[index+1] + a*texture_graphics.pixels[index+1]
                        pixels[index+2] = (1-a)*pixels[index+2] + a*texture_graphics.pixels[index+2]
                        //pixels[index+3] = 
                    }
                }
            }
        }
    }
    
    updatePixels()

    if (t >= TWO_PI)
    {
        // Reset time
        //t = 0

        // End capture
        if(capture)
        {
            noLoop()
            capturer.stop()
            capturer.save()
            return
        }
    }

    // Capture frame
    if(capture)
    {
        capturer.capture(document.getElementById('defaultCanvas0'))
    }
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, 12);
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