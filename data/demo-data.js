// デモ用データ

// お知らせデータ（多言語対応）
const notices = [
  {
    id: 1,
    category: 'important',
    title: {
      ja: '秋季 共有設備点検のお知らせ',
      en: 'Autumn Shared Facility Inspection Notice',
      zh: '秋季共享设施检查通知'
    },
    date: '2025/10/18',
    content: {
      ja: '住民の皆様へ\n\n日頃より街の美化・安全管理にご協力いただきありがとうございます。\n下記の日程で共有設備の定期点検を実施いたします。\n\n■ 実施日時\n2025年10月25日（土）9:00-17:00\n※雨天の場合は11月1日（土）に延期\n\n■ 点検対象設備\n1. 防犯カメラシステム\n   - 全18台の動作確認・清掃\n   - 9:00-12:00の間、録画が一時停止します\n\n2. 街区内変電設備\n   - 定期安全点検\n   - 10:00-10:30の間、一部エリアで瞬間停電の可能性\n\n3. 集会所（セキュレアステーション）\n   - 空調設備の保守点検\n   - 終日利用不可となります\n\n4. 街路灯・防犯灯\n   - LED照明の点検・交換作業\n   - 夕方以降の点灯に影響はありません\n\n5. ゲスト駐車場\n   - 区画線の補修作業\n   - 9:00-12:00の間、入出庫不可\n\n■ ご協力のお願い\n- 作業車両が街区内を巡回します。お子様の飛び出しにご注意ください\n- 停電に備え、パソコン等のデータ保存をお願いします\n- 集会所のご予約がある方は別日への変更をお願いします\n\n■ 緊急連絡先\n当日の緊急連絡：080-XXXX-XXXX（現場責任者直通）\n平日のお問い合わせ：029-XXX-XXXX（管理組合事務局）\n\nご理解とご協力をよろしくお願いいたします。\n\nセキュレアシティ管理組合',
      en: 'Dear Residents,\n\nThank you for your continued cooperation in maintaining the beauty and safety of our community.\nWe will conduct regular inspections of shared facilities on the following schedule.\n\n■ Date and Time\nOctober 25, 2025 (Sat) 9:00-17:00\n*Postponed to November 1 (Sat) in case of rain\n\n■ Inspection Targets\n1. Security Camera System\n   - Inspection and cleaning of all 18 units\n   - Recording will be temporarily suspended between 9:00-12:00\n\n2. District Substation Equipment\n   - Regular safety inspection\n   - Possible momentary power outage in some areas between 10:00-10:30\n\n3. Community Center (SECUREA Station)\n   - Air conditioning maintenance\n   - Closed all day\n\n4. Street Lights and Security Lights\n   - LED lighting inspection and replacement\n   - No impact on evening lighting\n\n5. Guest Parking\n   - Parking line repair work\n   - No entry/exit between 9:00-12:00\n\n■ Request for Cooperation\n- Work vehicles will patrol the area. Please watch out for children\n- Please save data on computers, etc. in case of power outage\n- Please reschedule if you have a community center reservation\n\n■ Emergency Contact\nDay-of emergency: 080-XXXX-XXXX (Site Manager Direct)\nWeekday inquiries: 029-XXX-XXXX (Management Office)\n\nThank you for your understanding and cooperation.\n\nSECUREA City Management Association',
      zh: '致居民：\n\n感谢您一直以来对社区美化和安全管理的合作。\n我们将按以下时间表对共享设施进行定期检查。\n\n■ 日期和时间\n2025年10月25日（星期六）9:00-17:00\n*如遇雨天推迟至11月1日（星期六）\n\n■ 检查对象\n1. 安防摄像系统\n   - 检查和清洁全部18台设备\n   - 9:00-12:00期间录像将暂时停止\n\n2. 街区变电设备\n   - 定期安全检查\n   - 10:00-10:30期间部分区域可能会瞬间停电\n\n3. 集会所（SECUREA Station）\n   - 空调设备维护\n   - 全天关闭\n\n4. 街道照明和安全照明\n   - LED照明检查和更换\n   - 不影响傍晚照明\n\n5. 访客停车场\n   - 停车线修复工作\n   - 9:00-12:00期间无法进出\n\n■ 请予配合\n- 工作车辆将在街区内巡逻。请注意儿童安全\n- 请保存电脑等数据以防停电\n- 如有集会所预约请改期\n\n■ 紧急联系方式\n当天紧急联系：080-XXXX-XXXX（现场负责人直通）\n工作日咨询：029-XXX-XXXX（管理组合事务局）\n\n感谢您的理解与配合。\n\nSECUREA City 管理组合'
    },
    isNew: true
  },
  {
    id: 2,
    category: 'important',
    title: {
      ja: 'ゴミ収集日変更のお知らせ',
      en: 'Garbage Collection Schedule Change',
      zh: '垃圾收集时间表变更'
    },
    date: '2025/10/15',
    content: {
      ja: '11月より、可燃ゴミの収集日が火曜日・金曜日に変更となります。お間違えのないようお願いいたします。',
      en: 'Starting from November, combustible garbage collection days will change to Tuesdays and Fridays. Please take note of the change.',
      zh: '从11月起，可燃垃圾收集日将改为周二和周五。请注意变更。'
    },
    isNew: true
  },
  {
    id: 3,
    category: 'general',
    title: {
      ja: '管理費のお支払いについて',
      en: 'About Payment of Management Fees',
      zh: '关于缴纳管理费'
    },
    date: '2025/10/10',
    content: {
      ja: '10月分の管理費のお支払い期限は10月31日です。口座振替の方は残高をご確認ください。',
      en: 'The payment deadline for October management fees is October 31st. Please check your balance if you use automatic withdrawal.',
      zh: '10月份管理费的缴纳截止日期是10月31日。请使用自动取款的住户检查您的余额。'
    },
    isNew: false
  }
];

