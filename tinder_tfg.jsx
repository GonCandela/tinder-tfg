import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, MapPin, User, Award, RotateCcw, Flame, Skull, Coffee, Brain, Zap, Trophy, Sparkles } from 'lucide-react';

const TFGS_RAW = [
  {"ref":"TRA-01","titulo":"DISEÑO DE UN PUESTO DE MANDO TÁCTICO (PCTAC) DISTRIBUIDO","unidad":"BCG I","brigada":"BRI I","ciudad":"ZARAGOZA","director":"JAIME TRIGO ROYO","empleo":"TTE"},
  {"ref":"TRA-02","titulo":"APLICACIÓN DE TÉCNICAS DE INTELIGENCIA ARTIFICIAL PARA LA MONITORIZACIÓN Y DETECCIÓN DE AMENAZAS EN REDES CIS DE PUESTOS DE MANDO DE BRIGADA.","unidad":"BCG VII (CIATRANS 7)","brigada":"BRI VII","ciudad":"PONTEVEDRA","director":"JUAN MANUEL GARCÍA SOBRIDO","empleo":"CAP"},
  {"ref":"TRA-03","titulo":"CONFIGURACIÓN DE LOS PUESTOS DE MANDO TÁCTICOS DE BRIGADA Y ENLACE CON LOS CENTROS DE TRANSMISIONES.","unidad":"BCG VII (CIATRANS 7)","brigada":"BRI VII","ciudad":"PONTEVEDRA","director":"CARMEN MEZQUITA VARA DE REY","empleo":"TTE"},
  {"ref":"TRA-04","titulo":"INTEGRACIÓN DE REDES LORA EN LA ARQUITECTURA DE COMUNICACIONES DE UN PUESTO DE MANDO TÁCTICO DESPLEGABLE.","unidad":"BCG VII (CIATRANS 7)","brigada":"BRI VII","ciudad":"PONTEVEDRA","director":"PABLO ÁLVAREZ QUINTE","empleo":"TTE"},
  {"ref":"TRA-05","titulo":"EVALUACIÓN DE LA PASARELA NEMESIS PARA LA INTEGRACIÓN DE LOS SISTEMAS DE MANDO Y CONTROL BMS Y TALOS EN PROMETEO EN EL ÁMBITO DE UNA GRAN UNIDAD TIPO BRIGADA.","unidad":"BCG X - CIATRANS10","brigada":"BRI X","ciudad":"CÓRDOBA","director":"INÉS AGUILAR BARBERÁN","empleo":"TTE"},
  {"ref":"TRA-06","titulo":"ANÁLISIS DE CAPACIDADES Y OPTIMIZACIÓN DE MEDIOS RADIO HF COMO VECTOR PRINCIPAL DE TRANSMISIONES UNA GRAN UNIDAD TIPO BRIGADA.","unidad":"BCG X - CIATRANS10","brigada":"BRI X","ciudad":"CÓRDOBA","director":"RUBÉN JIMÉNEZ MARTÍN","empleo":"TTE"},
  {"ref":"TRA-07","titulo":"ESTUDIO DE VIABILIDAD PARA LA IMPLEMENTACIÓN DE UN SISTEMA DE IA \"OFFLINE\" Y SEGURO PARA EL APOYO A LA ADMINISTRACIÓN DE MEDIOS CIS EN PUESTOS DE MANDO DE BRIGADA.","unidad":"BCGBRI XII","brigada":"BRI XII","ciudad":"MADRID","director":"DAVID MOYA LÓPEZ","empleo":"TTE"},
  {"ref":"TRA-08","titulo":"EFICIENCIA EN LOS PUESTOS DE MANDO DISTRIBUIDO: OPTIMIZACIÓN DE LOS ELEMENTOS DEL PUESTO DE MANDO","unidad":"BCGBRI XII","brigada":"BRI XII","ciudad":"MADRID","director":"JORGE VÁZQUEZ MORA","empleo":"TTE"},
  {"ref":"TRA-09","titulo":"ESTUDIO DE VIABILIDAD INCREMENTO ANCHO DE BANDA TERMINALES TLB 50 IP.","unidad":"RT 1","brigada":"","ciudad":"HUESCA","director":"DIEGO GARCÍA SÁNCHEZ","empleo":"CAP"},
  {"ref":"TRA-10","titulo":"TUNELIZACIÓN IPSEC DINÁMICA","unidad":"RT 1","brigada":"","ciudad":"HUESCA","director":"RODRIGO CASTILLA CEREZO","empleo":"CAP"},
  {"ref":"TRA-11","titulo":"DISTRIBUCIÓN DE REDES DE MANDO Y CONTROL PARA PUESTO DE MANDO MÓVIL","unidad":"BCG VI","brigada":"BRIPAC","ciudad":"PARACUELLOS JARAMA","director":"DANIEL HERNANDO FERNÁNDEZ","empleo":"CTE"},
  {"ref":"TRA-12","titulo":"DISEÑO Y SECURIZACIÓN DE UN SERVIDOR Y SU INFRAESTRUCTURA DE RED PARA EXTENDER SERVICIOS CI5 A TRAVÉS DE REDES CLASIFICADAS","unidad":"BCG VI","brigada":"BRIPAC","ciudad":"PARACUELLOS JARAMA","director":"DANIEL HERNANDO FERNÁNDEZ","empleo":"CTE"},
  {"ref":"TRA-13","titulo":"DISEÑO E INTEGRACIÓN DE UN CENTRO DE TRANSMISIONES MÓVIL CON MODO FRONTERA DESPLEGABLE SOBRE VEHÍCULOS TÁCTICOS","unidad":"BCG VI","brigada":"BRIPAC","ciudad":"PARACUELLOS JARAMA","director":"DANIEL HERNANDO FERNÁNDEZ","empleo":"CTE"},
  {"ref":"TRA-14","titulo":"Estudio de la viabilidad de la integración de los terminales DLU (Data Link Unit) con el Sistema de Defensa Aéreo a través de terminales satélite.","unidad":"UTMAAA","brigada":"MAAA","ciudad":"MADRID","director":"MIGUEL ÁNGEL LUNA JIMÉNEZ","empleo":"CAP"},
  {"ref":"TRA-15","titulo":"Diseño e implementación de un sistema de comunicaciones IP satelital con VoIP y trazas seguras para la artillería antiaérea española aplicado a NASAMS IP y PATRIOT PAC-3","unidad":"UTMAAA","brigada":"MAAA","ciudad":"MADRID","director":"MIGUEL ÁNGEL LUNA JIMÉNEZ","empleo":"CAP"},
  {"ref":"TRA-16","titulo":"Securizar una red de radio-enlaces comerciales para su empleo en entornos tácticos","unidad":"BCG COMGECEU","brigada":"COMGECEU","ciudad":"CEUTA","director":"DAMIÁN CANDEL GARCÍA LILLO","empleo":"TTE"},
  {"ref":"TRA-17","titulo":"Estudio de viabilidad de sistemas de transmisión inalámbrica en banda comercial con penetración en terreno y escalabilidad","unidad":"BCG COMGECEU","brigada":"COMGECEU","ciudad":"CEUTA","director":"DAMIÁN CANDEL GARCÍA LILLO","empleo":"TTE"},
  {"ref":"TRA-18","titulo":"Arquitectura de red segura y segmentada para Sistemas de Mando y Control (C2) del Ejército de Tierra","unidad":"COMPAÑÍA DE TRANSMISIONES Nº 18","brigada":"COMGEMEL","ciudad":"MELILLA","director":"ISABEL MARÍA SUÁREZ SÁNCHEZ","empleo":"CAP"},
  {"ref":"TRA-19","titulo":"Diseño e implementación experimental de un canal alternativo para transmisión de voz y datos de la Red Radio de Combate mediante infraestructuras de comunicaciones IP","unidad":"COMPAÑÍA DE TRANSMISIONES Nº 18","brigada":"COMGEMEL","ciudad":"MELILLA","director":"ISABEL MARÍA SUÁREZ SÁNCHEZ","empleo":"CAP"},
  {"ref":"TRA-20","titulo":"Estudio de uso y mejora de la Red Radio de Combate (RRC) así como la implementación del UHF SATCOM en las unidades de helicópteros de FAMET.","unidad":"BCG FAMET","brigada":"FAMET","ciudad":"MADRID","director":"JESÚS ZAMORANO CEBRIÁN","empleo":"TTE"},
  {"ref":"TRA-21","titulo":"Optimización del Centro de Transmisiones del Puesto de Mando de la Fuerza Operativa de Helicópteros (FOHEL)","unidad":"BCG FAMET","brigada":"FAMET","ciudad":"MADRID","director":"PABLO MARTÍN CAPEL","empleo":"TTE"},
  {"ref":"TRA-22","titulo":"F19: Resiliencia militar: componentes, medición, formación adaptada a la Unidad y mejora","unidad":"BCG XVI","brigada":"BRICAN XVI","ciudad":"LAS PALMAS DE G.C.","director":"JAVIER GARCÍA LUJÁN","empleo":"TTE"},
  {"ref":"TRA-23","titulo":"Estudio del impacto de la guerra de Ucrania en el despliegue de puesto de mando y centro de transmisiones.","unidad":"BCG XVI","brigada":"BRICAN XVI","ciudad":"LAS PALMAS DE G.C.","director":"SANTIAGO JUAN FERNÁNDEZ PÉREZ","empleo":"TTE"},
  {"ref":"TRA-24","titulo":"Empleo de soluciones COTS en radiogoniometría: estudio funcional y técnico del KrakenSDR","unidad":"UEW II/31","brigada":"REW31","ciudad":"MADRID","director":"JORGE ROBLES CARPIO","empleo":"CAP"},
  {"ref":"TRA-25","titulo":"Cohesión en las unidades tipo compañía. Estudio desde el Modelo Estándar de Cohesión Grupal Militar.","unidad":"UEW II/31","brigada":"REW31","ciudad":"MADRID","director":"JORGE ROBLES CARPIO","empleo":"CAP"},
  {"ref":"TRA-26","titulo":"La guerra electrónica en la zona gris: capacidades, aplicaciones y limitaciones","unidad":"UEW II/31","brigada":"REW31","ciudad":"MADRID","director":"JORGE ROBLES CARPIO","empleo":"CAP"},
  {"ref":"TRA-27","titulo":"Standarized Operative Procedure to deploy the Virtual Desktop Infrastructure to operate in MS network.","unidad":"RT 21","brigada":"MATRANS","ciudad":"MARINES","director":"MIGUEL CASTIBLANQUE MANZANEQUE","empleo":"CAP"},
  {"ref":"TRA-28","titulo":"Estandarización del procedimiento de despliegue y configuración de extensiones remotas para redes clasificadas.","unidad":"RT 21","brigada":"MATRANS","ciudad":"MARINES","director":"IVAN DE LA FUENTE CASTROVERDE","empleo":"TTE"},
  {"ref":"TRA-29","titulo":"Estudio y propuesta de mejora de la estación SORIA como Puesto de Mando Móvil en apoyo a NRDC-ESP","unidad":"RT 21","brigada":"MATRANS","ciudad":"MARINES","director":"LUCÍA JULVE GODOY","empleo":"TTE"},
  {"ref":"TRA-30","titulo":"F1: Estudio y caracterización de los escombros espaciales y análisis de estrategias de monitorización y mitigación en el ámbito de la defensa","unidad":"BCGBRIXI","brigada":"BRI XI","ciudad":"BADAJOZ","director":"Por asignar","empleo":""},
  {"ref":"TRA-31","titulo":"F16: Antenas activas en el Ejército de Tierra: Casos de uso y prospectiva tecnológica","unidad":"BCGBRI II","brigada":"BRILEG","ciudad":"ALMERÍA","director":"JULIETA CONTRERAS GARNICA","empleo":"TTE"},
];

