(function () {
    const TAX_RATE = 18;
    const CART_KEY = 'fitwinnie.cart';
    const ORDER_KEY = 'fitwinnie.lastOrder';

    const categories = [
        { code: 'FIT', label: 'Fitness' },
        { code: 'TAP', label: 'Tapis de course' },
        { code: 'MUS', label: 'Musculation' },
        { code: 'VEL', label: 'Velos' },
        { code: 'RAM', label: 'Rameurs' },
        { code: 'ACC', label: 'Accessoires' },
        { code: 'NUT', label: 'Nutrition' },
    ];

    const products = {
        tapis: [
            { id: 'tapis-x-run-560', name: 'Tapis de course X-Run 560', price: 799000, old: 999000, badge: '-20%', stock: 9, image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=700&q=80' },
            { id: 'rameur-pro-row', name: 'Rameur magnetique Pro Row', price: 449000, old: 599000, badge: 'Promo', stock: 12, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=700&q=80' },
            { id: 'banc-reglable', name: 'Banc reglable multi-position', price: 199000, old: 249000, badge: '-15%', stock: 7, image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?auto=format&fit=crop&w=700&q=80' },
            { id: 'station-guidee', name: 'Station guidee compacte', price: 1249000, old: 1499000, badge: 'Top', stock: 4, image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=700&q=80' },
        ],
        nouveautes: [
            { id: 'pack-halteres', name: 'Pack halteres reglables', price: 289000, old: null, badge: 'Nouveau', stock: 14, image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80' },
            { id: 'tapis-training', name: 'Tapis training antiderapant', price: 34900, old: 49900, badge: '-30%', stock: 20, image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=700&q=80' },
            { id: 'velo-sprint-bike', name: 'Velo indoor Sprint Bike', price: 549000, old: null, badge: 'Nouveau', stock: 6, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80' },
            { id: 'kettlebell-16', name: 'Kettlebell competition 16 kg', price: 69000, old: 89000, badge: '-22%', stock: 18, image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=700&q=80' },
        ],
        rameurs: [
            { id: 'rameur-flow-r2', name: 'Rameur pliable Flow R2', price: 389000, old: 499000, badge: '-22%', stock: 8, image: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&w=700&q=80' },
            { id: 'rameur-air', name: 'Rameur air resistance', price: 699000, old: null, badge: 'Pro', stock: 5, image: 'https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=700&q=80' },
            { id: 'rameur-studio-noir', name: 'Rameur studio noir', price: 529000, old: 649000, badge: 'Stock', stock: 10, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=80' },
            { id: 'rameur-compact-rx', name: 'Rameur compact RX', price: 299000, old: 379000, badge: '-21%', stock: 11, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80' },
        ],
        nutrition: [
            { id: 'whey-isolate', name: 'Whey isolate chocolat', price: 39900, old: 49900, badge: '-20%', stock: 24, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80' },
            { id: 'creatine-mono', name: 'Creatine monohydrate', price: 24900, old: null, badge: 'Best', stock: 32, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=700&q=80' },
            { id: 'pre-workout', name: 'Pre-workout energie', price: 29900, old: 36900, badge: 'Promo', stock: 16, image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=700&q=80' },
            { id: 'shaker-sport', name: 'Shaker sport 700 ml', price: 9900, old: null, badge: 'Plus', stock: 40, image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=700&q=80' },
        ],
    };

    const objectives = [
        { title: 'Perte de poids', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80' },
        { title: 'Prise de muscle', image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?auto=format&fit=crop&w=900&q=80' },
        { title: 'Performance', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80' },
        { title: 'Recuperation', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80' },
    ];

    const productIndex = Object.values(products).flat().reduce((items, product) => {
        items[product.id] = product;
        return items;
    }, {});

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function money(value) {
        return `${new Intl.NumberFormat('fr-FR').format(Math.round(value))} FCFA`;
    }

    function readJson(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch {
            return fallback;
        }
    }

    function readCart() {
        return readJson(CART_KEY, {});
    }

    function writeCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function cartCount() {
        return Object.values(readCart()).reduce((total, quantity) => total + Number(quantity || 0), 0);
    }

    function updateCartCount() {
        document.querySelectorAll('[data-cart-count], .cart-link span').forEach((element) => {
            element.textContent = String(cartCount());
        });
    }

    function summary() {
        const cart = readCart();
        const items = Object.entries(cart)
            .map(([id, quantity]) => {
                const product = productIndex[id];
                const cleanQuantity = Math.max(0, Number(quantity || 0));

                if (!product || cleanQuantity < 1) {
                    return null;
                }

                return {
                    product,
                    quantity: cleanQuantity,
                    unitPrice: product.price,
                    lineTotal: product.price * cleanQuantity,
                };
            })
            .filter(Boolean);
        const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
        const tax = subtotal * (TAX_RATE / 100);

        return {
            items,
            subtotal,
            tax,
            total: subtotal + tax,
            taxRate: TAX_RATE,
        };
    }

    function showToast(message) {
        let toast = document.querySelector('.site-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'site-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.append(toast);
        }

        toast.textContent = message;
        toast.classList.add('is-visible');
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
    }

    function animateCart() {
        const cartLink = document.querySelector('.cart-link');

        if (!cartLink) {
            return;
        }

        cartLink.classList.remove('cart-pop');
        void cartLink.offsetWidth;
        cartLink.classList.add('cart-pop');
    }

    function productCard(product) {
        return `
            <article class="product-card" data-product-card data-product-id="${escapeHtml(product.id)}" data-product-name="${escapeHtml(product.name)}">
                ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ''}
                <a class="product-image" href="#">
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
                </a>
                <div class="product-info">
                    <h3>${escapeHtml(product.name)}</h3>
                    <div class="product-price">
                        <strong>${money(product.price)}</strong>
                        ${product.old ? `<span>${money(product.old)}</span>` : ''}
                    </div>
                    <form class="product-cart-form" action="panier.html" data-product-form>
                        <input type="hidden" name="quantity" value="1">
                        <button class="product-action" type="submit" data-product-add aria-label="Ajouter ${escapeHtml(product.name)} au panier">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 6h15l-2 8H8L6 3H3m6 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                            </svg>
                            <span>Ajouter</span>
                        </button>
                    </form>
                </div>
            </article>
        `;
    }

    function renderHome() {
        const categoryGrid = document.querySelector('[data-category-grid]');

        if (categoryGrid) {
            categoryGrid.innerHTML = categories.map((category) => `
                <a class="category-card" href="#">
                    <span>${escapeHtml(category.code)}</span>
                    <strong>${escapeHtml(category.label)}</strong>
                </a>
            `).join('');
        }

        document.querySelectorAll('[data-product-grid]').forEach((grid) => {
            const key = grid.dataset.productGrid;
            grid.innerHTML = (products[key] || []).map(productCard).join('');
        });

        document.querySelectorAll('[data-mini-products]').forEach((container) => {
            const key = container.dataset.miniProducts;
            container.innerHTML = (products[key] || []).slice(0, 3).map((product) => `
                <a class="mini-product" href="#">
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
                    <span>${escapeHtml(product.name)}</span>
                    <strong>${money(product.price)}</strong>
                </a>
            `).join('');
        });

        const objectiveGrid = document.querySelector('[data-objective-grid]');

        if (objectiveGrid) {
            objectiveGrid.innerHTML = objectives.map((objective) => `
                <a class="objective-card" href="#">
                    <img src="${escapeHtml(objective.image)}" alt="${escapeHtml(objective.title)}">
                    <span>${escapeHtml(objective.title)}</span>
                </a>
            `).join('');
        }

        const movementGrid = document.querySelector('[data-movement-grid]');

        if (movementGrid) {
            movementGrid.innerHTML = objectives.map((objective) => `
                <img src="${escapeHtml(objective.image)}" alt="${escapeHtml(objective.title)}">
            `).join('');
        }
    }

    function renderCart() {
        const target = document.querySelector('[data-cart-view]');

        if (!target) {
            return;
        }

        const current = summary();

        if (current.items.length === 0) {
            target.innerHTML = `
                <div class="empty-cart">
                    <h2>Votre panier est vide</h2>
                    <p>Ajoutez un produit depuis le catalogue pour creer une facture apres paiement.</p>
                    <a class="button button-red" href="index.html">Retour au catalogue</a>
                </div>
            `;
            return;
        }

        target.innerHTML = `
            <div class="flow-grid">
                <form class="cart-panel" action="#" data-cart-update>
                    <div class="cart-lines">
                        ${current.items.map((item) => `
                            <article class="cart-line" data-cart-line="${escapeHtml(item.product.id)}">
                                <img src="${escapeHtml(item.product.image)}" alt="${escapeHtml(item.product.name)}">
                                <div>
                                    <h2>${escapeHtml(item.product.name)}</h2>
                                    <p>${money(item.unitPrice)} / unite</p>
                                    <small>Stock disponible : ${item.product.stock}</small>
                                </div>
                                <label>
                                    <span>Quantite</span>
                                    <input type="number" name="${escapeHtml(item.product.id)}" min="0" max="${item.product.stock}" value="${item.quantity}">
                                    <small>0 retire la ligne</small>
                                </label>
                                <strong>${money(item.lineTotal)}</strong>
                            </article>
                        `).join('')}
                    </div>

                    <div class="cart-actions">
                        <button class="button button-muted" type="submit">Mettre a jour</button>
                    </div>
                </form>

                <form class="cart-clear-form" action="#" data-cart-clear>
                    <button class="button button-muted" type="submit">Vider le panier</button>
                </form>

                <aside class="order-summary">
                    <h2>Resume</h2>
                    <dl>
                        <div>
                            <dt>Sous-total</dt>
                            <dd>${money(current.subtotal)}</dd>
                        </div>
                        <div>
                            <dt>TVA ${current.taxRate}%</dt>
                            <dd>${money(current.tax)}</dd>
                        </div>
                        <div class="summary-total">
                            <dt>Total</dt>
                            <dd>${money(current.total)}</dd>
                        </div>
                    </dl>
                    <a class="button button-red" href="commande.html">Finaliser le paiement</a>
                    <a class="summary-link" href="index.html">Continuer les achats</a>
                </aside>
            </div>
        `;
    }

    function renderCheckoutSummary() {
        const target = document.querySelector('[data-checkout-summary]');

        if (!target) {
            return;
        }

        const current = summary();

        if (current.items.length === 0) {
            target.innerHTML = `
                <div class="checkout-empty">
                    <h2>Commande</h2>
                    <p class="payment-note">Votre panier est vide. Ajoutez un article avant de finaliser la commande.</p>
                    <a class="button button-red" href="index.html">Retour au catalogue</a>
                </div>
            `;
            document.querySelector('[data-checkout-form] button[type="submit"]')?.setAttribute('disabled', 'disabled');
            return;
        }

        target.innerHTML = `
            <h2>Commande</h2>
            <div class="summary-lines">
                ${current.items.map((item) => `
                    <div>
                        <span>${escapeHtml(item.product.name)} x ${item.quantity}</span>
                        <strong>${money(item.lineTotal)}</strong>
                    </div>
                `).join('')}
            </div>
            <dl>
                <div>
                    <dt>Sous-total</dt>
                    <dd>${money(current.subtotal)}</dd>
                </div>
                <div>
                    <dt>TVA ${current.taxRate}%</dt>
                    <dd>${money(current.tax)}</dd>
                </div>
                <div class="summary-total">
                    <dt>Total a payer</dt>
                    <dd>${money(current.total)}</dd>
                </div>
            </dl>
        `;
    }

    function paymentLabel(mode) {
        return {
            mobile_money: 'Mobile Money',
            carte: 'Carte bancaire',
            especes: 'Paiement a la livraison',
            virement: 'Virement bancaire',
            cheque: 'Cheque',
        }[mode] || 'Non renseigne';
    }

    function renderSuccess() {
        const target = document.querySelector('[data-success-view]');

        if (!target) {
            return;
        }

        const order = readJson(ORDER_KEY, null);

        if (!order) {
            target.innerHTML = `
                <div class="flow-heading">
                    <span>Aucune commande</span>
                    <h1>Panier en attente</h1>
                    <p>Aucune facture recente n est disponible dans ce navigateur.</p>
                </div>
                <div class="empty-cart">
                    <h2>Reprendre le catalogue</h2>
                    <p>Ajoutez des produits puis finalisez le paiement pour generer une confirmation.</p>
                    <a class="button button-red" href="index.html">Retour au catalogue</a>
                </div>
            `;
            return;
        }

        target.innerHTML = `
            <div class="flow-heading">
                <span>Commande confirmee</span>
                <h1>Facture ${escapeHtml(order.number)}</h1>
                <p>La vente est enregistree, le stock a ete mis a jour et le PDF est disponible.</p>
            </div>

            <div class="success-panel">
                <div class="success-summary">
                    <h2>Resume du paiement</h2>
                    <dl>
                        <div>
                            <dt>Client</dt>
                            <dd>${escapeHtml(order.customer.name)} ${escapeHtml(order.customer.firstname || '')}</dd>
                        </div>
                        <div>
                            <dt>Statut</dt>
                            <dd>${escapeHtml(order.status)}</dd>
                        </div>
                        <div>
                            <dt>Mode</dt>
                            <dd>${escapeHtml(paymentLabel(order.paymentMode))}</dd>
                        </div>
                        <div class="summary-total">
                            <dt>Total TTC</dt>
                            <dd>${money(order.summary.total)}</dd>
                        </div>
                    </dl>
                </div>

                <div class="success-actions">
                    <button class="button button-red" type="button" data-print-invoice>Telecharger la facture PDF</button>
                    <a class="button button-muted" href="index.html">Retour au catalogue</a>
                    <a class="summary-link" href="#">Voir dans la gestion</a>
                </div>
            </div>
        `;
    }

    function bindForms() {
        document.querySelectorAll('.product-cart-form').forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const card = form.closest('[data-product-card]');
                const product = productIndex[card?.dataset.productId];

                if (!product) {
                    return;
                }

                const cart = readCart();
                const nextQuantity = Math.min((cart[product.id] || 0) + 1, product.stock);
                cart[product.id] = nextQuantity;
                writeCart(cart);
                animateCart();
                showToast(`${product.name} ajoute au panier`);
            });
        });

        document.addEventListener('submit', (event) => {
            const updateForm = event.target.closest('[data-cart-update]');
            const clearForm = event.target.closest('[data-cart-clear]');
            const checkoutForm = event.target.closest('[data-checkout-form]');
            const requestForm = event.target.closest('[data-request-form]');

            if (updateForm) {
                event.preventDefault();
                const nextCart = {};

                updateForm.querySelectorAll('input[type="number"]').forEach((input) => {
                    const product = productIndex[input.name];
                    const quantity = Math.max(0, Math.min(Number(input.value || 0), product?.stock || 0));

                    if (product && quantity > 0) {
                        nextCart[product.id] = quantity;
                    }
                });

                writeCart(nextCart);
                renderCart();
                showToast('Panier mis a jour');
            }

            if (clearForm) {
                event.preventDefault();
                writeCart({});
                renderCart();
                showToast('Panier vide');
            }

            if (checkoutForm) {
                event.preventDefault();
                const current = summary();

                if (current.items.length === 0) {
                    showToast('Votre panier est vide');
                    return;
                }

                const formData = new FormData(checkoutForm);
                const paymentMode = formData.get('mode_paiement');
                const number = `FW-${Date.now().toString().slice(-8)}`;
                const order = {
                    number,
                    status: ['mobile_money', 'carte'].includes(paymentMode) ? 'Payee' : 'Impayee',
                    paymentMode,
                    customer: {
                        name: formData.get('client_nom') || '',
                        firstname: formData.get('client_prenom') || '',
                        phone: formData.get('client_telephone') || '',
                        email: formData.get('client_email') || '',
                        address: formData.get('client_adresse') || '',
                    },
                    summary: current,
                    createdAt: new Date().toISOString(),
                };

                localStorage.setItem(ORDER_KEY, JSON.stringify(order));
                writeCart({});
                window.location.href = 'succes.html';
            }

            if (requestForm) {
                event.preventDefault();
                requestForm.reset();
                showToast('Demande envoyee');
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-print-invoice]')) {
                window.print();
            }
        });
    }

    renderHome();
    renderCart();
    renderCheckoutSummary();
    renderSuccess();
    updateCartCount();
    bindForms();
})();
