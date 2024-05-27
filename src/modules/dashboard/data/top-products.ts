export type TopProducts = {
  rank: number;
  name: string;
  unitsSold: number;
  image: string;
  rating: number;
};

export const topProducts: TopProducts[] = [
  {
    rank: 1,
    name: "Samsung Galaxy S23 Ultra",
    unitsSold: 3000,
    image:
      "https://images.unsplash.com/photo-1676115724686-476a7337dfb6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNhbXN1bmclMjBHYWxheHklMjBTMjMlMjBVbHRyYSUyMHBob25lfGVufDB8fDB8fHww",
    rating: 5,
  },
  {
    rank: 2,
    name: "iPhone 14 Pro Max",
    unitsSold: 2970,
    image:
      "https://images.unsplash.com/photo-1697898706719-bce6e007c817?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aXBob25lJTIwMTQlMjBwcm8lMjBtYXh8ZW58MHx8MHx8fDA%3D",
    rating: 5,
  },
  {
    rank: 3,
    name: "iPhone 14 Pro ",
    unitsSold: 2230,
    image:
      "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlwaG9uZSUyMDE0JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww",
    rating: 4.7,
  },
  {
    rank: 4,
    name: "Samsung Galaxy S21 Ultra",
    unitsSold: 1900,
    image:
      "https://images.unsplash.com/photo-1615265744588-6710f263447b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNhbXN1bmclMjBHYWxheHklMjBTMjElMjBVbHRyYSUyMHBob25lfGVufDB8fDB8fHww",
    rating: 4.4,
  },
  {
    rank: 4,
    name: "iPhone 11 Pro Max ",
    unitsSold: 1560,
    image:
      "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aVBob25lJTIwMTElMjBQcm8lMjBNYXh8ZW58MHx8MHx8fDA%3D",
    rating: 4.1,
  },
];
