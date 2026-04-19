/* =========================================
   Shopping cart - localStorage based
   ========================================= */
const CART_KEY = 'ohm_cart_v1';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (_) { return []; }
}
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartBadge(); }

function addToCart(id, qty = 1) {
  const p = getProductById(id);
  if (!p) return;
  const cart = getCart();
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  toast(`"${p.name.substring(0,36)}…" añadido al carrito`);
}
function changeQty(id, qty) {
  const cart = getCart();
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.qty = Math.max(1, qty);
  saveCart(cart);
  renderCart();
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart();
}
function clearCart() { saveCart([]); renderCart(); }

function cartTotals() {
  const cart = getCart();
  let subtotal = 0, items = 0;
  cart.forEach(i => {
    const p = getProductById(i.id);
    if (!p) return;
    subtotal += p.price * i.qty;
    items += i.qty;
  });
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 149;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping;
  return { subtotal, shipping, tax, total, items };
}

function updateCartBadge() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const t = cartTotals();
  el.textContent = t.items;
  el.style.display = t.items > 0 ? 'inline-flex' : 'none';
}

/* Render the full cart page */
function renderCart() {
  const wrap = document.getElementById('cart-wrap');
  if (!wrap) return;

  const cart = getCart();
  const { subtotal, shipping, tax, total, items } = cartTotals();

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <div class="big-ic">🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>¡No dejes pasar las ofertas! Aprovecha hasta 30% off hoy.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
          <a class="btn btn-primary" href="farmacia.html">Ver farmacia</a>
          <a class="btn btn-outline" href="skincare.html">Ver skincare</a>
        </div>
      </div>
    `;
    return;
  }

  const itemsHtml = cart.map(ci => {
    const p = getProductById(ci.id);
    if (!p) return '';
    return `
      <div class="cart-item" data-id="${p.id}">
        <div class="ci-thumb"><img src="${p.image}" alt="${p.name}"></div>
        <div>
          <div class="ci-meta">${p.cat}</div>
          <h4>${p.name}</h4>
          <div class="qty">
            <button onclick="changeQty('${p.id}', ${ci.qty - 1})" aria-label="Menos">−</button>
            <input type="number" min="1" value="${ci.qty}" onchange="changeQty('${p.id}', parseInt(this.value) || 1)">
            <button onclick="changeQty('${p.id}', ${ci.qty + 1})" aria-label="Más">+</button>
          </div>
          <a class="remove" href="javascript:;" onclick="removeFromCart('${p.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            Eliminar
          </a>
        </div>
        <div style="text-align:right">
          <div class="ci-price">${formatPrice(p.price * ci.qty)}</div>
          <div class="ci-meta">${formatPrice(p.price)} c/u</div>
        </div>
      </div>
    `;
  }).join('');

  wrap.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${itemsHtml}
        <div style="padding:14px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <a href="farmacia.html" style="color:var(--blue-600);font-weight:600">← Seguir comprando</a>
          <button class="btn btn-ghost" onclick="clearCart()">Vaciar carrito</button>
        </div>
      </div>

      <div class="summary">
        <h3>Resumen de tu compra</h3>
        <div class="row"><span>Subtotal (${items} ${items === 1 ? 'artículo' : 'artículos'})</span><b>${formatPrice(subtotal)}</b></div>
        <div class="row"><span>Envío</span><b>${shipping === 0 ? 'GRATIS 🎁' : formatPrice(shipping)}</b></div>
        <div class="row tiny"><span>IVA incluido (16%)</span><span>${formatPrice(tax)}</span></div>
        <div class="row total"><span>Total</span><span>${formatPrice(total)}</span></div>

        ${subtotal < 999 ? `
          <div style="background:var(--blue-50);padding:10px 14px;border-radius:10px;margin-top:10px;font-size:.88rem;color:var(--blue-700)">
            💡 Te faltan <b>${formatPrice(999 - subtotal)}</b> para envío <b>GRATIS</b>.
          </div>` : `
          <div style="background:#E6F7EC;padding:10px 14px;border-radius:10px;margin-top:10px;font-size:.88rem;color:#166534">
            🎁 ¡Felicidades! Obtuviste envío GRATIS.
          </div>`
        }

        <form class="checkout-form" onsubmit="submitCheckout(event)">
          <h4 style="margin:14px 0 4px;font-size:1rem;color:var(--blue-900)">Datos de envío</h4>
          <div class="form-row">
            <div class="form-group"><label>Nombre</label><input required name="name" placeholder="Ana López"></div>
            <div class="form-group"><label>Teléfono</label><input required type="tel" name="phone" placeholder="55 1234 5678"></div>
          </div>
          <div class="form-group"><label>Email</label><input required type="email" name="email" placeholder="tu@correo.com"></div>
          <div class="form-group"><label>Dirección</label><input required name="addr" placeholder="Calle y número"></div>
          <div class="form-row">
            <div class="form-group"><label>Código Postal</label><input required name="cp" placeholder="13370"></div>
            <div class="form-group"><label>Método de pago</label>
              <select name="pay">
                <option>Tarjeta de crédito / débito</option>
                <option>Transferencia SPEI</option>
                <option>Efectivo en OXXO</option>
                <option>PayPal</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" style="margin-top:8px">
            🔒 Finalizar compra · ${formatPrice(total)}
          </button>
          <p class="tiny" style="text-align:center;margin:8px 0 0">
            Pago 100% seguro · Envío en 24-48 hrs · Garantía de satisfacción
          </p>
        </form>
      </div>
    </div>
  `;
}

function submitCheckout(e) {
  e.preventDefault();
  const f = e.target;
  const name = f.querySelector('[name="name"]').value;
  const total = cartTotals().total;
  const wrap = document.getElementById('cart-wrap');
  wrap.innerHTML = `
    <div class="empty-cart" style="background:linear-gradient(135deg,#E6F7EC,#F4F8FF);border:2px solid #BFE8CF">
      <div class="big-ic" style="color:var(--success)">✓</div>
      <h2>¡Gracias por tu compra, ${name.split(' ')[0]}!</h2>
      <p>Tu pedido por <b>${formatPrice(total)}</b> fue recibido. Recibirás un correo de confirmación en los próximos minutos.</p>
      <p class="tiny">* Esta es una simulación de proceso de compra.</p>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap">
        <a class="btn btn-primary" href="index.html">Volver al inicio</a>
        <a class="btn btn-outline" href="farmacia.html">Seguir comprando</a>
      </div>
    </div>
  `;
  clearCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