// アンケートデータ
const survey = {
  id: 'survey-001',
  title: '住環境に関するアンケート',
  description: 'より良い住環境づくりのため、ご協力をお願いします',
  startDate: '2025/10/20',
  endDate: '2025/10/27',
  totalResidents: 171,
  totalResponses: 42,
  responseRate: 24.6,
  isActive: true,
  questions: [
    {
      id: 'q1',
      text: '騒音問題で困っていますか？',
      type: 'single',
      options: [
        { text: 'はい', count: 15, percentage: 35.7 },
        { text: 'いいえ', count: 20, percentage: 47.6 },
        { text: 'どちらでもない', count: 7, percentage: 16.7 }
      ]
    },
    {
      id: 'q2',
      text: 'どの時間帯の騒音が気になりますか？（複数選択可）',
      type: 'multiple',
      options: [
        { text: '早朝（6-9時）', count: 8 },
        { text: '日中（9-18時）', count: 12 },
        { text: '夜間（18-22時）', count: 18 },
        { text: '深夜（22-6時）', count: 10 }
      ],
      totalResponses: 48
    },
    {
      id: 'q3',
      text: 'その他、ご意見があればお聞かせください',
      type: 'text',
      responses: [
        '道路でのボール遊びがうるさい',
        '夜中のバスケットボールの音が響く',
        'BBQの煙が気になる',
        '特にありません',
        '裏の家の焚き火が心配',
        '車のスピード出しすぎが怖い',
        '隣の植木が越境してきている',
        '深夜の話し声が気になる',
        '子供の遊び声は気にならない',
        'ペットの鳴き声について',
        'ゴミ出しのマナーが悪い人がいる',
        '駐車場での騒音',
        '改善を期待しています',
        '概ね満足しています',
        '管理組合の対応に期待'
      ]
    }
  ]
};

// ログインユーザー情報
const currentUser = {
  roomNumber: 'B71',
  isAdmin: false
};

// データをグローバルに公開
window.demoData = {
  notices,
  survey,
  currentUser
};