// Validador de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

// Evento ao terminar de digitar o CPF
document.getElementById('cpf').addEventListener('input', function () {
    const cpfInput = this.value;
    const buscarBtn = document.getElementById('buscarBtn');
    const cpfError = document.getElementById('cpfError');

    // Formata o CPF enquanto digita
    this.value = cpfInput
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o traço

    if (this.value.length === 14) {
        // CPF completamente preenchido
        if (validarCPF(this.value)) {
            buscarBtn.disabled = false;
            cpfError.style.display = 'none';
        } else {
            buscarBtn.disabled = true;
            cpfError.style.display = 'block';
        }
    } else {
        buscarBtn.disabled = true;
        cpfError.style.display = 'none';
    }
});

// Simulação de um "banco de dados" local para exemplo
const bancoDeDados = {
    "04041083001": {
        nome: "Anderson Santos da Silva",
        dataNascimento: "20/03/1997"
    }
};

function buscarCadastro() {
    const cpfFormatado = document.getElementById("cpf").value;
    const cpf = cpfFormatado.replace(/\D/g, ''); // Remove a formatação
    const resultado = bancoDeDados[cpf]; // Busca no banco de dados usando o CPF sem formatação

    if (resultado) {
        document.getElementById("nome").textContent = resultado.nome;
        document.getElementById("dataNascimento").textContent = resultado.dataNascimento;
        document.getElementById("result").style.display = "block";
    } else {
        alert("Cadastro não encontrado para o CPF informado.");
        document.getElementById("result").style.display = "none";
    }
}
