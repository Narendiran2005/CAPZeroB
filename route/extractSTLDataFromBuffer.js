/**
 * Extracts volume and surface area from a binary STL file buffer
 * @param {Buffer} buffer - Buffer of the binary STL file
 * @returns {{ volume: number, surfaceArea: number }}
 */
function extractSTLDataFromBuffer(buffer) {
  const triangleCount = buffer.readUInt32LE(80);
  const triangles = [];

  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50;
    const triangle = [];

    for (let v = 0; v < 3; v++) {
      const x = buffer.readFloatLE(offset + 12 + v * 12);
      const y = buffer.readFloatLE(offset + 16 + v * 12);
      const z = buffer.readFloatLE(offset + 20 + v * 12);
      triangle.push([x, y, z]);
    }

    triangles.push(triangle);
  }

  let volume = 0;
  let surfaceArea = 0;

  for (const tri of triangles) {
    const [a, b, c] = tri;

    // Volume via scalar triple product
    const vol = (1.0 / 6.0) * (
      a[0] * (b[1] * c[2] - b[2] * c[1]) -
      a[1] * (b[0] * c[2] - b[2] * c[0]) +
      a[2] * (b[0] * c[1] - b[1] * c[0])
    );
    volume += vol;

    // Surface area via cross product
    const ab = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
    const ac = [c[0]-a[0], c[1]-a[1], c[2]-a[2]];
    const cross = [
      ab[1]*ac[2] - ab[2]*ac[1],
      ab[2]*ac[0] - ab[0]*ac[2],
      ab[0]*ac[1] - ab[1]*ac[0],
    ];
    const area = 0.5 * Math.sqrt(cross[0]**2 + cross[1]**2 + cross[2]**2);
    surfaceArea += area;
  }

  return {
    volume: Math.abs(volume),
    surfaceArea
  };
}

module.exports = extractSTLDataFromBuffer;
