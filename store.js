(function () {
    const categories = [
        { code: 'GEN', label: 'Sport general' },
        { code: 'DIA', label: 'Diastasis' },
        { code: 'PDS', label: 'Perte de poids' },
        { code: 'NUT', label: 'Nutrition' },
        { code: 'ENT', label: 'Entreprises' },
        { code: 'PUB', label: 'Sport public' },
        { code: 'DOM', label: 'Domicile' },
        { code: 'PLN', label: 'Plans personnalises' },
    ];

    const services = {
        diastasis: [
            {
                id: 'bilan-diastasis',
                name: 'Bilan diastasis abdominale',
                focus: 'Evaluation, respiration et reprise progressive',
                badge: 'Diastasis',
                image: 'https://images.unsplash.com/photo-1675026482188-8102367ecc16?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'renforcement-profond',
                name: 'Renforcement profond',
                focus: 'Gainage adapte, posture et controle du mouvement',
                badge: 'Technique',
                image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'reprise-post-partum',
                name: 'Reprise sportive post-partum',
                focus: 'Programme calme, progressif et personnalise',
                badge: 'Suivi',
                image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'posture-mobilite',
                name: 'Posture et mobilite',
                focus: 'Mobilite, respiration et prevention des douleurs',
                badge: 'Mobilite',
                image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=700&q=80',
            },
        ],
        poids: [
            {
                id: 'perte-poids-suivie',
                name: 'Perte de poids accompagnee',
                focus: 'Seances sportives, nutrition et suivi regulier',
                badge: 'Objectif',
                image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'cardio-progressif',
                name: 'Cardio progressif',
                focus: 'Endurance, depense energetique et recuperation',
                badge: 'Cardio',
                image: 'https://images.unsplash.com/photo-1675026482188-8102367ecc16?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'suivi-mensurations',
                name: 'Suivi mensurations',
                focus: 'Mesures simples, ajustements et motivation',
                badge: 'Controle',
                image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'remise-forme',
                name: 'Remise en forme durable',
                focus: 'Habitudes sportives realistes et maintien des resultats',
                badge: 'Durable',
                image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80',
            },
        ],
        entreprises: [
            {
                id: 'sport-entreprise',
                name: 'Sport en entreprise',
                focus: 'Seances pour le personnel et planning adapte',
                badge: 'Equipe',
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'programme-carfo',
                name: 'Programmes institutions',
                focus: 'Accompagnement type CARFO et autres structures',
                badge: 'CARFO',
                image: 'https://images.unsplash.com/photo-1526401485004-2fda9f4d61f3?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'sport-public',
                name: 'Sport public',
                focus: 'Animations collectives, quartiers et evenements',
                badge: 'Public',
                image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'team-building-actif',
                name: 'Team building actif',
                focus: 'Cohesion, energie et prevention de la sedentarite',
                badge: 'Cohesion',
                image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80',
            },
        ],
        nutrition: [
            {
                id: 'coaching-nutrition',
                name: 'Coaching nutrition',
                focus: 'Conseils simples bases sur vos habitudes locales',
                badge: 'Nutrition',
                image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'plan-alimentaire',
                name: 'Plan alimentaire personnalise',
                focus: 'Repas, hydratation et rythme adaptes a l objectif',
                badge: 'Plan',
                image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'sport-domicile',
                name: 'Sport a domicile',
                focus: 'Seances chez vous avec ou sans materiel',
                badge: 'Domicile',
                image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=700&q=80',
            },
            {
                id: 'plan-sportif',
                name: 'Plan sportif personnalise',
                focus: 'Programme clair, progression et suivi de performance',
                badge: 'Sur mesure',
                image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80',
            },
        ],
    };

    const objectives = [
        { title: 'Perte de poids', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80' },
        { title: 'Diastasis', image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80' },
        { title: 'Nutrition', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80' },
        { title: 'Sport en entreprise', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85' },
        { title: 'Sport public', image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=80' },
        { title: 'Sport a domicile', image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80' },
    ];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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

    function serviceCard(service) {
        return `
            <article class="product-card" data-product-card data-product-id="${escapeHtml(service.id)}" data-product-name="${escapeHtml(service.name)}">
                ${service.badge ? `<span class="product-badge">${escapeHtml(service.badge)}</span>` : ''}
                <a class="product-image" href="#reservation">
                    <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.name)}">
                </a>
                <div class="product-info">
                    <h3>${escapeHtml(service.name)}</h3>
                    <div class="product-price">
                        <strong>${escapeHtml(service.focus)}</strong>
                    </div>
                    <a class="product-action" href="#reservation" aria-label="Demander ${escapeHtml(service.name)}">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>
                        </svg>
                        <span>Demander</span>
                    </a>
                </div>
            </article>
        `;
    }

    function renderHome() {
        const categoryGrid = document.querySelector('[data-category-grid]');

        if (categoryGrid) {
            categoryGrid.innerHTML = categories.map((category) => `
                <a class="category-card" href="#reservation">
                    <span>${escapeHtml(category.code)}</span>
                    <strong>${escapeHtml(category.label)}</strong>
                </a>
            `).join('');
        }

        document.querySelectorAll('[data-product-grid]').forEach((grid) => {
            const key = grid.dataset.productGrid;
            grid.innerHTML = (services[key] || []).map(serviceCard).join('');
        });

        document.querySelectorAll('[data-mini-products]').forEach((container) => {
            const key = container.dataset.miniProducts;
            container.innerHTML = (services[key] || []).slice(0, 3).map((service) => `
                <a class="mini-product" href="#reservation">
                    <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.name)}">
                    <span>${escapeHtml(service.name)}</span>
                    <strong>${escapeHtml(service.focus)}</strong>
                </a>
            `).join('');
        });

        const objectiveGrid = document.querySelector('[data-objective-grid]');

        if (objectiveGrid) {
            objectiveGrid.innerHTML = objectives.map((objective) => `
                <a class="objective-card" href="#reservation">
                    <img src="${escapeHtml(objective.image)}" alt="${escapeHtml(objective.title)}">
                    <span>${escapeHtml(objective.title)}</span>
                </a>
            `).join('');
        }

        const movementGrid = document.querySelector('[data-movement-grid]');

        if (movementGrid) {
            movementGrid.innerHTML = objectives.slice(0, 4).map((objective) => `
                <img src="${escapeHtml(objective.image)}" alt="${escapeHtml(objective.title)}">
            `).join('');
        }
    }

    function bindRequestForm() {
        document.addEventListener('submit', (event) => {
            const requestForm = event.target.closest('[data-request-form]');

            if (!requestForm) {
                return;
            }

            event.preventDefault();
            requestForm.reset();
            showToast('Demande envoyee');
        });
    }

    renderHome();
    bindRequestForm();
})();
