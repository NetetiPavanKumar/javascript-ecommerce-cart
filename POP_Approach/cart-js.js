import { product_data } from "./products.js";

export let cart=JSON.parse(localStorage.getItem('cart')) || [];

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


export function addToCart(pid){
    let ismatch=false;
        cart.forEach((item)=>{
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
                    cart.push(product)
                }
            })
        }
}


export function countQuantity(){
let quant=document.querySelector('.js-quantity1');
let quantityTotal=0;
if(quant){
    cart.forEach((item1)=>{
    quantityTotal+=item1.quantity;
})
quant.innerHTML=quantityTotal;
}
//localStorage.setItem('quantityTotal',JSON.stringify(quantityTotal));
localStorage.setItem('cart',JSON.stringify(cart));
}


export function updateDeliveryOptionID(proId,deliveryOptionID){
  cart.forEach((cartItem)=>{
    if(cartItem.id===proId){
      cartItem.delid=Number(deliveryOptionID);
    }
  })
  localStorage.setItem('cart',JSON.stringify(cart));
}



