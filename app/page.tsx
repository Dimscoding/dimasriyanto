"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUp,
  Bot,
  Camera,
  Check,
  ChevronRight,
  Layers3,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  Printer,
  Send,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const sections = ["home", "about", "journey", "projects", "contact"];

const journey = [
  {
    number: "01",
    icon: Printer,
    title: "Graphic Designer",
    label: "Digiprint Lombok · Jun 2025–Jun 2026",
    text: "Merancang dan memproduksi materi visual untuk kebutuhan cetak dan digital sambil berkolaborasi langsung dengan klien.",
    points: ["Banner & paper", "Merchandise", "Acrylic design"],
  },
  {
    number: "02",
    icon: MonitorSmartphone,
    title: "Media & Network",
    label: "HMPS Sosiologi Agama · Jul 2023–Feb 2024",
    text: "Memimpin divisi media dan jaringan, mengelola komunikasi organisasi, konten sosial, serta relasi internal dan eksternal.",
    points: ["Social media", "Communication", "Team coordination"],
  },
  {
    number: "03",
    icon: PenTool,
    title: "Digital Content Writer",
    label: "Rarang Batas Village Website · Jul–Aug 2024",
    text: "Menulis dan mempublikasikan kegiatan KKP, termasuk program digitalisasi desa dan peningkatan pelayanan publik melalui OpenSID.",
    points: ["Article writing", "Digital literacy", "Web publishing"],
  },
  {
    number: "04",
    icon: Palette,
    title: "Campus Visual Contribution",
    label: "UIN Mataram · 2021–2025",
    text: "Lulus S1 Sosiologi Agama sekaligus dipercaya membuat materi komunikasi visual untuk berbagai kegiatan akademik.",
    points: ["Academic banners", "Event flyers", "Visual communication"],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [introPhase, setIntroPhase] = useState<"loading" | "exit" | "done">("loading");
  const [introProgress, setIntroProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroProgress(100);
      setIntroPhase("done");
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const startTime = performance.now();
    let animationFrame = 0;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const animateIntro = (currentTime: number) => {
      const progress = Math.min(100, ((currentTime - startTime) / 3000) * 100);
      setIntroProgress(progress);

      if (progress < 100) {
        animationFrame = requestAnimationFrame(animateIntro);
      } else {
        setIntroPhase("exit");
        finishTimer = setTimeout(() => {
          setIntroPhase("done");
          document.body.style.overflow = originalOverflow;
        }, 850);
      }
    };

    animationFrame = requestAnimationFrame(animateIntro);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (finishTimer) clearTimeout(finishTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = availableScroll > 0 ? (window.scrollY / availableScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "-22% 0px -58%", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setFormStatus("Koneksi Supabase belum ditemukan. Periksa Environment Variables di Vercel.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus("Mengirim pesan...");

    const { error } = await supabase.from("contact_messages").insert({
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    });

    if (error) {
      console.error("Supabase contact error:", error.message);
      setFormStatus("Pesan belum berhasil dikirim. Silakan coba kembali beberapa saat lagi.");
    } else {
      form.reset();
      setFormStatus("Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!");
    }

    setIsSubmitting(false);
  };

  const introStage = introProgress < 34 ? 0 : introProgress < 68 ? 1 : 2;
  const introMessages = [
    { lead: "EVERYTHING STARTS", accent: "WITH AN IDEA." },
    { lead: "PRINT. DIGITAL.", accent: "AI CREATIVE." },
    { lead: "WELCOME TO", accent: "MY PORTFOLIO." },
  ];

  return (
    <>
      {introPhase !== "done" && (
        <div className={`intro-overlay ${introPhase === "exit" ? "is-exiting" : ""}`}>
          <div className="intro-aurora intro-aurora-one" />
          <div className="intro-aurora intro-aurora-two" />
          <div className="intro-orbit intro-orbit-one"><i /></div>
          <div className="intro-orbit intro-orbit-two"><i /></div>
          <div className="intro-message" key={introStage}>
            <span>{introMessages[introStage].lead}</span>
            <strong>{introMessages[introStage].accent}</strong>
          </div>
          <div className="intro-loader">
            <div className="intro-loader-meta">
              <span>Preparing creative experience</span>
              <b>{String(Math.round(introProgress)).padStart(3, "0")}%</b>
            </div>
            <div className="intro-loader-track">
              <i style={{ width: `${introProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="scroll-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <b>{String(Math.round(scrollProgress)).padStart(3, "0")}%</b>
      </div>

      <main className="site-shell">
      <div className="site-noise" aria-hidden="true" />

      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")} aria-label="Kembali ke awal">
          <span>DR</span><b>©26</b>
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navigasi utama">
          {sections.map((id) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => goTo(id)}
            >
              {id === "home" ? "Home" : id === "about" ? "About" : id === "journey" ? "Journey" : id === "projects" ? "Projects" : "Contact"}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="available-chip" onClick={() => goTo("contact")}>
            <i /> Open for work
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section id="home" className="page-section hero-section is-visible">
        <div className="hero-grid section-inner reveal-block">
          <div className="hero-content">
            <div className="section-tag"><Sparkles size={15} /> Everything starts with an idea</div>
            <h1>
              TURNING
              <span>IDEAS</span>
              INTO <em>EXPERIENCES.</em>
            </h1>
            <p className="hero-intro">
              Saya Dimas Riyanto—graphic designer dengan fondasi percetakan,
              perspektif digital, dan workflow kreatif berbasis AI.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => goTo("projects")}>
                Explore projects <ArrowDownRight size={19} />
              </button>
              <button className="text-button" onClick={() => goTo("about")}>
                Get to know me <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-label="Identitas visual Dimas Riyanto">
            <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
            <div className="hero-aurora hero-aurora-two" aria-hidden="true" />
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="identity-card">
              <div className="identity-head">
                <span>CREATIVE ID</span><b>№ 001</b>
              </div>
              <div className="identity-mark">DR<span>.</span></div>
              <div className="identity-copy">
                <small>GRAPHIC DESIGNER</small>
                <strong>DIMAS<br />RIYANTO</strong>
                <p>PRINT × DIGITAL × AI</p>
              </div>
              <div className="identity-dots"><i /><i /><i /></div>
            </div>
            <div className="float-tool tool-pen"><PenTool /></div>
            <div className="float-tool tool-ai"><WandSparkles /></div>
            <span className="float-label label-print">PRINT READY</span>
            <span className="float-label label-ai">AI ENABLED</span>
            <span className="motion-word word-idea">IDEA</span>
            <span className="motion-word word-sketch">SKETCH</span>
            <span className="motion-word word-impact">IMPACT</span>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div>PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span> DIGITAL CONTENT <span>✦</span> AI CREATIVE <span>✦</span> PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span></div>
        </div>
      </section>

      <section id="about" className="page-section dotted-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">ABOUT ME</div>
            <span className="section-number">01 — PROFILE</span>
          </div>

          <div className="about-grid">
            <div className="about-statement">
              <p className="redline">I CREATE VISUAL EXPERIENCES.</p>
              <h2>GOOD DESIGN SHOULD LOOK SHARP—AND <em>WORK HARD.</em></h2>
            </div>
            <div className="about-copy card-frame">
              <p>
                Saya adalah lulusan S1 Sosiologi Agama UIN Mataram dengan pengalaman
                profesional sebagai graphic designer di industri percetakan dan
                periklanan. Pengalaman produksi membentuk cara saya menyusun visual:
                jelas, terukur, dan siap diwujudkan.
              </p>
              <p>
                Saya memanfaatkan teknologi AI sebagai bagian dari workflow kreatif
                untuk mempercepat eksplorasi ide dan meningkatkan kualitas visual,
                didukung pengalaman di bidang media, komunikasi, serta literasi digital.
              </p>
              <div className="profile-facts">
                <div><span>Education</span><b>S1 Sosiologi Agama</b><small>UIN Mataram · 2021–2025</small></div>
                <div><span>Based in</span><b>Mataram, NTB</b><small>Available for creative work</small></div>
              </div>
            </div>
          </div>

          <div className="value-grid">
            <article><span>01</span><Printer /><h3>Production-minded</h3><p>Paham bagaimana desain berakhir menjadi produk cetak.</p></article>
            <article><span>02</span><Layers3 /><h3>Multi-format</h3><p>Mampu berpindah dari kebutuhan fisik ke ruang digital.</p></article>
            <article><span>03</span><Sparkles /><h3>AI-augmented</h3><p>Menggunakan teknologi untuk memperkuat proses kreatif.</p></article>
          </div>
        </div>
      </section>

      <section id="journey" className="page-section dark-section">
        <div className="section-inner reveal-block">
          <div className="section-heading light-heading">
            <div className="boxed-title lime-title">CREATIVE JOURNEY</div>
            <span className="section-number">02 — HOW I GROW</span>
          </div>

          <div className="journey-intro">
            <h2>REAL EXPERIENCE.<br /><em>CREATIVE DIRECTION.</em></h2>
            <p>Perjalanan dari komunikasi, media, dan pendidikan menuju desain grafis yang dekat dengan kebutuhan nyata.</p>
          </div>

          <div className="journey-list">
            {journey.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.number} className="journey-card">
                  <div className="journey-index">{item.number}</div>
                  <div className="journey-icon"><Icon size={28} /></div>
                  <div className="journey-main">
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <ul>
                    {item.points.map((point) => <li key={point}><Check size={14} /> {point}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="toolbelt">
            <span>TOOLS & WORKFLOW</span>
            <div>
              <b>CorelDRAW</b><b>Canva</b><b>Microsoft Office</b><b>ChatGPT</b><b>AI Image Tools</b><b>Print Production</b>
            </div>
          </div>

          <div className="additional-experience">
            <article><span>JAN 2023–MAY 2025</span><strong>Yayasan Taajul Huffaz</strong><p>Part-time Quran teacher for students aged 7–15.</p></article>
            <article><span>OCT–NOV 2024</span><strong>BNN Kota Mataram</strong><p>Internship supporting public outreach, administration, and program documentation.</p></article>
          </div>
        </div>
      </section>

      <section id="projects" className="page-section projects-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">PROJECTS</div>
            <span className="section-number">03 — SELECTED WORK</span>
          </div>

          <div className="projects-head">
            <div>
              <p className="redline">A growing visual archive</p>
              <h2>PROJECTS BUILT<br />FROM REAL NEEDS.</h2>
            </div>
            <p>
              Tekan folder untuk melihat kelompok proyek. Karya asli dapat dimasukkan
              ke tiap kategori saat materi portofolio sudah siap.
            </p>
          </div>

          <div className={folderOpen ? "archive is-open" : "archive"}>
            <div className="archive-card archive-print">
              <div><Printer /><span>01</span></div><h3>Print & Production</h3><p>Banner, packaging, sticker, menu, dan kebutuhan promosi.</p>
            </div>
            <div className="archive-card archive-brand">
              <div><Palette /><span>02</span></div><h3>Brand & Social</h3><p>Identitas visual, konten sosial, dan campaign design.</p>
            </div>
            <div className="archive-card archive-ai">
              <div><Bot /><span>03</span></div><h3>AI Exploration</h3><p>Generative image, visual concept, dan smart workflow.</p>
            </div>

            <button
              className="folder-button"
              onClick={() => setFolderOpen((open) => !open)}
              aria-expanded={folderOpen}
              aria-label={folderOpen ? "Tutup folder proyek" : "Buka folder proyek"}
            >
              <img src="/assets/project-folder.webp" alt="Folder 3D kumpulan proyek desain" width="1280" height="853" />
              <span><strong>{folderOpen ? "CLOSE ARCHIVE" : "OPEN PROJECTS"}</strong><small>Click the folder</small></span>
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title lime-title">CONTACT</div>
            <span className="section-number">04 — LET&apos;S TALK</span>
          </div>

          <div className="contact-grid">
            <div className="contact-copy-block">
              <p className="redline">Have a project in mind?</p>
              <h2>LET&apos;S MAKE<br /><em>SOMETHING<br />MEMORABLE.</em></h2>
              <p>Ceritakan kebutuhan desainmu—untuk percetakan, digital, branding, atau eksplorasi kreatif dengan AI.</p>
              <div className="social-preview" aria-label="Kanal kontak Dimas Riyanto">
                <a href="mailto:dimsrynto09@gmail.com" aria-label="Kirim email ke Dimas" title="Email"><Mail size={21} /></a>
                <a href="https://www.instagram.com/aaadimm09" target="_blank" rel="noreferrer" aria-label="Buka Instagram Dimas" title="Instagram"><Camera size={21} /></a>
                <a href="https://wa.me/6281996993639" target="_blank" rel="noreferrer" aria-label="Hubungi Dimas melalui WhatsApp" title="WhatsApp"><Send size={21} /></a>
              </div>
              <div className="direct-contact">
                <a href="mailto:dimsrynto09@gmail.com"><span>Email</span><b>dimsrynto09@gmail.com</b></a>
                <a href="https://wa.me/6281996993639" target="_blank" rel="noreferrer"><span>WhatsApp</span><b>+62 819-9699-3639</b></a>
                <a href="https://www.instagram.com/aaadimm09" target="_blank" rel="noreferrer"><span>Instagram</span><b>@aaadimm09</b></a>
              </div>
            </div>

            <form className="contact-form card-frame" onSubmit={handleContactSubmit}>
              <label>
                Your name
                <input name="name" type="text" placeholder="Nama kamu" required />
              </label>
              <label>
                Your email
                <input name="email" type="email" placeholder="email@contoh.com" required />
              </label>
              <label>
                Your message
                <textarea name="message" placeholder="Ceritakan proyek yang ingin dibuat..." rows={6} required />
              </label>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"} <Send size={19} />
              </button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div><span>DR.</span><p>Dimas Riyanto — Graphic Designer & AI Creative</p></div>
        <button onClick={() => goTo("home")}>Back to top <ArrowUp size={17} /></button>
      </footer>
      </main>
    </>
  );
}