// Genera stats humorísticas deterministas a partir del ref del TFG
function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getStats(tfg) {
  const seed = hashCode(tfg.ref);
  const rand = (offset, max) => ((seed * (offset + 1)) % 100) * (max / 100);

  // Heurísticas chistosas según el contenido del título
  const t = tfg.titulo.toUpperCase();
  let bullshit = 30 + rand(1, 50);
  let coffee = 40 + rand(2, 50);
  let brain = 30 + rand(3, 50);
  let chill = 30 + rand(4, 50);

  if (t.includes('IA') || t.includes('INTELIGENCIA ARTIFICIAL')) { brain += 25; bullshit += 15; }
  if (t.includes('IPSEC') || t.includes('SECUR') || t.includes('CIFR')) { brain += 20; coffee += 15; }
  if (t.includes('RESILIENCIA') || t.includes('COHESIÓN')) { bullshit += 35; brain -= 15; chill += 20; }
  if (t.includes('OPTIMIZ') || t.includes('EFICIENCIA') || t.includes('ESTANDAR')) { bullshit += 20; chill += 10; }
  if (t.includes('ESCOMBROS ESPACIAL')) { brain += 30; bullshit -= 10; }
  if (t.includes('LORA') || t.includes('SDR') || t.includes('KRAKEN')) { brain += 20; coffee += 10; }
  if (t.includes('UCRANIA')) { bullshit += 10; brain += 5; }
  if (t.includes('ANTENAS')) { brain += 15; }
  if (t.includes('STANDARIZED') || t.includes('STANDAR')) { coffee += 20; }

  // Caps
  const cap = (v) => Math.max(5, Math.min(99, Math.round(v)));
  return {
    bullshit: cap(bullshit),
    coffee: cap(coffee),
    brain: cap(brain),
    chill: cap(chill),
  };
}

