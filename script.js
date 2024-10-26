document.addEventListener('DOMContentLoaded', (event) => {
  const button = document.createElement('button');
  button.textContent = 'My LinkedIn!';
  button.addEventListener('click', () => {
      window.location.href = 'https://www.linkedin.com/in/russellwhicks/';
  });
  const mainSection = document.querySelector('main');
  mainSection.appendChild(button);
});




class Point3D {
  constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
  }

  rotateX(angle) {
      const rad = angle * Math.PI / 180;
      const cosa = Math.cos(rad);
      const sina = Math.sin(rad);
      const y = this.y * cosa - this.z * sina;
      const z = this.y * sina + this.z * cosa;
      return new Point3D(this.x, y, z);
  }

  rotateY(angle) {
      const rad = angle * Math.PI / 180;
      const cosa = Math.cos(rad);
      const sina = Math.sin(rad);
      const z = this.z * cosa - this.x * sina;
      const x = this.z * sina + this.x * cosa;
      return new Point3D(x, this.y, z);
  }

  rotateZ(angle) {
      const rad = angle * Math.PI / 180;
      const cosa = Math.cos(rad);
      const sina = Math.sin(rad);
      const x = this.x * cosa - this.y * sina;
      const y = this.x * sina + this.y * cosa;
      return new Point3D(x, y, this.z);
  }
}

const cubeWidth = 20;
const width = 160, height = 44;
const distanceFromCam = 100;
const K1 = 40;

const points = [
  new Point3D(cubeWidth, cubeWidth, cubeWidth),
  new Point3D(cubeWidth, cubeWidth, -cubeWidth),
  new Point3D(cubeWidth, -cubeWidth, cubeWidth),
  new Point3D(cubeWidth, -cubeWidth, -cubeWidth),
  new Point3D(-cubeWidth, cubeWidth, cubeWidth),
  new Point3D(-cubeWidth, cubeWidth, -cubeWidth),
  new Point3D(-cubeWidth, -cubeWidth, cubeWidth),
  new Point3D(-cubeWidth, -cubeWidth, -cubeWidth)
];

const surfaces = [
  [0,1,3,2],
  [4,5,7,6],
  [0,4,6,2],
  [1,5,7,3],
  [0,1,5,4],
  [2,3,7,6]
];

function createASCIICube() {
  const background = document.createElement('pre');
  background.id = 'ascii-background';
  document.body.appendChild(background);

  let angleX = 0, angleY = 0, angleZ = 0;

  function calculateProjection(point) {
      const x = point.x * K1 / (point.z + distanceFromCam) + width / 2;
      const y = point.y * K1 / (point.z + distanceFromCam) + height / 2;
      return { x: Math.round(x), y: Math.round(y) };
  }

  function generateASCIICube() {
      const rotatedPoints = points.map(point => 
          point.rotateX(angleX).rotateY(angleY).rotateZ(angleZ)
      );

      const projectedPoints = rotatedPoints.map(calculateProjection);

      const output = new Array(height).fill().map(() => new Array(width).fill(' '));

      // Sort surfaces by average z-coordinate (painter's algorithm)
      const sortedSurfaces = surfaces
      .map((surface, index) => ({
          index,
          avgZ: surface.reduce((sum, pointIndex) => sum + rotatedPoints[pointIndex].z, 0) / surface.length
      }))
      .sort((a, b) => a.avgZ - b.avgZ);

  for (const { index } of sortedSurfaces) {
      const surface = surfaces[index];
      fillSurface(surface.map(i => projectedPoints[i]), output, String.fromCharCode(97 + index));
  }

  return output.map(row => row.join('')).join('\n');
}

function fillSurface(points, output, char) {
  // Find bounding box
  const minX = Math.max(0, Math.min(...points.map(p => p.x)));
  const maxX = Math.min(width - 1, Math.max(...points.map(p => p.x)));
  const minY = Math.max(0, Math.min(...points.map(p => p.y)));
  const maxY = Math.min(height - 1, Math.max(...points.map(p => p.y)));

  // Simple flood fill
  for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
          if (isPointInPolygon({x, y}, points)) {
              output[y][x] = char;
          }
      }
  }
}

function isPointInPolygon(point, vs) {
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i].x, yi = vs[i].y;
      const xj = vs[j].x, yj = vs[j].y;
      const intersect = ((yi > point.y) != (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  return inside;
}

function updateCube() {
  background.textContent = generateASCIICube();
  // Modify these values to change rotation speed
  angleX = (angleX + 0.3) % 360;
  angleY = (angleY + 0.5) % 360;
  angleZ = (angleZ + 0.3) % 360;
  requestAnimationFrame(updateCube);
}

updateCube();
}

document.addEventListener('DOMContentLoaded', createASCIICube);