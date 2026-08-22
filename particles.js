(function (window) {
    'use strict';

    function particlesJS(tagId, params) {
        var canvas = document.getElementById(tagId);
        if (!(canvas instanceof HTMLCanvasElement)) return null;

        var context = canvas.getContext('2d');
        if (!context) return null;

        var config = params || {};
        var particleConfig = config.particles || {};
        var opacityConfig = particleConfig.opacity || {};
        var moveConfig = particleConfig.move || {};
        var pixelConfig = particleConfig.pixel || {};
        var interactionConfig = (config.interactivity || {}).events || {};
        var grabConfig = ((config.interactivity || {}).modes || {}).grab || {};
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var pixels = [];
        var animationId = null;
        var width = 0;
        var height = 0;
        var dpr = 1;
        var phase = 0;
        var mouse = { x: -1000, y: -1000 };
        var colors = Array.isArray(particleConfig.color) ? particleConfig.color : [particleConfig.color || '#e5e8e3'];

        var options = {
            step: Math.max(8, Number(pixelConfig.step) || 9),
            density: Math.min(1, Math.max(0.2, Number(pixelConfig.density) || 0.66)),
            square: Math.max(2, Number(pixelConfig.square) || 3.2),
            opacity: Number(opacityConfig.value) || 0.38,
            speed: Number(moveConfig.speed) || 0.45,
            hover: interactionConfig.onhover ? interactionConfig.onhover.enable !== false : true,
            grabDistance: Number(grabConfig.distance) || 150
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

        function gaussian(value, center, spread) {
            var distance = (value - center) / spread;
            return Math.exp(-distance * distance);
        }

        function fieldDensity(x, y) {
            var normalizedX = x / width;
            var normalizedY = y / height;
            var movingWave = 0.5 + Math.sin(normalizedX * 7 + phase * 0.24) * 0.035;
            var sweep = gaussian(normalizedY, movingWave, 0.15) * (0.45 + normalizedX * 0.45);
            var leftCluster = gaussian(normalizedX, 0.13, 0.2) * gaussian(normalizedY, 0.62, 0.24) * 0.92;
            var centerCluster = gaussian(normalizedX, 0.48, 0.19) * gaussian(normalizedY, 0.33, 0.28) * 0.95;
            var lowerCluster = gaussian(normalizedX, 0.38, 0.28) * gaussian(normalizedY, 0.83, 0.18) * 0.58;
            var rightCluster = gaussian(normalizedX, 0.87, 0.12) * gaussian(normalizedY, 0.36, 0.18) * 0.5;
            return Math.min(1, sweep + leftCluster + centerCluster + lowerCluster + rightCluster);
        }

        function createPixels() {
            pixels = [];
            var step = options.step;
            for (var y = step * 0.5; y < height; y += step) {
                for (var x = step * 0.5; x < width; x += step) {
                    var density = fieldDensity(x, y);
                    var threshold = 1 - density * options.density;
                    if (Math.random() < threshold) continue;

                    pixels.push({
                        x: x + (Math.random() - 0.5) * step * 0.25,
                        y: y + (Math.random() - 0.5) * step * 0.25,
                        size: options.square * (0.72 + Math.random() * 0.5),
                        alpha: options.opacity * (0.4 + density * 0.8) * (0.75 + Math.random() * 0.25),
                        color: colors[Math.floor(Math.random() * colors.length)],
                        phase: Math.random() * Math.PI * 2,
                        drift: 0.2 + Math.random() * 0.8
                    });
                }
            }
        }

        function drawPixel(pixel) {
            var distance = Math.sqrt(Math.pow(mouse.x - pixel.x, 2) + Math.pow(mouse.y - pixel.y, 2));
            var hoverStrength = options.hover && distance < options.grabDistance ? 1 - distance / options.grabDistance : 0;
            var pulse = reduceMotion ? 0 : Math.sin(phase * 0.75 * pixel.drift + pixel.phase) * 0.08;
            var size = pixel.size + hoverStrength * 2.5;
            var alpha = Math.min(0.9, pixel.alpha + hoverStrength * 0.34 + pulse);
            context.globalAlpha = Math.max(0.05, alpha);
            context.fillStyle = pixel.color;
            context.fillRect(pixel.x - size / 2, pixel.y - size / 2, size, size);
        }

        function drawFrame() {
            context.clearRect(0, 0, width, height);
            if (!reduceMotion) phase += options.speed * 0.018;
            pixels.forEach(drawPixel);
            context.globalAlpha = 1;
            if (!reduceMotion) animationId = window.requestAnimationFrame(drawFrame);
        }

        function handleResize() {
            resizeCanvas();
            createPixels();
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
        createPixels();
        drawFrame();

        return {
            canvas: canvas,
            pixels: pixels,
            destroy: function () {
                if (animationId) window.cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
            }
        };
    }

    window.particlesJS = particlesJS;
})(window);
