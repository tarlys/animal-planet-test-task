import type { Application } from 'pixi.js';
import { HeroView } from './View';

const HERO_SPEED = 400;
const ARRIVAL_DISTANCE = 5;

export class HeroController {
  private tickerBinding: (() => void) | null = null;

  constructor(
    private view: HeroView,
    private app: Application,
  ) {
    console.log('HeroController created', view);
  }

  move(position: { x: number; y: number }) {
    console.log('moveHero', position);
  }

  moveTo(target: { x: number; y: number }, callback: () => void) {
    if (this.tickerBinding) {
      this.app.ticker.remove(this.tickerBinding);
      this.tickerBinding = null;
    }
    const tick = () => {
      const current = this.view.getCenterGlobal();
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= ARRIVAL_DISTANCE) {
        this.view.setCenterGlobal(target.x, target.y);
        this.app.ticker.remove(this.tickerBinding!);
        this.tickerBinding = null;
        console.log('callback', callback);
        callback();
        return;
      }
      const move = (HERO_SPEED * (this.app.ticker.deltaMS / 1000)) / dist;
      const nx = current.x + dx * Math.min(1, move);
      const ny = current.y + dy * Math.min(1, move);
      this.view.setCenterGlobal(nx, ny);
    };
    this.tickerBinding = tick;
    this.app.ticker.add(tick);
  }
}
