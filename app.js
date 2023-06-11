const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];
let count = 0;

//min, max
//100,500
function getRandomArbitrary(min, max) {
    return min + Math.floor(Math.random() * (max - min));//以100,500間取亂數為例，藉由取亂數會得到0-400的亂數，再加上最小值的100，亂數就會介於100-500之間
}

class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        brickArray.push(this);//製作完方塊就夾到birckArray到陣列中
        this.visible = true;
    }

    drawBrick() {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    touchingBall(ballX, ballY) {
        return (
            ballX >= this.x - radius &&
            ballX <= this.x + this.width + radius &&
            ballY <= this.y + this.height + radius &&
            ballY >= this.y - radius
        );
    }
}
//製作所有的brick
for (let i = 0; i < 10; i++) {
    new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));//x軸最大為1000,Brick大小為50，範圍不能超過x軸且要算上本身brick的大小，y值以此類推

}

c.addEventListener("mousemove", (e) => {
    ground_x = e.clientX;
});

function drawCircle() {
    //確認球是否有打到磚塊
    brickArray.forEach((brick,) => {
        if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
            count++;
            console.log(count);
            brick.visible = false;
            //改變x, y 方向速度，並且將brick從bricl.Arry中移除
            // 從下方撞擊
            if (circle_y >= brick.y + brick.height) {
                ySpeed *= -1
                //從上方撞擊
            } else if (circle_y <= brick.y) {
                ySpeed *= -1;
            }
            //從左方撞擊
            else if (circle_x <= brick.x) {
                xSpeed *= -1;
            }
            //從右方撞擊
            else if (circle_x >= brick.x + brick.width) {
                xSpeed *= -1;
            }
            if (count == 10) {
                alert("遊戲結束");
                clearInterval(game);
            }
        }


    });
    //確認球是否打到橘色地板
    if (
        circle_x >= ground_x - radius &&
        circle_x <= ground_x + 200 + radius &&
        circle_y >= ground_y - radius &&
        circle_y <= ground_y + radius) {
        if (ySpeed > 0) {
            circle_y -= 50;

        } else {
            circle_y += 50;
        }
        ySpeed *= -1;

    }

    //確認球有沒有碰到邊界
    if (circle_x >= canvasWidth - radius) {//半徑距離小於 邊長寬度距離-x圓心表示已碰到邊界(右邊)
        xSpeed *= -1;
    }
    if (circle_x <= radius) {//確認左邊邊界
        xSpeed *= -1;
    }
    if (circle_y <= radius) {//確認上邊邊界
        ySpeed *= -1;
    }
    if (circle_y >= canvasHeight - radius) {// 確認下邊邊界
        ySpeed *= -1;
    }

    // 更動圓的座標
    circle_x += xSpeed;
    circle_y += ySpeed;
    // 畫出黑色背景
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //畫出所有的Brick
    brickArray.forEach((brick) => {
        if (brick.visible) {
            brick.drawBrick();
        }
    });

    //畫出可控制地板
    ctx.fillStyle = "orange";
    ctx.fillRect(ground_x, ground_y, 200, ground_height);


    //畫出圓球
    //(x,y,radius,startAngle,endAngle)
    ctx.beginPath();//開始一個新的繪圖路徑。這個方法通常在繪製不同圖形之間使用，以確保每個圖形都是獨立的。
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);//使用圓心座標 (circle_x, circle_y)、半徑 radius、起始角度 0 和結束角度 2 * Math.PI（即完整的圓周）來繪製一個圓弧。這個方法定義了圓形物件的形狀
    ctx.stroke();//繪製圓弧的輪廓。這個方法會將圓弧的輪廓顯示在canvas上。
    ctx.fillStyle = "yellow";
    ctx.fill();//填充圓形物件的內部區域。這個方法會使用先前設定的填充色（黃色）將圓形內部填滿。

}

let game = setInterval(drawCircle, 25);