"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ALL_SKILLS, type Level, type Skill } from "@/lib/data";

export default function CandidateOnboarding() {
  const router = useRouter();
  const skills: Skill[] = useMemo(() => ALL_SKILLS, []);
  const [showModal, setShowModal] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(skills.map((s) => s.category))),
    [skills],
  );

  const [selected, setSelected] = useState<Record<string, Level>>({});

  useEffect(() => {
    const stored = localStorage.getItem("my_skills");
    let parsed: Record<string, Level> = {};
    if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch {
        parsed = {};
      }
    }
    const hasSkills = Object.keys(parsed).length > 0;
    setTimeout(() => {
      if (hasSkills) {
        setSelected(parsed);
      } else {
        setShowFirstModal(true);
      }
    }, 0);
  }, []);

  const toggleSkill = (skillId: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[skillId]) {
        delete next[skillId];
      } else {
        next[skillId] = "Mid";
      }
      return next;
    });
  };

  const setLevel = (skillId: string, level: Level) => {
    setSelected((prev) => ({ ...prev, [skillId]: level }));
  };

  const handleSave = () => {
    localStorage.setItem("my_skills", JSON.stringify(selected));
    const resumesRaw = localStorage.getItem("resume_market");
    let resumes: { id: string; name: string; skills: Record<string, Level> }[] =
      [];
    if (resumesRaw) {
      try {
        resumes = JSON.parse(resumesRaw);
      } catch {
        resumes = [];
      }
    }
    const me = {
      id: "me",
      name: "我的简历",
      skills: selected,
    };
    const filtered = resumes.filter((r) => r.id !== "me");
    filtered.push(me);
    localStorage.setItem("resume_market", JSON.stringify(filtered));
    setShowModal(true);
  };

  const selectedList = useMemo(
    () =>
      Object.entries(selected).map(([id, level]) => ({
        id,
        level,
        name: skills.find((s) => s.id === id)?.name ?? id,
      })),
    [selected, skills],
  );

  return (
    <div className="mx-auto max-w-5xl text-white">
      <h1 className="text-3xl font-bold tracking-tight text-indigo-400">
        Build Your Skill Profile
      </h1>
      <p className="mt-2 text-slate-300">
        Select your skills and set proficiency levels.
      </p>

      <div className="mt-8 space-y-8">
        {categories.map((cat) => {
          const group = skills.filter((s) => s.category === cat);
          return (
            <section key={cat}>
              <h2 className="text-lg font-semibold text-slate-200">{cat}</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {group.map((skill) => {
                  const active = Boolean(selected[skill.id]);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition",
                        active
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-200"
                          : "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-600",
                      ].join(" ")}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {selectedList.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-200">
            Set Proficiency
          </h3>
          <div className="mt-4 space-y-4">
            {selectedList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3"
              >
                <span className="text-slate-100">{item.name}</span>
                <div className="flex items-center gap-2">
                  {(["Junior", "Mid", "Senior"] as Level[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(item.id, lvl)}
                      className={[
                        "rounded-full px-3 py-1 text-xs",
                        item.level === lvl
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                      ].join(" ")}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Selected {selectedList.length} skills
        </div>
        <button
          onClick={handleSave}
          disabled={selectedList.length === 0}
          className="rounded-full border border-indigo-500 bg-indigo-500/20 px-5 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50"
        >
          Save & Find Jobs
        </button>
      </div>

      {showFirstModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold text-indigo-300">
              您还没有创建过任何简历
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              是否现在创建一份技能画像，或者先去岗位市场逛一逛？
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => router.push("/candidate/jobs")}
                className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              >
                先逛逛市场
              </button>
              <button
                onClick={() => setShowFirstModal(false)}
                className="rounded-full border border-indigo-500 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30"
              >
                现在创建
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold text-indigo-300">创建个人简历完成</h2>
            <p className="mt-2 text-sm text-slate-300">
              你已保存技能画像，可以前往需求市场查看岗位。
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              >
                继续编辑
              </button>
              <button
                onClick={() => router.push("/candidate/jobs")}
                className="rounded-full border border-indigo-500 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30"
              >
                查看需求市场
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
