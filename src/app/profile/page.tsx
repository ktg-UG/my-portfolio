import { FaBook, FaCar, FaCode, FaEnvelope, FaGithub, FaGraduationCap, FaLanguage, FaLaptopCode, FaMedal, FaPencilAlt, FaSwimmer, FaUser } from 'react-icons/fa';

// データは後から修正しやすいように、コンポーネントの外にまとめて定義します。
const profileData = {
  name: "片木裕司", // 
  birthdate: "2003/07/05", // 
  githubUrl: "https://github.com/your-github-id", // ご自身のIDに書き換えてください
  email: "your-email@example.com", // ご自身のメールアドレスに
  timeline: [
    { year: "2010年4月", event: "渋谷区立幡代小学校 入学" }, // 
    { year: "2016年3月", event: "渋谷区立幡代小学校 卒業" }, // 
    { year: "2016年4月", event: "私立武蔵中学校・高等学校 入学" }, // 
    { year: "2022年3月", event: "私立武蔵中学校・高等学校 卒業", description: "水球部に所属し、副キャプテンとして活動しました。" }, // 
    { year: "2022年4月", event: "大阪大学 基礎工学部 情報科学学科 入学" }, // 
    { year: "2026年3月", event: "大阪大学 基礎工学部 情報科学学科 卒業予定", description: "テニスサークルで広報幹部を務めました。" }, // 
    { year: "2026年4月", event: "大阪大学大学院情報科学研究科 入学予定" }, // 
  ],
  strengths: [
    { title: "体力と忍耐力", description: "中学・高校時代の水球部の活動を通じて、厳しい練習を乗り越える中で培われました。" }, // 
    { title: "高い向上心", description: "興味を持ったことや必要だと感じた技術に対して、積極的に学び、形にする力があります。" }, // 
  ],
  achievements: [
    { title: "サークル向けコート予約システムの開発", description: "所属するテニスサークル内でコート利用時間が重複する問題を解決するため、予約システムを自主開発。メンバーからのフィードバックを元に改善を重ね、利用の公平性と効率性を高めました。" } // 
  ],
  skills: {
    languages: [
      { name: "Python", experience: "実務半年を含む3年" }, // 
      { name: "JavaScript", experience: "実務半年" }, // 
      { name: "Ruby on Rails", experience: "独学半年" }, // 
      { name: "C, Java", experience: "授業での学習" }, // 
    ],
    frameworks: ["Next.js", "React", "Tailwind CSS", "MUI", "TensorFlow"], // 
    tools: ["Git", "GitHub"], // 
    others: ["Supabase", "Vercel", "Azure", "Terraformer"], // 
  },
  hobbies: ["ポーカー", "水泳"], // 
  qualifications: ["普通自動車免許", "TOEIC 795点"], // 
};

// 各セクションのタイトル用のコンポーネント
const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
    {icon}
    <span className="ml-3">{title}</span>
  </h2>
);


export default function ProfilePage() {
  return (
    <div className="bg-gray-50 pt-20 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        
        {/* ヘッダーセクション */}
        <header className="text-center mb-12">
          {/* ここに顔写真を追加します */}
          <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
             <FaUser className="text-5xl text-gray-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900">{profileData.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{profileData.birthdate}生まれ</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
              <FaGithub className="text-3xl" />
            </a>
            <a href={`mailto:${profileData.email}`} className="text-gray-500 hover:text-gray-900 transition-colors">
              <FaEnvelope className="text-3xl" />
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左カラム */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 強みと実績 */}
            <section>
              <SectionTitle icon={<FaMedal className="text-yellow-500" />} title="Strength & Achievement" />
              <div className="space-y-6">
                {profileData.strengths.map((strength, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg text-gray-800">{strength.title}</h3>
                    <p className="text-gray-600 mt-2">{strength.description}</p>
                  </div>
                ))}
                 {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg text-gray-800">{achievement.title}</h3>
                    <p className="text-gray-600 mt-2">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 経歴タイムライン */}
            <section>
              <SectionTitle icon={<FaGraduationCap className="text-blue-500" />} title="Timeline" />
              <div className="relative border-l-2 border-gray-200 pl-8">
                {profileData.timeline.map((item, index) => (
                  <div key={index} className="mb-10">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 mt-1.5 border-2 border-white"></div>
                    <p className="text-sm text-gray-500">{item.year}</p>
                    <h3 className="text-lg font-semibold text-gray-800">{item.event}</h3>
                    {item.description && <p className="text-gray-600">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 右カラム */}
          <div className="space-y-8">
            
            {/* スキルセット */}
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <SectionTitle icon={<FaCode className="text-green-500" />} title="Skills" />
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-700 flex items-center"><FaLanguage className="mr-2"/>言語</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    {profileData.skills.languages.map(lang => <li key={lang.name}>{lang.name} <span className="text-sm text-gray-500">({lang.experience})</span></li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-bold text-gray-700 flex items-center"><FaLaptopCode className="mr-2"/>フレームワーク等</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.skills.frameworks.map(fw => <span key={fw} className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">{fw}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 flex items-center"><FaCode className="mr-2"/>ツール・その他</h4>
                   <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.skills.tools.map(tool => <span key={tool} className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">{tool}</span>)}
                    {profileData.skills.others.map(other => <span key={other} className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">{other}</span>)}
                  </div>
                </div>
              </div>
            </section>
            
            {/* 趣味・資格 */}
            <section className="bg-white p-6 rounded-lg shadow-sm">
                <SectionTitle icon={<FaPencilAlt className="text-purple-500" />} title="Hobbies & Qualifications" />
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-gray-700 flex items-center"><FaSwimmer className="mr-2"/>趣味</h4>
                        <p className="text-gray-600">{profileData.hobbies.join(', ')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700 flex items-center"><FaBook className="mr-2"/>資格</h4>
                        <ul className="list-disc list-inside text-gray-600">
                           {profileData.qualifications.map(q => <li key={q}>{q}</li>)}
                        </ul>
                    </div>
                 </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}