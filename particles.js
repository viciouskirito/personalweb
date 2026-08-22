(function (window) {
    'use strict';

    function particlesJS(tagId, params) {
        var canvas = document.getElementById(tagId);
        if (!(canvas instanceof HTMLCanvasElement)) return null;

        var context = canvas.getContext('2d');
        if (!context) return null;

        var config = params || {};
        var particleConfig = config.particles || {};
        var moveConfig = particleConfig.move || {};
        var lineConfig = particleConfig.line_linked || {};
        var interactionConfig = (config.interactivity || {}).events || {};
        var grabConfig = ((config.interactivity || {}).modes || {}).grab || {};
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var particles = [];
        var animationId = null;
        var width = 0;
        var height = 0;
        var dpr = 1;
        var mouse = { x: -1000, y: -1000 };

        var options = {
            count: Math.min(Number((particleConfig.number || {}).value) || 42, 70),
            color: particleConfig.color || '#ff2d7d',
            opacity: Number((particleConfig.opacity || {}).value) || 0.35,
            size: Number((particleConfig.size || {}).value) || 2,
            speed: Number(moveConfig.speed) || 0.45,
            links: lineConfig.enable !== false,
            linkDistance: Number(lineConfig.distance) || 142,
            linkColor: lineConfig.color || '#d9ff58',
            linkOpacity: Number(lineConfig.opacity) || 0.12,
            grabDistance: Number(grabConfig.distance) || 150,
            hoverEnabled: interactionConfig.onhover ? interactionConfig.onhover.enable !== false : true
        };

        function resizeCanvas() {
            var rect = canvas.getBoundingClientRect();
            width = Math.max(rect.width, 1);
            height = Math.max(rect.height, 1);
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function createParticles() {
            particles = [];
            for (var index = 0; index < options.count; index += 1) {
                var angle = Math.random() * Math.PI * 2;
                var velocity = (Math.random() * 0.45 + 0.25) * options.speed;
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    radius: Math.random() * options.size + 0.65,
                    opacity: Math.random() * 0.45 + options.opacity * 0.55
                });
            }
        }

        function updateParticle(particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.x < -10) particle.x = width + 10;
            if (particle.y > height + 10) particle.y = -10;
            if (particle.y < -10) particle.y = height + 10;
        }

        function drawParticle(particle) {
            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = options.color;
            context.globalAlpha = particle.opacity;
            context.fill();
        }

        function drawLinks() {
            if (!options.links) return;
            for (var first = 0; first < particles.length; first += 1) {
                for (var second = first + 1; second < particles.length; second += 1) {
                    var one = particles[first];
                    var two = particles[second];
                    var xDistance = one.x - two.x;
                    var yDistance = one.y - two.y;
                    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
                    if (distance > options.linkDistance) continue;

                    var opacity = (1 - distance / options.linkDistance) * options.linkOpacity;
                    var nearMouse = false;
                    if (options.hoverEnabled) {
                        var mouseDistance = Math.sqrt(Math.pow(mouse.x - one.x, 2) + Math.pow(mouse.y - one.y, 2));
                        nearMouse = mouseDistance < options.grabDistance;
                    }
                    context.beginPath();
                    context.moveTo(one.x, one.y);
                    context.lineTo(two.x, two.y);
                    context.strokeStyle = options.linkColor;
                    context.globalAlpha = nearMouse ? Math.min(opacity * 3.5, 0.45) : opacity;
                    context.lineWidth = nearMouse ? 1.15 : 0.7;
                    context.stroke();
                }
            }
        }

        function drawFrame() {
            context.clearRect(0, 0, width, height);
            context.globalAlpha = 1;
            if (!reduceMotion) particles.forEach(updateParticle);
            drawLinks();
            particles.forEach(drawParticle);
            context.globalAlpha = 1;
            if (!reduceMotion) animationId = window.requestAnimationFrame(drawFrame);
        }

        function handleResize() {
            resizeCanvas();
            createParticles();
            if (reduceMotion) drawFrame();
        }

        canvas.addEventListener('pointermove', function (event) {
            var rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        }, { passive: true });
        canvas.addEventListener('pointerleave', function () { mouse.x = -1000; mouse.y = -1000; }, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        resizeCanvas();
        createParticles();
        drawFrame();

        return {
            canvas: canvas,
            particles: particles,
            destroy: function () {
                if (animationId) window.cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
            }
        };
    }

    window.particlesJS = particlesJS;
})(window);
