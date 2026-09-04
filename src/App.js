import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── DADOS ────────────────────────────────────────────────────────────────────

const WHATSAPP = '5547996235368';
const INSTAGRAM = 'https://www.instagram.com/studio_jhonny_miranda_camboriu/';
const REELS = 'https://www.instagram.com/studio_jhonny_miranda_camboriu/reels/'; // aba de vídeos
const MAPS_URL = 'https://www.google.com/maps/search/Rua+Tocantins+216+Vila+Areias+Camboriú+SC';

// ── VÍDEO DO HERO ──
// Exporte curto (6–12s), mudo, em loop, MP4/H.264, 720p–1080p, ideal < ~5 MB.
// HERO_POSTER = 1º frame do vídeo como .jpg (aparece instantâneo + é o fallback).
const HERO_VIDEO  = 'images/hero.mp4';
const HERO_POSTER = 'images/hero-poster.jpg';

const videos = [
  { id: 1, src: 'images/video1.mp4', poster: 'images/video1-poster.jpg', label: 'Resultado' },
  { id: 2, src: 'images/video2.mp4', poster: 'images/video2-poster.jpg', label: 'Transformação' },
  { id: 3, src: 'images/video3.mp4', poster: 'images/video3-poster.jpg', label: 'Antes & Depois' },
  { id: 4, src: 'images/video4.mp4', poster: 'images/video4-poster.jpg', label: 'Antes & Depois' },
  { id: 5, src: 'images/video5.mp4', poster: 'images/video5-poster.jpg', label: 'Antes & Depois' },
  { id: 6, src: 'images/video6.mp4', poster: 'images/video6-poster.jpg', label: 'Antes & Depois' },
];

// SERVIÇOS AGENDÁVEIS — cada um usa `imgs` (array).
// 2+ fotos: troca no hover (desktop) / tap (mobile). 1 foto: fica estática.
const servicos = [
  {
    id: 1, title: 'Corte & Styling',
    desc: 'Cortes personalizados que valorizam seu rosto e estilo de vida. Do clássico ao contemporâneo.',
    imgs: ['images/corte-1.jpg', 'images/corte-2.jpeg'],
    wa: 'Olá!%20Quero%20agendar%20um%20corte.',
  },
  {
    id: 2, title: 'Coloração',
    desc: 'Cobertura de brancos, tonalização e cores globais. Resultado uniforme, natural e duradouro.',
    imgs: ['images/coloracao-1.jpeg', 'images/coloracao-2.jpeg'],
    wa: 'Olá!%20Quero%20saber%20sobre%20coloração.',
  },
  {
    id: 3, title: 'Mechas & Luzes',
    desc: 'Balayage, ombré, morena iluminada e loiros. Iluminação sob medida para o seu tom de pele.',
    imgs: ['images/mechas-1.jpg', 'images/mechas-2.jpeg'],
    wa: 'Olá!%20Quero%20saber%20sobre%20mechas.',
  },
  {
    id: 4, title: 'Alisamento & Progressiva',
    desc: 'Técnicas avançadas para cabelos lisos, sem frizz e com brilho extraordinário por muito mais tempo.',
    imgs: ['images/progressiva-1.jpg', 'images/progressiva-2.jpeg'],
    wa: 'Olá!%20Quero%20saber%20sobre%20alisamento.',
  },
  {
    id: 5, title: 'Tratamentos Capilares',
    desc: 'Hidratações profundas, botox capilar e reconstrução. Seus cabelos, renovados de dentro para fora.',
    imgs: ['images/tratamento-1.jpg', 'images/tratamento-2.jpeg'],
    wa: 'Olá!%20Quero%20saber%20sobre%20tratamentos.',
  },
  {
    id: 6, title: 'Maquiagem',
    desc: 'Make para dia, festa e noiva. Realçamos a sua beleza com técnica e produtos de alta fixação.',
    imgs: ['images/maquiagem-1.jpeg', 'images/maquiagem-2.jpeg', 'images/maquiagem-3.jpeg' ],
    wa: 'Olá!%20Quero%20saber%20sobre%20maquiagem.',
  },
  //{
//    id: 7, title: 'Manicure & Pedicure',
//    desc: 'Unhas impecáveis com esmaltação tradicional, em gel e nail art. Cuidado completo para mãos e pés.',
  //  imgs: ['images/manicure-1.jpg', 'images/manicure-2.jpg'],
 //   wa: 'Olá!%20Quero%20saber%20sobre%20manicure.',
//  },
];

