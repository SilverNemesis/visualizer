/** Class representing an animated array of values. */
class AnimatedVector {
  /**
   * Create an animated vector.
   * @param {*[]} data - The initial state of the data.
   * @param {number} frameRate - The frame rate of the animation in milliseconds.
   */
  constructor(data, frameRate) {
    this.data = data;
    this.frameRate = frameRate;
    this.queue = [];
    this.getData = this.getData.bind(this);
    this.initialize = this.initialize.bind(this);
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
  }

  /**
   * Get the current data.
   * @return {*[]} The data at the current time.
   */
  getData() {
    return this.data;
  }

  /**
   * Initialize a new animation.
   * @param {*[]} data - Optional parameter to reset the data.
   */
  initialize(data) {
    this.timeStamp = undefined;
    if (data) {
      this.data = this._clone(data);
    }
  }

  /**
   * Add a frame to the current animation.
   * @param {*[]} change - An array of index value pairs. [index, value, ...]
   */
  update(change) {
    this.queue.push(change);
  }

  /**
   * @typedef {Object} AnimationState
   * @property {bool} animating - Whether or not the animation is still in progress.
   * @property {*[]} data - The data at the current time.
   */

  /**
    * Run the animation based on time.
    * @param {number} timeStamp - The current time.
    * @return {AnimationState} - The resulting state of the animation.
    */
  animate(timeStamp) {
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    let elapsed = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    while (this.queue.length > 0 && elapsed >= this.frameRate) {
      elapsed -= this.frameRate;
      const updates = this.queue.shift();
      for (let i = 0; i < updates.length; i += 2) {
        this.data[updates[i]] = updates[i + 1];
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

export default AnimatedVector;
