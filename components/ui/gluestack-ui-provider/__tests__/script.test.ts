/** @jest-environment jsdom */
import { script } from '../script';

test('script applies class', () => {
  document.documentElement.className = '';
  script('light');
  expect(document.documentElement.classList.contains('light')).toBe(true);
});
