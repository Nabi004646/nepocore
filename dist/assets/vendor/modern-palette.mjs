const W = typeof window < "u", u = (1 << 16) - 1, _ = u * u, $ = (1 << 9) - 1, C = [
  0,
  20,
  40,
  60,
  80,
  99,
  119,
  139,
  159,
  179,
  199,
  219,
  241,
  264,
  288,
  313,
  340,
  367,
  396,
  427,
  458,
  491,
  526,
  562,
  599,
  637,
  677,
  718,
  761,
  805,
  851,
  898,
  947,
  997,
  1048,
  1101,
  1156,
  1212,
  1270,
  1330,
  1391,
  1453,
  1517,
  1583,
  1651,
  1720,
  1790,
  1863,
  1937,
  2013,
  2090,
  2170,
  2250,
  2333,
  2418,
  2504,
  2592,
  2681,
  2773,
  2866,
  2961,
  3058,
  3157,
  3258,
  3360,
  3464,
  3570,
  3678,
  3788,
  3900,
  4014,
  4129,
  4247,
  4366,
  4488,
  4611,
  4736,
  4864,
  4993,
  5124,
  5257,
  5392,
  5530,
  5669,
  5810,
  5953,
  6099,
  6246,
  6395,
  6547,
  6700,
  6856,
  7014,
  7174,
  7335,
  7500,
  7666,
  7834,
  8004,
  8177,
  8352,
  8528,
  8708,
  8889,
  9072,
  9258,
  9445,
  9635,
  9828,
  10022,
  10219,
  10417,
  10619,
  10822,
  11028,
  11235,
  11446,
  11658,
  11873,
  12090,
  12309,
  12530,
  12754,
  12980,
  13209,
  13440,
  13673,
  13909,
  14146,
  14387,
  14629,
  14874,
  15122,
  15371,
  15623,
  15878,
  16135,
  16394,
  16656,
  16920,
  17187,
  17456,
  17727,
  18001,
  18277,
  18556,
  18837,
  19121,
  19407,
  19696,
  19987,
  20281,
  20577,
  20876,
  21177,
  21481,
  21787,
  22096,
  22407,
  22721,
  23038,
  23357,
  23678,
  24002,
  24329,
  24658,
  24990,
  25325,
  25662,
  26001,
  26344,
  26688,
  27036,
  27386,
  27739,
  28094,
  28452,
  28813,
  29176,
  29542,
  29911,
  30282,
  30656,
  31033,
  31412,
  31794,
  32179,
  32567,
  32957,
  33350,
  33745,
  34143,
  34544,
  34948,
  35355,
  35764,
  36176,
  36591,
  37008,
  37429,
  37852,
  38278,
  38706,
  39138,
  39572,
  40009,
  40449,
  40891,
  41337,
  41785,
  42236,
  42690,
  43147,
  43606,
  44069,
  44534,
  45002,
  45473,
  45947,
  46423,
  46903,
  47385,
  47871,
  48359,
  48850,
  49344,
  49841,
  50341,
  50844,
  51349,
  51858,
  52369,
  52884,
  53401,
  53921,
  54445,
  54971,
  55500,
  56032,
  56567,
  57105,
  57646,
  58190,
  58737,
  59287,
  59840,
  60396,
  60955,
  61517,
  62082,
  62650,
  63221,
  63795,
  64372,
  64952,
  65535
], N = [
  0,
  6,
  13,
  18,
  22,
  25,
  28,
  31,
  34,
  36,
  38,
  40,
  42,
  44,
  46,
  48,
  50,
  51,
  53,
  54,
  56,
  57,
  59,
  60,
  61,
  62,
  64,
  65,
  66,
  67,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  86,
  87,
  88,
  89,
  90,
  91,
  91,
  92,
  93,
  94,
  95,
  95,
  96,
  97,
  98,
  98,
  99,
  100,
  101,
  101,
  102,
  103,
  103,
  104,
  105,
  106,
  106,
  107,
  108,
  108,
  109,
  110,
  110,
  111,
  111,
  112,
  113,
  113,
  114,
  115,
  115,
  116,
  116,
  117,
  118,
  118,
  119,
  119,
  120,
  121,
  121,
  122,
  122,
  123,
  123,
  124,
  125,
  125,
  126,
  126,
  127,
  127,
  128,
  128,
  129,
  129,
  130,
  130,
  131,
  132,
  132,
  133,
  133,
  134,
  134,
  135,
  135,
  136,
  136,
  137,
  137,
  138,
  138,
  139,
  139,
  140,
  140,
  140,
  141,
  141,
  142,
  142,
  143,
  143,
  144,
  144,
  145,
  145,
  146,
  146,
  147,
  147,
  147,
  148,
  148,
  149,
  149,
  150,
  150,
  151,
  151,
  151,
  152,
  152,
  153,
  153,
  154,
  154,
  154,
  155,
  155,
  156,
  156,
  156,
  157,
  157,
  158,
  158,
  159,
  159,
  159,
  160,
  160,
  161,
  161,
  161,
  162,
  162,
  163,
  163,
  163,
  164,
  164,
  165,
  165,
  165,
  166,
  166,
  166,
  167,
  167,
  168,
  168,
  168,
  169,
  169,
  169,
  170,
  170,
  171,
  171,
  171,
  172,
  172,
  172,
  173,
  173,
  174,
  174,
  174,
  175,
  175,
  175,
  176,
  176,
  176,
  177,
  177,
  177,
  178,
  178,
  179,
  179,
  179,
  180,
  180,
  180,
  181,
  181,
  181,
  182,
  182,
  182,
  183,
  183,
  183,
  184,
  184,
  184,
  185,
  185,
  185,
  186,
  186,
  186,
  187,
  187,
  187,
  188,
  188,
  188,
  189,
  189,
  189,
  190,
  190,
  190,
  191,
  191,
  191,
  192,
  192,
  192,
  193,
  193,
  193,
  193,
  194,
  194,
  194,
  195,
  195,
  195,
  196,
  196,
  196,
  197,
  197,
  197,
  198,
  198,
  198,
  198,
  199,
  199,
  199,
  200,
  200,
  200,
  201,
  201,
  201,
  201,
  202,
  202,
  202,
  203,
  203,
  203,
  204,
  204,
  204,
  204,
  205,
  205,
  205,
  206,
  206,
  206,
  206,
  207,
  207,
  207,
  208,
  208,
  208,
  208,
  209,
  209,
  209,
  210,
  210,
  210,
  210,
  211,
  211,
  211,
  212,
  212,
  212,
  212,
  213,
  213,
  213,
  214,
  214,
  214,
  214,
  215,
  215,
  215,
  215,
  216,
  216,
  216,
  217,
  217,
  217,
  217,
  218,
  218,
  218,
  218,
  219,
  219,
  219,
  220,
  220,
  220,
  220,
  221,
  221,
  221,
  221,
  222,
  222,
  222,
  222,
  223,
  223,
  223,
  224,
  224,
  224,
  224,
  225,
  225,
  225,
  225,
  226,
  226,
  226,
  226,
  227,
  227,
  227,
  227,
  228,
  228,
  228,
  228,
  229,
  229,
  229,
  229,
  230,
  230,
  230,
  230,
  231,
  231,
  231,
  231,
  232,
  232,
  232,
  232,
  233,
  233,
  233,
  233,
  234,
  234,
  234,
  234,
  235,
  235,
  235,
  235,
  236,
  236,
  236,
  236,
  237,
  237,
  237,
  237,
  238,
  238,
  238,
  238,
  239,
  239,
  239,
  239,
  239,
  240,
  240,
  240,
  240,
  241,
  241,
  241,
  241,
  242,
  242,
  242,
  242,
  243,
  243,
  243,
  243,
  243,
  244,
  244,
  244,
  244,
  245,
  245,
  245,
  245,
  246,
  246,
  246,
  246,
  246,
  247,
  247,
  247,
  247,
  248,
  248,
  248,
  248,
  249,
  249,
  249,
  249,
  249,
  250,
  250,
  250,
  250,
  251,
  251,
  251,
  251,
  251,
  252,
  252,
  252,
  252,
  253,
  253,
  253,
  253,
  253,
  254,
  254,
  254,
  254,
  255,
  255,
  255
];
function y(l) {
  let t;
  if (l <= 0)
    return 0;
  if (l >= u)
    return u;
  t = l * (l * (l + -144107) / u + 132114) / u + 14379;
  for (let e = 0; e < 2; e++) {
    const n = t * t * t, r = l + (2 * n + _ / 2) / _;
    t = (t * (2 * l + (n + _ / 2) / _) + r / 2) / r;
  }
  return t;
}
function b(l, t) {
  return (l ^ t) < 0 ? (l - t / 2) / t : (l + t / 2) / t;
}
function P(l, t, e, n, r = !0, s = [255, 255, 255]) {
  if (!r) {
    n /= 255;
    const i = 1 - n;
    l = l * n + i * s[0] & 255, t = t * n + i * s[1] & 255, e = e * n + i * s[2] & 255;
  }
  return { r: l, g: t, b: e };
}
function S(l, t, e) {
  return l << 16 | t << 8 | e;
}
function M(l, t, e) {
  l = C[l], t = C[t], e = C[e];
  const n = (27015 * l + 35149 * t + 3372 * e + u / 2) / u, r = (13887 * l + 44610 * t + 7038 * e + u / 2) / u, s = (5787 * l + 18462 * t + 41286 * e + u / 2) / u, i = y(n), a = y(r), h = y(s);
  return {
    l: b(13792 * i + 52010 * a - 267 * h, u),
    a: b(129628 * i - 159158 * a + 29530 * h, u),
    b: b(1698 * i + 51299 * a - 52997 * h, u)
  };
}
function I(l) {
  if (l <= 0)
    return 0;
  if (l >= u)
    return 255;
  {
    const t = l * $, e = ~~(t / u), n = t % u, r = N[e], s = N[e + 1];
    return (n * (s - r) + u / 2) / u + r;
  }
}
function q(l) {
  const t = l.l + b(25974 * l.a, u) + b(14143 * l.b, u), e = l.l + b(-6918 * l.a, u) + b(-4185 * l.b, u), n = l.l + b(-5864 * l.a, u) + b(-84638 * l.b, u), r = t ** 3 / _, s = e ** 3 / _, i = n ** 3 / _, a = ~~I((267169 * r + -216771 * s + 15137 * i + u / 2) / u), h = ~~I((-83127 * r + 171030 * s + -22368 * i + u / 2) / u), o = ~~I((-275 * r + -46099 * s + 111909 * i + u / 2) / u);
  return { r: a, g: h, b: o };
}
function U(l) {
  return new Promise((t) => {
    const e = new Image();
    e.decoding = "sync", e.loading = "eager", e.crossOrigin = "anonymous", e.onload = () => t(e), e.onerror = () => t(e), e.src = l;
  });
}
class v {
  constructor() {
    this.readable = new ReadableStream({
      start: (t) => this._rsControler = t
    }), this.writable = new WritableStream({
      write: async (t) => {
        let e;
        switch (typeof t) {
          case "string": {
            const n = await U(t), r = v.ctx2d, s = r.canvas;
            r.clearRect(0, 0, s.width, s.height), s.width = n.width, s.height = n.height, r.drawImage(n, 0, 0, s.width, s.height), e = r.getImageData(0, 0, s.width, s.height).data;
            break;
          }
          default:
            if (ArrayBuffer.isView(t))
              e = new Uint8ClampedArray(t.buffer);
            else if (t instanceof ArrayBuffer)
              e = new Uint8ClampedArray(t);
            else if (Array.isArray(t))
              if (Array.isArray(t[0])) {
                const n = [];
                for (let r = t.length, s = 0; s < r; s++)
                  n.push(
                    t[s][0] ?? 0,
                    t[s][1] ?? 0,
                    t[s][2] ?? 0,
                    t[s][3] ?? 255
                  );
                e = new Uint8ClampedArray(n);
              } else
                e = new Uint8ClampedArray(t);
            else {
              const n = v.ctx2d, r = n.canvas;
              n.clearRect(0, 0, r.width, r.height), r.width = typeof t.width == "number" ? t.width : t.width.baseVal.value, r.height = typeof t.height == "number" ? t.height : t.height.baseVal.value, n.drawImage(t, 0, 0, r.width, r.height), e = n.getImageData(0, 0, r.width, r.height).data;
            }
            break;
        }
        this._rsControler.enqueue(e);
      },
      close: () => {
        this._rsControler.close();
      }
    });
  }
  static get ctx2d() {
    if (!this._ctx2d) {
      if (!W)
        throw new Error("Failed to get ImageToPixels.ctx2d, not in browser.");
      const t = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 });
      if (!t)
        throw new Error("Failed to get ImageToPixels.ctx2d, getContext('2d') return null.");
      this._ctx2d = t;
    }
    return this._ctx2d;
  }
}
class A {
  constructor(t) {
    this.maxColors = t, this.readable = new ReadableStream({
      start: (e) => this._rsControler = e
    }), this.writable = new WritableStream({
      write: (e) => {
        this._rsControler.enqueue(
          this._boxesToQuantizedColors(
            this._colorsToBoxes(e)
          )
        );
      },
      close: () => {
        this._rsControler.close();
      }
    });
  }
  static createSorter(t) {
    const e = t[0], n = t[1], r = t[2];
    return (s, i) => s.lab[e] - i.lab[e] || s.lab[n] - i.lab[n] || s.lab[r] - i.lab[r];
  }
  _colorsToBoxes(t) {
    let e = {
      start: 0,
      end: t.length - 1,
      sorted: null,
      count: 0,
      score: 0,
      weight: 0,
      sort: "lab",
      avg: { l: 0, a: 0, b: 0 }
    };
    const n = [e];
    let r = 1;
    const s = (o, m, c) => o >= m ? m >= c ? "lab" : o >= c ? "lba" : "bla" : o >= c ? "alb" : m >= c ? "abl" : "bal", i = (o) => {
      const { start: m, end: c } = o;
      o.count = c - m + 1, o.weight = 0;
      const f = { l: 0, a: 0, b: 0 };
      for (let p = m; p <= c; p++) {
        const d = t[p];
        f.l += d.lab.l * d.count, f.a += d.lab.a * d.count, f.b += d.lab.b * d.count, o.weight += d.count;
      }
      o.avg.l = f.l / o.weight, o.avg.a = f.a / o.weight, o.avg.b = f.b / o.weight;
      const w = { l: 0, a: 0, b: 0 };
      for (let p = m; p <= c; p++) {
        const d = t[p];
        w.l += (d.lab.l - o.avg.l) ** 2 * d.count, w.a += (d.lab.a - o.avg.a) ** 2 * d.count, w.b += (d.lab.b - o.avg.b) ** 2 * d.count;
      }
      o.sort = s(w.l, w.a, w.b), o.score = Math.max(w.l, w.a, w.b);
    }, a = (o, m) => {
      const c = {
        start: m + 1,
        end: o.end,
        sorted: o.sorted,
        count: 0,
        score: 0,
        weight: 0,
        sort: "lab",
        avg: { l: 0, a: 0, b: 0 }
      };
      i(c), o.end -= c.count, i(o), n.push(c), r++;
    }, h = () => {
      let o = -1, m = -1;
      if (r === this.maxColors)
        return -1;
      for (let c = 0; c < r; c++) {
        const f = n[c];
        f.count >= 2 && f.score > m && (o = c, m = f.score);
      }
      return o;
    };
    for (i(e); e && e.count > 1; ) {
      const { start: o, end: m, sort: c, sorted: f } = e;
      if (c !== f) {
        const R = t.slice(o, m + 1).sort(A.createSorter(c));
        for (let E = R.length, x = 0; x < E; x++)
          t[o + x] = R[x];
        e.sorted = c;
      }
      const p = e.weight + 1 >> 1;
      let d = o, g = 0;
      for (; d < m - 1 && (g += t[d].count, !(g > p)); d++)
        ;
      a(e, d);
      const T = h();
      e = T >= 0 ? n[T] : null;
    }
    return n;
  }
  _boxesToQuantizedColors(t) {
    const e = t.reduce((n, r) => n + r.weight, 0);
    return t.map((n) => {
      const { r, g: s, b: i } = q(n.avg);
      return {
        rgbInt: S(r, s, i),
        rgb: { r, g: s, b: i },
        hex: `#${r.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}`,
        lab: n.avg,
        count: n.weight,
        percentage: n.weight / e
      };
    }).sort((n, r) => n.rgbInt - r.rgbInt);
  }
}
class B {
  constructor(t, e, n) {
    this.statsMode = t, this.premultipliedAlpha = e, this.tint = n, this._colors = [], this._cache = /* @__PURE__ */ new Map(), this.readable = new ReadableStream({
      start: (r) => this._rsControler = r
    }), this.writable = new WritableStream({
      write: (r) => {
        for (let s = r.length, i = 0; i < s; i += 4) {
          let a = r[i], h = r[i + 1], o = r[i + 2];
          const m = r[i + 3];
          if (this.statsMode === "diff" && this._previousPixels && a === this._previousPixels[i] && h === this._previousPixels[i + 1] && o === this._previousPixels[i + 2] && m === this._previousPixels[i + 3])
            continue;
          ({ r: a, g: h, b: o } = P(a, h, o, m, this.premultipliedAlpha, this.tint));
          const c = S(a, h, o), f = {
            rgbInt: c,
            lab: M(a, h, o),
            count: 1
          }, w = c % 32768;
          let p = this._cache.get(w);
          p || this._cache.set(w, p = /* @__PURE__ */ new Map());
          let d = p.get(c);
          if (d !== void 0) {
            this._colors[d].count++;
            continue;
          }
          d = this._colors.push(f) - 1, p.set(c, d);
        }
        this.statsMode === "diff" && (this._previousPixels = r);
      },
      close: () => {
        this._rsControler.enqueue(this._colors.slice()), this._rsControler.close(), this._colors.length = 0, this._cache.clear(), this._previousPixels = void 0;
      }
    });
  }
}
class F {
  constructor(t = [], e = !1, n = [255, 255, 255]) {
    this._premultipliedAlpha = e, this._tint = n, this._cache = /* @__PURE__ */ new Map(), this._colorMap = [], t.length && this.setup(t);
  }
  setup(t) {
    t = t.sort((i, a) => i.rgbInt - a.rgbInt), this._cache.clear();
    const e = [], n = /* @__PURE__ */ new Map();
    for (let i = -1, a = t.length, h = 0; h < a; h++) {
      const { rgbInt: o } = t[h];
      if (o === i) {
        n.set(h, !0);
        continue;
      }
      i = o;
    }
    s({
      min: [-65535, -65535, -65535],
      max: [65535, 65535, 65535]
    }), this._colorMap = e;
    function r(i) {
      const a = {
        min: [65535, 65535, 65535],
        max: [-65535, -65535, -65535]
      }, h = [];
      for (let p = t.length, d = 0; d < p; d++) {
        const { lab: g } = t[d];
        n.has(d) || g.l < i.min[0] || g.a < i.min[1] || g.b < i.min[2] || g.l > i.max[0] || g.a > i.max[1] || g.b > i.max[2] || (g.l < a.min[0] && (a.min[0] = g.l), g.a < a.min[1] && (a.min[1] = g.a), g.b < a.min[2] && (a.min[2] = g.b), g.l > a.max[0] && (a.max[0] = g.l), g.a > a.max[1] && (a.max[1] = g.a), g.b > a.max[2] && (a.max[2] = g.b), h.push({
          lab: g,
          index: d
        }));
      }
      let o = "l", m = 0;
      if (!h.length)
        return { index: -1, longest: o, longestIndex: m };
      const c = a.max[0] - a.min[0], f = a.max[1] - a.min[1], w = a.max[2] - a.min[2];
      return w >= c && w >= f && (o = "b", m = 2), f >= c && f >= w && (o = "a", m = 1), c >= f && c >= w && (o = "l", m = 0), {
        index: h.sort((p, d) => p.lab[o] - d.lab[o])[h.length >> 1].index,
        longest: o,
        longestIndex: m
      };
    }
    function s(i) {
      const { index: a, longest: h, longestIndex: o } = r(i);
      if (a < 0)
        return -1;
      n.set(a, !0);
      const { lab: m } = t[a], c = {
        left: 0,
        right: 0,
        longest: h,
        lab: m,
        index: a
      }, f = e.push(c) - 1, w = { max: [...i.max], min: [...i.min] }, p = { max: [...i.max], min: [...i.min] };
      w.max[o] = m[h], p.min[o] = Math.min(m[h] + 1, 65535);
      const d = s(w);
      let g = -1;
      return p.min[o] <= p.max[o] && (g = s(p)), c.left = d, c.right = g, f;
    }
  }
  _colormapNearestNode(t, e, n) {
    const { left: r, right: s, longest: i, lab: a, index: h } = this._colorMap[t], o = Math.min(
      (e.l - a.l) ** 2 + (e.a - a.a) ** 2 + (e.b - a.b) ** 2,
      4294967295 - 1
    );
    o < n.dist && (n.index = h, n.dist = o);
    let m, c;
    if (r !== -1 || s !== -1) {
      const f = e[i] - a[i];
      f <= 0 ? (m = r, c = s) : (m = s, c = r), m !== -1 && this._colormapNearestNode(m, e, n), c !== -1 && f ** 2 < n.dist && this._colormapNearestNode(c, e, n);
    }
  }
  findNearestIndex(t, e, n, r = 255) {
    ({ r: t, g: e, b: n } = P(t, e, n, r, this._premultipliedAlpha, this._tint));
    const s = S(t, e, n), i = s % 32768;
    let a = this._cache.get(i);
    a || this._cache.set(i, a = /* @__PURE__ */ new Map());
    let h = a.get(s);
    if (h !== void 0)
      return h;
    const o = {
      dist: Number.MAX_SAFE_INTEGER,
      index: -1
    };
    return this._colormapNearestNode(0, M(t, e, n), o), h = o.index, a.set(s, h), h;
  }
}
class O {
  constructor(t = {}) {
    this.colors = [], this.config = this._resolveOptions(t), this._stream = this._createStream();
  }
  _resolveOptions(t) {
    const {
      maxColors: e = 256,
      statsMode: n = "full",
      algorithm: r = "median-cut",
      premultipliedAlpha: s = !1,
      tint: i = [255, 255, 255],
      samples: a = []
    } = t;
    return {
      maxColors: e,
      statsMode: n,
      algorithm: r,
      premultipliedAlpha: s,
      tint: i,
      samples: a
    };
  }
  _createStream() {
    let t;
    switch (this.config.algorithm) {
      case "median-cut":
      default:
        t = new A(this.config.maxColors);
        break;
    }
    return new ReadableStream({
      start: (e) => {
        this._streamControler = e, this.config.samples.forEach((n) => e.enqueue(n));
      }
    }).pipeThrough(new v()).pipeThrough(new B(this.config.statsMode, this.config.premultipliedAlpha, this.config.tint)).pipeThrough(t);
  }
  addSample(t) {
    this._streamControler.enqueue(t);
  }
  generate() {
    return new Promise((t) => {
      this._streamControler.close(), this._stream.pipeTo(new WritableStream({
        write: (e) => {
          this.colors = e, this.finder = new F(e, this.config.premultipliedAlpha, this.config.tint), this._stream = this._createStream(), t(e);
        }
      }));
    });
  }
  match(t) {
    var s;
    let e;
    if (typeof t == "number")
      e = [
        t >> 24 & 255,
        t >> 16 & 255,
        t >> 8 & 255,
        t & 255
      ];
    else if (typeof t == "string") {
      const i = t.replace(/^#/, "");
      e = [
        `${i[0]}${i[1]}`,
        `${i[2]}${i[3]}`,
        `${i[4]}${i[5]}`
      ].map((a) => parseInt(a, 16));
    } else if (Array.isArray(t))
      e = t;
    else
      throw new TypeError("Unsupported color format");
    const n = (s = this.finder) == null ? void 0 : s.findNearestIndex(e[0], e[1], e[2], e[3]);
    if (n === void 0 || n < 0)
      return;
    const r = this.colors[n];
    if (r)
      return {
        color: r,
        index: n
      };
  }
  toColors() {
    return this.colors.slice();
  }
  toHexColors() {
    return this.colors.map((t) => t.hex);
  }
  toRgbColors() {
    return this.colors.map((t) => t.rgb);
  }
  toRgbIntColors() {
    return this.colors.map((t) => t.rgbInt);
  }
  toLabColors() {
    return this.colors.map((t) => t.lab);
  }
  toUint8Array(t = this.colors.length * 4) {
    var r;
    let e;
    const n = new Uint8ClampedArray(t);
    for (let s = 0; s < t; s++) {
      const i = s * 4, a = ((r = this.colors[s]) == null ? void 0 : r.rgb) ?? e;
      a && (n[i] = a.r, n[i + 1] = a.g, n[i + 2] = a.b, n[i + 3] = 255, e = a);
    }
    return n;
  }
  clear() {
    this.colors.length = 0, this._stream = this._createStream();
  }
}
export {
  F as Finder,
  v as ImageToPixels,
  A as MedianCut,
  O as Palette,
  B as PixelsToColors
};
