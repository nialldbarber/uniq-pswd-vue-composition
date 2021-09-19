export function handleBackgroundChange(range: number): string {
  let background: string = '';

  if (range <= 6) {
    background = 'bad';
  }
  if (range >= 7) {
    background = 'medium';
  }
  if (range >= 12) {
    background = 'good';
  }
  if (range >= 25) {
    background = 'mega';
  }

  return background;
}
