export interface IPollBox {
  total: number;
  up: number;
  down: number;
  pollResult: 'up' | 'down' | null;
}
