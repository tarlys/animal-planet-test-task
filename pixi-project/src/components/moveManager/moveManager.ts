import {
  FederatedPointerEvent,
  Application,
  Container,
  Rectangle,
} from 'pixi.js';
import { AnimalsContainer } from '../animals';
import { HeroContainer } from '../hero';
import Animal from '../animals/animal';
import { HeroView } from '../hero/View';
import { FieldView } from '../field/View';
import { CounterContainer } from '../counter';

function findAnimalParent(obj: Container | null): Animal | null {
  let node: Container | null = obj;
  while (node) {
    if (node instanceof Animal) return node;
    node = node.parent as Container | null;
  }
  return null;
}

function findFieldParent(obj: Container | null): FieldView | null {
  let node: Container | null = obj;
  while (node) {
    if (node instanceof FieldView) return node;
    node = node.parent as Container | null;
  }
  return null;
}

function normalize(x: number, y: number): { x: number; y: number } {
  const len = Math.sqrt(x * x + y * y);
  if (len <= 0) return { x: 0, y: 0 };
  return { x: x / len, y: y / len };
}

export default class MoveManager extends Container {
  private heroContainer: HeroContainer;
  private animalsContainer: AnimalsContainer;
  private app: Application;
  private counterContainer: CounterContainer;
  private animalsList: Animal[] = [];
  constructor(
    heroContainer: HeroContainer,
    animalsContainer: AnimalsContainer,
    app: Application,
    counterContainer: CounterContainer,
  ) {
    super();
    this.heroContainer = heroContainer;
    this.animalsContainer = animalsContainer;
    this.app = app;
    this.counterContainer = counterContainer;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.eventMode = 'static';
    this.hitArea = new Rectangle(0, 0, this.width, this.height);
    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = new Rectangle(0, 0, this.width, this.height);
    this.app.stage.on('pointerdown', this.onClick, this);
    this.animalsList = [];
  }

  public onClick(event: FederatedPointerEvent) {
    const gx = event.globalX;
    const gy = event.globalY;
    const animal = findAnimalParent(event.target);
    const field = findFieldParent(event.target);
    console.log('field', field);
    console.log('event.target', event.target);
    console.log('animal', animal);
    let targetX = gx;
    let targetY = gy;
    if (field) {
      console.log('animalsListOnFIdeLEDlLdLELDE', this.animalsList);

      const fieldCenter = field.toGlobal({
        x: field.position.x,
        y: field.position.y,
      });
      console.log('fieldCenter', fieldCenter);
      this.heroContainer.controller.moveTo({ x: targetX, y: targetY }, () => {
        console.log('animalsListOnFIdeLEDlLdLELDE', this.animalsList);
        this.animalsList.forEach((animal) => {
          animal.destroy();
          animal.deactivate();
          animal.removeAllListeners();
          this.counterContainer.controller.incrementCounter();
        });
        this.animalsList = [];
        console.log('animalsListOnFIdeLEDlLdLELDE', this.animalsList);
      });
      return;
    }
    if (animal) {
      const animalCenter = animal.getGlobalPosition();
      console.log('animalCenter', animalCenter);
      const heroCenter = this.heroContainer.view.getCenterGlobal();
      const dx = heroCenter.x - animalCenter.x;
      const dy = heroCenter.y - animalCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const gap = 15;
      const stopDistance = HeroView.heroRadius + animal.size + gap;
      if (dist > 0.001) {
        const dir = normalize(dx, dy);
        targetX = animalCenter.x + dir.x * stopDistance;
        targetY = animalCenter.y + dir.y * stopDistance;
      } else {
        targetX = animalCenter.x + stopDistance;
        targetY = animalCenter.y;
      }

      this.heroContainer.controller.moveTo({ x: targetX, y: targetY }, () => {
        if (this.animalsList.length === 5) return;
        animal?.setStrokeColor('red');
        animal?.activate();
        this.animalsList.push(animal);
      });

      return;
    }

    this.heroContainer.controller.moveTo({ x: targetX, y: targetY }, () => {
      this.animalsList.forEach((animal) => {
        animal.moveTo(
          { x: targetX - animal.size, y: targetY - animal.size },
          this.app,
        );
      });
    });
  }

  public moveHero() {
    this.heroContainer.controller.move({ x: 0, y: 0 });
  }

  public moveAnimals() {
    this.animalsContainer.controller.move({ x: 0, y: 0 });
  }

  public onResize(width: number, height: number) {
    this.width = width;
    this.height = height;
    (this.hitArea as Rectangle).width = width;
    (this.hitArea as Rectangle).height = height;
    this.app.stage.hitArea = new Rectangle(0, 0, width, height);
    console.log('onResizeMoveManager', this.width, this.height);
  }
}
