import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import AnimatedVector from '../lib/AnimatedVector'
import * as sort from '../lib/Sort'
import CubeScene from '../scenes/CubeScene';
import LightedCubeScene from '../scenes/LightedCubeScene';

class TestPage extends React.Component {
  constructor(props) {
    super(props);

    this.scenes = [
      new CubeScene(),
      new LightedCubeScene()
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    this.vector = new AnimatedVector(data, 8);

    this.state = {
      sceneIndex: 0,
      running: false,
      rendering: false
    };

    this.run = this.run.bind(this);
    this.shuffleAction = this.shuffleAction.bind(this);
    this.reverseAction = this.reverseAction.bind(this);
    this.bubbleSortAction = this.bubbleSortAction.bind(this);
    this.insertionSortAction = this.insertionSortAction.bind(this);
    this.mergeSortAction = this.mergeSortAction.bind(this);
    this.quickSortAction = this.quickSortAction.bind(this);
    this.onClickCanvas = this.onClickCanvas.bind(this);
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
      this.scenes[0].initScene(this.gl, this.vector.getData());
      this.scenes[1].initScene(this.gl, this.vector.getData());
      this.frame = window.requestAnimationFrame(this.renderCanvas);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  run(routine) {
    this.setState({ running: true, rendering: true }, () => {
      routine([...this.vector.getData()], this.vector.initialize, this.vector.update);
      this.setState({ running: false });
    });
  }

  shuffleAction() {
    this.run(sort.shuffle);
  }

  reverseAction() {
    this.run(sort.reverse);
  }

  bubbleSortAction() {
    this.run(sort.bubbleSort);
  }

  insertionSortAction() {
    this.run(sort.insertionSort);
  }

  mergeSortAction() {
    this.run(sort.mergeSort);
  }

  quickSortAction() {
    this.run(sort.quickSort);
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
    const { animating, data } = this.vector.animate(timeStamp);
    if (!animating && !this.state.running) {
      this.setState({ rendering: false });
    }
    this.scenes[this.state.sceneIndex].drawScene(this.gl, deltaTime, data);
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <Section inner>
        <Container fluid className="mt-2 mb-2">
          <Row row="sm">
            <Col col="sm" className="d-flex justify-content-around align-items-center">
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.shuffleAction}>Shuffle</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.reverseAction}>Reverse</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.bubbleSortAction}>Bubble Sort</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.insertionSortAction}>Insertion Sort</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.mergeSortAction}>Merge Sort</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.quickSortAction}>Quick Sort</Button>
            </Col>
          </Row>
        </Container>
        <canvas className="canvas" ref={elem => this.canvas = elem} onClick={this.onClickCanvas} />
      </Section >
    );
  }
}

export default TestPage;
