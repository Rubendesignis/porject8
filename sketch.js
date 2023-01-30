var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];

let colors = [];

let colors2 = "fefefe-fffffb-fafdff-fef9fb-f7fcfe".split("-").map((a) => "#" + a);
let colors3 = "D96690-F38pr2-m2C6E0-87C2c9-88p6F2".split("-").map((a) => "#" + a);
var color_setup1, color_setup2;
let color_bg;
let v_planet = [];

function setup() {
	randomSeed(seed);
	mySize = min(windowWidth, windowHeight);
	margin = mySize / 150;
	createCanvas(windowWidth, windowHeight, WEBGL);
	color_setup1 = colors3;
	color_setup2 = random([colors3]);
	color_bg = "#202020";
	background(color_bg);
	num = int(random(40, 20));
	radius = mySize * 0.95;
	for (let a = 0; a < TAU; a += TAU / num) {
		sizes.push(random(0.1, 0.5))
	}
	t = 0;
}

function draw() {
	randomSeed(seed);
	background(color_bg);

	for (let i = 0; i < num; i++) {
		let a = (TAU / num) * i;
		let x = radius * sin(a + t) / random(10, 2) / 1.0;
		let y = radius * cos(a + t) / random(2, 10) / 1.0;
		v_planet[i] = createVector(x, y);
	}
	push();

	for (let q = 0; q < 1 / 4; q += 2*random(0.01, 0.02)) {
		for (let j = 0; j < 2; j++) {
			rotateX(random(TAU)+t / 10*j + q / random(75, 100) / 10);
			rotateY(random(PI)-t / 10*j - q / random(75, 100) / 10);
			rotateZ(random(PI/2)-t / 10*j + q / random(75, 100) / 10);
			noFill();
			strokeWeight(10.5 * random(0.2, 0.6));
			stroke(random(color_setup2));

			beginShape(LINES);
			vertex(v_planet[0].x, v_planet[0].y);
			for (let i = 0; i < num; i+=1) {
				let d = random(radius / 128, radius / 64);
				let x_plus = random(-150, 200)/12.5 +0.25 * random(-d, d) / 1;
				let y_plus =random(-100, 100)/12.5 + 0.25 * random(-d, d) / 1;
				let z_plus = random(-100, 100)/12.5 + 0.25 * random(-d, d) / 1;
				vertex(v_planet[i].x + x_plus, v_planet[i].y + y_plus,  z_plus);
			}
		  vertex(v_planet[num - 1].x, v_planet[num - 1].y);
			endShape();

			
			for (let i = 0; i < num; i += 1) {
				let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
				let x_plus = 0.5 * random(-d, d) / 1;
				let y_plus = 0.2 * random(-d, d) / 1;
				let z_plus = 0.1 * random(-d, d) / 2.5;
				stroke(random(colors2));
				strokeWeight(random(0.5));
				fill(random(color_setup2));
				push();
				translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
				rotateX(t);
				rotateY(t);
				rotateZ(t);
				box(random(5),random(2));
				pop();
			}
		}
	}
	pop();

	t += random(5,3) * random(0.001, 0.005)/0.5;
}