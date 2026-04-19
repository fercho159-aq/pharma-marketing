/* =========================================
   Product grid & detail renderers
   ========================================= */

function productCardHTML(p) {
  const tag = p.tag === 'sale' ? '<span class="tagline sale">-'+ Math.round((1 - p.price/(p.priceOld||p.price))*100) +'%</span>'
           : p.tag === 'new' ? '<span class="tagline new">Nuevo</span>'
           : p.tag === 'bestseller' ? '<span class="tagline">Top ventas</span>'
           : '';
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  const priceOld = p.priceOld ? `<span class="price-old">${formatPrice(p.priceOld)}</span>` : '';
  return `
    <div class="product-card" data-cat="${p.cat}">
      <a href="producto.html?id=${p.id}" class="thumb">
        ${tag}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <button class="wish" title="Favorito" aria-label="Favorito">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <div class="body">
        <div class="cat">${p.cat}</div>
        <a href="producto.html?id=${p.id}" style="color:inherit"><div class="name">${p.name}</div></a>
        <div class="rating"><span class="stars">${stars}</span> <span>${p.rating} (${p.reviews})</span></div>
        <div class="price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${priceOld}
        </div>
        <button class="add" onclick="addToCart('${p.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Agregar al carrito
        </button>
      </div>
    </div>
  `;
}

function renderProducts(sel, list) {
  const root = document.querySelector(sel);
  if (!root) return;
  root.innerHTML = list.map(productCardHTML).join('');
}

function renderFilters(sel, products, gridSel) {
  const root = document.querySelector(sel);
  if (!root) return;
  const cats = Array.from(new Set(products.map(p => p.cat)));
  root.innerHTML = `
    <button class="chip active" data-cat="all">Todo</button>
    ${cats.map(c => `<button class="chip" data-cat="${c}">${c}</button>`).join('')}
  `;
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    root.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const cat = b.dataset.cat;
    const list = cat === 'all' ? products : products.filter(p => p.cat === cat);
    renderProducts(gridSel, list);
  });
}

