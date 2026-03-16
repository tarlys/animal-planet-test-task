import { FieldView } from './View';
import { FederatedPointerEvent } from 'pixi.js';

export class FieldController {
  constructor(private view: FieldView) {
    this.view.eventMode = 'static';
    this.view.on('pointerdown', this.onClick, this);
  }

  onClick(event: FederatedPointerEvent) {
    console.log('onClickField', event);
  }
}
