const request = require('supertest');
const app = require('../app'); // Sesuaikan dengan path ke aplikasi Anda

describe('POST /customer/register', () => {
    it('Success Case - Customer Register successfully', async () => {
        const response = await request(app)
            .post('/customer/register')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Customer registered successfully');
    });

    it('Error Case - Error Empty Email Field', async () => {
        const response = await request(app)
            .post('/customer/register')
            .send({
                email: '',
                password: 'password123'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Email field is required');
    });

    it('Error Case - Error Password is Null', async () => {
        const response = await request(app)
            .post('/customer/register')
            .send({
                email: 'test@example.com',
                password: null
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Password cannot be null');
    });

    it('Error Case - Error Email is Null', async () => {
        const response = await request(app)
            .post('/customer/register')
            .send({
                email: null,
                password: 'password123'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Email field is required');
    });

    it('Error Case - Invalid Email Format', async () => {
        const response = await request(app)
            .post('/customer/register')
            .send({
                email: 'invalid-email',
                password: 'password123'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid email format');
    });
});

describe('POST /customer/login', () => {
    it('Success Case - Customer Login Successfully', async () => {
        const response = await request(app)
            .post('/customer/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Customer logged in successfully');
    });

    it('Error Case - Invalid / Wrong Password', async () => {
        const response = await request(app)
            .post('/customer/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Invalid password');
    });

    it('Error Case - Invalid Email Format', async () => {
        const response = await request(app)
            .post('/customer/login')
            .send({
                email: 'invalid-email',
                password: 'password123'
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid email format');
    });
});
