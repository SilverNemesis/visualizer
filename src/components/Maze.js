import React from 'react';
import { Container, Row, Col, Button } from '../primitives'
import Drawing from '../lib/Drawing'
import Vector from '../lib/Vector'

const directions = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 }
];

const windiness = 0.8;

class Maze extends React.Component {
  constructor(props) {
    super(props);
    const data = []
    for (let i = 0; i < 99; i++) {
      data.push(Array(99).fill(1));
    }
    this.state = {
      running: false,
      rendering: false
    };
    this.data = data;
    this.queue = [];
    this.drawing = new Drawing();
    this.vector = new Vector();
    this.update = this.update.bind(this)
    this.done = this.done.bind(this)
    this.onClickCreateMaze = this.onClickCreateMaze.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  clone(items) {
    return items.map(item => Array.isArray(item) ? this.clone(item) : item);
  }

  update(data) {
    this.queue.push(this.clone(data));
  }

  done() {
    this.setState({
      running: false
    });
  }

  createMaze(data, update, done) {
    const n = data.length;
    const m = data[0].length;
    this.growMaze(data, m, n, { x: 1, y: 1 }, update);
    done();
  }

  growMaze(data, mx, my, start, update) {
    const cells = [];
    let lastDir;
    this.carve(data, start);
    update(data);
    data[start.y][start.x] = 0;
    cells.push(start);
    while (cells.length > 0) {
      const cell = cells[cells.length - 1];
      const unmadeCells = [];
      for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];
        if (this.canCarve(data, mx, my, cell, dir)) {
          unmadeCells.push(dir);
        }
      }
      console.log(unmadeCells);
      if (unmadeCells.length > 0) {
        let dir;
        if (unmadeCells.includes(lastDir) && Math.random() > windiness) {
          dir = lastDir;
        } else {
          dir = unmadeCells[Math.floor(Math.random() * unmadeCells.length)];
        }
        this.carve(data, this.addDir(cell, dir, 1));
        this.carve(data, this.addDir(cell, dir, 2));
        update(data);
        cells.push(this.addDir(cell, dir, 2));
        lastDir = dir;
      } else {
        cells.pop();
        lastDir = null;
      }
    }
  }

  carve(data, pos) {
    data[pos.y][pos.x] = 0;
  }

  canCarve(data, mx, my, pos, dir) {
    if (!this.contains(mx, my, this.addDir(pos, dir, 3))) {
      return false;
    }
    const nxt = this.addDir(pos, dir, 2);
    return data[nxt.y][nxt.x] === 1;
  }

  contains(mx, my, pos) {
    if (pos.x < 0 || pos.y < 0 || pos.x >= mx || pos.y >= my) {
      return false;
    }
    return true;
  }

  addDir(pos, dir, len) {
    return {
      x: pos.x + dir.x * len,
      y: pos.y + dir.y * len
    }
  }

  onClickCreateMaze() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.createMaze(this.clone(this.data), this.update, this.done);
    });
  }

  renderCanvas(timeStamp) {
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    let elapsed = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    while (this.queue.length > 0 && elapsed >= 6) {
      elapsed -= 6;
      this.data = this.queue.shift();
    }
    this.timeStamp -= elapsed;
    this.drawing.drawGrid(this.canvas, this.data, ['black', 'sienna']);
    if (!this.state.running && this.queue.length === 0) {
      this.setState({ rendering: false });
    }
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col col="sm" className="side-case">
            <canvas className="canvas" ref={elem => this.canvas = elem} />
          </Col>
          <Col col="sm" className="d-flex flex-column justify-content-around align-items-start">
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateMaze}>Create Maze</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Maze;
