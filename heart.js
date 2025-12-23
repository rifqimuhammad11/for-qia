// heart.js
// Triggered after Shape animation finishes

function startHeartAnimation() {
    if (window.__heartStarted) return;
    window.__heartStarted = true;

    var nameBox = document.querySelector('.namebox');
    if (nameBox) {
        nameBox.style.opacity = 1;
    }

    var canvas = document.getElementById('pinkboard');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function heart(t) {
        return {
            x: 16 * Math.pow(Math.sin(t), 3),
            y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        };
    }

    var particles = [];

    function createParticle() {
        var t = Math.random() * Math.PI * 2;
        var p = heart(t);
        particles.push({
            x: canvas.width / 2 + p.x * 15,
            y: canvas.height / 2 + p.y * 15,
            alpha: 1,
            size: Math.random() * 2 + 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        createParticle();

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            ctx.fillStyle = 'rgba(255,48,197,' + p.alpha + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            p.y -= 0.3;
            p.alpha -= 0.004;
        }

        particles = particles.filter(p => p.alpha > 0);
        requestAnimationFrame(draw);
    }

    draw();
}
