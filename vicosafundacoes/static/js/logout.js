// Define o tempo limite em milissegundos (1 minuto)
var timeoutInMilliseconds = 60000;

// Variável para armazenar o temporizador de logout
var logoutTimer;

// Função para reiniciar o temporizador de logout
function resetLogoutTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(function() {
        window.location.href = "{% url 'vicosafundacoes:user-logout' %}"; // Substitua "/caminho-para-seu-logout" pelo caminho real para sua função de logout
    }, timeoutInMilliseconds);
}

// Adiciona ouvintes de evento para reiniciar o temporizador de logout em eventos de atividade do usuário
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);

// Inicia o temporizador de logout
resetLogoutTimer();
