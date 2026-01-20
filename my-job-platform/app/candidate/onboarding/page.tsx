"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ALL_SKILLS, type Level, type Skill } from "@/lib/data";
import { createClient } from "@/app/utils/supabase/client";
import { LoginModal } from "@/app/components/login-modal";

export default function CandidateOnboarding() {
  const router = useRouter();
  const skills: Skill[] = useMemo(() => ALL_SKILLS, []);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasResume, setHasResume] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(skills.map((s) => s.category))),
    [skills],
  );

  const [selected, setSelected] = useState<Record<string, Level>>({});
  const [contact, setContact] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch existing resume from Supabase
        const { data: resume, error } = await supabase
          .from("resumes")
          .select("skills, contact, nickname")
          .eq("user_id", user.id)
          .single();

        if (resume && !error) {
          // Cast the JSONB back to Record<string, Level>
          setSelected((resume.skills as unknown as Record<string, Level>) || {});
          setContact(resume.contact || "");
          setNickname(resume.nickname || "");
          setHasResume(true);
          setIsEditing(false);
        } else {
          // If no resume found in Supabase, try localStorage for migration (optional, but good UX)
          // Or just show first modal
          setHasResume(false);
          setIsEditing(true);
          setShowFirstModal(true);
        }
      } else {
        // Not logged in
         setShowLoginModal(true);
      }
      setLoading(false);
    }

    loadData();
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

  const handleSave = async () => {
    if (!contact.trim()) {
      alert("请输入联系方式");
      return;
    }

    if (!user) {
      alert("请先登录");
      router.push("/auth/login");
      return;
    }

    const supabase = createClient();
    const resumeData = {
      user_id: user.id,
      name: nickname.trim() ? `${nickname.trim()}的简历` : (user.email ? `${user.email.split("@")[0]}的简历` : "我的简历"),
      skills: selected,
      contact: contact.trim(),
      nickname: nickname.trim(),
    };

    // Upsert logic: try to insert, on conflict update
    const { error } = await supabase
      .from("resumes")
      .upsert(resumeData, { onConflict: "user_id" });

    if (error) {
      console.error("Error saving resume:", error);
      alert("保存失败，请重试");
      return;
    }

    setHasResume(true);
    // Optional: exit edit mode after save
    // setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!confirm("确定要删除您的简历吗？删除后不可恢复。")) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("resumes")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting resume:", error);
      alert("删除失败，请重试");
      return;
    }

    setHasResume(false);
    setIsEditing(true);
    setSelected({});
    setContact("");
    setNickname("");
    setShowFirstModal(true);
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

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading...</div>;
  }

  if (hasResume && !isEditing) {
    return (
      <div className="mx-auto max-w-4xl text-white">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-400">
          简历管理
        </h1>
        <p className="mt-2 text-slate-300">
          查看和管理您的个人简历信息。
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {nickname || "未设置昵称"}
              </h2>
              <div className="mt-2 text-slate-400">
                {contact || "未设置联系方式"}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                  已选技能: {selectedList.length} 个
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full border border-indigo-500 bg-indigo-500/20 px-6 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30"
              >
                修改简历
              </button>
              <button
                onClick={handleDelete}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-6 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
              >
                删除简历
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8">
            <h3 className="text-lg font-semibold text-slate-200">技能概览</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  <span>{item.name}</span>
                  <span className="opacity-50">({item.level})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-400">
          {hasResume ? "Modify Your Resume" : "Build Your Skill Profile"}
        </h1>
        {hasResume && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-slate-400 hover:text-white"
          >
            取消修改
          </button>
        )}
      </div>
      <p className="mt-2 text-slate-300">
        Select your skills and set proficiency levels.
      </p>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-200">
          如何称呼你
        </label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="请输入您的名字或昵称（如：Alex）"
          className="mt-2 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-200">
          联系方式
        </label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="请输入邮箱 / 手机 / 微信号，方便招聘者联系"
          className="mt-2 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>



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

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}

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
