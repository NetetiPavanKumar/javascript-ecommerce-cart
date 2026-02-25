import { product_data } from "./products.js";

export let deliveryOptions=[
  {
    id:1,
    deliveryDays:7,
    priceCents:0

  },
  {
    id:2,
    deliveryDays:4,
    priceCents:10
  },
  {
    id:3,
    deliveryDays:1,
    priceCents:50
  }
];


export class Cart{

    constructor(localStorageKey){
        this.localStorageKey=localStorageKey
        this.cart=JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    addToCart(pid){
    let ismatch=false;
        this.cart.forEach((item)=>{
            if(item.id===pid){
                item.quantity+=1;
                ismatch=true;
            }
        })
        if(!ismatch){
            product_data.forEach((product)=>{
                if(pid===product.id){
                    product["quantity"]=1;
                    product["delid"]=1;
                    this.cart.push(product)
                }
            })
        }
    }


    countQuantity(){
        let quant=document.querySelector('.js-quantity1');
        let quantityTotal=0;
        this.cart.forEach((item1)=>{
            quantityTotal+=item1.quantity;
        })
        if(quant){
        quant.innerHTML=quantityTotal;
        }
        //localStorage.setItem('quantityTotal',JSON.stringify(quantityTotal));
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cart));
    }


    updateDeliveryOptionID(proId,deliveryOptionID){
        this.cart.forEach((cartItem)=>{
            if(cartItem.id===proId){
                cartItem.delid=Number(deliveryOptionID);
            }
        })
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cart));
    }
}

