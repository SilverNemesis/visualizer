import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import AnimatedGrid from '../lib/AnimatedGrid'
import MazeScene from '../scenes/MazeScene';
import { createMaze, createDungeon } from '../lib/Maze'

const size = 69;

class MazePage3D extends React.Component {
  constructor(props) {
    super(props);

    this.scenes = [
      new MazeScene()
    ];

    const data = []
    for (let i = 0; i < size; i++) {
      data.push(Array(size).fill(1));
    }
    this.grid = new AnimatedGrid(data, 16);

    this.state = {
      sceneIndex: 0,
      running: false,
      rendering: false
    };

    this.run = this.run.bind(this);
    this.onClickCreateMaze = this.onClickCreateMaze.bind(this);
    this.onClickCreateDungeon = this.onClickCreateDungeon.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvas;
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width;
    canvas.height = rect.height;
    this.gl = canvas.getContext('webgl');
    if (this.gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    } else {
      const maze = { width: size, height: size, data: this.grid.getData() };
      this.scenes[0].initScene(this.gl, maze);
      this.frame = window.requestAnimationFrame(this.renderCanvas);
    }
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
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    const deltaTime = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    const { animating, data } = this.grid.animate(timeStamp);
    if (!animating && !this.state.running) {
      this.setState({ rendering: false });
    }
    this.scenes[this.state.sceneIndex].drawScene(this.gl, deltaTime, { width: size, height: size, data });
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

export default MazePage3D;
