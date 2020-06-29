
let palette = [
	'#DD7373',
	'#3B3561',
	'#EAD94C',
	'#D1D1D1',
	'#51A3A3'
]

let n = 16;
let t = 0;

function setup()
{
	createCanvas(500, 500);
	//noLoop();
	colorMode(HSB);
	
	trace = createGraphics(width, height);
	trace.colorMode(HSB)
	
	texture_graphics = createGraphics(width, height);
	//texture_graphics.colorMode(HSB);
    drawNoiseBackground(100000, texture_graphics);
}

function draw() 
{
	t += .5;
	
	background(255);
	
	image(trace, 0, 0);
	trace.background(255);
	
	for(let i = 0; i < 5; i++)
	{
		randomSeed(42);
		
		push();
		trace.push();

			translate(width/2, height/2);
			trace.translate(width/2, height/2);

			rotate(i*TWO_PI/5);
			trace.rotate(i*TWO_PI/5);

			translate(-width/2, -height/2);
			trace.translate(-width/2, -height/2);

			for(let j = 0; j < n; j++)
			{
				let xs = random(width)
				let ys = random(width)
				
				let x = xs + .02*width*sin(.2*t);
				let y = (ys + 5*t) % width;
				
				let r = random(.1*height);
				let c = palette[int(random(palette.length))]//random(255);
				fill(c)
				
				if(random() < .5)
				{
					ellipse(x, y, r, r);
				}
				else
				{
					push();
					translate(x, y);
					rotate(TWO_PI*random());
					translate(-x, -y);
					rect(x, y, r, r);
					pop();
				}
				
				trace.stroke(50);
				trace.noFill();
				trace.beginShape();
				for(let t0 = t-20; t0 <= t; t0++)
				{
					let y0 = y;
					x = xs + .02*width*sin(.2*t0);
					y = (ys + 5*t0) % width;
					
					if(abs(y - y0) > .2*width)
					{
						break;
					}
					
					trace.curveVertex(x, y)
				}
				trace.endShape();
			}
		
		pop();
		trace.pop();
	}
	
    image(texture_graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics)
{
  let c = color(0, 0, 0, .02);
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