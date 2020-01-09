const request = require('supertest'); 
const server = require('./server.js');

describe('Testing server route', () => {

    describe("Test Register", () => {

        it('Return ok status 200', async() => {
            const res = await request(server)
                .post("/api/auth/register")
                .send({
                    username: Date.now(),
                    password: "1337"
                });
            expect(res.status).toBe(201);
        });

        it("Register information missing error", async() => {
            const res = await request(server).post("/api/auth/register");
            expect(res.status).toBe(500);
        });

        it("Login info missing error", async() => {
            const res = await request(server).post("/api/auth/login");
            expect(res.status).toBe(500);
        });
    });
});