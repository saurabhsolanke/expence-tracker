export interface transactions {
    id: number;
    product_name: string;
    product_desc: string;
    product_price: string;
    product_quantity:string;
    payment_mode: string;
    createdAt: string;
    userid: string;

    // constructor(id: number,product_name: string,product_desc: string,product_price: string,product_quantity: string,payment_mode: string){
    //     this.id=id;
    //     this.product_name=product_name;
    //     this.product_desc=product_desc;
    //     this.product_price=product_price;
    //     this.product_quantity=product_quantity;
    //     this.payment_mode=payment_mode;
    // }
}
