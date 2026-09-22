import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Compass,
  Cpu,
  Download,
  Eye,
  Focus,
  Layers3,
  Lightbulb,
  Maximize2,
  Menu,
  Network,
  Orbit,
  Pause,
  Play,
  Quote,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { ecossistemaImg } from "@/assets/ecossistemaImg";

type ChapterId = "inicio" | "contexto" | "metodo" | "ecosistema" | "transformacao" | "proximo";
type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

type IconType = typeof Sparkles;

const chapters: Array<{
  id: ChapterId;
  short: string;
  label: string;
  title: string;
  accent: string;
  icon: IconType;
}> = [
  { id: "inicio", short: "01", label: "Abertura", title: "Perceber antes de responder.", accent: "cyan", icon: Sparkles },
  { id: "contexto", short: "02", label: "O desafio", title: "A tecnologia já responde por você. Quem te ajuda a perceber?", accent: "amber", icon: Focus },
  { id: "metodo", short: "03", label: "O método", title: "Quatro movimentos. Uma nova resposta.", accent: "green", icon: BrainCircuit },
  { id: "ecosistema", short: "04", label: "O ecossistema", title: "Começa em você. Cresce com você.", accent: "blue", icon: Network },
  { id: "transformacao", short: "05", label: "A jornada", title: "Da percepção à nova consciência.", accent: "magenta", icon: Route },
  { id: "proximo", short: "06", label: "O próximo passo", title: "Leve o AVR-S para onde a decisão acontece.", accent: "red", icon: WandSparkles },
];

const methodSteps = [
  {
    key: "A",
    label: "Atenção",
    question: "O que está acontecendo?",
    detail: "Interromper o automático e criar espaço para perceber o presente antes que ele vire reação.",
    color: "cyan",
    icon: ScanLine,
  },
  {
    key: "V",
    label: "Visão",
    question: "Como estou percebendo?",
    detail: "Investigar filtros, padrões e interpretações que moldam a leitura de cada situação.",
    color: "green",
    icon: Eye,
  },
  {
    key: "R",
    label: "Resposta",
    question: "O que estou escolhendo fazer?",
    detail: "Trocar impulsos por escolhas conscientes, com clareza sobre intenção e consequência.",
    color: "amber",
    icon: Target,
  },
  {
    key: "S",
    label: "Sistema",
    question: "Que padrão estou construindo?",
    detail: "Transformar uma decisão pontual em prática contínua, relacionamento e cultura.",
    color: "red",
    icon: Orbit,
  },
];

const ecosystemItems = [
  { title: "APP AVR-S", eyebrow: "Hoje · plataforma principal", copy: "O espelho diário: uma experiência que devolve perguntas e padrões para você enxergar o próprio movimento. Já no ar, com pagamento e o mecanismo do espelho funcionando.", icon: Cpu, color: "cyan" },
  { title: "Espelhos de consciência", eyebrow: "Hoje · experiências", copy: "As interfaces que devolvem à pessoa como ela age e pensa — a tecnologia como espelho, não como oráculo.", icon: Eye, color: "green" },
  { title: "AVR-S Finance", eyebrow: "Hoje · aplicação", copy: "A mesma lógica do método aplicada a decisões, comportamento e planejamento financeiro.", icon: Layers3, color: "amber" },
  { title: "Trilogia da Transformação", eyebrow: "A profundidade", copy: "Crônicas de um Campeão · A Mente É a Causa · A Vida Sem Rascunho. O app é a prática diária; os livros são a origem e o aprofundamento do método.", icon: BookOpen, color: "violet" },
  { title: "CCR-Net", eyebrow: "Horizonte · relações e organizações", copy: "A mesma consciência em escala: times, vínculos e cultura de decisão dentro de organizações inteiras.", icon: UsersRound, color: "magenta" },
  { title: "CECA", eyebrow: "Horizonte · formação", copy: "Central de Evolução da Consciência Aplicada: formação e repertório para levar o método a novos contextos.", icon: Lightbulb, color: "blue" },
];

const journeySteps = [
  { label: "Perceber", note: "Sair do automático", icon: BrainCircuit, color: "violet" },
  { label: "Enxergar", note: "Ver o padrão", icon: Eye, color: "cyan" },
  { label: "Escolher", note: "Decidir consciente", icon: Check, color: "amber" },
  { label: "Agir", note: "Praticar", icon: Zap, color: "orange" },
  { label: "Evoluir", note: "Nova consciência", icon: Orbit, color: "magenta" },
];

