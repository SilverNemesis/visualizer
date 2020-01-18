import React from 'react';
import Drawing from './lib/Drawing'
import Vector from './lib/Vector'

class App extends React.Component {
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
    window.requestAnimationFrame(this.renderCanvas);
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
    window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid screen">
          <div className="row">
            <div className="col-sm case">
              <canvas className="canvas" ref={elem => this.canvas = elem} />
            </div>
          </div>
          <div className="row h-25">
            <div className="col-sm d-flex justify-content-around align-items-center">
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.shuffleAction}>Shuffle</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.reverseAction}>Reverse</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.bubbleSortAction}>Bubble Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.insertionSortAction}>Insertion Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.mergeSortAction}>Merge Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running || this.state.rendering} onClick={this.quickSortAction}>Quick Sort</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
