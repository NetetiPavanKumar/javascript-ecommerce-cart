import {cart,deliveryOptions,updateDeliveryOptionID} from "./cart-js.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let now=dayjs();
renderCart();
renderPaymentSummary();
export function renderCart(){
    let checkouthtml="";
    let sele;
    cart.forEach((item10,ind)=>{
      deliveryOptions.forEach(option12=>{
        if(item10.delid==option12.id){
          sele=option12;
        }
      })
      let today=dayjs();
      let delidate=today.add(sele.deliveryDays,'days')
      let datestring=delidate.format('dddd, MMMM D');
    checkouthtml+=`<div class="cart-item-container">
            <div class="delivery-date js-del-date">
            Delivery Date : ${datestring}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${item10.image}">
              <div class="cart-item-details">
                <div class="product-name">
                  ${item10.name}
                </div>
                <div class="product-price">
                  $${((item10.priceCents*item10.quantity)/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item10.quantity}</span>
                  </span>
                </div>
                <div>
                  <span class="update-quantity-link link-primary js-update-item">
                    +1
                  </span>
                  <span class="update-quantity-link link-primary js-remove-item">
                    -1
                  </span>
                </div>
                  <span class="delete-quantity-link link-primary js-del-item" data-delete-id="${item10.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options ">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryArea(item10)}
              </div>
            </div>
          </div>`
})


    let dll10=document.querySelector('.js-pavan-order');
    dll10.innerHTML=checkouthtml;

    addListeners();
}



function deliveryArea(item10){
  let now=dayjs();
  let deliveryhtml="";
  deliveryOptions.forEach((option,index)=>{
  let deldate=now.add(option.deliveryDays,'days');
  let cost="FREE";
  if(option.priceCents!=0){
    cost=`$${option.priceCents}`;
  }
  let ischecked=(option.id===item10.delid);
  deliveryhtml+=
  `<div class="delivery-option js-delivery-option" data-pro-id="${item10.id}" data-deli-id="${option.id}">
  <input type="radio" ${ischecked?'checked':''}
    class="delivery-option-input"
    name="delivery-option-${item10.id}">
  <div>
    <div class="delivery-option-date">
    ${deldate.format('dddd, MMMM D')}
    </div>
    <div class="delivery-option-price">
      ${cost} - Shipping
    </div> 
</div>
</div>`
  })
  return deliveryhtml;
}


export function renderPaymentSummary(){
let paymenthtml="";
let noof=0;
let totalCostCents=0;
let totalCost=0;
let shipHandle=0;
let taxTotal=0;
let orderTotal=0
cart.forEach(item=>{
  noof+=item.quantity;
  totalCostCents+=(item.priceCents*item.quantity);
  deliveryOptions.forEach(option=>{
    if(item.delid===option.id){
      // if(item.quantity<=0){
      //   removeItem();
      // }
      shipHandle+=option.priceCents;
    }
  })
})
totalCost=Number((totalCostCents/100).toFixed(2));
taxTotal=(totalCost+shipHandle)*0.1
orderTotal=(totalCost+shipHandle+taxTotal).toFixed(2);
paymenthtml=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${noof}):</div>
            <div class="payment-summary-money">$${totalCost}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shipHandle}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalCost+shipHandle).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxTotal.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
    document.querySelector('.js-pavan-payment').innerHTML=paymenthtml;
}




function removeItem(i){
    if(cart){
        cart.splice(i,1);
        localStorage.setItem('cart',JSON.stringify(cart));
        renderPaymentSummary();
    }
}



function addListeners(){
    addListenersForUpdate();
    addListenersForRemove();
    addListenerForDelete();
    addListenersForDeliveryOptions();
}



function addListenersForUpdate(){
    let dll9=document.querySelectorAll('.js-update-item');
    dll9.forEach((updateBtn,index)=>{
      updateBtn.addEventListener('click',()=>{
        cart.forEach((item7,ind)=>{
          if(index===ind){
            item7.quantity=item7.quantity+1;
            renderCart();
            renderPaymentSummary();
          }
        })
      })
    })
}


function addListenersForRemove(){
    let dll8=document.querySelectorAll('.js-remove-item');
        dll8.forEach((updateBtn,index)=>{
          updateBtn.addEventListener('click',()=>{
            cart.forEach((item7,ind)=>{
              if(index===ind){
                item7.quantity=item7.quantity-1;
                if(item7.quantity<=0){
                  removeItem(ind);
                }
                renderCart();
                renderPaymentSummary();
              }
            })
          })
        })
}



function addListenerForDelete(){
    let delbtns=document.querySelectorAll('.js-del-item');
    delbtns.forEach((delitem,ind)=>{
        delitem.addEventListener('click',()=>{
            removeItem(ind);
            renderCart();
    })
})
}


function addListenersForDeliveryOptions(){
    let dll11=document.querySelectorAll(`.js-delivery-option`)
        dll11.forEach((option11,ind)=>{
        option11.addEventListener('click',()=>{
          const {proId,deliId}=option11.dataset;
          updateDeliveryOptionID(proId,deliId);
          renderPaymentSummary();
          renderCart();
        })
        })
}