// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Registry,
  Response,
  Server,
} from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import { AnyFactories } from 'miragejs/-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer(): Server<Registry<any, AnyFactories>> {
  const server = createServer({
    serializers: {
      // To work with relations
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend<Partial<User>>({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        created_at() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(serverSeed) {
      serverSeed.createList('user', 200);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function create(schema, request): Response {
        const { page = 1, perPage = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(perPage);
        const pageEnd = pageStart + Number(perPage);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.post('/users');
      this.get('/users/:id');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
