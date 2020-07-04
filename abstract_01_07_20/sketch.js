
let palette = [
	'#ED6A5A',
	'#F4F1BB',
	'#9BC1BC',
	'#5CA4A9',
	'#E6EBE0'
]

let n = 100
let ns = .1
let t = 0

let coords;

function setup()
{
    canvas = createCanvas(.9*windowHeight, .9*windowHeight)
    canvas.parent('sketch-holder');
	noLoop()
	
	coords = [];
	for(let i = 0; i < n; i++)
	{
		for(let j = 0; j < n; j++)
		{
			coords.push([i, j])
		}
	}
	
    coords = coords
    .map((a) => ({sort: random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
	
	texture_graphics = createGraphics(width, height);
	drawNoiseBackground(100000, texture_graphics);
}

function draw()
{
	t += .1
	
	randomSeed(42)
	noiseSeed(42)
	
	background(255)
	
	for(let k = 0; k < n*n; k++)
	{
		let i = coords[k][0]
		let j = coords[k][1]
		let x = .0*width + 1*width*i/n
		let y = .0*height + 1*height*j/n
		
		if(sqrt((x-width/2)**2 + (y-height/2)**2) > .4*width)
			continue
		
		//fill(palette[int(random(palette.length))])
			
		push()
			translate(x, y)
			rotate(2*noise(ns*i, ns*j))
			//rotate(.02*brightness(img.get(i, j)))
		
			fill(palette[int(random(palette.length))])
			//fill(palette[int(palette.length*noise(10*ns*i, 12*ns*j, 0))])
			
			let s = random(1, 2)
			
			if(random() < 0)
			{
				stroke(0)
				rect(-s*20, -5, s*40, 10)
			}
			else
			{
				//noStroke()
				tictac(0, 0, 60, 8)
			}
		pop()
	}
	
	image(texture_graphics, 0, 0)
}

function tictac(x, y, w, h)
{
	//noStroke()
	push()
		translate(x, y)
		noStroke()
		rect(-w, -h, w-h, h)
		stroke(0)
		line(-w, -h, -h, -h)
		line(-w, 0, -h, 0)
		arc(-w, -h/2, h, h, PI/2, PI + PI/2)
		arc(-h, -h/2, h, h, PI + PI/2, 2*PI + PI/2)
	pop()
}

function drawNoiseBackground(_n, _graphics)
{
	let c = color(0, 0, 0, 10);
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