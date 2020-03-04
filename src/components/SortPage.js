import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import AnimatedVector from '../lib/AnimatedVector'
import { shuffle, reverse, bubbleSort, insertionSort, mergeSortInPlace, mergeSort, quickSort } from '../lib/sort'
import { drawBars } from '../lib/drawing'

class SortPage extends React.Component {
  constructor(props) {
    super(props);

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }

    this.vector = new AnimatedVector(data, 8);

    this.state = {
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

  renderCanvas(timeStamp) {
    const { animating, data } = this.vector.animate(timeStamp);
    if (!animating && !this.state.running) {
      this.setState({ rendering: false });
    }
    drawBars(this.canvas, data);
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
            </Col>
          </Row>
        </Container>
        <canvas className="canvas" ref={elem => this.canvas = elem} />
      </Section >
    );
  }
}

export default SortPage;
