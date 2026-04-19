/* =========================================
   OHM Pharma - Main shared JS
   Navigation, drawer, WhatsApp, partials
   ========================================= */

const WA_NUMBER = '5215575538801';
const WA_MSG = encodeURIComponent('Hola OHM Pharma, me interesa más información.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* Inject shared header + footer into placeholders */
function renderHeader(activeSection) {
  const holder = document.getElementById('site-header');
  if (!holder) return;

  holder.innerHTML = `
    <div class="utility-bar">
      <div class="container">
        <div>
          <span>📍 Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac CDMX</span>
        </div>
        <div>
          <a href="tel:+5215575538801">📞 +52 55 7553 8801</a>
          <span class="dot">•</span>
          <a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp</a>
          <span class="dot">•</span>
          <a href="contacto.html">Contacto</a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-row">
        <a href="index.html" class="brand" aria-label="OHM Pharma">
          <span class="logo-dot">O</span>
          <span>OHM Pharma <small style="display:block;font-size:.7rem">Salud · Farmacia · Skincare</small></span>
        </a>

        <nav class="main-nav" aria-label="principal">
          <ul class="nav-list">
            <li>
              <a class="nav-link ${activeSection==='home'?'active':''}" href="index.html">Inicio</a>
            </li>
            <li>
              <a class="nav-link ${activeSection==='distribucion'?'active':''}" href="distribucion.html">
                Distribución
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="mega">
                <div class="mega-grid">
                  <a class="mega-card" href="distribucion.html#catalogo">
                    <span class="tag">Mayoreo</span>
                    <h4>Medicamento de patente</h4>
                    <p>+4,500 referencias con los principales laboratorios.</p>
                  </a>
                  <a class="mega-card" href="distribucion.html#catalogo">
                    <span class="tag">Mayoreo</span>
                    <h4>Genéricos y rebotica</h4>
                    <p>Precios competitivos para farmacias, hospitales y clínicas.</p>
                  </a>
                  <a class="mega-card" href="distribucion.html#contacto">
                    <span class="tag">B2B</span>
                    <h4>Atención empresarial</h4>
                    <p>Asesor dedicado, cotización en menos de 24hrs.</p>
                  </a>
                </div>
              </div>
            </li>
            <li>
              <a class="nav-link ${activeSection==='farmacia'?'active':''}" href="farmacia.html">
                Farmacia
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="mega">
                <div class="mega-grid">
                  <a class="mega-card" href="farmacia.html#analgesicos">
                    <span class="tag">Top ventas</span>
                    <h4>Analgésicos</h4>
                    <p>Alivio rápido para dolor y fiebre.</p>
                  </a>
                  <a class="mega-card" href="farmacia.html#vitaminas">
                    <span class="tag">Inmunidad</span>
                    <h4>Vitaminas y suplementos</h4>
                    <p>Refuerza tus defensas todos los días.</p>
                  </a>
                  <a class="mega-card" href="farmacia.html#antigripales">
                    <span class="tag">Temporada</span>
                    <h4>Antigripales</h4>
                    <p>Combate gripa y congestión en minutos.</p>
                  </a>
                </div>
              </div>
            </li>
            <li>
              <a class="nav-link ${activeSection==='skincare'?'active':''}" href="skincare.html">
                Skincare
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="mega">
                <div class="mega-grid">
                  <a class="mega-card" href="skincare.html#serums">
                    <span class="tag">Premium</span>
                    <h4>Serums y tratamientos</h4>
                    <p>Resultados visibles en 14 días o menos.</p>
                  </a>
                  <a class="mega-card" href="skincare.html#proteccion">
                    <span class="tag">Esencial</span>
                    <h4>Protección solar</h4>
                    <p>FPS 50+ para cuidarte todos los días.</p>
                  </a>
                  <a class="mega-card" href="skincare.html#kits">
                    <span class="tag">Ahorra</span>
                    <h4>Kits y rutinas</h4>
                    <p>Tu rutina profesional en casa desde $1,499.</p>
                  </a>
                </div>
              </div>
            </li>
            <li><a class="nav-link ${activeSection==='nosotros'?'active':''}" href="nosotros.html">Nosotros</a></li>
            <li><a class="nav-link ${activeSection==='contacto'?'active':''}" href="contacto.html">Contacto</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <a class="icon-btn" href="carrito.html" aria-label="Carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            <span class="cart-badge" id="cart-count">0</span>
          </a>
          <button class="hamburger" id="open-drawer" aria-label="Abrir menú">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Drawer móvil -->
    <div class="drawer" id="drawer" role="dialog" aria-modal="true">
      <div class="drawer-panel">
        <div class="drawer-head">
          <div class="brand" style="font-size:1rem">
            <span class="logo-dot">O</span>
            <span>OHM Pharma</span>
          </div>
          <button class="icon-btn" id="close-drawer" aria-label="Cerrar menú">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="drawer-nav">
          <a class="drawer-link" href="index.html">Inicio</a>
          <details>
            <summary>Distribución <span>＋</span></summary>
            <ul class="sublist">
              <li><a href="distribucion.html">Ver división</a></li>
              <li><a href="distribucion.html#catalogo">Medicamento de patente</a></li>
              <li><a href="distribucion.html#catalogo">Genéricos y rebotica</a></li>
              <li><a href="distribucion.html#contacto">Solicitar cotización</a></li>
            </ul>
          </details>
          <details>
            <summary>Farmacia <span>＋</span></summary>
            <ul class="sublist">
              <li><a href="farmacia.html">Ver tienda</a></li>
              <li><a href="farmacia.html#analgesicos">Analgésicos</a></li>
              <li><a href="farmacia.html#vitaminas">Vitaminas</a></li>
              <li><a href="farmacia.html#antigripales">Antigripales</a></li>
            </ul>
          </details>
          <details>
            <summary>Skincare <span>＋</span></summary>
            <ul class="sublist">
              <li><a href="skincare.html">Ver tienda</a></li>
              <li><a href="skincare.html#serums">Serums</a></li>
              <li><a href="skincare.html#proteccion">Protección solar</a></li>
              <li><a href="skincare.html#kits">Kits y rutinas</a></li>
            </ul>
          </details>
          <a class="drawer-link" href="nosotros.html">Nosotros</a>
          <a class="drawer-link" href="contacto.html">Contacto</a>
        </div>
        <div class="drawer-foot">
          <a class="btn btn-whatsapp btn-block" href="${WA_LINK}" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A11.9 11.9 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 0 1 2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/></svg>
            Chatear por WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Bind drawer
  const drawer = document.getElementById('drawer');
  const open = document.getElementById('open-drawer');
  const close = document.getElementById('close-drawer');
  open && open.addEventListener('click', () => drawer.classList.add('open'));
  close && close.addEventListener('click', () => drawer.classList.remove('open'));
  drawer && drawer.addEventListener('click', (e) => { if (e.target === drawer) drawer.classList.remove('open'); });
}

function renderFooter() {
  const holder = document.getElementById('site-footer');
  if (!holder) return;
  holder.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand" style="color:#fff">
              <span class="logo-dot">O</span>
              <span>OHM Pharma</span>
            </div>
            <p style="color:#9EC2F1;margin-top:10px;max-width:320px">
              Distribución farmacéutica, farmacia de barrio y skincare de alta gama. Todo bajo un mismo techo, con atención humana y entrega confiable en todo México.
            </p>
            <div class="newsletter" style="margin-top:12px">
              <label style="font-size:.88rem;color:#fff;font-weight:600;display:block;margin-bottom:6px">Recibe ofertas y promociones</label>
              <form onsubmit="event.preventDefault(); toast('¡Listo! Pronto te contactaremos.');">
                <input type="email" required placeholder="tu@correo.com">
                <button class="btn btn-primary btn-block" type="submit">Suscribirme</button>
              </form>
            </div>
          </div>

          <div>
            <h5>Comprar</h5>
            <ul>
              <li><a href="farmacia.html">Farmacia</a></li>
              <li><a href="skincare.html">Skincare</a></li>
              <li><a href="distribucion.html">Distribución mayoreo</a></li>
              <li><a href="carrito.html">Mi carrito</a></li>
              <li><a href="#">Promociones</a></li>
            </ul>
          </div>

          <div>
            <h5>Empresa</h5>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="nosotros.html#reviews">Testimonios</a></li>
              <li><a href="contacto.html">Contacto</a></li>
              <li><a href="#">Aviso de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h5>Contacto</h5>
            <div class="line">
              <span class="ic">📍</span>
              <div>
                <b style="color:#fff">Dirección</b><br>
                Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac CDMX
              </div>
            </div>
            <div class="line">
              <span class="ic">📞</span>
              <div>
                <b style="color:#fff">Teléfono</b><br>
                <a href="tel:+5215575538801">+52 55 7553 8801</a>
              </div>
            </div>
            <div class="line">
              <span class="ic">💬</span>
              <div>
                <b style="color:#fff">WhatsApp</b><br>
                <a href="${WA_LINK}" target="_blank" rel="noopener">Inicia una conversación</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} OHM Pharma. Todos los derechos reservados.</div>
          <div>Hecho con ♥ en CDMX</div>
        </div>
      </div>
    </footer>
  `;
}

function renderWhatsFloat() {
  const holder = document.getElementById('wa-float');
  if (!holder) return;
  holder.innerHTML = `
    <a class="wa-float" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="Chatear por WhatsApp">
      <span class="wa-ic">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A11.9 11.9 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zm-8.5 18A10 10 0 0 1 6.8 20l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 0 1 2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm5.5-7.5c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.4.1-.6l.5-.6c.2-.2.2-.3.3-.5s0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4l-.7-.5z"/></svg>
      </span>
      <span class="wa-txt">
        ¡Pide ahora!
        <small>Respondemos en 2 min</small>
      </span>
    </a>
  `;
}

/* Toast */
function toast(msg, type = 'ok') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `<span class="${type}">✓</span> ${msg}`;
  el.classList.add('show');
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(() => el.classList.remove('show'), 2400);
}

