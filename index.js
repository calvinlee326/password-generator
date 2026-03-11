const UPPER   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const LOWER   = "abcdefghijklmnopqrstuvwxyz".split('');
const DIGITS  = "0123456789".split('');
const SYMBOLS = `!@#$%^&*()_+-=[]{}|:;<>,./?'"` + "`~\\".split('');

const slider       = document.getElementById('lengthSlider');
const lengthVal    = document.getElementById('lengthValue');
const display      = document.getElementById('passwordDisplay');
const copyBtn      = document.getElementById('copyBtn');
const copyHint     = document.getElementById('copyHint');
const generateBtn  = document.getElementById('generateBtn');
const optUpper     = document.getElementById('optUpper');
const optLower     = document.getElementById('optLower');
const optNumbers   = document.getElementById('optNumbers');
const optSymbols   = document.getElementById('optSymbols');
const segments     = [1, 2, 3, 4].map(i => document.getElementById('seg' + i));
const strengthText = document.getElementById('strengthText');

slider.addEventListener('input', () => {
  lengthVal.textContent = slider.value;
});

function buildCharPool() {
  let pool = [];
  if (optUpper.checked)   pool = pool.concat(UPPER);
  if (optLower.checked)   pool = pool.concat(LOWER);
  if (optNumbers.checked) pool = pool.concat(DIGITS);
  if (optSymbols.checked) pool = pool.concat(SYMBOLS);
  return pool;
}

function generatePassword() {
  const pool = buildCharPool();
  if (pool.length === 0) {
    display.value = '';
    updateStrength(0);
    return;
  }
  const len = parseInt(slider.value, 10);
  let password = '';
  for (let i = 0; i < len; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }
  display.value = password;
  updateStrength(calcStrength(password));
  // Reset copy hint after generating new password
  showHint('Click password to copy');
}

function calcStrength(pw) {
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 20) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, Math.floor(score * 4 / 5));
}

function updateStrength(level) {
  const labels  = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const classes = ['', 'weak', 'fair', 'good', 'strong'];
  const colors  = ['', '#f87171', '#fb923c', '#facc15', '#4ade80'];
  segments.forEach((seg, i) => {
    seg.className = 'strength-segment' + (i < level ? ' ' + classes[level] : '');
  });
  strengthText.textContent = labels[level] || '';
  strengthText.style.color = colors[level] || 'transparent';
}

let hintTimer;
function showHint(msg, isSuccess = false) {
  clearTimeout(hintTimer);
  copyHint.textContent = msg;
  copyHint.style.color = isSuccess ? '#4ade80' : 'rgba(255,255,255,0.4)';
}

function copyToClipboard() {
  if (!display.value) return;
  navigator.clipboard.writeText(display.value).then(() => {
    // Visual feedback on the display box
    display.classList.add('copied');
    copyBtn.textContent = '✓';
    copyBtn.classList.add('copied');
    showHint('Copied!', true);

    hintTimer = setTimeout(() => {
      display.classList.remove('copied');
      copyBtn.textContent = '⎙';
      copyBtn.classList.remove('copied');
      showHint('Click password to copy');
    }, 2000);
  });
}

// Both the display area and the copy button trigger copy
display.addEventListener('click', copyToClipboard);
copyBtn.addEventListener('click', copyToClipboard);

generateBtn.addEventListener('click', generatePassword);

// Generate on load
generatePassword();
