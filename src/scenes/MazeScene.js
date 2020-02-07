import * as mat4 from 'gl-matrix/mat4';
import { clearScreen, degreesToRadians } from '../utility'

class MazeScene {
  constructor(MazeModel) {
    this.MazeModel = MazeModel;
    this.initScene = this.initScene.bind(this);
    this.drawScene = this.drawScene.bind(this);
    this.animateScene = this.animateScene.bind(this);
    this.totalDelta = 0.0;
  }

  initScene(gl, maze) {
    const model = new this.MazeModel(gl, maze);
    this.scene = {
      actors: [
        {
          model,
          location: [0.0, 10.0, -1.6 * maze.height],
          rotation: { angle: 0.0, axis: [0, 0, 1], speed: 0.5 }
        }
      ],
      camera: [0.0, 0.0, 0.0]
    };
  }

  drawScene(gl, maze) {
    const scene = this.scene;

    clearScreen(gl);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 500.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, scene.camera);
    mat4.invert(viewMatrix, viewMatrix)

    for (let i = 0; i < scene.actors.length; i++) {
      const actor = scene.actors[i];
      actor.model.update(maze);
      this._renderActor(projectionMatrix, viewMatrix, actor);
    }
  }

  _renderActor(projectionMatrix, viewMatrix, actor) {
    const model = actor.model;

    const modelMatrix = mat4.create();
    mat4.translate(modelMatrix, modelMatrix, actor.location);
    mat4.rotate(modelMatrix, modelMatrix, degreesToRadians(-45), [1, 0, 0]);
    mat4.rotate(modelMatrix, modelMatrix, actor.rotation.angle, actor.rotation.axis);

    model.draw(projectionMatrix, viewMatrix, modelMatrix);
  }

  animateScene(deltaTime) {
    const scene = this.scene;

    for (let i = 0; i < scene.actors.length; i++) {
      const actor = scene.actors[i];
      this._animateActor(deltaTime, actor);
    }
  }

  _animateActor(deltaTime, actor) {
    actor.rotation.angle += deltaTime * 0.001 * actor.rotation.speed;
  }
}

export default MazeScene;
