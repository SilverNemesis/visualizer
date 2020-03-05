import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives';
import AnimatedGrid from '../lib/AnimatedGrid';
import { createMaze, createDungeon } from '../lib/maze';
import { drawGrid } from '../lib/drawing';
import MazeScene from '../scenes/MazeScene';
import MazeModel from '../models/MazeModel';
import MazeModelPerPixel from '../models/MazeModelPerPixel';

const size = 69;

class MazePage extends React.Component {
  constructor(props) {
    super(props);

    this.scenes = [
      new MazeScene(MazeModel),
      new MazeScene(MazeModelPerPixel)
    ];

    const data = []
    for (let i = 0; i < size; i++) {
      data.push(Array(size).fill(1));
    }

    this.grid = new AnimatedGrid(data, 12);

    this.state = {
      render3D: false,
      sceneIndex: 0,
      running: false,
      rendering: false
    };

    this.run = this.run.bind(this);
    this.onClickCreateMaze = this.onClickCreateMaze.bind(this);
    this.onClickCreateDungeon = this.onClickCreateDungeon.bind(this);
    this.onClickRenderMode = this.onClickRenderMode.bind(this);
    this.onClickCanvas = this.onClickCanvas.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvas3D;
    this.gl = canvas.getContext('webgl');
    if (this.gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    } else {
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.cullFace(this.gl.BACK);
      const maze = { width: size, height: size, data: this.grid.getData() };
      this.scenes[0].initScene(this.gl, maze);
      this.scenes[1].initScene(this.gl, maze);
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

  onClickRenderMode() {
    this.setState({
      render3D: !this.state.render3D
    });
  }

  onClickCanvas() {
    this.setState({
      sceneIndex: 1 - this.state.sceneIndex
    });
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
    if (this.state.render3D) {
      this.scenes[this.state.sceneIndex].drawScene(this.gl, { width: size, height: size, data });
      for (let i = 0; i < this.scenes.length; i++) {
        this.scenes[i].animateScene(deltaTime);
      }
    } else {
      drawGrid(this.canvas2D, data, ['black', 'sienna']);
    }
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
              <Button styles="primary" onClick={this.onClickRenderMode}>{this.state.render3D ? 'Switch To 2D' : 'Switch To 3D'}</Button>
            </Col>
          </Row>
        </Container>
        <canvas className={this.state.render3D ? 'canvas' : 'canvas none'} ref={elem => this.canvas3D = elem} onClick={this.onClickCanvas} />
        <canvas className={this.state.render3D ? 'canvas none' : 'canvas'} ref={elem => this.canvas2D = elem} />
      </Section >
    );
  }
}

export default MazePage;
