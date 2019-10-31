export class Order {
  id?: String;
  name: String;
  phone: String;
  email: String;
  address: String;
  note: String;
  order: Array<Cart>;
  totalprice: Number;
}
interface Cart {
  item: Item;
  qty: Number;
  price: Number;
}
interface Item {
  _id?: String;
  tensp: String;
  motatomtatsp: String;
  motachitietsp: String;
  soluongton: Number;
  giaspchuagiam: Number;
  giaspdagiam: Number;
  hinhanhsp: Array<Image>;
  tendm: String;
}
interface Image {
  _id?: string;
  path: String;
  status: Boolean;
}