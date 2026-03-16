import { CounterModel } from './Model';
import { CounterView } from './View';

export class CounterController {
  constructor(
    private view: CounterView,
    private model: CounterModel,
    // eslint-disable-next-line prettier/prettier
  ) { }

  incrementCounter() {
    this.model.incrementCounter();
    this.view.updateCounter(this.model.getCounter());
  }
}
