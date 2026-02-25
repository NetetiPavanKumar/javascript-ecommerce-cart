import {product_data} from "./products.js";
import {Cart} from "./cart-oop-js.js";

let htmlcode="";
let asd=document.querySelector('.js-products-grid');


let cart1=new Cart('cart-oop');
cart1.countQuantity();


product_data.forEach((Obj) => {
    htmlcode+=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${Obj.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${Obj.name}
          </div>
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${Obj.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${Obj.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(Obj.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-btn"
          data-product-id="${Obj.id}">
            Add to Cart
          </button>
        </div>`
});


if(asd){
asd.innerHTML+=htmlcode;
}


let adds=document.querySelectorAll('.js-add-btn');
adds.forEach((addObj,index)=>{
    //console.log(addObj,index);
    addObj.addEventListener('click',()=>{
        let pid=addObj.dataset.productId;
        cart1.addToCart(pid);
        cart1.countQuantity();
    })
})








