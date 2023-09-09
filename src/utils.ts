import {
  UniversalCamera,
  Mesh,
  Vector3,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Rectangle } from "@babylonjs/gui";

interface Crosshair {
  xRect: Rectangle;
  yRect: Rectangle;
}

export function createTexture() {
  const blue = new StandardMaterial("blue");
  const orange = new StandardMaterial("orange");
  const green = new StandardMaterial("green");

  blue.diffuseTexture = new Texture("./textures/blue.png");
  orange.diffuseTexture = new Texture("./textures/orange.png");
  green.diffuseTexture = new Texture("./textures/green.png");

  blue.diffuseTexture.hasAlpha = true;
  orange.diffuseTexture.hasAlpha = true;
  green.diffuseTexture.hasAlpha = true;

  blue.zOffset = -1;
  orange.zOffset = -1;
  green.zOffset = -1;

  blue.roughness = 1;
  orange.roughness = 1;
  green.roughness = 1;

  return [blue, orange, green];
}

export function setUpUI() {
  const tex = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  const crosshairColor = "white";

  const xRect = new Rectangle("xRect");
  xRect.width = "20px";
  xRect.height = "2px";
  xRect.color = crosshairColor;
  tex.addControl(xRect);

  const yRect = new Rectangle("yRect");
  yRect.width = "2px";
  yRect.height = "20px";
  yRect.color = crosshairColor;
  tex.addControl(yRect);

  const dotBar = new Rectangle("dotBar");
  dotBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  dotBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  dotBar.top = "-20px";
  dotBar.width = "200px";
  dotBar.height = "40px";
  dotBar.background = "grey";
  tex.addControl(dotBar);

  const dotBarInner = new Rectangle("dotBarInner");
  dotBarInner.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  dotBarInner.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  dotBarInner.width = "100px";
  dotBarInner.height = "40px";
  dotBarInner.background = "green";
  dotBar.addControl(dotBarInner);

  return {
    crosshair: {
      xRect,
      yRect,
    },
    vectorComparator: dotBarInner,
  };
}

function findDotProductBetween(camera: UniversalCamera, mesh: Mesh) {
  const cameraDirection = camera
    .getDirection(Vector3.Forward())
    .normalizeToNew();
  const sphereVec = mesh.position.subtract(camera.position).normalizeToNew();

  return Vector3.Dot(cameraDirection, sphereVec);
}

function changeColorForCrosshair(crosshair: Crosshair, dot: number) {
  let color = "white";

  if (dot > 0.9) {
    color = "green";
  } else if (dot > 0.5) {
    color = "yellow";
  } else {
    color = "red";
  }

  crosshair.xRect.color = crosshair.yRect.color = color;
}
