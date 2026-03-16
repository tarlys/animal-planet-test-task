import { HeroView } from './View';
import { HeroController } from './Controller';
import { Application } from 'pixi.js';

export class HeroContainer {
  public view: HeroView;
  public controller: HeroController;
  constructor(app: Application) {
    const view = new HeroView();
    this.controller = new HeroController(view, app);
    this.view = view;
  }
}
