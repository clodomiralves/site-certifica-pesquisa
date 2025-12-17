document.addEventListener("DOMContentLoaded", function() {
    // --- 1. MENU E NAVEGAÇÃO (Mantido igual) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll("a[href^=\"#\"]").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
                
                if (navMenu.classList.contains("active")) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                }
            }
        });
    });

    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- 2. MODAL E LÓGICA DO WHATSAPP (Alterado) ---

    // Botões que abrem o modal
    const ctaButtons = document.querySelectorAll(".cta-button, .quote-cta");
    ctaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            showContactModal();
        });
    });

    function closeModal() {
        const modal = document.getElementById("contactModal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    
    function showContactModal() {
        let modal = document.getElementById("contactModal");
        if (!modal) {
            modal = createContactModal();
            document.body.appendChild(modal);
        }
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    // Cria o HTML do Modal
    function createContactModal() {
        const modal = document.createElement("div");
        modal.id = "contactModal";
        // REMOVIDO: action e method do form, pois usaremos JS puro
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Solicitar Proposta Gratuita</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <form class="contact-form whatsapp-form">
                        <div class="form-group">
                            <label for="modal-name">Nome Completo</label>
                            <input type="text" id="modal-name" name="Nome" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-email">E-mail</label>
                            <input type="email" id="modal-email" name="E-mail" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-phone">Telefone</label>
                            <input type="tel" id="modal-phone" name="Telefone" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-company">Empresa/Organização</label>
                            <input type="text" id="modal-company" name="Empresa/Organização">
                        </div>
                        <div class="form-group">
                            <label for="modal-service">Tipo de Serviço</label>
                            <select id="modal-service" name="Tipo de Serviço" required>
                                <option value="">Selecione um serviço</option>
                                <option value="Pesquisa Eleitoral">Pesquisa Eleitoral</option>
                                <option value="Pesquisa Digital">Pesquisa Digital</option>
                                <option value="Rastreamento Eleitoral">Rastreamento Eleitoral</option>
                                <option value="Pesquisa de Mercado">Pesquisa de Mercado</option>
                                <option value="Opinião Pública">Opinião Pública</option>
                                <option value="Consultoria Estratégica">Consultoria Estratégica</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modal-message">Mensagem</label>
                            <textarea id="modal-message" name="Mensagem" rows="4" placeholder="Descreva brevemente seu projeto ou necessidade..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">
                            <i class="fab fa-whatsapp"></i> Enviar via WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        const modalStyles = document.createElement("style");
        modalStyles.textContent = `
            #contactModal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; align-items: center; justify-content: center; }
            .modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; padding: 1rem; }
            .modal-content { background: #fff; border-radius: 12px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; animation: slide-up 0.4s ease-out; }
            @keyframes slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid #e5e7eb; }
            .modal-header h2 { color: #1e3a8a; margin: 0; font-size: 1.5rem; }
            .modal-close { background: none; border: none; font-size: 2rem; cursor: pointer; color: #64748b; }
            .contact-form { padding: 1rem 2rem 2rem; }
            .form-group { margin-bottom: 1.25rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151; }
            .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.8rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; }
            .submit-btn { width: 100%; background: #25D366; color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;}
            .submit-btn:hover { background: #128C7E; transform: translateY(-2px); }
        `;
        document.head.appendChild(modalStyles);
        
        modal.querySelector(".modal-close").addEventListener("click", closeModal);
        modal.querySelector(".modal-overlay").addEventListener("click", (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
        
        // Adiciona o evento de envio para o WhatsApp
        modal.querySelector(".contact-form").addEventListener("submit", handleWhatsappSubmit);
        
        return modal;
    }

    // --- NOVA FUNÇÃO DE ENVIO PARA WHATSAPP ---
function handleWhatsappSubmit(event) {
        event.preventDefault(); // Impede recarregamento da página
        const form = event.target;
        
        // Captura os dados
        const nome = form.querySelector('[name="Nome"]').value;
        const email = form.querySelector('[name="E-mail"]').value;
        const telefone = form.querySelector('[name="Telefone"]').value; 
        const empresa = form.querySelector('[name="Empresa/Organização"]').value;
        const servico = form.querySelector('[name="Tipo de Serviço"]').value;
        const mensagem = form.querySelector('[name="Mensagem"]').value;

        // Número da empresa
        const numeroDestino = "5583988537311";

        // CORREÇÃO AQUI: Trocamos %0A por \n
        let texto = `*NOVO CONTATO VIA SITE*\n\n` +
                    `*Nome:* ${nome}\n` +
                    `*Email:* ${email}\n` +
                    `*Telefone:* ${telefone}\n` +
                    `*Empresa:* ${empresa}\n` +
                    `*Interesse:* ${servico}\n` +
                    `*Mensagem:* ${mensagem}`;

        // Cria o link
        const url = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(texto)}`;

        // Abre o WhatsApp
        window.open(url, '_blank');

        // Limpa o formulário e fecha o modal se necessário
        form.reset();
        if(form.closest('#contactModal')) {
            closeModal();
        }
    }

    // Configura o formulário PRINCIPAL (do rodapé) para usar a mesma função
    const mainContactForm = document.querySelector(".main-contact-form");
    if (mainContactForm) {
        mainContactForm.addEventListener("submit", handleWhatsappSubmit);
    }
    
    // --- 3. ANIMAÇÕES E CONTADORES (Mantido igual) ---
    function animateCounters() {
        const counters = document.querySelectorAll(".number-value");
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            const increment = target / 100;
            let current = 0;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }

    const numbersSection = document.querySelector(".numbers");
    if (numbersSection) {
        const numbersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    numbersObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        numbersObserver.observe(numbersSection);
    }
});