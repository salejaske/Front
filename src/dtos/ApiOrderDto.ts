import CartType from "../types/CartType";

export default interface ApiOrderDto{
    orderId: number;
    cartId: number;
    status: "prihvacena" | "odbijena" | "na cekanju";
    cart: CartType;
}