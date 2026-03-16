import { Application } from 'pixi.js';
import { HeroContainer } from './components/hero';
import { FieldContainer } from './components/field';
import { AnimalsContainer } from './components/animals';
import { CounterContainer } from './components/counter';
import MoveManager from './components/moveManager/moveManager';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: 'green', resizeTo: window });

  const heroContainer = new HeroContainer(app);
  const animalsContainer = new AnimalsContainer();
  const fieldContainer = new FieldContainer();
  const counterContainer = new CounterContainer();
  const moveManager = new MoveManager(
    heroContainer,
    animalsContainer,
    app,
    counterContainer,
  );

  // MoveManager первым — полноэкранный hitArea, ловит клики по пустому месту
  app.stage.addChild(moveManager);
  app.stage.addChild(heroContainer.view);
  app.stage.addChild(animalsContainer.view);
  app.stage.addChild(fieldContainer.view);
  app.stage.addChild(counterContainer.view);

  heroContainer.view.onResize(window.innerWidth, window.innerHeight);
  animalsContainer.view.onResize(window.innerWidth, window.innerHeight);
  fieldContainer.view.onResize(window.innerWidth, window.innerHeight);
  moveManager.onResize(window.innerWidth, window.innerHeight);
  counterContainer.view.onResize(window.innerWidth, window.innerHeight);

  app.renderer.on('resize', () => {
    heroContainer.view.onResize(window.innerWidth, window.innerHeight);
    fieldContainer.view.onResize(window.innerWidth, window.innerHeight);
    animalsContainer.view.onResize(window.innerWidth, window.innerHeight);
    moveManager.onResize(window.innerWidth, window.innerHeight);
    counterContainer.view.onResize(window.innerWidth, window.innerHeight);
  });

  // Append the application canvas to the document body
  document.getElementById('pixi-container')!.appendChild(app.canvas);
})();
