// Array para armazenar os itens do carrinho
let cart = [];

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Limpar carrinho exibido
    cartItems.innerHTML = '';

    // Calcular o total
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    // Exibir o preço total
    totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

// Função para finalizar a compra
function finalizePurchase() {
    document.getElementById('payment-info').style.display = 'block';
    document.querySelector('.checkout-form').style.display = 'block';
}

// Função para enviar o pedido via WhatsApp
function sendOrderWhatsApp() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    let paymentMethod = '';

    // Definir o método de pagamento selecionado
    if (payment === 'pix') {
        paymentMethod = 'Pix';
    } else if (payment === 'cartao') {
        paymentMethod = 'Cartão de Crédito';
    } else {
        paymentMethod = 'Dinheiro';
    }

    // Montar a mensagem para envio via WhatsApp
    let message = `*Pedido de ${name}*\n`;
    message += `Endereço: ${address}\n`;
    message += `Forma de pagamento: ${paymentMethod}\n\n`;
    message += `*Itens do Carrinho:*\n`;

    cart.forEach(item => {
        message += `- ${item.name}: R$ ${item.price.toFixed(2)}\n`;
    });

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `\nTotal: R$ ${total.toFixed(2)}`;

    // Criar link para WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=SEU_NUMERO&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl);
}

// Adicionar eventos aos botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productElement = button.closest('.product');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        addToCart(productName, productPrice);
    });
});

// Adicionar evento ao botão de finalizar compra
const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', finalizePurchase);

// Adicionar evento ao botão de enviar pedido via WhatsApp
const sendWhatsappButton = document.getElementById('send-whatsapp');
sendWhatsappButton.addEventListener('click', sendOrderWhatsApp);