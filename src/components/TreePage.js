import React from 'react';
import { Section, Container, Row, Col, Button } from '../primitives'
import { drawTree } from '../lib/drawing'

class SortPage extends React.Component {
  constructor(props) {
    super(props);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    //this.shuffle(data);
    this.state = {
      data,
      index: 0,
      root: null
    }
    this.reset = this.reset.bind(this);
    this.insertNode = this.insertNode.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  shuffle(data) {
    function _swap(data, i, j) {
      const t = data[i];
      data[i] = data[j];
      data[j] = t;
    }

    const n = data.length;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      _swap(data, i, j);
    }
  }

  height(node) {
    if (node) {
      return node.height;
    } else {
      return -1;
    }
  }

  insert(node, value) {
    if (!node) {
      return { value, height: 0, left: null, right: null };
    }
    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    }
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    const balance = this.height(node.left) - this.height(node.right);
    if (balance < -1) {
      if (this.height(node.right.left) - this.height(node.right.right) !== 1) {
        node = this.rotateLeft(node);
      } else {
        node.right = this.rotateRight(node.right);
        node = this.rotateLeft(node);
      }
    } else if (balance > 1) {
      if (this.height(node.left.left) - this.height(node.left.right) !== -1) {
        node = this.rotateRight(node);
      } else {
        node.left = this.rotateLeft(node.left);
        node = this.rotateRight(node);
      }
    }
    return node;
  }

  rotateRight(node) {
    const other = node.left;
    node.left = other.right;
    other.right = node;
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    other.height = 1 + Math.max(this.height(other.left), this.height(other.right));
    return other;
  }

  rotateLeft(node) {
    const other = node.right;
    node.right = other.left;
    other.left = node;
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    other.height = 1 + Math.max(this.height(other.left), this.height(other.right));
    return other;
  }

  reset() {
    this.shuffle(this.state.data);
    this.setState({
      index: 0,
      root: null
    });
  }

  insertNode() {
    const { data, index, root } = this.state;
    this.setState({
      index: index + 1,
      root: this.insert(root, data[index])
    });
  }

  renderCanvas() {
    drawTree(this.canvas, this.state.root);
    this.frame = window.requestAnimationFrame(this.renderCanvas);
  }

  render() {
    return (
      <Section inner>
        <Container fluid className="mt-2 mb-2">
          <Row row="sm">
            <Col col="sm" className="d-flex justify-content-around align-items-center">
              <Button styles="primary" onClick={this.reset}>Reset</Button>
              <Button styles="primary" disabled={this.state.index >= this.state.data.length} onClick={this.insertNode}>Insert {this.state.data[this.state.index]}</Button>
            </Col>
          </Row>
        </Container>
        <canvas className="canvas" ref={elem => this.canvas = elem} />
      </Section >
    );
  }
}

export default SortPage;
