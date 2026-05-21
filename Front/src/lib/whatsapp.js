export function gerarLinkWhatsapp(telefone, mensagem) {
  const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(link, '_blank');
}