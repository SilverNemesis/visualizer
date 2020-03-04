import * as mat4 from 'gl-matrix/mat4';
import { clearScreen, degreesToRadians } from '../utility'
import CubeModel from '../models/CubeModel';

class CubeScene {
  constructor() {
    this.totalTime = 0.0;
    this.initScene = this.initScene.bind(this);
    this.drawScene = this.drawScene.bind(this);
  }

  initScene(gl, data) {
    const model = new CubeModel(gl);
    this.scene = {
      actors: [],
      lighting: [
        [
          {
            position: [50.0, 10.0, 20.0],
            color: [1.0, 1.0, 1.0]
          },
          {
            position: [0.0, 0.0, 0.0],
            color: [0.0, 0.0, 0.0]
          }
        ],
        [
          {
            position: [50.0, 10.0, 20.0],
            color: [1.0, 0.0, 1.0]
          },
          {
            position: [-50.0, -10.0, 20.0],
            color: [0.0, 1.0, 0.0]
          }
        ]
      ],
      camera: [0.0, 0.0, 50.0],
      cameraAngle: 0.0
    };
    for (let i = 0; i < data.length; i++) {
      this.scene.actors.push(
        {
          model,
          location: [0.5 * (i - ((data.length - 1) / 2)), 0.0, 0.0],
          scale: [0.1, 0.1 * (data[i] + 1), 0.2],
          rotations: [
            {
              angle: degreesToRadians(-25),
              vector: [1, 0, 0]
            }
          ]
        }
      );
    }
  }

  drawScene(gl, deltaTime, data, lightingIndex, rotateCamera) {
    const scene = this.scene;
    const lights = scene.lighting[lightingIndex];

    clearScreen(gl);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const viewMatrix = mat4.create();
    if (rotateCamera) {
      mat4.rotate(viewMatrix, viewMatrix, scene.cameraAngle, [0, 1, 0]);
    }
    mat4.translate(viewMatrix, viewMatrix, scene.camera);
    mat4.invert(viewMatrix, viewMatrix)

    for (let i = 0; i < scene.actors.length; i++) {
      const actor = scene.actors[i];
      this._renderActor(projectionMatrix, viewMatrix, actor, lights, !rotateCamera);
      this._animateActor(actor, deltaTime, data[i]);
    }

    if (rotateCamera) {
      scene.cameraAngle += 0.001 * deltaTime;
    }
  }

  _renderActor(projectionMatrix, viewMatrix, actor, lights, applyRotations) {
    const model = actor.model;
    const modelMatrix = mat4.create();
    if (applyRotations) {
      for (let i = 0; i < actor.rotations.length; i++) {
        const rotation = actor.rotations[i];
        mat4.rotate(modelMatrix, modelMatrix, rotation.angle, rotation.vector);
      }
    }
    else {
      const angle = degreesToRadians(-25);
      const vector = [1, 0, 0];
      mat4.rotate(modelMatrix, modelMatrix, angle, vector);
    }
    mat4.translate(modelMatrix, modelMatrix, actor.location);
    mat4.scale(modelMatrix, modelMatrix, actor.scale);
    model.draw(projectionMatrix, viewMatrix, modelMatrix, lights);
  }

  _animateActor(actor, deltaTime, height) {
    actor.scale[1] = 0.1 * (height + 1);
    actor.rotations[0].angle += deltaTime * 0.002;
  }
}

export default CubeScene;
