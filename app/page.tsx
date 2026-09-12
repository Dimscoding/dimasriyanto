"use client";

import Image from "next/image";
import { Fragment, type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Images,
  Layers3,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  Printer,
  Sparkles,
  X,
} from "lucide-react";
import { FaFileExcel, FaFilePowerpoint, FaFileWord, FaInstagram, FaMicrosoft, FaWhatsapp } from "react-icons/fa6";
import { SiClaude, SiCoreldraw, SiGmail } from "react-icons/si";
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
      { src: "/assets/galleries/print/maulid-nabi-banner.webp", title: "Maulid Nabi Banner", alt: "Desain banner peringatan Maulid Nabi" },
      { src: "/assets/galleries/print/belia-chio-menu.webp", title: "Belia Chio Menu", alt: "Desain menu lipat Belia Chio" },
      { src: "/assets/galleries/print/graduation-banner.webp", title: "Graduation Celebration", alt: "Desain banner ucapan kelulusan" },
      { src: "/assets/galleries/print/wisuda-route.webp", title: "Wisuda Route Poster", alt: "Desain poster rute menuju lokasi wisuda" },
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
  const [formStatus, setFormStatus] = useState("");
  const [introPhase, setIntroPhase] = useState<"loading" | "exit" | "done">("loading");
  const [introProgress, setIntroProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);
  const [activeGallery, setActiveGallery] = useState<GalleryKey | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
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
    let deviceId = window.localStorage.getItem("dimas_portfolio_device_id");

    if (!deviceId) {
      deviceId = window.crypto.randomUUID();
      window.localStorage.setItem("dimas_portfolio_device_id", deviceId);
    }
    const savedName = window.localStorage.getItem("dimas_portfolio_visitor_name")?.trim();
    void registerVisitor(deviceId, savedName || "Anonymous Visitor");
  }, [registerVisitor]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroProgress(100);
      setIntroPhase("done");
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const isCompactScreen = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const introDuration = isCompactScreen ? 4600 : 6000;
    const startTime = performance.now();
    let animationFrame = 0;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const updateIntro = (now: number) => {
      const progress = skipIntro ? 100 : Math.min(100, ((now - startTime) / introDuration) * 100);
      setIntroProgress(Math.round(progress));

      if (progress >= 100) {
        setIntroPhase("exit");
        finishTimer = setTimeout(() => {
          setIntroPhase("done");
          document.body.style.overflow = originalOverflow;
        }, 650);
        return;
      }

      animationFrame = window.requestAnimationFrame(updateIntro);
    };

    animationFrame = window.requestAnimationFrame(updateIntro);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (finishTimer) clearTimeout(finishTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [skipIntro]);

  useEffect(() => {
    if (!activeGallery) return;

    const originalOverflow = document.body.style.overflow;
    const handleModalKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
  }, [activeGallery]);

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
      {introPhase !== "done" && (
        <div className={`intro-overlay ${introPhase === "exit" ? "is-exiting" : ""}`}>
          <div className="intro-minimal">
            <div className="intro-minimal-top"><span>Portfolio 2026</span><b>{String(Math.round(introProgress)).padStart(3, "0")}%</b></div>
            <div className="intro-minimal-copy">
              <small>Welcome to my portfolio</small>
              <h1>Dimas Riyanto<span>, S.Sos.</span></h1>
              <p>Graphic Designer · Print · Digital · AI</p>
            </div>
            <div className="intro-minimal-progress"><i style={{ transform: `scaleX(${introProgress / 100})` }} /></div>
          </div>
          <button className="skip-intro" onClick={() => setSkipIntro(true)}>
            Skip <ArrowUpRight size={15} />
          </button>
        </div>
      )}

      <div ref={cursorFollowerRef} className="cursor-follower" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />

      <div className="scroll-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <b>{String(Math.round(scrollProgress)).padStart(3, "0")}%</b>
      </div>

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
        <div className="hero-backdrop-glow" aria-hidden="true" />
        <div className="hero-kicker reveal-block">
          <span>Dimas Riyanto, S.Sos.</span>
          <b>Graphic Design Portfolio · 2026</b>
        </div>
        <div className="hero-wordmark" aria-hidden="true">PORTFOLIO</div>

        <div className="hero-showcase section-inner reveal-block">
          <div className="hero-panel hero-panel-dark">
            <div className="hero-panel-brand">
              <span>Graphic Designer</span>
              <b>Print × Digital × AI</b>
            </div>

            <div className="hero-create-copy">
              <span>Visuals with purpose</span>
              <h1>CREATE</h1>
              <p>Designs that communicate clearly.<br />Ideas built to become real.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => goTo("projects")}>
                  View projects <ArrowUpRight size={18} />
                </button>
                <button className="text-button" onClick={() => goTo("about")}>
                  About me <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="hero-proof">
              <div className="hero-proof-images" aria-hidden="true">
                <img src="/assets/galleries/brand/tofu-fruit-campaign.webp" alt="" width="60" height="60" />
                <img src="/assets/galleries/print/graduation-banner.webp" alt="" width="60" height="60" />
                <img src="/assets/galleries/ai/coffee-series.webp" alt="" width="60" height="60" />
                <span>+12</span>
              </div>
              <p>Selected work across print,<br />branding, and AI exploration.</p>
            </div>
          </div>

          <div className="hero-panel hero-panel-light">
            <div className="hero-availability">
              <span>Available for</span>
              <strong>Creative<br />Projects</strong>
            </div>
            <div className="hero-services">
              <span>01 · Print Production</span>
              <span>02 · Brand &amp; Social</span>
              <span>03 · AI Creative</span>
            </div>
            <div className="hero-quote">
              <b>“</b>
              <p>Visual yang kuat bukan hanya menarik, tetapi juga bekerja untuk menyampaikan pesan.</p>
              <span>Dimas Riyanto <small>S.Sos.</small></span>
            </div>
          </div>

          <img
            className="hero-portrait"
            src="/assets/dimas-profile-2026.webp"
            alt="Dimas Riyanto, S.Sos."
            width="1024"
            height="1536"
          />
          <div className="hero-nameplate">
            <span>Dimas Riyanto</span>
            <b>S.Sos.</b>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div>PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span> DIGITAL CONTENT <span>✦</span> AI CREATIVE <span>✦</span> PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span></div>
        </div>
      </section>

      <section id="about" className="page-section dotted-section">
        <div className="section-gradient gradient-about" aria-hidden="true" />
        <div className="section-emblem emblem-about" aria-hidden="true"><PenTool /><span>Ideas into form</span></div>
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
                  <span className="fact-preview" aria-hidden="true">
                    <img src="/assets/galleries/journey/uin-01.webp" alt="" width="360" height="220" loading="lazy" />
                    <img src="/assets/galleries/journey/uin-02.webp" alt="" width="360" height="220" loading="lazy" />
                  </span>
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
        <div className="section-emblem emblem-journey" aria-hidden="true"><Layers3 /><span>Experience archive</span></div>
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
                      <button className="journey-documentation-preview" onClick={() => openGallery(item.gallery)}>
                        <span className="journey-preview-images" aria-hidden="true">
                          {galleries[item.gallery].items.slice(0, 2).map((preview) => (
                            <img key={preview.src} src={preview.src} alt="" width="240" height="150" loading="lazy" />
                          ))}
                        </span>
                        <span className="journey-preview-label"><Images size={16} /> View Documentation <ArrowUpRight size={14} /></span>
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
            <div className="toolbelt-heading"><span>Tools &amp; Workflow</span><p>Perangkat yang saya gunakan untuk desain, eksplorasi ide, dan administrasi ringan.</p></div>
            <div className="tool-grid">
              <article><SiCoreldraw /><b>CorelDRAW</b><small>Vector &amp; print</small></article>
              <article><span className="canva-mark">C</span><b>Canva</b><small>Social design</small></article>
              <article><span className="chatgpt-mark">◎</span><b>ChatGPT</b><small>Image generation</small></article>
              <article><SiClaude /><b>Claude</b><small>Brainstorming</small></article>
              <article><FaFileWord /><b>Word</b><small>Documents</small></article>
              <article><FaFilePowerpoint /><b>PowerPoint</b><small>Presentation</small></article>
              <article><FaFileExcel /><b>Excel</b><small>Basic admin</small></article>
              <article><FaMicrosoft /><b>Microsoft Office</b><small>Office workflow</small></article>
            </div>
          </div>

          <div className="additional-experience">
            <article><span>JAN 2023–MAY 2025</span><strong>Yayasan Taajul Huffaz</strong><p>Part-time Quran teacher for students aged 7–15.</p></article>
            <article>
              <span>OCT–NOV 2024</span>
              <strong>BNN Kota Mataram</strong>
              <p>Internship supporting public outreach, administration, and program documentation.</p>
              <button className="journey-documentation-preview" onClick={() => openGallery("bnn")}>
                <span className="journey-preview-images" aria-hidden="true">
                  {galleries.bnn.items.slice(0, 2).map((preview) => (
                    <img key={preview.src} src={preview.src} alt="" width="240" height="150" loading="lazy" />
                  ))}
                </span>
                <span className="journey-preview-label"><Images size={16} /> View Documentation <ArrowUpRight size={14} /></span>
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="page-section projects-section">
        <div className="section-gradient gradient-projects" aria-hidden="true" />
        <div className="section-emblem emblem-projects" aria-hidden="true"><Palette /><span>Selected visuals</span></div>
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

          <div className="archive archive-static">
            <button className="archive-card archive-print" onClick={() => openGallery("print")}>
              <span className="archive-card-preview"><img src="/assets/galleries/print/academic-cover-tradisi.webp" alt="Preview karya Print dan Production" width="420" height="240" loading="lazy" /></span>
              <span className="archive-card-head"><Printer /><span>08 WORKS</span></span>
              <span className="archive-card-title">Print <span className="heading-symbol">&amp;</span> Production</span>
              <span className="archive-card-copy">Banner, publication, menu, dan kebutuhan promosi cetak.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>
            <button className="archive-card archive-brand" onClick={() => openGallery("brand")}>
              <span className="archive-card-preview"><img src="/assets/galleries/brand/tofu-fruit-campaign.webp" alt="Preview karya Brand dan Social" width="420" height="240" loading="lazy" /></span>
              <span className="archive-card-head"><Palette /><span>04 WORKS</span></span>
              <span className="archive-card-title">Brand <span className="heading-symbol">&amp;</span> Social</span>
              <span className="archive-card-copy">Identitas visual, konten sosial, dan campaign design.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>
            <button className="archive-card archive-ai" onClick={() => openGallery("ai")}>
              <span className="archive-card-preview"><img src="/assets/galleries/ai/coffee-series.webp" alt="Preview karya AI Exploration" width="420" height="240" loading="lazy" /></span>
              <span className="archive-card-head"><Bot /><span>04 WORKS</span></span>
              <span className="archive-card-title">AI Exploration</span>
              <span className="archive-card-copy">Product visual, creative compositing, dan AI-assisted workflow.</span>
              <span className="archive-card-open">Open Gallery <ArrowUpRight size={14} /></span>
            </button>

          </div>

          <div className="web-projects">
            <article className="featured-project stockflow-project">
              <a className="stockflow-preview" href="https://stockflow-ims-nu.vercel.app/" target="_blank" rel="noreferrer" aria-label="Buka StockFlow Inventory OS">
                <Image src="/assets/stockflow-dashboard.png" alt="Tampilan dashboard StockFlow Inventory OS" width={1920} height={1181} sizes="(max-width: 760px) 100vw, 390px" />
                <span>Live dashboard <ArrowUpRight size={16} /></span>
              </a>
              <div className="featured-project-icon"><Layers3 /></div>
              <div className="featured-project-copy">
                <span>Inventory Management System · Full-Stack Portfolio Project</span>
                <h3>StockFlow Inventory OS</h3>
                <p>Sistem inventory HORECA untuk mengelola stok per item, transaksi, batch dan kedaluwarsa, FEFO, supplier, purchase order, stock opname, waste, serta laporan operasional.</p>
                <div><b>Next.js</b><b>Responsive</b><b>Live Website</b></div>
              </div>
              <div className="featured-project-actions">
                <a href="https://stockflow-ims-nu.vercel.app/" target="_blank" rel="noreferrer">Live Project <ArrowUpRight size={17} /></a>
                <a href="https://github.com/Dimscoding/stockflow-ims" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a>
              </div>
            </article>

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
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-gradient gradient-contact" aria-hidden="true" />
        <div className="section-emblem emblem-contact" aria-hidden="true"><Sparkles /><span>Start a project</span></div>
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
