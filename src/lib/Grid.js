const directions = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 }
];

const windiness = 0.8;

class Grid {
  createMaze(data, update) {
    const carve = (data, pos) => {
      data[pos.y][pos.x] = 0;
    }

    const canCarve = (data, mx, my, pos, dir) => {
      if (!contains(mx, my, addDir(pos, dir, 3))) {
        return false;
      }
      const nxt = addDir(pos, dir, 2);
      return data[nxt.y][nxt.x] === 1;
    }

    const contains = (mx, my, pos) => {
      if (pos.x < 0 || pos.y < 0 || pos.x >= mx || pos.y >= my) {
        return false;
      }
      return true;
    }

    const addDir = (pos, dir, len) => {
      return {
        x: pos.x + dir.x * len,
        y: pos.y + dir.y * len
      }
    }

    const my = data.length;
    const mx = data[0].length;
    const cells = [];
    let lastDir;
    const start = { x: 1, y: 1 };
    carve(data, start);
    update(data);
    data[start.y][start.x] = 0;
    cells.push(start);
    while (cells.length > 0) {
      const cell = cells[cells.length - 1];
      const posCells = [];
      for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];
        if (canCarve(data, mx, my, cell, dir)) {
          posCells.push(dir);
        }
      }
      if (posCells.length > 0) {
        let dir;
        if (posCells.includes(lastDir) && Math.random() > windiness) {
          dir = lastDir;
        } else {
          dir = posCells[Math.floor(Math.random() * posCells.length)];
        }
        carve(data, addDir(cell, dir, 1));
        carve(data, addDir(cell, dir, 2));
        update(data);
        cells.push(addDir(cell, dir, 2));
        lastDir = dir;
      } else {
        cells.pop();
        lastDir = null;
      }
    }
  }
}

export default Grid;
