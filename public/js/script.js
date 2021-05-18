

/* CART Functions*/
function cartListen(data_list){

	let carts = document.querySelectorAll('.add-cart');

	
	//Event listner for Add to Cart button
		for(var i = 0; i<carts.length;i++){
			carts[i].addEventListener('click', event => {
				var id = event.target.getAttribute("class").substr(13,2)

				for(var j = 0; j < data_list.length; j++){
					data_list[j]['inCart'] = 0
					if(data_list[j]['item_id'].substr(1,3) == id){
						var product = data_list[j]

					}
				}
				cartNumbers(product);
				totalCost(product)


			})
		}


}


function onLoadCart(){
	let productNum = localStorage.getItem('cartNumbers');
	if(productNum){
		document.getElementById('lblCartCount').textContent = productNum;
		//document.querySelector('.lblCartCount span').textContent = productNum + 1;
	}

}

function cartNumbers(product){
	let productNum = localStorage.getItem('cartNumbers');
	productNum = parseInt(productNum)

	if(productNum){
		localStorage.setItem('cartNumbers', productNum + 1)
		document.getElementById('lblCartCount').textContent = productNum + 1;
		//document.querySelector('.lblCartCount span').textContent = productNum + 1;

	}else{
		localStorage.setItem('cartNumbers', 1)
		//localStorage.setItem(product[i]['item_id'], 1)
		document.getElementById('lblCartCount').textContent = 1;
		//document.querySelector('.lblCartCount span').textContent = 1;

	}
	//console.log(productNum)

	//localStorage.setItem('cartNumbers', 1);
	setItems(product);

}

function setItems(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems)



	// If product id exists in cart items, get the in cart value and transfer to the product 

	if(cartItems != null){

		if(cartItems[product['item_id']] == undefined){

			cartItems = {
				...cartItems,
				[product['item_id']]: product

			}


		}
		cartItems[product['item_id']]['inCart'] += 1;
	}else{
		product['inCart']= 1;
		cartItems = {
			[product['item_id']]: product
				
			}


	}

	localStorage.setItem("productsInCart", JSON.stringify(cartItems))
	


	

}


function totalCost(product){
	let cartCost= localStorage.getItem('totalCost');
	if(cartCost != null){
		cartCost = parseFloat(cartCost)
		cartCost.toFixed(2)
		localStorage.setItem("totalCost", (cartCost + product['price']).toFixed(2) )
	}else{
		localStorage.setItem("totalCost", product['price'].toFixed(2))
	}

}



function showCart(){
	var x = document.getElementById("cart");
	var overlay = document.getElementById('overlay');
	document.addEventListener('click', function(e){

 		if(e.target.id == 'overlay'){
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
        if(e.target === openButton){
         	popup.style.display = 'block';
            overlay.style.display = 'block';
        }

});




  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }




}

function checkout(){
	var flag = localStorage.getItem('totalCost');
	console.log(flag)
	if(flag){
		window.location.href = '/pay.html';
	}else{

	}

}



function cartData(){

let cartItems = localStorage.getItem('productsInCart');
cartItems= JSON.parse(cartItems);
let productContainer = document.querySelector(".shopping-title")

if(cartItems && productContainer){
	console.log(cartItems)
	console.log("Running")

	for (var i in cartItems) {
		console.log(cartItems[i])
		console.log(cartItems[i]);
		const div = document.createElement('div');
  		div.className = 'item';
		div.innerHTML = `
	

		<div class="image">
		<img src="images/`+cartItems[i]['item_id']+`.jpg" alt="" />
		</div>



		<div class="description">
		<span>`+cartItems[i]['name']+`</span>
		<span>($`+cartItems[i]['price']+`)</span>
		</div>



		<div class="quantity">

		<button id="add_`+cartItems[i]['item_id']+`"" class="plus-btn" type="button" name="button" onClick="addItem(this.id)">
		<img src="images/plus.svg" alt="" />
		</button>
		<input id="lbl_`+cartItems[i]['item_id']+`" readOnly type="text" name="name" value=`+cartItems[i]['inCart']+`>
		<button id="minus_`+cartItems[i]['item_id']+`"" class="minus-btn" type="button" name="button" onClick="removeItem(this.id)" >
		<img src="images/minus.svg" alt="" />
		</button>
		</div>



		<div id="tot_`+cartItems[i]['item_id']+`" class="total-price">$`+(cartItems[i]['price'] * cartItems[i]['inCart']).toFixed(2)  +`</div>

		`;

		document.getElementById('shopping-title').appendChild(div);



	}

let totalCost= localStorage.getItem('totalCost');
document.getElementById('total_price').innerHTML= "$"+totalCost;

}
else{
	const div = document.createElement('div');
  		div.className = 'item';
		div.innerHTML = 'Nothing Added in Cart';
		document.getElementById('shopping-title').appendChild(div);
}

}




