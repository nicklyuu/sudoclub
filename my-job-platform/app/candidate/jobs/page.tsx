"use client";

import { useEffect, useState } from "react";
import { ALL_SKILLS, type Level } from "@/lib/data";
import { createClient } from "@/app/utils/supabase/client";

type Position = {
  id: string;
  title: string;
  requiredSkills: Record<string, Level>;
  workType?: "全职" | "兼职";
  mode?: "现场" | "Remote";
  city?: string;
  salaryMinK?: number;
  salaryMaxK?: number;
  negotiable?: boolean;
  company?: string;
  contact?: string;
};

// 简单的匹配算法：计算已选技能与岗位要求技能的重合度
function calculateMatchScore(
  mySkills: Record<string, Level>,
  jobSkills: Record<string, Level>,
): number {
  const jobSkillIds = Object.keys(jobSkills);
  if (jobSkillIds.length === 0) return 0;

  let matchCount = 0;
  jobSkillIds.forEach((id) => {
    if (mySkills[id]) {
      // 这里可以加更复杂的逻辑，比如等级匹配权重
      // 简单版：只要有这个技能就算匹配
      matchCount++;
    }
  });

  return Math.round((matchCount / jobSkillIds.length) * 100);
}

export default function JobMarket() {
  const [mySkills, setMySkills] = useState<Record<string, Level>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<(Position & { score: number }) | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Fetch my skills (profile)
      if (user) {
        const { data: resume, error: resumeError } = await supabase
          .from("resumes")
          .select("skills")
          .eq("user_id", user.id)
          .single();

        if (resume && !resumeError) {
          setMySkills((resume.skills as unknown as Record<string, Level>) || {});
        }
      }

      // Fetch all jobs
      const { data: allJobs, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (allJobs && !jobsError) {
        const mappedJobs: Position[] = allJobs.map((p: any) => ({
          id: p.id,
          title: p.title,
          requiredSkills: p.required_skills, // Note: DB column is required_skills
          workType: p.work_type,
          mode: p.mode,
          city: p.city,
          salaryMinK: p.salary_min_k,
          salaryMaxK: p.salary_max_k,
          negotiable: p.negotiable,
          company: p.company,
          contact: p.contact,
        }));
        setPositions(mappedJobs);
      }

      setIsLoaded(true);
    }

    loadData();
  }, []);

  if (!isLoaded) {
    return <div className="p-8 text-center text-slate-400">Loading...</div>;
  }

  const jobsWithScore = positions
    .map((job) => ({
      ...job,
      score: calculateMatchScore(mySkills, job.requiredSkills),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-4xl text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">Job Market</h1>
        <p className="mt-2 text-slate-400">
          Based on your {Object.keys(mySkills).length} skills and{" "}
          {positions.length} open positions.
        </p>
      </header>

      {jobsWithScore.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
          暂时还没有招聘者发布岗位，稍后再来看。
        </div>
      ) : (
        <div className="space-y-6">
          {jobsWithScore.map((job) => (
            <div
              key={job.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">
                    {job.title}
                  </h2>
                  <div className="mt-1 text-sm text-slate-400">
                    {(job.company || "").trim() || "未填写公司名称"}
                    {job.contact && ` · ${job.contact}`}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {(job.workType || "未指定") +
                      " · " +
                      (job.mode === "现场"
                        ? `现场${job.city ? ` · ${job.city}` : ""}`
                        : job.mode === "Remote"
                          ? "Remote"
                          : "未指定地点")}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {job.negotiable
                      ? "薪资面议"
                      : job.salaryMinK && job.salaryMaxK
                        ? `${job.salaryMinK}-${job.salaryMaxK}K`
                        : "薪资未填写"}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`text-2xl font-black ${
                      job.score >= 80
                        ? "text-emerald-400"
                        : job.score >= 50
                          ? "text-yellow-400"
                          : "text-slate-600"
                    }`}
                  >
                    {job.score}%
                  </div>
                  <div className="text-xs text-slate-500">Match Score</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tech Stack Requirements
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(job.requiredSkills).map(([skillId, level]) => {
                    const skillName =
                      ALL_SKILLS.find((s) => s.id === skillId)?.name || skillId;
                    const haveIt = Boolean(mySkills[skillId]);

                    return (
                      <div
                        key={skillId}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                          haveIt
                            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-200"
                            : "border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                      >
                        <span>{skillName}</span>
                        <span className="opacity-50">({level})</span>
                        {haveIt && (
                          <span className="ml-1 text-emerald-400">✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="rounded-full bg-slate-100 px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-white"
                >
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start justify-between pr-10">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedJob.title}
                </h2>
                <div className="mt-2 text-lg text-indigo-400">
                  {selectedJob.company || "未填写公司名称"}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={`text-3xl font-black ${
                    selectedJob.score >= 80
                      ? "text-emerald-400"
                      : selectedJob.score >= 50
                        ? "text-yellow-400"
                        : "text-slate-600"
                  }`}
                >
                  {selectedJob.score}%
                </div>
                <div className="text-xs text-slate-500">匹配度</div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">基本信息</div>
                  <div className="mt-1 flex flex-wrap gap-2 text-slate-300">
                    <span className="rounded bg-slate-800 px-2 py-1 text-sm">
                      {selectedJob.workType || "未指定"}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-1 text-sm">
                      {selectedJob.mode === "现场"
                        ? `现场 · ${selectedJob.city || "未填写"}`
                        : selectedJob.mode || "未指定"}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-1 text-sm">
                      {selectedJob.negotiable
                        ? "薪资面议"
                        : selectedJob.salaryMinK
                          ? `${selectedJob.salaryMinK}-${selectedJob.salaryMaxK}K`
                          : "薪资未填写"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">联系方式</div>
                  <div className="mt-1 text-lg font-semibold text-emerald-400">
                    {selectedJob.contact || "未提供联系方式"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-sm text-slate-500">技能要求</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(selectedJob.requiredSkills).map(
                  ([skillId, level]) => {
                    const skillName =
                      ALL_SKILLS.find((s) => s.id === skillId)?.name || skillId;
                    const haveIt = Boolean(mySkills[skillId]);

                    return (
                      <div
                        key={skillId}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                          haveIt
                            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-200"
                            : "border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                      >
                        <span>{skillName}</span>
                        <span className="opacity-50">({level})</span>
                        {haveIt && (
                          <span className="ml-1 text-emerald-400">✓</span>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
