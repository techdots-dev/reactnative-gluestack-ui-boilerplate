import { config } from '../config';

test('config has light theme', () => {
  expect(config.light).toBeDefined();
});
