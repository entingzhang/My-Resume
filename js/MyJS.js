//标签云运动效果
var ball = document.querySelector(".ball");
var tags = document.querySelectorAll(".ball a");
var all = [];
// 旋转的角度范围：[-1.5,1.5]
var RX = 0.1;
var RY = 0.1;
// 鼠标移动的时候坐标位置
var startX = 0;
var startY = 0;

class tag {

	constructor(a, num, count, r) {
		this.a = a;
		this.r = r;
		// 计算角度
		let b = Math.acos(((2 * num) - 1) / count - 1);
		let c = b * Math.sqrt(count * Math.PI);

		// 坐标 x,y,z
		this.x = r * Math.sin(b) * Math.cos(c);
		this.y = r * Math.sin(b) * Math.sin(c);
		this.z = r * Math.cos(b);

		// 生成一个随机的颜色
		let R = Math.floor(Math.random() * 255);
		let G = Math.floor(Math.random() * 255);
		let B = Math.floor(Math.random() * 255);
		this.a.style.color = `rgb(${R},${G},${B})`;

		this.setPosition(this.x, this.y, this.z);
	}

	// 设置标签的位置
	setPosition(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.a.style.top = this.y + this.r - this.a.offsetHeight / 2 + "px";
		this.a.style.left = this.x + this.r - this.a.offsetWidth / 2 + "px";
		this.a.style.fontSize = ((this.z + this.r) / (2 * this.r) + 1) * 12 + 'px';
		this.a.style.zIndex = Math.ceil(this.z);

	}

	rotateX(d) {

		let z1 = this.y * Math.sin(Math.PI / 180 * d) + this.z * Math.cos(Math.PI / 180 * d);
		let x1 = this.x;
		let y1 = this.y * Math.cos(Math.PI / 180 * d) - this.z * Math.sin(Math.PI / 180 * d);

		this.setPosition(x1, y1, z1);

	}
	rotateY(d) {
		let x1 = this.z * Math.sin(Math.PI / 180 * d) + this.x * Math.cos(Math.PI / 180 * d);
		let y1 = this.y;
		let z1 = this.z * Math.cos(Math.PI / 180 * d) - this.x * Math.sin(Math.PI / 180 * d);

		this.setPosition(x1, y1, z1);

	}
	rotateZ(d) {
		let y1 = this.x * Math.sin(Math.PI / 180 * d) + this.y * Math.cos(Math.PI / 180 * d);
		let z1 = this.z;
		let x1 = this.x * Math.cos(Math.PI / 180 * d) - this.y * Math.sin(Math.PI / 180 * d);

		this.setPosition(x1, y1, z1);
	}

}

for(let i = 0; i < tags.length; i++) {

	let a = new tag(tags[i], i + 1, tags.length, 300);
	all.push(a);

}

var t = setInterval(function() {

	for(let i = 0; i < all.length; i++) {
		all[i].rotateX(RX);
		all[i].rotateY(RY);
		all[i].rotateZ(0);
	}

}, 50);

ball.onmouseenter = function(e) {
	startX = e.clientX;
	startY = e.clientY;
}

ball.onmousemove = function(e) {
	var x = e.clientX;
	var y = e.clientY;

	if(y < startY) {
		RX += 0.5;
	} else {
		RX -= 0.5;
	}

	if(x > startX) {
		RY += 0.5;
	} else {
		RY -= 0.5;
	}

	RX = RX > 1.5 ? 1.5 : RX;
	RY = RY > 1.5 ? 1.5 : RY;

	RX = RX < -1.5 ? -1.5 : RX;
	RY = RY < -1.5 ? -1.5 : RY;

	startX = x;
	startY = y;
}
//canvas绘制时钟
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
context.lineCap = "round";
context.translate(400, 400);

function clock() {
	var now = new Date();
	var Y = now.getFullYear();
	var M = now.getMonth() + 1;
	var D = now.getDate();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	//清空画布
	context.clearRect(-400, -400, 800, 800);
	//表盘
	context.beginPath();
	context.lineWidth = 20;
	context.strokeStyle = "#02B2B5";
	context.arc(0, 0, 380, 0, Math.PI * 2);
	context.stroke();
	//画出刻度
	for(var i = 0; i < 60; i++) {
		var x = Math.cos(Math.PI / 180 * 6 * i) * 360;
		var y = Math.sin(Math.PI / 180 * 6 * i) * 360;
		var x1 = Math.cos(Math.PI / 180 * 6 * i) * 340;
		var y1 = Math.sin(Math.PI / 180 * 6 * i) * 340;
		context.beginPath();
		context.fillStyle = "#02B2B5";
		if(i % 5 == 0) {
			context.save();
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText((i / 5 + 2) % 12 + 1, x1, y1)
			context.fill();
			context.restore();
		} else {
			context.arc(x, y, 4, 0, Math.PI * 2);
			context.fill();
		}
	}
	//画出时针
	context.save();
	context.beginPath();
	context.rotate(Math.PI / 180 * (30 * h + 30 / 60 * m));
	context.lineTo(0, 40);
	context.lineTo(0, -200);
	context.stroke();
	context.restore();
	//画出分针
	context.save();
	context.beginPath();
	context.lineWidth = 15;
	context.rotate(Math.PI / 180 * (6 * m + 6 / 60 * s));
	context.lineTo(0, 40);
	context.lineTo(0, -250);
	context.stroke();
	context.restore();
	//画出秒针
	context.save();
	context.beginPath();
	context.lineWidth = 5;
	context.strokeStyle = "red";
	context.rotate(Math.PI / 180 * 6 * s);
	context.lineTo(0, 60);
	context.lineTo(0, -280);
	context.stroke();
	context.restore();

	//画出圆心
	context.beginPath();
	context.arc(0, 0, 30, 0, Math.PI * 2);
	context.fill();
	context.font = "bolder 40px '幼圆'";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(Y + '-' + M + '-' + D, -0, 290);
}
clock();
setInterval(clock, 0);