function scrollToChapter(id: ChapterId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<ChapterId>("inicio");
  const [activeMethod, setActiveMethod] = useState(0);
  const [activeEcosystem, setActiveEcosystem] = useState(0);
  const [isPresenterMode, setIsPresenterMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeChapterIndex = useMemo(() => chapters.findIndex((chapter) => chapter.id === activeSection), [activeSection]);
  const activeChapter = chapters[activeChapterIndex] ?? chapters[0];

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id as ChapterId);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0.15, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPresenterMode(false);
        return;
      }
      if (!isPresenterMode) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
        event.preventDefault();
        const next = Math.min(activeChapterIndex + 1, chapters.length - 1);
        setActiveSection(chapters[next].id);
        scrollToChapter(chapters[next].id);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const previous = Math.max(activeChapterIndex - 1, 0);
        setActiveSection(chapters[previous].id);
        scrollToChapter(chapters[previous].id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeChapterIndex, isPresenterMode]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setActiveMethod((current) => (current + 1) % methodSteps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const goToChapter = (direction: number) => {
    const targetIndex = Math.min(Math.max(activeChapterIndex + direction, 0), chapters.length - 1);
    const target = chapters[targetIndex];
    setActiveSection(target.id);
    scrollToChapter(target.id);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (isPresenterMode) touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (!isPresenterMode || touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(distance) > 55) goToChapter(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const installApp = async () => {
    if (!installPrompt) {
      window.alert("Para instalar: abra o menu do navegador e escolha 'Instalar AVR-S' ou 'Adicionar à tela inicial'.");
      return;
    }
    await installPrompt.prompt();
    setInstallPrompt(null);
  };

  return (
    <main className="pitch-shell" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollToChapter("inicio")} aria-label="Voltar ao início">
          <span className="brand-mark"><CircleDot size={18} strokeWidth={2.5} /></span>
          <span><strong>AVR-S</strong><small>Sistema de desenvolvimento da consciência</small></span>
        </button>
        <nav className={isNavOpen ? "chapter-nav is-open" : "chapter-nav"} aria-label="Capítulos da apresentação">
          {chapters.slice(0, 5).map((chapter) => (
            <button key={chapter.id} className={activeSection === chapter.id ? "nav-link active" : "nav-link"} onClick={() => { scrollToChapter(chapter.id); setIsNavOpen(false); }}>
              <span>{chapter.short}</span>{chapter.label}
            </button>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="install-button" onClick={installApp}><Download size={15} /> Instalar app</button>
          <button className="present-button" onClick={() => setIsPresenterMode(true)}><Maximize2 size={15} /> Modo apresentação</button>
          <button className="menu-button" onClick={() => setIsNavOpen((open) => !open)} aria-label="Abrir navegação">
            {isNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <aside className="progress-rail" aria-label="Progresso da apresentação">
        <span className="rail-line" />
        {chapters.map((chapter) => (
          <button key={chapter.id} onClick={() => scrollToChapter(chapter.id)} className={activeSection === chapter.id ? "rail-dot active" : "rail-dot"} aria-label={`Ir para ${chapter.label}`}>
            <span>{chapter.short}</span>
          </button>
        ))}
      </aside>

      <section id="inicio" className="hero-section chapter-section">
        <div className="hero-copy reveal-up">
          <p className="kicker"><span className="kicker-dot" /> Experiência interativa · AVR-S</p>
          <h1>Perceber<br /><em>antes</em> de responder.</h1>
          <p className="hero-lede">Você toma centenas de decisões por dia no automático. O AVR-S é uma tecnologia que te devolve um espelho de como você age e pensa — para você voltar a escolher com consciência.</p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={() => scrollToChapter("contexto")}>Começar a experiência <ArrowRight size={17} /></button>
            <button className="text-cta" onClick={() => setIsPresenterMode(true)}><Play size={15} fill="currentColor" /> Abrir modo apresentação</button>
          </div>
          <div className="hero-meta"><span>01 / 06</span><span className="meta-rule" /><span>Uma tecnologia que devolve perguntas</span></div>
          <p className="mobile-swipe-hint"><span>←</span> No modo apresentação, deslize para navegar <span>→</span></p>
        </div>
        <div className="hero-visual reveal-scale" aria-label="Visualização do sistema AVR-S">
          <div className="orbital orbital-a" /><div className="orbital orbital-b" /><div className="orbital orbital-c" />
          <div className="orbit-particle particle-a" aria-hidden="true"><span /></div>
          <div className="orbit-particle particle-b" aria-hidden="true"><span /></div>
          <div className="orbit-particle particle-c" aria-hidden="true"><span /></div>
          <div className="hero-orb"><span className="orb-spark"><Sparkles size={17} /></span><strong>AVR-S</strong><small>Perceber<br />· escolher · transformar</small></div>
          <span className="orbit-label label-top">PROPÓSITO</span><span className="orbit-label label-right">MÉTODO</span><span className="orbit-label label-bottom">RESULTADO</span><span className="orbit-label label-left">PESSOAS</span>
          <div className="signal signal-one"><span /><b>atenção</b></div><div className="signal signal-two"><span /><b>visão</b></div><div className="signal signal-three"><span /><b>resposta</b></div>
        </div>
        <div className="scroll-cue"><span>role para explorar</span><ArrowDown size={15} /></div>
      </section>

      <section id="contexto" className="context-section chapter-section">
        <div className="section-heading split-heading reveal-up"><div><p className="section-index amber-text">02 / O desafio</p><h2>A tecnologia já responde por você.<br /><em>Quem te ajuda a perceber?</em></h2></div><p className="heading-aside">Nunca foi tão fácil ter respostas. Mas quanto mais a tecnologia responde, menos a gente percebe: reage antes de enxergar, repete padrões sem ver. O ponto cego nunca foi falta de informação — é falta de consciência sobre o próprio movimento.</p></div>
        <div className="context-grid">
          <article className="quote-panel reveal-up"><Quote size={28} /><p>“A tecnologia pode responder por você.<br /><strong>O AVR-S foi criado para ajudá-lo a perceber antes de responder.”</strong></p><span className="quote-line" /></article>
          <div className="insight-stack reveal-up">
            <article className="insight-card"><span className="insight-number">01</span><div><h3>Do automático</h3><p>Reatividade, ruído e decisões tomadas antes da percepção.</p></div><ArrowRight size={17} /></article>
            <article className="insight-card"><span className="insight-number">02</span><div><h3>Para o consciente</h3><p>Clareza para reconhecer padrões, escolher diferente e sustentar a mudança.</p></div><ArrowRight size={17} /></article>
            <article className="insight-card accent-card"><span className="insight-number">03</span><div><h3>Um espelho, não um oráculo</h3><p>A tecnologia devolve a sua pergunta — não a resposta pronta.</p></div><ShieldCheck size={20} /></article>
          </div>
        </div>
      </section>

      <section id="metodo" className="method-section chapter-section">
        <div className="section-heading reveal-up"><p className="section-index green-text">03 / O método</p><h2>Quatro movimentos.<br /><em>Uma nova resposta.</em></h2><p className="section-intro">O AVR-S organiza a consciência num ciclo simples de lembrar e profundo de praticar. No app, cada movimento vira uma pergunta-espelho: em vez de te dar a resposta, devolve a sua.</p></div>
        <div className="method-layout">
          <div className="method-list reveal-up">
            {methodSteps.map((step, index) => {
              const StepIcon = step.icon;
              return <button key={step.key} className={activeMethod === index ? `method-row active ${step.color}` : "method-row"} onClick={() => { setActiveMethod(index); setIsAutoPlaying(false); }}><span className="method-letter">{step.key}</span><span className="method-icon"><StepIcon size={18} /></span><span className="method-row-copy"><strong>{step.label}</strong><small>{step.question}</small></span><ChevronRight size={17} className="method-arrow" /></button>;
            })}
            <button className={isAutoPlaying ? "auto-play active" : "auto-play"} onClick={() => setIsAutoPlaying((playing) => !playing)}>{isAutoPlaying ? <Pause size={14} /> : <Play size={14} />} {isAutoPlaying ? "Pausar ciclo" : "Ver ciclo em movimento"}</button>
          </div>
          <div className={`method-stage ${methodSteps[activeMethod].color} reveal-scale`}>
            <div className="stage-glow" />
            <span className="stage-overline">MÉTODO AVR-S · {String(activeMethod + 1).padStart(2, "0")} / 04</span>
            <div className="stage-big-letter">{methodSteps[activeMethod].key}</div>
            <div className="stage-content"><p className="stage-label">{methodSteps[activeMethod].label}</p><h3>{methodSteps[activeMethod].question}</h3><p>{methodSteps[activeMethod].detail}</p></div>
            <div className="stage-footer"><span>ATENÇÃO</span><span>VISÃO</span><span>RESPOSTA</span><span>SISTEMA</span></div>
          </div>
        </div>
      </section>

      <section id="ecosistema" className="ecosystem-section chapter-section">
        <div className="section-heading split-heading reveal-up"><div><p className="section-index blue-text">04 / O ecossistema</p><h2>Começa em você.<br /><em>Cresce com você.</em></h2></div><p className="heading-aside">O app é a porta de entrada. A partir dele, a mesma consciência se aplica a decisões, relações e organizações inteiras.</p></div>
        <div className="ecosystem-layout">
          <div className="map-card reveal-up"><div className="map-card-top"><span><Network size={16} /> VISÃO GERAL</span><span>AVR-S / ECOSSISTEMA</span></div><div className="map-image-wrap"><img src={ecossistemaImg} alt="Mapa mental do ecossistema AVR-S: propósito, público-alvo, método, produtos, tecnologia, resultados e visão de futuro" /><div className="map-sheen" /></div><div className="map-caption"><span>O mapa completo do ecossistema AVR-S.</span><button onClick={() => scrollToChapter("transformacao")}>Ver a trilha <ArrowRight size={15} /></button></div></div>
          <div className="ecosystem-explorer reveal-up"><div className="explorer-label"><span>EXPLORAR CAMADAS</span><span>{String(activeEcosystem + 1).padStart(2, "0")} / {String(ecosystemItems.length).padStart(2, "0")}</span></div>{ecosystemItems.map((item, index) => { const ItemIcon = item.icon; return <button key={item.title} className={activeEcosystem === index ? `eco-row active ${item.color}` : "eco-row"} onClick={() => setActiveEcosystem(index)}><span className="eco-icon"><ItemIcon size={17} /></span><span><small>{item.eyebrow}</small><strong>{item.title}</strong></span><ChevronRight size={17} /></button>; })}<div className={`eco-detail ${ecosystemItems[activeEcosystem].color}`}><span className="detail-pulse" /><p>{ecosystemItems[activeEcosystem].copy}</p></div></div>
        </div>
      </section>

      <section id="transformacao" className="journey-section chapter-section">
        <div className="section-heading centered-heading reveal-up"><p className="section-index magenta-text">05 / A jornada</p><h2>Da percepção<br /><em>à nova consciência.</em></h2><p className="section-intro">Cada vez que você se vê no espelho, o automático perde força e a escolha ganha. A trilha torna visível o movimento por trás de cada decisão.</p></div>
        <div className="journey-track reveal-up"><div className="journey-line" />{journeySteps.map((step, index) => { const StepIcon = step.icon; return <div className={`journey-node ${step.color}`} key={step.label} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}><span className="journey-dot"><StepIcon size={17} /></span><strong>{step.label}</strong><small>{step.note}</small></div>; })}</div>
        <div className="journey-statement reveal-up"><Activity size={17} /><span>Consciência aplicada não é um destino.<br /><strong>É um sistema de evolução contínua.</strong></span></div>
      </section>

      <section id="proximo" className="closing-section chapter-section">
        <div className="closing-orbit"><div className="closing-ring ring-one" /><div className="closing-ring ring-two" /><div className="closing-core"><Sparkles size={22} /><span>AVR-S</span></div></div>
        <div className="closing-copy reveal-up"><p className="section-index red-text">06 / O próximo passo</p><h2>Leve o AVR-S<br /><em>para onde a decisão acontece.</em></h2><p>Uma tecnologia feita para abrir escolhas mais claras e futuros mais conscientes — começando por uma pessoa e chegando a organizações inteiras.</p><button className="primary-cta" onClick={() => setIsPresenterMode(true)}>Apresentar o AVR-S <ArrowRight size={17} /></button></div>
        <footer className="pitch-footer"><span>AVR-S</span><span>Consciência em ação para um futuro melhor.</span><span>Experiência interativa</span></footer>
      </section>

      <nav className="mobile-bottom-nav" aria-label="Navegação rápida mobile">
        <button className={activeSection === "inicio" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => scrollToChapter("inicio")}><CircleDot size={18} /><span>Início</span></button>
        <button className={activeSection === "metodo" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => scrollToChapter("metodo")}><BrainCircuit size={18} /><span>Método</span></button>
        <button className={activeSection === "ecosistema" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => scrollToChapter("ecosistema")}><Network size={18} /><span>Ecossistema</span></button>
        <button className={activeSection === "transformacao" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => scrollToChapter("transformacao")}><Route size={18} /><span>Jornada</span></button>
        <button className="mobile-nav-item install-nav-item" onClick={installApp}><Download size={18} /><span>Instalar</span></button>
      </nav>

      {isPresenterMode && <div className="presenter-overlay" role="dialog" aria-modal="true" aria-label="Modo apresentação"><div className="presenter-bg" /><div className="presenter-top"><span><span className="presenter-dot" /> MODO APRESENTAÇÃO</span><button onClick={() => setIsPresenterMode(false)}><X size={18} /> Sair</button></div><div className="presenter-content"><p className={`section-index ${activeChapter.accent}-text`}>{activeChapter.short} / {activeChapter.label}</p><h2>{activeChapter.title}</h2><p className="presenter-sub">Use ← → ou espaço para navegar entre os capítulos.</p><div className="presenter-progress"><span style={{ width: `${((activeChapterIndex + 1) / chapters.length) * 100}%` }} /></div></div><div className="presenter-controls"><button onClick={() => goToChapter(-1)} disabled={activeChapterIndex === 0}><ChevronLeft size={20} /> Anterior</button><span>{activeChapterIndex + 1} / {chapters.length}</span><button onClick={() => goToChapter(1)} disabled={activeChapterIndex === chapters.length - 1}>Próximo <ChevronRight size={20} /></button></div></div>}
    </main>
  );
}
