function convertToASCII(msg) {
  if (typeof msg !== 'string') {
    msg = String(msg || '');
  }
  return msg
    .split('')
    .map((char) => char.charCodeAt(0))
    .join(' ');
}

function deconstructASCII(msg) {
  if (typeof msg !== 'string') {
    msg = String(msg || '');
  }
  return msg
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((code) => String.fromCharCode(Number(code)))
    .join('');
}

function encodeCeasarCipher(msg, shift) {
  if (typeof msg !== 'string') msg = String(msg || '');
  const s = ((Number(shift) % 26) + 26) % 26;
  return msg
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const code = char.charCodeAt(0) - 97;
        return String.fromCharCode(((code + s) % 26) + 97);
      }
      if (/[A-Z]/.test(char)) {
        const code = char.charCodeAt(0) - 65;
        return String.fromCharCode(((code + s) % 26) + 65);
      }
      return char;
    })
    .join('');
}

function decodeCeasarCipher(msg, shift) {
  return encodeCeasarCipher(msg, -Number(shift || 0));
}

function generateSubstitutionKey() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = alphabet.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
  }
  return alphabet.join('');
}

function encodeSubstitutionCipher(msg, key) {
  if (typeof msg !== 'string') msg = String(msg || '');
  const normalizedKey = String(key || '').toUpperCase();
  if (normalizedKey.length !== 26 || !/^[A-Z]+$/.test(normalizedKey)) {
    throw new Error('Key must contain exactly 26 letters.');
  }

  return msg
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const index = char.toUpperCase().charCodeAt(0) - 65;
        const encoded = normalizedKey[index];
        return encoded.toLowerCase();
      }
      if (/[A-Z]/.test(char)) {
        const index = char.charCodeAt(0) - 65;
        return normalizedKey[index];
      }
      return char;
    })
    .join('');
}

function decodeSubstitutionCipher(msg, key) {
  if (typeof msg !== 'string') msg = String(msg || '');
  const normalizedKey = String(key || '').toUpperCase();
  if (normalizedKey.length !== 26 || !/^[A-Z]+$/.test(normalizedKey)) {
    throw new Error('Key must contain exactly 26 letters.');
  }

  return msg
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const index = normalizedKey.indexOf(char.toUpperCase());
        if (index === -1) throw new Error('Character not found in substitution key.');
        return String.fromCharCode(65 + index).toLowerCase();
      }
      if (/[A-Z]/.test(char)) {
        const index = normalizedKey.indexOf(char);
        if (index === -1) throw new Error('Character not found in substitution key.');
        return String.fromCharCode(65 + index);
      }
      return char;
    })
    .join('');
}

function encodeAtbashCipher(msg, shift = 0) {
  if (typeof msg !== 'string') msg = String(msg || '');
  const s = ((Number(shift) % 26) + 26) % 26;
  return msg
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const base = 'a'.charCodeAt(0);
        const idx = char.charCodeAt(0) - base;
        const swapped = 25 - idx;
        return String.fromCharCode(base + ((swapped + s) % 26));
      }
      if (/[A-Z]/.test(char)) {
        const base = 'A'.charCodeAt(0);
        const idx = char.charCodeAt(0) - base;
        const swapped = 25 - idx;
        return String.fromCharCode(base + ((swapped + s) % 26));
      }
      return char;
    })
    .join('');
}

function decodeAtbashCipher(msg, shift) {
  return encodeAtbashCipher(msg, -Number(shift || 0));
}

function attachCopyHandlers() {
  document.querySelectorAll('.copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.value || '');
        const prev = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = prev;
        }, 1000);
      } catch (error) {
        button.textContent = 'Copy failed';
      }
    });
  });
}

function setOutput(id, value) {
  const field = document.getElementById(id);
  if (field) field.value = value;
}

function setupHandlers() {
  document.querySelector('[data-action="ascii-encode"]').addEventListener('click', () => {
    const input = document.getElementById('ascii-input').value;
    setOutput('ascii-output', convertToASCII(input));
  });

  document.querySelector('[data-action="ascii-decode"]').addEventListener('click', () => {
    const input = document.getElementById('ascii-decode-input').value;
    setOutput('ascii-decode-output', deconstructASCII(input));
  });

  document.querySelector('[data-action="caesar-encode"]').addEventListener('click', () => {
    const input = document.getElementById('caesar-input').value;
    const shift = document.getElementById('caesar-shift').value;
    setOutput('caesar-output', encodeCeasarCipher(input, shift));
  });

  document.querySelector('[data-action="caesar-decode"]').addEventListener('click', () => {
    const input = document.getElementById('caesar-input').value;
    const shift = document.getElementById('caesar-shift').value;
    setOutput('caesar-output', decodeCeasarCipher(input, shift));
  });

  document.querySelector('[data-action="sub-encode"]').addEventListener('click', () => {
    const input = document.getElementById('sub-input').value;
    const key = document.getElementById('sub-key').value;
    try {
      setOutput('sub-output', encodeSubstitutionCipher(input, key));
    } catch (error) {
      setOutput('sub-output', error.message);
    }
  });

  document.querySelector('[data-action="sub-decode"]').addEventListener('click', () => {
    const input = document.getElementById('sub-input').value;
    const key = document.getElementById('sub-key').value;
    try {
      setOutput('sub-output', decodeSubstitutionCipher(input, key));
    } catch (error) {
      setOutput('sub-output', error.message);
    }
  });

  document.getElementById('generate-key').addEventListener('click', () => {
    document.getElementById('sub-key').value = generateSubstitutionKey();
  });

  document.querySelector('[data-action="atbash-encode"]').addEventListener('click', () => {
    const input = document.getElementById('atbash-input').value;
    const shift = document.getElementById('atbash-shift').value;
    setOutput('atbash-output', encodeAtbashCipher(input, shift));
  });

  document.querySelector('[data-action="atbash-decode"]').addEventListener('click', () => {
    const input = document.getElementById('atbash-input').value;
    const shift = document.getElementById('atbash-shift').value;
    setOutput('atbash-output', decodeAtbashCipher(input, shift));
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    attachCopyHandlers();
    setupHandlers();
  });
}

if (typeof module !== 'undefined') {
  module.exports = {
    convertToASCII,
    deconstructASCII,
    encodeCeasarCipher,
    decodeCeasarCipher,
    generateSubstitutionKey,
    encodeSubstitutionCipher,
    decodeSubstitutionCipher,
    encodeAtbashCipher,
    decodeAtbashCipher
  };
}
