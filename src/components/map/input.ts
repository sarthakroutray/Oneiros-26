export interface MovementKeys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  shift: boolean;
}

export const createMovementKeys = (): MovementKeys => ({
  w: false,
  a: false,
  s: false,
  d: false,
  shift: false,
});

export const updateMovementKey = (
  keys: MovementKeys,
  key: string,
  isDown: boolean,
) => {
  const k = key.toLowerCase();
  if (k === 'w' || key === 'arrowup') keys.w = isDown;
  if (k === 'a' || key === 'arrowleft') keys.a = isDown;
  if (k === 's' || key === 'arrowdown') keys.s = isDown;
  if (k === 'd' || key === 'arrowright') keys.d = isDown;
  if (k === 'shift') keys.shift = isDown;
};
