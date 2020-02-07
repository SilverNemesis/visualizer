import * as mat4 from 'gl-matrix/mat4';
import { clearScreen, degreesToRadians } from '../utility'
import LightedCubeModel from '../models/LightedCubeModel';

class LightedCubeScene {
  constructor() {
    this.totalTime = 0.0;
    this.initScene = this.initScene.bind(this);
    this.drawScene = this.drawScene.bind(this);
  }

  initScene(gl, data) {
    const model = new LightedCubeModel(gl);
    this.scene = {
      actors: [],
      camera: [0.0, 0.0, 50.0]
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

  drawScene(gl, deltaTime, data) {
    const scene = this.scene;

    clearScreen(gl);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, scene.camera);
    mat4.invert(viewMatrix, viewMatrix)

    for (let i = 0; i < scene.actors.length; i++) {
      const actor = scene.actors[i];
      this._renderActor(projectionMatrix, viewMatrix, actor);
      this._animateActor(actor, deltaTime, data[i]);
    }
  }

  _renderActor(projectionMatrix, viewMatrix, actor) {
    const model = actor.model;
    const modelMatrix = mat4.create();
    for (let i = 0; i < actor.rotations.length; i++) {
      const rotation = actor.rotations[i];
      mat4.rotate(modelMatrix, modelMatrix, rotation.angle, rotation.vector);
    }
    mat4.translate(modelMatrix, modelMatrix, actor.location);
    mat4.scale(modelMatrix, modelMatrix, actor.scale);
    model.draw(projectionMatrix, viewMatrix, modelMatrix);
  }

  _animateActor(actor, deltaTime, height) {
    actor.scale[1] = 0.1 * (height + 1);
    actor.rotations[0].angle += deltaTime * 0.002;
  }
}

export default LightedCubeScene;
