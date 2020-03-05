import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import AnimatedVector from '../lib/AnimatedVector'
import { shuffle, reverse, bubbleSort, insertionSort, mergeSortInPlace, mergeSort, quickSort } from '../lib/sort'
import { drawBars } from '../lib/drawing'
import CubeScene from '../scenes/CubeScene';

class SortPage extends React.Component {
  constructor(props) {
    super(props);

    this.scene = new CubeScene();

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }

    this.vector = new AnimatedVector(data, 8);

    this.state = {
      render3D: false,
      lightingIndex: 0,
      running: false,
      rendering: false
    };

    this.run = this.run.bind(this);
    this.shuffleAction = this.shuffleAction.bind(this);
    this.reverseAction = this.reverseAction.bind(this);
    this.bubbleSortAction = this.bubbleSortAction.bind(this);
    this.insertionSortAction = this.insertionSortAction.bind(this);
    this.mergeSortInPlaceAction = this.mergeSortInPlaceAction.bind(this);
    this.mergeSortAction = this.mergeSortAction.bind(this);
    this.quickSortAction = this.quickSortAction.bind(this);
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
      this.scene.initScene(this.gl, this.vector.getData());
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
    this.run(shuffle);
  }

  reverseAction() {
    this.run(reverse);
  }

  bubbleSortAction() {
    this.run(bubbleSort);
  }

  insertionSortAction() {
    this.run(insertionSort);
  }

  mergeSortInPlaceAction() {
    this.run(mergeSortInPlace);
  }

  mergeSortAction() {
    this.run(mergeSort);
  }

  quickSortAction() {
    this.run(quickSort);
  }

  onClickRenderMode() {
    this.setState({
      render3D: !this.state.render3D
    });
  }

  onClickCanvas() {
    this.setState({
      lightingIndex: 1 - this.state.lightingIndex
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
    if (this.state.render3D) {
      this.scene.drawScene(this.gl, deltaTime, data, this.state.lightingIndex, this.state.lightingIndex === 0);
    } else {
      drawBars(this.canvas2D, data);
    }
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
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.mergeSortInPlaceAction}>Merge Sort (In Place)</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.mergeSortAction}>Merge Sort</Button>
              <Button styles="primary" disabled={this.state.running || this.state.rendering} onClick={this.quickSortAction}>Quick Sort</Button>
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

export default SortPage;