function addItem(id){

console.log("Clicked Add - ",id)
var _id = id.substring(4)
var lbl = document.getElementById("lbl_"+String(_id))
var totalPrice = document.getElementById("tot_"+String(_id))
lbl.value = parseInt(lbl.value) + 1;
totalPrice_val = parseFloat(totalPrice.innerHTML.substring(1))


let cartItems = localStorage.getItem('productsInCart');
cartItems= JSON.parse(cartItems);
let totalCost= localStorage.getItem('totalCost');
cartCost = parseFloat(totalCost)
let cartNumbers= localStorage.getItem('cartNumbers');
cartNumbers = parseInt(cartNumbers)

for (var i in cartItems) {
	if(cartItems[i]['item_id'] == _id){

		cartItems[i]['inCart'] = lbl.value
		localStorage.setItem('productsInCart', JSON.stringify(cartItems))
		cartCost = cartCost + parseFloat(cartItems[i]['price'])
		console.log(totalPrice_val)

		totalPrice.innerHTML = "$"+String((totalPrice_val + cartItems[i]['price']).toFixed(2));

		localStorage.setItem('totalCost',cartCost.toFixed(2))
		localStorage.setItem('cartNumbers', cartNumbers+1 )
		let totalCost= localStorage.getItem('totalCost');

		document.getElementById('total_price').innerHTML= "$"+totalCost;


	}
	
}
}


function removeItem(id){

//let productNum = localStorage.getItem('cartNumbers');
//localStorage.setItem('cartNumbers', parseInt(productNum) -1)
var _id = id.substring(6)
var lbl = document.getElementById("lbl_"+String(_id))
var totalPrice = document.getElementById("tot_"+String(_id))
console.log(totalPrice.innerHTML)
lbl.value = parseInt(lbl.value) - 1;
totalPrice_val = parseFloat(totalPrice.innerHTML.substring(1))


let cartItems = localStorage.getItem('productsInCart');
cartItems= JSON.parse(cartItems);
let totalCost= localStorage.getItem('totalCost');
cartCost = parseFloat(totalCost)
let cartNumbers= localStorage.getItem('cartNumbers');
cartNumbers = parseInt(cartNumbers)
console.log(cartItems)


if(lbl.value <= 0){

	for (var i in cartItems) {

		if(cartItems[i]['item_id'] == _id){
			cartCost = cartCost  -  parseFloat(cartItems[i]['price'])
			totalPrice.innerHTML = "$"+String((totalPrice_val - cartItems[i]['price']).toFixed(2));
			delete cartItems[i]

			localStorage.setItem('totalCost',cartCost.toFixed(2))
			localStorage.setItem('cartNumbers', cartNumbers-1 )
			localStorage.setItem('productsInCart', JSON.stringify(cartItems))

			let totalCost= localStorage.getItem('totalCost');
			document.getElementById('total_price').innerHTML= "$"+totalCost;
			location.reload();

		}

	}



}else{

	for (var i in cartItems) {

	if(cartItems[i]['item_id'] == _id){
		console.log(cartItems[i])
		cartItems[i]['inCart'] = lbl.value
		localStorage.setItem('productsInCart', JSON.stringify(cartItems))
		cartCost = cartCost  -  parseFloat(cartItems[i]['price'])
		totalPrice.innerHTML = "$"+String((totalPrice_val - cartItems[i]['price']).toFixed(2));
		localStorage.setItem('totalCost',cartCost.toFixed(2))
		localStorage.setItem('cartNumbers', cartNumbers-1 )
		let totalCost= localStorage.getItem('totalCost');
		document.getElementById('total_price').innerHTML= "$"+totalCost;
			}
		}
	}
}



/*DATA Loading Functions*/


function removeRow() {
	var r = document.getElementById('row')
  document.getElementById('items').removeChild(r);
}