// PORTFÓLIO — as fotos nomeadas de looks/transformações.
// Adicione quantos objetos quiser aqui. Mais fotos de um look = mais itens no `imgs`.
const portfolio = [
  { id: 1, label: 'Morena iluminada', tag: 'Mechas', imgs: ['images/morena-iluminada-1.jpeg', 'images/morena-iluminada-2.jpeg'] },
  { id: 2, label: 'Mechas, tratamento e corte', tag: 'Combo', imgs: ['images/mechas-trat-corte-1.jpeg', 'images/mechas-trat-corte-2.jpeg'] },
  { id: 3, label: 'Mechas e corte', tag: 'Combo', imgs: ['images/mechas-corte-1.jpeg', 'images/mechas-corte-2.jpeg'] },
  { id: 4, label: 'Corte Chanel', tag: 'Corte', imgs: ['images/chanel-1.jpeg', 'images/chanel-2.jpeg'] },
  { id: 5, label: 'Corte pixie', tag: 'Corte', imgs: ['images/pixie-1.jpeg'] },
  { id: 6, label: 'Maquiagem', tag: 'Maquiagem', imgs: ['images/maquiagem-2.jpeg', 'images/maquiagem-4.jpeg','images/maquiagem-3.jpeg' ] },
];

// Faixa de manifesto que substitui os números
const manifesto = [
  { palavra: 'Técnica', detalhe: 'que transforma' },
  { palavra: 'Cuidado', detalhe: 'que acolhe' },
  { palavra: 'Arte', detalhe: 'que liberta' },
  { palavra: 'Beleza', detalhe: 'que pertence a você' },
];

const depoimentos = [
  {
    id: 1, letra: 'K', nome: 'Katia Camboim', meta: 'Camboriú, SC', featured: false,
    texto: '"Profissionais de alto padrão, estou amando, o cuidado a atenção eo profissionalismo perfeito, gratidão pela atenção 🙏🏼"',
  },
  {
    id: 2, letra: 'T', nome: 'Thamires Oliveira', meta: 'Camboriú, SC', featured: true,
    texto: '"2ª vez que confio meus cabelos nas mãos de Jhonny, estou super contente com o corte que ele fez! Além de super querido e acolhedor! Obrigada"',
  },
  {
    id: 3, letra: 'C', nome: 'Cristiano Flores', meta: 'Camboriú, SC', featured: false,
    texto: '"Fui sempre muito bem atendido. Equipe organizada, atenciosos, tudo limpo e cortam muito bem o cabelo. Você pode explicar que eles fazem igualzinho. Nota 10z"',
  },
];

const pilares = [
  { title: 'Técnica & Estudo', desc: 'Atualização constante com as principais tendências do mercado nacional e internacional' },
  { title: 'Produtos Premium', desc: 'Só as melhores marcas tocam nos seus cabelos — sem compromisso com resultado inferior' },
  { title: 'Ambiente Exclusivo', desc: 'Um espaço pensado nos mínimos detalhes para que você se sinta bem desde a chegada' },
];

// ─── SVGs ─────────────────────────────────────────────────────────────────────

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
// Botões de ação (WhatsApp + Instagram):
//   • Desktop (mouse): aparecem ao passar o mouse por cima (hover, via CSS).
//   • Mobile (toque): aparecem ao tocar no vídeo; toca de novo p/ esconder.
// O WhatsApp já leva a mensagem identificando QUAL vídeo a cliente viu.