function getCityVibe(ciudad) {
  const c = ciudad.toUpperCase();
  if (c.includes('CEUTA') || c.includes('MELILLA')) return { emoji: '🌊', tag: 'CHIRINGUITO MODE' };
  if (c.includes('LAS PALMAS')) return { emoji: '🏝️', tag: 'PARAÍSO TROPICAL' };
  if (c.includes('MADRID')) return { emoji: '🍻', tag: 'CAÑAS GARANTIZADAS' };
  if (c.includes('ZARAGOZA')) return { emoji: '🏠', tag: 'NO TE MUEVES DE CASA' };
  if (c.includes('HUESCA')) return { emoji: '⛰️', tag: 'AIRE LIBRE Y FRÍO' };
  if (c.includes('CÓRDOBA')) return { emoji: '☀️', tag: 'CALOR INFERNAL' };
  if (c.includes('PONTEVEDRA')) return { emoji: '🌧️', tag: 'LLUVIA + PULPO' };
  if (c.includes('BADAJOZ')) return { emoji: '🐷', tag: 'JAMÓN PARA RATO' };
  if (c.includes('ALMER')) return { emoji: '🏜️', tag: 'DESIERTO ANDALUZ' };
  if (c.includes('PARACUELLOS')) return { emoji: '🪂', tag: 'PARACAS, CUIDADO' };
  if (c.includes('MARINES')) return { emoji: '🍊', tag: 'NARANJAS Y TXT' };
  return { emoji: '📍', tag: 'UBICACIÓN MISTERIOSA' };
}

