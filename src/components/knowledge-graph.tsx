'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { entities, bridgeEdges, SKILLS, skillMap, LENSES, contact, type GraphEntity } from '@/lib/graph-data';

type NodeKind = 'center' | 'hub' | 'skill' | 'entity';
type GNode = {
  id: string;
  label: string;
  kind: NodeKind;
  color?: string;
  lens?: string;
  entity?: GraphEntity;
  degree: number;
  x: number; y: number; z: number;
  byLens?: Record<string, { x: number; y: number; z: number }>;
};

const REST: Record<string, number> = { structure: 2.6, skill: 3.2, bridge: 3.0, fallback: 5.5 };
const K: Record<string, number> = { structure: 0.09, skill: 0.07, bridge: 0.08, fallback: 0.03 };

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function ease(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

export default function KnowledgeGraph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  const [selectedId, setSelectedId] = useState<string>('krish');
  const [currentLens, setCurrentLensState] = useState<string>('type');
  const [tourStepIdx, setTourStepIdx] = useState(0);
  const [tourActive, setTourActive] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [filterInfo, setFilterInfo] = useState<{ industryLabel: string; domainLabel: string; matchIds: string[] } | null>(null);

  const apiRef = useRef<{ selectNode: (id: string) => void; switchLens: (k: string) => void } | null>(null);

  // ---- selection lookups for the docked card (pure React state -> JSX) ----
  const skillEntries = Object.entries(SKILLS);
  const selectedEntity = entities.find(e => e.id === selectedId);
  const isHub = selectedId.startsWith('hub-');
  const isSkill = selectedId.startsWith('skill-');
  const skillKeyOf = (id: string) => id.replace(/^skill-/, '');

  useEffect(() => {
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const tooltip = tooltipRef.current!;
    const railEl = railRef.current!;
    const backBtn = backBtnRef.current!;

    // ---------- build node/edge graph ----------
    const allHubs: { id: string; label: string; color: string; lens: string }[] = [];
    const hubIndex: Record<string, { lens: string; match: (e: GraphEntity) => boolean }> = {};
    Object.keys(LENSES).forEach(lensKey => {
      LENSES[lensKey].hubs.forEach(h => {
        allHubs.push({ id: h.id, label: h.label, color: h.color, lens: lensKey });
        hubIndex[h.id] = { lens: lensKey, match: h.match };
      });
    });
    const entitiesOfHub = (hubId: string) => entities.filter(e => hubIndex[hubId].match(e));

    const skillIds = Object.keys(SKILLS).map(k => 'skill-' + k);
    const skillEdges: [string, string][] = [];
    Object.entries(skillMap).forEach(([entId, keys]) => keys.forEach(k => skillEdges.push(['skill-' + k, entId])));

    const nodes: GNode[] = [
      { id: 'krish', label: 'Krish Singh', kind: 'center', degree: 0, x: 0, y: 0, z: 0 },
      ...allHubs.map(h => ({ id: h.id, label: h.label, kind: 'hub' as const, color: h.color, lens: h.lens, degree: 0, x: 0, y: 0, z: 0 })),
      ...entities.map(e => ({ id: e.id, label: e.label, kind: 'entity' as const, entity: e, degree: 0, x: 0, y: 0, z: 0 })),
      ...skillIds.map(id => ({ id, label: SKILLS[id.replace('skill-', '')], kind: 'skill' as const, degree: 0, x: 0, y: 0, z: 0 })),
    ];
    const byId: Record<string, GNode> = {};
    nodes.forEach(n => { byId[n.id] = n; });
    skillEdges.forEach(([a, b]) => { byId[a].degree++; byId[b].degree++; });

    function neighborsOf(id: string) {
      const out: string[] = [];
      [...skillEdges, ...bridgeEdges].forEach(([a, b]) => {
        if (a === id) out.push(b); else if (b === id) out.push(a);
      });
      return out;
    }

    function bakeLens(lensKey: string) {
      const hubs = LENSES[lensKey].hubs;
      const participantIds = ['krish', ...hubs.map(h => h.id), ...entities.map(e => e.id), ...skillIds];
      const edges: { a: string; b: string; kind: string }[] = [];
      hubs.forEach(h => edges.push({ a: 'krish', b: h.id, kind: 'structure' }));
      entities.forEach(ent => {
        const matched = hubs.filter(h => h.match(ent));
        if (matched.length === 0) edges.push({ a: 'krish', b: ent.id, kind: 'fallback' });
        matched.forEach(h => edges.push({ a: h.id, b: ent.id, kind: 'structure' }));
      });
      skillEdges.forEach(([a, b]) => edges.push({ a, b, kind: 'skill' }));
      bridgeEdges.forEach(([a, b]) => edges.push({ a, b, kind: 'bridge' }));

      type P = { x: number; y: number; z: number; vx: number; vy: number; vz: number; type: NodeKind };
      const pos: Record<string, P> = {};
      participantIds.forEach(id => {
        pos[id] = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6, z: (Math.random() - 0.5) * 6, vx: 0, vy: 0, vz: 0, type: byId[id].kind };
      });
      const plist = participantIds.map(id => pos[id]);
      const REPEL_SKILL = 0.35;

      for (let iter = 0; iter < 650; iter++) {
        for (let i = 0; i < plist.length; i++) {
          for (let j = i + 1; j < plist.length; j++) {
            const n1 = plist[i], n2 = plist[j];
            let dx = n1.x - n2.x, dy = n1.y - n2.y, dz = n1.z - n2.z;
            let d2 = dx * dx + dy * dy + dz * dz; if (d2 < 0.01) d2 = 0.01;
            const d = Math.sqrt(d2);
            const mult = ((n1.type === 'skill' ? REPEL_SKILL : 1) + (n2.type === 'skill' ? REPEL_SKILL : 1)) / 2;
            const f = 1.6 * mult / d2;
            const fx = dx / d * f, fy = dy / d * f, fz = dz / d * f;
            n1.vx += fx; n1.vy += fy; n1.vz += fz;
            n2.vx -= fx; n2.vy -= fy; n2.vz -= fz;
          }
        }
        edges.forEach(e => {
          const a = pos[e.a], b = pos[e.b];
          if (!a || !b) return;
          const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
          const rest = REST[e.kind] ?? 3, k = K[e.kind] ?? 0.08;
          const f = (d - rest) * k;
          const fx = dx / d * f, fy = dy / d * f, fz = dz / d * f;
          a.vx += fx; a.vy += fy; a.vz += fz;
          b.vx -= fx; b.vy -= fy; b.vz -= fz;
        });
        participantIds.forEach(id => {
          const n = pos[id];
          if (id === 'krish') { n.x = 0; n.y = 0; n.z = 0; n.vx = 0; n.vy = 0; n.vz = 0; return; }
          const d = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z) || 0.01;
          n.vx -= n.x / d * 0.02; n.vy -= n.y / d * 0.02; n.vz -= n.z / d * 0.02;
          const target = n.type === 'hub' ? 5.5 : n.type === 'skill' ? (9 - 4 * Math.min(byId[id].degree, 8) / 8) : 8.5;
          const shellF = (target - d) * 0.045;
          n.vx += n.x / d * shellF; n.vy += n.y / d * shellF; n.vz += n.z / d * shellF;
          n.vx *= 0.86; n.vy *= 0.86; n.vz *= 0.86;
          n.x += n.vx; n.y += n.vy; n.z += n.vz;
        });
      }
      const out: Record<string, { x: number; y: number; z: number }> = {};
      participantIds.forEach(id => { out[id] = { x: pos[id].x, y: pos[id].y, z: pos[id].z }; });
      return out;
    }

    const lensPositions: Record<string, Record<string, { x: number; y: number; z: number }>> = {
      type: bakeLens('type'), domain: bakeLens('domain'), industry: bakeLens('industry'),
    };
    nodes.forEach(n => {
      if (n.kind === 'hub') {
        const p = lensPositions[n.lens!][n.id];
        n.x = p.x; n.y = p.y; n.z = p.z;
      } else {
        n.byLens = { type: lensPositions.type[n.id], domain: lensPositions.domain[n.id], industry: lensPositions.industry[n.id] };
        n.x = n.byLens.type.x; n.y = n.byLens.type.y; n.z = n.byLens.type.z;
      }
    });

    // ---------- render / interaction state ----------
    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const r = stage.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const AMBIENT_YAW = 0.0018;
    let yaw = 0.4, pitch = -0.15, zoom = 1, zoomTarget = 1;
    let yawVel = AMBIENT_YAW, pitchVel = 0;
    let dragging = false, lastX = 0, lastY = 0, dragDist = 0;
    let pinchStartDist: number | null = null, pinchStartZoom = 1;
    const focusOffset = { x: 0, y: 0, z: 0 }, focusTarget = { x: 0, y: 0, z: 0 };
    let localLens = 'type';
    let transition: { from: string; to: string; start: number } | null = null;
    let localSelected = 'krish';
    let hoveredId: string | null = null;
    let localTourActive = true, tourExtreme = true;
    let filterMatchIds: string[] = [];
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function selectNode(id: string) {
      localSelected = id;
      filterMatchIds = [];
      setFilterInfo(null);
      setSelectedId(id);
      if (id === 'krish') {
        setShowBack(false);
        focusTarget.x = 0; focusTarget.y = 0; focusTarget.z = 0;
        zoomTarget = tourExtreme ? 1.9 : 1;
        return;
      }
      const n = byId[id];
      focusTarget.x = n.x; focusTarget.y = n.y; focusTarget.z = n.z;
      zoomTarget = n.kind === 'hub' ? 1.35 : 1.15;
      setShowBack(true);
    }
    function switchLens(key: string) {
      if (key === localLens && !transition) return;
      transition = { from: localLens, to: key, start: performance.now() };
      localLens = key;
      setCurrentLensState(key);
    }
    // Recruiter-narrowing: pick an industry hub + a skillset hub, highlight
    // whichever entities satisfy BOTH, and frame the camera on their centroid.
    function applyFilter(industryHubId: string, domainHubId: string) {
      const indHub = hubIndex[industryHubId], domHub = hubIndex[domainHubId];
      let matches = entities.filter(e => indHub.match(e) && domHub.match(e));
      if (matches.length === 0) matches = entities.filter(e => indHub.match(e));
      localSelected = '__filter__';
      filterMatchIds = matches.map(e => e.id);
      setSelectedId('__filter__');
      setFilterInfo({
        industryLabel: LENSES.industry.hubs.find(h => h.id === industryHubId)!.label,
        domainLabel: LENSES.domain.hubs.find(h => h.id === domainHubId)!.label,
        matchIds: filterMatchIds,
      });
      if (matches.length) {
        const cx = matches.reduce((s, e) => s + byId[e.id].x, 0) / matches.length;
        const cy = matches.reduce((s, e) => s + byId[e.id].y, 0) / matches.length;
        const cz = matches.reduce((s, e) => s + byId[e.id].z, 0) / matches.length;
        focusTarget.x = cx; focusTarget.y = cy; focusTarget.z = cz;
      }
      zoomTarget = 1.25;
      setShowBack(true);
    }
    apiRef.current = { selectNode, switchLens };
    backBtn.onclick = () => selectNode('krish');

    function project() {
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const f = 480;
      return nodes.map(n => {
        const x = n.x - focusOffset.x, y = n.y - focusOffset.y, z = n.z - focusOffset.z;
        const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
        const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
        const scale = (f / (f + z2 * 70)) * zoom;
        return { n, sx: W / 2 + x1 * 70 * scale, sy: H / 2 + y1 * 70 * scale, sz: z2, scale };
      });
    }
    function hitTest(clientX: number, clientY: number) {
      const r = stage.getBoundingClientRect();
      const mx = clientX - r.left, my = clientY - r.top;
      const pts = project().sort((a, b) => a.sz - b.sz);
      let best: GNode | null = null, bestD = 1e9;
      pts.forEach(p => {
        if (p.n.kind === 'hub' && p.n.lens !== localLens && !(transition && (p.n.lens === transition.from || p.n.lens === transition.to))) return;
        const baseR = p.n.kind === 'center' ? 16 : p.n.kind === 'hub' ? 11 : p.n.kind === 'skill' ? (4 + Math.min(p.n.degree, 10) * 0.6) : 7;
        const rad = baseR * p.scale + 7;
        const d = Math.hypot(p.sx - mx, p.sy - my);
        if (d < rad && d < bestD) { bestD = d; best = p.n; }
      });
      return best;
    }
    function endDrag(clientX: number, clientY: number) {
      dragging = false;
      if (dragDist < 10 && !localTourActive) {
        const hit = hitTest(clientX, clientY);
        selectNode(hit ? (hit as GNode).id : 'krish');
      }
    }

    canvas.addEventListener('mousedown', e => { dragging = true; dragDist = 0; lastX = e.clientX; lastY = e.clientY; });
    const onMouseUp = (e: MouseEvent) => { if (dragging) endDrag(e.clientX, e.clientY); };
    window.addEventListener('mouseup', onMouseUp);
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        dragDist += Math.abs(dx) + Math.abs(dy);
        const dyaw = dx * 0.006, dpitch = dy * 0.006;
        yaw += dyaw; pitch = Math.max(-1.3, Math.min(1.3, pitch + dpitch));
        yawVel = dyaw; pitchVel = dpitch;
        lastX = e.clientX; lastY = e.clientY;
      } else {
        const r = stage.getBoundingClientRect();
        const hit = hitTest(e.clientX, e.clientY);
        if (hit) {
          hoveredId = (hit as GNode).id;
          tooltip.textContent = (hit as GNode).label;
          tooltip.style.left = (e.clientX - r.left) + 'px'; tooltip.style.top = (e.clientY - r.top) + 'px';
          tooltip.classList.add('on'); canvas.style.cursor = 'pointer';
        } else { hoveredId = null; tooltip.classList.remove('on'); canvas.style.cursor = 'grab'; }
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom = Math.max(0.14, Math.min(2.6, zoom * (e.deltaY > 0 ? 0.92 : 1.08)));
      zoomTarget = zoom;
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });

    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) { dragging = true; dragDist = 0; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }
      else if (e.touches.length === 2) {
        dragging = false;
        pinchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        pinchStartZoom = zoom;
      }
    }, { passive: true });
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && dragging) {
        const dx = e.touches[0].clientX - lastX, dy = e.touches[0].clientY - lastY;
        dragDist += Math.abs(dx) + Math.abs(dy);
        const dyaw = dx * 0.007, dpitch = dy * 0.007;
        yaw += dyaw; pitch = Math.max(-1.3, Math.min(1.3, pitch + dpitch));
        yawVel = dyaw; pitchVel = dpitch;
        lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && pinchStartDist) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        zoom = Math.max(0.14, Math.min(2.6, pinchStartZoom * (d / pinchStartDist)));
        zoomTarget = zoom;
      }
    };
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    const onTouchEnd = (e: TouchEvent) => {
      if (dragging && e.changedTouches.length) endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      dragging = false; pinchStartDist = null;
    };
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    let raf = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (!dragging && !reduceMotion) {
        yawVel = lerp(yawVel, AMBIENT_YAW, 0.015);
        pitchVel = lerp(pitchVel, 0, 0.03);
        yaw += yawVel;
        pitch = Math.max(-1.3, Math.min(1.3, pitch + pitchVel));
      }
      focusOffset.x = lerp(focusOffset.x, focusTarget.x, 0.06);
      focusOffset.y = lerp(focusOffset.y, focusTarget.y, 0.06);
      focusOffset.z = lerp(focusOffset.z, focusTarget.z, 0.06);
      zoom = lerp(zoom, zoomTarget, 0.05);

      let blend = 1, fromLens = localLens, toLens = localLens;
      if (transition) {
        const t = (performance.now() - transition.start) / 650;
        if (t >= 1) transition = null; else { blend = ease(t); fromLens = transition.from; toLens = transition.to; }
      }
      nodes.forEach(n => {
        if (n.kind === 'hub' || !n.byLens) return;
        const a = n.byLens[fromLens], b = n.byLens[toLens];
        n.x = lerp(a.x, b.x, blend); n.y = lerp(a.y, b.y, blend); n.z = lerp(a.z, b.z, blend);
      });

      const pts = project();
      const byNodeId: Record<string, ReturnType<typeof project>[number]> = {};
      pts.forEach(p => { byNodeId[p.n.id] = p; });
      pts.sort((a, b) => a.sz - b.sz);

      let mode = 'default';
      let brightSet: Record<string, boolean> = { krish: true };
      let mediumSet: Record<string, boolean> = {};
      LENSES[localLens].hubs.forEach(h => { brightSet[h.id] = true; });
      if (localSelected === '__filter__') {
        mode = 'filter';
        brightSet = { krish: true };
        filterMatchIds.forEach(id => {
          brightSet[id] = true;
          skillEdges.forEach(([a, b]) => { if (b === id) brightSet[a] = true; });
        });
        LENSES[localLens].hubs.forEach(h => { mediumSet[h.id] = true; });
      } else if (localSelected && localSelected !== 'krish') {
        const sel = byId[localSelected];
        if (sel.kind === 'hub') {
          mode = 'hub';
          brightSet = { krish: true, [localSelected]: true };
          entitiesOfHub(localSelected).forEach(e => {
            brightSet[e.id] = true;
            skillEdges.forEach(([a, b]) => { if (b === e.id) brightSet[a] = true; });
          });
          LENSES[localLens].hubs.forEach(h => { if (h.id !== localSelected) mediumSet[h.id] = true; });
        } else {
          mode = 'entity';
          brightSet = { [localSelected]: true };
          neighborsOf(localSelected).forEach(id => { brightSet[id] = true; });
          LENSES[localLens].hubs.forEach(h => { mediumSet[h.id] = true; });
        }
      }
      if (tourExtreme) { brightSet = { krish: true }; mediumSet = {}; mode = 'intro'; }
      function alphaFor(id: string) {
        if (brightSet[id]) return 1;
        if (mediumSet[id]) return 0.45;
        if (mode === 'default') return byId[id].kind === 'skill' ? 0.03 : 0.16;
        return mode === 'intro' ? 0.025 : 0.08;
      }

      ctx.lineWidth = 1;
      [...skillEdges, ...bridgeEdges].forEach(([a, b], idx) => {
        const kind = idx < skillEdges.length ? 'skill' : 'bridge';
        const pa = byNodeId[a], pb = byNodeId[b];
        if (!pa || !pb) return;
        const bright = brightSet[a] && brightSet[b];
        const col = kind === 'bridge' ? '251,191,36' : '167,139,250';
        let alpha = kind === 'bridge' ? 0.5 : 0.3;
        if (!bright) alpha *= 0.1;
        ctx.strokeStyle = `rgba(${col},${alpha})`;
        ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
      });
      nodes.forEach(n => {
        if (n.kind !== 'hub') return;
        const lensAlpha = n.lens === toLens ? blend : (n.lens === fromLens ? (1 - blend) : 0);
        if (lensAlpha <= 0.02) return;
        const p = byNodeId[n.id];
        entitiesOfHub(n.id).forEach(ent => {
          const b = byNodeId[ent.id]; if (!b) return;
          const bright = brightSet[n.id] && brightSet[ent.id];
          ctx.strokeStyle = `rgba(255,255,255,${(bright ? 0.28 : 0.08) * lensAlpha})`;
          ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
        });
        const k = byNodeId['krish'];
        ctx.strokeStyle = `rgba(255,255,255,${0.14 * lensAlpha})`;
        ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(k.sx, k.sy); ctx.stroke();
      });

      const labelCandidates: { x: number; y: number; text: string; bold: boolean; alpha: number; priority: number }[] = [];
      pts.forEach(p => {
        const n = p.n;
        const lensAlpha = n.kind === 'hub' ? (n.lens === toLens ? blend : (n.lens === fromLens ? (1 - blend) : 0)) : 1;
        if (lensAlpha <= 0.02) return;
        const vis = alphaFor(n.id);
        const col = n.kind === 'center' ? '#fbbf24' : n.kind === 'hub' ? n.color! : n.kind === 'skill' ? '#a78bfa' : '#60a5fa';
        const baseR = n.kind === 'center' ? 16 : n.kind === 'hub' ? 11 : n.kind === 'skill' ? (4 + Math.min(n.degree, 10) * 0.6) : 7;
        const r = baseR * p.scale;
        const alpha = vis * lensAlpha;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = col; ctx.shadowBlur = (n.kind === 'center' ? 26 : 14) * Math.max(p.scale, 0.5) * Math.max(vis, 0.5);
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(r, 2), 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // hub nodes get a slow breathing ring — a visual "this is clickable" cue
        if (n.kind === 'hub' && vis >= 1 && !reduceMotion) {
          const pulse = (Math.sin(performance.now() / 900 + p.sx * 0.01) + 1) / 2;
          ctx.save();
          ctx.globalAlpha = (0.25 + pulse * 0.35) * lensAlpha;
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(r, 2) + 5 + pulse * 4, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        const showLabel = n.kind === 'center' || n.kind === 'hub' || vis >= 1 || hoveredId === n.id || (zoom > 1.15 && p.scale > 0.9 && vis > 0.3);
        if (showLabel && vis > 0.3 && lensAlpha > 0.5) {
          const priority = n.kind === 'center' ? 0 : n.kind === 'hub' ? 1 : (vis >= 1 ? 2 : hoveredId === n.id ? 2.5 : 4);
          labelCandidates.push({ x: p.sx, y: p.sy + r + 13, text: n.label, bold: n.kind === 'center', alpha: Math.min(vis, 0.85) * lensAlpha, priority });
        }
      });
      labelCandidates.sort((a, b) => a.priority - b.priority);
      const placedRects: { x1: number; x2: number; y1: number; y2: number }[] = [];
      labelCandidates.forEach(l => {
        ctx.font = (l.bold ? '500 13px' : '400 11px') + ' -apple-system,sans-serif';
        const w = ctx.measureText(l.text).width;
        const rect = { x1: l.x - w / 2 - 4, x2: l.x + w / 2 + 4, y1: l.y - 9, y2: l.y + 5 };
        if (placedRects.some(o => rect.x1 < o.x2 && rect.x2 > o.x1 && rect.y1 < o.y2 && rect.y2 > o.y1)) return;
        placedRects.push(rect);
        ctx.fillStyle = `rgba(${l.bold ? '255,248,230' : '255,255,255'},${l.alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(l.text, l.x, l.y);
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    // ---------- guided tour: recruiter-narrowing ----------
    // Mirrors how a recruiter actually reads this — "what role, what skillset" —
    // then highlights only what genuinely satisfies both, instead of a fixed walkthrough.
    let pendingIndustryPick: string | null = null;
    let pendingDomainPick: string | null = null;
    const TOUR = [
      { enter: () => { tourExtreme = true; switchLens('type'); selectNode('krish'); } },
      { enter: () => { tourExtreme = false; switchLens('industry'); selectNode('krish'); } },
      { enter: () => { switchLens('domain'); selectNode('krish'); } },
      { enter: () => { if (pendingIndustryPick && pendingDomainPick) applyFilter(pendingIndustryPick, pendingDomainPick); } },
    ];
    function goToStep(idx: number, pick?: string) {
      if (pick) {
        if (pick.startsWith('hub-i-')) pendingIndustryPick = pick;
        else if (pick.startsWith('hub-d-')) pendingDomainPick = pick;
      }
      if (idx < 0) { endTour(); return; }
      setTourStepIdx(idx);
      TOUR[idx].enter();
    }
    function endTour() {
      localTourActive = false; tourExtreme = false;
      setTourActive(false);
      railEl.style.display = '';
      backBtn.style.display = '';
      selectNode('krish');
    }
    (window as unknown as { __kgTour?: { goToStep: typeof goToStep; endTour: typeof endTour } }).__kgTour = { goToStep, endTour };
    railEl.style.display = 'none';
    backBtn.style.display = 'none';
    TOUR[0].enter();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type TourButton = { label: string; next: number; ghost?: boolean; pick?: string };
  const TOUR_TEXT: { text: string; buttons: TourButton[] }[] = [
    { text: 'Hi — looking to fill a specific kind of role? I can narrow this down to what’s actually relevant, instead of showing you everything.', buttons: [{ label: 'Narrow it down for me', next: 1 }, { label: 'Let me browse everything', next: -1, ghost: true }] },
    { text: 'What kind of role are you looking to fill?', buttons: [
      { label: 'Aerospace & Robotics', next: 2, pick: 'hub-i-aero' },
      { label: 'Enterprise AI', next: 2, pick: 'hub-i-entai' },
      { label: 'Finance & Logistics', next: 2, pick: 'hub-i-finlog' },
      { label: 'Nonprofit & EdTech', next: 2, pick: 'hub-i-nonprofit' },
      { label: 'Consumer Apps', next: 2, pick: 'hub-i-consumer' },
    ] },
    { text: 'And what skillset matters most for that role?', buttons: [
      { label: 'Hardware', next: 3, pick: 'hub-d-hardware' },
      { label: 'Software', next: 3, pick: 'hub-d-software' },
      { label: 'AI / ML', next: 3, pick: 'hub-d-aiml' },
      { label: 'Business', next: 3, pick: 'hub-d-business' },
    ] },
    { text: 'Here’s what actually lines up with that.', buttons: [{ label: 'Explore freely →', next: -1 }] },
  ];

  const ETYPE_LABELS: Record<string, string> = { experience: 'Experience', project: 'Project', leadership: 'Leadership', education: 'Education', early: 'Earlier Chapter' };
  const usedSkillsFor = (entId: string) => skillMap[entId] || [];
  const entitiesUsingSkill = (skillKey: string) => Object.entries(skillMap).filter(([, ks]) => ks.includes(skillKey)).map(([id]) => entities.find(e => e.id === id)!).filter(Boolean);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 h-[92vh] max-h-[860px] md:h-[720px] md:max-h-[88vh]" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0d0d13, #08080b 70%)' }}>
      <div className="flex h-full flex-col md:flex-row">
        <div ref={stageRef} className="relative flex-1 min-w-0 basis-[62%] md:basis-[56%]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" style={{ cursor: 'grab' }} />

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between gap-3 p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className="text-sm font-medium">Krish Singh</div>
              <div className="text-xs text-white/50 mt-0.5">Interactive knowledge graph</div>
              <Link href="/#portfolio" className="text-xs text-accent/80 hover:text-accent mt-1 inline-block">
                Prefer the classic view? ↗
              </Link>
            </div>
            <div className="text-right text-xs text-white/40 leading-relaxed pointer-events-auto hidden sm:block">
              Drag to rotate — release to keep spinning<br />Select a category to open its constellation
            </div>
          </div>

          <button
            ref={backBtnRef}
            className={`absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full border px-3.5 py-1.5 text-xs backdrop-blur transition-all ${showBack ? 'opacity-100' : 'opacity-0 pointer-events-none -translate-y-1.5'}`}
            style={{ background: 'rgba(18,18,24,0.74)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            ← Back to overview
          </button>

          <div ref={railRef} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-start gap-1.5">
            <div className="text-[10px] uppercase tracking-wider text-white/35 pl-1">Group by</div>
            <div className="flex flex-col gap-1.5 rounded-full border p-2 backdrop-blur group" style={{ background: 'rgba(18,18,24,0.74)', borderColor: 'rgba(255,255,255,0.1)' }}>
              {[{ k: 'type', c: '#4f7fff', l: 'Type' }, { k: 'domain', c: '#a78bfa', l: 'Skillset' }, { k: 'industry', c: '#34d399', l: 'Industry' }].map(b => (
                <button
                  key={b.k}
                  onClick={() => apiRef.current?.switchLens(b.k)}
                  className={`h-7 rounded-full flex items-center px-1.5 text-xs font-medium overflow-hidden whitespace-nowrap transition-all w-7 group-hover:w-[118px] ${currentLens === b.k ? 'bg-white/10 text-white' : 'text-white/50'}`}
                >
                  <span className="w-2 h-2 rounded-full flex-none" style={{ background: b.c }} />
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">{b.l}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="absolute left-16 bottom-4 hidden sm:flex flex-wrap gap-x-3 gap-y-1.5 max-w-[260px] text-[10px] text-white/50 rounded-lg border p-2.5 backdrop-blur" style={{ background: 'rgba(18,18,24,0.74)', borderColor: 'rgba(255,255,255,0.1)' }}>
            {[['#fbbf24', 'Krish Singh'], ['#4f7fff', 'Category'], ['#a78bfa', 'Skill or tool'], ['#8fd3ff', 'Entry']].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />{l}</span>
            ))}
          </div>

          <div ref={tooltipRef} className="kg-tooltip absolute pointer-events-none text-xs rounded px-2 py-1 border opacity-0 whitespace-nowrap" style={{ background: 'rgba(10,10,14,0.9)', borderColor: 'rgba(255,255,255,0.2)', transform: 'translate(-50%,-140%)' }} />

          {tourActive && (
            <>
              <button
                onClick={() => (window as unknown as { __kgTour: { endTour: () => void } }).__kgTour.endTour()}
                className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[11px] text-white/40 hover:text-white/60"
              >
                Skip tour ✕
              </button>
              <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[min(480px,88%)] rounded-2xl border p-5 text-center backdrop-blur" style={{ background: 'rgba(18,18,24,0.74)', borderColor: 'rgba(255,255,255,0.2)' }}>
                <p className="text-sm mb-3.5">{TOUR_TEXT[tourStepIdx].text}</p>
                <div className="flex gap-2.5 justify-center flex-wrap">
                  {TOUR_TEXT[tourStepIdx].buttons.map(b => (
                    <button
                      key={b.label}
                      onClick={() => (window as unknown as { __kgTour: { goToStep: (i: number, p?: string) => void } }).__kgTour.goToStep(b.next, b.pick)}
                      className={b.ghost ? 'text-xs font-medium rounded-full border px-4 py-2 text-white/60 border-white/20 hover:text-white' : 'text-xs font-medium rounded-full px-4 py-2 bg-gray-200 text-black hover:bg-white'}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ---- docked detail card ---- */}
        <div className="flex-1 md:max-w-[520px] border-t md:border-t-0 md:border-l overflow-y-auto p-6 md:p-9 basis-[38%] md:basis-[44%]" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.015)' }}>
          {filterInfo && selectedId === '__filter__' && (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2.5">What fits</div>
              <h3 className="text-3xl font-semibold mb-3.5" style={{ textShadow: '0 0 16px rgba(96,165,250,0.4)' }}>
                {filterInfo.industryLabel} <span className="text-white/30">+</span> {filterInfo.domainLabel}
              </h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-4">
                {filterInfo.matchIds.length} entr{filterInfo.matchIds.length === 1 ? 'y' : 'ies'} match both. Select one to open it.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {filterInfo.matchIds.map(id => {
                  const e = entities.find(x => x.id === id);
                  return e ? (
                    <button key={id} onClick={() => apiRef.current?.selectNode(id)} className="text-xs rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(96,165,250,0.5)', color: '#bfdbfe', background: 'rgba(96,165,250,0.1)' }}>
                      {e.label}
                    </button>
                  ) : null;
                })}
              </div>
              <button onClick={() => apiRef.current?.selectNode('krish')} className="text-xs text-white/40 hover:text-white/60">← Start over</button>
            </div>
          )}

          {selectedId === 'krish' && (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2.5">Krish Singh</div>
              <h3 className="text-3xl font-semibold mb-3.5" style={{ textShadow: '0 0 16px rgba(251,191,36,0.4)' }}>Krish Singh</h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-5">
                B.S. Computer Engineering @ Texas A&amp;M (&rsquo;25-&rsquo;29). Building across hardware, AI agents and fintech — from Boeing&rsquo;s quality systems to Velostics&rsquo; logistics agents to his own ventures.
              </p>
              <div className="flex flex-wrap gap-2">
                <a className="text-xs rounded-full border px-3.5 py-1.5 bg-white/5 border-white/10 hover:bg-white/10" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="text-xs rounded-full border px-3.5 py-1.5 bg-white/5 border-white/10 hover:bg-white/10" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="text-xs rounded-full border px-3.5 py-1.5 bg-white/5 border-white/10 hover:bg-white/10" href="/#contact">Contact</a>
              </div>
            </div>
          )}

          {isHub && (() => {
            const hub = Object.values(LENSES).flatMap(l => l.hubs).find(h => h.id === selectedId);
            if (!hub) return null;
            const members = entities.filter(e => hub.match(e));
            return (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2.5">Category</div>
                <h3 className="text-3xl font-semibold mb-3.5" style={{ textShadow: `0 0 16px ${hub.color}66` }}>{hub.label}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed mb-4">{members.length} entr{members.length === 1 ? 'y' : 'ies'} grouped here. Select one to open it.</p>
                <div className="flex flex-wrap gap-2">
                  {members.map(m => (
                    <button key={m.id} onClick={() => apiRef.current?.selectNode(m.id)} className="text-xs rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(96,165,250,0.5)', color: '#bfdbfe', background: 'rgba(96,165,250,0.1)' }}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {isSkill && (() => {
            const key = skillKeyOf(selectedId);
            const usedIn = entitiesUsingSkill(key);
            return (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2.5">Skill</div>
                <h3 className="text-3xl font-semibold mb-3.5" style={{ textShadow: '0 0 16px rgba(167,139,250,0.4)' }}>{SKILLS[key]}</h3>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Used across {usedIn.length} entr{usedIn.length === 1 ? 'y' : 'ies'}</p>
                <div className="flex flex-wrap gap-2">
                  {usedIn.map(e => (
                    <button key={e.id} onClick={() => apiRef.current?.selectNode(e.id)} className="text-xs rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(96,165,250,0.5)', color: '#bfdbfe', background: 'rgba(96,165,250,0.1)' }}>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {selectedEntity && (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2.5">{ETYPE_LABELS[selectedEntity.etype]}</div>
              <h3 className="text-3xl font-semibold mb-3.5" style={{ textShadow: '0 0 16px rgba(96,165,250,0.4)' }}>{selectedEntity.label}</h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-5">{selectedEntity.desc}</p>

              {usedSkillsFor(selectedEntity.id).length > 0 && (
                <>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Skills used</div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {usedSkillsFor(selectedEntity.id).map(k => (
                      <span key={k} className="text-xs rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(167,139,250,0.5)', color: '#c4b5fd', background: 'rgba(167,139,250,0.1)' }}>{SKILLS[k]}</span>
                    ))}
                  </div>
                </>
              )}

              {bridgeEdges.filter(([a, b]) => a === selectedEntity.id || b === selectedEntity.id).length > 0 && (
                <>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Related</div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {bridgeEdges.filter(([a, b]) => a === selectedEntity.id || b === selectedEntity.id).map(([a, b]) => {
                      const other = entities.find(e => e.id === (a === selectedEntity.id ? b : a));
                      return other ? <button key={other.id} onClick={() => apiRef.current?.selectNode(other.id)} className="text-xs rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(251,191,36,0.5)', color: '#fde68a', background: 'rgba(251,191,36,0.1)' }}>{other.label}</button> : null;
                    })}
                  </div>
                </>
              )}

              {selectedEntity.links && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedEntity.links.map(l => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs rounded-full border px-3.5 py-1.5 bg-white/5 border-white/10 hover:bg-white/10">{l.label}</a>
                  ))}
                </div>
              )}

              {selectedEntity.video ? (
                <video src={selectedEntity.video} className="w-full rounded-2xl mt-auto" style={{ aspectRatio: '16/10' }} muted loop autoPlay playsInline preload="metadata" />
              ) : selectedEntity.image ? (
                <div className="relative w-full rounded-2xl overflow-hidden mt-auto" style={{ aspectRatio: '16/10' }}>
                  <Image src={selectedEntity.image} alt={selectedEntity.label} fill className="object-cover" />
                </div>
              ) : null}
              {selectedEntity.imageNote && <p className="text-[11px] text-white/30 mt-2">{selectedEntity.imageNote}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
