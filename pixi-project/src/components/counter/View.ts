import { Text } from 'pixi.js';
import { CounterConfig } from './config';
import { BaseView } from '../../core/BaseView';

export class CounterView extends BaseView {
  private counter: Text;
  constructor() {
    super(CounterConfig);
    this.counter = new Text({
      text: '0',
      style: { fontSize: 38, fontWeight: 'bold' },
    });
    this.counter.anchor.set(0.5);

    this.addChild(this.counter);
  }

  updateCounter(counter: number) {
    this.counter.text = counter.toString();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(width: number, height: number) {
    this.position.set(width / 2, this.counter.height + CounterConfig.padding);
  }
}
