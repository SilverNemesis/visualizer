import React from 'react';
import { Container, Row, Col, Button } from '../primitives'
import Drawing from '../lib/Drawing'
import Grid from '../lib/Grid'

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
    this.grid = new Grid();

    this.run = this.run.bind(this)
    this.update = this.update.bind(this)
    this.done = this.done.bind(this)

    this.onClickReset = this.onClickReset.bind(this);
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

  run(routine) {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      routine(this.clone(this.data), this.update);
      this.done();
    });
  }

  update(data) {
    this.queue.push(this.clone(data));
  }

  done() {
    this.setState({
      running: false
    });
  }

  reset(data, update) {
    const my = data.length;
    for (let y = 0; y < my; y++) {
      data[y].fill(1);
      update(data);
    }
  }

  onClickReset() {
    this.run(this.reset);
  }

  onClickCreateMaze() {
    this.run(this.grid.createMaze);
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
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.onClickReset}>Reset</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateMaze}>Create Maze</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Maze;
