"use client";

import { Fragment, type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Images,
  Layers3,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  Printer,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const sections = ["home", "about", "journey", "projects", "contact"];

const displayHeading = (text: string) =>
  text.split(/([&0-9–-]+)/).filter(Boolean).map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {/^[&0-9–-]+$/.test(part) ? <span className="heading-symbol">{part}</span> : part}
    </Fragment>
  ));

type GalleryKey = "print" | "brand" | "ai" | "digitalWriter" | "bnn" | "uin";

type GalleryItem = {
  src: string;
  title: string;
  alt: string;
};

type Gallery = {
  eyebrow: string;
  title: string;
  description: string;
  items: GalleryItem[];
  feature?: {
    label: string;
    title: string;
    href: string;
  };
};

const thesis = {
  label: "Undergraduate Thesis",
  title: "Motif Sosial Generasi Z dalam Mengikuti Kajian Ta’limul Fiqh Habib Hasan Alaydrus Melalui Organisasi Risulthan",
  href: "https://etheses.uinmataram.ac.id/10985/",
};

const galleries: Record<GalleryKey, Gallery> = {
  print: {
    eyebrow: "Print & Production",
    title: "Designed to Become Real.",
    description: "Pilihan desain untuk kebutuhan cetak, publikasi, acara, dan komunikasi informasi.",
    items: [
      { src: "/assets/galleries/print/nusantara-trans.webp", title: "Nusantara Trans Schedule", alt: "Desain banner jadwal keberangkatan Nusantara Trans" },
      { src: "/assets/galleries/print/plafon-pvc.webp", title: "PVC & Interior Promotion", alt: "Kumpulan desain banner promosi distributor plafon PVC" },
      { src: "/assets/galleries/print/academic-cover-tradisi.webp", title: "Tradisi - Academic Cover", alt: "Desain sampul akademik bertema tradisi Perang Api" },
      { src: "/assets/galleries/print/academic-cover-stratifikasi.webp", title: "Stratifikasi Sosial - Academic Cover", alt: "Desain sampul akademik bertema stratifikasi sosial" },
      { src: "/assets/galleries/print/kajian-remaja-frame.webp", title: "Kajian Remaja Frame", alt: "Desain bingkai dokumentasi Kajian Remaja" },
      { src: "/assets/galleries/print/maulid-nabi-banner.webp", title: "Maulid Nabi Banner", alt: "Desain banner peringatan Maulid Nabi" },
      { src: "/assets/galleries/print/belia-chio-menu.webp", title: "Belia Chio Menu", alt: "Desain menu lipat Belia Chio" },
      { src: "/assets/galleries/print/graduation-banner.webp", title: "Graduation Celebration", alt: "Desain banner ucapan kelulusan" },
      { src: "/assets/galleries/print/wisuda-route.webp", title: "Wisuda Route Poster", alt: "Desain poster rute menuju lokasi wisuda" },
      { src: "/assets/galleries/print/eid-mubarak-frame.webp", title: "Eid Mubarak Frame", alt: "Desain bingkai foto Idulfitri" },
    ],
  },
  brand: {
    eyebrow: "Brand & Social",
    title: "Brands Made Visible.",
    description: "Konten promosi dan identitas visual yang dirancang untuk tampil konsisten di ruang digital.",
    items: [
      { src: "/assets/galleries/brand/tofu-fruit-campaign.webp", title: "Tofu Fruit Campaign", alt: "Rangkaian desain konten promosi Tofu Fruit" },
      { src: "/assets/galleries/brand/beverage-menu.webp", title: "Beverage Menu Visual", alt: "Desain promosi beberapa varian minuman" },
      { src: "/assets/galleries/brand/harokah-promo.webp", title: "Harokah Coffee Promo", alt: "Desain promosi produk Harokah Coffee" },
      { src: "/assets/galleries/brand/saleh-bay-identity.webp", title: "Saleh Bay Whale Sharks", alt: "Desain identitas promosi Saleh Bay Whale Sharks" },
    ],
  },
  ai: {
    eyebrow: "AI Exploration",
    title: "Ideas Beyond the Ordinary.",
    description: "Eksplorasi visual komposit untuk produk dan campaign sebagai bagian dari workflow kreatif berbantuan AI.",
    items: [
      { src: "/assets/galleries/ai/coffee-series.webp", title: "Coffee Series Visual", alt: "Eksplorasi visual produk Coffee Series" },
      { src: "/assets/galleries/ai/matcha-product-visual.webp", title: "Matcha Product Visual", alt: "Eksplorasi visual produk iced matcha latte" },
      { src: "/assets/galleries/ai/kopsu-product-visual.webp", title: "KOPSU Campaign Visual", alt: "Eksplorasi visual campaign produk KOPSU" },
      { src: "/assets/galleries/ai/whale-shark-composite.webp", title: "Whale Shark Tour Composite", alt: "Eksplorasi komposit promosi Daily Whale Shark Tour" },
    ],
  },
  digitalWriter: {
    eyebrow: "Digital Content Writer",
    title: "Rarang Batas Documentation.",
    description: "Dokumentasi kegiatan lapangan selama kontribusi artikel dan program literasi digital Desa Rarang Batas.",
    items: [
      { src: "/assets/galleries/journey/digital-writer-01.webp", title: "Rarang Batas Village Office", alt: "Dokumentasi kegiatan di Kantor Desa Rarang Batas" },
      { src: "/assets/galleries/journey/digital-writer-02.webp", title: "Community Field Activity", alt: "Dokumentasi kegiatan lapangan bersama tim di Desa Rarang Batas" },
    ],
  },
  bnn: {
    eyebrow: "Internship Documentation",
    title: "BNN Kota Mataram.",
    description: "Dokumentasi selama pelaksanaan magang atau PKL di BNN Kota Mataram.",
    items: [
      { src: "/assets/galleries/journey/bnn-01.webp", title: "Internship Activity", alt: "Dokumentasi kegiatan magang di BNN Kota Mataram" },
      { src: "/assets/galleries/journey/bnn-02.webp", title: "BNN Kota Mataram Team", alt: "Dokumentasi bersama tim BNN Kota Mataram" },
    ],
  },
  uin: {
    eyebrow: "Education Documentation",
    title: "UIN Mataram.",
    description: "S1 Sosiologi Agama · 2021–2025. Momen perjalanan pendidikan dan kelulusan di UIN Mataram.",
    items: [
      { src: "/assets/galleries/journey/uin-01.webp", title: "Graduation Moment", alt: "Dokumentasi momen kelulusan di UIN Mataram" },
      { src: "/assets/galleries/journey/uin-02.webp", title: "Wisuda ke-51", alt: "Dokumentasi Wisuda ke-51 UIN Mataram" },
    ],
    feature: thesis,
  },
};

