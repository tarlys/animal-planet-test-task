export class CounterModel {
  private counter = 0;

  getCounter() {
    return this.counter;
  }

  incrementCounter() {
    this.counter++;
  }
}
