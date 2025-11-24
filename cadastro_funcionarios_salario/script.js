// Mostra/oculta campo "Outro país"
document.getElementById('pais').addEventListener('change', function () {
    const container = document.getElementById('pais-outro-container');
    if (this.value === 'EX') {
        container.classList.remove('hidden');
        document.getElementById('pais_outro').required = true;
    } else {
        container.classList.add('hidden');
        document.getElementById('pais_outro').required = false;
        document.getElementById('pais_outro').value = '';
    }
});

// Função principal do cálculo
function calcularSalarioLiquido() {
    const nome = document.getElementById('nome').value.trim();
    const salarioBrutoInput = document.getElementById('salario_bruto').value;

    if (!nome) {
        alert('Por favor, preencha o nome.');
        return;
    }

    if (!salarioBrutoInput) {
        alert('Por favor, informe o salário bruto.');
        return;
    }

    const salarioBruto = parseFloat(salarioBrutoInput);
    if (isNaN(salarioBruto) || salarioBruto < 0) {
        alert('Salário bruto inválido.');
        return;
    }

    const VT = 0.02;
    const VA = 0.05;
    const PS = 0.10;

    const totalDescontos = salarioBruto * (VT + VA + PS);
    const salarioLiquido = salarioBruto - totalDescontos;

    const fmt = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    document.getElementById('resultado').innerHTML = `
        <strong>Nome do funcionário:</strong> ${escapeHtml(nome)}<br>
        <strong>Salário Bruto:</strong> ${fmt.format(salarioBruto)}<br>
        <strong>Valor total dos descontos:</strong> ${fmt.format(totalDescontos)}<br>
        <strong>Salário Líquido final:</strong> ${fmt.format(salarioLiquido)}
    `;
}

// Evita injeção de HTML (segurança)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
}