/**
 * ファイル処理ユーティリティ
 * 掲示板機能で使用する共通のファイル処理関数
 */

/**
 * ファイル名から拡張子を取得
 * @param {string} filename - ファイル名
 * @returns {string} 拡張子（小文字）
 */
function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/**
 * ファイルタイプを判定
 * @param {string} filename - ファイル名
 * @returns {string} 'image' | 'document' | 'other'
 */
function getFileType(filename) {
  const ext = getFileExtension(filename);
  
  // 画像ファイル
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
  if (imageExtensions.includes(ext)) {
    return 'image';
  }
  
  // ドキュメントファイル
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  if (documentExtensions.includes(ext)) {
    return 'document';
  }
  
  // その他のファイル
  return 'other';
}

/**
 * ファイルタイプに応じたアイコンを取得
 * @param {string} fileType - ファイルタイプ ('image' | 'document' | 'other')
 * @param {string} extension - ファイル拡張子（オプション）
 * @returns {string} アイコンの絵文字
 */
function getFileIcon(fileType, extension = '') {
  if (fileType === 'image') {
    return '🖼️';
  }
  
  if (fileType === 'document') {
    // ドキュメントタイプ別のアイコン
    const ext = extension.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📕';
      case 'doc':
      case 'docx':
        return '📘';
      case 'xls':
      case 'xlsx':
        return '📗';
      case 'ppt':
      case 'pptx':
        return '📙';
      default:
        return '📄';
    }
  }
  
  // その他のファイル
  const ext = extension.toLowerCase();
  switch (ext) {
    case 'zip':
    case 'rar':
    case '7z':
      return '📦';
    case 'txt':
      return '📝';
    case 'mp3':
    case 'wav':
      return '🎵';
    case 'mp4':
    case 'avi':
      return '🎬';
    default:
      return '📎';
  }
}

/**
 * ファイルサイズをフォーマット
 * @param {number} bytes - バイト数
 * @returns {string} フォーマットされたサイズ（例: "2.5 MB"）
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 添付ファイルをHTMLでレンダリング
 * @param {Array} attachments - 添付ファイルの配列
 * @param {string} context - コンテキスト ('post' | 'reply')
 * @returns {string} レンダリングされたHTML
 */
function renderAttachments(attachments, context = 'post') {
  // 添付ファイルが存在しない場合は空文字を返す
  if (!attachments || attachments.length === 0) return '';
  
  // 画像とその他のファイルを分離
  const images = attachments.filter(file => file.type === 'image');
  const files = attachments.filter(file => file.type !== 'image');
  
  let html = '';
  
  // 画像のレンダリング
  if (images.length > 0) {
    html += '<div class="mt-3">';
    html += '<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">';
    
    images.forEach(image => {
      html += `
        <div class="relative group">
          <img 
            src="${image.url}" 
            alt="${image.name}"
            class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
            onclick="window.open('${image.url}', '_blank')"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition">
            ${image.name}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    html += '</div>';
  }
  
  // ファイルのレンダリング
  if (files.length > 0) {
    html += '<div class="mt-3 space-y-2">';
    
    files.forEach(file => {
      const extension = getFileExtension(file.name);
      const icon = getFileIcon(file.type, extension);
      const sizeText = file.size || '不明';
      
      html += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
          <div class="text-2xl">${icon}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 truncate">${file.name}</div>
            <div class="text-xs text-gray-500">${sizeText}</div>
          </div>
          <a 
            href="${file.url}" 
            download="${file.name}"
            class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-shrink-0"
          >
            <span data-i18n="common.download">ダウンロード</span>
          </a>
        </div>
      `;
    });
    
    html += '</div>';
  }
  
  return html;
}

/**
 * ファイル選択時のプレビュー生成（新規投稿・返信フォーム用）
 * @param {FileList} files - 選択されたファイルリスト
 * @param {string} containerId - プレビューを表示するコンテナのID
 */
function generateFilePreview(files, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!files || files.length === 0) {
    container.classList.add('hidden');
    return;
  }
  
  container.classList.remove('hidden');
  
  Array.from(files).forEach((file, index) => {
    const fileType = getFileType(file.name);
    const extension = getFileExtension(file.name);
    const icon = getFileIcon(fileType, extension);
    const sizeText = formatFileSize(file.size);
    
    const previewItem = document.createElement('div');
    previewItem.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-lg';
    
    // 画像の場合はサムネイル表示を試みる
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewItem.innerHTML = `
          <img src="${e.target.result}" alt="${file.name}" class="w-16 h-16 object-cover rounded">
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 truncate">${file.name}</div>
            <div class="text-xs text-gray-500">${sizeText}</div>
          </div>
          <button 
            type="button"
            onclick="removeFileFromPreview(${index}, '${containerId}')"
            class="text-red-600 hover:text-red-800 text-sm"
          >
            削除
          </button>
        `;
      };
      reader.readAsDataURL(file);
    } else {
      // ファイルアイコン表示
      previewItem.innerHTML = `
        <div class="text-2xl">${icon}</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-900 truncate">${file.name}</div>
          <div class="text-xs text-gray-500">${sizeText}</div>
        </div>
        <button 
          type="button"
          onclick="removeFileFromPreview(${index}, '${containerId}')"
          class="text-red-600 hover:text-red-800 text-sm"
        >
          削除
        </button>
      `;
    }
    
    container.appendChild(previewItem);
  });
}

/**
 * プレビューからファイルを削除
 * @param {number} index - 削除するファイルのインデックス
 * @param {string} containerId - プレビューコンテナのID
 */
function removeFileFromPreview(index, containerId) {
  // この関数は各画面で実装が必要
  // ファイル配列を管理している側で実装してください
  console.warn('removeFileFromPreview needs to be implemented in the page');
}
