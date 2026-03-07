import * as THREE from 'three';
import type { MarkerDef } from './config';

export type MarkerRuntime = {
  page: string;
  label: string;
  pos: THREE.Vector3;
  color: number;
  group: THREE.Group;
  beam: THREE.Mesh;
  chevron: THREE.Mesh;
  groundDisc: THREE.Mesh;
  glow: THREE.PointLight;
  baseY: number;
};

export const createMarkerPrompt = () => {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    || ('ontouchstart' in window && window.innerWidth < 1024);

  const markerPrompt = document.createElement('div');
  markerPrompt.id = 'marker-prompt';

  const mobileStyles = `
      position: fixed;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 45;
      padding: 14px 30px;
      border-radius: 16px;
      background: rgba(0,0,0,0.82);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.22);
      color: #fff;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 15px;
      letter-spacing: 0.4px;
      text-align: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      white-space: nowrap;
      max-width: 85vw;
  `;

  const desktopStyles = `
      position: fixed;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 45;
      padding: 12px 28px;
      border-radius: 14px;
      background: rgba(0,0,0,0.72);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.18);
      color: #fff;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 15px;
      letter-spacing: 0.4px;
      text-align: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      white-space: nowrap;
  `;

  markerPrompt.style.cssText = isMobile ? mobileStyles : desktopStyles;
  document.body.appendChild(markerPrompt);
  return markerPrompt;
};

export const setMarkerPromptState = (
  markerPrompt: HTMLDivElement,
  marker: MarkerRuntime | null,
  canActivate: boolean,
) => {
  if (!marker) {
    markerPrompt.style.opacity = '0';
    markerPrompt.style.pointerEvents = 'none';
    return;
  }

  markerPrompt.style.color = '#' + new THREE.Color(marker.color).getHexString();
  markerPrompt.textContent = canActivate
    ? `${marker.label} — Press E or tap here`
    : `${marker.label} — get closer to interact`;
  markerPrompt.style.opacity = '1';
  markerPrompt.style.pointerEvents = canActivate ? 'auto' : 'none';
};

export const createSceneMarkers = (
  scene: THREE.Scene,
  defs: MarkerDef[],
) => {
  const markers: MarkerRuntime[] = [];

  // GTA-style marker geometries
  const beamGeo = new THREE.CylinderGeometry(0.7, 0.7, 8, 24, 1, true); // open-ended tall cylinder
  const chevronGeo = new THREE.ConeGeometry(0.6, 0.9, 4);               // 4-sided = diamond arrow look
  const groundDiscGeo = new THREE.RingGeometry(0.6, 1.4, 48);           // hollow ring on ground

  for (const def of defs) {
    const col = new THREE.Color(def.color);
    const group = new THREE.Group();
    group.position.set(def.pos[0], def.pos[1], def.pos[2]);

    // ── Tall translucent beam (open cylinder) ──
    const beamMat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 4.0; // centered at y=4 so it spans 0–8
    group.add(beam);

    // ── Rotating chevron/arrow pointing down at the top ──
    const chevronMat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.85,
    });
    const chevron = new THREE.Mesh(chevronGeo, chevronMat);
    chevron.rotation.x = Math.PI; // point downwards
    chevron.position.y = 8.5;
    group.add(chevron);

    // ── Ground ring disc ──
    const groundDiscMat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const groundDisc = new THREE.Mesh(groundDiscGeo, groundDiscMat);
    groundDisc.rotation.x = -Math.PI / 2;
    groundDisc.position.y = 0.06;
    group.add(groundDisc);

    // ── Soft point light at mid-height ──
    const glow = new THREE.PointLight(def.color, 1.8, 12);
    glow.position.y = 3.5;
    group.add(glow);

    scene.add(group);

    markers.push({
      page: def.page,
      label: def.label,
      pos: new THREE.Vector3(def.pos[0], def.pos[1], def.pos[2]),
      color: def.color,
      group,
      beam,
      chevron,
      groundDisc,
      glow,
      baseY: def.pos[1],
    });
  }

  return { markers, beamGeo, chevronGeo, groundDiscGeo };
};
