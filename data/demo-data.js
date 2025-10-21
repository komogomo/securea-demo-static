// デモ用データ

// お知らせデータ
const notices = [
  {
    id: 1,
    category: 'important',
    title: 'エレベーター点検のお知らせ',
    date: '2025/10/18',
    content: '10月25日（土）9:00-12:00の間、エレベーターの定期点検を実施いたします。この間、エレベーターはご利用いただけませんので、ご了承ください。',
    isNew: true
  },
  {
    id: 2,
    category: 'important',
    title: 'ゴミ収集日変更のお知らせ',
    date: '2025/10/15',
    content: '11月より、可燃ゴミの収集日が火曜日・金曜日に変更となります。お間違えのないようお願いいたします。',
    isNew: true
  },
  {
    id: 3,
    category: 'general',
    title: '管理費のお支払いについて',
    date: '2025/10/10',
    content: '10月分の管理費のお支払い期限は10月31日です。口座振替の方は残高をご確認ください。',
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