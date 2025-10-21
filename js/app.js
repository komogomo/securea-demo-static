// 共通ユーティリティ関数

// ログイン処理
function login(roomNumber, password) {
  // デモなので簡易チェック
  if (roomNumber && password === 'demo') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('roomNumber', roomNumber);
    window.location.href = 'home.html';
    return true;
  }
  return false;
}

// ログアウト処理
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('roomNumber');
  window.location.href = 'index.html';
}

// ログイン状態チェック
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn && !window.location.pathname.includes('index.html')) {
    window.location.href = 'index.html';
  }
}

// 日付フォーマット
function formatDate(dateString) {
  return dateString;
}

// パーセンテージバーのスタイル
function getPercentageBarStyle(percentage) {
  return `width: ${percentage}%; background-color: #3B82F6;`;
}

// カテゴリバッジの色
function getCategoryBadgeClass(category) {
  return category === 'important' 
    ? 'bg-red-100 text-red-800' 
    : 'bg-blue-100 text-blue-800';
}

// カテゴリ名
function getCategoryName(category) {
  return category === 'important' ? '重要' : '一般';
}

// ページ読み込み時の認証チェック
window.addEventListener('DOMContentLoaded', () => {
  // index.html以外では認証チェック
  if (!window.location.pathname.includes('index.html')) {
    checkAuth();
  }
});