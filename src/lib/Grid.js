class Grid {
  constructor(data) {
    this.data = data;
    this.queue = [];
    this.getData = this.getData.bind(this);
    this.initialize = this.initialize.bind(this);
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
  }

  getData() {
    return this.data;
  }

  initialize(data) {
    this.timeStamp = undefined;
    if (data) {
      this.data = this._clone(data);
    }
  }

  update(change) {
    this.queue.push(change);
  }

  animate(timeStamp) {
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    let elapsed = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    while (this.queue.length > 0 && elapsed >= 6) {
      elapsed -= 6;
      const updates = this.queue.shift();
      for (let i = 0; i < updates.length; i += 3) {
        this.data[updates[i + 1]][updates[i]] = updates[i + 2];
      }
    }
    this.timeStamp -= elapsed;
    return {
      animating: this.queue.length !== 0,
      data: this.data
    }
  }

  _clone(items) {
    return items.map(item => Array.isArray(item) ? this._clone(item) : item);
  }
}

export default Grid;
