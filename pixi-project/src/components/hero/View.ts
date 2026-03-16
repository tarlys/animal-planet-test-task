import { Graphics } from 'pixi.js';
import { HeroConfig } from './config';
import { BaseView } from '../../core/BaseView';
import { detectAspectRatio } from '../../utils/screen';

const HERO_RADIUS = 50;

export class HeroView extends BaseView {
  private hero: Graphics;
  private centerOffsetX = window.innerWidth / 2;
  private centerOffsetY = window.innerHeight / 2;
  static readonly heroRadius = HERO_RADIUS;

  constructor() {
    super(HeroConfig);
    this.eventMode = 'none';
    this.hero = new Graphics();
    this.hero
      .circle(this.centerOffsetX, this.centerOffsetY, HERO_RADIUS)
      .fill({ color: 'red' });
    this.addChild(this.hero);
  }

  getCenterGlobal(): { x: number; y: number } {
    return {
      x: this.position.x + this.centerOffsetX,
      y: this.position.y + this.centerOffsetY,
    };
  }

  setCenterGlobal(x: number, y: number) {
    this.position.set(x - this.centerOffsetX, y - this.centerOffsetY);
  }

  onResize(width: number, height: number) {
    this.centerOffsetX = width / 2;
    this.centerOffsetY = height / 2;
    this.hero.clear();
    this.hero
      .circle(this.centerOffsetX, this.centerOffsetY, HERO_RADIUS)
      .fill({ color: 'red' });
    const { ratio, orientation } = detectAspectRatio(width, height);
    console.log('onResizeHeroView', width, height, ratio, orientation);
  }
}
