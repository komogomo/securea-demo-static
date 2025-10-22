/**
 * デモモード切り替えパネル
 * 紙芝居デモ用の管理者/一般ユーザー切り替え機能
 */

class DemoModeManager {
  constructor() {
    this.settings = this.loadSettings();
    this.users = [
      { id: 1, name: '山田太郎', isAdmin: false },
      { id: 2, name: '佐藤花子', isAdmin: false },
      { id: 3, name: '田中次郎', isAdmin: false },
      { id: 999, name: '管理組合', isAdmin: true }
    ];
  }

  /**
   * 設定を読み込み
   */
  loadSettings() {
    const saved = localStorage.getItem('demoModeSettings');
    if (saved) {
      return JSON.parse(saved);
    }
    // デフォルト設定
    return {
      isAdmin: false,
      userId: 1,
      userName: '山田太郎'
    };
  }

  /**
   * 設定を保存
   */
  saveSettings(settings) {
    this.settings = settings;
    localStorage.setItem('demoModeSettings', JSON.stringify(settings));
    
    // カスタムイベントを発火して他のコンポーネントに通知
    window.dispatchEvent(new CustomEvent('demoModeChanged', { 
      detail: settings 
    }));
  }

  /**
   * 現在のユーザー情報を取得
   */
  getCurrentUser() {
    return {
      id: this.settings.userId,
      name: this.settings.userName,
      isAdmin: this.settings.isAdmin
    };
  }

  /**
   * デモモードUIを初期化
   */
  init() {
    // UIを作成
    this.createUI();
    
    // イベントリスナーを設定
    this.setupEventListeners();
  }

