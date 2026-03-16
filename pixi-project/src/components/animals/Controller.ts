import { AnimalsView } from './View';

export class AnimalsController {
  constructor(private view: AnimalsView) {
    console.log('AnimalsController created', view);
  }

  move(position: { x: number; y: number }) {
    console.log('moveAnimals', position);
  }
}
