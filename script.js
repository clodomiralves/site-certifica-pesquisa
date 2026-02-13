document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MENU MOBILE (Toggle) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- 2. MODAL & WHATSAPP (Lógica Centralizada) ---
    const modal = document.getElementById("contactModal");
    const openBtns = document.querySelectorAll(".js-open-modal");
    const closeBtn = document.querySelector(".modal-close");
    const overlay = document.querySelector(".modal-overlay");

    // Função para abrir
    function openModal() {
        if (modal) {
            modal.style.display = "flex";
            // Pequeno delay para permitir transição CSS
            setTimeout(() => modal.classList.add("active"), 10);
            document.body.style.overflow = "hidden"; // Trava scroll
        }
    }

    // Função para fechar
    function closeModal() {
        if (modal) {
            modal.classList.remove("active");
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 300);
        }
    }

    // Listeners
    openBtns.forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    }));

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);

    // --- 3. ENVIO DE FORMULÁRIO (WHATSAPP + MAKE) ---
    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector("button[type='submit']");
        
        // Dados
        const data = {
            nome: form.querySelector("[name='Nome']").value,
            telefone: form.querySelector("[name='Telefone']").value, // Campo unificado no JS
            email: form.querySelector("[name='Email']") ? form.querySelector("[name='Email']").value : "Não informado",
            servico: form.querySelector("[name='Servico']").value,
            mensagem: form.querySelector("[name='Mensagem']") ? form.querySelector("[name='Mensagem']").value : ""
        };

        // Feedback visual
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Enviando...";
        submitBtn.disabled = true;

        // 1. Webhook Make (Fire & Forget)
        fetch("https://hook.us1.make.celonis.com/1j3mrdwfk8ilrqfl5ibpwwriqbhlh31h", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, date: new Date().toISOString() })
        }).catch(e => console.log("Webhook error (ignorable):", e));

        // 2. WhatsApp Redirect
        const text = `*NOVO LEAD DO SITE*\n\n👤 *Nome:* ${data.nome}\n📱 *Tel:* ${data.telefone}\n📧 *Email:* ${data.email}\n🎯 *Interesse:* ${data.servico}\n💬 *Msg:* ${data.mensagem}`;
        const phone = "5583988537311";
        
        setTimeout(() => {
            window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
            form.reset();
            closeModal();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }

    // Attach submit listeners
    const mainForm = document.getElementById("mainContactForm");
    const modalForm = document.getElementById("modalForm");

    if (mainForm) mainForm.addEventListener("submit", handleFormSubmit);
    if (modalForm) modalForm.addEventListener("submit", handleFormSubmit);

    // --- 4. SCROLL ANIMATIONS (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target); // Anima só uma vez
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. NUMBERS COUNTER ---
    const numbersSection = document.querySelector(".numbers");
    if (numbersSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll(".number-value").forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    const update = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    update();
                });
                observer.disconnect();
            }
        });
        observer.observe(numbersSection);
    }
});