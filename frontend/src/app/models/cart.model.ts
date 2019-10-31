export class Cart {
  item: Item;
  qty: Number = 0;
  price : Number =0;
}
interface  Item {
  _id?: String ;
  tensp: String;
  motatomtatsp: String;
  motachitietsp: String;
  soluongton: Number;
  giaspchuagiam: Number;
  giaspdagiam: Number;
  hinhanhsp: Array<Image>;
  tendm:String;
}
interface Image {
  _id?: string;
  path: String;
  status: Boolean;
}