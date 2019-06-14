//Создаем объект игры
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Создаем объекты картинок
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

//Добавляем сами картинки
bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

//Звуковые файлы
var fly_audio = new Audio();
var score_audio = new Audio();

//Добавляем сами звуки
fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;//Расстояние между препятствием

//Прыжок птички
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 35;
	fly_audio.play();
}

//Создание блоков
var pipes = [];
pipes[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;

//Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1;

function loser() {
	ctx.fillStyle = "#2fff25";
	ctx.font = "30px Verdana";

}


function draw() 
{
	ctx.drawImage(bg, 0, 0);

	for(var i=0; i<pipes.length; i++)
	{

		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);

		pipes[i].x--;

		if(pipes[i].x == 50)
		{
			pipes.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}

		//Отслеживание прикосновений
		if(xPos + bird.width >= pipes[i].x 
			&& xPos <= pipes[i].x + pipeUp.width
			&& (yPos <= pipes[i].y + pipeUp.height
			|| yPos + bird.height >= pipes[i].y + pipeUp.height + gap)
			|| yPos + bird.height >= cvs.height - fg.height)
		{
			loser();
			location.reload();//Перезагрузка страницы
		}

		//Очки
		if (pipes[i].x == 5) 
		{
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos+=grav;

	ctx.fillStyle = "#FF1493";
	ctx.font = "34px Verdana";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}
draw();
bg.onload = draw;

