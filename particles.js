var particlesJS = function(tagId, params) {
    var canvas = document.getElementById(tagId);
    if (!canvas || canvas.tagName !== 'CANVAS') {
        return;
    }

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId = null;

    var config = params || {};
    var options = {
        particles: {
            number: config.particles?.number?.value || 80,
            color: config.particles?.color?.value || '#ffffff',
            shape: config.particles?.shape?.type || 'circle',
            opacity: config.particles?.opacity?.value || 0.5,
            size: config.particles?.size?.value || 3,
            move: {
                enable: true,
                speed: config.particles?.move?.speed || 2,
                direction: config.particles?.move?.direction || 'none',
                outMode: config.particles?.move?.out_mode || 'out'
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: config.interactivity?.events?.onhover?.mode || 'grab'
                }
            },
            modes: {
                grab: {
                    distance: config.interactivity?.modes?.grab?.distance || 140
                }
            }
        },
        retinaDetect: config.retina_detect || false
    };

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        var number = options.particles.number;
        for (var i = 0; i < number; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * options.particles.move.speed,
                vy: (Math.random() - 0.5) * options.particles.move.speed,
                size: Math.random() * options.particles.size + 1,
                color: options.particles.color,
                opacity: options.particles.opacity
            });
        }
    }

    function drawParticle(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    function drawLine(p1, p2, opacity) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = options.particles.color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.closePath();
    }

    function updateParticle(p) {
        p.x += p.vx;
        p.y += p.vy;

        if (options.particles.move.outMode === 'bounce') {
            if (p.x > canvas.width || p.x < 0) p.vx = -p.vx;
            if (p.y > canvas.height || p.y < 0) p.vy = -p.vy;
        } else {
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            updateParticle(p);
            drawParticle(p);
        }

        if (options.interactivity.events.onhover.enable) {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var dx = mouse.x - p.x;
                var dy = mouse.y - p.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < options.interactivity.modes.grab.distance) {
                    for (var j = i + 1; j < particles.length; j++) {
                        var p2 = particles[j];
                        var dx2 = p2.x - p.x;
                        var dy2 = p2.y - p.y;
                        var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                        if (dist2 < options.interactivity.modes.grab.distance) {
                            var opacity = (options.interactivity.modes.grab.distance - dist2) / options.interactivity.modes.grab.distance * 0.4;
                            drawLine(p, p2, opacity);
                        }
                    }
                }
            }
        }

        animationId = requestAnimationFrame(draw);
    }

    var mouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    function init() {
        resizeCanvas();
        createParticles();
        draw();
    }

    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });

    init();

    return {
        pJS: {
            particles: particles,
            canvas: canvas,
            ctx: ctx
        },
        fn: {
            update: updateParticle,
            draw: draw
        }
    };
};

window.particlesJS = particlesJS;