function StatBar({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
      <span className="text-xs font-bold text-slate-700 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold text-slate-600 w-8 text-right">{value}%</span>
    </div>
  );
}

function Card({ tfg, style, onSwipeStart, onSwipeMove, onSwipeEnd, dragX, dragY, isTop }) {
  const stats = getStats(tfg);
  const vibe = getCityVibe(tfg.ciudad);
  const rotation = isTop ? dragX * 0.08 : 0;
  const opacity = isTop ? 1 - Math.min(Math.abs(dragX) / 400, 0.3) : 1;

  const showLike = isTop && dragX > 50;
  const showNope = isTop && dragX < -50;

  return (
    <div
      className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden select-none touch-none"
      style={{
        ...style,
        transform: `translate(${dragX}px, ${dragY}px) rotate(${rotation}deg) ${style.transform || ''}`,
        opacity,
        cursor: isTop ? 'grab' : 'default',
        transition: dragX === 0 && dragY === 0 ? 'transform 0.3s ease' : 'none',
      }}
      onMouseDown={isTop ? onSwipeStart : undefined}
      onTouchStart={isTop ? onSwipeStart : undefined}
    >
      {/* Header con gradient */}
      <div className="relative h-44 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 text-white overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />

        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black tracking-wider">
              {tfg.ref}
            </span>
            <span className="text-3xl">{vibe.emoji}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold opacity-90 mb-1">
            <MapPin className="w-3 h-3" />
            <span>{tfg.ciudad}</span>
            <span className="mx-1">·</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{vibe.tag}</span>
          </div>
          <div className="text-xs opacity-80">{tfg.unidad}{tfg.brigada ? ` · ${tfg.brigada}` : ''}</div>
        </div>

        {/* LIKE / NOPE stamps */}
        {showLike && (
          <div className="absolute top-6 left-6 border-4 border-green-400 text-green-400 px-4 py-1 rounded-lg font-black text-2xl rotate-[-20deg] tracking-wider">
            ¡SÍ!
          </div>
        )}
        {showNope && (
          <div className="absolute top-6 right-6 border-4 border-red-400 text-red-400 px-4 py-1 rounded-lg font-black text-2xl rotate-[20deg] tracking-wider">
            NOPE
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h2 className="text-base font-black text-slate-800 leading-tight mb-3 line-clamp-4">
          {tfg.titulo}
        </h2>

        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-600">
            <span className="font-bold">{tfg.empleo || 'OFICIAL'}</span> {tfg.director}
          </span>
        </div>

        <div className="text-[10px] font-black text-slate-400 mb-2 tracking-widest">📊 ESTADÍSTICAS BRUTALES</div>
        <StatBar icon={Brain} label="CRITERIO" value={stats.brain} color="#8b5cf6" />
        <StatBar icon={Coffee} label="CAFEÍNA" value={stats.coffee} color="#a16207" />
        <StatBar icon={Skull} label="PAJA" value={stats.bullshit} color="#dc2626" />
        <StatBar icon={Sparkles} label="VIDA" value={stats.chill} color="#10b981" />
      </div>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDir, setExitDir] = useState(0);
  const [showMatch, setShowMatch] = useState(null);
  const startPos = useRef({ x: 0, y: 0 });

  const current = TFGS_RAW[index];
  const next = TFGS_RAW[index + 1];
  const next2 = TFGS_RAW[index + 2];

  const handleStart = (e) => {
    setIsDragging(true);
    const point = e.touches ? e.touches[0] : e;
    startPos.current = { x: point.clientX, y: point.clientY };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      setDragX(point.clientX - startPos.current.x);
      setDragY(point.clientY - startPos.current.y);
    };
    const handleEnd = () => {
      setIsDragging(false);
      const threshold = 100;
      if (dragX > threshold) swipeAction('like');
      else if (dragX < -threshold) swipeAction('nope');
      else { setDragX(0); setDragY(0); }
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragX]);

  const swipeAction = (action) => {
    const dir = action === 'like' ? 1 : -1;
    setExitDir(dir);
    setDragX(dir * 600);
    setTimeout(() => {
      if (action === 'like') {
        setMatches([...matches, current]);
        setShowMatch(current);
        setTimeout(() => setShowMatch(null), 1500);
      } else {
        setRejected([...rejected, current]);
      }
      setIndex(index + 1);
      setDragX(0);
      setDragY(0);
      setExitDir(0);
    }, 300);
  };

  const reset = () => {
    setIndex(0);
    setMatches([]);
    setRejected([]);
    setDragX(0);
    setDragY(0);
  };

  const finished = index >= TFGS_RAW.length;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #ddd6fe 50%, #bfdbfe 100%)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-slate-800 text-lg leading-none">TFGinder</div>
              <div className="text-[10px] text-slate-500 font-bold tracking-wider">FIND YOUR PERFECT TFG ❤️</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/70 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-slate-700 shadow">
              {Math.min(index + (finished ? 0 : 1), TFGS_RAW.length)}/{TFGS_RAW.length}
            </div>
          </div>
        </div>

        {/* Card stack */}
        <div className="relative w-full" style={{ height: '560px' }}>
          {finished ? (
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mb-3" />
              <h2 className="text-2xl font-black text-slate-800 mb-2">¡Has terminado!</h2>
              <p className="text-sm text-slate-600 mb-5">
                {matches.length} matches · {rejected.length} descartes
              </p>
              {matches.length > 0 && (
                <div className="w-full mb-5">
                  <div className="text-xs font-black text-slate-400 mb-2 tracking-widest">💖 TUS MATCHES</div>
                  <div className="max-h-48 overflow-y-auto space-y-2 text-left">
                    {matches.map(m => (
                      <div key={m.ref} className="bg-gradient-to-r from-pink-50 to-purple-50 p-2 rounded-xl border border-pink-100">
                        <div className="text-[10px] font-black text-pink-600">{m.ref} · {m.ciudad}</div>
                        <div className="text-xs text-slate-700 line-clamp-2 font-medium">{m.titulo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={reset} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black py-3 px-6 rounded-2xl shadow-lg flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> EMPEZAR DE NUEVO
              </button>
            </div>
          ) : (
            <>
              {next2 && (
                <Card tfg={next2} style={{ transform: 'scale(0.92) translateY(20px)', zIndex: 1 }} dragX={0} dragY={0} isTop={false} />
              )}
              {next && (
                <Card tfg={next} style={{ transform: 'scale(0.96) translateY(10px)', zIndex: 2 }} dragX={0} dragY={0} isTop={false} />
              )}
              {current && (
                <Card
                  tfg={current}
                  style={{ zIndex: 3 }}
                  dragX={dragX}
                  dragY={dragY}
                  isTop={true}
                  onSwipeStart={handleStart}
                />
              )}
            </>
          )}

          {/* Match popup */}
          {showMatch && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white px-8 py-6 rounded-3xl shadow-2xl text-center animate-bounce">
                <div className="text-5xl mb-2">💘</div>
                <div className="text-2xl font-black tracking-wider">¡MATCH!</div>
                <div className="text-xs font-bold opacity-90 mt-1">{showMatch.ref}</div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {!finished && (
          <div className="flex items-center justify-center gap-6 mt-5">
            <button
              onClick={() => swipeAction('nope')}
              className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-red-100"
            >
              <X className="w-7 h-7 text-red-500" strokeWidth={3} />
            </button>
            <button
              onClick={() => swipeAction('like')}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </button>
            <button
              onClick={reset}
              className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-yellow-100"
              title="Reiniciar"
            >
              <RotateCcw className="w-6 h-6 text-yellow-600" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {!finished && (
          <p className="text-center text-[10px] text-slate-500 mt-4 font-bold tracking-wider">
            👈 ARRASTRA · TOCA LOS BOTONES · BUSCA TU AMOR ACADÉMICO 👉
          </p>
        )}
      </div>
    </div>
  );
}
