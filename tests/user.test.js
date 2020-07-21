const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Andrew',
    email: 'andrew@example.com',
    password: '123pass!',
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

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