function addRow(data_list) {

if (document.contains(document.getElementById("row"))) {
            document.getElementById("row").remove();
} 
  const div = document.createElement('div');
  div.className = 'row';
  div.id = 'row';
  div.innerHTML = `<section id="container"></section>`;
    //<button class="dropdown-btn" onClick="drop()">`+value+`<i class="fa fa-caret-down"></i></button>
    //<div class="dropdown-container" id="dropdown`+String(key)+`"></div>`;

  document.getElementById('items').appendChild(div);
  //month_div = document.createElement('dd');

    for(var i = 0; i < data_list.length;i++){

    		var img = document.createElement('div');
    		img.className = "item"
			

			img.innerHTML = `<img src="images/`+data_list[i]['item_id']+`.jpg" alt="First description" />
            <h5 class="description">`+data_list[i]['name']+`</h5>
            <h5>$`+data_list[i]['price']+`</h5>
            <a class="add-cart cart`+data_list[i]['item_id'].substr(1,2)+`">Add to Cart</a>`

    		document.getElementById('container').appendChild(img);


    	
    }
    cartListen(data_list);
    
  

}



var data_list, drink_list=[], snack_list=[], essential_list=[];


$( document ).ready(function() {
			    $.ajax({
			        url: '/getData',
			        type:'POST',
			        data: JSON.stringify("HELLO"),
			        dataType: 'json',
			        success: function(data){

			              data_list = data;

			              
			              for(var i = 0; i < data_list.length; i++){
			              	var first  = data_list[i]['item_id'].substring(0,1)
			              	console.log(first)
			              	if(first==="d"){
			              		drink_list.push(data_list[i])
			              	}
			              	else if(first==="e"){
			              		essential_list.push(data_list[i])
			              	}
			              	else if(first==="s"){
			              		snack_list.push(data_list[i])
			              	}
			              	
			              }


			           }, complete: function(data){
						    

			           }, error: function(err){
			               
			           }
			}); 
		});



function registerUser(){
const isVisible = "is-visible";
document.getElementById('modal1').classList.add(isVisible);
localStorage.setItem('is_user_registered', true)
document.querySelector(".modal.is-visible").classList.remove(isVisible);

				var mobile  = document.getElementById('input-mobile').value;
				localStorage.setItem('user_id', mobile);
				var address = document.getElementById('input-address').value;
				var user_data = {'mobile':mobile, 'address':address}
				console.log(user_data)

				$.ajax({
			        url: '/regUser',
			        type:'POST',
			        data: JSON.stringify(user_data),
			        dataType: 'json',
			        success: function(data){
			        	//$("#user_form").submit(function(e) {
    					//	e.preventDefault();
						 //});


		           }, complete: function(data){
					    

		           }, error: function(err){
		               
		           }
			});


}

function showModal(){
var user_registered = localStorage.getItem('is_user_registered')
if(user_registered){


}else{
	const isVisible = "is-visible";
	document.getElementById('modal1').classList.add(isVisible);
	var submit_mod = document.getElementById('submit-mod')
	submit_mod.addEventListener('click', event => {
					console.log("CLICKE SUBMIT") 
				});

}


}


function show(item){
	showModal();
	onLoadCart();

	if (item =="Snacks" || item.text =="Snacks"){
	     addRow(snack_list)
	}else if (item =="Drinks" || item.text == "Drinks"){
	     addRow(drink_list)
	}
	else if (item =="Essentials" || item.text == "Essentials"){
	     addRow(essential_list)
	}

}



function payData(){
	let totalCost= localStorage.getItem('totalCost');
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = 'Please Pay '+"$"+totalCost+'  to +65 11223344 and then click on Continue to get your order';
	document.getElementById('shopping-title').appendChild(div);

}



function continue_timer(){
var total = localStorage.getItem('totalCost');
var products = localStorage.getItem('productsInCart');
var user_id = localStorage.getItem('user_id');
var data = {'user_id':user_id, 'products':products,'total':total};

$.ajax({
	    url: '/save_order',
	    type:'POST',
	    data: JSON.stringify(data),
	    dataType: 'json',
	    success: function(data){
	    	window.location.href = "/clock.html";
	       }, complete: function(data){
	       }, error: function(err){
	       }
		});
}



/*Clock.html - Feedback Function*/

function submit_feedback(){
		var text = document.getElementById('feed_text').value;
		var mobile = localStorage.getItem('user_id');
		var feedback_data  = {'text':text, 'mobile':mobile}

		$.ajax({
		    url: '/feedback_submit',
		    type:'POST',
		    data: JSON.stringify(feedback_data),
		    dataType: 'json',
		    success: function(data){
		    	var msg= document.createElement('div');
    			msg.className = "msg"
				msg.innerHTML = `<h2>Thank you for your feedback</h2>`
				document.getElementById('text_area').removeChild(document.getElementById('feed_text'));
				document.getElementById('text_area').appendChild(msg);
		    	
		       }, complete: function(data){
		       }, error: function(err){
		       }
		});

}






