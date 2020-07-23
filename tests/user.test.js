const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Dmytro',
            email: 'dmytro@example.com',
            password: 'MyPass123!',
        })
        .expect(201);
});

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);
});

test('Should not login unexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: '222@example.com',
            password: '123456',
        })
        .expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for not authenticated user', async () => {
    await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not delete account for not authenticated user', async () => {
    await request(app).delete('/users/me').send().expect(401);
});

test('Database should be changed correctly', async () => {
    const response = await request(app).post('/users').send({
        name: 'Dmytro',
        email: 'dmytro@example.com',
        password: 'MyPass123!',
    });
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    //expect(response.body.user.name).toBe('Dmytro');
    expect(response.body).toMatchObject({
        user: {
            name: 'Dmytro',
            email: 'dmytro@example.com',
        },
        token: user.tokens[0].token,
    });
    expect(user.password).not.toBe('MyPass123!');
});

test('Database should save new token correctly', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    });
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Database should not contain deleted user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send();
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should upload image for avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile_avatar.jpg')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Bob',
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Bob');
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            experience: 'middle',
        })
        .expect(400);
});
