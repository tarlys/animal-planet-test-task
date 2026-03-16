export type AspectRatioInfo = {
  ratio: string;
  orientation: 'landscape' | 'portrait';
};

export function detectAspectRatio(width: number, height: number): AspectRatioInfo {
  const knownRatios = [
    [1, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [16, 9],
    [18.5, 9],
    [19, 9],
    [21, 9],
    [32, 9],
  ];

  const inputRatio = width / height;
  let closestMatch = '';
  let smallestDiff = Infinity;
  let orientation: 'landscape' | 'portrait' = width > height ? 'landscape' : 'portrait';

  knownRatios.forEach(([w, h]) => {
    const ratio1 = w / h;
    const ratio2 = h / w;

    const diff1 = Math.abs(inputRatio - ratio1);
    const diff2 = Math.abs(inputRatio - ratio2);

    if (diff1 < smallestDiff) {
      smallestDiff = diff1;
      closestMatch = `${w}:${h}`;
      // orientation = 'landscape';
    }

    if (diff2 < smallestDiff) {
      smallestDiff = diff2;
      closestMatch = `${h}:${w}`;
      // orientation = 'portrait';
    }
  });

  return {
    ratio: closestMatch,
    orientation,
  };
}
