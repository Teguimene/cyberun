import { rankWith, scopeEndsWith } from '@jsonforms/core';

export const countrySelectorControlTester = rankWith(
  3, // Priority
  scopeEndsWith('continents'),
);
