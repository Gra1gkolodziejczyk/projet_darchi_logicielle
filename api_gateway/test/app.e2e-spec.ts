import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // tester la création d'un compte
  it('should register a user successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register') // Endpoint d'inscription.
      .send({
        email: 'test@example.com',
        hash: 'Password123!',
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
      });

    expect(response.status).toBe(201); // Code HTTP attendu pour une création réussie.
    expect(response.body).toBeDefined(); // Vérifiez que le corps de la réponse n'est pas vide.
    expect(response.body).toHaveProperty('access_token'); // Vérifiez que le token est renvoyé.
  });

  it('should login a user successfully', async () => {
    // Assurez-vous que l'utilisateur existe en base.
    await request(app.getHttpServer()).post('/auth/login').send({
      email: 'test@example.com',
      hash: 'Password123!',
    });

    // Testez la connexion.
    const response = await request(app.getHttpServer())
      .post('/auth/login') // Endpoint de connexion.
      .send({
        email: 'test@example.com',
        hash: 'Password123!', // Le mot de passe doit correspondre.
      });

    expect(response.status).toBe(201); // Code HTTP attendu pour une connexion réussie.
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('access_token'); // Vérifiez que le token est renvoyé.
  });
});

describe('CarController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let carId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Authenticate to get token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', hash: 'Password123!' });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/car/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/car/create')
      .set('Authorization', `Bearer ${authToken}`) // Ensure the token is prefixed with "Bearer "
      .send({
        image:
          'https://blog.vodiff.fr/wp-content/uploads/2022/09/BMW_M38_G80_VODIFF_1.jpg',
        brand: 'Toyota',
        model: 'Corolla',
        color: 'blue',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    carId = response.body.id;
  });

  it('/car (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/car')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/car/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/car/' + carId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('/car/update/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/car/update/' + carId)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        image:
          'https://blog.vodiff.fr/wp-content/uploads/2022/09/BMW_M38_G80_VODIFF_1.jpg',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
      });

    expect(response.status).toBe(200);
    expect(response.ok).toEqual(true);
  });

  it('/car/delete/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/car/delete/' + carId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.ok).toEqual(true);
  });
});

describe('RaceController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let raceId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Authenticate to get token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', hash: 'Password123!' });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/race/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/race/create')
      .set('Authorization', `Bearer ${authToken}`) // Ensure the token is prefixed with "Bearer "
      .send({ name: 'Race test', date: '2026-01-01', location: 'France' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    raceId = response.body.id;
  });

  it('/race (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/race')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/race/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/race/' + raceId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('/race/update/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/race/update/' + raceId)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Race tests modif',
        date: '2026-02-02',
        location: 'Espagne',
      });

    expect(response.status).toBe(200);
    expect(response.ok).toEqual(true);
  });

  it('/race/delete/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/race/delete/' + raceId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.ok).toEqual(true);
  });
});
