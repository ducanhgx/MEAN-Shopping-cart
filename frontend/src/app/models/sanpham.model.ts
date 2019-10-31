export class Product {
  _id?: String;
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
