import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    this.state = {
      running: false
    };
    this.data = data;
    this.queue = [];
    this.updateState = this.updateState.bind(this);
    this.shuffleAction = this.shuffleAction.bind(this);
    this.bubbleSortAction = this.bubbleSortAction.bind(this);
    this.insertionSortAction = this.insertionSortAction.bind(this);
  }

  componentDidMount() {
    this.drawBars();
    setInterval(this.updateState, 1);
  }

  componentDidUpdate() {
    this.drawBars();
  }

  swap(data, i, j) {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  }

  shuffle() {
    const data = [...this.data];
    const n = data.length;
    for (let i = n - 1; i >= 0; i--) {
      this.swap(data, i, Math.floor(Math.random() * i));
    }
    this.addState(data);
  }

  bubbleSort() {
    const data = [...this.data];
    const n = data.length - 1;
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n - i; j++) {
        if (data[j] > data[j + 1]) {
          this.swap(data, j, j + 1);
          count++;
        }
        this.addState([...data]);
      }
      this.addState([...data]);
      if (count === 0) {
        break;
      }
    }
  }

  insertionSort() {
    const data = [...this.data];
    const n = data.length;
    for (let i = 1; i < n; i++) {
      const key = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] > key) {
        data[j + 1] = data[j];
        j = j - 1;
        this.addState([...data]);
      }
      data[j + 1] = key;
      this.addState([...data]);
    }
  }

  addState(data) {
    this.queue.push(data);
  }

  remState() {
    if (this.queue.length === 0) {
      return null;
    }
    return this.queue.shift();
  }

  updateState() {
    const data = this.remState();
    if (data) {
      this.data = data;
      this.drawBars();
    }
    else if (this.state.running) {
      this.setState({ running: false }, () => { console.log(this.state); });
    }
  }

  shuffleAction() {
    this.setState({ running: true }, () => {
      console.log(this.state); this.shuffle();
    });
  }

  bubbleSortAction() {
    this.setState({ running: true }, () => {
      console.log(this.state); this.bubbleSort();
    });
  }

  insertionSortAction() {
    this.setState({ running: true }, () => {
      console.log(this.state); this.insertionSort();
    });
  }

  drawBars() {
    const data = this.data;
    const n = data.length;
    const rect = this.canvas.getBoundingClientRect()
    const w = rect.width;
    const h = rect.height;
    this.canvas.width = w;
    this.canvas.height = h;
    const step = Math.floor(w / n);
    const barWidth = Math.floor(step * .8);
    const ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'black'
    for (let i = 0; i < n; i++) {
      const barHeight = Math.floor(data[i] / 100 * .8 * h);
      ctx.fillRect(i * step, h - barHeight, barWidth, barHeight);
    }
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
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.shuffleAction}>Shuffle</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.bubbleSortAction}>Bubble Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.insertionSortAction}>Insertion Sort</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
