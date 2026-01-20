"use client";

import { useEffect, useMemo, useState } from "react";
import { ALL_SKILLS, type Level, type Skill } from "@/lib/data";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/app/components/login-modal";

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
  user_id?: string;
};

type Resume = {
  id: string;
  name: string;
  skills: Record<string, Level>;
  contact?: string;
};

function calculateMatchScore(
  skillsA: Record<string, Level>,
  skillsB: Record<string, Level>,
): number {
  const keys = Object.keys(skillsB);
  if (keys.length === 0) return 0;
  let matchCount = 0;
  keys.forEach((id) => {
    if (skillsA[id]) {
      matchCount++;
    }
  });
  return Math.round((matchCount / keys.length) * 100);
}

export default function PostJob() {
  const router = useRouter();
  const skills: Skill[] = useMemo(() => ALL_SKILLS, []);
  const categories = useMemo(
    () => Array.from(new Set(skills.map((s) => s.category))),
    [skills],
  );

  const [positions, setPositions] = useState<Position[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftSkills, setDraftSkills] = useState<Record<string, Level>>({});
  const [draftCompany, setDraftCompany] = useState("");
  const [draftContact, setDraftContact] = useState("");
  const [draftWorkType, setDraftWorkType] = useState<"全职" | "兼职" | null>(
    null,
  );
  const [draftMode, setDraftMode] = useState<"现场" | "Remote" | null>(null);
  const [draftCity, setDraftCity] = useState("");
  const [draftNegotiable, setDraftNegotiable] = useState(false);
  const [draftSalaryMinK, setDraftSalaryMinK] = useState<number | "">("");
  const [draftSalaryMaxK, setDraftSalaryMaxK] = useState<number | "">("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch my positions
        const { data: myPositions, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (myPositions && !jobsError) {
          const mappedPositions: Position[] = myPositions.map((p: any) => ({
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
            user_id: p.user_id,
          }));
          setPositions(mappedPositions);
        }
      } else {
        setShowLoginModal(true);
      }

      // Fetch all resumes (Resume Market)
      const { data: allResumes, error: resumesError } = await supabase
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (allResumes && !resumesError) {
        const mappedResumes: Resume[] = allResumes.map((r: any) => ({
          id: r.id,
          name: r.name,
          skills: r.skills,
          contact: r.contact,
        }));
        setResumes(mappedResumes);
      }

      setIsLoaded(true);
    }

    loadData();
  }, []);

  // Removed localStorage sync effect as we now use Supabase
  // useEffect(() => {
  //   localStorage.setItem("my_positions", JSON.stringify(positions));
  // }, [positions]);

  const toggleDraftSkill = (skillId: string) => {
    setDraftSkills((prev) => {
      const next = { ...prev };
      if (next[skillId]) {
        delete next[skillId];
      } else {
        next[skillId] = "Mid";
      }
      return next;
    });
  };

  const setDraftLevel = (skillId: string, level: Level) => {
    setDraftSkills((prev) => ({ ...prev, [skillId]: level }));
  };

  const startNewPosition = () => {
    if (positions.length >= 3) return;
    setEditingIndex(positions.length);
    setEditingId(null);
    setDraftTitle("");
    setDraftSkills({});
    setDraftCompany("");
    setDraftWorkType(null);
    setDraftMode(null);
    setDraftCity("");
    setDraftNegotiable(false);
    setDraftSalaryMinK("");
    setDraftSalaryMaxK("");
  };

  const editPosition = (index: number) => {
    const pos = positions[index];
    setEditingIndex(index);
    setEditingId(pos.id);
    setDraftTitle(pos.title);
    setDraftSkills(pos.requiredSkills);
    setDraftCompany(pos.company ?? "");
    setDraftWorkType(pos.workType ?? null);
    setDraftMode(pos.mode ?? null);
    setDraftCity(pos.city ?? "");
    setDraftNegotiable(Boolean(pos.negotiable));
    setDraftSalaryMinK(
      typeof pos.salaryMinK === "number" ? pos.salaryMinK : "",
    );
    setDraftSalaryMaxK(
      typeof pos.salaryMaxK === "number" ? pos.salaryMaxK : "",
    );
  };

  const saveDraft = async () => {
    if (
      !draftTitle.trim() ||
      !draftCompany.trim() ||
      !draftContact.trim() ||
      !draftWorkType ||
      !draftMode
    ) {
      return;
    }

    if (!user) {
      alert("请先登录");
      router.push("/auth/login");
      return;
    }

    if (!draftNegotiable) {
      if (
        draftSalaryMinK === "" ||
        draftSalaryMaxK === "" ||
        Number(draftSalaryMinK) <= 0 ||
        Number(draftSalaryMaxK) < Number(draftSalaryMinK)
      ) {
        return;
      }
      if (draftMode === "现场" && !draftCity.trim()) {
        return;
      }
    }

    const supabase = createClient();
    const positionData = {
      user_id: user.id,
      title: draftTitle.trim(),
      required_skills: draftSkills,
      company: draftCompany.trim(),
      contact: draftContact.trim(),
      work_type: draftWorkType,
      mode: draftMode,
      city: draftMode === "现场" ? draftCity.trim() : null,
      negotiable: draftNegotiable,
      salary_min_k:
        !draftNegotiable && draftSalaryMinK !== ""
          ? Number(draftSalaryMinK)
          : null,
      salary_max_k:
        !draftNegotiable && draftSalaryMaxK !== ""
          ? Number(draftSalaryMaxK)
          : null,
    };

    if (editingId) {
      // Update existing
      const { error } = await supabase
        .from("jobs")
        .update(positionData)
        .eq("id", editingId);

      if (error) {
        console.error("Error updating job:", error);
        alert("更新失败");
        return;
      }

      setPositions((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: positionData.title,
                requiredSkills: positionData.required_skills,
                company: positionData.company,
                contact: positionData.contact,
                workType: positionData.work_type,
                mode: positionData.mode,
                city: positionData.city || undefined,
                negotiable: positionData.negotiable,
                salaryMinK: positionData.salary_min_k || undefined,
                salaryMaxK: positionData.salary_max_k || undefined,
              }
            : p,
        ),
      );
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("jobs")
        .insert(positionData)
        .select()
        .single();

      if (error) {
        console.error("Error creating job:", error);
        alert("创建失败");
        return;
      }

      if (data) {
        const newPos: Position = {
          id: data.id,
          title: data.title,
          requiredSkills: data.required_skills,
          company: data.company,
          contact: data.contact,
          workType: data.work_type,
          mode: data.mode,
          city: data.city,
          negotiable: data.negotiable,
          salaryMinK: data.salary_min_k,
          salaryMaxK: data.salary_max_k,
          user_id: data.user_id,
        };
        setPositions((prev) => [...prev, newPos]);
      }
    }

    setEditingIndex(null);
    setEditingId(null);
    setDraftTitle("");
    setDraftSkills({});
    setDraftCompany("");
    setDraftContact("");
    setDraftWorkType(null);
    setDraftMode(null);
    setDraftCity("");
    setDraftNegotiable(false);
    setDraftSalaryMinK("");
    setDraftSalaryMaxK("");
  };

  if (!isLoaded) {
    return <div className="p-8 text-center text-slate-400">Loading...</div>;
  }

  const positionsWithScores = positions.map((pos) => {
    const resumesWithScore = resumes.map((r) => ({
      ...r,
      score: calculateMatchScore(r.skills, pos.requiredSkills),
    }));
    return { ...pos, resumesWithScore };
  });

  return (
    <div className="mx-auto max-w-5xl text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">我要招人</h1>
          <p className="mt-2 text-slate-300">
            创建最多三个岗位需求，并在简历市场中查看匹配度。
          </p>
        </div>
        <button
          onClick={startNewPosition}
          disabled={positions.length >= 3}
          className="flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 disabled:opacity-50"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-slate-950">
            +
          </span>
          添加需求
        </button>
      </header>

      {editingIndex !== null && (
        <section id="edit-section" className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 space-y-3">
              <div>
                <div className="text-sm text-slate-400">正在编辑的岗位</div>
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="请输入岗位名称，例如：具身智能算法工程师"
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <div className="text-sm text-slate-400">公司 / 团队名称</div>
                <input
                  value={draftCompany}
                  onChange={(e) => setDraftCompany(e.target.value)}
                  placeholder="例如：Sudo Robotics 或 某某研究组"
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <div className="text-sm text-slate-400">联系方式</div>
                <input
                  value={draftContact}
                  onChange={(e) => setDraftContact(e.target.value)}
                  placeholder="请输入邮箱 / 手机 / 微信号"
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={saveDraft}
              disabled={
                !draftTitle.trim() ||
                !draftCompany.trim() ||
                !draftContact.trim() ||
                !draftWorkType ||
                !draftWorkType ||
                !draftMode ||
                (!draftNegotiable &&
                  (draftSalaryMinK === "" ||
                    draftSalaryMaxK === "" ||
                    Number(draftSalaryMinK) <= 0 ||
                    Number(draftSalaryMaxK) < Number(draftSalaryMinK) ||
                    (draftMode === "现场" && !draftCity.trim())))
              }
              className="mt-4 rounded-full border border-indigo-500 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50 md:mt-0"
            >
              保存岗位
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-400">工作形式</div>
                <div className="mt-2 flex gap-2">
                  {(["全职", "兼职"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setDraftWorkType(type)}
                      className={[
                        "flex-1 rounded-full px-3 py-2 text-sm",
                        draftWorkType === type
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                      ].join(" ")}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">工作地点</div>
                <div className="mt-2 flex gap-2">
                  {(["现场", "Remote"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setDraftMode(m)}
                      className={[
                        "flex-1 rounded-full px-3 py-2 text-sm",
                        draftMode === m
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                      ].join(" ")}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                {draftMode === "现场" && (
                  <input
                    value={draftCity}
                    onChange={(e) => setDraftCity(e.target.value)}
                    placeholder="请输入城市，例如：上海 / 深圳"
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-400">薪资范围（K）</div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={draftSalaryMinK}
                    disabled={draftNegotiable}
                    onChange={(e) =>
                      setDraftSalaryMinK(
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                      )
                    }
                    className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-100 outline-none focus:border-indigo-500 disabled:opacity-50"
                    placeholder="最小"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    min={0}
                    value={draftSalaryMaxK}
                    disabled={draftNegotiable}
                    onChange={(e) =>
                      setDraftSalaryMaxK(
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                      )
                    }
                    className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-100 outline-none focus:border-indigo-500 disabled:opacity-50"
                    placeholder="最大"
                  />
                  <span className="text-sm text-slate-400">K</span>
                </div>
                <label className="mt-2 inline-flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={draftNegotiable}
                    onChange={(e) => setDraftNegotiable(e.target.checked)}
                    className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                  />
                  薪资面议
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-200">
              选择技术栈要求
            </h2>
            <div className="mt-4 space-y-6">
              {categories.map((cat) => {
                const group = skills.filter((s) => s.category === cat);
                return (
                  <section key={cat}>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {cat}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.map((skill) => {
                        const active = Boolean(draftSkills[skill.id]);
                        return (
                          <button
                            key={skill.id}
                            onClick={() => toggleDraftSkill(skill.id)}
                            className={[
                              "rounded-full border px-3 py-1 text-xs transition",
                              active
                                ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
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

            {Object.keys(draftSkills).length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-200">
                  设置各技能的期望等级
                </h3>
                <div className="mt-3 space-y-3">
                  {Object.entries(draftSkills).map(([id, level]) => {
                    const name = skills.find((s) => s.id === id)?.name ?? id;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2"
                      >
                        <span className="text-sm text-slate-100">{name}</span>
                        <div className="flex items-center gap-2">
                          {(["Junior", "Mid", "Senior"] as Level[]).map(
                            (lvl) => (
                              <button
                                key={lvl}
                                onClick={() => setDraftLevel(id, lvl)}
                                className={[
                                  "rounded-full px-3 py-1 text-xs",
                                  level === lvl
                                    ? "bg-emerald-500 text-slate-950"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                                ].join(" ")}
                              >
                                {lvl}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end border-t border-slate-800 pt-6">
            <button
              onClick={saveDraft}
              disabled={
                !draftTitle.trim() ||
                !draftCompany.trim() ||
                !draftContact.trim() ||
                !draftWorkType ||
                !draftWorkType ||
                !draftMode ||
                (!draftNegotiable &&
                  (draftSalaryMinK === "" ||
                    draftSalaryMaxK === "" ||
                    Number(draftSalaryMinK) <= 0 ||
                    Number(draftSalaryMaxK) < Number(draftSalaryMinK) ||
                    (draftMode === "现场" && !draftCity.trim())))
              }
              className="w-full rounded-full border border-indigo-500 bg-indigo-500/20 px-6 py-2.5 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50 md:w-auto"
            >
              保存岗位
            </button>
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-100">我的岗位需求</h2>
        {positions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">
            还没有创建任何岗位，点击右上角的加号添加需求。
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {positions.map((pos, index) => (
              <button
                key={pos.id}
                onClick={() => editPosition(index)}
                className="flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-indigo-500/60"
              >
                <div className="text-sm font-semibold text-slate-100">
                  {pos.title}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {(pos.company || "").trim() || "未填写公司名称"}
                  {pos.contact && ` · ${pos.contact}`}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {(pos.workType || "未指定") +
                    " · " +
                    (pos.mode === "现场"
                      ? `现场${pos.city ? ` · ${pos.city}` : ""}`
                      : pos.mode === "Remote"
                        ? "Remote"
                        : "未指定地点")}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {pos.negotiable
                    ? "薪资面议"
                    : pos.salaryMinK && pos.salaryMaxK
                      ? `${pos.salaryMinK}-${pos.salaryMaxK}K`
                      : "薪资未填写"}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  已选择 {Object.keys(pos.requiredSkills).length} 项技能要求
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-100">简历市场</h2>
        {resumes.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">
            暂无简历数据，候选人完成技能画像后会出现在这里。
          </p>
        ) : positionsWithScores.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">
            请先创建至少一个岗位需求，再查看匹配度。
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {resumes.map((r) => {
              const best = positionsWithScores
                .map((p) => ({
                  title: p.title,
                  score: calculateMatchScore(r.skills, p.requiredSkills),
                }))
                .sort((a, b) => b.score - a.score)[0];
              const skillCount = Object.keys(r.skills).length;
              return (
                <div
                  key={r.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-100">
                        {r.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {skillCount} 个技能
                        {r.contact && ` · ${r.contact}`}
                      </div>
                    </div>
                    {best && (
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div
                            className={`text-xl font-black ${
                              best.score >= 80
                                ? "text-emerald-400"
                                : best.score >= 50
                                  ? "text-yellow-400"
                                  : "text-slate-600"
                            }`}
                          >
                            {best.score}%
                          </div>
                          <div className="text-xs text-slate-500">
                            与「{best.title}」的匹配度
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedResume(r)}
                          className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                        >
                          显示详情
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
            <button
              onClick={() => setSelectedResume(null)}
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

            <div>
              <h2 className="text-2xl font-bold text-white">
                {selectedResume.name}
              </h2>
              <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="text-sm text-emerald-200/70">联系方式</div>
                <div className="mt-1 text-xl font-bold text-emerald-400">
                  {selectedResume.contact || "未提供联系方式"}
                </div>
              </div>

              <div className="mt-8">
                <div className="text-sm text-slate-500">技能画像</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(selectedResume.skills).map(
                    ([skillId, level]) => {
                      const skillName =
                        ALL_SKILLS.find((s) => s.id === skillId)?.name ||
                        skillId;
                      return (
                        <div
                          key={skillId}
                          className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300"
                        >
                          <span>{skillName}</span>
                          <span className="opacity-50">({level})</span>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
