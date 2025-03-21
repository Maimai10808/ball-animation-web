class Ball {
    constructor(x, y, radius = 10) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = (Math.random() - 0.5) * 10; // 初始水平速度
        this.dy = (Math.random() - 0.5) * 10; // 初始垂直速度
        this.color = this.getRandomColor();
        this.trail = []; // 轨迹数组
        this.maxTrailLength = 20; // 最大轨迹长度
    }

    getRandomColor() {
        const hue = Math.random() * 360;
        return `hsl(${hue}, 70%, 50%)`;
    }

    update(canvas, gravity, friction, bounce) {
        // 添加当前位置到轨迹
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }

        // 应用重力
        this.dy += gravity;

        // 应用摩擦力
        this.dx *= friction;
        this.dy *= friction;

        // 更新位置
        this.x += this.dx;
        this.y += this.dy;

        // 碰撞检测
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx *= -bounce;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx *= -bounce;
        }

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dy *= -bounce;
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -bounce;
        }
    }

    draw(ctx) {
        // 绘制轨迹
        ctx.beginPath();
        this.trail.forEach((pos, index) => {
            const alpha = index / this.trail.length;
            ctx.strokeStyle = `hsla(${this.color.match(/\d+/)[0]}, 70%, 50%, ${alpha})`;
            if (index === 0) {
                ctx.moveTo(pos.x, pos.y);
            } else {
                ctx.lineTo(pos.x, pos.y);
            }
        });
        ctx.stroke();

        // 绘制小球
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // 绘制光晕效果
        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.radius * 0.2,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `${this.color}cc`);
        gradient.addColorStop(1, `${this.color}00`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }
} 