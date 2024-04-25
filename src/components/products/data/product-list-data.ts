export type Product = {
  id: string | number;
  image: string;
  name: string;
  price: number;
  status: "Available" | "Out of stock";
  unitsSold: number;
  views: number;
  earnings: number | null;
}


const products: Product[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    name: "Ravioli",
    price: 23,
    status: "Available",
    unitsSold: 3000,
    views: 1000,
    earnings: null
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    name: "Spaghetti Carbonara",
    price: 18,
    status: "Out of stock",
    unitsSold: 2500,
    views: 1200,
    earnings: null
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    name: "Margherita Pizza",
    price: 15,
    status: "Available",
    unitsSold: 4000,
    views: 1500,
    earnings: null
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    name: "Chicken Alfredo",
    price: 20,
    status: "Available",
    unitsSold: 2800,
    views: 1100,
    earnings: null
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    name: "Caesar Salad",
    price: 12,
    status: "Out of stock",
    unitsSold: 2000,
    views: 800,
    earnings: null
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    name: "Tacos",
    price: 14,
    status: "Available",
    unitsSold: 3500,
    views: 1300,
    earnings: null
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    name: "Sushi",
    price: 25,
    status: "Available",
    unitsSold: 2200,
    views: 900,
    earnings: null
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    name: "Burger",
    price: 16,
    status: "Available",
    unitsSold: 3200,
    views: 1400,
    earnings: null
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    name: "Pad Thai",
    price: 17,
    status: "Out of stock",
    unitsSold: 2700,
    views: 1050,
    earnings: null
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    name: "Fried Rice",
    price: 13,
    status: "Available",
    unitsSold: 1800,
    views: 700,
    earnings: null
  },
  {
    id: 11,
    image: "https://via.placeholder.com/150",
    name: "Lasagna",
    price: 21,
    status: "Available",
    unitsSold: 2300,
    views: 950,
    earnings: null
  },
  {
    id: 12,
    image: "https://via.placeholder.com/150",
    name: "Mushroom Risotto",
    price: 19,
    status: "Available",
    unitsSold: 3100,
    views: 1250,
    earnings: null
  },
  {
    id: 13,
    image: "https://via.placeholder.com/150",
    name: "Fettuccine Alfredo",
    price: 22,
    status: "Available",
    unitsSold: 2600,
    views: 1000,
    earnings: null
  },
  {
    id: 14,
    image: "https://via.placeholder.com/150",
    name: "Pancakes",
    price: 10,
    status: "Available",
    unitsSold: 1900,
    views: 750,
    earnings: null
  },
  {
    id: 15,
    image: "https://via.placeholder.com/150",
    name: "Chicken Curry",
    price: 16,
    status: "Available",
    unitsSold: 2400,
    views: 975,
    earnings: null
  },
  {
    id: 16,
    image: "https://via.placeholder.com/150",
    name: "Beef Stir Fry",
    price: 18,
    status: "Available",
    unitsSold: 3800,
    views: 1100,
    earnings: null
  },
  {
    id: 17,
    image: "https://via.placeholder.com/150",
    name: "Eggplant Parmesan",
    price: 20,
    status: "Out of stock",
    unitsSold: 2600,
    views: 1050,
    earnings: null
  },
  {
    id: 18,
    image: "https://via.placeholder.com/150",
    name: "Fish Tacos",
    price: 15,
    status: "Available",
    unitsSold: 2100,
    views: 850,
    earnings: null
  },
  {
    id: 19,
    image: "https://via.placeholder.com/150",
    name: "Steak",
    price: 28,
    status: "Available",
    unitsSold: 3300,
    views: 1350,
    earnings: null
  },
  {
    id: 20,
    image: "https://via.placeholder.com/150",
    name: "Pasta Primavera",
    price: 17,
    status: "Available",
    unitsSold: 2900,
    views: 1150,
    earnings: null
  }
]

products.forEach(product => {
    product.earnings = product.price * product.unitsSold;
  });

export default products;


// export const calcEarning = (price: number, unitsSold: number) =>{
//   // products.forEach(product => {
//   //   product.earnings = product.price * product.unitsSold;
//   // });
//   return price * unitsSold;
// }