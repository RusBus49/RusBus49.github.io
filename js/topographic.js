class TopographicBackground {
    constructor() {
        this.svg = document.querySelector('.topo-background svg');
        this.lines = 25;
        this.points = 100;
        this.amplitude = 40;
        this.frequency = 0.02;
        this.mouseX = 0;
        this.mouseY = 0;
        this.paths = [];
        this.height = 800; // Match SVG viewBox height

        this.init();
    }

    init() {

        for (let i = 0; i < this.lines; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-opacity', (i + 1) / (this.lines + 1));
            this.svg.appendChild(path);
            this.paths.push(path);
        }

        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.updatePaths();
    }

    generatePath(offset, mouseInfluence) {
        const baseY = this.height / 2;
        let d = `M 0 ${baseY}`;
        
        for (let x = 0; x <= this.points; x++) {
            const xPos = (x / this.points) * 1200;
            const distanceFromMouse = Math.abs(this.mouseX - xPos);
            const mouseEffect = Math.max(0, 100 - distanceFromMouse) * mouseInfluence;
            
            let yPos = baseY + 
                Math.sin(x * this.frequency + offset) * this.amplitude +
                Math.sin(x * this.frequency * 2 + offset) * this.amplitude * 0.5 +
                mouseEffect * Math.sin(x * this.frequency * 3);
            
            const mouseYEffect = (this.mouseY - baseY) * 0.2 * mouseInfluence;
            yPos += mouseYEffect;
            
            d += ` L ${xPos} ${yPos}`;
        }
        return d;
    }

    updatePaths = () => {
        this.paths.forEach((path, i) => {
            const verticalOffset = (i - this.lines / 2) * (this.height / this.lines);
            const offset = (Date.now() * 0.001 + i * 0.5) % (Math.PI * 2);
            const mouseInfluence = (i + 1) / this.lines;
            
            path.setAttribute('d', this.generatePath(offset, mouseInfluence));
            path.style.transform = `translateY(${verticalOffset}px)`;
        });
        requestAnimationFrame(this.updatePaths);
    }

    handleMouseMove(e) {
        const rect = this.svg.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) * (1200 / rect.width);
        this.mouseY = (e.clientY - rect.top) * (800 / rect.height);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TopographicBackground();
});