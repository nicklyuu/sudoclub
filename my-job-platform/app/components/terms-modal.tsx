"use client";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h2 className="text-xl font-bold text-white">使用条款</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 18 18"/>
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300">
            <div>
              <h3 className="mb-2 font-bold text-white">Sudo Club 用户协议与免责声明</h3>
              <p className="text-slate-400">Terms of Use & Disclaimer</p>
            </div>

            <section>
              <h4 className="mb-2 font-semibold text-slate-200">1. 接受条款 (Acceptance of Terms)</h4>
              <p className="mb-2">
                注册并使用 Sudo Club（以下简称“本平台”），即表示您同意遵守以下所有条款。如果您不同意，请勿注册或使用本服务。
              </p>
              <p className="italic text-slate-400">
                By registering and using Sudo Club (hereinafter referred to as "the Platform"), you agree to comply with all the following terms. If you do not agree, please do not register or use the service.
              </p>
            </section>

            <section>
              <h4 className="mb-2 font-semibold text-slate-200">2. 用户行为规范 (User Conduct)</h4>
              <p className="mb-2">
                您承诺在平台上发布的所有信息（包括但不限于简历、职位描述、公司信息）均 <strong className="text-white">真实、合法、有效</strong>。严禁利用本平台进行 <strong className="text-white">欺诈、传销、虚假招聘</strong> 或其他违法活动。
              </p>
              <p className="italic text-slate-400">
                You promise that all information you post on the Platform (including but not limited to resumes, job descriptions, and company details) is <strong className="text-slate-200">true, lawful, and valid</strong>. It is strictly prohibited to use the Platform for <strong className="text-slate-200">fraud, pyramid schemes, fake recruitment</strong>, or any other illegal activities.
              </p>
            </section>

            <section>
              <h4 className="mb-2 font-semibold text-slate-200">3. 平台角色与免责声明 (Platform Role & Disclaimer)</h4>
              <p className="mb-2">
                本平台仅作为 <strong className="text-white">信息发布与撮合的技术服务提供方</strong>。我们无法也不会对所有用户发布的信息进行实时核实。<strong className="text-white">您需自行判断信息的真实性并承担风险。</strong> 对于因求职、招聘或与其他用户互动而产生的任何资金损失、纠纷或法律后果，<strong className="text-white">本平台不承担任何法律责任</strong>。
              </p>
              <p className="italic text-slate-400">
                The Platform serves only as a <strong className="text-slate-200">technical service provider for information publishing and matching</strong>. We cannot and do not verify all information posted by users in real-time. <strong className="text-slate-200">You must judge the authenticity of the information yourself and assume all risks.</strong> The Platform <strong className="text-slate-200">assumes no legal liability</strong> for any financial losses, disputes, or legal consequences arising from job seeking, recruitment, or interactions with other users.
              </p>
            </section>

            <section>
              <h4 className="mb-2 font-semibold text-slate-200">4. 账号关停 (Termination)</h4>
              <p className="mb-2">
                一旦发现用户涉嫌发布虚假信息、诈骗或骚扰他人，本平台有权在 <strong className="text-white">不通知的情况下直接封禁账号</strong>，并保留向有关部门举报的权利。
              </p>
              <p className="italic text-slate-400">
                If a user is suspected of posting false information, committing fraud, or harassing others, the Platform reserves the right to <strong className="text-slate-200">ban the account immediately without notice</strong> and report to relevant authorities.
              </p>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">
          <button
            onClick={onClose}
            className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            我已阅读
          </button>
        </div>
      </div>
    </div>
  );
}
