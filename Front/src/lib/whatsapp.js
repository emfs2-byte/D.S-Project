export function gerarLinkWhatsApp(telefone, mensagem) {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const link = `https://wa.me/${telefoneLimpo}?text=${encodeURIComponent(mensagem)}`;
    
    // O clique do usuário no botão do modal disparará este window.open
    window.open(link, '_blank');
}