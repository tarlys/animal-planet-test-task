import { FieldView } from './View';
import { FieldController } from './Controller';

export class FieldContainer {
  public view: FieldView;

  constructor() {
    const view = new FieldView();
    new FieldController(view);
    this.view = view;
  }
}