/* Product detail */
function renderProductDetail() {
  const wrap = document.getElementById('product-detail');
  if (!wrap) return;
  const id = new URLSearchParams(location.search).get('id');
  const p = getProductById(id);
  if (!p) { wrap.innerHTML = `<div class="empty-cart"><h2>Producto no encontrado</h2><a class="btn btn-primary" href="index.html">Volver</a></div>`; return; }
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  const priceOld = p.priceOld ? `<span class="price-old">${formatPrice(p.priceOld)}</span>` : '';
  const savings = p.priceOld ? `<span style="background:#FFE0E0;color:var(--danger);padding:3px 10px;border-radius:999px;font-size:.8rem;font-weight:800;margin-left:8px">Ahorras ${formatPrice(p.priceOld - p.price)}</span>` : '';
  const crumbHome = p.section === 'skincare' ? 'skincare.html' : 'farmacia.html';
  const crumbLabel = p.section === 'skincare' ? 'Skincare' : 'Farmacia';

  // build breadcrumbs
  const bc = document.getElementById('pd-breadcrumbs');
  if (bc) bc.innerHTML = `<a href="index.html">Inicio</a> / <a href="${crumbHome}">${crumbLabel}</a> / <span>${p.name}</span>`;

  wrap.innerHTML = `
    <div class="pd-layout">
      <div class="pd-gallery">
        <div class="pd-thumbs">
          <button class="active"><img src="${p.image}" alt=""></button>
          <button><img src="${p.image}&sat=-20" alt=""></button>
          <button><img src="${p.image}&sat=-50" alt=""></button>
          <button><img src="${p.image}&sat=20" alt=""></button>
        </div>
        <div class="pd-main"><img src="${p.image}" alt="${p.name}"></div>
      </div>

      <div class="pd-info">
        <div class="cat">${p.cat}</div>
        <h1>${p.name}</h1>
        <div class="rating-line">
          <span class="stars">${stars}</span>
          <b>${p.rating}</b> / 5 · <a href="#resenas" style="color:var(--blue-600)">${p.reviews} reseñas</a>
        </div>
        <div>
          <span class="price-big">${formatPrice(p.price)}</span>
          ${priceOld}
          ${savings}
        </div>
        <p style="margin-top:16px;font-size:1.05rem">${p.short}</p>

        <ul class="pd-bullets">
          ${p.bullets.map(b => `<li>✓ ${b}</li>`).join('')}
        </ul>

        <div style="background:var(--blue-50);border-left:4px solid var(--blue-500);padding:12px 14px;border-radius:10px;margin-top:16px">
          <b style="color:var(--blue-800)">🔥 ¡Últimas 12 unidades!</b>
          <div class="tiny" style="color:var(--blue-700);margin-top:2px">43 personas vieron este producto en la última hora.</div>
        </div>

        <div class="pd-actions">
          <div class="qty">
            <button onclick="pdQty(-1)">−</button>
            <input id="pd-qty" type="number" min="1" value="1">
            <button onclick="pdQty(1)">+</button>
          </div>
          <button class="btn btn-primary btn-lg" onclick="addToCart('${p.id}', parseInt(document.getElementById('pd-qty').value)||1)">
            🛒 Agregar al carrito
          </button>
          <a class="btn btn-whatsapp" href="https://wa.me/5215575538801?text=${encodeURIComponent('Hola, me interesa: ' + p.name)}" target="_blank">💬 Consultar</a>
        </div>

        <div style="display:flex;gap:14px;margin-top:20px;flex-wrap:wrap;font-size:.88rem">
          <div>🚚 <b>Envío GRATIS</b> en compras +$999</div>
          <div>🔒 Pago 100% seguro</div>
          <div>↺ 30 días de garantía</div>
        </div>

        <div class="pd-tabs">
          <button class="active" data-tab="desc">Descripción</button>
          <button data-tab="uso">Modo de uso</button>
          <button data-tab="resenas">Reseñas (${p.reviews})</button>
        </div>
        <div class="pd-tab-content active" data-tab="desc">
          <p>${p.short} Fórmula desarrollada bajo los más altos estándares de calidad farmacéutica, respaldada por laboratorios certificados. Miles de clientes ya notaron resultados visibles; sé el siguiente en probarlo.</p>
        </div>
        <div class="pd-tab-content" data-tab="uso">
          <p>Aplicar según indicaciones. Si tienes alguna condición médica, consulta a tu profesional de salud antes de iniciar cualquier tratamiento. Mantener fuera del alcance de los niños.</p>
        </div>
        <div class="pd-tab-content" data-tab="resenas" id="resenas">
          <div class="review" style="margin-bottom:10px"><div class="stars">★★★★★</div><blockquote>"Llegó rapidísimo y los resultados son notables desde la primera semana. Ya lo recomendé a 3 amigas."</blockquote><div class="author"><div class="avatar">MR</div><div><b>María R.</b><small>Compradora verificada · CDMX</small></div></div></div>
          <div class="review" style="margin-bottom:10px"><div class="stars">★★★★★</div><blockquote>"Excelente calidad, excelente servicio. Pasé de farmacias de cadena a OHM y no regreso."</blockquote><div class="author"><div class="avatar">JC</div><div><b>Juan C.</b><small>Comprador verificado · Puebla</small></div></div></div>
        </div>
      </div>
    </div>
  `;
  // Tabs
  wrap.querySelectorAll('.pd-tabs button').forEach(b => {
    b.addEventListener('click', () => {
      wrap.querySelectorAll('.pd-tabs button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      wrap.querySelectorAll('.pd-tab-content').forEach(x => x.classList.toggle('active', x.dataset.tab === b.dataset.tab));
    });
  });
  // Thumb selector
  const thumbs = wrap.querySelectorAll('.pd-thumbs button');
  const main = wrap.querySelector('.pd-main img');
  thumbs.forEach(t => t.addEventListener('click', () => {
    thumbs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    main.src = t.querySelector('img').src;
  }));
}
function pdQty(delta) {
  const input = document.getElementById('pd-qty');
  input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}
