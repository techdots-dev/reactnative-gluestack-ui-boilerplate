import { apiRequest } from '../client';

test('apiRequest returns mock data', async () => {
  const res = await apiRequest<{ token: string }>({
    url: '/users/tokens',
    method: 'POST',
    data: { auth: { email: 'test@example.com', password: '123456' } },
  });
  expect(res.token).toBe('mock-token-123');
});