  /**
   * UIを作成
   */
  createUI() {
    // すでに存在する場合は削除
    const existing = document.getElementById('demoModeContainer');
    if (existing) {
      existing.remove();
    }

    const container = document.createElement('div');
    container.id = 'demoModeContainer';
    container.innerHTML = `
      <!-- デモモードボタン -->
      <button id="demoModeToggle" class="demo-mode-toggle" title="デモモード設定">
        🎭 デモモード
      </button>

      <!-- 設定パネル -->
      <div id="demoModePanel" class="demo-mode-panel hidden">
        <div class="demo-mode-overlay"></div>
        <div class="demo-mode-content">
          <div class="demo-mode-header">
            <h3>🎭 デモモード設定</h3>
            <button id="demoModePanelClose" class="demo-mode-close">×</button>
          </div>
          
          <div class="demo-mode-body">
            <!-- 管理者フラグ -->
            <div class="demo-mode-field">
              <label class="demo-mode-checkbox-label">
                <input 
                  type="checkbox" 
                  id="demoAdminCheckbox" 
                  ${this.settings.isAdmin ? 'checked' : ''}
                >
                <span>管理者として操作</span>
              </label>
              <p class="demo-mode-hint">
                管理者モードでは「回覧板」「重要」「公式」タグの設定や、他人の投稿削除が可能になります
              </p>
            </div>

            <!-- ユーザー選択 -->
            <div class="demo-mode-field">
              <label class="demo-mode-label">表示名</label>
              <select id="demoUserSelect" class="demo-mode-select">
                ${this.users.map(user => `
                  <option 
                    value="${user.id}" 
                    ${user.id === this.settings.userId ? 'selected' : ''}
                  >
                    ${user.name}${user.isAdmin ? ' (管理者)' : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 現在の設定表示 -->
            <div class="demo-mode-current">
              <strong>現在の設定:</strong><br>
              <span id="demoCurrentStatus">
                ${this.settings.isAdmin ? '🔐 管理者' : '👤 一般ユーザー'} - ${this.settings.userName}
              </span>
            </div>
          </div>

          <div class="demo-mode-footer">
            <button id="demoModeSave" class="demo-mode-btn demo-mode-btn-primary">
              設定を保存
            </button>
            <button id="demoModeCancel" class="demo-mode-btn demo-mode-btn-secondary">
              キャンセル
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    this.addStyles();
  }

  /**
   * スタイルを追加
   */
  addStyles() {
    if (document.getElementById('demoModeStyles')) return;

    const style = document.createElement('style');
    style.id = 'demoModeStyles';
    style.textContent = `
      /* デモモードトグルボタン */
      .demo-mode-toggle {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9998;
        padding: 12px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
      }

      .demo-mode-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }

      /* パネル */
      .demo-mode-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .demo-mode-panel.hidden {
        display: none;
      }

      .demo-mode-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .demo-mode-content {
        position: relative;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 480px;
        max-height: 90vh;
        overflow: auto;
      }

      .demo-mode-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .demo-mode-header h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        color: #1f2937;
      }

      .demo-mode-close {
        background: none;
        border: none;
        font-size: 28px;
        color: #9ca3af;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .demo-mode-close:hover {
        background: #f3f4f6;
        color: #1f2937;
      }

      .demo-mode-body {
        padding: 24px;
      }

      .demo-mode-field {
        margin-bottom: 24px;
      }

      .demo-mode-label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
      }

      .demo-mode-checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
      }

      .demo-mode-checkbox-label input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
      }

      .demo-mode-hint {
        margin-top: 8px;
        font-size: 13px;
        color: #6b7280;
        line-height: 1.5;
      }

      .demo-mode-select {
        width: 100%;
        padding: 10px 14px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        color: #1f2937;
        background: white;
        cursor: pointer;
        transition: border-color 0.2s;
      }

      .demo-mode-select:focus {
        outline: none;
        border-color: #667eea;
      }

      .demo-mode-current {
        padding: 16px;
        background: #f9fafb;
        border-radius: 8px;
        font-size: 14px;
        color: #374151;
        border-left: 4px solid #667eea;
      }

      .demo-mode-footer {
        display: flex;
        gap: 12px;
        padding: 20px 24px;
        border-top: 1px solid #e5e7eb;
      }

      .demo-mode-btn {
        flex: 1;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .demo-mode-btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .demo-mode-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      .demo-mode-btn-secondary {
        background: #f3f4f6;
        color: #374151;
      }

      .demo-mode-btn-secondary:hover {
        background: #e5e7eb;
      }

      /* レスポンシブ */
      @media (max-width: 640px) {
        .demo-mode-toggle {
          bottom: 10px;
          left: 10px;
          padding: 10px 16px;
          font-size: 13px;
        }

        .demo-mode-content {
          width: 95%;
          margin: 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * イベントリスナーを設定
   */
  setupEventListeners() {
    // トグルボタン
    document.getElementById('demoModeToggle').addEventListener('click', () => {
      this.openPanel();
    });

    // 閉じるボタン
    document.getElementById('demoModePanelClose').addEventListener('click', () => {
      this.closePanel();
    });

    // オーバーレイクリック
    document.querySelector('.demo-mode-overlay').addEventListener('click', () => {
      this.closePanel();
    });

    // 保存ボタン
    document.getElementById('demoModeSave').addEventListener('click', () => {
      this.saveCurrentSettings();
    });

    // キャンセルボタン
    document.getElementById('demoModeCancel').addEventListener('click', () => {
      this.closePanel();
    });

    // 管理者チェックボックスの変更
    document.getElementById('demoAdminCheckbox').addEventListener('change', (e) => {
      if (e.target.checked) {
        // 管理者ONの場合、自動的に「管理組合」を選択
        document.getElementById('demoUserSelect').value = '999';
      }
      this.updateCurrentStatus();
    });

    // ユーザー選択の変更
    document.getElementById('demoUserSelect').addEventListener('change', (e) => {
      const selectedUser = this.users.find(u => u.id === parseInt(e.target.value));
      if (selectedUser && selectedUser.isAdmin) {
        // 管理者ユーザーを選択した場合、自動的に管理者チェックをON
        document.getElementById('demoAdminCheckbox').checked = true;
      }
      this.updateCurrentStatus();
    });
  }

  /**
   * パネルを開く
   */
  openPanel() {
    document.getElementById('demoModePanel').classList.remove('hidden');
    // 現在の設定を反映
    document.getElementById('demoAdminCheckbox').checked = this.settings.isAdmin;
    document.getElementById('demoUserSelect').value = this.settings.userId;
    this.updateCurrentStatus();
  }

  /**
   * パネルを閉じる
   */
  closePanel() {
    document.getElementById('demoModePanel').classList.add('hidden');
  }

  /**
   * 現在の状態表示を更新
   */
  updateCurrentStatus() {
    const isAdmin = document.getElementById('demoAdminCheckbox').checked;
    const userId = parseInt(document.getElementById('demoUserSelect').value);
    const user = this.users.find(u => u.id === userId);
    
    const statusText = `${isAdmin ? '🔐 管理者' : '👤 一般ユーザー'} - ${user.name}`;
    document.getElementById('demoCurrentStatus').textContent = statusText;
  }

  /**
   * 現在の設定を保存
   */
  saveCurrentSettings() {
    const isAdmin = document.getElementById('demoAdminCheckbox').checked;
    const userId = parseInt(document.getElementById('demoUserSelect').value);
    const user = this.users.find(u => u.id === userId);

    const newSettings = {
      isAdmin: isAdmin,
      userId: userId,
      userName: user.name
    };

    this.saveSettings(newSettings);
    this.closePanel();

    // 保存完了メッセージ
    alert('✅ デモモード設定を保存しました。\nページをリロードすると設定が反映されます。');
    
    // ページをリロード
    location.reload();
  }
}

// グローバルインスタンス
window.demoModeManager = null;

/**
 * デモモードを初期化
 */
function initDemoMode() {
  if (!window.demoModeManager) {
    window.demoModeManager = new DemoModeManager();
    window.demoModeManager.init();
  }
  return window.demoModeManager;
}

/**
 * 現在のデモユーザーを取得
 */
function getDemoUser() {
  if (!window.demoModeManager) {
    initDemoMode();
  }
  return window.demoModeManager.getCurrentUser();
}
