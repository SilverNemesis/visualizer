import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import AnimatedGrid from '../lib/AnimatedGrid'
import { drawGrid } from '../lib/drawing'
import { createMaze, createDungeon } from '../lib/maze'

class MazePage extends React.Component {
  constructor(props) {
    super(props);
    const data = []
    for (let i = 0; i < 99; i++) {
      data.push(Array(99).fill(1));
    }

    this.grid = new AnimatedGrid(data, 6);

    this.run = this.run.bind(this)
    this.onClickCreateMaze = this.onClickCreateMaze.bind(this);
    this.onClickCreateDungeon = this.onClickCreateDungeon.bind(this);
    this.onResize = this.onResize.bind(this)
    this.renderCanvas = this.renderCanvas.bind(this);

    this.state = {
      running: false,
      rendering: false,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
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

  onResize() {
    if (window.screen.width !== this.width || window.screen.height !== this.height) {
      this.width = window.screen.width;
      this.height = window.screen.height;
      this.setState({ screenWidth: this.width, screenHeight: this.height });
    }
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
    let col1 = "sm-6";
    let col2 = "sm-6";
    if (this.state.screenWidth / this.state.screenHeight < 16 / 9) {
      col1 = "sm-8";
      col2 = "sm-4";
    }
    return (
      <Section inner>
        <Container fluid className="h-100 mt-5">
          <Row className="h-100">
            <Col col={col1}>
              <canvas className="w-100 h-100" ref={elem => this.canvas = elem} />
            </Col>
            <Col col={col2} className="d-flex flex-column justify-content-around align-items-start">
              <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateMaze}>Create Maze</Button>
              <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.onClickCreateDungeon}>Create Dungeon</Button>
            </Col>
          </Row>
        </Container>
      </Section>
    );
  }
}

export default MazePage;
