import { CounterView } from './View';
import { CounterController } from './Controller';
import { CounterModel } from './Model';

export class CounterContainer {
  public view: CounterView;
  public controller: CounterController;

  constructor() {
    const view = new CounterView();
    const model = new CounterModel();
    this.controller = new CounterController(view, model);
    this.view = view;
  }
}
