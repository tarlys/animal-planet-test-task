import { AnimalsView } from './View';
import { AnimalsController } from './Controller';

export class AnimalsContainer {
  public view: AnimalsView;
  public controller: AnimalsController;
  constructor() {
    const view = new AnimalsView();
    this.controller = new AnimalsController(view);
    this.view = view;
  }
}
