// Eski kayıtlardaki yalnızca dosya adı bilgisi, indirilebilir bağlantı olarak gösterilmez.
export function appendAttachments(container, attachments = []) {
  container.querySelector('[data-attachment-list]')?.remove();
  if (!attachments.length) return;
  const section = document.createElement('div');
  section.dataset.attachmentList = '';
  section.className = 'mt-3';
  const title = document.createElement('h3');
  title.className = 'h6 fw-semibold';
  title.textContent = 'Ekler';
  const list = document.createElement('ul');
  list.className = 'list-unstyled mb-0';
  for (const attachment of attachments) {
    if (!attachment?.name) continue;
    const item = document.createElement('li');
    item.className = 'mb-1';
    const valid = typeof attachment.dataUrl === 'string' &&
      ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(attachment.type) &&
      attachment.dataUrl.startsWith(`data:${attachment.type};base64,`) &&
      /^data:[^,]+;base64,[a-z0-9+/=]+$/i.test(attachment.dataUrl);
    if (valid) {
      const link = document.createElement('a');
      link.href = attachment.dataUrl;
      link.download = attachment.name;
      link.textContent = attachment.name;
      item.append(link);
    } else item.textContent = attachment.name;
    list.append(item);
  }
  section.append(title, list);
  container.append(section);
}
