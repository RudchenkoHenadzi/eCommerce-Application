import type { RouteParams } from 'vue-router';

export function getProductIdFromParams(params: RouteParams): string {
  return typeof params.id === 'string' ? params.id : '';
}
