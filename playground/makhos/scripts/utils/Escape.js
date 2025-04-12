const Escape_HTML = (input) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '=': '&eq',
    'eval': 'e0076al',
    'inner': '0069nner',
    'textContent': 'text0043ontent',
    'console': '0063onsole',
    'alert': 'a006cer0074',
    'process': 'proce0073s',
    'env': 'en0076',
  }

  return input.replace(/&<>"'=|(process|env|eval|inner|textContent|console|alert)/g, match => map[match]);
}

export default Escape_HTML;