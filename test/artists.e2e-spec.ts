import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';

describe('Artists Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/artist/beyonce/test (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/artist/beyonce/test')
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeTruthy();
        fs.unlinkSync('./test.csv');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it('/artist/beyonce/test (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/artist')
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeFalsy();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
