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
};

export const members: Member[] = [
  {
    id: "yamada-taro",
    name: "太郎 山田",
    nameEn: "Yamada Taro",
    role: "シニア バックエンド エンジニア",
    roleEn: "Senior Backend Engineer",
    department: "バックエンド チーム",
    joinDate: "2023-04-01",
    bio: "マイクロサービスアーキテクチャの設計・実装を専門とするバックエンドエンジニア。大規模システムの最適化経験が豊富。",
    image: "/img/members/yamada-taro.jpg",
    skills: ["Go", "Node.js (TypeScript)", "Python", "Java", "SQL"],
    specialty: [
      "マイクロサービスアーキテクチャ",
      "データベース設計・最適化",
      "APIセキュリティ",
      "DevOps・CI/CD",
    ],
    hobbies: ["クラシックギター演奏", "登山", "読書", "コーヒー焙煎"],
    github: "yamada-taro",
    sns: "taro_dev",
    website: "https://blog.example.com",
  },
  {
    id: "sato-hanako",
    name: "花子 佐藤",
    nameEn: "Sato Hanako",
    role: "フロントエンド エンジニア",
    roleEn: "Frontend Engineer",
    department: "フロントエンド チーム",
    joinDate: "2024-01-01",
    bio: "React/TypeScriptを使用したUI実装とアクセシビリティ改善を得意とするフロントエンドエンジニア。",
    image: "/img/members/sato-hanako.jpg",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python"],
    specialty: [
      "React パフォーマンス最適化",
      "アクセシビリティ (WCAG 2.1)",
      "レスポンシブデザイン",
      "UX改善",
    ],
    hobbies: ["UI/UXデザイン", "ランニング", "写真撮影", "ガーデニング"],
    github: "sato-hanako",
    sns: "hanako_frontend",
    website: "https://qiita.com/sato-hanako",
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
