import { setupServer } from 'msw/node';
import { rest } from 'msw';

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map(config => {
    return rest[config.method || 'get'](config.path, (req, res, context) => {
      return res(context.json(config.res(req, res, context)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
