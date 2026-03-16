import { Graphics } from "pixi.js";
import { FieldConfig } from "./config";
import { BaseView } from "../../core/BaseView";

export class FieldView extends BaseView {
  private field: Graphics;
  constructor() {
    super(FieldConfig);
    this.field = new Graphics();
    this.field.rect(0, 0, 100, 300).fill({ color: "yellow" });
    this.field.pivot.set(this.field.width / 2, this.field.height / 2);

    this.addChild(this.field);
    this.onResize(window.innerWidth, window.innerHeight);
  }

  onResize(width: number, height: number) {
    this.position.set(width - this.field.width - 50, height / 2);
  }
}
