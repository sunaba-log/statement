import { ShellRecord } from "../components/ShellViewer";

export type Member = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  department: string;
  joinDate: string;
  bio: string;
  image?: string;
  skills: string[];
  specialty: string[];
  hobbies: string[];
  github?: string;
  sns?: string;
  website?: string;
  shell?: ShellRecord;
  mindset?: string;
  mindmap?: string;
};

export const members: Member[] = [
  {
    id: "otaka44",
    name: "Takayoshi Ono",
    nameEn: "Takayoshi Ono",
    role: "デザインエンジニア",
    roleEn: "Design Engineer",
    department: "いつメン",
    joinDate: "2025-11-01",
    bio: "ITを手段として人々の心を動かす現象を精密に設計するデザインエンジニア。利便性の先にある「面白さ」を最上位の価値に置き、個人のポテンシャルを最大限に解放する「仕組み」を構築することを志向している。",
    image: "https://avatars.githubusercontent.com/u/44050587?v=4",
    skills: [],
    specialty: ["情報科学", "建築学", "プロダクトデザイン"],
    hobbies: [
      "Coffeeholic",
      "Sci-Fi",
      "Prototyping",
      "Intelligence Amplification: IA",
    ],
    github: "otaka44",
    sns: "https://www.instagram.com/taka_or_yoshi/",
    website: "https://sunaba-log.github.io/statement",
    shell: {
      head: [],
      face: [
        {
          title: "Even G2",
          image: "/statement/img/members/eveng2.jpg",
          description:
            "次世代のスマートグラス。スキルの拡張と外部記憶装置としての役割を果たし、日常のあらゆる瞬間の情報量を増幅した。",
          url: "https://www.evenrealities.com/smart-glasses",
        },
        {
          title: "XREAL One",
          image: "/statement/img/members/ScenePic_productivity.jpg",
          description:
            "任意の空間上に作業平面を拡張できるARグラス。物理的なモニターの制約から解放され、どこでもマルチタスクが可能になった。",
          url: "https://www.xreal.com/jp",
        },
        {
          title: "OpenDots ONE",
          image: "/statement/img/members/opendot-black-1.jpeg",
          description:
            "軽量かつコンパクトなイヤーカフ式イヤホン。16番染色体上のABCC11遺伝子に由来する湿性耳垢タイプの人に最適なデバイスで、エンタメ体験の没入可能時間を延長した。",
          url: "https://jp.shokz.com/",
        },
      ],
      chest: [],
      hip: [],
      "arm-left": [
        {
          title: "cmf watch 3 pro",
          image: "/statement/img/members/cmfwatch3.jpg",
          description:
            "2週間持続するバッテリーを有し、常時装着してもストレスのない軽量なスマートウォッチ。心拍数、血中酸素、睡眠、活動レベルなどのバイタルサイン24時間モニタリングを可能にした。",
          url: "https://jp.nothing.tech/products/cmf-watch-3-pro",
        },
      ],
      "arm-right": [],
      "hand-left": [
        {
          title: "Even R1",
          image: "/statement/img/members/iphone-17-black.jpg",
          description:
            "気づかれることなく、Even G2を操作できるスマートリング。スマートグラスの操作性が向上した。日中のバイタルサインも測定することができる。",
          url: "https://www.evenrealities.com/ja-US/smart-ring",
        },
      ],
      "hand-right": [
        {
          title: "iPhone 17",
          image: "/statement/img/members/iphone-17-black.jpg",
          description:
            "Apple社製第19世代モデルのスマートフォン。A17 Proチップを搭載し、あらゆる操作がより快適になった。各拡張パーツのメインハブとして機能する。",
          url: "https://www.apple.com/jp/iphone-17/",
        },
        {
          title: "beak mag 2",
          image: "/statement/img/members/beakmag2-thum_14.jpg",
          description:
            "Magsafe/Pixelsnapより着脱可能な36g超軽量スマホスタンド兼スマホグリップ。スマホスタンドとしての機能に加え、スマホを片手で持つ際の安定性が向上したことで、スマホをケースから解放し、スマホに本来の美しさを取り戻した。",
          url: "https://doublebar.jp/products/beakmag2",
        },
      ],
      "thigh-left": [],
      "thigh-right": [],
      "foot-left": [
        {
          title: "Cloudmonster 2",
          image: "/statement/img/members/cloudmonster2.jpg",
          description:
            "CloudTec®ミッドソールを採用したハイテクスニーカー。圧倒的なエネルギーリターンと前方へのローリングが生み出す怒濤の推進力が長距離走行を快適にした。",
          url: "https://www.on.com/ja-jp/products/cloudmonster-2-m-3me1012/mens/",
        },
      ],
      "foot-right": [
        {
          title: "Cloudmonster 2",
          image: "/statement/img/members/cloudmonster2.jpg",
          description:
            "CloudTec®ミッドソールを採用したハイテクスニーカー。圧倒的なエネルギーリターンと前方へのローリングが生み出す怒濤の推進力が長距離走行を快適にした。",
          url: "https://www.on.com/ja-jp/products/cloudmonster-2-m-3me1012/mens/",
        },
      ],
    },
    mindset:
      "利便性の先にある「面白さ」を最上位の価値に置き、ITを手段として人々の心を動かす現象を精密に設計する。不毛な停滞を拒絶し、人が自然と輝く「仕組み」を構築することで、個人のポテンシャルを最大限に解放する。10年後も好奇心の旗を掲げ、仲間と技術や流行を「あーだこーだ」面白がり続ける世界の先導者。",
    mindmap: `
mindmap
  root((心の原動力))
    突き動かされるもの
      心を動かす瞬間
        多くの人への波及
        感動の創出
      知的好奇心
        技術への忌憚ない批評
        流行り廃りを楽しむ
      未知の課題解決
        ITを手段とした貢献
    拒絶するもの
      不透明な目的
        ビジョンの欠如
      責任の不在
        盲目的な会議
      停滞と退屈
        新しいものが生まれない状況
    理想とする姿
      世の中を面白くする先導者
      適材適所の仕組み
        人の可能性を最大化する環境
      枯れない好奇心
        10年後もあーだこーだ言える関係`,
  },
];

export const getMemberById = (id: string): Member | undefined => {
  return members.find((member) => member.id === id);
};

export const getMembersByDepartment = (department: string): Member[] => {
  return members.filter((member) => member.department === department);
};

export const getAllDepartments = (): string[] => {
  return [...new Set(members.map((member) => member.department))];
};
