export function calculatePercentages(up: number, down: number) {
  const total = up + down;

  if (total === 0) {
    return {
      upPercentage: 0,
      downPercentage: 0,
    };
  }

  const upPercentage = Math.round((up / total) * 100);
  const downPercentage = Math.round((down / total) * 100);

  return {
    upPercentage,
    downPercentage,
  };
}
