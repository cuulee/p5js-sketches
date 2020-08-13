let palette = ["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F", "#264653"];
let ns = .01

function setup()
{
    canvas = createCanvas(1200, 300);
    canvas.parent('sketch-holder');
	
    graphics = createGraphics(width, height);
    graphics.colorMode(HSB, 360, 100, 100, 100);
    drawNoiseBackground(100000, graphics);
}

function draw()
{
	randomSeed(42)
	
	background(255)
	
	for(let i = 0; i < 100; i++)
	{
		let k = int(random(3))
		
		let w = map(noise(ns*mouseX, random()), 0, 1, 20, 80)
		let h = map(noise(ns*mouseX, random()), 0, 1, 20, 80)
		let a = random(180)
		
		let x = width*i/100
		let y = .5*height + .3*height*(sin(map(mouseX, 0, width, 0, PI) + TWO_PI*i/100))
		
		if(random() < .7)
		{
			let k = noise(ns*mouseX, .05*i)
			k = int(2*palette.length*k) % palette.length
			fill(palette[k])
		}
		else
		{
			fill(255, 255, 255)
		}
		
		push()
		translate(x, y)
		rotate(a)
		if(k == 0)
		{
			rect(0, 0, w, h)
		}
		else if(k == 1)
		{
			ellipse(0, 0, w, w)
		}
		else
		{
			beginShape()
				vertex(0, 0)
				vertex(w, 0)
				vertex(w, h)
				vertex(0, 0)
			endShape()
		}
		pop()
	}
	
	image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics)
{
  let c = color(0, 0, 100, 5);
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

function mouseClicked()
{
	redraw()
}