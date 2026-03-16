export const AnimalsConfig = {
  position: { x: 0, y: 0 },
  scale: { x: 1, y: 1 },

  resize: {},
};

export interface AnimalConfig {
  name: string;
  color: string;
  size: number;
  speed: number;
  pos: { x: number; y: number };
}

export const animal1Config: AnimalConfig = {
  name: 'Lion',
  color: 'white',
  size: 100,
  speed: 10,
  pos: { x: 100, y: 100 },
};

export const animal2Config: AnimalConfig = {
  name: 'Tiger',
  color: 'white',
  size: 100,
  speed: 10,
  pos: { x: 200, y: 100 },
};
