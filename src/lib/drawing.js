export function drawBars(canvas, data) {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  const n = data.length;
  const w = rect.width;
  const h = rect.height;
  const step = Math.floor(w / n) * .9;
  const barWidth = Math.floor(step * .8);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'lightgrey'
  for (let i = 0; i < n; i++) {
    const barHeight = Math.floor((data[i] + 1) / n * .8 * h);
    ctx.fillRect(.05 * w + i * step, .9 * h - barHeight, barWidth, barHeight);
  }
}

export function drawGrid(canvas, data, colors) {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  const n = data.length;
  const m = data[0].length;
  const u = Math.floor(Math.min(canvas.width / 16, canvas.height / 9));
  const w = Math.floor(u * 9 / m) * m;
  const h = Math.floor(u * 9 / n) * n;
  const xo = Math.floor((canvas.width - w) / 2);
  const yo = Math.floor((canvas.height - h) / 2);
  const xstep = Math.floor(w / m);
  const ystep = Math.floor(h / n);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      ctx.fillStyle = colors[data[y][x]];
      ctx.fillRect(xo + x * xstep, yo + y * ystep, xstep, ystep);
    }
  }
}