function VideoCard({ v, cardRef }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const canHover = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
          setPlaying(true);
        } else {
          el.pause();
          el.currentTime = 0;
          setPlaying(false);
          setShowActions(false); // fecha os botões ao sair da tela
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile: toque no vídeo abre/fecha os botões. Desktop: o hover cuida disso (CSS).
  const handleClick = () => {
    if (canHover.current) return;
    setShowActions(s => !s);
  };

  // mensagem do WhatsApp já identifica QUAL vídeo a cliente viu
  const waMsg = encodeURIComponent(
    `Olá! Quero fazer o cabelo do vídeo "${v.label}" (vídeo ${v.id}) do site 😍`
  );

  return (
    <div ref={cardRef} className="jm-video-card" onClick={handleClick}>
      <video
        ref={videoRef}
        src={v.src}
        poster={v.poster}
        muted
        playsInline
        loop
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* botão play (some quando os botões de ação estão abertos no mobile) */}
      <div
        className="jm-video-overlay"
        style={{ opacity: showActions ? 0 : (playing ? 0 : 1), transition: 'opacity 0.3s' }}
      >
        <div className="jm-video-play">▶</div>
      </div>

      {/* botões de ação — hover no desktop (CSS), .show no mobile */}
      <div className={`jm-video-actions${showActions ? ' show' : ''}`}>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="jm-video-btn jm-video-btn-wa"
          onClick={e => e.stopPropagation()}
        >
          <WhatsappIcon /> Quero esse cabelo
        </a>
        <a
          href={REELS}
          target="_blank"
          rel="noopener noreferrer"
          className="jm-video-btn jm-video-btn-ig"
          onClick={e => e.stopPropagation()}
        >
          <InstagramIcon /> Ver no Instagram
        </a>
      </div>

      <div
        className="jm-video-instagram-badge"
        style={{ opacity: showActions ? 0 : 1, transition: 'opacity 0.3s' }}
      >
        @studio_jhonny_miranda_camboriu
      </div>
    </div>
  );
}

// ─── SERVIÇO CARD ─────────────────────────────────────────────────────────────
// Troca de imagem: hover no desktop (pointer fine), tap no mobile (touch).
// 2 fotos = alterna. 3+ fotos = cicla no hover. 1 foto = estática.

