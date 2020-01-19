import React from 'react';
import { Container, Row, Col, Button } from '../primitives'
import Drawing from '../lib/Drawing'
import Vector from '../lib/Vector'

class Sort extends React.Component {
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
    this.vector = new Vector();
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

  update(data) {
    this.queue.push([...data]);
  }

  done() {
    this.setState({
      running: false
    });
  }

  shuffleAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.shuffle([...this.data], this.update, this.done);
    });
  }

  reverseAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.reverse([...this.data], this.update, this.done);
    });
  }

  bubbleSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.bubbleSort([...this.data], this.update, this.done);
    });
  }

  insertionSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.insertionSort([...this.data], this.update, this.done);
    });
  }

  mergeSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.mergeSort([...this.data], this.update, this.done);
    });
  }

  quickSortAction() {
    this.setState({ running: true, rendering: true }, () => {
      this.timeStamp = undefined;
      this.vector.quickSort([...this.data], this.update, this.done);
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
      this.data = this.queue.shift();
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
      <Container fluid>
        <Row>
          <Col col="sm" className="case">
            <canvas className="canvas" ref={elem => this.canvas = elem} />
          </Col>
        </Row>
        <Row className="h-25 mt-4">
          <Col col="sm" className="d-flex justify-content-around align-items-center">
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.shuffleAction}>Shuffle</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.reverseAction}>Reverse</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.bubbleSortAction}>Bubble Sort</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.insertionSortAction}>Insertion Sort</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.mergeSortAction}>Merge Sort</Button>
            <Button styles="primary large" disabled={this.state.running || this.state.rendering} onClick={this.quickSortAction}>Quick Sort</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sort;
