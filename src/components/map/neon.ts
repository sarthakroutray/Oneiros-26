import * as THREE from 'three';

export function createNeonGridMaterial() {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0.55 },
    },

    vertexShader: /* glsl */`
      precision highp float;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,

    fragmentShader: /* glsl */`
      precision highp float;

      uniform float uTime;
      uniform float uGlow;

      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 2; i++) {
          value += amplitude * vnoise(p);
          p = p * 2.1 + vec2(1.7, 9.2);
          amplitude *= 0.5;
        }
        return value;
      }

      vec3 cosmic(float t) {
        t = fract(t);
        vec3 c0 = vec3(0.05, 0.45, 1.00);
        vec3 c1 = vec3(0.00, 0.95, 0.95);
        vec3 c2 = vec3(0.55, 0.10, 1.00);
        vec3 c3 = vec3(1.00, 0.05, 0.70);
        vec3 c4 = vec3(1.00, 0.45, 0.30);

        float scaled = t * 5.0;
        float blend = fract(scaled);
        float index = floor(scaled);
        blend = blend * blend * (3.0 - 2.0 * blend);

        if (index < 0.5) return mix(c0, c1, blend);
        if (index < 1.5) return mix(c1, c2, blend);
        if (index < 2.5) return mix(c2, c3, blend);
        if (index < 3.5) return mix(c3, c4, blend);
        return mix(c4, c0, blend);
      }

      vec3 veinMasks(vec2 uv, vec2 flow) {
        vec2 p = uv * 24.0;
        vec2 q = vec2(fbm(p + flow), fbm(p + vec2(3.1, 5.7) + flow * 0.9));
        float f = fbm(p + 2.2 * q + flow * 0.2);

        float soft = smoothstep(0.40, 0.60, f);
        float inner = smoothstep(0.46, 0.60, f);
        float core = smoothstep(0.52, 0.62, f);
        return vec3(soft, inner, core);
      }

      float sparkle(vec2 uv, float time) {
        float brightness = 0.0;
        vec2 scaledUv = uv * 22.0;
        vec2 cell = floor(scaledUv);
        vec2 fractUv = fract(scaledUv);

        for (int dx = 0; dx <= 1; dx++) {
          for (int dy = 0; dy <= 1; dy++) {
            vec2 neighbor = cell + vec2(float(dx), float(dy));
            float random = hash(neighbor + 99.3);
            if (random < 0.82) {
              continue;
            }

            vec2 jitter = vec2(hash(neighbor + 5.1), hash(neighbor + 2.9));
            vec2 delta = fractUv - vec2(float(dx), float(dy)) - jitter;

            float phase = random * 6.2831;
            float twinkle = pow(max(0.0, sin(time * (0.8 + random * 1.8) + phase)), 6.0);
            float dist = length(delta);
            float cross = max(
              smoothstep(0.12, 0.0, abs(delta.x)) * smoothstep(0.12, 0.0, dist),
              smoothstep(0.12, 0.0, abs(delta.y)) * smoothstep(0.12, 0.0, dist)
            );
            float streak =
              smoothstep(0.006, 0.0, abs(delta.x)) * smoothstep(0.18, 0.0, abs(delta.y)) +
              smoothstep(0.006, 0.0, abs(delta.y)) * smoothstep(0.18, 0.0, abs(delta.x));

            brightness += (cross * 0.7 + streak * 0.5) * twinkle;
          }
        }

        return clamp(brightness, 0.0, 1.0);
      }

      float floorStars(vec2 uv, float time) {
        float brightness = 0.0;
        vec2 scaledUv = uv * 52.0;
        vec2 cell = floor(scaledUv);
        vec2 fractUv = fract(scaledUv);

        for (int dx = 0; dx <= 1; dx++) {
          for (int dy = 0; dy <= 1; dy++) {
            vec2 neighbor = cell + vec2(float(dx), float(dy));
            float random = hash(neighbor + 13.7);
            if (random < 0.76) {
              continue;
            }

            vec2 jitter = vec2(hash(neighbor + 7.3), hash(neighbor + 3.1));
            float dist = length(fractUv - vec2(float(dx), float(dy)) - jitter);

            float twinkle = 0.35 + 0.65 * sin(time * (1.5 + random * 4.0) + random * 6.28);
            if (fract(random * 13.7) > 0.88) {
              twinkle *= 0.5 + 0.5 * sin(time * 14.0 + random * 88.0);
            }

            float size = 0.05 * (0.5 + 0.5 * random);
            brightness += smoothstep(size, 0.0, dist) * twinkle * (0.5 + 0.4 * random);
          }
        }

        return clamp(brightness, 0.0, 1.0);
      }

      void main() {
        vec2 flow = vec2(uTime * 0.018, uTime * 0.011);

        float backgroundNoise = vnoise(vUv * 6.5 + flow * 0.2);
        vec3 color = mix(
          vec3(0.010, 0.008, 0.035),
          vec3(0.008, 0.025, 0.045),
          backgroundNoise * 0.8
        );

        float nebulaTone = fract(backgroundNoise * 1.2 + uTime * 0.02);
        color += cosmic(nebulaTone) * backgroundNoise * 0.055;

        vec3 masks = veinMasks(vUv, flow);
        float veinSoft = masks.x;
        float veinInner = masks.y;
        float veinCore = masks.z;

        float veinTone = fract(vnoise(vUv * 12.0 + flow * 0.3) * 1.8 + uTime * 0.04);
        vec3 veinColor = cosmic(veinTone);

        color += veinColor * veinSoft * uGlow * 0.18;
        color = mix(color, veinColor * 0.72, veinSoft * 0.48);
        color = mix(color, mix(veinColor * 1.05, vec3(0.7, 0.95, 1.0), 0.20), veinInner * 0.44);
        vec3 coreColor = mix(veinColor * 1.2, vec3(0.88, 0.95, 1.0), 0.30);
        color = mix(color, coreColor, veinCore * 0.38);
        color += veinColor * veinCore * uGlow * 0.20;

        float sparkles = sparkle(vUv, uTime);
        float sparkleTone = fract(hash(floor(vUv * 22.0)) + uTime * 0.03);
        vec3 sparkleColor = mix(vec3(1.0), cosmic(sparkleTone), 0.30);
        color += sparkleColor * sparkles * 0.75;

        float starBrightness = floorStars(vUv, uTime);
        float starMask = 1.0 - veinSoft * 0.50;
        vec3 starColor = mix(vec3(0.85, 0.93, 1.0), cosmic(hash(floor(vUv * 52.0)) + 0.2), 0.35);
        color += starColor * starBrightness * starMask * 0.80;

        float vignette = 1.0 - smoothstep(0.25, 0.80, length(vUv - 0.5));
        color *= mix(0.45, 1.0, vignette);

        color = pow(clamp(color, 0.0, 1.0), vec3(0.94));

        gl_FragColor = vec4(color, 1.0);
      }
    `,

    transparent: false,
    depthWrite: true,
  });

  return material;
}
