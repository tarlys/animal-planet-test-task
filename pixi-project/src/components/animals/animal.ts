import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Text,
  type Application,
} from 'pixi.js';

const ANIMAL_SPEED = 300;
const ANIMAL_ARRIVAL_DISTANCE = 5;

export default class Animal extends Container {
  public name: string;
  public color: string;
  public size: number;
  public speed: number;
  public pos: { x: number; y: number };
  public animal: Graphics;
  private nameLabel!: Text;
  public activated: boolean;
  public colorStroke: string;
  private tickerBinding: (() => void) | null = null;
  constructor(
    name: string,
    color: string,
    size: number,
    speed: number,
    pos: { x: number; y: number },
  ) {
    super();
    this.name = name;
    this.color = color;
    this.size = size;
    this.speed = speed;
    this.pos = pos;
    this.activated = false;
    this.animal = new Graphics();
    this.colorStroke = 'black';
    this.eventMode = 'static';
    this.on('pointerdown', this.onClick, this);
    this.draw();
  }
  onClick(event: FederatedPointerEvent) {
    console.log('onClickAnimals', event);
  }

  public draw() {
    this.animal
      .circle(0, 0, this.size)
      .fill({ color: this.color })
      .stroke({ color: this.colorStroke, width: 10 });
    this.nameLabel = new Text({ text: this.name });
    this.nameLabel.anchor.set(0.5);
    this.nameLabel.position.set(0, 0);
    this.addChild(this.animal);
    this.addChild(this.nameLabel);
    this.position.set(this.pos.x, this.pos.y);
  }

  public setStrokeColor(color: string) {
    this.colorStroke = color;
    this.animal.clear();
    this.animal
      .circle(0, 0, this.size)
      .fill({ color: this.color })
      .stroke({ color: this.colorStroke, width: 10 });
  }

  public activate() {
    this.activated = true;
  }

  public deactivate() {
    this.activated = false;
  }

  /**
   * Плавное движение к целевой точке (глобальные координаты) через ticker, как у hero.
   * Круг нарисован в (0,0), двигается контейнер — в тике только обновляем position.
   */
  public moveTo(
    targetGlobal: { x: number; y: number },
    app: Application,
    callback?: () => void,
  ) {
    if (this.tickerBinding) {
      app.ticker.remove(this.tickerBinding);
      this.tickerBinding = null;
    }
    const tick = () => {
      const current = this.getGlobalPosition();
      const dx = targetGlobal.x - current.x;
      const dy = targetGlobal.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= ANIMAL_ARRIVAL_DISTANCE) {
        const local = this.parent!.toLocal(targetGlobal);
        this.position.set(local.x, local.y);
        this.pos.x = local.x;
        this.pos.y = local.y;
        app.ticker.remove(this.tickerBinding!);
        this.tickerBinding = null;
        callback?.();
        return;
      }
      const move = (ANIMAL_SPEED * (app.ticker.deltaMS / 1000)) / dist;
      const nx = current.x + dx * Math.min(1, move);
      const ny = current.y + dy * Math.min(1, move);
      const local = this.parent!.toLocal({ x: nx, y: ny });
      this.position.set(local.x, local.y);
      this.pos.x = local.x;
      this.pos.y = local.y;
    };
    this.tickerBinding = tick;
    app.ticker.add(tick);
  }

  destroy() {
    this.parent?.removeChild(this);
  }
}
