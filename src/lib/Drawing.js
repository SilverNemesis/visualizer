class Drawing {
  drawBars(canvas, data) {
    const n = data.length;
    const rect = canvas.getBoundingClientRect()
    const w = rect.width;
    const h = rect.height;
    canvas.width = w;
    canvas.height = h;
    const step = Math.floor(w / n);
    const barWidth = Math.floor(step * .8);
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'black'
    for (let i = 0; i < n; i++) {
      const barHeight = Math.floor((data[i] + 1) / 100 * .8 * h);
      ctx.fillRect(i * step, h - barHeight, barWidth, barHeight);
    }
  }
}

export default Drawing;
