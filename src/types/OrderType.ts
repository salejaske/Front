import CartType from "./CartType";

export default interface OrderType{
    orderId: number;
    status: string;
    cart: CartType;

}