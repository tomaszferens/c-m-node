import request from "supertest";
import { describe, expect, test } from "vitest";

import { app } from "../src/app";

describe("products", () => {
  test("[GET] /api/products - lists products with all necessary data", async () => {
    const response = await request(app).get("/api/products").expect(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          stock: expect.any(Number),
          price: expect.any(Number),
        },
      ]),
    );
  });

  test("[POST] /api/products - creates a new product", async () => {
    const product = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const response = await request(app)
      .post("/api/products")
      .send(product)
      .expect(201);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: "Test Product",
        description: "Test Description",
        stock: 10,
        price: 100,
      },
    ]);
  });

  test("[POST] /api/products - validates invalid request payload", async () => {
    const product = {
      name: "Test Product",
      description: "Test Description",
      stock: -1,
      price: -1,
    };

    const response = await request(app)
      .post("/api/products")
      .send(product)
      .expect(400);

    expect(response.body).toEqual([
      {
        type: "body",
        errors: {
          issues: [
            {
              code: "too_small",
              minimum: 0,
              type: "number",
              inclusive: false,
              exact: false,
              message: "Number must be greater than 0",
              path: ["price"],
            },
            {
              code: "too_small",
              minimum: 0,
              type: "number",
              inclusive: true,
              exact: false,
              message: "Number must be greater than or equal to 0",
              path: ["stock"],
            },
          ],
          name: "ZodError",
        },
      },
    ]);
  });

  test("[POST] /api/products/:productId/restock - adds stock to a product", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const createResponse = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(201);

    const productId = createResponse.body[0].id;

    const response = await request(app)
      .post(`/api/products/${productId}/restock`)
      .send({ quantity: 10 })
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: "Test Product",
        description: "Test Description",
        stock: 20,
        price: 100,
      },
    ]);
  });

  test("[POST] /api/products/:productId/sell - sells a product", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const createResponse = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(201);

    const productId = createResponse.body[0].id;

    const response = await request(app)
      .post(`/api/products/${productId}/sell`)
      .send({ quantity: 10 })
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: "Test Product",
        description: "Test Description",
        stock: 0,
        price: 100,
      },
    ]);
  });

  test("[POST] /api/products/:productId/sell - prevents from selling when out of stock", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const createResponse = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(201);

    const productId = createResponse.body[0].id;

    const response = await request(app)
      .post(`/api/products/${productId}/sell`)
      .send({ quantity: 50 })
      .expect(400);

    expect(response.body).toEqual({
      message: "Insufficient stock",
    });
  });

  test("[POST] /api/orders - places an order", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const createResponse = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(201);

    const productId = createResponse.body[0].id;

    const response = await request(app)
      .post(`/api/orders`)
      .send({ customerId: 1, products: [{ id: productId, quantity: 5 }] })
      .expect(201);

    expect(response.body).toEqual({
      order: {
        id: 3,
        customerId: 1,
        orderDate: expect.any(String),
      },
      orderItems: [
        {
          id: 4,
          orderId: 3,
          productId: productId,
          quantity: 5,
        },
      ],
    });
  });

  test("[POST] /api/orders - prevents from placing an order when out of stock", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      stock: 10,
      price: 100,
    };

    const createResponse = await request(app)
      .post("/api/products")
      .send(newProduct)
      .expect(201);

    const productId = createResponse.body[0].id;

    const response = await request(app)
      .post(`/api/orders`)
      .send({ customerId: 1, products: [{ id: productId, quantity: 25 }] })
      .expect(400);

    expect(response.body).toEqual({
      message: expect.stringContaining("Out of stock products"),
    });
  });
});
