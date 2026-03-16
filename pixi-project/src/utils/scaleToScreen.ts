import { Container } from 'pixi.js';

type FitMode = 'contain' | 'cover';

export function scaleToScreen(
  element: Container,
  screenWidth: number,
  screenHeight: number,
  mode: FitMode = 'contain',
  center: boolean = false,
  paddingX: number = 0,
  paddingY: number = 0,
  scaleIndex: number = 1
) {
  const bounds = element.getLocalBounds();
  const elementRatio = bounds.width / bounds.height;
  const screenRatio = screenWidth / screenHeight;

  let scale = 1;
  if (mode === 'contain') {
    // Вписать в экран
    scale = screenRatio > elementRatio ? screenHeight / bounds.height : screenWidth / bounds.width;
  } else if (mode === 'cover') {
    // Заполнить экран (возможно обрезание)
    scale = screenRatio < elementRatio ? screenHeight / bounds.height : screenWidth / bounds.width;
  }
  element.scale.set(scale * scaleIndex);

  if (center) {
    // Центрируем элемент по экрану
    element.x = (screenWidth - bounds.width * scale) / 2 - bounds.x * scale + paddingX;
    element.y = (screenHeight - bounds.height * scale) / 2 - bounds.y * scale + paddingY;
    // console.log('element.x', element.x);
    // console.log('element.y', element.y);
  }
}
