const directions = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 }
];

const windiness = 0.8;

export function createMaze(data, initialize, update) {
  _reset(data, 1);
  initialize(data);
  _createMaze(data, update, _carve, { x: 1, y: 1 });
}

export function createDungeon(data, initialize, update) {
  const regions = [];
  let region = 0;

  const incrementRegion = (data, pos) => {
    region++;
  }

  const carveRegion = (data, pos) => {
    data[pos.y][pos.x] = 0;
    regions[pos.y][pos.x] = region;
  }

  _reset(data, 1);
  initialize(data);
  const my = data.length;
  const mx = data[0].length;
  for (let y = 0; y < my; y++) {
    regions.push(Array(mx).fill(0))
  }
  _addRooms(data, update, mx, my, incrementRegion, carveRegion, 256, 4);
  for (let y = 1; y < my; y += 2) {
    for (let x = 1; x < mx; x += 2) {
      if (data[y][x] === 0) {
        continue;
      }
      region++;
      _createMaze(data, update, carveRegion, { x, y });
    }
  }
  _connectRegions(data, update, mx, my, region, regions);
  _removeDeadEnds(data, update, mx, my);
}

function _reset(data, value) {
  const my = data.length;
  for (let y = 0; y < my; y++) {
    data[y].fill(value);
  }
}

function _createMaze(data, update, carve = _carve, start) {
  const my = data.length;
  const mx = data[0].length;
  const cells = [];
  let lastDir;
  carve(data, start);
  update([start.x, start.y, data[start.y][start.x]]);
  data[start.y][start.x] = 0;
  cells.push(start);
  while (cells.length > 0) {
    const cell = cells[cells.length - 1];
    const posCells = [];
    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];
      if (_canCarve(data, mx, my, cell, dir)) {
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
      const c1 = _addDir(cell, dir, 1);
      const c2 = _addDir(cell, dir, 2);
      carve(data, c1);
      carve(data, c2);
      update([c1.x, c1.y, data[c1.y][c1.x], c2.x, c2.y, data[c2.y][c2.x]]);
      cells.push(_addDir(cell, dir, 2));
      lastDir = dir;
    } else {
      cells.pop();
      lastDir = null;
    }
  }
}

function _addRooms(data, update, mx, my, incrementRegion, carveRegion, numRoomTries, roomExtraSize) {
  const rooms = [];
  for (let i = 0; i < numRoomTries; i++) {
    const size = (_range(1, 3 + roomExtraSize) << 1) + 1;
    let rectangularity = _range(0, 1 + size >> 1) << 1;
    let width = size;
    let height = size;
    if (_range(0, 1) === 0) {
      width += rectangularity;
    } else {
      height += rectangularity;
    }
    let x = (_range(0, (mx - width - 1) >> 1) << 1) + 1;
    let y = (_range(0, (my - height - 1) >> 1) << 1) + 1;
    const room = { x, y, width, height };
    let overlaps = false;
    for (let j = 0; j < rooms.length; j++) {
      const other = rooms[j];
      if (_isOverlapped(room, other)) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) {
      continue;
    }
    rooms.push(room);
    incrementRegion();
    for (let xOffset = 0; xOffset < width; xOffset++) {
      const updates = [];
      for (let yOffset = 0; yOffset < height; yOffset++) {
        carveRegion(data, { x: x + xOffset, y: y + yOffset });
        updates.push(x + xOffset, y + yOffset, data[y + yOffset][x + xOffset])
      }
      update(updates);
    }
  }
}

function _connectRegions(data, update, mx, my, region, regions) {
  let connectors = [];
  for (let y = 1; y < my - 1; y++) {
    for (let x = 1; x < mx - 1; x++) {
      if (data[y][x] !== 1) {
        continue;
      }
      const connectedRegions = [];
      for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];
        const region = regions[y + dir.y][x + dir.x];
        if (region !== 0 && !connectedRegions.includes(region)) {
          connectedRegions.push(region);
        }
      }
      if (connectedRegions.length < 2) {
        continue;
      }
      connectors.push({ x, y, regions: connectedRegions })
    }
  }
  const merged = [0];
  let openRegions = [];
  for (var i = 1; i <= region; i++) {
    merged.push(i);
    openRegions.push(i);
  }
  while (openRegions.length > 1) {
    const index = _range(0, connectors.length - 1)
    const connector = connectors[index];
    _carve(data, { x: connector.x, y: connector.y });
    update([connector.x, connector.y, data[connector.y][connector.x]]);
    const regions = connector.regions.map((region) => merged[region]);
    const dest = regions[0];
    const sources = regions.slice(1);
    for (let i = 0; i <= region; i++) {
      if (sources.includes(i)) {
        merged[i] = dest;
      }
    }
    openRegions = openRegions.filter((region) => {
      return !sources.includes(region);
    });
    connectors = connectors.filter((con) => {
      if (Math.abs(con.x - connector.x) <= 1 && Math.abs(con.y - connector.y) <= 1) {
        return false;
      }
      con.regions = con.regions.map((region) => merged[region]);
      for (let i = 1; i < con.regions.length; i++) {
        if (con.regions[i] !== con.regions[0]) {
          return true;
        }
      }
      if (_range(0, 99) === 0) {
        _carve(data, { x: con.x, y: con.y });
        update([con.x, con.y, data[con.y][con.x]]);
      }
      return false;
    });
  }
}

function _removeDeadEnds(data, update, mx, my) {
  let done = false;
  while (!done) {
    done = true;
    for (let y = 1; y < my - 1; y++) {
      for (let x = 1; x < mx - 1; x++) {
        if (data[y][x] === 1) {
          continue;
        }
        let exits = 0;
        for (let i = 0; i < directions.length; i++) {
          const dir = directions[i];
          if (data[y + dir.y][x + dir.x] !== 1) {
            exits++;
          }
        }
        if (exits !== 1) {
          continue;
        }
        done = false;
        _fill(data, { x, y });
        update([x, y, data[y][x]]);
      }
    }
  }
}

function _fill(data, pos) {
  data[pos.y][pos.x] = 1;
}

function _carve(data, pos) {
  data[pos.y][pos.x] = 0;
}

function _canCarve(data, mx, my, pos, dir) {
  if (!_isInBounds(mx, my, _addDir(pos, dir, 3))) {
    return false;
  }
  const nxt = _addDir(pos, dir, 2);
  return data[nxt.y][nxt.x] === 1;
}

function _isInBounds(mx, my, pos) {
  if (pos.x < 0 || pos.y < 0 || pos.x >= mx || pos.y >= my) {
    return false;
  }
  return true;
}

function _addDir(pos, dir, len) {
  return {
    x: pos.x + dir.x * len,
    y: pos.y + dir.y * len
  }
}

function _range(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _isOverlapped(pri, sec) {
  if (pri.x > sec.x + sec.width || sec.x > pri.x + pri.width) {
    return false;
  }
  if (pri.y > sec.y + sec.height || sec.y > pri.y + pri.height) {
    return false;
  }
  return true;
}
