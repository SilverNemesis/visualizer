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
    this.drawBars = this.drawBars.bind(this);
    this.shuffleAction = this.shuffleAction.bind(this);
    this.reverseAction = this.reverseAction.bind(this);
    this.bubbleSortAction = this.bubbleSortAction.bind(this);
    this.insertionSortAction = this.insertionSortAction.bind(this);
    this.mergeSortAction = this.mergeSortAction.bind(this);
    this.quickSortAction = this.quickSortAction.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.drawBars);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async task(i) {
    await new Promise(res => setTimeout(res, 1));
  }

  swap(data, i, j) {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  }

  async shuffle(done) {
    const data = this.data;
    const n = data.length;
    for (let i = n - 1; i >= 0; i--) {
      this.swap(data, i, Math.floor(Math.random() * i));
      await this.task();
    }
    done();
  }

  async reverse(done) {
    const data = this.data;
    const n = data.length;
    for (let i = 0; i < n / 2; i++) {
      this.swap(data, i, n - i - 1);
      await this.task();
    }
    done();
  }

  async bubbleSort(done) {
    const data = this.data;
    const n = data.length - 1;
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n - i; j++) {
        if (data[j] > data[j + 1]) {
          this.swap(data, j, j + 1);
          count++;
        }
        await this.task();
      }
      if (count === 0) {
        break;
      }
    }
    done();
  }

  async insertionSort(done) {
    const data = this.data;
    const n = data.length;
    for (let i = 1; i < n; i++) {
      const key = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] > key) {
        data[j + 1] = data[j];
        j = j - 1;
        await this.task();
      }
      data[j + 1] = key;
    }
    done();
  }

  async mergeSort(done) {
    const sort = async (data, l, r) => {
      if (l < r) {
        const m = Math.floor(l + (r - l) / 2);
        await sort(data, l, m);
        await sort(data, m + 1, r);
        await merge(data, l, m, r);
      }
    }
    const merge = async (data, start, mid, end) => {
      let start2 = mid + 1;
      if (data[mid] <= data[start2]) {
        return;
      }
      while (start <= mid && start2 <= end) {
        if (data[start] <= data[start2]) {
          start++;
        }
        else {
          const value = data[start2];
          let index = start2;
          while (index !== start) {
            data[index] = data[index - 1];
            await this.task();
            index--;
          }
          data[start] = value;
          await this.task();
          start++;
          mid++;
          start2++;
        }
      }
    }
    await sort(this.data, 0, this.data.length - 1);
    done();
  }

  async quickSort(done) {
    const partition = async (data, low, high) => {
      if (high - low > 2) {
        const mid = Math.floor(low + (high - low) / 2);
        if (data[low] < data[mid] && data[mid] < data[high]) {
          this.swap(data, mid, high);
        }
        else if (data[low] > data[mid] && data[mid] > data[high]) {
          this.swap(data, mid, high);
        }
        await this.task();
      }
      const pivot = data[high];
      let i = (low - 1);
      for (let j = low; j <= high - 1; j++) {
        if (data[j] < pivot) {
          i++;
          this.swap(data, i, j);
          await this.task();
        }
      }
      this.swap(data, i + 1, high);
      await this.task();
      return (i + 1);
    }
    const sort = async (data, low, high) => {
      if (low < high) {
        const mid = await partition(data, low, high);
        await sort(data, low, mid - 1);
        await sort(data, mid + 1, high);
      }
    }
    await sort(this.data, 0, this.data.length - 1);
    done();
  }

  shuffleAction() {
    this.setState({ running: true }, () => {
      this.shuffle(() => this.setState({ running: false }));
    });
  }

  reverseAction() {
    this.setState({ running: true }, () => {
      this.reverse(() => this.setState({ running: false }));
    });
  }

  bubbleSortAction() {
    this.setState({ running: true }, () => {
      this.bubbleSort(() => this.setState({ running: false }));
    });
  }

  insertionSortAction() {
    this.setState({ running: true }, () => {
      this.insertionSort(() => this.setState({ running: false }));
    });
  }

  mergeSortAction() {
    this.setState({ running: true }, () => {
      this.mergeSort(() => this.setState({ running: false }));
    });
  }

  quickSortAction() {
    this.setState({ running: true }, () => {
      this.quickSort(() => this.setState({ running: false }));
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
    window.requestAnimationFrame(this.drawBars);
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
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.reverseAction}>Reverse</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.bubbleSortAction}>Bubble Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.insertionSortAction}>Insertion Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.mergeSortAction}>Merge Sort</button>
              <button type="button" className="btn btn-primary btn-lg" disabled={this.state.running} onClick={this.quickSortAction}>Quick Sort</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
