import { LoginRequestBody } from '../api';

test('LoginRequestBody has email and password', () => {
  const body: LoginRequestBody = { email: 'a', password: 'b' };
  expect(body).toHaveProperty('email');
  expect(body).toHaveProperty('password');
});
