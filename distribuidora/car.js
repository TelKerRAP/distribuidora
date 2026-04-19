/* =========================
   🛒 CARRITO GLOBAL
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* GUARDAR */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* CONTADOR */
function updateCartCount(){
    const el = document.getElementById("cartCount");
    if(el){
        el.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    }
}

/* AGREGAR */
function addToCart(product){
    const item = cart.find(i => i.id === product.id);

    if(item){
        item.qty++;
    }else{
        cart.push({...product, qty:1});
    }

    saveCart();
    updateCartCount();

    alert("Producto agregado 🛒");
}

/* ELIMINAR */
function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
}

/* CAMBIAR CANTIDAD */
function changeQty(id, delta){
    const item = cart.find(i => i.id === id);

    if(!item) return;

    item.qty += delta;

    if(item.qty <= 0){
        removeFromCart(id);
    }

    saveCart();
    updateCartCount();
}

/* TOTAL */
function getTotal(){
    return cart.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
}

/* INICIALIZAR */
document.addEventListener("DOMContentLoaded", updateCartCount);