function ServicoCard({ s, cardRef }) {
  const imgs = s.imgs && s.imgs.length ? s.imgs : (s.img ? [s.img] : []);
  const multi = imgs.length > 1;
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const canHover = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const clearTimer = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  const handleEnter = () => {
    if (!multi || !canHover.current) return;
    setIdx(1);
    if (imgs.length > 2) {
      timer.current = setInterval(() => setIdx(p => (p + 1) % imgs.length), 1400);
    }
  };
  const handleLeave = () => {
    if (!canHover.current) return;
    clearTimer();
    setIdx(0);
  };
  const handleTap = () => {
    if (!multi || canHover.current) return; // mobile: tap cicla pelas fotos
    setIdx(p => (p + 1) % imgs.length);
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <div className="jm-servico-card" ref={cardRef}>
      <div
        className="jm-servico-img-wrap"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleTap}
        style={multi && !canHover.current ? { cursor: 'pointer' } : undefined}
      >
        <div className="jm-servico-img-stack">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${s.title}${i ? ' ' + (i + 1) : ''}`}
              loading="lazy"
              className={`jm-servico-img${i === idx ? ' active' : ''}`}
            />
          ))}
        </div>
        {multi && (
          <div className="jm-servico-dots">
            {imgs.map((_, i) => (
              <span key={i} className={`jm-servico-dot${i === idx ? ' active' : ''}`} />
            ))}
          </div>
        )}
      </div>
      <div className="jm-servico-body">
        <h3 className="jm-servico-title">{s.title}</h3>
        <p className="jm-servico-desc">{s.desc}</p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${s.wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="jm-servico-cta"
        >Agendar</a>
      </div>
    </div>
  );
}

// ─── PORTFÓLIO CARD ───────────────────────────────────────────────────────────
// Mesma mecânica de troca de imagem, layout de galeria (foto cheia + legenda).

function PortfolioCard({ p, cardRef }) {
  const imgs = p.imgs && p.imgs.length ? p.imgs : [];
  const multi = imgs.length > 1;
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const canHover = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const clearTimer = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };
  const enter = () => {
    if (!multi || !canHover.current) return;
    setIdx(1);
    if (imgs.length > 2) timer.current = setInterval(() => setIdx(v => (v + 1) % imgs.length), 1400);
  };
  const leave = () => {
    if (!canHover.current) return;
    clearTimer();
    setIdx(0);
  };
  const tap = () => {
    if (!multi || canHover.current) return;
    setIdx(v => (v + 1) % imgs.length);
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <div
      className="jm-porto-card"
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={tap}
      style={multi && !canHover.current ? { cursor: 'pointer' } : undefined}
    >
      <div className="jm-porto-stack">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={p.label}
            loading="lazy"
            className={`jm-porto-img${i === idx ? ' active' : ''}`}
          />
        ))}
      </div>
      <div className="jm-porto-overlay" />
      {p.tag && <span className="jm-porto-tag">{p.tag}</span>}
      <div className="jm-porto-caption">
        <span className="jm-porto-label">{p.label}</span>
        {multi && (
          <div className="jm-porto-dots">
            {imgs.map((_, i) => (
              <span key={i} className={`jm-porto-dot${i === idx ? ' active' : ''}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({ nome: '', telefone: '', servico: '', data: '', horario: '', mensagem: '' });
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoje = new Date().toISOString().split('T')[0]; // bloqueia datas passadas no seletor

  // refs animações
  const headerRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroEyebrowRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroTaglineRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroScrollRef = useRef(null);
  const manifestoRef = useRef(null);
  const manifestoItemRefs = useRef([]);
  const servicosRef = useRef(null);
  const servicoLabelRef = useRef(null);
  const servicoHeadingRef = useRef(null);
  const servicoCardRefs = useRef([]);
  // ── refs Portfólio ──
  const portoRef = useRef(null);
  const portoLabelRef = useRef(null);
  const portoHeadingRef = useRef(null);
  const portoCardRefs = useRef([]);
  const sobreMediaRef = useRef(null);
  const sobreParallaxRef = useRef(null);
  const sobreContentRef = useRef(null);
  const sobreParRefs = useRef([]);
  const pilarRefs = useRef([]);
  const videosRef = useRef(null);
  const videoLabelRef = useRef(null);
  const videoHeadingRef = useRef(null);
  const videoCardRefs = useRef([]);
  const deposRef = useRef(null);
  const deposHeadingRef = useRef(null);
  const deposLabelRef = useRef(null);
  const ratingPillRef = useRef(null);
  const depoCardRefs = useRef([]);
  const localContentRef = useRef(null);
  const localMapRef = useRef(null);
  const localCardRefs = useRef([]);
  const contatoInnerRef = useRef(null);
  const footerRef = useRef(null);

  // ── resize ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── scroll header ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── body overflow quando menu mobile aberto ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // ── GSAP ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) {
      [
        heroEyebrowRef, heroHeadlineRef, heroTaglineRef,
        heroActionsRef, heroScrollRef, sobreMediaRef, sobreContentRef,
        localContentRef, localMapRef, contatoInnerRef, footerRef,
      ].forEach(r => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none'; }
      });
      [...sobreParRefs.current, ...pilarRefs.current, ...localCardRefs.current,
        ...servicoCardRefs.current, ...depoCardRefs.current, ...videoCardRefs.current,
        ...manifestoItemRefs.current, ...portoCardRefs.current].forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      return;
    }

    const ctx = gsap.context(() => {

      // 1. HERO
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(heroEyebrowRef.current,  { opacity: 1, y: 0, duration: 1.2, delay: 0.3 })
        .to(heroHeadlineRef.current, { opacity: 1, y: 0, duration: 1.6 }, '-=0.6')
        .to(heroTaglineRef.current,  { opacity: 1, duration: 1.0 }, '-=0.5')
        .to(heroActionsRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)' }, '-=0.5')
        .to(heroScrollRef.current,   { opacity: 1, duration: 0.8 }, '-=0.2');

      // 2. PARALLAX HERO BG
      if (!isMobile && heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 30, ease: 'none',
          scrollTrigger: { trigger: '.jm-hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
        });
      }

      // 3. MANIFESTO
      if (manifestoRef.current) {
        manifestoItemRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 1, y: 0, duration: 1, delay: i * 0.15, ease: 'power4.out',
            scrollTrigger: { trigger: manifestoRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 }
          });
        });
      }

      // 4. SERVIÇOS
      if (servicosRef.current) {
        gsap.to(servicoLabelRef.current, {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: servicosRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 }
        });
        gsap.to(servicoHeadingRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: servicosRef.current, start: 'top 75%', end: 'top 45%', scrub: 1 }
        });
        servicoCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.to(card, {
            opacity: 1, x: 0, duration: 1, delay: i * 0.08, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 60%', scrub: 1 }
          });
          // parallax mira o STACK (não a img individual), senão desalinha ao trocar de foto
          const stack = card.querySelector('.jm-servico-img-stack');
          if (stack && !isMobile) {
            gsap.to(stack, {
              yPercent: -8, ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
          }
        });
      }

      // 4b. PORTFÓLIO
      if (portoRef.current) {
        gsap.to(portoLabelRef.current, {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: portoRef.current, start: 'top 80%', end: 'top 55%', scrub: 1 }
        });
        gsap.to(portoHeadingRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: portoRef.current, start: 'top 75%', end: 'top 50%', scrub: 1 }
        });
        portoCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.to(card, {
            opacity: 1, y: 0, duration: 1, delay: i * 0.08, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 60%', scrub: 1.2 }
          });
        });
      }

      // 5. SOBRE
      if (sobreMediaRef.current) {
        gsap.to(sobreMediaRef.current, {
          opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power4.out',
          scrollTrigger: { trigger: sobreMediaRef.current, start: 'top 80%', end: 'top 40%', scrub: 1.5 }
        });
        if (!isMobile && sobreParallaxRef.current) {
          gsap.to(sobreParallaxRef.current, {
            yPercent: 15, ease: 'none',
            scrollTrigger: { trigger: sobreMediaRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
          });
        }
      }
      if (sobreContentRef.current) {
        gsap.to(sobreContentRef.current.querySelector('.jm-section-label'), {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sobreContentRef.current, start: 'top 80%', end: 'top 55%', scrub: 1 }
        });
        gsap.to(sobreContentRef.current.querySelector('.jm-section-heading'), {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sobreContentRef.current, start: 'top 75%', end: 'top 50%', scrub: 1 }
        });
        gsap.to(sobreContentRef.current, {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sobreContentRef.current, start: 'top 80%', end: 'top 40%', scrub: 1.5 }
        });
        sobreParRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power4.out',
            scrollTrigger: { trigger: sobreContentRef.current, start: 'top 70%', end: 'top 30%', scrub: 1.2 }
          });
        });
        pilarRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 1, x: 0, duration: 0.8, delay: i * 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: sobreContentRef.current, start: 'top 60%', end: 'top 20%', scrub: 1.2 }
          });
        });
      }

      // 6. VÍDEOS
      if (videosRef.current) {
        gsap.to(videoLabelRef.current, {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: videosRef.current, start: 'top 80%', end: 'top 55%', scrub: 1 }
        });
        gsap.to(videoHeadingRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: videosRef.current, start: 'top 75%', end: 'top 50%', scrub: 1 }
        });
        videoCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.to(card, {
            opacity: 1, y: 0, duration: 1, delay: i * 0.1, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 55%', scrub: 1.2 }
          });
        });
      }

      // 7. DEPOIMENTOS
      if (deposRef.current) {
        gsap.to(deposLabelRef.current, {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: deposRef.current, start: 'top 80%', end: 'top 55%', scrub: 1 }
        });
        gsap.to(deposHeadingRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: deposRef.current, start: 'top 75%', end: 'top 50%', scrub: 1 }
        });
        gsap.to(ratingPillRef.current, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: deposRef.current, start: 'top 70%', end: 'top 45%', scrub: 1 }
        });
        depoCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.to(card, {
            opacity: 1, y: 0, scale: 1, duration: 1, delay: i * 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 55%', scrub: 1.2 }
          });
        });
      }

      // 8. LOCALIZAÇÃO
      if (localContentRef.current) {
        gsap.to(localContentRef.current.querySelector('.jm-section-label'), {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: localContentRef.current, start: 'top 80%', end: 'top 55%', scrub: 1 }
        });
        gsap.to(localContentRef.current.querySelector('.jm-section-heading'), {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: localContentRef.current, start: 'top 75%', end: 'top 50%', scrub: 1 }
        });
        gsap.to(localContentRef.current, {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: localContentRef.current, start: 'top 80%', end: 'top 40%', scrub: 1.5 }
        });
        localCardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.9, delay: i * 0.15, ease: 'power4.out',
            scrollTrigger: { trigger: localContentRef.current, start: 'top 70%', end: 'top 30%', scrub: 1.2 }
          });
        });
      }
      if (localMapRef.current) {
        gsap.to(localMapRef.current, {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: localMapRef.current, start: 'top 80%', end: 'top 40%', scrub: 1.5 }
        });
      }

      // 9. CONTATO
      if (contatoInnerRef.current) {
        gsap.to(contatoInnerRef.current, {
          opacity: 1, y: 0, duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: contatoInnerRef.current, start: 'top 80%', end: 'top 40%', scrub: 1.5 }
        });
      }

      // 10. FOOTER
      if (footerRef.current) {
        gsap.to(footerRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', end: 'top 60%', scrub: 1.5 }
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  // ── helpers ──────────────────────────────────────────────────────────────────
  const wa = (msg = 'Olá%20Jhonny!%20Vi%20o%20site%20e%20gostaria%20de%20agendar.') =>
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');

  const closeMenu = () => setIsMenuOpen(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // yyyy-mm-dd -> dd/mm/yyyy
    const dataBr = formData.data
      ? formData.data.split('-').reverse().join('/')
      : 'A combinar';
    const msg =
      `Olá Jhonny! Vi o site e gostaria de agendar.%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*Telefone:* ${formData.telefone}%0A` +
      `*Serviço:* ${formData.servico}%0A` +
      `*Dia preferido:* ${dataBr}%0A` +
      `*Horário preferido:* ${formData.horario || 'A combinar'}%0A` +
      `*Mensagem:* ${formData.mensagem || 'Sem detalhes'}%0A%0A` +
      `_(Preferência de horário — no aguardo da confirmação do studio.)_`;
    wa(msg);
    setFormData({ nome: '', telefone: '', servico: '', data: '', horario: '', mensagem: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="jm-app">

      {/* ── HEADER ── */}
      <header ref={headerRef} className={`jm-header${isScrolled ? ' scrolled' : ''}`}>
        <div className="jm-header-inner">
          <div className="jm-header-title">
          Studio Jhonny <span>Miranda</span>
          </div>

          <button
            className={`jm-menu-toggle${isMenuOpen ? ' active' : ''}`}
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          <nav className={`jm-nav${isMenuOpen ? ' open' : ''}`}>
            {[['#inicio','Início'],['#servicos','Serviços'],['#portfolio','Portfólio'],['#sobre','Studio'],
              ['#videos','Vídeos'],['#depoimentos','Clientes'],['#localizacao','Localização']].map(([href, label]) => (
              <a key={href} href={href} className="jm-nav-link" onClick={closeMenu}>{label}</a>
            ))}
            <a href="#contato" className="jm-nav-link jm-nav-cta" onClick={closeMenu}>Agendar</a>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="jm-menu-overlay" onClick={closeMenu} />
      )}

      {/* ── HERO ── */}
      <section className="jm-hero" id="inicio">
        <div ref={heroBgRef} className="jm-hero-bg">
          <video
            ref={heroVideoRef}
            className="jm-hero-video"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
        <div className="jm-hero-overlay" />
        <div className="jm-hero-content">
          <div ref={heroEyebrowRef} className="jm-hero-eyebrow"></div>
          <h1 ref={heroHeadlineRef} className="jm-hero-headline">
              Mais que um salão,<br />
              <em>um lugar para você</em>
            </h1>
          <div ref={heroActionsRef} className="jm-hero-actions">
            <a href="#contato" className="jm-btn jm-btn-primary">Agendar Horário</a>
            <button className="jm-btn jm-btn-ghost" onClick={() => wa()}>WhatsApp</button>
          </div>
        </div>
        <div ref={heroScrollRef} className="jm-hero-scroll-hint">
          <div className="jm-scroll-line" />
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section ref={manifestoRef} className="jm-manifesto-section">
        <div className="jm-manifesto-inner">
          {manifesto.map((item, i) => (
            <div
              key={i}
              ref={el => manifestoItemRefs.current[i] = el}
              className="jm-manifesto-item"
            >
              <span className="jm-manifesto-palavra">{item.palavra}</span>
              <span className="jm-manifesto-detalhe">{item.detalhe}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section ref={servicosRef} className="jm-servicos-section" id="servicos">
        <div ref={servicoLabelRef} className="jm-section-label">Especialidades</div>
        <div className="jm-section-heading-wrap">
          <h2 ref={servicoHeadingRef} className="jm-section-heading">Nossos <em>Serviços</em></h2>
        </div>
        <div className="jm-servicos-scroll">
          {servicos.map((s, i) => (
            <ServicoCard
              key={s.id}
              s={s}
              cardRef={el => servicoCardRefs.current[i] = el}
            />
          ))}
        </div>
      </section>

      {/* ── PORTFÓLIO ── */}
      <section ref={portoRef} className="jm-porto-section" id="portfolio">
        <div ref={portoLabelRef} className="jm-section-label">Portfólio</div>
        <div className="jm-section-heading-wrap">
          <h2 ref={portoHeadingRef} className="jm-section-heading">Transformações <em>reais</em></h2>
        </div>
        <div className="jm-porto-grid">
          {portfolio.map((p, i) => (
            <PortfolioCard
              key={p.id}
              p={p}
              cardRef={el => portoCardRefs.current[i] = el}
            />
          ))}
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section className="jm-sobre-section" id="sobre">
        <div ref={sobreMediaRef} className="jm-sobre-media">
          <div ref={sobreParallaxRef} className="jm-sobre-img-parallax">
            <img
              src="images/Sobre.jpeg"
              alt="Studio Jhonny Miranda"
              loading="lazy"
              className="jm-sobre-img"
            />
          </div>
        </div>

      <div ref={sobreContentRef} className="jm-sobre-content">
        <div className="jm-section-label">Studio</div>
        <h2 className="jm-section-heading">Um espaço criado <em>para você</em></h2>
        <p ref={el => sobreParRefs.current[0] = el} className="jm-sobre-p">
          Desde <strong>2012</strong>, o <strong>Studio Jhonny Miranda</strong> é referência em Camboriú - SC 
          quando o assunto é beleza e transformação capilar. Mais do que um salão, somos um espaço de 
          acolhimento, onde cada cliente encontra um atendimento personalizado e feito com excelência.
        </p>
        <p ref={el => sobreParRefs.current[1] = el} className="jm-sobre-p">
          Comandado por <strong>João Miranda</strong>, profissional com <strong>formação acadêmica </strong> 
           e especialização em técnicas modernas, o studio conduz cada procedimento com segurança, técnica 
          e olhar atento aos detalhes. Utilizamos produtos de alta performance para garantir resultados 
          que respeitam a identidade e a saúde dos seus cabelos.
        </p>
        <div className="jm-sobre-pilares">
          {pilares.map((p, i) => (
            <div key={i} ref={el => pilarRefs.current[i] = el} className="jm-pilar">
              <div>
                <h4 className="jm-pilar-title">{p.title}</h4>
                <p className="jm-pilar-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="#contato" className="jm-btn jm-btn-dark">Conhecer o Studio</a>
      </div>
      </section>

      {/* ── VÍDEOS ── */}
      <section ref={videosRef} className="jm-videos-section" id="videos">
        <div ref={videoLabelRef} className="jm-section-label">Conteúdo</div>
        <div className="jm-section-heading-wrap">
          <h2 ref={videoHeadingRef} className="jm-section-heading">Veja nosso <em>trabalho</em></h2>
        </div>
        <div className="jm-videos-grid">
          {videos.map((v, i) => (
            <VideoCard
              key={v.id}
              v={v}
              cardRef={el => videoCardRefs.current[i] = el}
            />
          ))}
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section ref={deposRef} className="jm-depos-section" id="depoimentos">
        <div className="jm-depos-header">
          <div ref={deposLabelRef} className="jm-section-label">Clientes</div>
          <h2 ref={deposHeadingRef} className="jm-section-heading">O que dizem <em>sobre nós</em></h2>
          <div ref={ratingPillRef} className="jm-rating-pill">★ 5.0 · Google Reviews</div>
        </div>
        <div className="jm-depos-grid">
          {depoimentos.map((d, i) => (
            <div
              key={d.id}
              ref={el => depoCardRefs.current[i] = el}
              className={`jm-depo-card${d.featured ? ' featured' : ''}`}
            >
              <div className="jm-depo-stars">★★★★★</div>
              <p className="jm-depo-text">{d.texto}</p>
              <div className="jm-depo-author">
                <div className="jm-depo-avatar">{d.letra}</div>
                <div>
                  <div className="jm-depo-name">{d.nome}</div>
                  <div className="jm-depo-meta">{d.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCALIZAÇÃO ── */}
      <section className="jm-local-section" id="localizacao">
        <div ref={localContentRef} className="jm-local-content">
          <div className="jm-section-label">Onde estamos</div>
          <h2 className="jm-section-heading">Venha nos <em>visitar</em></h2>
          <div className="jm-local-cards">
            {[
              { title: 'Endereço',
                body: <>Rua Tocantins, 216<br />Vila Areias, Camboriú - SC<br />CEP: 88345-063</> },
              { title: 'Horários',
                body: <>Seg-Sex: 9h às 20h<br />Sábado: 9h às 17h<br />Domingo: Fechado</> },
              { title: 'Contato',
                body: <>(47) 99623-5368<br />joaoluismiranda602@gmail.com</>,
                btn: true },
            ].map((c, i) => (
              <div key={i} ref={el => localCardRefs.current[i] = el} className="jm-local-card">
                <h4>{c.title}</h4>
                <p>{c.body}</p>
                {c.btn && (
                  <button className="jm-btn jm-btn-sm" onClick={() => wa()}>
                    Falar no WhatsApp
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div ref={localMapRef} className="jm-local-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.2!2d-48.8549!3d-27.0173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAxJzAyLjMiUyA0OMKwNTEnMTcuNiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Jhonny Miranda Studio - Localização"
          />
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section className="jm-contato-section" id="contato">
        <div ref={contatoInnerRef} className="jm-contato-inner">
          <div className="jm-section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Agendar</div>
          <h2 className="jm-contato-heading">Pronto para sua <em>transformação?</em></h2>
          <p className="jm-contato-sub">Agende pelo WhatsApp e garanta seu horário. Atendimento rápido e personalizado.</p>

          {submitted ? (
            <div className="jm-success">
              <div className="jm-success-icon">✓</div>
              <h3>Mensagem enviada!</h3>
              <p>Você foi redirecionado para o WhatsApp.</p>
            </div>
          ) : (
            <div className="jm-contato-form-wrap">
              <form className="jm-contato-form" onSubmit={handleSubmit}>
                <div className="jm-form-row">
                  <div className="jm-form-field">
                    <label>Nome completo</label>
                    <input
                      type="text" name="nome" required placeholder="Seu nome"
                      value={formData.nome} onChange={handleChange}
                    />
                  </div>
                  <div className="jm-form-field">
                    <label>Telefone / WhatsApp</label>
                    <input
                      type="tel" name="telefone" required placeholder="(47) 9 9999-9999"
                      value={formData.telefone} onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="jm-form-field">
                  <label>Serviço de interesse</label>
                  <select name="servico" required value={formData.servico} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    <option>Corte & Styling</option>
                    <option>Coloração</option>
                    <option>Mechas & Luzes</option>
                    <option>Alisamento & Progressiva</option>
                    <option>Tratamentos Capilares</option>
                    <option>Maquiagem</option>
                    <option>Manicure & Pedicure</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="jm-form-row">
                  <div className="jm-form-field">
                    <label>Dia preferido</label>
                    <input
                      type="date" name="data" required min={hoje}
                      value={formData.data} onChange={handleChange}
                    />
                  </div>
                  <div className="jm-form-field">
                    <label>Horário preferido</label>
                    <input
                      type="time" name="horario" required
                      value={formData.horario} onChange={handleChange}
                    />
                  </div>
                </div>
                <p className="jm-form-hint">
                  Funcionamento: Seg–Sex 9h–20h · Sáb 9h–17h · Dom fechado. É só a sua preferência — confirmamos pelo WhatsApp.
                </p>
                <div className="jm-form-field">
                  <label>Mensagem (opcional)</label>
                  <textarea
                    name="mensagem" rows={3} placeholder="Conte mais sobre o que deseja..."
                    value={formData.mensagem} onChange={handleChange}
                  />
                </div>
                <button type="submit" className="jm-btn-whatsapp">
                  <WhatsappIcon /> Enviar via WhatsApp
                </button>
              </form>
            </div>
          )}

          <div className="jm-contato-social">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="jm-social-link">
              <InstagramIcon /> @studio_jhonny_miranda_camboriu
            </a>
            <a href="mailto:joaoluismiranda602@gmail.com" className="jm-social-link">
              <EmailIcon /> joaoluismiranda602@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer ref={footerRef} className="jm-footer">
        <div className="jm-footer-inner">
          <div className="jm-footer-brand">
            <div className="jm-footer-title">Studio Jhonny <span>Miranda</span></div>
            <p className="jm-footer-tagline">Studio de Beleza · Camboriú SC</p>
          </div>
          <div className="jm-footer-links">
            {[['#inicio','Início'],['#servicos','Serviços'],['#portfolio','Portfólio'],['#sobre','Studio'],
              ['#videos','Vídeos'],['#depoimentos','Clientes'],['#localizacao','Localização'],['#contato','Agendar']].map(([href,label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
          <div className="jm-footer-contact">
            <p>Rua Tocantins, 216 · Vila Areias<br />Camboriú - SC · CEP 88345-063</p>
            <p>(47) 99623-5368</p>
          </div>
        </div>
        <div className="jm-footer-bottom">
          <p>© {new Date().getFullYear()} Jhonny Miranda Studio de Beleza. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ── FLOAT WHATSAPP ── */}
      <div className="jm-float-wa">
        <button onClick={() => wa()} aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>

    </div>
  );
}