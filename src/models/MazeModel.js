import * as mat4 from 'gl-matrix/mat4';
import { initShaderProgram } from '../utility'

class MazeModel {
  constructor(gl, maze) {
    this.gl = gl;
    this.maze = maze;
    this.draw = this.draw.bind(this);
    const shaderProgram = this._initShaders(gl);
    this.model = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
      },
      buffers: this._initBuffers(gl, maze)
    }
  }

  update(maze) {
    this._freeBuffers(this.gl, this.model.buffers);
    this.maze = maze;
    this.model.buffers = this._initBuffers(this.gl, maze);
  }

  draw(projectionMatrix, viewMatrix, modelMatrix) {
    const gl = this.gl;
    const model = this.model;
    const { buffers } = this.model;

    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(model.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(model.attribLocations.vertexPosition);
    }

    {
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.vertexAttribPointer(model.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(model.attribLocations.vertexColor);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    const modelViewMatrix = mat4.create();
    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

    gl.useProgram(model.program);
    gl.uniformMatrix4fv(model.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    {
      const vertexCount = buffers.vertexCount;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }

  _initShaders(gl) {
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;

    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;

    return initShaderProgram(gl, vsSource, fsSource);
  }

  _initBuffers(gl, maze) {
    const positions = []
    const colors = [];
    const indices = [];
    let offset = 0;

    const addSquareXY = (left, right, top, bottom, base, color) => {
      positions.push
        (
          left, top, base,
          right, top, base,
          right, bottom, base,
          left, bottom, base
        );
      indices.push
        (
          offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3
        );
      offset += 4;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const addSquareXZ = (left, right, top, bottom, base, color) => {
      positions.push
        (
          left, base, top,
          right, base, top,
          right, base, bottom,
          left, base, bottom
        );
      indices.push
        (
          offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3
        );
      offset += 4;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const addSquareYZ = (left, right, top, bottom, base, color) => {
      positions.push
        (
          base, left, top,
          base, right, top,
          base, right, bottom,
          base, left, bottom
        );
      indices.push
        (
          offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3
        );
      offset += 4;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const floorColor = [.2, .2, .2, 1];
    const ceilingColor = [.7, .7, .7, 1];
    const wallColor_Top = [.5, 0, .5, 1];
    const wallColor_Bottom = [0, .5, 0, 1];
    const wallColor_Left = [.5, 0, 0, 1];
    const wallColor_Right = [0, .0, .5, 1];

    const ofs_x = -maze.width / 2;
    const ofs_y = -maze.height / 2;
    for (let y = 0; y < maze.height; y++) {
      for (let x = 0; x < maze.width; x++) {
        const left = x + ofs_x;
        const right = left + 1;
        const top = y + ofs_y;
        const bottom = top + 1;

        if (maze.data[y][x] === 0) {
          addSquareXY(left, right, top, bottom, 0.0, floorColor);
        } else {
          addSquareXY(left, right, top, bottom, 1.0, ceilingColor);

          if (y === 0 || maze.data[y - 1][x] === 0) {
            addSquareXZ(left, right, 0.0, 1.0, top, wallColor_Top);
          }

          if (x === 0 || maze.data[y][x - 1] === 0) {
            addSquareYZ(bottom, top, 0.0, 1.0, left, wallColor_Left);
          }

          if (y === maze.height - 1 || maze.data[y + 1][x] === 0) {
            addSquareXZ(right, left, 0.0, 1.0, bottom, wallColor_Bottom);
          }

          if (x === maze.width - 1 || maze.data[y][x + 1] === 0) {
            addSquareYZ(top, bottom, 0.0, 1.0, right, wallColor_Right);
          }
        }
      }
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return { position: positionBuffer, color: colorBuffer, indices: indexBuffer, vertexCount: indices.length };
  }

  _freeBuffers(gl, buffers) {
    gl.deleteBuffer(buffers.position);
    gl.deleteBuffer(buffers.color);
    gl.deleteBuffer(buffers.indices);
  }
}

export default MazeModel;
