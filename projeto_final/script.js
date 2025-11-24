// pega produtos do HTML 
const PRODUCTS = []; // vai ler do DOM
document.querySelectorAll('.card').forEach(card=>{
  const id = Number(card.getAttribute('data-id'));
  const title = card.querySelector('h3')?.textContent.trim() ?? ('Produto '+id);
  const img = card.querySelector('img')?.getAttribute('src') ?? '';
  const desc = card.querySelector('.desc')?.textContent.trim() ?? '';
  const priceText = card.querySelector('.preco')?.textContent.trim() ?? 'R$ 0,00';
  // converte 'R$ 1.299,00' -> number 1299.00
  const price = Number(priceText.replace(/R\$|\s|\./g,'').replace(',','.') ) || 0;
  PRODUCTS.push({id, title, img, desc, price});
});

// estado do carrinho
let cart = [];

// formatador simples
function money(v){ return 'R$ ' + v.toFixed(2).replace('.',','); }

// atualiza UI do carrinho
function updateCartUI(){
  const ul = document.getElementById('cart-items');
  ul.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.title} x${item.qty}</span>
      <span>${money(item.price*item.qty)} <button class="remove-item" data-id="${item.id}">Remover</button></span>`;
    ul.appendChild(li);
  });
  document.getElementById('cart-total').textContent = money(total);
  document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
}

// adiciona no carrinho
function addToCart(id){
  id = Number(id);
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const found = cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({id:p.id, title:p.title, price:p.price, qty:1});
  updateCartUI();
}

// remove do carrinho
function removeFromCart(id){
  id = Number(id);
  cart = cart.filter(x=>x.id!==id);
  updateCartUI();
}

// limpa
function clearCart(){ cart = []; updateCartUI(); }

// eventos (delegação simples)
document.addEventListener('click', (e)=>{
  if(e.target.matches('.add-btn')){
    addToCart(e.target.dataset.id);
  } else if(e.target.matches('.remove-item')){
    removeFromCart(e.target.dataset.id);
  } else if(e.target.matches('#clear-cart')){
    clearCart();
  } else if(e.target.matches('#cart-btn')){
    const cartEl = document.getElementById('cart');
    cartEl.style.display = cartEl.style.display === 'block' ? 'none' : 'block';
  }
});

// formulário (validação simples)
document.getElementById('checkout-form').addEventListener('submit', function(ev){
  ev.preventDefault();
  const msg = document.getElementById('form-message');
  if(cart.length === 0){
    msg.style.color = 'red';
    msg.textContent = 'Adicione pelo menos um produto antes de finalizar.';
    return;
  }
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const pagamento = document.getElementById('pagamento').value;
  if(nome.length < 3 || !email || !endereco || !pagamento){
    msg.style.color = 'red';
    msg.textContent = 'Por favor preencha todos os campos corretamente.';
    return;
  }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  msg.style.color = 'green';
  msg.textContent = `Pedido simulado recebido! ${nome} — Total ${money(total)}.`;
  clearCart();
  this.reset();
});

// reprodução de música ao clicar na página
document.addEventListener("click", function(){
    const bgm = document.getElementById("bgm");
    bgm.muted = false;
    bgm.play();
}, { once:true });
