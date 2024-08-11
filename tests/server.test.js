const request = require("supertest");
const server = require("../index");

const id = Math.floor(Math.random() * 99999)
const coffe = { id, nombre: "test coffe" }

describe("Operaciones CRUD de cafes", () => {
    test("REQ1 [GET /cafes] | Debería retornar un statuscode 200 y un array con al menos 1 elemento", async () => {
        const response = await request(server).get("/cafes").send()
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    })

    test("REQ2 [DELETE /cafes/:id] | Debería retornar un error 404 cuando el id no existe", async () => {
        const response = await request(server).delete("/cafes/fake_coffe").set("Authorization", "Bearer fake_token").send()
        expect(response.status).toBe(404)
    })

    test("REQ3 [POST /cafes] | Debería retornar un 201 cuando se crea un nuevo café", async () => {
        const response = await request(server).post("/cafes").send(coffe)
        expect(response.status).toBe(201)
        expect(response.body).toContainEqual(coffe) 
    })

    test("REQ4 [PUT /cafes/:id] | Debería retornar un statuscode 400 al intentar actualizar un café dónde el params id no corresponde al payload id", async () => {
        const response = await request(server).put("/cafes/fake_coffe_id").send(coffe)
        expect(response.status).toBe(400)
    })
});
