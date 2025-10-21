// 多言語対応機能
class LanguageManager {
  constructor() {
    console.log('LanguageManager constructor called');
    this.currentLanguage = localStorage.getItem('language') || 'ja';
    this.translations = window.i18nData || {};
    this.updateDynamicContentHook = null; // 【追加】動的コンテンツ更新用のフック
    console.log('Current language:', this.currentLanguage);
    console.log('Translations available:', Object.keys(this.translations));
  }

  // 言語を設定
  setLanguage(lang) {
    console.log('setLanguage called:', lang);
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.updatePage();
      this.updateLanguageButtons();
      console.log('Language set to:', lang);
    } else {
      console.error('Translation not found for language:', lang);
    }
  }

  // 現在の言語を取得
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // 翻訳テキストを取得
  translate(key) {
    const translation = this.translations[this.currentLanguage];
    return translation && translation[key] ? translation[key] : key;
  }

  // ページ全体を更新
  updatePage() {
    console.log('updatePage called');
    let count = 0;
    // data-i18n属性を持つ要素を更新（静的コンテンツ）
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translate(key);
      
      // 要素の内容を更新（子要素がない場合）
      if (element.children.length === 0) {
        element.textContent = translation;
      } else {
        // 子要素がある場合は、最初のテキストノードを探して更新
        for (let i = 0; i < element.childNodes.length; i++) {
          const node = element.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = translation;
            break;
          }
        }
      }
      count++;
    });
    console.log('Translated', count, 'elements');

    // placeholder属性も更新
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.translate(key);
    });
    
    // titleも更新
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
      const key = titleElement.getAttribute('data-i18n');
      document.title = this.translate(key);
    }
    
    // 【追加】静的コンテンツの更新後、動的コンテンツの再レンダリングを実行
    if (this.updateDynamicContentHook) {
        console.log('Calling dynamic content hook...');
        this.updateDynamicContentHook();
    }
  }

  // 言語切り替えボタンの状態を更新
  updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === this.currentLanguage) {
        btn.classList.add('active');
        btn.classList.remove('inactive');
      } else {
        btn.classList.remove('active');
        btn.classList.add('inactive');
      }
    });
  }

  // 言語切り替えボタンを初期化
  initLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
    this.updateLanguageButtons();
  }
}

// グローバルインスタンスを作成（i18nDataの読み込みを待つ）
function initLanguageManager() {
  console.log('initLanguageManager called');
  console.log('i18nData:', window.i18nData ? 'あり' : 'なし');
  
  if (!window.i18nData) {
    console.error('i18nDataが読み込まれていません。100ms後に再試行します。');
    setTimeout(initLanguageManager, 100);
    return;
  }
  
  window.languageManager = new LanguageManager();
  
  // グローバル翻訳関数（JavaScript内で使用）
  window.i18n = function(key) {
    return window.languageManager.translate(key);
  };
  
  // ページ読み込み時に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded - 翻訳実行');
      window.languageManager.updatePage();
      window.languageManager.initLanguageButtons();
    });
  } else {
    // DOMが既に読み込まれている場合は即座に実行
    console.log('DOM already loaded - 翻訳実行');
    window.languageManager.updatePage();
    window.languageManager.initLanguageButtons();
  }
}

// 初期化を開始
initLanguageManager();