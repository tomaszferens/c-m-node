export const data = {
  customers: [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
    },
  ],
  products: [
    {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop with 16GB RAM and 512GB SSD.",
      price: 1500,
      stock: 10,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with long battery life.",
      price: 25,
      stock: 50,
    },
  ],
  orders: [
    {
      id: 1,
      customerId: 1,
      date: "2024-09-21 12:34:56",
    },
    {
      id: 2,
      customerId: 2,
      date: "2024-09-20 14:22:35",
    },
  ],
  orderItems: [
    {
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
    },
    {
      id: 2,
      orderId: 1,
      productId: 2,
      quantity: 2,
    },
    {
      id: 3,
      orderId: 2,
      productId: 2,
      quantity: 1,
    },
  ],
};
