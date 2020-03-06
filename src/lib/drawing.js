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

/**
 * TreeNode type definition
 * @typedef {Object} TreeNode
 * @property {number} value - value stored in tree
 * @property {TreeNode} left - left child or null
 * @property {TreeNode} right - right child or null
 */

function _depth(node) {
  if (node) {
    const leftDepth = _depth(node.left);
    const rightDepth = _depth(node.right);
    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    }
    else {
      return rightDepth + 1;
    }
  }
  return 0;
}

export function drawTree(canvas, root) {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  const w = canvas.width;
  const h = canvas.height;
  const n = _depth(root);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  if (!root) {
    return;
  }
  const nw = 25;
  const nh = 25;
  let queue = [];
  queue.push({ node: root, x: w / 2 - Math.floor(nw / 2), y: 0 });
  let m = 2;
  while (queue.length > 0) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const { px, py, node, x, y } = queue.shift();
      ctx.strokeStyle = '#FF0000'
      if (px !== undefined && py !== undefined) {
        ctx.beginPath();
        ctx.moveTo(Math.floor(px + nw / 2), py + nh);
        ctx.lineTo(Math.floor(x + nw / 2), y);
        ctx.stroke();
      }
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(x, y, nw, nh);
      ctx.fillStyle = '#000000';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), Math.floor(x + nw / 2), Math.floor(y + nh / 3));
      ctx.fillText(node.height.toString(), Math.floor(x + nw / 2), Math.floor(y + nh * 3 / 4));
      if (node.left) {
        queue.push({ px: x, py: y, node: node.left, x: x - w / m / 2, y: y + h / n });
      }
      if (node.right) {
        queue.push({ px: x, py: y, node: node.right, x: x + w / m / 2, y: y + h / n });
      }
    }
    m *= 2;
  }
}
