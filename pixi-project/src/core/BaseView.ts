import { Container } from 'pixi.js';

export interface ViewConfig {
  position?: { x: number; y: number };
  scale?: { x: number; y: number };
}

export class BaseView extends Container {
  constructor(config?: ViewConfig) {
    super();

    if (config?.position) {
      this.position.set(config.position.x, config.position.y);
    }
    if (config?.scale) {
      this.scale.set(config.scale.x, config.scale.y);
    }
  }

  onResize(width: number, height: number) {
    console.log('onResizeBaseView', width, height);
  }
}
