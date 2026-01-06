const carrinho = []; 
const botoesComprar = document.querySelectorAll('.btn-comprar');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Formata o número como moeda €
function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

// Atualiza o carrinho na tela
function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(pizza => {
        const item = document.createElement('li');
        item.textContent = `${pizza.nome} - ${formatarPreco(pizza.preco)}`;
        listaCarrinho.appendChild(item);
        total += pizza.preco;
    });

    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
}

// Adiciona eventos aos botões
botoesComprar.forEach(botao => {
    botao.addEventListener('click', function () {
        const container = this.parentElement;
        const nomePizza = container.querySelector('.pizzas').textContent;
        const precoPizza = parseFloat(container.querySelector('.preco').textContent);

        carrinho.push({ nome: nomePizza, preco: precoPizza });
        atualizarCarrinho();

        // ✅ Mostra o carrinho ao clicar
        document.getElementById('carrinho').classList.add('ativo');
    });
});

const botaoFinalizar = document.querySelector('.btn-finalizar');
botaoFinalizar.addEventListener('click', () => {
    alert("Obrigado pela sua compra! 😄");
    carrinho.length = 0; // esvazia o array
    atualizarCarrinho();
    document.getElementById('carrinho').classList.remove('ativo');
});

// 🍕 Pizzas - Mostra todas as pizzas ao clicar na nav
const linkPizzaSorte = document.getElementById('pizza-sorte-link');
const secaoSorte = document.getElementById('pizza-da-sorte');
const containerSorte = document.querySelector('.pizzas-sorte-container');

linkPizzaSorte.addEventListener('click', (e) => {
    e.preventDefault(); // Evita comportamento padrão do link

    // Limpa conteúdo anterior
    containerSorte.innerHTML = '';

    // Seleciona todas as pizzas das secções originais
    const pizzas = document.querySelectorAll('.fila1 > div, .fila2 > div');

    pizzas.forEach(pizza => {
        const clone = pizza.cloneNode(true);

        // Atualiza o botão para funcionar no clone
        const botao = clone.querySelector('.btn-comprar');
        botao.addEventListener('click', function () {
            const nomePizza = clone.querySelector('.pizzas').textContent;
            const precoPizza = parseFloat(clone.querySelector('.preco').textContent);

            carrinho.push({ nome: nomePizza, preco: precoPizza });
            atualizarCarrinho();
            document.getElementById('carrinho').classList.add('ativo');
        });

        containerSorte.appendChild(clone);
    });

    secaoSorte.classList.add('mostrar');
});

// 🍕 Fecha a secção
function fecharPizzaSorte() {
    secaoSorte.classList.remove('mostrar');
}
linkPizzaSorte.addEventListener('click', (e) => {
    e.preventDefault();

    // Evitar scroll da página principal
    document.body.style.overflow = 'hidden';

    containerSorte.innerHTML = '';

    const pizzas = document.querySelectorAll('.fila1 > div, .fila2 > div');

    pizzas.forEach(pizza => {
        const clone = pizza.cloneNode(true);

        const botao = clone.querySelector('.btn-comprar');
        botao.addEventListener('click', function () {
            const nomePizza = clone.querySelector('.pizzas').textContent;
            const precoPizza = parseFloat(clone.querySelector('.preco').textContent);

            carrinho.push({ nome: nomePizza, preco: precoPizza });
            atualizarCarrinho();
            document.getElementById('carrinho').classList.add('ativo');
        });

        containerSorte.appendChild(clone);
    });

    secaoSorte.classList.add('mostrar');
});

// Fecha a secção e libera scroll da página
function fecharPizzaSorte() {
    secaoSorte.classList.remove('mostrar');
    document.body.style.overflow = 'auto';
}