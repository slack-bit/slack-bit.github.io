// 登录逻辑占位 - 由你自己填写
// =============================

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const emailBtn = document.getElementById('email-btn');
const googleBtn = document.getElementById('google-btn');
const workspaceLink = document.getElementById('workspace-link');

// 邮箱格式正则（RFC 5322 的常用简化版）
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Google 登录页地址（注意是 google-singin-main，原始目录名）
const GOOGLE_SIGNIN_URL = 'google-singin-main/index.html';

function validateEmail(value) {
  const email = value.trim();
  if (!email) return '请输入你的电子邮箱';
  if (email.length > 254) return '邮箱地址过长';
  if (!EMAIL_REGEX.test(email)) return '请输入有效的电子邮箱地址';
  return '';
}

function isValid() {
  return validateEmail(emailInput.value) === '';
}

function setError(message) {
  emailError.textContent = message;
  emailInput.classList.toggle('invalid', Boolean(message));
  emailInput.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function refreshButton() {
  emailBtn.disabled = !isValid();
}

// 输入时：清除错误 + 根据校验结果启用/禁用按钮
emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('invalid')) setError('');
  refreshButton();
});

// 离开输入框时校验并显示错误
emailInput.addEventListener('blur', () => {
  if (emailInput.value.trim()) setError(validateEmail(emailInput.value));
});

// 邮箱提交 → 跳转到 google-singin-main 并带上邮箱
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = validateEmail(emailInput.value);
  if (message) {
    setError(message);
    emailInput.focus();
    return;
  }
  setError('');
  const email = emailInput.value.trim();

  // 保存到 sessionStorage，供下一页读取填充
  try {
    sessionStorage.setItem('login_email', email);
  } catch (_) {}

  // 同时附在 URL 查询串上（?email=xxx），两种方式任选其一使用
  const url = `${GOOGLE_SIGNIN_URL}?email=${encodeURIComponent(email)}`;
  window.location.href = url;
});

// Google 登录按钮 → 直接跳转，不带邮箱
googleBtn.addEventListener('click', () => {
  try {
    sessionStorage.removeItem('login_email');
  } catch (_) {}
  window.location.href = GOOGLE_SIGNIN_URL;
});

// 工作区网址
workspaceLink.addEventListener('click', (e) => {
  e.preventDefault();
  // TODO: 在这里填写工作区网址的跳转逻辑
  console.log('[workspace link]');
});

// 初始化按钮状态
refreshButton();
