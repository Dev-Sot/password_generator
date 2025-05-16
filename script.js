const passwordDisplay = document.getElementById('passwordDisplay');
const lengthInput = document.getElementById('lengthInput');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const message = document.getElementById('message');

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

function generatePassword() {
  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 6 || length > 64) {
    showMessage('La longitud debe ser entre 6 y 64.');
    return '';
  }

  let charset = '';
  if (includeUppercase.checked) charset += UPPERCASE;
  if (includeLowercase.checked) charset += LOWERCASE;
  if (includeNumbers.checked) charset += NUMBERS;
  if (includeSymbols.checked) charset += SYMBOLS;

  if (!charset) {
    showMessage('Selecciona al menos un tipo de carácter.');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

function showMessage(text) {
  message.textContent = text;
  message.classList.add('show');
  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
}

function playBeep() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    showMessage('Contraseña generada correctamente.');

    // Flash al generar contraseña
    passwordDisplay.classList.add('flash');
    setTimeout(() => passwordDisplay.classList.remove('flash'), 400);
  }
});

copyBtn.addEventListener('click', () => {
  const pwd = passwordDisplay.textContent;
  if (pwd && pwd !== 'Tu contraseña aparecerá aquí') {
    navigator.clipboard.writeText(pwd).then(() => {
      showMessage('Contraseña copiada al portapapeles 📋');
      playBeep();

      // Efecto flash en el campo contraseña
      passwordDisplay.classList.add('flash');
      setTimeout(() => passwordDisplay.classList.remove('flash'), 400);
    }).catch(() => {
      showMessage('Error al copiar, inténtalo manualmente.');
    });
  }
});
