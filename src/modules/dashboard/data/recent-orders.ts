

export type Order = {
  id: string | number;
  customer: string;
  customerImage: string;
  product: string;
  productImage: string;
  time: string;
  quantity: number;
  price: number;
  status: "Pending payment" | "Payment successful" | "Product delivered";
};

export const orders: Order[] = [
  {
    id: 1,
    customerImage: "",
    productImage:
      "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aVBob25lJTIwMTElMjBQcm8lMjBNYXh8ZW58MHx8MHx8fDA%3D",
    product: "iPhone 11 Pro Max",
    time: "01/12/2023, 12:33",
    quantity: 1,
    price: 899,
    customer: "Aubrey Williams",
    status: "Product delivered",
  },
  {
    id: 2,
    customerImage: "",
    productImage:
      "https://images.unsplash.com/photo-1615265744588-6710f263447b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNhbXN1bmclMjBHYWxheHklMjBTMjElMjBVbHRyYSUyMHBob25lfGVufDB8fDB8fHww",
    product: "Samsung Galaxy S21 Ultra",
    time: "02/12/2023, 10:16",
    quantity: 2,
    price: 860,
    customer: "Daniel Jones",
    status: "Payment successful",
  },
  {
    id: 3,
    customerImage: "",
    productImage:
      "https://images.unsplash.com/photo-1676115724686-476a7337dfb6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNhbXN1bmclMjBHYWxheHklMjBTMjMlMjBVbHRyYSUyMHBob25lfGVufDB8fDB8fHww",
    product: "Samsung Galaxy S23 Ultra",
    time: "02/12/2023, 13:23",
    quantity: 4,
    price: 999,
    customer: "Sergio Fernandez",
    status: "Payment successful",
  },
  {
    id: 4,
    customerImage: "",
    productImage:
      "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlwaG9uZSUyMDE0JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww",
    product: "iPhone 14 Pro",
    time: "02/12/2023, 21:23",
    quantity: 1,
    price: 1199,
    customer: "Jacques Smith",
    status: "Pending payment",
  },
  {
    id: 5,
    customerImage: "",
    productImage:
      "https://images.unsplash.com/photo-1697898706719-bce6e007c817?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aXBob25lJTIwMTQlMjBwcm8lMjBtYXh8ZW58MHx8MHx8fDA%3D",
    product: "iPhone 14 Pro Max",
    time: "04/12/2023, 21:23",
    quantity: 2,
    price: 1299,
    customer: "Rosa Park",
    status: "Payment successful",
  },
];
