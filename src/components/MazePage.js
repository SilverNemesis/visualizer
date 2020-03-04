import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives';
import AnimatedGrid from '../lib/AnimatedGrid';
import { createMaze, createDungeon } from '../lib/maze';
import { drawGrid } from '../lib/drawing';

const size = 69;

class MazePage extends React.Component {
  constructor(props) {
    super(props);

    const data = []
    for (let i = 0; i < size; i++) {
      data.push(Array(size).fill(1));
    }

    this.grid = new AnimatedGrid(data, 12);

    this.state = {
      running: false,
      rendering: false
    };

    this.run = this.run.bind(this);
    this.onClickCreateMaze = this.onClickCreateMaze.bind(this);
    this.onClickCreateDungeon = this.onClickCreateDungeon.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  run(routine) {
    this.setState({ running: true, rendering: true }, () => {
      routine(this._clone(this.grid.getData()), this.grid.initialize, this.grid.update);
      this.setState({ running: false });
    });
  }

  onClickCreateMaze() {
    this.run(createMaze);
  }

  onClickCreateDungeon() {
    this.run(createDungeon);
  }

  renderCanvas(timeStamp) {
    const { animating, data } = this.grid.animate(timeStamp);
    if (!animating && !this.state.running) {
      this.setState({ rendering: false });
    }
    drawGrid(this.canvas, data, ['black', 'sienna']);
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  _clone(items) {
    return items.map(item => Array.isArray(item) ? this._clone(item) : item);
  }

  render() {
    return (
      <Section inner>
        <Container fluid className="mt-2 mb-2">
          <Row row="sm">
            <Col col="sm" className="d-flex justify-content-around align-items-center">
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateMaze}>Create Maze</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateDungeon}>Create Dungeon</Button>
            </Col>
          </Row>
        </Container>
        <canvas className="canvas" ref={elem => this.canvas = elem} />
      </Section >
    );
  }
}

export default MazePage;
