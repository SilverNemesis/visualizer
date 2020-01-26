class Drawing {
  drawBars(canvas, data) {
    const n = data.length;
    const rect = canvas.getBoundingClientRect()
    const w = rect.width;
    const h = rect.height;
    const r = window.devicePixelRatio;
    canvas.width = w * r;
    canvas.height = h * r;
    const step = Math.floor(w / n);
    const barWidth = Math.floor(step * .8);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'black'
    for (let i = 0; i < n; i++) {
      const barHeight = Math.floor((data[i] + 1) / 100 * .8 * h);
      ctx.fillRect(i * step, h - barHeight, barWidth, barHeight);
    }
  }

  drawGrid(canvas, data, colors) {
    const n = data.length;
    const m = data[0].length;
    const rect = canvas.getBoundingClientRect()
    const w = rect.width;
    const h = rect.height;
    canvas.width = w;
    canvas.height = h;
    const xstep = Math.floor(w / m);
    const ystep = Math.floor(h / n);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        ctx.fillStyle = colors[data[y][x]];
        ctx.fillRect(x * xstep, y * ystep, xstep, ystep);
      }
    }
  }
}

export default Drawing;
