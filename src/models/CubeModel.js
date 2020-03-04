import * as mat4 from 'gl-matrix/mat4';
import { initShaderProgram } from '../utility'

class CubeModel {
  constructor(gl) {
    this.gl = gl;
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
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'camera'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'model'),
        normalMatrix: gl.getUniformLocation(shaderProgram, 'normalMatrix'),
        light1: {
          position: gl.getUniformLocation(shaderProgram, 'light1.position'),
          color: gl.getUniformLocation(shaderProgram, 'light1.color')
        },
        light2: {
          position: gl.getUniformLocation(shaderProgram, 'light2.position'),
          color: gl.getUniformLocation(shaderProgram, 'light2.color')
        }
      },
      buffers: this._initBuffers(gl)
    }
  }

  draw(projectionMatrix, viewMatrix, modelMatrix, lights) {
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

    const modelViewMatrix = mat4.create();
    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    gl.useProgram(model.program);
    gl.uniformMatrix4fv(model.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(model.uniformLocations.normalMatrix, false, normalMatrix);
    gl.uniform3fv(model.uniformLocations.light1.position, lights[0].position);
    gl.uniform3fv(model.uniformLocations.light1.color, lights[0].color);
    gl.uniform3fv(model.uniformLocations.light2.position, lights[1].position);
    gl.uniform3fv(model.uniformLocations.light2.color, lights[1].color);

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }

  _initShaders(gl) {
    const vsSource = `
      uniform mat4 camera;
      uniform mat4 model;

      attribute vec3 vert;
      attribute vec4 vertColor;
      attribute vec3 vertNormal;

      varying lowp vec3 fragVert;
      varying lowp vec4 fragColor;
      varying lowp vec3 fragNormal;

      void main(void) {
        fragColor = vertColor;
        fragNormal = vertNormal;
        fragVert = vert;
        gl_Position = camera * model * vec4(vert, 1);
      }
    `;

    const fsSource = `
      precision highp float;

      uniform mat4 model;
      uniform mat4 normalMatrix;
      
      uniform struct {
        vec3 position;
        vec3 color;
      } light1;
      
      uniform struct {
        vec3 position;
        vec3 color;
      } light2;
      
      varying lowp vec4 fragColor;
      varying lowp vec3 fragNormal;
      varying lowp vec3 fragVert;
      
      void main() {
          vec3 normal = vec3(normalize(normalMatrix * vec4(fragNormal, 1)));
          
          vec3 fragPosition = vec3(model * vec4(fragVert, 1));
          
          vec3 surfaceToLight1 = light1.position - fragPosition;
          float bright1 = dot(normal, surfaceToLight1) / (length(surfaceToLight1) * length(normal));
          bright1 = clamp(bright1, 0.0, 1.0);
      
          vec3 surfaceToLight2 = light2.position - fragPosition;
          float bright2 = dot(normal, surfaceToLight2) / (length(surfaceToLight2) * length(normal));
          bright2 = clamp(bright2, 0.0, 1.0);
      
          gl_FragColor = vec4(bright1 * light1.color * fragColor.rgb + bright2 * light2.color * fragColor.rgb, fragColor.a);
      }
    `;

    return initShaderProgram(gl, vsSource, fsSource);
  }

  _initBuffers(gl) {
    const positions = [
      // Front face
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,

      // Top face
      -1.0, 1.0, -1.0,
      -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,
    ];

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vertexNormals = [
      // Front
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

      // Back
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,

      // Top
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      // Bottom
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,

      // Right
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      // Left
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0
    ];

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

    const faceColors = [
      [1.0, 1.0, 1.0, 1.0],    // Front face: white
      [1.0, 0.0, 0.0, 1.0],    // Back face: red
      [0.0, 1.0, 0.0, 1.0],    // Top face: green
      [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
      [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
      [1.0, 0.0, 1.0, 1.0],    // Left face: purple
    ];
    let colors = [];
    for (let j = 0; j < faceColors.length; ++j) {
      const c = faceColors[0];
      colors = colors.concat(c, c, c, c);
    }
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const indices = [
      // Front
      0, 1, 2, 0, 2, 3,

      // Back
      4, 5, 6, 4, 6, 7,

      // Top
      8, 9, 10, 8, 10, 11,

      // Bottom
      12, 13, 14, 12, 14, 15,

      // Right
      16, 17, 18, 16, 18, 19,

      // Left
      20, 21, 22, 20, 22, 23,
    ];

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return { position: positionBuffer, normal: normalBuffer, color: colorBuffer, indices: indexBuffer };
  }
}

export default CubeModel;
