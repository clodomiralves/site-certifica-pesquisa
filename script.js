// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // CTA Button Interactions to open Modal
    const ctaButtons = document.querySelectorAll('.cta-button, .quote-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showContactModal();
        });
    });

    // --- LOGICA DO FORMULÁRIO COM FORMSPREE ---

    // Função para fechar o modal
    function closeModal() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Função para mostrar o modal
    function showContactModal() {
        let modal = document.getElementById('contactModal');
        if (!modal) {
            modal = createContactModal();
            document.body.appendChild(modal);
        }
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Função para criar a estrutura HTML do modal dinamicamente
    function createContactModal() {
        const modal = document.createElement('div');
        modal.id = 'contactModal';
        // O formulário abaixo já está configurado para o Formspree. Lembre-se de colocar sua URL no 'action'.
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Solicitar Proposta Gratuita</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <form action="https://formspree.io/f/xvgqaypg" method="POST" class="contact-form">
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
                        <button type="submit" class="submit-btn">Enviar Solicitação</button>
                        <p class="form-status"></p> </form>
                </div>
            </div>
        `;
        
        // Adiciona os estilos do modal (seu CSS original era injetado aqui, vamos manter essa boa prática)
        const modalStyles = document.createElement('style');
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
            .submit-btn { width: 100%; background: #2563eb; color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
            .submit-btn:hover { background: #1d4ed8; transform: translateY(-2px); }
            .submit-btn:disabled { background-color: #9ca3af; cursor: not-allowed; }
            .form-status { margin-top: 1rem; text-align: center; }
        `;
        document.head.appendChild(modalStyles);
        
        // Adiciona os eventos para fechar o modal e submeter o formulário
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
        modal.querySelector('.contact-form').addEventListener('submit', handleFormSubmit);
        
        return modal;
    }

    // Função unificada para lidar com a submissão de AMBOS os formulários
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const statusElement = form.querySelector('.form-status');
        const originalButtonText = submitButton.textContent;

        const formData = new FormData(form);

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        if (statusElement) statusElement.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (statusElement) statusElement.textContent = 'Mensagem enviada com sucesso!';
                else alert('Mensagem enviada com sucesso!');
                form.reset();
                setTimeout(() => {
                    closeModal(); // Fecha o modal se for o formulário do modal
                }, 2000);
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    const errorMessage = data["errors"].map(error => error["message"]).join(", ");
                     if (statusElement) statusElement.textContent = `Erro: ${errorMessage}`;
                     else alert(`Erro: ${errorMessage}`);
                } else {
                    throw new Error('Ocorreu um erro no servidor.');
                }
            }
        } catch (error) {
            console.error('Erro de submissão:', error);
            if (statusElement) statusElement.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
            else alert('Ocorreu um erro ao enviar. Tente novamente.');
        } finally {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                if (statusElement) statusElement.textContent = '';
            }, 3000);
        }
    }

    // Adiciona o listener para o formulário principal na seção de contato
    const mainContactForm = document.querySelector('.main-contact-form');
    if (mainContactForm) {
        // Adiciona um elemento para status no formulário principal também
        const statusP = document.createElement('p');
        statusP.className = 'form-status';
        mainContactForm.appendChild(statusP);
        
        mainContactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Animações e outros scripts que você já tinha...
    // (O restante do seu script original pode vir aqui, como animações de scroll, etc.)
});