const journey = [
  {
    number: "01",
    icon: Printer,
    title: "Graphic Designer",
    label: "Digiprint Lombok · Jun 2025–Jun 2026",
    text: "Merancang dan memproduksi materi visual untuk kebutuhan cetak dan digital sambil berkolaborasi langsung dengan klien.",
    points: ["Banner & paper", "Merchandise", "Acrylic design"],
    href: "",
    gallery: undefined,
  },
  {
    number: "02",
    icon: MonitorSmartphone,
    title: "Media & Network",
    label: "HMPS Sosiologi Agama · Jul 2023–Feb 2024",
    text: "Memimpin divisi media dan jaringan, mengelola komunikasi organisasi, konten sosial, serta relasi internal dan eksternal.",
    points: ["Social media", "Communication", "Team coordination"],
    href: "",
    gallery: undefined,
  },
  {
    number: "03",
    icon: PenTool,
    title: "Digital Content Writer",
    label: "Rarang Batas Village Website · Jul–Aug 2024",
    text: "Article contribution published on Rarang Batas Village Website, membahas digitalisasi desa dan peningkatan kualitas pelayanan publik.",
    points: ["Article writing", "Digital literacy", "Web publishing"],
    href: "https://desararangbatas.web.id/artikel/2024/07/18/digitalisasi-desa-pelatihan-peningkatan-kualitas-pelayanan-publik",
    gallery: "digitalWriter" as GalleryKey,
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [introPhase, setIntroPhase] = useState<"loading" | "exit" | "done">("loading");
  const [introProgress, setIntroProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<GalleryKey | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [visitorState, setVisitorState] = useState<"checking" | "asking" | "ready">("checking");
  const [visitorName, setVisitorName] = useState("");
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [visitorSubmitting, setVisitorSubmitting] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  const registerVisitor = useCallback(async (deviceId: string, name: string) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data, error } = await supabase.rpc("register_portfolio_visitor", {
      p_device_id: deviceId,
      p_name: name,
    });

    if (error) {
      console.warn("Visitor registration is temporarily unavailable.");
      return;
    }

    const total = typeof data === "number" ? data : Number(data);
    if (Number.isFinite(total)) setVisitorCount(total);
  }, []);

  useEffect(() => {
    const name = window.localStorage.getItem("dimas_portfolio_visitor_name")?.trim();
    let deviceId = window.localStorage.getItem("dimas_portfolio_device_id");

    if (!deviceId) {
      deviceId = window.crypto.randomUUID();
      window.localStorage.setItem("dimas_portfolio_device_id", deviceId);
    }

    if (name) {
      setVisitorState("ready");
      void registerVisitor(deviceId, name);
    } else {
      setVisitorState("asking");
    }
  }, [registerVisitor]);

  useEffect(() => {
    if (visitorState === "ready") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visitorState]);

  const handleVisitorEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = visitorName.trim().replace(/\s+/g, " ").slice(0, 60);
    if (cleanName.length < 2) return;

    setVisitorSubmitting(true);
    let deviceId = window.localStorage.getItem("dimas_portfolio_device_id");
    if (!deviceId) {
      deviceId = window.crypto.randomUUID();
      window.localStorage.setItem("dimas_portfolio_device_id", deviceId);
    }
    window.localStorage.setItem("dimas_portfolio_visitor_name", cleanName);
    void registerVisitor(deviceId, cleanName);
    setVisitorState("ready");
    setVisitorSubmitting(false);
  };

  useEffect(() => {
    if (visitorState !== "ready") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroProgress(100);
      setIntroPhase("done");
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const startTime = Date.now();
    let progressTimer: ReturnType<typeof setInterval> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const updateIntro = () => {
      const progress = skipIntro ? 100 : Math.min(100, ((Date.now() - startTime) / 8000) * 100);
      setIntroProgress(Math.round(progress));

      if (progress >= 100) {
        if (progressTimer) clearInterval(progressTimer);
        setIntroPhase("exit");
        finishTimer = setTimeout(() => {
          setIntroPhase("done");
          document.body.style.overflow = originalOverflow;
        }, 850);
      }
    };

    updateIntro();
    if (!skipIntro) progressTimer = setInterval(updateIntro, 100);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (finishTimer) clearTimeout(finishTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [skipIntro, visitorState]);

  useEffect(() => {
    if (!cvOpen && !activeGallery) return;

    const originalOverflow = document.body.style.overflow;
    const handleModalKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCvOpen(false);
        setActiveGallery(null);
      }
      if (!activeGallery) return;

      const itemCount = galleries[activeGallery].items.length;
      if (event.key === "ArrowLeft") {
        setActiveImage((current) => (current - 1 + itemCount) % itemCount);
      }
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % itemCount);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleModalKeyboard);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleModalKeyboard);
    };
  }, [cvOpen, activeGallery]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (coarsePointer) {
      const addTouchRipple = (event: PointerEvent) => {
        const ripple = document.createElement("span");
        ripple.className = "touch-ripple";
        ripple.style.left = `${event.clientX}px`;
        ripple.style.top = `${event.clientY}px`;
        document.body.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 720);
      };
      window.addEventListener("pointerdown", addTouchRipple, { passive: true });
      return () => window.removeEventListener("pointerdown", addTouchRipple);
    }

    if (reducedMotion) return;

    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;

    const moveCursor = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };
    const followCursor = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(followCursor);
    };
    const updateCursorState = (event: PointerEvent) => {
      const target = event.target as Element | null;
      follower.classList.toggle("is-active", Boolean(target?.closest("a, button, input, textarea, [role='button']")));
    };
    const clickDown = () => follower.classList.add("is-clicking");
    const clickUp = () => follower.classList.remove("is-clicking");

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerover", updateCursorState, { passive: true });
    window.addEventListener("pointerdown", clickDown, { passive: true });
    window.addEventListener("pointerup", clickUp, { passive: true });
    frame = requestAnimationFrame(followCursor);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", updateCursorState);
      window.removeEventListener("pointerdown", clickDown);
      window.removeEventListener("pointerup", clickUp);
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

  const openGallery = (gallery: GalleryKey) => {
    setActiveImage(0);
    setActiveGallery(gallery);
  };

  const closeGallery = () => setActiveGallery(null);

  const changeGalleryImage = (direction: number) => {
    if (!activeGallery) return;
    const itemCount = galleries[activeGallery].items.length;
    setActiveImage((current) => (current + direction + itemCount) % itemCount);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const whatsappMessage = [
      "Halo Dimas, saya menghubungi dari website portfolio.",
      "",
      `Nama: ${name}`,
      `Email: ${email}`,
      "",
      "Pesan:",
      message,
    ].join("\n");
    const whatsappUrl = `https://wa.me/6281996993639?text=${encodeURIComponent(whatsappMessage)}`;

    setFormStatus("Membuka WhatsApp dengan pesan yang sudah disiapkan...");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
  };

  const currentGallery = activeGallery ? galleries[activeGallery] : null;

  return (
    <>
      {visitorState !== "ready" && (
        <div className="visitor-gate">
          <div className="visitor-gate-glow" aria-hidden="true" />
          {visitorState === "asking" ? (
            <form className="visitor-gate-card" onSubmit={handleVisitorEntry}>
              <span>Welcome to the portfolio</span>
              <h1>Siapa nama kamu?</h1>
              <p>Nama hanya digunakan agar Dimas mengetahui siapa yang pernah berkunjung. Nama tidak ditampilkan kepada pengunjung lain.</p>
              <label htmlFor="visitor-name">Nama</label>
              <input
                id="visitor-name"
                value={visitorName}
                onChange={(event) => setVisitorName(event.target.value)}
                type="text"
                minLength={2}
                maxLength={60}
                autoComplete="name"
                placeholder="Tulis nama kamu"
                autoFocus
                required
              />
              <button type="submit" disabled={visitorSubmitting || visitorName.trim().length < 2}>
                {visitorSubmitting ? "Menyimpan..." : "Enter Portfolio"} <ArrowUpRight size={18} />
              </button>
              <small>Satu browser dihitung sebagai satu unique visitor.</small>
            </form>
          ) : (
            <div className="visitor-gate-loading" aria-label="Menyiapkan portfolio"><i /></div>
          )}
        </div>
      )}

      {introPhase !== "done" && (
        <div className={`intro-overlay ${introPhase === "exit" ? "is-exiting" : ""}`}>
          <div className="intro-haze intro-haze-one" />
          <div className="intro-haze intro-haze-two" />
          <div className="intro-scene" aria-hidden="true">
            <div className="intro-membrane" />
            <div className="intro-deck">
              <div className="intro-card intro-card-center">
                <div className="intro-card-meta"><small>PORTFOLIO 2026</small><i>01 — 03</i></div>
                <strong>Graphic<br /><em>Designer</em></strong>
                <b>IDEAS · VISUALS · IMPACT</b>
              </div>
            </div>
            <div className="intro-service-chips">
              <span>Print &amp; Production</span>
              <span>Brand &amp; Digital</span>
              <span>AI Creative</span>
            </div>
            <div className="intro-energy-ring" />
            <div className="intro-horizon" />
          </div>
          <div className="intro-brand-reveal">
            <span>Welcome To My Portfolio</span>
            <strong>Dimas Riyanto, S.Sos.</strong>
            <small>Graphic Designer · Print · Digital · AI</small>
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
          <button className="skip-intro" onClick={() => setSkipIntro(true)}>
            Skip intro <ArrowUpRight size={15} />
          </button>
        </div>
      )}

      <div ref={cursorFollowerRef} className="cursor-follower" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />

      <div className="scroll-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <b>{String(Math.round(scrollProgress)).padStart(3, "0")}%</b>
      </div>

      {cvOpen && (
        <div className="cv-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setCvOpen(false)}>
          <section className="cv-modal" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title">
            <div className="cv-modal-head">
              <div><span>Curriculum Vitae</span><h2 id="cv-modal-title">Dimas Riyanto<b className="name-degree">, S.Sos.</b></h2></div>
              <button onClick={() => setCvOpen(false)} aria-label="Tutup preview CV"><X /></button>
            </div>
            <div className="cv-viewer">
              <iframe src="/assets/cv-dimas-riyanto-2026.pdf#view=FitH" title="CV Dimas Riyanto" />
            </div>
            <div className="cv-modal-actions">
              <a href="/assets/cv-dimas-riyanto-2026.pdf" target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={17} /></a>
              <a href="/assets/cv-dimas-riyanto-2026.pdf" download>Download CV <Download size={17} /></a>
            </div>
          </section>
        </div>
      )}

      {currentGallery && (
        <div className="gallery-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeGallery()}>
          <section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
            <div className="gallery-modal-head">
              <div>
                <span>{currentGallery.eyebrow}</span>
                <h2 id="gallery-modal-title">{displayHeading(currentGallery.title)}</h2>
                <p>{currentGallery.description}</p>
                {currentGallery.feature && (
                  <a className="gallery-feature" href={currentGallery.feature.href} target="_blank" rel="noreferrer">
                    <span>{currentGallery.feature.label}</span>
                    <strong>{currentGallery.feature.title}</strong>
                    <small>Read Thesis <ArrowUpRight size={15} /></small>
                  </a>
                )}
              </div>
              <button onClick={closeGallery} aria-label="Tutup galeri"><X /></button>
            </div>

            <div className="gallery-stage">
              <button className="gallery-arrow gallery-arrow-prev" onClick={() => changeGalleryImage(-1)} aria-label="Gambar sebelumnya">
                <ChevronLeft />
              </button>
              <figure aria-live="polite">
                <img
                  src={currentGallery.items[activeImage].src}
                  alt={currentGallery.items[activeImage].alt}
                  width="1800"
                  height="1800"
                />
                <figcaption>
                  <strong>{currentGallery.items[activeImage].title}</strong>
                  <span>{String(activeImage + 1).padStart(2, "0")} / {String(currentGallery.items.length).padStart(2, "0")}</span>
                </figcaption>
              </figure>
              <button className="gallery-arrow gallery-arrow-next" onClick={() => changeGalleryImage(1)} aria-label="Gambar berikutnya">
                <ChevronRight />
              </button>
            </div>

            <div className="gallery-thumbnails" aria-label="Pilih karya">
              {currentGallery.items.map((item, index) => (
                <button
                  key={item.src}
                  className={index === activeImage ? "is-active" : ""}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Lihat ${item.title}`}
                  aria-current={index === activeImage ? "true" : undefined}
                >
                  <img src={item.src} alt="" width="180" height="130" loading="lazy" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      <main className="site-shell">
      <div className="site-noise" aria-hidden="true" />

      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")} aria-label="Kembali ke awal">
          <span>GRAPHIC DESIGN</span><b>©26</b>
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
          <button className="cv-preview-button" onClick={() => setCvOpen(true)} aria-label="Preview CV Dimas Riyanto">
            <FileText size={16} /> <span>CV</span>
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
        <div className="section-gradient gradient-home" aria-hidden="true" />
        <div className="hero-grid section-inner reveal-block">
          <div className="hero-content">
            <div className="section-tag"><Sparkles size={15} /> Everything starts with an idea</div>
            <h1>
              Turning
              <span>Ideas</span>
              Into <em>Experiences.</em>
            </h1>
            <p className="hero-intro">
              Saya Dimas Riyanto, S.Sos.—graphic designer dengan fondasi percetakan,
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
              <div className="identity-mark">DESIGN</div>
              <img
                className="identity-photo"
                src="/assets/dimas-profile.webp"
                alt="Dimas Riyanto"
                width="900"
                height="1570"
              />
              <div className="identity-copy">
                <small>GRAPHIC DESIGNER</small>
                <strong>Dimas<br />Riyanto<b className="identity-degree">, S.Sos.</b></strong>
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
        <div className="section-gradient gradient-about" aria-hidden="true" />
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">About Me</div>
            <span className="section-number">01 — PROFILE</span>
          </div>

          <div className="about-grid">
            <div className="about-statement">
              <p className="redline">I Create Visual Experiences.</p>
              <h2>Good Design Should Look Sharp—And <em>Work Hard.</em></h2>
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
                <button className="education-fact" onClick={() => openGallery("uin")} aria-label="Buka dokumentasi pendidikan UIN Mataram">
                  <span>Education</span>
                  <b>S1 Sosiologi Agama</b>
                  <small>UIN Mataram · 2021–2025</small>
                  <em><Images size={14} /> View Education</em>
                </button>
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
        <div className="section-gradient gradient-journey" aria-hidden="true" />
        <div className="section-inner reveal-block">
          <div className="section-heading light-heading">
            <div className="boxed-title lime-title">Creative Journey</div>
            <span className="section-number">02 — HOW I GROW</span>
          </div>

          <div className="journey-intro">
            <h2>Real Experience.<br /><em>Creative Direction.</em></h2>
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
                    <h3>{displayHeading(item.title)}</h3>
                    <p>{item.text}</p>
                    {item.href && (
                      <a className="journey-link" href={item.href} target="_blank" rel="noreferrer">
                        Read Published Article <ArrowUpRight size={16} />
                      </a>
                    )}
                    {item.gallery && (
                      <button className="journey-gallery-link" onClick={() => openGallery(item.gallery)}>
                        <Images size={16} /> View Documentation
                      </button>
                    )}
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
            <article>
              <span>OCT–NOV 2024</span>
              <strong>BNN Kota Mataram</strong>
              <p>Internship supporting public outreach, administration, and program documentation.</p>
              <button className="journey-gallery-link" onClick={() => openGallery("bnn")}>
                <Images size={16} /> View Documentation
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="page-section projects-section">
        <div className="section-gradient gradient-projects" aria-hidden="true" />
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">Projects</div>
            <span className="section-number">03 — SELECTED WORK</span>
          </div>

          <div className="projects-head">
            <div>
              <p className="redline">A growing visual archive</p>
              <h2>Projects Built<br />From Real Needs.</h2>
            </div>
            <p>
              Tekan folder, lalu pilih kategori untuk membuka galeri karya.
              Setiap visual ditampilkan lengkap dan dapat dijelajahi satu per satu.
            </p>
          </div>

          <div className={folderOpen ? "archive is-open" : "archive"}>
            <button className="archive-card archive-print" onClick={() => openGallery("print")} disabled={!folderOpen}>
              <span className="archive-card-head"><Printer /><span>10 WORKS</span></span>
              <span className="archive-card-title">Print <span className="heading-symbol">&amp;</span> Production</span>
              <span className="archive-card-copy">Banner, publication, menu, dan kebutuhan promosi cetak.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>
            <button className="archive-card archive-brand" onClick={() => openGallery("brand")} disabled={!folderOpen}>
              <span className="archive-card-head"><Palette /><span>04 WORKS</span></span>
              <span className="archive-card-title">Brand <span className="heading-symbol">&amp;</span> Social</span>
              <span className="archive-card-copy">Identitas visual, konten sosial, dan campaign design.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>
            <button className="archive-card archive-ai" onClick={() => openGallery("ai")} disabled={!folderOpen}>
              <span className="archive-card-head"><Bot /><span>04 WORKS</span></span>
              <span className="archive-card-title">AI Exploration</span>
              <span className="archive-card-copy">Product visual, creative compositing, dan AI-assisted workflow.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>

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

          <a className="featured-project" href="https://kasir-bcuts.vercel.app/" target="_blank" rel="noreferrer">
            <div className="featured-project-icon"><MonitorSmartphone /></div>
            <div className="featured-project-copy">
              <span>AI-Assisted Web Development · Learning Project</span>
              <h3>BCUTS Cashier Web App</h3>
              <p>Dibangun sebagai proyek pembelajaran untuk memperdalam pengembangan website dengan bantuan AI.</p>
              <div><b>Live Website</b><b>Member Access Only</b></div>
            </div>
            <div className="featured-project-cta">Visit Live Project <ArrowUpRight size={19} /></div>
          </a>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-gradient gradient-contact" aria-hidden="true" />
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title lime-title">Contact</div>
            <span className="section-number">04 — LET&apos;S TALK</span>
          </div>

          <div className="contact-grid">
            <div className="contact-copy-block">
              <p className="redline">Have a project in mind?</p>
              <h2>Let&apos;s Make<br /><em>Something<br />Memorable.</em></h2>
              <p>Ceritakan kebutuhan desainmu—untuk percetakan, digital, branding, atau eksplorasi kreatif dengan AI.</p>
              <div className="social-preview" aria-label="Kanal kontak Dimas Riyanto">
                <a href="mailto:dimsrynto09@gmail.com" aria-label="Kirim email ke Dimas" title="Gmail"><SiGmail size={21} /></a>
                <a href="https://www.instagram.com/aaadimm09" target="_blank" rel="noreferrer" aria-label="Buka Instagram Dimas" title="Instagram"><FaInstagram size={22} /></a>
                <a href="https://wa.me/6281996993639" target="_blank" rel="noreferrer" aria-label="Hubungi Dimas melalui WhatsApp" title="WhatsApp"><FaWhatsapp size={23} /></a>
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
              <button type="submit">
                Send via WhatsApp <FaWhatsapp size={21} />
              </button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div><span>DESIGN PORTFOLIO</span><p>Dimas Riyanto, S.Sos. — Graphic Designer & AI Creative</p></div>
        {visitorCount !== null && (
          <div className="visitor-total" aria-live="polite"><b>{visitorCount}</b><small>Unique Visitors</small></div>
        )}
        <button onClick={() => goTo("home")}>Back to top <ArrowUp size={17} /></button>
      </footer>
      </main>
    </>
  );
}
