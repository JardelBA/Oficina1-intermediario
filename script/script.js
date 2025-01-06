// Função para validar o formulário de contato
function validateForm() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    // Validação simples de email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }

    // Validação para garantir que o nome e a mensagem não estejam vazios
    if (name.trim() === '') {
        alert('Por favor, insira seu nome.');
        return false;
    }

    alert('Mensagem enviada com sucesso!');
    return true;
}

/* CARROSEL */
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
};

// Função para mostrar mais artigos
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const extraArticles = document.querySelectorAll('.extra-article');
    let isHidden = true;

    loadMoreBtn.addEventListener('click', function() {
        if (isHidden) {
            // Mostra apenas os artigos extras
            extraArticles.forEach(article => {
                article.style.display = 'block';
            });
            loadMoreBtn.textContent = 'Mostrar Menos';
        } else {
            // Oculta os artigos extras
            extraArticles.forEach(article => {
                article.style.display = 'none';
            });
            loadMoreBtn.textContent = 'Carregar Mais';
        }
        isHidden = !isHidden;
    });
});

/* PAGINA CALCULAR*/
function calculateIMC() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const resultElement = document.getElementById('result');

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      resultElement.textContent = 'Por favor, insira valores válidos para peso e altura.';
      return;
    }

    const imc = weight / (height * height);
    let classification = '';

    if (imc < 18.5) {
      classification = 'Abaixo do peso';
    } else if (imc < 24.9) {
      classification = 'Peso normal';
    } else if (imc < 29.9) {
      classification = 'Sobrepeso';
    } else if (imc < 34.9) {
      classification = 'Obesidade grau I';
    } else if (imc < 39.9) {
      classification = 'Obesidade grau II';
    } else {
      classification = 'Obesidade grau III';
    }

    resultElement.textContent = `Seu IMC é ${imc.toFixed(2)} (${classification}).`;
  };

  function calcularTMB() {
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
  
    let tmb;
  
    if (sexo === 'M') {
      tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
      tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
  
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Sua TMB é de aproximadamente ${tmb.toFixed(2)} calorias.`;
  };

  function calcularAgua() {
    const peso = document.getElementById("peso").value;
    const aguaPorKg = 30; // Ajuste este valor conforme necessário
    const aguaDiaria = peso * aguaPorKg;
  
    document.getElementById("valor").textContent = `Você precisa beber cerca de ${aguaDiaria}ml de água por dia.`;
  };
  
  /* PAGINA CONTATO */
  function validateForm() {
    // Busca todos os elementos de formulário
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Reseta qualquer mensagem de erro existente
    clearErrors();
    
    let isValid = true;

    // validação de nome (pelo menos 2 caractere, somente letras)
    if (name.value.trim().length < 2 || !/^[a-zA-Z\s]*$/.test(name.value)) {
        showError(name, 'Nome deve conter pelo menos 2 caracteres e apenas letras');
        isValid = false;
    }

    // validação de email
    if (!isValidEmail(email.value)) {
        showError(email, 'Por favor, insira um email válido');
        isValid = false;
    }

    // Validação de escolha
    if (subject.value === '') {
        showError(subject, 'Por favor, selecione um assunto');
        isValid = false;
    }

    // Validação de mensagem (minimo de 10 caracteres)
    if (message.value.trim().length < 10) {
        showError(message, 'A mensagem deve conter pelo menos 10 caracteres');
        isValid = false;
    }

    if (isValid) {
        // mostra mensagem de sucesso
        showSuccessMessage();
        alert('Enviado com sucesso!');
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    formGroup.classList.add('error');
}

function clearErrors() {
    // Remove todas as mensagens de erro
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Remove error class from form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Mensagem enviada com sucesso!';
    form.insertBefore(successDiv, form.firstChild);

    // Remove mensagem de sucesso depois de 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            //Remove erros quando o usuario começa a digitar
            const formGroup = this.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
                formGroup.classList.remove('error');
            }
        });
    });
});

function validateField(input) {
    clearErrors();
    
    switch(input.id) {
        case 'name':
            if (input.value.trim().length < 2 || !/^[a-zA-Z\s]*$/.test(input.value)) {
                showError(input, 'Nome deve conter pelo menos 2 caracteres e apenas letras');
            }
            break;
            
        case 'email':
            if (!isValidEmail(input.value)) {
                showError(input, 'Por favor, insira um email válido');
            }
            break;
            
        case 'subject':
            if (input.value === '') {
                showError(input, 'Por favor, selecione um assunto');
            }
            break;
            
        case 'message':
            if (input.value.trim().length < 10) {
                showError(input, 'A mensagem deve conter pelo menos 10 caracteres');
            }
            break;
    }
}

