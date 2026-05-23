export interface NdcSubCategory {
  code: string
  name: string
  description: string
  searchCodes: string[]
}

export interface NdcCategory {
  code: string
  name: string
  description: string
  emoji: string
  searchCodes: string[]
  bg: string
  border: string
  subCategories: NdcSubCategory[]
}

export const ndcCategories: NdcCategory[] = [
  {
    code: '9',
    name: '文学・小説',
    description: '小説、エッセイ、詩歌など',
    emoji: '📖',
    searchCodes: ['913', '914', '916'],
    bg: 'bg-purple-50 hover:bg-purple-100',
    border: 'border-purple-200',
    subCategories: [
      { code: '913', name: '日本の小説・物語', description: '国内作家の小説・ライトノベルなど', searchCodes: ['913'] },
      { code: '914', name: 'エッセイ・随筆', description: 'エッセイ・コラム・随筆など', searchCodes: ['914'] },
      { code: '916', name: 'ルポ・ノンフィクション', description: '記録・手記・ルポルタージュなど', searchCodes: ['916'] },
      { code: '930', name: '海外の小説', description: '英米・欧州・アジア文学など', searchCodes: ['930', '950', '970', '980'] },
      { code: '911', name: '詩・短歌・俳句', description: '詩・和歌・俳句・川柳など', searchCodes: ['911'] },
    ],
  },
  {
    code: 'manga',
    name: 'マンガ・絵本',
    description: '漫画・コミック・絵本',
    emoji: '🎭',
    searchCodes: ['726.6', '726.5'],
    bg: 'bg-pink-50 hover:bg-pink-100',
    border: 'border-pink-200',
    subCategories: [
      { code: '726.6', name: 'マンガ・コミック', description: '漫画・コミック全般', searchCodes: ['726.6'] },
      { code: '726.5', name: '絵本・児童書', description: '絵本・子ども向け読み物など', searchCodes: ['726.5'] },
    ],
  },
  {
    code: '1',
    name: '哲学・心理・自己啓発',
    description: '哲学、心理学、処世術など',
    emoji: '🧠',
    searchCodes: ['104', '141', '159'],
    bg: 'bg-blue-50 hover:bg-blue-100',
    border: 'border-blue-200',
    subCategories: [
      { code: '100', name: '哲学・思想', description: '哲学・倫理学・論理学など', searchCodes: ['100', '104', '110'] },
      { code: '140', name: '心理学', description: '心理学・精神分析など', searchCodes: ['140', '141', '146'] },
      { code: '159', name: '自己啓発・処世術', description: '人生論・処世術・成功哲学など', searchCodes: ['159'] },
      { code: '160', name: '宗教・スピリチュアル', description: '宗教学・仏教・キリスト教など', searchCodes: ['160', '180', '190'] },
    ],
  },
  {
    code: '2',
    name: '歴史・地理',
    description: '日本史、世界史、地理など',
    emoji: '🏯',
    searchCodes: ['210', '222', '230'],
    bg: 'bg-amber-50 hover:bg-amber-100',
    border: 'border-amber-200',
    subCategories: [
      { code: '210', name: '日本の歴史', description: '日本史・時代別歴史など', searchCodes: ['210'] },
      { code: '220', name: 'アジアの歴史', description: '中国・韓国・アジア史など', searchCodes: ['220', '222'] },
      { code: '230', name: '西洋の歴史', description: 'ヨーロッパ・アメリカ史など', searchCodes: ['230', '250'] },
      { code: '270', name: '伝記・人物', description: '人物伝・偉人伝など', searchCodes: ['289'] },
      { code: '290', name: '地理・旅行', description: '地誌・紀行・旅行記など', searchCodes: ['290', '291'] },
    ],
  },
  {
    code: '3',
    name: 'ビジネス・経済',
    description: '経済、経営、マーケティングなど',
    emoji: '💼',
    searchCodes: ['330', '336', '335'],
    bg: 'bg-green-50 hover:bg-green-100',
    border: 'border-green-200',
    subCategories: [
      { code: '335', name: '経営・マネジメント', description: '企業経営・組織・リーダーシップなど', searchCodes: ['335', '336'] },
      { code: '330', name: '経済・金融', description: '経済学・金融・投資など', searchCodes: ['330', '339'] },
      { code: '338', name: '投資・資産運用', description: '株式投資・NISA・資産形成・FXなど', searchCodes: ['338'] },
      { code: '336m', name: 'マーケティング・販売', description: '広告・マーケティング・営業など', searchCodes: ['674', '675'] },
      { code: '336w', name: '仕事術・スキルアップ', description: '仕事術・コミュニケーション・転職など', searchCodes: ['336'] },
      { code: '336k', name: '会計・税務', description: '簿記・会計・税金・確定申告など', searchCodes: ['336.9', '345'] },
    ],
  },
  {
    code: '36',
    name: '社会・政治',
    description: '社会問題、政治、法律など',
    emoji: '⚖️',
    searchCodes: ['310', '360', '320'],
    bg: 'bg-slate-50 hover:bg-slate-100',
    border: 'border-slate-200',
    subCategories: [
      { code: '310', name: '政治・行政', description: '政治学・選挙・外交など', searchCodes: ['310', '319'] },
      { code: '320', name: '法律', description: '法律・裁判・司法など', searchCodes: ['320', '321'] },
      { code: '360', name: '社会問題・福祉', description: '社会問題・福祉・ジェンダーなど', searchCodes: ['360', '369'] },
      { code: '361', name: '社会学・文化論', description: '社会学・文化人類学など', searchCodes: ['361', '380'] },
    ],
  },
  {
    code: '37',
    name: '教育・育児',
    description: '教育、子育て、学習など',
    emoji: '🎓',
    searchCodes: ['370', '379', '376'],
    bg: 'bg-sky-50 hover:bg-sky-100',
    border: 'border-sky-200',
    subCategories: [
      { code: '376', name: '育児・子育て', description: '育児・子育て・幼児教育など', searchCodes: ['376'] },
      { code: '370', name: '教育学・学校教育', description: '教育論・学校教育・受験など', searchCodes: ['370', '371'] },
      { code: '379', name: '社会教育・学習法', description: '生涯学習・勉強法など', searchCodes: ['379', '002'] },
    ],
  },
  {
    code: '4',
    name: '自然科学・医学',
    description: '科学、数学、医学、健康など',
    emoji: '🔬',
    searchCodes: ['410', '490', '498'],
    bg: 'bg-teal-50 hover:bg-teal-100',
    border: 'border-teal-200',
    subCategories: [
      { code: '490', name: '医学・薬学', description: '医学・薬学・看護など', searchCodes: ['490', '492', '494'] },
      { code: '498', name: '健康・ダイエット', description: '健康法・美容・ダイエットなど', searchCodes: ['498'] },
      { code: '493', name: 'メンタルヘルス', description: '精神科・メンタルヘルス・うつ・ストレスなど', searchCodes: ['493'] },
      { code: '410', name: '数学・物理', description: '数学・物理学・化学など', searchCodes: ['410', '420', '430'] },
      { code: '460', name: '生物・自然', description: '生物学・動物・植物・宇宙など', searchCodes: ['440', '460', '480'] },
    ],
  },
  {
    code: '5',
    name: 'IT・技術',
    description: 'コンピュータ、プログラミングなど',
    emoji: '💻',
    searchCodes: ['007', '548'],
    bg: 'bg-cyan-50 hover:bg-cyan-100',
    border: 'border-cyan-200',
    subCategories: [
      { code: '007', name: 'コンピュータ・IT全般', description: 'IT・情報技術・インターネットなど', searchCodes: ['007'] },
      { code: '548', name: 'プログラミング・開発', description: 'プログラミング・ソフトウェアなど', searchCodes: ['548'] },
      { code: '510', name: '建築・土木・工学', description: '建築・土木・機械工学など', searchCodes: ['510', '520', '530'] },
    ],
  },
  {
    code: '7a',
    name: '芸術・音楽',
    description: '絵画、音楽、映画、デザインなど',
    emoji: '🎨',
    searchCodes: ['700', '760', '778'],
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200',
    subCategories: [
      { code: '760', name: '音楽', description: '音楽・楽器・作曲など', searchCodes: ['760'] },
      { code: '700', name: '美術・デザイン', description: '絵画・デザイン・写真など', searchCodes: ['700', '720', '740'] },
      { code: '778', name: '映画・演劇', description: '映画・演劇・アニメなど', searchCodes: ['770', '778'] },
    ],
  },
  {
    code: '7b',
    name: '趣味・料理・スポーツ',
    description: '料理、旅行、スポーツなど',
    emoji: '🍳',
    searchCodes: ['590', '596', '780'],
    bg: 'bg-lime-50 hover:bg-lime-100',
    border: 'border-lime-200',
    subCategories: [
      { code: '596', name: '料理・食事', description: 'レシピ・料理・食文化など', searchCodes: ['596'] },
      { code: '780', name: 'スポーツ・武道', description: 'スポーツ全般・武道・フィットネスなど', searchCodes: ['780', '788'] },
      { code: '590', name: '生活・暮らし', description: '家事・インテリア・ファッションなど', searchCodes: ['590', '593'] },
      { code: '594', name: '手芸・DIY・クラフト', description: '裁縫・ハンドメイド・DIY・工作など', searchCodes: ['594', '527'] },
      { code: '790', name: 'ゲーム・趣味', description: 'ゲーム・将棋・囲碁・ホビーなど', searchCodes: ['790', '791', '795'] },
      { code: '629', name: 'ペット・動物', description: '犬・猫・熱帯魚・小動物の飼育など', searchCodes: ['645', '648'] },
    ],
  },
]

export function findCategoryByCode(code: string): NdcCategory | undefined {
  return ndcCategories.find((c) => c.code === code)
}

export function findSubCategoryByCode(
  category: NdcCategory,
  subCode: string
): NdcSubCategory | undefined {
  return category.subCategories.find((s) => s.code === subCode)
}

export function findParentCategory(subCode: string): NdcCategory | undefined {
  return ndcCategories.find((cat) =>
    cat.subCategories.some((sub) => sub.code === subCode)
  )
}
