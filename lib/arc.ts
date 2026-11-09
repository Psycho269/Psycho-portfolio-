/** Points along an elliptical arch (percent of the stage), used to place cards around the figure. */
export type ArcOpts = { cx: number; cy: number; rx: number; ry: number; start: number; end: number };

export function arcPoints(n: number, o: ArcOpts) {
  return Array.from({ length: n }, (_, i) => {
    const deg = o.start - ((o.start - o.end) * i) / Math.max(1, n - 1);
    const a = (deg * Math.PI) / 180;
    return {
      left: (o.cx + o.rx * Math.cos(a)).toFixed(2),
      top: (o.cy - o.ry * Math.sin(a)).toFixed(2),
      rot: `${((90 - deg) * 0.28).toFixed(1)}deg`,
    };
  });
}

export function arcPath(o: ArcOpts) {
  const p = (d: number) => {
    const a = (d * Math.PI) / 180;
    return [o.cx + o.rx * Math.cos(a), o.cy - o.ry * Math.sin(a)];
  };
  const [x0, y0] = p(o.start);
  const [x1, y1] = p(o.end);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${o.rx} ${o.ry} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
