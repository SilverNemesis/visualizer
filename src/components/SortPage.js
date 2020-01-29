import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import Drawing from '../lib/Drawing'
import Sort from '../lib/Sort'

class SortPage extends React.Component {
  constructor(props) {
    super(props);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    this.state = {
      running: false,
      rendering: false
    };
    this.data = data;
    this.queue = [];
    this.drawing = new Drawing();
    this.sort = new Sort();
    this.initialize = this.initialize.bind(this);
    this.update = this.update.bind(this)
    this.done = this.done.bind(this)
    this.renderCanvas = this.renderCanvas.bind(this);
    this.shuffleAction = this.shuffleAction.bind(this);
    this.reverseAction = this.reverseAction.bind(this);
    this.bubbleSortAction = this.bubbleSortAction.bind(this);
    this.insertionSortAction = this.insertionSortAction.bind(this);
    this.mergeSortAction = this.mergeSortAction.bind(this);
    this.quickSortAction = this.quickSortAction.bind(this);
  }

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  initialize(data) {
    this.data = this.clone(data);
  }

  update(change) {
    this.queue.push(change);
  }

  done() {
    this.setState({
      running: false
    });
  }

  shuffleAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.shuffle([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  reverseAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.reverse([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  bubbleSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.bubbleSort([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  insertionSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.insertionSort([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  mergeSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.mergeSort([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  quickSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.sort.quickSort([...this.data], this.initialize, this.update);
      this.done();
    });
  }

  renderCanvas(timeStamp) {
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    let elapsed = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    while (this.queue.length > 0 && elapsed >= 8) {
      elapsed -= 8;
      const updates = this.queue.shift();
      for (let i = 0; i < updates.length; i += 2) {
        this.data[updates[i]] = updates[i + 1];
      }
    }
    this.timeStamp -= elapsed;
    this.drawing.drawBars(this.canvas, this.data);
    if (!this.state.running && this.queue.length === 0) {
      this.setState({ rendering: false });
    }
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <Section inner>
        <Container fluid className="mt-5">
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
        <canvas className="flex-grow-1" ref={elem => this.canvas = elem} />
      </Section >
    );
  }
}

export default SortPage;