/* Countdown (24hr promo) */
function initCountdown(el) {
  if (!el) return;
  const target = new Date();
  target.setHours(23, 59, 59, 0);
  const days = el.querySelector('[data-cd="days"]');
  const hours = el.querySelector('[data-cd="hours"]');
  const mins = el.querySelector('[data-cd="mins"]');
  const secs = el.querySelector('[data-cd="secs"]');
  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    if (days) days.textContent = String(d).padStart(2, '0');
    if (hours) hours.textContent = String(h).padStart(2, '0');
    if (mins) mins.textContent = String(m).padStart(2, '0');
    if (secs) secs.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

/* Slider (simple) */
function initSlider(root) {
  if (!root) return;
  const track = root.querySelector('.slider-track');
  const slides = root.querySelectorAll('.slider-slide');
  const dotsWrap = root.querySelector('.slider-dots');
  const prev = root.querySelector('.slider-nav.prev');
  const next = root.querySelector('.slider-nav.next');
  let i = 0;
  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => go(idx));
    if (dotsWrap) dotsWrap.appendChild(b);
  });
  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    if (dotsWrap) [...dotsWrap.children].forEach((b, idx) => b.classList.toggle('active', idx === i));
  }
  prev && prev.addEventListener('click', () => go(i - 1));
  next && next.addEventListener('click', () => go(i + 1));
  go(0);
  setInterval(() => go(i + 1), 6500);
}

/* Boot */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.body.dataset.section;
  renderHeader(section);
  renderFooter();
  renderWhatsFloat();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  document.querySelectorAll('.slider').forEach(initSlider);
  document.querySelectorAll('[data-countdown]').forEach(initCountdown);
});
