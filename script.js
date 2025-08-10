const passwordDisplay = document.getElementById('passwordDisplay');
const lengthInput = document.getElementById('lengthInput');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const message = document.getElementById('message');

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

function getCharset() {
  let charset = '';
  if (includeUppercase.checked) charset += CHARSETS.upper;
  if (includeLowercase.checked) charset += CHARSETS.lower;
  if (includeNumbers.checked) charset += CHARSETS.numbers;
  if (includeSymbols.checked) charset += CHARSETS.symbols;
  return charset;
}

function generatePassword() {
  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 6 || length > 64) {
    showMessage('La longitud debe ser entre 6 y 64.');
    return '';
  }

  const charset = getCharset();
  if (!charset) {
    showMessage('Selecciona al menos un tipo de carácter.');
    return '';
  }

  return Array.from({ length }, () =>
    charset.charAt(Math.floor(Math.random() * charset.length))
  ).join('');
}

function showMessage(text) {
  message.textContent = text;
  message.classList.add('show');
  setTimeout(() => message.classList.remove('show'), 2000);
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep() {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

generateBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  if (pwd) {
    passwordDisplay.textContent = pwd;
    copyBtn.disabled = false;
    showMessage('Contraseña generada.');

    passwordDisplay.classList.add('flash');
    setTimeout(() => passwordDisplay.classList.remove('flash'), 400);
  }
});

copyBtn.addEventListener('click', () => {
  const pwd = passwordDisplay.textContent;
  if (pwd && pwd !== 'Tu contraseña aparecerá aquí') {
    navigator.clipboard.writeText(pwd)
      .then(() => {
        showMessage('Contraseña copiada.');
        playBeep();
        passwordDisplay.classList.add('flash');
        setTimeout(() => passwordDisplay.classList.remove('flash'), 400);
      })
      .catch(() => {
        showMessage('Error al copiar.');
      });
  }
});
