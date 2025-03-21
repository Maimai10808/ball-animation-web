class App {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = [];
        this.isPaused = false;

        // 控制参数
        this.gravity = 0.5;
        this.friction = 0.99;
        this.bounce = 0.8;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupControls();
        this.animate();

        // 添加事件监听
        window.addEventListener('resize', () => this.setupCanvas());
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    }

    setupCanvas() {
        // 设置canvas尺寸
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    setupControls() {
        // 滑块控制
        const gravitySlider = document.getElementById('gravity');
        const frictionSlider = document.getElementById('friction');
        const bounceSlider = document.getElementById('bounce');

        gravitySlider.addEventListener('input', (e) => {
            this.gravity = parseFloat(e.target.value);
            e.target.nextElementSibling.textContent = this.gravity;
        });

        frictionSlider.addEventListener('input', (e) => {
            this.friction = parseFloat(e.target.value);
            e.target.nextElementSibling.textContent = this.friction;
        });

        bounceSlider.addEventListener('input', (e) => {
            this.bounce = parseFloat(e.target.value);
            e.target.nextElementSibling.textContent = this.bounce;
        });

        // 按钮控制
        document.getElementById('addBall').addEventListener('click', () => {
            this.addRandomBall();
        });

        document.getElementById('clearBalls').addEventListener('click', () => {
            this.balls = [];
        });

        document.getElementById('togglePause').addEventListener('click', () => {
            this.isPaused = !this.isPaused;
        });
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.addBall(x, y);
    }

    addBall(x, y) {
        const radius = Math.random() * 10 + 5;
        this.balls.push(new Ball(x, y, radius));
    }

    addRandomBall() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.addBall(x, y);
    }

    animate() {
        if (!this.isPaused) {
            this.ctx.fillStyle = 'rgba(44, 44, 44, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.balls.forEach(ball => {
                ball.update(this.canvas, this.gravity, this.friction, this.bounce);
                ball.draw(this.ctx);
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 