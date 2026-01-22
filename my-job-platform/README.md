# Sudo Club

Sudo Club 是一个连接具身智能（Embodied AI）与机器人领域顶尖人才的平台。
这里不仅是求职招聘的场所，更是寻找论文搭子、创业合伙人和比赛队友的社区。基于技术栈颗粒度（Tech Stack Granularity）的精准匹配，助你快速找到志同道合的伙伴。

## 🌟 主要功能

### 🧑‍💻 我是人才 (Find Organization)
- **技能画像构建**：详细录入个人技术栈（如 SLAM, ROS, PyTorch 等）及熟练度。
- **简历管理**：创建、修改、删除个人简历信息。
- **岗位/组织市场**：浏览发布的职位和招募需求，查看与自身技能的匹配度（Match Score）。

### 🏢 我要招人 (I want to recruit)
- **发布需求**：发布工作职位、科研合作或创业合伙人招募需求（支持全职/兼职/Remote）。
- **简历市场**：浏览候选人列表，直观查看技能匹配情况。
- **人才详情**：查看候选人详细技能画像及联系方式。

### 核心特性
- **精准匹配算法**：基于技能树的自动匹配评分系统。
- **多样化连接**：覆盖求职、科研（CVPR/ICRA等）、创业、竞赛（Kaggle等）多种场景。

## 🛠️ 技术栈

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- **Language**: TypeScript

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd my-job-platform
```

### 2. 安装依赖

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件，并填入 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 初始化数据库

使用项目根目录下的 `supabase_setup.sql` 在 Supabase SQL Editor 中运行，以创建必要的表结构（`jobs`, `resumes`）和安全策略（RLS）。

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📂 项目结构

```
my-job-platform/
├── app/
│   ├── candidate/       # 求职者/人才相关页面 (Onboarding, Jobs)
│   ├── employer/        # 招聘者相关页面 (Post Job)
│   ├── components/      # 公共组件 (LoginModal, AuthNav)
│   ├── utils/supabase/  # Supabase 客户端与服务端配置
│   └── ...
├── lib/                 # 公共数据 (Skills 定义) 与工具函数
├── public/              # 静态资源
└── supabase_setup.sql   # 数据库初始化脚本
```

## 📝 部署

本项目适配 [Vercel](https://vercel.com/) 部署。请确保在 Vercel 项目设置中配置相应的环境变量。

---

Built with ❤️ for the Embodied AI Community.
