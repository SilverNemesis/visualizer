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
        vertexPosition: gl.getAttribLocation(shaderProgram, 'vert'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'vertColor'),
        vertexNormal: gl.getAttribLocation(shaderProgram, 'vertNormal')
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        viewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
        modelMatrix: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
        normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        light: {
          position: gl.getUniformLocation(shaderProgram, 'light.position'),
          color: gl.getUniformLocation(shaderProgram, 'light.color')
        }
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
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
      gl.vertexAttribPointer(model.attribLocations.vertexNormal, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(model.attribLocations.vertexNormal);
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

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    gl.useProgram(model.program);
    gl.uniformMatrix4fv(model.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.modelMatrix, false, modelMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.viewMatrix, false, viewMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.normalMatrix, false, normalMatrix);

    gl.uniform3f(model.uniformLocations.light.position, 0.0, 14.0, 0.0);
    gl.uniform3f(model.uniformLocations.light.color, 1.0, 1.0, 1.0);

    {
      const vertexCount = buffers.vertexCount;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }

  _initShaders(gl) {
    const vsSource = `
      precision mediump float;

      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uModelMatrix;
      uniform mat4 uNormalMatrix;

      attribute vec3 vert;
      attribute vec4 vertColor;
      attribute vec3 vertNormal;

      varying vec3 fragPosition;
      varying vec4 fragColor;
      varying vec3 fragNormal;

      void main(void) {
        fragPosition = vec3(uModelMatrix * vec4(vert, 1));
        fragColor = vertColor;
        fragNormal = vec3(uNormalMatrix * vec4(vertNormal, 1));
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(vert, 1);
      }
    `;

    const fsSource = `
      precision mediump float;

      uniform struct {
        vec3 position;
        vec3 color;
      } light;
      
      varying vec3 fragPosition;
      varying vec4 fragColor;
      varying vec3 fragNormal;
      
      void main() {          
          float ambient = 0.0;

          vec3 light_dir = light.position - fragPosition;
          float distance = length(light_dir);
          float diffuse = dot(fragNormal, normalize(light_dir));
          float point_intensity = clamp(12000.0 / (distance * distance), 0.0, 1.0) * diffuse;

          gl_FragColor = vec4(ambient * fragColor.rgb + point_intensity * light.color * fragColor.rgb, fragColor.a);
      }
    `;

    return initShaderProgram(gl, vsSource, fsSource);
  }

  _initBuffers(gl, maze) {
    const positions = []
    const normals = [];
    const colors = [];
    const indices = [];
    let offset = 0;

    const addSquareXY = (left, right, top, bottom, base, color, normal) => {
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
        for (let j = 0; j < 3; j++) {
          normals.push(normal[j]);
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const addSquareXZ = (left, right, top, bottom, base, color, normal) => {
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
        for (let j = 0; j < 3; j++) {
          normals.push(normal[j]);
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const addSquareYZ = (left, right, top, bottom, base, color, normal) => {
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
        for (let j = 0; j < 3; j++) {
          normals.push(normal[j]);
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          colors.push(color[j]);
        }
      }
    }

    const floorColor = [0.52, 0.34, 0.14, 1];
    const ceilingColor = [0.0, 1.0, 0.0, 1];
    const wallColor_Top = [0.25, 0.5, 0.0, 1];
    const wallColor_Bottom = [0.25, 0.5, 0.0, 1];
    const wallColor_Left = [0.25, 0.5, 0.0, 1];
    const wallColor_Right = [0.25, 0.5, 0.0, 1];

    const floorNormal = [0.0, 0.0, 1.0];
    const ceilingNormal = [0.0, 0.0, 1.0];
    const wallNormal_Top = [0.0, -1.0, 0.0];
    const wallNormal_Bottom = [0.0, 1.0, 0.0];
    const wallNormal_Left = [-1.0, 0.0, 0.0];
    const wallNormal_Right = [1.0, 0.0, 0.0];

    const ofs_x = -maze.width / 2;
    const ofs_y = -maze.height / 2;
    for (let y = 0; y < maze.height; y++) {
      for (let x = 0; x < maze.width; x++) {
        const left = x + ofs_x;
        const right = left + 1;
        const top = y + ofs_y;
        const bottom = top + 1;

        if (maze.data[y][x] === 0) {
          addSquareXY(left, right, top, bottom, 0.0, floorColor, floorNormal);
        } else {
          addSquareXY(left, right, top, bottom, 1.0, ceilingColor, ceilingNormal);

          if (y === 0 || maze.data[y - 1][x] === 0) {
            addSquareXZ(left, right, 0.0, 1.0, top, wallColor_Top, wallNormal_Top);
          }

          if (x === 0 || maze.data[y][x - 1] === 0) {
            addSquareYZ(bottom, top, 0.0, 1.0, left, wallColor_Left, wallNormal_Left);
          }

          if (y === maze.height - 1 || maze.data[y + 1][x] === 0) {
            addSquareXZ(right, left, 0.0, 1.0, bottom, wallColor_Bottom, wallNormal_Bottom);
          }

          if (x === maze.width - 1 || maze.data[y][x + 1] === 0) {
            addSquareYZ(top, bottom, 0.0, 1.0, right, wallColor_Right, wallNormal_Right);
          }
        }
      }
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return { position: positionBuffer, normal: normalBuffer, color: colorBuffer, indices: indexBuffer, vertexCount: indices.length };
  }

  _freeBuffers(gl, buffers) {
    gl.deleteBuffer(buffers.position);
    gl.deleteBuffer(buffers.color);
    gl.deleteBuffer(buffers.indices);
  }
}

export default MazeModel;
