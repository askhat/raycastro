export function deg2rad(theta: number): number {
  return theta * (Math.PI / 180);
}

export function rand(min: number = -127, max: number = 128) {
  return Math.random() * (max - min) + min;
}

export function range(min: number, max: number, step: number = 1): number[] {
  let arr = [];
  for (let i = min; i < max; i += step) arr.push(i);
  return arr;
}

export function cast(ray: Segment, wall: Segment) {
  let { x: x1, y: y1 } = wall.a;
  let { x: x2, y: y2 } = wall.b;
  let { x: x3, y: y3 } = ray.a;
  let x4 = x3 + ray.b.x;
  let y4 = y3 + ray.b.y;

  let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (d === 0) return;

  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

  if (t > 0 && t < 1 && u > 0) {
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
  }
}
