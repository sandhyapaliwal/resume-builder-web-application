import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, ClipboardEdit, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const infoBlocks = [
  {
    key: "purpose",
    icon: <Info className="h-10 w-10 text-blue-500" />,
    title: "Purpose of this App",
    content: <p className="text-cyan-400"> "This app is a modern, user-friendly online resume builder designed to help users specially freshers. It effortlessly create, preview, and manage professional resumes. It offers a seamless experience with intuitive form inputs, real-time resume previews, and easy downloading or printing options. Integrated with a stylish and responsive UI,  organized management of multiple resumes."</p>
  },
  {
    key: "howto",
    icon: <ClipboardEdit className="h-10 w-10 text-cyan-400" />,
    title: "How to Use",
    content: <p className="text-cyan-400">"open this app then click on get started or dashboard button. you will be directed to dashboard page where you can create resume by clicking on add resume button and below are all the resume that you have created so far. As you fill out the resume-sections one by one you can see it in resume-preview. then click on print button and you resume is ready. All the resume data is saved in strapi."</p>
  },
  {
    key: "resumejobs",
    icon: <Briefcase className="h-10 w-10 text-blue-700" />,
    title: "How a Good Resume Can Land You a Good Job",
    content: <p className="text-cyan-400">"A simple, good and to-the-point resume is your first and best chance to make a strong impression in selection rounds. It clearly showcases your skills, experience, and achievements, helping you stand out from other candidates. With a professional, tailored resume, you're more likely to get noticed, secure interviews, and land the job you want."</p>
  },
];

function Home() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const handleToggle = (key) => setExpanded(cur => (cur === key ? null : key));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#a4bbe6] to-[#def3fc]">


      {/* Hero */}
      <div className="flex flex-col items-center justify-center pt-24 pb-10 px-4">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg mb-6">
          <svg width={44} height={44} viewBox="0 0 44 44" fill="none"><rect width={44} height={44} rx={12} fill="#fff"/><path d="M13 21h18M17 15h10M17 29h6" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round"/></svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-blue-600 mb-3 text-center select-none drop-shadow">
          RESUME BUILDER
        </h1>
        <p className="text-xl mb-8 font-medium text-slate-900/70 text-center max-w-[32rem]">
          Build, preview, and download a standout resume—fast, free, and professional.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-14 py-5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white text-2xl font-bold shadow-lg ring-2 ring-blue-200 hover:scale-105 transition"
        >
          GET STARTED
        </button>
      </div>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 pb-20">
  {infoBlocks.map((block) => (
    <div
      key={block.key}
      className={`flex flex-col items-center bg-white border border-gray-100 rounded-3xl shadow-lg transition-all
        ${expanded === block.key ? 'ring-4 ring-cyan-400 shadow-2xl z-10 scale-105' : 'hover:ring-2 hover:ring-blue-400 hover:scale-[1.03]'}
        cursor-pointer min-h-[420px] md:min-h-[460px] h-full w-full md:max-w-[500px] md:w-[96%]`}
      style={{ minWidth: 0, padding: "2.7rem 1.8rem", justifyContent: 'flex-start' }}
      onClick={() => handleToggle(block.key)}
    >
            {block.icon}
            <p className="text-2xl font-bold mt-4 mb-3 text-blue-600 text-center">{block.title}</p>
            <span className="flex items-center text-base text-cyan-500 font-semibold mb-2 select-none">
              {expanded === block.key ? (<><ChevronUp className="inline mr-1" />Less</>) : (<><ChevronDown className="inline mr-1" />More</>)}
            </span>
            <div className={`w-full transition-all duration-300 text-base text-slate-900 text-center overflow-hidden
              ${expanded === block.key ? 'opacity-100 max-h-[350px] py-4' : 'opacity-0 max-h-0 p-0'}`}
              style={{ minHeight: expanded === block.key ? 120 : 0 }}
            >
              {block.content}
            </div>
          </div>
        ))}
      </section>

      {/* Gentle divider */}
      <div className="mx-auto mb-12 w-4/5 h-3 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-200 opacity-30 blur-xl" />

      {/* Footer */}
      <footer className="w-full pb-7 flex flex-col items-center text-xs text-slate-400 select-none">
        © {new Date().getFullYear()} Resume Builder — Effortless, trustworthy, beautiful resumes.
      </footer>
    </div>
  );
}

export default Home;
