import { Graphics } from 'pixi.js';
import {
  animal1Config,
  animal2Config,
  AnimalsConfig,
  type AnimalConfig,
} from './config';
import { BaseView } from '../../core/BaseView';
import { detectAspectRatio } from '../../utils/screen';
import Animal from './animal';

const SPAWN_INTERVAL_MS = 3000;
const SPAWN_MARGIN = 80;

const PRESET_CONFIGS: AnimalConfig[] = [animal1Config, animal2Config];

export class AnimalsView extends BaseView {
  private animal1: Animal;
  private animal2: Animal;
  private hero: Graphics;
  private animals: Animal[] = [];
  private screenWidth = window.innerWidth;
  private screenHeight = window.innerHeight;
  private spawnIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    super(AnimalsConfig);
    this.animal1 = new Animal(
      animal1Config.name,
      animal1Config.color,
      animal1Config.size,
      animal1Config.speed,
      animal1Config.pos,
    );
    this.addChild(this.animal1);
    this.animals.push(this.animal1);
    this.animal2 = new Animal(
      animal2Config.name,
      animal2Config.color,
      animal2Config.size,
      animal2Config.speed,
      animal2Config.pos,
    );
    this.addChild(this.animal2);
    this.animals.push(this.animal2);
    this.hero = new Graphics();
    this.spawnIntervalId = setInterval(
      () => this.spawnAnimal(),
      SPAWN_INTERVAL_MS,
    );
  }

  getAnimals(): Animal[] {
    return this.animals;
  }

  private spawnAnimal() {
    const config =
      PRESET_CONFIGS[Math.floor(Math.random() * PRESET_CONFIGS.length)];
    const x =
      SPAWN_MARGIN + Math.random() * (this.screenWidth - 2 * SPAWN_MARGIN);
    const y =
      SPAWN_MARGIN + Math.random() * (this.screenHeight - 2 * SPAWN_MARGIN);
    const animal = new Animal(
      config.name,
      config.color,
      config.size,
      config.speed,
      { x, y },
    );
    this.addChild(animal);
    this.animals.push(animal);
  }

  onResize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
    const { ratio, orientation } = detectAspectRatio(width, height);
    console.log('onResizeAnimalsView', width, height, ratio, orientation);
  }
}
