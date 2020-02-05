import React from 'react';
import { Section } from '../primitives'
import CubeScene from '../scenes/CubeScene';

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.scene = new CubeScene();
    this.data = [];
    for (let i = 0; i < 100; i++) {
      this.data.push(i);
    }
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
      this.scene.initScene(this.gl, this.data);
      this.frame = window.requestAnimationFrame(this.renderCanvas);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  renderCanvas(timeStamp) {
    timeStamp *= 0.001;
    if (!this.timeStamp) {
      this.timeStamp = timeStamp;
    }
    const deltaTime = timeStamp - this.timeStamp;
    this.timeStamp = timeStamp;
    this.scene.drawScene(this.gl, deltaTime, this.data);
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <Section inner>
        <canvas className="canvas" ref={elem => this.canvas = elem} />
      </Section >
    );
  }
}

export default TestPage;
