var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ms(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Se, hr;
function Hs() {
  if (hr) return Se;
  hr = 1;
  var s = typeof ae == "object" && ae && ae.Object === Object && ae;
  return Se = s, Se;
}
var be, lr;
function cn() {
  if (lr) return be;
  lr = 1;
  var s = Hs(), e = typeof self == "object" && self && self.Object === Object && self, t = s || e || Function("return this")();
  return be = t, be;
}
var Ce, dr;
function Kt() {
  if (dr) return Ce;
  dr = 1;
  var s = cn(), e = s.Symbol;
  return Ce = e, Ce;
}
var Re, fr;
function un() {
  if (fr) return Re;
  fr = 1;
  function s(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
      a[r] = t(e[r], r, e);
    return a;
  }
  return Re = s, Re;
}
var Te, mr;
function hn() {
  if (mr) return Te;
  mr = 1;
  var s = Array.isArray;
  return Te = s, Te;
}
var Le, pr;
function ln() {
  if (pr) return Le;
  pr = 1;
  var s = Kt(), e = Object.prototype, t = e.hasOwnProperty, r = e.toString, n = s ? s.toStringTag : void 0;
  function a(o) {
    var u = t.call(o, n), c = o[n];
    try {
      o[n] = void 0;
      var i = !0;
    } catch {
    }
    var l = r.call(o);
    return i && (u ? o[n] = c : delete o[n]), l;
  }
  return Le = a, Le;
}
var Ae, gr;
function dn() {
  if (gr) return Ae;
  gr = 1;
  var s = Object.prototype, e = s.toString;
  function t(r) {
    return e.call(r);
  }
  return Ae = t, Ae;
}
var xe, _r;
function Bs() {
  if (_r) return xe;
  _r = 1;
  var s = Kt(), e = ln(), t = dn(), r = "[object Null]", n = "[object Undefined]", a = s ? s.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? n : r : a && a in Object(u) ? e(u) : t(u);
  }
  return xe = o, xe;
}
var Ie, vr;
function Vs() {
  if (vr) return Ie;
  vr = 1;
  function s(e) {
    return e != null && typeof e == "object";
  }
  return Ie = s, Ie;
}
var Oe, Er;
function Ws() {
  if (Er) return Oe;
  Er = 1;
  var s = Bs(), e = Vs(), t = "[object Symbol]";
  function r(n) {
    return typeof n == "symbol" || e(n) && s(n) == t;
  }
  return Oe = r, Oe;
}
var $e, yr;
function Xs() {
  if (yr) return $e;
  yr = 1;
  var s = Kt(), e = un(), t = hn(), r = Ws(), n = s ? s.prototype : void 0, a = n ? n.toString : void 0;
  function o(u) {
    if (typeof u == "string")
      return u;
    if (t(u))
      return e(u, o) + "";
    if (r(u))
      return a ? a.call(u) : "";
    var c = u + "";
    return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
  }
  return $e = o, $e;
}
var Ne, wr;
function fn() {
  if (wr) return Ne;
  wr = 1;
  function s(e, t, r) {
    var n = -1, a = e.length;
    t < 0 && (t = -t > a ? 0 : a + t), r = r > a ? a : r, r < 0 && (r += a), a = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var o = Array(a); ++n < a; )
      o[n] = e[n + t];
    return o;
  }
  return Ne = s, Ne;
}
var Pe, Sr;
function mn() {
  if (Sr) return Pe;
  Sr = 1;
  var s = fn();
  function e(t, r, n) {
    var a = t.length;
    return n = n === void 0 ? a : n, !r && n >= a ? t : s(t, r, n);
  }
  return Pe = e, Pe;
}
var qe, br;
function Zt() {
  if (br) return qe;
  br = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + s + n + a + "]");
  function c(i) {
    return u.test(i);
  }
  return qe = c, qe;
}
var ke, Cr;
function Ys() {
  if (Cr) return ke;
  Cr = 1;
  function s(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return ke = s, ke;
}
var Fe, Rr;
function pn() {
  if (Rr) return Fe;
  Rr = 1;
  var s = Bs(), e = Vs(), t = "[object RegExp]";
  function r(n) {
    return e(n) && s(n) == t;
  }
  return Fe = r, Fe;
}
var De, Tr;
function gn() {
  if (Tr) return De;
  Tr = 1;
  function s(e) {
    return function(t) {
      return e(t);
    };
  }
  return De = s, De;
}
var se = { exports: {} };
se.exports;
var Lr;
function _n() {
  return Lr || (Lr = 1, (function(s, e) {
    var t = Hs(), r = e && !e.nodeType && e, n = r && !0 && s && !s.nodeType && s, a = n && n.exports === r, o = a && t.process, u = (function() {
      try {
        var c = n && n.require && n.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    s.exports = u;
  })(se, se.exports)), se.exports;
}
var je, Ar;
function vn() {
  if (Ar) return je;
  Ar = 1;
  var s = pn(), e = gn(), t = _n(), r = t && t.isRegExp, n = r ? e(r) : s;
  return je = n, je;
}
var ze, xr;
function En() {
  if (xr) return ze;
  xr = 1;
  function s(e) {
    return function(t) {
      return t?.[e];
    };
  }
  return ze = s, ze;
}
var Ue, Ir;
function yn() {
  if (Ir) return Ue;
  Ir = 1;
  var s = En(), e = s("length");
  return Ue = e, Ue;
}
var Ge, Or;
function wn() {
  if (Or) return Ge;
  Or = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "[" + s + "]", u = "[" + n + "]", c = "\\ud83c[\\udffb-\\udfff]", i = "(?:" + u + "|" + c + ")", l = "[^" + s + "]", h = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", m = "\\u200d", f = i + "?", _ = "[" + a + "]?", g = "(?:" + m + "(?:" + [l, h, d].join("|") + ")" + _ + f + ")*", C = _ + f + g, N = "(?:" + [l + u + "?", u, h, d, o].join("|") + ")", w = RegExp(c + "(?=" + c + ")|" + N + C, "g");
  function x(I) {
    for (var A = w.lastIndex = 0; w.test(I); )
      ++A;
    return A;
  }
  return Ge = x, Ge;
}
var Me, $r;
function Sn() {
  if ($r) return Me;
  $r = 1;
  var s = yn(), e = Zt(), t = wn();
  function r(n) {
    return e(n) ? t(n) : s(n);
  }
  return Me = r, Me;
}
var He, Nr;
function bn() {
  if (Nr) return He;
  Nr = 1;
  function s(e) {
    return e.split("");
  }
  return He = s, He;
}
var Be, Pr;
function Cn() {
  if (Pr) return Be;
  Pr = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "[" + s + "]", u = "[" + n + "]", c = "\\ud83c[\\udffb-\\udfff]", i = "(?:" + u + "|" + c + ")", l = "[^" + s + "]", h = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", m = "\\u200d", f = i + "?", _ = "[" + a + "]?", g = "(?:" + m + "(?:" + [l, h, d].join("|") + ")" + _ + f + ")*", C = _ + f + g, N = "(?:" + [l + u + "?", u, h, d, o].join("|") + ")", w = RegExp(c + "(?=" + c + ")|" + N + C, "g");
  function x(I) {
    return I.match(w) || [];
  }
  return Be = x, Be;
}
var Ve, qr;
function Rn() {
  if (qr) return Ve;
  qr = 1;
  var s = bn(), e = Zt(), t = Cn();
  function r(n) {
    return e(n) ? t(n) : s(n);
  }
  return Ve = r, Ve;
}
var We, kr;
function Tn() {
  if (kr) return We;
  kr = 1;
  var s = /\s/;
  function e(t) {
    for (var r = t.length; r-- && s.test(t.charAt(r)); )
      ;
    return r;
  }
  return We = e, We;
}
var Xe, Fr;
function Ln() {
  if (Fr) return Xe;
  Fr = 1;
  var s = Tn(), e = /^\s+/;
  function t(r) {
    return r && r.slice(0, s(r) + 1).replace(e, "");
  }
  return Xe = t, Xe;
}
var Ye, Dr;
function An() {
  if (Dr) return Ye;
  Dr = 1;
  var s = Ln(), e = Ys(), t = Ws(), r = NaN, n = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
  function c(i) {
    if (typeof i == "number")
      return i;
    if (t(i))
      return r;
    if (e(i)) {
      var l = typeof i.valueOf == "function" ? i.valueOf() : i;
      i = e(l) ? l + "" : l;
    }
    if (typeof i != "string")
      return i === 0 ? i : +i;
    i = s(i);
    var h = a.test(i);
    return h || o.test(i) ? u(i.slice(2), h ? 2 : 8) : n.test(i) ? r : +i;
  }
  return Ye = c, Ye;
}
var Je, jr;
function xn() {
  if (jr) return Je;
  jr = 1;
  var s = An(), e = 1 / 0, t = 17976931348623157e292;
  function r(n) {
    if (!n)
      return n === 0 ? n : 0;
    if (n = s(n), n === e || n === -e) {
      var a = n < 0 ? -1 : 1;
      return a * t;
    }
    return n === n ? n : 0;
  }
  return Je = r, Je;
}
var Qe, zr;
function In() {
  if (zr) return Qe;
  zr = 1;
  var s = xn();
  function e(t) {
    var r = s(t), n = r % 1;
    return r === r ? n ? r - n : r : 0;
  }
  return Qe = e, Qe;
}
var Ke, Ur;
function On() {
  if (Ur) return Ke;
  Ur = 1;
  var s = Xs();
  function e(t) {
    return t == null ? "" : s(t);
  }
  return Ke = e, Ke;
}
var Ze, Gr;
function $n() {
  if (Gr) return Ze;
  Gr = 1;
  var s = Xs(), e = mn(), t = Zt(), r = Ys(), n = vn(), a = Sn(), o = Rn(), u = In(), c = On(), i = 30, l = "...", h = /\w*$/;
  function d(m, f) {
    var _ = i, g = l;
    if (r(f)) {
      var C = "separator" in f ? f.separator : C;
      _ = "length" in f ? u(f.length) : _, g = "omission" in f ? s(f.omission) : g;
    }
    m = c(m);
    var N = m.length;
    if (t(m)) {
      var w = o(m);
      N = w.length;
    }
    if (_ >= N)
      return m;
    var x = _ - a(g);
    if (x < 1)
      return g;
    var I = w ? e(w, 0, x).join("") : m.slice(0, x);
    if (C === void 0)
      return I + g;
    if (w && (x += I.length - x), n(C)) {
      if (m.slice(x).search(C)) {
        var A, P = I;
        for (C.global || (C = RegExp(C.source, c(h.exec(C)) + "g")), C.lastIndex = 0; A = C.exec(P); )
          var S = A.index;
        I = I.slice(0, S === void 0 ? x : S);
      }
    } else if (m.indexOf(s(C), x) != x) {
      var z = I.lastIndexOf(C);
      z > -1 && (I = I.slice(0, z));
    }
    return I + g;
  }
  return Ze = d, Ze;
}
var Nn = $n();
const Pn = /* @__PURE__ */ Ms(Nn), re = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, qn = typeof AbortController == "function", he = qn ? AbortController : class {
  constructor() {
    this.signal = new Js();
  }
  abort(e = new Error("This operation was aborted")) {
    this.signal.reason = this.signal.reason || e, this.signal.aborted = !0, this.signal.dispatchEvent({
      type: "abort",
      target: this.signal
    });
  }
}, kn = typeof AbortSignal == "function", Fn = typeof he.AbortSignal == "function", Js = kn ? AbortSignal : Fn ? he.AbortController : class {
  constructor() {
    this.reason = void 0, this.aborted = !1, this._listeners = [];
  }
  dispatchEvent(e) {
    e.type === "abort" && (this.aborted = !0, this.onabort(e), this._listeners.forEach((t) => t(e), this));
  }
  onabort() {
  }
  addEventListener(e, t) {
    e === "abort" && this._listeners.push(t);
  }
  removeEventListener(e, t) {
    e === "abort" && (this._listeners = this._listeners.filter((r) => r !== t));
  }
}, er = /* @__PURE__ */ new Set(), et = (s, e) => {
  const t = `LRU_CACHE_OPTION_${s}`;
  fe(t) && tr(t, `${s} option`, `options.${e}`, J);
}, tt = (s, e) => {
  const t = `LRU_CACHE_METHOD_${s}`;
  if (fe(t)) {
    const { prototype: r } = J, { get: n } = Object.getOwnPropertyDescriptor(r, s);
    tr(t, `${s} method`, `cache.${e}()`, n);
  }
}, Dn = (s, e) => {
  const t = `LRU_CACHE_PROPERTY_${s}`;
  if (fe(t)) {
    const { prototype: r } = J, { get: n } = Object.getOwnPropertyDescriptor(r, s);
    tr(t, `${s} property`, `cache.${e}`, n);
  }
}, Qs = (...s) => {
  typeof process == "object" && process && typeof process.emitWarning == "function" ? process.emitWarning(...s) : console.error(...s);
}, fe = (s) => !er.has(s), tr = (s, e, t, r) => {
  er.add(s);
  const n = `The ${e} is deprecated. Please use ${t} instead.`;
  Qs(n, "DeprecationWarning", s, r);
}, W = (s) => s && s === Math.floor(s) && s > 0 && isFinite(s), Ks = (s) => W(s) ? s <= Math.pow(2, 8) ? Uint8Array : s <= Math.pow(2, 16) ? Uint16Array : s <= Math.pow(2, 32) ? Uint32Array : s <= Number.MAX_SAFE_INTEGER ? ce : null : null;
class ce extends Array {
  constructor(e) {
    super(e), this.fill(0);
  }
}
class jn {
  constructor(e) {
    if (e === 0)
      return [];
    const t = Ks(e);
    this.heap = new t(e), this.length = 0;
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class J {
  constructor(e = {}) {
    const {
      max: t = 0,
      ttl: r,
      ttlResolution: n = 1,
      ttlAutopurge: a,
      updateAgeOnGet: o,
      updateAgeOnHas: u,
      allowStale: c,
      dispose: i,
      disposeAfter: l,
      noDisposeOnSet: h,
      noUpdateTTL: d,
      maxSize: m = 0,
      maxEntrySize: f = 0,
      sizeCalculation: _,
      fetchMethod: g,
      fetchContext: C,
      noDeleteOnFetchRejection: N,
      noDeleteOnStaleGet: w,
      allowStaleOnFetchRejection: x,
      allowStaleOnFetchAbort: I,
      ignoreFetchAbort: A
    } = e, { length: P, maxAge: S, stale: z } = e instanceof J ? {} : e;
    if (t !== 0 && !W(t))
      throw new TypeError("max option must be a nonnegative integer");
    const X = t ? Ks(t) : Array;
    if (!X)
      throw new Error("invalid max value: " + t);
    if (this.max = t, this.maxSize = m, this.maxEntrySize = f || this.maxSize, this.sizeCalculation = _ || P, this.sizeCalculation) {
      if (!this.maxSize && !this.maxEntrySize)
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize or maxEntrySize"
        );
      if (typeof this.sizeCalculation != "function")
        throw new TypeError("sizeCalculation set to non-function");
    }
    if (this.fetchMethod = g || null, this.fetchMethod && typeof this.fetchMethod != "function")
      throw new TypeError(
        "fetchMethod must be a function if specified"
      );
    if (this.fetchContext = C, !this.fetchMethod && C !== void 0)
      throw new TypeError(
        "cannot set fetchContext without fetchMethod"
      );
    if (this.keyMap = /* @__PURE__ */ new Map(), this.keyList = new Array(t).fill(null), this.valList = new Array(t).fill(null), this.next = new X(t), this.prev = new X(t), this.head = 0, this.tail = 0, this.free = new jn(t), this.initialFill = 1, this.size = 0, typeof i == "function" && (this.dispose = i), typeof l == "function" ? (this.disposeAfter = l, this.disposed = []) : (this.disposeAfter = null, this.disposed = null), this.noDisposeOnSet = !!h, this.noUpdateTTL = !!d, this.noDeleteOnFetchRejection = !!N, this.allowStaleOnFetchRejection = !!x, this.allowStaleOnFetchAbort = !!I, this.ignoreFetchAbort = !!A, this.maxEntrySize !== 0) {
      if (this.maxSize !== 0 && !W(this.maxSize))
        throw new TypeError(
          "maxSize must be a positive integer if specified"
        );
      if (!W(this.maxEntrySize))
        throw new TypeError(
          "maxEntrySize must be a positive integer if specified"
        );
      this.initializeSizeTracking();
    }
    if (this.allowStale = !!c || !!z, this.noDeleteOnStaleGet = !!w, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!u, this.ttlResolution = W(n) || n === 0 ? n : 1, this.ttlAutopurge = !!a, this.ttl = r || S || 0, this.ttl) {
      if (!W(this.ttl))
        throw new TypeError(
          "ttl must be a positive integer if specified"
        );
      this.initializeTTLTracking();
    }
    if (this.max === 0 && this.ttl === 0 && this.maxSize === 0)
      throw new TypeError(
        "At least one of max, maxSize, or ttl is required"
      );
    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
      const Y = "LRU_CACHE_UNBOUNDED";
      fe(Y) && (er.add(Y), Qs("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", Y, J));
    }
    z && et("stale", "allowStale"), S && et("maxAge", "ttl"), P && et("length", "sizeCalculation");
  }
  getRemainingTTL(e) {
    return this.has(e, { updateAgeOnHas: !1 }) ? 1 / 0 : 0;
  }
  initializeTTLTracking() {
    this.ttls = new ce(this.max), this.starts = new ce(this.max), this.setItemTTL = (r, n, a = re.now()) => {
      if (this.starts[r] = n !== 0 ? a : 0, this.ttls[r] = n, n !== 0 && this.ttlAutopurge) {
        const o = setTimeout(() => {
          this.isStale(r) && this.delete(this.keyList[r]);
        }, n + 1);
        o.unref && o.unref();
      }
    }, this.updateItemAge = (r) => {
      this.starts[r] = this.ttls[r] !== 0 ? re.now() : 0;
    }, this.statusTTL = (r, n) => {
      r && (r.ttl = this.ttls[n], r.start = this.starts[n], r.now = e || t(), r.remainingTTL = r.now + r.ttl - r.start);
    };
    let e = 0;
    const t = () => {
      const r = re.now();
      if (this.ttlResolution > 0) {
        e = r;
        const n = setTimeout(
          () => e = 0,
          this.ttlResolution
        );
        n.unref && n.unref();
      }
      return r;
    };
    this.getRemainingTTL = (r) => {
      const n = this.keyMap.get(r);
      return n === void 0 ? 0 : this.ttls[n] === 0 || this.starts[n] === 0 ? 1 / 0 : this.starts[n] + this.ttls[n] - (e || t());
    }, this.isStale = (r) => this.ttls[r] !== 0 && this.starts[r] !== 0 && (e || t()) - this.starts[r] > this.ttls[r];
  }
  updateItemAge(e) {
  }
  statusTTL(e, t) {
  }
  setItemTTL(e, t, r) {
  }
  isStale(e) {
    return !1;
  }
  initializeSizeTracking() {
    this.calculatedSize = 0, this.sizes = new ce(this.max), this.removeItemSize = (e) => {
      this.calculatedSize -= this.sizes[e], this.sizes[e] = 0;
    }, this.requireSize = (e, t, r, n) => {
      if (this.isBackgroundFetch(t))
        return 0;
      if (!W(r))
        if (n) {
          if (typeof n != "function")
            throw new TypeError("sizeCalculation must be a function");
          if (r = n(t, e), !W(r))
            throw new TypeError(
              "sizeCalculation return invalid (expect positive integer)"
            );
        } else
          throw new TypeError(
            "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set."
          );
      return r;
    }, this.addItemSize = (e, t, r) => {
      if (this.sizes[e] = t, this.maxSize) {
        const n = this.maxSize - this.sizes[e];
        for (; this.calculatedSize > n; )
          this.evict(!0);
      }
      this.calculatedSize += this.sizes[e], r && (r.entrySize = t, r.totalCalculatedSize = this.calculatedSize);
    };
  }
  removeItemSize(e) {
  }
  addItemSize(e, t) {
  }
  requireSize(e, t, r, n) {
    if (r || n)
      throw new TypeError(
        "cannot set size without setting maxSize or maxEntrySize on cache"
      );
  }
  *indexes({ allowStale: e = this.allowStale } = {}) {
    if (this.size)
      for (let t = this.tail; !(!this.isValidIndex(t) || ((e || !this.isStale(t)) && (yield t), t === this.head)); )
        t = this.prev[t];
  }
  *rindexes({ allowStale: e = this.allowStale } = {}) {
    if (this.size)
      for (let t = this.head; !(!this.isValidIndex(t) || ((e || !this.isStale(t)) && (yield t), t === this.tail)); )
        t = this.next[t];
  }
  isValidIndex(e) {
    return e !== void 0 && this.keyMap.get(this.keyList[e]) === e;
  }
  *entries() {
    for (const e of this.indexes())
      this.valList[e] !== void 0 && this.keyList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield [this.keyList[e], this.valList[e]]);
  }
  *rentries() {
    for (const e of this.rindexes())
      this.valList[e] !== void 0 && this.keyList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield [this.keyList[e], this.valList[e]]);
  }
  *keys() {
    for (const e of this.indexes())
      this.keyList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield this.keyList[e]);
  }
  *rkeys() {
    for (const e of this.rindexes())
      this.keyList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield this.keyList[e]);
  }
  *values() {
    for (const e of this.indexes())
      this.valList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield this.valList[e]);
  }
  *rvalues() {
    for (const e of this.rindexes())
      this.valList[e] !== void 0 && !this.isBackgroundFetch(this.valList[e]) && (yield this.valList[e]);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(e, t) {
    for (const r of this.indexes()) {
      const n = this.valList[r], a = this.isBackgroundFetch(n) ? n.__staleWhileFetching : n;
      if (a !== void 0 && e(a, this.keyList[r], this))
        return this.get(this.keyList[r], t);
    }
  }
  forEach(e, t = this) {
    for (const r of this.indexes()) {
      const n = this.valList[r], a = this.isBackgroundFetch(n) ? n.__staleWhileFetching : n;
      a !== void 0 && e.call(t, a, this.keyList[r], this);
    }
  }
  rforEach(e, t = this) {
    for (const r of this.rindexes()) {
      const n = this.valList[r], a = this.isBackgroundFetch(n) ? n.__staleWhileFetching : n;
      a !== void 0 && e.call(t, a, this.keyList[r], this);
    }
  }
  get prune() {
    return tt("prune", "purgeStale"), this.purgeStale;
  }
  purgeStale() {
    let e = !1;
    for (const t of this.rindexes({ allowStale: !0 }))
      this.isStale(t) && (this.delete(this.keyList[t]), e = !0);
    return e;
  }
  dump() {
    const e = [];
    for (const t of this.indexes({ allowStale: !0 })) {
      const r = this.keyList[t], n = this.valList[t], a = this.isBackgroundFetch(n) ? n.__staleWhileFetching : n;
      if (a === void 0) continue;
      const o = { value: a };
      if (this.ttls) {
        o.ttl = this.ttls[t];
        const u = re.now() - this.starts[t];
        o.start = Math.floor(Date.now() - u);
      }
      this.sizes && (o.size = this.sizes[t]), e.unshift([r, o]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (const [t, r] of e) {
      if (r.start) {
        const n = Date.now() - r.start;
        r.start = re.now() - n;
      }
      this.set(t, r.value, r);
    }
  }
  dispose(e, t, r) {
  }
  set(e, t, {
    ttl: r = this.ttl,
    start: n,
    noDisposeOnSet: a = this.noDisposeOnSet,
    size: o = 0,
    sizeCalculation: u = this.sizeCalculation,
    noUpdateTTL: c = this.noUpdateTTL,
    status: i
  } = {}) {
    if (o = this.requireSize(e, t, o, u), this.maxEntrySize && o > this.maxEntrySize)
      return i && (i.set = "miss", i.maxEntrySizeExceeded = !0), this.delete(e), this;
    let l = this.size === 0 ? void 0 : this.keyMap.get(e);
    if (l === void 0)
      l = this.newIndex(), this.keyList[l] = e, this.valList[l] = t, this.keyMap.set(e, l), this.next[this.tail] = l, this.prev[l] = this.tail, this.tail = l, this.size++, this.addItemSize(l, o, i), i && (i.set = "add"), c = !1;
    else {
      this.moveToTail(l);
      const h = this.valList[l];
      if (t !== h) {
        if (this.isBackgroundFetch(h) ? h.__abortController.abort(new Error("replaced")) : a || (this.dispose(h, e, "set"), this.disposeAfter && this.disposed.push([h, e, "set"])), this.removeItemSize(l), this.valList[l] = t, this.addItemSize(l, o, i), i) {
          i.set = "replace";
          const d = h && this.isBackgroundFetch(h) ? h.__staleWhileFetching : h;
          d !== void 0 && (i.oldValue = d);
        }
      } else i && (i.set = "update");
    }
    if (r !== 0 && this.ttl === 0 && !this.ttls && this.initializeTTLTracking(), c || this.setItemTTL(l, r, n), this.statusTTL(i, l), this.disposeAfter)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
    return this;
  }
  newIndex() {
    return this.size === 0 ? this.tail : this.size === this.max && this.max !== 0 ? this.evict(!1) : this.free.length !== 0 ? this.free.pop() : this.initialFill++;
  }
  pop() {
    if (this.size) {
      const e = this.valList[this.head];
      return this.evict(!0), e;
    }
  }
  evict(e) {
    const t = this.head, r = this.keyList[t], n = this.valList[t];
    return this.isBackgroundFetch(n) ? n.__abortController.abort(new Error("evicted")) : (this.dispose(n, r, "evict"), this.disposeAfter && this.disposed.push([n, r, "evict"])), this.removeItemSize(t), e && (this.keyList[t] = null, this.valList[t] = null, this.free.push(t)), this.head = this.next[t], this.keyMap.delete(r), this.size--, t;
  }
  has(e, { updateAgeOnHas: t = this.updateAgeOnHas, status: r } = {}) {
    const n = this.keyMap.get(e);
    if (n !== void 0)
      if (this.isStale(n))
        r && (r.has = "stale", this.statusTTL(r, n));
      else return t && this.updateItemAge(n), r && (r.has = "hit"), this.statusTTL(r, n), !0;
    else r && (r.has = "miss");
    return !1;
  }
  // like get(), but without any LRU updating or TTL expiration
  peek(e, { allowStale: t = this.allowStale } = {}) {
    const r = this.keyMap.get(e);
    if (r !== void 0 && (t || !this.isStale(r))) {
      const n = this.valList[r];
      return this.isBackgroundFetch(n) ? n.__staleWhileFetching : n;
    }
  }
  backgroundFetch(e, t, r, n) {
    const a = t === void 0 ? void 0 : this.valList[t];
    if (this.isBackgroundFetch(a))
      return a;
    const o = new he();
    r.signal && r.signal.addEventListener(
      "abort",
      () => o.abort(r.signal.reason)
    );
    const u = {
      signal: o.signal,
      options: r,
      context: n
    }, c = (m, f = !1) => {
      const { aborted: _ } = o.signal, g = r.ignoreFetchAbort && m !== void 0;
      return r.status && (_ && !f ? (r.status.fetchAborted = !0, r.status.fetchError = o.signal.reason, g && (r.status.fetchAbortIgnored = !0)) : r.status.fetchResolved = !0), _ && !g && !f ? l(o.signal.reason) : (this.valList[t] === d && (m === void 0 ? d.__staleWhileFetching ? this.valList[t] = d.__staleWhileFetching : this.delete(e) : (r.status && (r.status.fetchUpdated = !0), this.set(e, m, u.options))), m);
    }, i = (m) => (r.status && (r.status.fetchRejected = !0, r.status.fetchError = m), l(m)), l = (m) => {
      const { aborted: f } = o.signal, _ = f && r.allowStaleOnFetchAbort, g = _ || r.allowStaleOnFetchRejection, C = g || r.noDeleteOnFetchRejection;
      if (this.valList[t] === d && (!C || d.__staleWhileFetching === void 0 ? this.delete(e) : _ || (this.valList[t] = d.__staleWhileFetching)), g)
        return r.status && d.__staleWhileFetching !== void 0 && (r.status.returnedStale = !0), d.__staleWhileFetching;
      if (d.__returned === d)
        throw m;
    }, h = (m, f) => {
      this.fetchMethod(e, a, u).then((_) => m(_), f), o.signal.addEventListener("abort", () => {
        (!r.ignoreFetchAbort || r.allowStaleOnFetchAbort) && (m(), r.allowStaleOnFetchAbort && (m = (_) => c(_, !0)));
      });
    };
    r.status && (r.status.fetchDispatched = !0);
    const d = new Promise(h).then(c, i);
    return d.__abortController = o, d.__staleWhileFetching = a, d.__returned = null, t === void 0 ? (this.set(e, d, { ...u.options, status: void 0 }), t = this.keyMap.get(e)) : this.valList[t] = d, d;
  }
  isBackgroundFetch(e) {
    return e && typeof e == "object" && typeof e.then == "function" && Object.prototype.hasOwnProperty.call(
      e,
      "__staleWhileFetching"
    ) && Object.prototype.hasOwnProperty.call(e, "__returned") && (e.__returned === e || e.__returned === null);
  }
  // this takes the union of get() and set() opts, because it does both
  async fetch(e, {
    // get options
    allowStale: t = this.allowStale,
    updateAgeOnGet: r = this.updateAgeOnGet,
    noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
    // set options
    ttl: a = this.ttl,
    noDisposeOnSet: o = this.noDisposeOnSet,
    size: u = 0,
    sizeCalculation: c = this.sizeCalculation,
    noUpdateTTL: i = this.noUpdateTTL,
    // fetch exclusive options
    noDeleteOnFetchRejection: l = this.noDeleteOnFetchRejection,
    allowStaleOnFetchRejection: h = this.allowStaleOnFetchRejection,
    ignoreFetchAbort: d = this.ignoreFetchAbort,
    allowStaleOnFetchAbort: m = this.allowStaleOnFetchAbort,
    fetchContext: f = this.fetchContext,
    forceRefresh: _ = !1,
    status: g,
    signal: C
  } = {}) {
    if (!this.fetchMethod)
      return g && (g.fetch = "get"), this.get(e, {
        allowStale: t,
        updateAgeOnGet: r,
        noDeleteOnStaleGet: n,
        status: g
      });
    const N = {
      allowStale: t,
      updateAgeOnGet: r,
      noDeleteOnStaleGet: n,
      ttl: a,
      noDisposeOnSet: o,
      size: u,
      sizeCalculation: c,
      noUpdateTTL: i,
      noDeleteOnFetchRejection: l,
      allowStaleOnFetchRejection: h,
      allowStaleOnFetchAbort: m,
      ignoreFetchAbort: d,
      status: g,
      signal: C
    };
    let w = this.keyMap.get(e);
    if (w === void 0) {
      g && (g.fetch = "miss");
      const x = this.backgroundFetch(e, w, N, f);
      return x.__returned = x;
    } else {
      const x = this.valList[w];
      if (this.isBackgroundFetch(x)) {
        const z = t && x.__staleWhileFetching !== void 0;
        return g && (g.fetch = "inflight", z && (g.returnedStale = !0)), z ? x.__staleWhileFetching : x.__returned = x;
      }
      const I = this.isStale(w);
      if (!_ && !I)
        return g && (g.fetch = "hit"), this.moveToTail(w), r && this.updateItemAge(w), this.statusTTL(g, w), x;
      const A = this.backgroundFetch(e, w, N, f), P = A.__staleWhileFetching !== void 0, S = P && t;
      return g && (g.fetch = P && I ? "stale" : "refresh", S && I && (g.returnedStale = !0)), S ? A.__staleWhileFetching : A.__returned = A;
    }
  }
  get(e, {
    allowStale: t = this.allowStale,
    updateAgeOnGet: r = this.updateAgeOnGet,
    noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
    status: a
  } = {}) {
    const o = this.keyMap.get(e);
    if (o !== void 0) {
      const u = this.valList[o], c = this.isBackgroundFetch(u);
      return this.statusTTL(a, o), this.isStale(o) ? (a && (a.get = "stale"), c ? (a && (a.returnedStale = t && u.__staleWhileFetching !== void 0), t ? u.__staleWhileFetching : void 0) : (n || this.delete(e), a && (a.returnedStale = t), t ? u : void 0)) : (a && (a.get = "hit"), c ? u.__staleWhileFetching : (this.moveToTail(o), r && this.updateItemAge(o), u));
    } else a && (a.get = "miss");
  }
  connect(e, t) {
    this.prev[t] = e, this.next[e] = t;
  }
  moveToTail(e) {
    e !== this.tail && (e === this.head ? this.head = this.next[e] : this.connect(this.prev[e], this.next[e]), this.connect(this.tail, e), this.tail = e);
  }
  get del() {
    return tt("del", "delete"), this.delete;
  }
  delete(e) {
    let t = !1;
    if (this.size !== 0) {
      const r = this.keyMap.get(e);
      if (r !== void 0)
        if (t = !0, this.size === 1)
          this.clear();
        else {
          this.removeItemSize(r);
          const n = this.valList[r];
          this.isBackgroundFetch(n) ? n.__abortController.abort(new Error("deleted")) : (this.dispose(n, e, "delete"), this.disposeAfter && this.disposed.push([n, e, "delete"])), this.keyMap.delete(e), this.keyList[r] = null, this.valList[r] = null, r === this.tail ? this.tail = this.prev[r] : r === this.head ? this.head = this.next[r] : (this.next[this.prev[r]] = this.next[r], this.prev[this.next[r]] = this.prev[r]), this.size--, this.free.push(r);
        }
    }
    if (this.disposed)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
    return t;
  }
  clear() {
    for (const e of this.rindexes({ allowStale: !0 })) {
      const t = this.valList[e];
      if (this.isBackgroundFetch(t))
        t.__abortController.abort(new Error("deleted"));
      else {
        const r = this.keyList[e];
        this.dispose(t, r, "delete"), this.disposeAfter && this.disposed.push([t, r, "delete"]);
      }
    }
    if (this.keyMap.clear(), this.valList.fill(null), this.keyList.fill(null), this.ttls && (this.ttls.fill(0), this.starts.fill(0)), this.sizes && this.sizes.fill(0), this.head = 0, this.tail = 0, this.initialFill = 1, this.free.length = 0, this.calculatedSize = 0, this.size = 0, this.disposed)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
  }
  get reset() {
    return tt("reset", "clear"), this.clear;
  }
  get length() {
    return Dn("length", "size"), this.size;
  }
  static get AbortController() {
    return he;
  }
  static get AbortSignal() {
    return Js;
  }
}
class zn {
  value;
  next;
  constructor(e) {
    this.value = e;
  }
}
class Un {
  #e;
  #t;
  #r;
  constructor() {
    this.clear();
  }
  enqueue(e) {
    const t = new zn(e);
    this.#e ? (this.#t.next = t, this.#t = t) : (this.#e = t, this.#t = t), this.#r++;
  }
  dequeue() {
    const e = this.#e;
    if (e)
      return this.#e = this.#e.next, this.#r--, this.#e || (this.#t = void 0), e.value;
  }
  peek() {
    if (this.#e)
      return this.#e.value;
  }
  clear() {
    this.#e = void 0, this.#t = void 0, this.#r = 0;
  }
  get size() {
    return this.#r;
  }
  *[Symbol.iterator]() {
    let e = this.#e;
    for (; e; )
      yield e.value, e = e.next;
  }
  *drain() {
    for (; this.#e; )
      yield this.dequeue();
  }
}
function Gn(s) {
  Mr(s);
  const e = new Un();
  let t = 0;
  const r = () => {
    t < s && e.size > 0 && (t++, e.dequeue()());
  }, n = () => {
    t--, r();
  }, a = async (c, i, l) => {
    const h = (async () => c(...l))();
    i(h);
    try {
      await h;
    } catch {
    }
    n();
  }, o = (c, i, l) => {
    new Promise((h) => {
      e.enqueue(h);
    }).then(a.bind(void 0, c, i, l)), t < s && r();
  }, u = (c, ...i) => new Promise((l) => {
    o(c, l, i);
  });
  return Object.defineProperties(u, {
    activeCount: {
      get: () => t
    },
    pendingCount: {
      get: () => e.size
    },
    clearQueue: {
      value() {
        e.clear();
      }
    },
    concurrency: {
      get: () => s,
      set(c) {
        Mr(c), s = c, queueMicrotask(() => {
          for (; t < s && e.size > 0; )
            r();
        });
      }
    },
    map: {
      async value(c, i) {
        const l = Array.from(c, (h, d) => this(i, h, d));
        return Promise.all(l);
      }
    }
  }), u;
}
function Mr(s) {
  if (!((Number.isInteger(s) || s === Number.POSITIVE_INFINITY) && s > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
}
class O {
  constructor(e, t, r) {
    this.ableton = e, this.ns = t, this.nsid = r;
  }
  transformers = {};
  cachedProps = {};
  async get(e, t) {
    const r = t ?? !!this.cachedProps[e], n = await this.ableton.getProp(
      this.ns,
      this.nsid,
      String(e),
      r
    ), a = this.transformers[e];
    return n !== null && a ? a(n) : n;
  }
  async set(e, t) {
    return this.ableton.setProp(this.ns, this.nsid, String(e), t);
  }
  /**
   * Returns readable property names discovered on the Live object via introspection.
   *
   * This is mainly for exploring Live's API, and not all properties might be fully
   * supported by Ableton.js yet.
   */
  async getAvailableProperties() {
    return this.sendCommand("get_available_properties");
  }
  /**
   * Returns observable property names (Live `add_<prop>_listener` APIs).
   *
   * This is mainly for exploring Live's API, and not all properties might be fully
   * supported by Ableton.js yet.
   */
  async getObservableProperties() {
    return this.sendCommand("get_observable_properties");
  }
  /**
   * Returns callable method names discovered on the Live object via introspection.
   *
   * This is mainly for exploring Live's API, and not all functions might be fully
   * supported by Ableton.js yet.
   */
  async getAvailableFunctions() {
    return this.sendCommand("get_available_functions");
  }
  async addListener(e, t) {
    const r = this.transformers[e];
    return this.ableton.addPropListener(
      this.ns,
      this.nsid,
      String(e),
      (n) => {
        t(n !== null && r ? r(n) : n);
      }
    );
  }
  /**
   * Sends a raw function invocation to Ableton.
   * This should be used with caution.
   */
  async sendCommand(e, t, r, n) {
    return this.ableton.sendCommand({
      ns: this.ns,
      nsid: this.nsid,
      name: e,
      args: t,
      etag: r,
      timeout: n
    });
  }
  /**
   * Sends a raw function invocation to Ableton and expects the
   * result to be a CacheResponse with `data` and an `etag`.
   */
  async sendCachedCommand(e, t) {
    return this.ableton.sendCachedCommand({
      ns: this.ns,
      nsid: this.nsid,
      name: e,
      args: t
    });
  }
}
class F extends O {
  constructor(e, t) {
    super(e, "device-parameter", t.id), this.raw = t;
  }
}
class Zs extends O {
  constructor(e, t) {
    super(e, "chain-mixer-device", t.id), this.raw = t, this.transformers = {
      chain_activator: (r) => new F(e, r),
      panning: (r) => r ? new F(e, r) : null,
      sends: (r) => r.map((n) => new F(e, n)),
      volume: (r) => r ? new F(e, r) : null
    };
  }
}
class Q extends O {
  constructor(e, t) {
    super(e, "chain", t.id), this.raw = t, this.transformers = {
      devices: (r) => r.map((n) => K(e, n)),
      mixer_device: (r) => new Zs(e, r)
    }, this.cachedProps = {
      devices: !0,
      mixer_device: !0
    };
  }
  /**
   * Delete a device identified by its index in this chain's `devices` list.
   */
  deleteDevice(e) {
    return this.sendCommand("delete_device", { index: e });
  }
  /** Duplicate the device at `index` in this chain. */
  duplicateDevice(e) {
    return this.sendCommand("duplicate_device", { index: e });
  }
  /**
   * Insert a native Live device by UI name at `deviceIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const r = await this.sendCommand("insert_device", {
      device_name: e,
      device_index: t
    });
    return K(this.ableton, r);
  }
}
class en extends O {
  constructor(e, t) {
    super(e, "drum-chain", t.id), this.raw = t, this.transformers = {
      devices: (r) => r.map((n) => K(e, n)),
      mixer_device: (r) => new Zs(e, r)
    }, this.cachedProps = {
      devices: !0,
      mixer_device: !0
    };
  }
  /**
   * Delete a device identified by its index in this chain's `devices` list.
   */
  deleteDevice(e) {
    return this.sendCommand("delete_device", { index: e });
  }
  /** Duplicate the device at `index` in this chain. */
  duplicateDevice(e) {
    return this.sendCommand("duplicate_device", { index: e });
  }
  /**
   * Insert a native Live device by UI name at `deviceIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const r = await this.sendCommand("insert_device", {
      device_name: e,
      device_index: t
    });
    return K(this.ableton, r);
  }
}
function ue(s, e) {
  return e.is_drum_chain ? new en(s, e) : new Q(s, e);
}
class Z extends O {
  constructor(e, t) {
    super(e, "drum-pad", t.id), this.raw = t, this.transformers = {
      chains: (r) => r.map((n) => new en(e, n))
    }, this.cachedProps = {
      chains: !0
    };
  }
  /** Deletes all chains on this pad (same as clearing a drum rack pad in Live). */
  deleteAllChains() {
    return this.sendCommand("delete_all_chains");
  }
}
class rr extends O {
  constructor(e, t) {
    super(e, "device-view", t);
  }
}
const Mn = "Looper";
class Hn extends O {
  constructor(e, t) {
    super(e, "looper-device", t.id), this.raw = t, this.view = new rr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new Z(e, n)),
      parameters: (r) => r.map((n) => new F(e, n)),
      return_chains: (r) => r.map((n) => new Q(e, n))
    }, this.cachedProps = {
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0
    };
  }
  view;
  /** Erase Looper's recorded content. */
  clear() {
    return this.sendCommand("clear");
  }
  /** Double the length of Looper's buffer. */
  doubleLength() {
    return this.sendCommand("double_length");
  }
  /** Double the speed of Looper's playback. */
  doubleSpeed() {
    return this.sendCommand("double_speed");
  }
  /** Export Looper's content to a Session Clip Slot. */
  exportToClipSlot(e) {
    return this.sendCommand("export_to_clip_slot", {
      slot_id: e.raw.id
    });
  }
  /** Halve the length of Looper's buffer. */
  halfLength() {
    return this.sendCommand("half_length");
  }
  /** Halve the speed of Looper's playback. */
  halfSpeed() {
    return this.sendCommand("half_speed");
  }
  /** Play back while adding additional layers of incoming audio. */
  overdub() {
    return this.sendCommand("overdub");
  }
  /** Play back without overdubbing. */
  play() {
    return this.sendCommand("play");
  }
  /** Record incoming audio. */
  record() {
    return this.sendCommand("record");
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Stop Looper's playback. */
  stop() {
    return this.sendCommand("stop");
  }
  /** Set the selected bank in the device for persistency. */
  storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
  /**
   * Erase everything that was recorded since the last time Overdub was enabled.
   * Calling a second time will restore the material erased by the previous undo
   * operation.
   */
  undo() {
    return this.sendCommand("undo");
  }
}
const Bn = "PluginDevice";
class Vn extends O {
  constructor(e, t) {
    super(e, "plugin-device", t.id), this.raw = t, this.view = new rr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new Z(e, n)),
      parameters: (r) => r.map((n) => new F(e, n)),
      return_chains: (r) => r.map((n) => new Q(e, n))
    }, this.cachedProps = {
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0
    };
  }
  view;
  /**
   * Get the range of plugin parameter names, bound by begin and end.
   * If end is smaller than 0 it is interpreted as the parameter count.
   */
  getParameterNames(e = 0, t = -1) {
    return this.sendCommand("get_parameter_names", { begin: e, end: t });
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Set the selected bank in the device for persistency. */
  storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
}
class Wn extends O {
  constructor(e, t) {
    super(e, "rack-device-view", t), this.transformers = {
      selected_chain: (r) => r ? ue(e, r) : null,
      selected_drum_pad: (r) => r ? new Z(e, r) : null
    }, this.cachedProps = {
      selected_chain: !0,
      selected_drum_pad: !0
    };
  }
}
const Xn = [
  "InstrumentGroupDevice",
  "DrumGroupDevice",
  "AudioEffectGroupDevice",
  "MidiEffectGroupDevice"
];
class Yn extends O {
  constructor(e, t) {
    super(e, "rack-device", t.id), this.raw = t, this.view = new Wn(e, t.id), this.transformers = {
      chain_selector: (r) => r ? new F(e, r) : null,
      chains: (r) => r.map((n) => ue(e, n)),
      drum_pads: (r) => r.map((n) => new Z(e, n)),
      parameters: (r) => r.map((n) => new F(e, n)),
      return_chains: (r) => r.map((n) => ue(e, n)),
      visible_drum_pads: (r) => r.map((n) => new Z(e, n))
    }, this.cachedProps = {
      chain_selector: !0,
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0,
      visible_drum_pads: !0
    };
  }
  view;
  /** Increases the number of visible macro controls in the rack. */
  addMacro() {
    return this.sendCommand("add_macro");
  }
  /**
   * Copies all contents of a drum pad from a source pad into a destination pad.
   * Indices are note numbers (0–127). Throws if the source pad is empty or
   * indices are out of range.
   */
  copyPad(e, t) {
    return this.sendCommand("copy_pad", {
      source_index: e,
      destination_index: t
    });
  }
  /** Deletes the currently selected macro variation. */
  deleteSelectedVariation() {
    return this.sendCommand("delete_selected_variation");
  }
  /**
   * Inserts a new chain at `index`, or at the end when `index` is `-1`
   * (default).
   */
  async insertChain(e = -1) {
    const t = await this.sendCommand("insert_chain", { index: e });
    return ue(this.ableton, t);
  }
  /** Randomizes values for all macro controls not excluded from randomization. */
  randomizeMacros() {
    return this.sendCommand("randomize_macros");
  }
  /** Recalls the macro variation that was recalled most recently. */
  recallLastUsedVariation() {
    return this.sendCommand("recall_last_used_variation");
  }
  /** Recalls the currently selected macro variation. */
  recallSelectedVariation() {
    return this.sendCommand("recall_selected_variation");
  }
  /** Decreases the number of visible macro controls in the rack. */
  removeMacro() {
    return this.sendCommand("remove_macro");
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Set the selected bank in the device for persistency. */
  storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
  /** Stores a new variation of the values of all currently mapped macros. */
  storeVariation() {
    return this.sendCommand("store_variation");
  }
}
function Jn(s) {
  return Xn.includes(s);
}
function K(s, e) {
  return e.class_name === Mn ? new Hn(s, e) : e.class_name === Bn ? new Vn(s, e) : Jn(e.class_name) ? new Yn(s, e) : new Qn(s, e);
}
class Qn extends O {
  constructor(e, t) {
    super(e, "device", t.id), this.raw = t, this.view = new rr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new Z(e, n)),
      parameters: (r) => r.map((n) => new F(e, n)),
      return_chains: (r) => r.map((n) => new Q(e, n))
    }, this.cachedProps = {
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0
    };
  }
  view;
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Sets the selected bank in the device for persistency. */
  storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
}
class me {
  color;
  constructor(e) {
    if (typeof e == "number")
      this.color = e.toString(16).padStart(6, "0");
    else if (e.length === 6 || e.length === 7)
      this.color = e.replace("#", "");
    else
      throw new Error("Color " + e + " is not in a valid format");
  }
  get hex() {
    return `#${this.color}`;
  }
  get rgb() {
    return {
      r: parseInt(this.color.substr(0, 2), 16),
      g: parseInt(this.color.substr(2, 2), 16),
      b: parseInt(this.color.substr(4, 2), 16)
    };
  }
  get numberRepresentation() {
    return parseInt(this.color, 16);
  }
  toString() {
    return this.hex;
  }
  toJSON() {
    return this.numberRepresentation;
  }
}
class Hr extends O {
  constructor(e, t) {
    super(e, "envelope", t.id), this.raw = t, this.transformers = {
      parameter: (r) => new F(e, r)
    }, this.cachedProps = {
      parameter: !0
    };
  }
  /**
   * Creates a new event at the specified time with the given value and,
   * optionally, control coefficients.
   */
  createEvent(e, t, r) {
    return this.sendCommand("create_event", {
      time: e,
      value: t,
      control_coefficients: r
    });
  }
  /**
   * Deletes the events in the specified time range.
   */
  deleteEventsInRange(e, t) {
    return this.sendCommand("delete_events_in_range", {
      from_time: e,
      to_time: t
    });
  }
  /**
   * Returns the events in the specified time range.
   */
  eventsInRange(e, t) {
    return this.sendCommand("events_in_range", {
      from_time: e,
      to_time: t
    });
  }
  /**
   * Given a start time, a step length and a value, creates a step in the envelope.
   */
  insertStep(e, t, r) {
    return this.sendCommand("insert_step", {
      start_time: e,
      length: t,
      value: r
    });
  }
  /**
   * Returns the parameter value at the specified time.
   */
  valueAtTime(e) {
    return this.sendCommand("value_at_time", { time: e });
  }
}
const rt = (s) => ({
  pitch: s[0],
  time: s[1],
  duration: s[2],
  velocity: s[3],
  muted: s[4]
}), Br = (s) => [
  s.pitch,
  s.time,
  s.duration,
  s.velocity,
  s.muted
];
class B extends O {
  constructor(e, t) {
    super(e, "clip", t.id), this.raw = t, this.transformers = {
      color: (r) => new me(r),
      notes: (r) => r.map(rt)
    };
  }
  /**
   * Available for audio clips only.
   * Converts the given beat time to sample time.
   * Raises an error if the sample is not warped.
   */
  beatToSampleTime(e) {
    return this.sendCommand("beat_to_sample_time", [e]);
  }
  /**
   * Clears all envelopes for this clip.
   */
  clearAllEnvelopes() {
    return this.sendCommand("clear_all_envelopes");
  }
  /**
   * Returns the envelope for the given parameter, or `null` if it does not
   * exist. Arrangement clips and parameters from another track always return `null`.
   */
  async automationEnvelope(e) {
    const t = await this.sendCommand("automation_envelope", {
      parameter_id: e.raw.id
    });
    return t ? new Hr(this.ableton, t) : null;
  }
  /**
   * Clears the envelope of this clip's given parameter.
   */
  clearEnvelope(e) {
    return this.sendCommand("clear_envelope", {
      parameter_id: e.raw.id
    });
  }
  /**
   * Creates an envelope for a given parameter and returns it.
   * This should only be used if the envelope doesn't exist.
   * Raises an error if the envelope can't be created.
   */
  async createAutomationEnvelope(e) {
    const t = await this.sendCommand("create_automation_envelope", {
      parameter_id: e.raw.id
    });
    return new Hr(this.ableton, t);
  }
  /**
   * Crops the clip. The region that is cropped depends on whether
   * the clip is looped or not. If looped, the region outside of
   * the loop is removed. If not looped, the region outside
   * the start and end markers is removed.
   */
  crop() {
    return this.sendCommand("crop");
  }
  /**
   * Deselects all notes present in the clip.
   */
  deselectAllNotes() {
    return this.sendCommand("deselect_all_notes");
  }
  /**
   * Makes the loop twice as long and duplicates notes and envelopes.
   * Duplicates the clip start/end range if the clip is not looped.
   */
  duplicateLoop() {
    return this.sendCommand("duplicate_loop");
  }
  /**
   * Duplicates the notes in the specified region to the destination_time.
   * Only notes of the specified pitch are duplicated if pitch is not -1.
   * If the transposition_amount is not 0, the notes in the region will be
   * transposed by the transposition_amount of semitones.
   * Raises an error on audio clips.
   */
  duplicateRegion(e, t, r, n = -1, a = 0) {
    return this.sendCommand("duplicate_region", [
      e,
      t,
      r,
      n,
      a
    ]);
  }
  /**
   * Starts playing this clip.
   */
  fire() {
    return this.sendCommand("fire");
  }
  /**
   * Returns all notes that match the given range.
   */
  async getNotes(e, t, r, n) {
    return (await this.sendCommand("get_notes", {
      from_time: e,
      from_pitch: t,
      time_span: r,
      pitch_span: n
    })).map(rt);
  }
  /**
   * Returns all notes matching the given range with extended properties.
   * Compared to getNotes, this method returns additional note information.
   */
  async getNotesExtended(e, t, r, n) {
    return this.sendCommand("get_notes_extended", {
      from_pitch: t,
      pitch_span: n,
      from_time: e,
      time_span: r
    });
  }
  /**
   * Returns the clip's currently selected notes.
   */
  async getSelectedNotes() {
    return (await this.sendCommand("get_selected_notes")).map(rt);
  }
  /**
   * Returns the clip's currently selected notes with extended properties.
   */
  async getSelectedNotesExtended() {
    return this.sendCommand("get_selected_notes_extended");
  }
  /**
   *  Available since Live 11.0. Replaces modifying notes with remove_notes followed by set_notes.
   */
  applyNoteModifications(e) {
    return this.sendCommand("apply_note_modifications", { notes: e });
  }
  /**
   * Jump forward or backward by the specified relative amount in beats.
   * Will do nothing if the clip is not playing.
   */
  movePlayingPos(e) {
    return this.sendCommand("move_playing_pos", [e]);
  }
  /**
   * Quantizes all notes in a clip or aligns warp markers.
   */
  quantize(e, t) {
    return this.sendCommand("quantize", [e, t]);
  }
  /**
   * Quantizes all the notes of a given pitch.
   */
  quantizePitch(e, t, r) {
    return this.sendCommand("quantize_pitch", [e, t, r]);
  }
  /**
   * Deletes all notes that start in the given area.
   *
   * @deprecated starting with Live 11, use `removeNotesExtended` instead
   */
  removeNotes(e, t, r, n) {
    return this.sendCommand("remove_notes", [
      e,
      t,
      r,
      n
    ]);
  }
  /**
   * Deletes all notes that start in the given area.
   */
  removeNotesExtended(e, t, r, n) {
    return this.sendCommand("remove_notes_extended", [
      t,
      n,
      e,
      r
    ]);
  }
  /**
   * Remove notes by given note ids.
   * Available since Live 11.0.
   */
  removeNotesById(e) {
    return this.sendCommand("remove_notes_by_id", [e]);
  }
  /**
   * Replaces selected notes with an array of new notes.
   */
  replaceSelectedNotes(e) {
    return this.sendCommand("replace_selected_notes", {
      notes: e.map(Br)
    });
  }
  /**
   * Available for audio clips only.
   * Converts the given sample time to beat time.
   * Raises an error if the sample is not warped.
   */
  sampleToBeatTime(e) {
    return this.sendCommand("sample_to_beat_time", [e]);
  }
  /**
   * Scrubs inside a clip.
   * `position` defines the position in beats that the scrub will start from.
   * The scrub will continue until `stop_scrub` is called.
   * Global quantization applies to the scrub's position and length.
   */
  scrub(e) {
    return this.sendCommand("scrub", [e]);
  }
  /**
   * Available for audio clips only.
   * Converts the given seconds to sample time.
   * Raises an error if the sample is warped.
   */
  secondsToSampleTime(e) {
    return this.sendCommand("seconds_to_sample_time", [e]);
  }
  /**
   * Selects all notes present in the clip.
   */
  selectAllNotes() {
    return this.sendCommand("select_all_notes");
  }
  /**
   * Set the clip's fire button state directly.
   * Supports all launch modes.
   */
  setFireButtonState(e) {
    return this.sendCommand("set_fire_button_state", [e]);
  }
  /**
   * Adds the given notes to the clip.
   */
  setNotes(e) {
    return this.sendCommand("set_notes", { notes: e.map(Br) });
  }
  /**
   * Stop playig this clip.
   */
  stop() {
    return this.sendCommand("stop");
  }
  /**
   * Stops the current scrub.
   */
  stopScrub() {
    return this.sendCommand("stop_scrub");
  }
}
class sr extends O {
  constructor(e, t) {
    super(e, "clip_slot", t.id), this.raw = t, this.transformers = {
      clip: (r) => r ? new B(e, r) : null,
      color: (r) => new me(r)
    }, this.cachedProps = {
      clip: !0
    };
  }
  /**
   * Creates an empty clip with the given length in the slot.
   * Throws an error when called on non-empty slots or slots in non-MIDI tracks.
   */
  createClip(e) {
    return this.sendCommand("create_clip", [e]);
  }
  /**
   * Removes the clip contained in the slot.
   * Raises an exception if the slot was empty.
   */
  deleteClip() {
    return this.sendCommand("delete_clip");
  }
  duplicateClipTo(e) {
    return this.sendCommand("duplicate_clip_to", { slot_id: e.raw.id });
  }
  /**
   * Fire a Clip if this Clipslot owns one,
   * else trigger the stop button, if we have one.
   */
  fire() {
    return this.sendCommand("fire");
  }
  /**
   * Set the ClipSlot's fire button state directly.
   * Supports all launch modes.
   */
  setFireButtonState(e) {
    return this.sendCommand("set_fire_button_state", [e]);
  }
  /**
   * Stop playing the contained Clip,
   * if there is a Clip and its currently playing.
   */
  stop() {
    return this.sendCommand("stop");
  }
}
class Kn extends O {
  constructor(e, t) {
    super(e, "mixer-device", t.id), this.raw = t, this.transformers = {
      crossfader: (r) => new F(e, r),
      cue_volume: (r) => new F(e, r),
      left_split_stereo: (r) => new F(e, r),
      panning: (r) => new F(e, r),
      right_split_stereo: (r) => new F(e, r),
      sends: (r) => r.map((n) => new F(e, n)),
      song_tempo: (r) => new F(e, r),
      track_activator: (r) => new F(e, r),
      volume: (r) => new F(e, r)
    };
  }
}
class Zn extends O {
  constructor(e, t) {
    super(e, "track-view", t), this.transformers = {
      selected_device: (r) => K(e, r)
    }, this.cachedProps = {
      selected_device: !0
    };
  }
  /**
   * Selects the track's instrument if it has one.
   */
  async selectInstrument() {
    return this.sendCommand("select_instrument");
  }
}
class Vr extends O {
  constructor(e, t) {
    super(e, "take-lane", t.id), this.raw = t, this.transformers = {
      arrangement_clips: (r) => r.map((n) => new B(e, n))
    }, this.cachedProps = {
      arrangement_clips: !0
    };
  }
  /** Creates an audio clip in this take lane's arrangement at `startTime`. */
  async createAudioClip(e, t) {
    const r = await this.sendCommand("create_audio_clip", {
      file_path: e,
      start_time: t
    });
    return new B(this.ableton, r);
  }
  /** Creates an empty MIDI clip in this take lane's arrangement. */
  async createMidiClip(e, t) {
    const r = await this.sendCommand("create_midi_clip", {
      start_time: e,
      length: t
    });
    return new B(this.ableton, r);
  }
}
class H extends O {
  constructor(e, t) {
    super(e, "track", t.id), this.raw = t, this.view = new Zn(this.ableton, t.id), this.transformers = {
      arrangement_clips: (r) => r.map((n) => new B(e, n)),
      color: (r) => new me(r),
      devices: (r) => r.map((n) => K(e, n)),
      clip_slots: (r) => r.map((n) => new sr(e, n)),
      group_track: (r) => r ? new H(e, r) : null,
      mixer_device: (r) => new Kn(e, r),
      take_lanes: (r) => r.map((n) => new Vr(e, n))
    }, this.cachedProps = {
      arrangement_clips: !0,
      devices: !0,
      clip_slots: !0,
      group_track: !0,
      take_lanes: !0
    };
  }
  view;
  /**
   * Duplicates the given clip into the arrangement of this track at the provided destination time and returns it.
   * When the type of the clip and the type of the track are incompatible, a runtime error is raised.
   */
  async duplicateClipToArrangement(e, t) {
    const r = await this.sendCommand("duplicate_clip_to_arrangement", {
      clip_id: typeof e == "string" ? e : e.raw.id,
      time: t
    });
    return new B(this.ableton, r);
  }
  /**
   * Deletes the given clip from the arrangement of this track.
   * Raises a runtime error when the clip belongs to another track
   */
  async deleteClip(e) {
    return this.sendCommand("delete_clip", {
      clip_id: typeof e == "string" ? e : e.raw.id
    });
  }
  /**
   * Delete a device identified by the index in the 'devices' list of current track
   */
  async deleteDevice(e) {
    return this.sendCommand("delete_device", [e]);
  }
  /**
   * Duplicates the device at `index` in this track's device chain.
   */
  async duplicateDevice(e) {
    return this.sendCommand("duplicate_device", { index: e });
  }
  /**
   * Duplicates the clip slot at `index` into the next free slot.
   * Returns the destination slot index (creates a scene if needed).
   */
  async duplicateClipSlot(e) {
    return this.sendCommand("duplicate_clip_slot", { index: e });
  }
  /**
   * Creates a take lane for this track (Arrangement View comping).
   */
  async createTakeLane() {
    const e = await this.sendCommand("create_take_lane");
    return new Vr(this.ableton, e);
  }
  /**
   * Inserts a native Live device by UI name at `targetIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const r = await this.sendCommand("insert_device", {
      device_name: e,
      target_index: t
    });
    return K(this.ableton, r);
  }
  /**
   * Jumps forward/backward in the currently running Session clip by `beats`.
   */
  async jumpInRunningSessionClip(e) {
    return this.sendCommand("jump_in_running_session_clip", { beats: e });
  }
  /** Stops playing all fired clips on this track. */
  async stopAllClips(e = !0) {
    return this.sendCommand("stop_all_clips", { quantized: e });
  }
  async getData(e) {
    return this.sendCachedCommand("get_data", { key: e });
  }
  async setData(e, t) {
    return this.sendCommand("set_data", { key: e, value: t });
  }
  /**
   * Creates an audio clip referencing `filePath` and inserts it into the
   * arrangement at `position`. Only works on audio tracks.
   */
  async createAudioClip(e, t) {
    const r = await this.sendCommand("create_audio_clip", {
      file_path: e,
      position: t
    });
    return new B(this.ableton, r);
  }
  /**
   * Creates an empty MIDI clip in the arrangement at the specified time.
   * Only works on MIDI tracks. Throws an error if the track is frozen
   * or if the track is currently recording.
   * The time must be within the range [0, 1576800].
   *
   * Available since Live 12.2
   */
  async createMidiClip(e, t) {
    const r = await this.sendCommand("create_midi_clip", {
      start_time: e,
      length: t
    });
    return new B(this.ableton, r);
  }
}
class ei extends O {
  constructor(e, t) {
    super(e, "cue-point", t.id), this.raw = t;
  }
  async jump() {
    return this.sendCommand("jump");
  }
}
class Xt extends O {
  constructor(e, t) {
    super(e, "scene", t.id), this.raw = t, this.transformers = {
      color: (r) => new me(r),
      clip_slots: (r) => r.map((n) => new sr(this.ableton, n))
    }, this.cachedProps = {
      clip_slots: !0
    };
  }
  /**
   * Fire the scene directly. Will fire all clip slots
   * that this scene owns and select the scene itself.
   */
  async fire() {
    return this.sendCommand("fire");
  }
}
class ti extends O {
  constructor(e) {
    super(e, "song-view"), this.transformers = {
      selected_parameter: (t) => new F(e, t),
      selected_track: (t) => new H(e, t),
      selected_scene: (t) => new Xt(e, t),
      highlighted_clip_slot: (t) => new sr(e, t),
      detail_clip: (t) => new B(e, t)
    }, this.cachedProps = {
      detail_clip: !0,
      selected_parameter: !0,
      selected_track: !0,
      selected_scene: !0,
      highlighted_clip_slot: !0
    };
  }
  async selectDevice(e) {
    return this.ableton.sendCommand({
      ns: this.ns,
      name: "select_device",
      args: { device_id: e.raw.id }
    });
  }
}
class ri extends O {
  constructor(e, t) {
    super(e, "groove", t.id), this.raw = t;
  }
}
class si extends O {
  constructor(e) {
    super(e, "groove-pool"), this.transformers = {
      grooves: (t) => t.map((r) => new ri(e, r))
    }, this.cachedProps = {
      grooves: !0
    };
  }
}
class ni extends O {
  constructor(e, t) {
    super(e, "tuning-system", t.id), this.raw = t;
  }
}
class ii extends O {
  constructor(e) {
    super(e, "song"), this.transformers = {
      cue_points: (t) => t.map((r) => new ei(e, r)),
      master_track: (t) => new H(e, t),
      return_tracks: (t) => t.map((r) => new H(e, r)),
      tracks: (t) => t.map((r) => new H(e, r)),
      tuning_system: (t) => t ? new ni(e, t) : null,
      visible_tracks: (t) => t.map((r) => new H(e, r)),
      scenes: (t) => t.map((r) => new Xt(e, r))
    }, this.cachedProps = {
      cue_points: !0,
      master_track: !0,
      return_tracks: !0,
      tracks: !0,
      tuning_system: !0,
      visible_tracks: !0,
      scenes: !0
    };
  }
  view = new ti(this.ableton);
  groovePool = new si(this.ableton);
  async beginUndoStep() {
    return this.sendCommand("begin_undo_step");
  }
  async continuePlaying() {
    return this.sendCommand("continue_playing");
  }
  async createAudioTrack(e = -1) {
    const t = await this.sendCommand("create_audio_track", { index: e });
    return new H(this.ableton, t);
  }
  async createMidiTrack(e = -1) {
    const t = await this.sendCommand("create_midi_track", { index: e });
    return new H(this.ableton, t);
  }
  async createReturnTrack() {
    const e = await this.sendCommand("create_return_track");
    return new H(this.ableton, e);
  }
  async createScene(e = -1) {
    const t = await this.sendCommand("create_scene", { index: e });
    return new Xt(this.ableton, t);
  }
  async deleteReturnTrack(e) {
    return this.sendCommand("delete_return_track", [e]);
  }
  async deleteScene(e) {
    return this.sendCommand("delete_scene", [e]);
  }
  async deleteTrack(e) {
    return this.sendCommand("delete_track", [e]);
  }
  async duplicateScene(e) {
    return this.sendCommand("duplicate_scene", [e]);
  }
  async duplicateTrack(e) {
    return this.sendCommand("duplicate_track", [e]);
  }
  async endUndoStep() {
    return this.sendCommand("end_undo_step");
  }
  async getData(e) {
    return this.sendCachedCommand("get_data", { key: e });
  }
  async getCurrentSmpteSongTime(e) {
    return this.sendCommand("get_current_smpte_song_time", { timeFormat: e });
  }
  async isCuePointSelected() {
    return this.sendCommand("is_cue_point_selected");
  }
  async jumpBy(e) {
    return this.sendCommand("jump_by", [e]);
  }
  async jumpToNextCue() {
    return this.sendCommand("jump_to_next_cue");
  }
  async jumpToPrevCue() {
    return this.sendCommand("jump_to_prev_cue");
  }
  async playSelection() {
    return this.sendCommand("play_selection");
  }
  async reEnableAutomation() {
    return this.sendCommand("re_enable_automation");
  }
  async redo() {
    return this.sendCommand("redo");
  }
  async scrubBy(e) {
    return this.sendCommand("scrub_by", [e]);
  }
  async setData(e, t) {
    return this.sendCommand("set_data", [e, t]);
  }
  async setOrDeleteCue() {
    return this.sendCommand("set_or_delete_cue");
  }
  async startPlaying() {
    return this.sendCommand("start_playing");
  }
  async stopAllClips() {
    return this.sendCommand("stop_all_clips");
  }
  async stopPlaying() {
    return this.sendCommand("stop_playing");
  }
  /**
   * Only starts playing when Live is currently not playing
   * to prevent Live from jumping back to the start when it's
   * already playing.
   *
   * @returns a boolean indicating whether the command was executed
   */
  async safeStartPlaying() {
    return this.sendCommand("safe_start_playing");
  }
  /**
   * Only stops playback when Live is currently playing to prevent
   * Live jumping back to the beginning of the arrangement when it's
   * already stopped.
   *
   * @returns a boolean indicating whether the command was executed
   */
  async safeStopPlaying() {
    return this.sendCommand("safe_stop_playing");
  }
  async tapTempo() {
    return this.sendCommand("tap_tempo");
  }
  async undo() {
    return this.sendCommand("undo");
  }
}
const Yt = "5.0.0-3";
var oe = { exports: {} }, st, Wr;
function pe() {
  if (Wr) return st;
  Wr = 1;
  const s = "2.0.0", e = 256, t = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, r = 16, n = e - 6;
  return st = {
    MAX_LENGTH: e,
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_SAFE_INTEGER: t,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: s,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, st;
}
var nt, Xr;
function ge() {
  return Xr || (Xr = 1, nt = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  }), nt;
}
var Yr;
function ne() {
  return Yr || (Yr = 1, (function(s, e) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: t,
      MAX_SAFE_BUILD_LENGTH: r,
      MAX_LENGTH: n
    } = pe(), a = ge();
    e = s.exports = {};
    const o = e.re = [], u = e.safeRe = [], c = e.src = [], i = e.t = {};
    let l = 0;
    const h = "[a-zA-Z0-9-]", d = [
      ["\\s", 1],
      ["\\d", n],
      [h, r]
    ], m = (_) => {
      for (const [g, C] of d)
        _ = _.split(`${g}*`).join(`${g}{0,${C}}`).split(`${g}+`).join(`${g}{1,${C}}`);
      return _;
    }, f = (_, g, C) => {
      const N = m(g), w = l++;
      a(_, w, g), i[_] = w, c[w] = g, o[w] = new RegExp(g, C ? "g" : void 0), u[w] = new RegExp(N, C ? "g" : void 0);
    };
    f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f("MAINVERSION", `(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${c[i.NUMERICIDENTIFIER]}|${c[i.NONNUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${c[i.NUMERICIDENTIFIERLOOSE]}|${c[i.NONNUMERICIDENTIFIER]})`), f("PRERELEASE", `(?:-(${c[i.PRERELEASEIDENTIFIER]}(?:\\.${c[i.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${c[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[i.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${h}+`), f("BUILD", `(?:\\+(${c[i.BUILDIDENTIFIER]}(?:\\.${c[i.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${c[i.MAINVERSION]}${c[i.PRERELEASE]}?${c[i.BUILD]}?`), f("FULL", `^${c[i.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${c[i.MAINVERSIONLOOSE]}${c[i.PRERELEASELOOSE]}?${c[i.BUILD]}?`), f("LOOSE", `^${c[i.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${c[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${c[i.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:${c[i.PRERELEASE]})?${c[i.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:${c[i.PRERELEASELOOSE]})?${c[i.BUILD]}?)?)?`), f("XRANGE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), f("COERCE", `${c[i.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", c[i.COERCEPLAIN] + `(?:${c[i.PRERELEASE]})?(?:${c[i.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", c[i.COERCE], !0), f("COERCERTLFULL", c[i.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${c[i.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", f("TILDE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${c[i.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", f("CARET", `^${c[i.LONECARET]}${c[i.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${c[i.LONECARET]}${c[i.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${c[i.GTLT]}\\s*(${c[i.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]}|${c[i.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${c[i.XRANGEPLAIN]})\\s+-\\s+(${c[i.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${c[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[i.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(oe, oe.exports)), oe.exports;
}
var it, Jr;
function nr() {
  if (Jr) return it;
  Jr = 1;
  const s = Object.freeze({ loose: !0 }), e = Object.freeze({});
  return it = (r) => r ? typeof r != "object" ? s : r : e, it;
}
var at, Qr;
function tn() {
  if (Qr) return at;
  Qr = 1;
  const s = /^[0-9]+$/, e = (r, n) => {
    const a = s.test(r), o = s.test(n);
    return a && o && (r = +r, n = +n), r === n ? 0 : a && !o ? -1 : o && !a ? 1 : r < n ? -1 : 1;
  };
  return at = {
    compareIdentifiers: e,
    rcompareIdentifiers: (r, n) => e(n, r)
  }, at;
}
var ot, Kr;
function j() {
  if (Kr) return ot;
  Kr = 1;
  const s = ge(), { MAX_LENGTH: e, MAX_SAFE_INTEGER: t } = pe(), { safeRe: r, t: n } = ne(), a = nr(), { compareIdentifiers: o } = tn();
  class u {
    constructor(i, l) {
      if (l = a(l), i instanceof u) {
        if (i.loose === !!l.loose && i.includePrerelease === !!l.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > e)
        throw new TypeError(
          `version is longer than ${e} characters`
        );
      s("SemVer", i, l), this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease;
      const h = i.trim().match(l.loose ? r[n.LOOSE] : r[n.FULL]);
      if (!h)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +h[1], this.minor = +h[2], this.patch = +h[3], this.major > t || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > t || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > t || this.patch < 0)
        throw new TypeError("Invalid patch version");
      h[4] ? this.prerelease = h[4].split(".").map((d) => {
        if (/^[0-9]+$/.test(d)) {
          const m = +d;
          if (m >= 0 && m < t)
            return m;
        }
        return d;
      }) : this.prerelease = [], this.build = h[5] ? h[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (s("SemVer.compare", this.version, this.options, i), !(i instanceof u)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new u(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof u || (i = new u(i, this.options)), o(this.major, i.major) || o(this.minor, i.minor) || o(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof u || (i = new u(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let l = 0;
      do {
        const h = this.prerelease[l], d = i.prerelease[l];
        if (s("prerelease compare", l, h, d), h === void 0 && d === void 0)
          return 0;
        if (d === void 0)
          return 1;
        if (h === void 0)
          return -1;
        if (h === d)
          continue;
        return o(h, d);
      } while (++l);
    }
    compareBuild(i) {
      i instanceof u || (i = new u(i, this.options));
      let l = 0;
      do {
        const h = this.build[l], d = i.build[l];
        if (s("build compare", l, h, d), h === void 0 && d === void 0)
          return 0;
        if (d === void 0)
          return 1;
        if (h === void 0)
          return -1;
        if (h === d)
          continue;
        return o(h, d);
      } while (++l);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, l, h) {
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", l, h);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", l, h);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", l, h), this.inc("pre", l, h);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", l, h), this.inc("pre", l, h);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const d = Number(h) ? 1 : 0;
          if (!l && h === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [d];
          else {
            let m = this.prerelease.length;
            for (; --m >= 0; )
              typeof this.prerelease[m] == "number" && (this.prerelease[m]++, m = -2);
            if (m === -1) {
              if (l === this.prerelease.join(".") && h === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(d);
            }
          }
          if (l) {
            let m = [l, d];
            h === !1 && (m = [l]), o(this.prerelease[0], l) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return ot = u, ot;
}
var ct, Zr;
function ee() {
  if (Zr) return ct;
  Zr = 1;
  const s = j();
  return ct = (t, r, n = !1) => {
    if (t instanceof s)
      return t;
    try {
      return new s(t, r);
    } catch (a) {
      if (!n)
        return null;
      throw a;
    }
  }, ct;
}
var ut, es;
function ai() {
  if (es) return ut;
  es = 1;
  const s = ee();
  return ut = (t, r) => {
    const n = s(t, r);
    return n ? n.version : null;
  }, ut;
}
var ht, ts;
function oi() {
  if (ts) return ht;
  ts = 1;
  const s = ee();
  return ht = (t, r) => {
    const n = s(t.trim().replace(/^[=v]+/, ""), r);
    return n ? n.version : null;
  }, ht;
}
var lt, rs;
function ci() {
  if (rs) return lt;
  rs = 1;
  const s = j();
  return lt = (t, r, n, a, o) => {
    typeof n == "string" && (o = a, a = n, n = void 0);
    try {
      return new s(
        t instanceof s ? t.version : t,
        n
      ).inc(r, a, o).version;
    } catch {
      return null;
    }
  }, lt;
}
var dt, ss;
function ui() {
  if (ss) return dt;
  ss = 1;
  const s = ee();
  return dt = (t, r) => {
    const n = s(t, null, !0), a = s(r, null, !0), o = n.compare(a);
    if (o === 0)
      return null;
    const u = o > 0, c = u ? n : a, i = u ? a : n, l = !!c.prerelease.length;
    if (!!i.prerelease.length && !l)
      return !i.patch && !i.minor ? "major" : c.patch ? "patch" : c.minor ? "minor" : "major";
    const d = l ? "pre" : "";
    return n.major !== a.major ? d + "major" : n.minor !== a.minor ? d + "minor" : n.patch !== a.patch ? d + "patch" : "prerelease";
  }, dt;
}
var ft, ns;
function hi() {
  if (ns) return ft;
  ns = 1;
  const s = j();
  return ft = (t, r) => new s(t, r).major, ft;
}
var mt, is;
function li() {
  if (is) return mt;
  is = 1;
  const s = j();
  return mt = (t, r) => new s(t, r).minor, mt;
}
var pt, as;
function di() {
  if (as) return pt;
  as = 1;
  const s = j();
  return pt = (t, r) => new s(t, r).patch, pt;
}
var gt, os;
function fi() {
  if (os) return gt;
  os = 1;
  const s = ee();
  return gt = (t, r) => {
    const n = s(t, r);
    return n && n.prerelease.length ? n.prerelease : null;
  }, gt;
}
var _t, cs;
function U() {
  if (cs) return _t;
  cs = 1;
  const s = j();
  return _t = (t, r, n) => new s(t, n).compare(new s(r, n)), _t;
}
var vt, us;
function mi() {
  if (us) return vt;
  us = 1;
  const s = U();
  return vt = (t, r, n) => s(r, t, n), vt;
}
var Et, hs;
function pi() {
  if (hs) return Et;
  hs = 1;
  const s = U();
  return Et = (t, r) => s(t, r, !0), Et;
}
var yt, ls;
function ir() {
  if (ls) return yt;
  ls = 1;
  const s = j();
  return yt = (t, r, n) => {
    const a = new s(t, n), o = new s(r, n);
    return a.compare(o) || a.compareBuild(o);
  }, yt;
}
var wt, ds;
function gi() {
  if (ds) return wt;
  ds = 1;
  const s = ir();
  return wt = (t, r) => t.sort((n, a) => s(n, a, r)), wt;
}
var St, fs;
function _i() {
  if (fs) return St;
  fs = 1;
  const s = ir();
  return St = (t, r) => t.sort((n, a) => s(a, n, r)), St;
}
var bt, ms;
function _e() {
  if (ms) return bt;
  ms = 1;
  const s = U();
  return bt = (t, r, n) => s(t, r, n) > 0, bt;
}
var Ct, ps;
function ar() {
  if (ps) return Ct;
  ps = 1;
  const s = U();
  return Ct = (t, r, n) => s(t, r, n) < 0, Ct;
}
var Rt, gs;
function rn() {
  if (gs) return Rt;
  gs = 1;
  const s = U();
  return Rt = (t, r, n) => s(t, r, n) === 0, Rt;
}
var Tt, _s;
function sn() {
  if (_s) return Tt;
  _s = 1;
  const s = U();
  return Tt = (t, r, n) => s(t, r, n) !== 0, Tt;
}
var Lt, vs;
function or() {
  if (vs) return Lt;
  vs = 1;
  const s = U();
  return Lt = (t, r, n) => s(t, r, n) >= 0, Lt;
}
var At, Es;
function cr() {
  if (Es) return At;
  Es = 1;
  const s = U();
  return At = (t, r, n) => s(t, r, n) <= 0, At;
}
var xt, ys;
function nn() {
  if (ys) return xt;
  ys = 1;
  const s = rn(), e = sn(), t = _e(), r = or(), n = ar(), a = cr();
  return xt = (u, c, i, l) => {
    switch (c) {
      case "===":
        return typeof u == "object" && (u = u.version), typeof i == "object" && (i = i.version), u === i;
      case "!==":
        return typeof u == "object" && (u = u.version), typeof i == "object" && (i = i.version), u !== i;
      case "":
      case "=":
      case "==":
        return s(u, i, l);
      case "!=":
        return e(u, i, l);
      case ">":
        return t(u, i, l);
      case ">=":
        return r(u, i, l);
      case "<":
        return n(u, i, l);
      case "<=":
        return a(u, i, l);
      default:
        throw new TypeError(`Invalid operator: ${c}`);
    }
  }, xt;
}
var It, ws;
function vi() {
  if (ws) return It;
  ws = 1;
  const s = j(), e = ee(), { safeRe: t, t: r } = ne();
  return It = (a, o) => {
    if (a instanceof s)
      return a;
    if (typeof a == "number" && (a = String(a)), typeof a != "string")
      return null;
    o = o || {};
    let u = null;
    if (!o.rtl)
      u = a.match(o.includePrerelease ? t[r.COERCEFULL] : t[r.COERCE]);
    else {
      const m = o.includePrerelease ? t[r.COERCERTLFULL] : t[r.COERCERTL];
      let f;
      for (; (f = m.exec(a)) && (!u || u.index + u[0].length !== a.length); )
        (!u || f.index + f[0].length !== u.index + u[0].length) && (u = f), m.lastIndex = f.index + f[1].length + f[2].length;
      m.lastIndex = -1;
    }
    if (u === null)
      return null;
    const c = u[2], i = u[3] || "0", l = u[4] || "0", h = o.includePrerelease && u[5] ? `-${u[5]}` : "", d = o.includePrerelease && u[6] ? `+${u[6]}` : "";
    return e(`${c}.${i}.${l}${h}${d}`, o);
  }, It;
}
var Ot, Ss;
function Ei() {
  if (Ss) return Ot;
  Ss = 1;
  class s {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(t) {
      const r = this.map.get(t);
      if (r !== void 0)
        return this.map.delete(t), this.map.set(t, r), r;
    }
    delete(t) {
      return this.map.delete(t);
    }
    set(t, r) {
      if (!this.delete(t) && r !== void 0) {
        if (this.map.size >= this.max) {
          const a = this.map.keys().next().value;
          this.delete(a);
        }
        this.map.set(t, r);
      }
      return this;
    }
  }
  return Ot = s, Ot;
}
var $t, bs;
function G() {
  if (bs) return $t;
  bs = 1;
  const s = /\s+/g;
  class e {
    constructor(p, b) {
      if (b = n(b), p instanceof e)
        return p.loose === !!b.loose && p.includePrerelease === !!b.includePrerelease ? p : new e(p.raw, b);
      if (p instanceof a)
        return this.raw = p.value, this.set = [[p]], this.formatted = void 0, this;
      if (this.options = b, this.loose = !!b.loose, this.includePrerelease = !!b.includePrerelease, this.raw = p.trim().replace(s, " "), this.set = this.raw.split("||").map((E) => this.parseRange(E.trim())).filter((E) => E.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const E = this.set[0];
        if (this.set = this.set.filter((R) => !_(R[0])), this.set.length === 0)
          this.set = [E];
        else if (this.set.length > 1) {
          for (const R of this.set)
            if (R.length === 1 && g(R[0])) {
              this.set = [R];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let p = 0; p < this.set.length; p++) {
          p > 0 && (this.formatted += "||");
          const b = this.set[p];
          for (let E = 0; E < b.length; E++)
            E > 0 && (this.formatted += " "), this.formatted += b[E].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(p) {
      const E = ((this.options.includePrerelease && m) | (this.options.loose && f)) + ":" + p, R = r.get(E);
      if (R)
        return R;
      const y = this.options.loose, T = y ? c[i.HYPHENRANGELOOSE] : c[i.HYPHENRANGE];
      p = p.replace(T, ie(this.options.includePrerelease)), o("hyphen replace", p), p = p.replace(c[i.COMPARATORTRIM], l), o("comparator trim", p), p = p.replace(c[i.TILDETRIM], h), o("tilde trim", p), p = p.replace(c[i.CARETTRIM], d), o("caret trim", p);
      let $ = p.split(" ").map((k) => N(k, this.options)).join(" ").split(/\s+/).map((k) => Y(k, this.options));
      y && ($ = $.filter((k) => (o("loose invalid filter", k, this.options), !!k.match(c[i.COMPARATORLOOSE])))), o("range list", $);
      const L = /* @__PURE__ */ new Map(), q = $.map((k) => new a(k, this.options));
      for (const k of q) {
        if (_(k))
          return [k];
        L.set(k.value, k);
      }
      L.size > 1 && L.has("") && L.delete("");
      const D = [...L.values()];
      return r.set(E, D), D;
    }
    intersects(p, b) {
      if (!(p instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((E) => C(E, b) && p.set.some((R) => C(R, b) && E.every((y) => R.every((T) => y.intersects(T, b)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(p) {
      if (!p)
        return !1;
      if (typeof p == "string")
        try {
          p = new u(p, this.options);
        } catch {
          return !1;
        }
      for (let b = 0; b < this.set.length; b++)
        if (we(this.set[b], p, this.options))
          return !0;
      return !1;
    }
  }
  $t = e;
  const t = Ei(), r = new t(), n = nr(), a = ve(), o = ge(), u = j(), {
    safeRe: c,
    t: i,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: d
  } = ne(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: f } = pe(), _ = (v) => v.value === "<0.0.0-0", g = (v) => v.value === "", C = (v, p) => {
    let b = !0;
    const E = v.slice();
    let R = E.pop();
    for (; b && E.length; )
      b = E.every((y) => R.intersects(y, p)), R = E.pop();
    return b;
  }, N = (v, p) => (o("comp", v, p), v = A(v, p), o("caret", v), v = x(v, p), o("tildes", v), v = S(v, p), o("xrange", v), v = X(v, p), o("stars", v), v), w = (v) => !v || v.toLowerCase() === "x" || v === "*", x = (v, p) => v.trim().split(/\s+/).map((b) => I(b, p)).join(" "), I = (v, p) => {
    const b = p.loose ? c[i.TILDELOOSE] : c[i.TILDE];
    return v.replace(b, (E, R, y, T, $) => {
      o("tilde", v, E, R, y, T, $);
      let L;
      return w(R) ? L = "" : w(y) ? L = `>=${R}.0.0 <${+R + 1}.0.0-0` : w(T) ? L = `>=${R}.${y}.0 <${R}.${+y + 1}.0-0` : $ ? (o("replaceTilde pr", $), L = `>=${R}.${y}.${T}-${$} <${R}.${+y + 1}.0-0`) : L = `>=${R}.${y}.${T} <${R}.${+y + 1}.0-0`, o("tilde return", L), L;
    });
  }, A = (v, p) => v.trim().split(/\s+/).map((b) => P(b, p)).join(" "), P = (v, p) => {
    o("caret", v, p);
    const b = p.loose ? c[i.CARETLOOSE] : c[i.CARET], E = p.includePrerelease ? "-0" : "";
    return v.replace(b, (R, y, T, $, L) => {
      o("caret", v, R, y, T, $, L);
      let q;
      return w(y) ? q = "" : w(T) ? q = `>=${y}.0.0${E} <${+y + 1}.0.0-0` : w($) ? y === "0" ? q = `>=${y}.${T}.0${E} <${y}.${+T + 1}.0-0` : q = `>=${y}.${T}.0${E} <${+y + 1}.0.0-0` : L ? (o("replaceCaret pr", L), y === "0" ? T === "0" ? q = `>=${y}.${T}.${$}-${L} <${y}.${T}.${+$ + 1}-0` : q = `>=${y}.${T}.${$}-${L} <${y}.${+T + 1}.0-0` : q = `>=${y}.${T}.${$}-${L} <${+y + 1}.0.0-0`) : (o("no pr"), y === "0" ? T === "0" ? q = `>=${y}.${T}.${$}${E} <${y}.${T}.${+$ + 1}-0` : q = `>=${y}.${T}.${$}${E} <${y}.${+T + 1}.0-0` : q = `>=${y}.${T}.${$} <${+y + 1}.0.0-0`), o("caret return", q), q;
    });
  }, S = (v, p) => (o("replaceXRanges", v, p), v.split(/\s+/).map((b) => z(b, p)).join(" ")), z = (v, p) => {
    v = v.trim();
    const b = p.loose ? c[i.XRANGELOOSE] : c[i.XRANGE];
    return v.replace(b, (E, R, y, T, $, L) => {
      o("xRange", v, E, R, y, T, $, L);
      const q = w(y), D = q || w(T), k = D || w($), te = k;
      return R === "=" && te && (R = ""), L = p.includePrerelease ? "-0" : "", q ? R === ">" || R === "<" ? E = "<0.0.0-0" : E = "*" : R && te ? (D && (T = 0), $ = 0, R === ">" ? (R = ">=", D ? (y = +y + 1, T = 0, $ = 0) : (T = +T + 1, $ = 0)) : R === "<=" && (R = "<", D ? y = +y + 1 : T = +T + 1), R === "<" && (L = "-0"), E = `${R + y}.${T}.${$}${L}`) : D ? E = `>=${y}.0.0${L} <${+y + 1}.0.0-0` : k && (E = `>=${y}.${T}.0${L} <${y}.${+T + 1}.0-0`), o("xRange return", E), E;
    });
  }, X = (v, p) => (o("replaceStars", v, p), v.trim().replace(c[i.STAR], "")), Y = (v, p) => (o("replaceGTE0", v, p), v.trim().replace(c[p.includePrerelease ? i.GTE0PRE : i.GTE0], "")), ie = (v) => (p, b, E, R, y, T, $, L, q, D, k, te) => (w(E) ? b = "" : w(R) ? b = `>=${E}.0.0${v ? "-0" : ""}` : w(y) ? b = `>=${E}.${R}.0${v ? "-0" : ""}` : T ? b = `>=${b}` : b = `>=${b}${v ? "-0" : ""}`, w(q) ? L = "" : w(D) ? L = `<${+q + 1}.0.0-0` : w(k) ? L = `<${q}.${+D + 1}.0-0` : te ? L = `<=${q}.${D}.${k}-${te}` : v ? L = `<${q}.${D}.${+k + 1}-0` : L = `<=${L}`, `${b} ${L}`.trim()), we = (v, p, b) => {
    for (let E = 0; E < v.length; E++)
      if (!v[E].test(p))
        return !1;
    if (p.prerelease.length && !b.includePrerelease) {
      for (let E = 0; E < v.length; E++)
        if (o(v[E].semver), v[E].semver !== a.ANY && v[E].semver.prerelease.length > 0) {
          const R = v[E].semver;
          if (R.major === p.major && R.minor === p.minor && R.patch === p.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return $t;
}
var Nt, Cs;
function ve() {
  if (Cs) return Nt;
  Cs = 1;
  const s = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return s;
    }
    constructor(l, h) {
      if (h = t(h), l instanceof e) {
        if (l.loose === !!h.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, h), this.options = h, this.loose = !!h.loose, this.parse(l), this.semver === s ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const h = this.options.loose ? r[n.COMPARATORLOOSE] : r[n.COMPARATOR], d = l.match(h);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new u(d[2], this.options.loose) : this.semver = s;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === s || l === s)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, h) {
      if (!(l instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, h).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, h).test(l.semver) : (h = t(h), h.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, h) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, h) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Nt = e;
  const t = nr(), { safeRe: r, t: n } = ne(), a = nn(), o = ge(), u = j(), c = G();
  return Nt;
}
var Pt, Rs;
function Ee() {
  if (Rs) return Pt;
  Rs = 1;
  const s = G();
  return Pt = (t, r, n) => {
    try {
      r = new s(r, n);
    } catch {
      return !1;
    }
    return r.test(t);
  }, Pt;
}
var qt, Ts;
function yi() {
  if (Ts) return qt;
  Ts = 1;
  const s = G();
  return qt = (t, r) => new s(t, r).set.map((n) => n.map((a) => a.value).join(" ").trim().split(" ")), qt;
}
var kt, Ls;
function wi() {
  if (Ls) return kt;
  Ls = 1;
  const s = j(), e = G();
  return kt = (r, n, a) => {
    let o = null, u = null, c = null;
    try {
      c = new e(n, a);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      c.test(i) && (!o || u.compare(i) === -1) && (o = i, u = new s(o, a));
    }), o;
  }, kt;
}
var Ft, As;
function Si() {
  if (As) return Ft;
  As = 1;
  const s = j(), e = G();
  return Ft = (r, n, a) => {
    let o = null, u = null, c = null;
    try {
      c = new e(n, a);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      c.test(i) && (!o || u.compare(i) === 1) && (o = i, u = new s(o, a));
    }), o;
  }, Ft;
}
var Dt, xs;
function bi() {
  if (xs) return Dt;
  xs = 1;
  const s = j(), e = G(), t = _e();
  return Dt = (n, a) => {
    n = new e(n, a);
    let o = new s("0.0.0");
    if (n.test(o) || (o = new s("0.0.0-0"), n.test(o)))
      return o;
    o = null;
    for (let u = 0; u < n.set.length; ++u) {
      const c = n.set[u];
      let i = null;
      c.forEach((l) => {
        const h = new s(l.semver.version);
        switch (l.operator) {
          case ">":
            h.prerelease.length === 0 ? h.patch++ : h.prerelease.push(0), h.raw = h.format();
          /* fallthrough */
          case "":
          case ">=":
            (!i || t(h, i)) && (i = h);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${l.operator}`);
        }
      }), i && (!o || t(o, i)) && (o = i);
    }
    return o && n.test(o) ? o : null;
  }, Dt;
}
var jt, Is;
function Ci() {
  if (Is) return jt;
  Is = 1;
  const s = G();
  return jt = (t, r) => {
    try {
      return new s(t, r).range || "*";
    } catch {
      return null;
    }
  }, jt;
}
var zt, Os;
function ur() {
  if (Os) return zt;
  Os = 1;
  const s = j(), e = ve(), { ANY: t } = e, r = G(), n = Ee(), a = _e(), o = ar(), u = cr(), c = or();
  return zt = (l, h, d, m) => {
    l = new s(l, m), h = new r(h, m);
    let f, _, g, C, N;
    switch (d) {
      case ">":
        f = a, _ = u, g = o, C = ">", N = ">=";
        break;
      case "<":
        f = o, _ = c, g = a, C = "<", N = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (n(l, h, m))
      return !1;
    for (let w = 0; w < h.set.length; ++w) {
      const x = h.set[w];
      let I = null, A = null;
      if (x.forEach((P) => {
        P.semver === t && (P = new e(">=0.0.0")), I = I || P, A = A || P, f(P.semver, I.semver, m) ? I = P : g(P.semver, A.semver, m) && (A = P);
      }), I.operator === C || I.operator === N || (!A.operator || A.operator === C) && _(l, A.semver))
        return !1;
      if (A.operator === N && g(l, A.semver))
        return !1;
    }
    return !0;
  }, zt;
}
var Ut, $s;
function Ri() {
  if ($s) return Ut;
  $s = 1;
  const s = ur();
  return Ut = (t, r, n) => s(t, r, ">", n), Ut;
}
var Gt, Ns;
function Ti() {
  if (Ns) return Gt;
  Ns = 1;
  const s = ur();
  return Gt = (t, r, n) => s(t, r, "<", n), Gt;
}
var Mt, Ps;
function Li() {
  if (Ps) return Mt;
  Ps = 1;
  const s = G();
  return Mt = (t, r, n) => (t = new s(t, n), r = new s(r, n), t.intersects(r, n)), Mt;
}
var Ht, qs;
function Ai() {
  if (qs) return Ht;
  qs = 1;
  const s = Ee(), e = U();
  return Ht = (t, r, n) => {
    const a = [];
    let o = null, u = null;
    const c = t.sort((d, m) => e(d, m, n));
    for (const d of c)
      s(d, r, n) ? (u = d, o || (o = d)) : (u && a.push([o, u]), u = null, o = null);
    o && a.push([o, null]);
    const i = [];
    for (const [d, m] of a)
      d === m ? i.push(d) : !m && d === c[0] ? i.push("*") : m ? d === c[0] ? i.push(`<=${m}`) : i.push(`${d} - ${m}`) : i.push(`>=${d}`);
    const l = i.join(" || "), h = typeof r.raw == "string" ? r.raw : String(r);
    return l.length < h.length ? l : r;
  }, Ht;
}
var Bt, ks;
function xi() {
  if (ks) return Bt;
  ks = 1;
  const s = G(), e = ve(), { ANY: t } = e, r = Ee(), n = U(), a = (h, d, m = {}) => {
    if (h === d)
      return !0;
    h = new s(h, m), d = new s(d, m);
    let f = !1;
    e: for (const _ of h.set) {
      for (const g of d.set) {
        const C = c(_, g, m);
        if (f = f || C !== null, C)
          continue e;
      }
      if (f)
        return !1;
    }
    return !0;
  }, o = [new e(">=0.0.0-0")], u = [new e(">=0.0.0")], c = (h, d, m) => {
    if (h === d)
      return !0;
    if (h.length === 1 && h[0].semver === t) {
      if (d.length === 1 && d[0].semver === t)
        return !0;
      m.includePrerelease ? h = o : h = u;
    }
    if (d.length === 1 && d[0].semver === t) {
      if (m.includePrerelease)
        return !0;
      d = u;
    }
    const f = /* @__PURE__ */ new Set();
    let _, g;
    for (const S of h)
      S.operator === ">" || S.operator === ">=" ? _ = i(_, S, m) : S.operator === "<" || S.operator === "<=" ? g = l(g, S, m) : f.add(S.semver);
    if (f.size > 1)
      return null;
    let C;
    if (_ && g) {
      if (C = n(_.semver, g.semver, m), C > 0)
        return null;
      if (C === 0 && (_.operator !== ">=" || g.operator !== "<="))
        return null;
    }
    for (const S of f) {
      if (_ && !r(S, String(_), m) || g && !r(S, String(g), m))
        return null;
      for (const z of d)
        if (!r(S, String(z), m))
          return !1;
      return !0;
    }
    let N, w, x, I, A = g && !m.includePrerelease && g.semver.prerelease.length ? g.semver : !1, P = _ && !m.includePrerelease && _.semver.prerelease.length ? _.semver : !1;
    A && A.prerelease.length === 1 && g.operator === "<" && A.prerelease[0] === 0 && (A = !1);
    for (const S of d) {
      if (I = I || S.operator === ">" || S.operator === ">=", x = x || S.operator === "<" || S.operator === "<=", _) {
        if (P && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === P.major && S.semver.minor === P.minor && S.semver.patch === P.patch && (P = !1), S.operator === ">" || S.operator === ">=") {
          if (N = i(_, S, m), N === S && N !== _)
            return !1;
        } else if (_.operator === ">=" && !r(_.semver, String(S), m))
          return !1;
      }
      if (g) {
        if (A && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === A.major && S.semver.minor === A.minor && S.semver.patch === A.patch && (A = !1), S.operator === "<" || S.operator === "<=") {
          if (w = l(g, S, m), w === S && w !== g)
            return !1;
        } else if (g.operator === "<=" && !r(g.semver, String(S), m))
          return !1;
      }
      if (!S.operator && (g || _) && C !== 0)
        return !1;
    }
    return !(_ && x && !g && C !== 0 || g && I && !_ && C !== 0 || P || A);
  }, i = (h, d, m) => {
    if (!h)
      return d;
    const f = n(h.semver, d.semver, m);
    return f > 0 ? h : f < 0 || d.operator === ">" && h.operator === ">=" ? d : h;
  }, l = (h, d, m) => {
    if (!h)
      return d;
    const f = n(h.semver, d.semver, m);
    return f < 0 ? h : f > 0 || d.operator === "<" && h.operator === "<=" ? d : h;
  };
  return Bt = a, Bt;
}
var Vt, Fs;
function Ii() {
  if (Fs) return Vt;
  Fs = 1;
  const s = ne(), e = pe(), t = j(), r = tn(), n = ee(), a = ai(), o = oi(), u = ci(), c = ui(), i = hi(), l = li(), h = di(), d = fi(), m = U(), f = mi(), _ = pi(), g = ir(), C = gi(), N = _i(), w = _e(), x = ar(), I = rn(), A = sn(), P = or(), S = cr(), z = nn(), X = vi(), Y = ve(), ie = G(), we = Ee(), v = yi(), p = wi(), b = Si(), E = bi(), R = Ci(), y = ur(), T = Ri(), $ = Ti(), L = Li(), q = Ai(), D = xi();
  return Vt = {
    parse: n,
    valid: a,
    clean: o,
    inc: u,
    diff: c,
    major: i,
    minor: l,
    patch: h,
    prerelease: d,
    compare: m,
    rcompare: f,
    compareLoose: _,
    compareBuild: g,
    sort: C,
    rsort: N,
    gt: w,
    lt: x,
    eq: I,
    neq: A,
    gte: P,
    lte: S,
    cmp: z,
    coerce: X,
    Comparator: Y,
    Range: ie,
    satisfies: we,
    toComparators: v,
    maxSatisfying: p,
    minSatisfying: b,
    minVersion: E,
    validRange: R,
    outside: y,
    gtr: T,
    ltr: $,
    intersects: L,
    simplifyRange: q,
    subset: D,
    SemVer: t,
    re: s.re,
    src: s.src,
    tokens: s.t,
    SEMVER_SPEC_VERSION: e.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: e.RELEASE_TYPES,
    compareIdentifiers: r.compareIdentifiers,
    rcompareIdentifiers: r.rcompareIdentifiers
  }, Vt;
}
var Oi = Ii();
const $i = /* @__PURE__ */ Ms(Oi);
class Ni extends O {
  constructor(e) {
    super(e, "internal");
  }
  async isPluginUpToDate() {
    const e = await this.get("version");
    return !$i.lt(e, Yt);
  }
}
class Pi extends O {
  constructor(e) {
    super(e, "application-view");
  }
  async availableMainViews() {
    return this.sendCachedCommand("available_main_views");
  }
  async focusView(e) {
    return this.sendCommand("focus_view", [e]);
  }
  async hideView(e) {
    return this.sendCommand("hide_view", [e]);
  }
  async isViewVisible(e, t = !0) {
    return this.sendCommand("is_view_visible", [e, t]);
  }
  async scrollView(e, t, r) {
    return this.sendCommand("scroll_view", {
      direction: t,
      view: e,
      modifier_pressed: r
    });
  }
  async showView(e) {
    return this.sendCommand("show_view", [e]);
  }
  async toggleBrowse() {
    return this.sendCommand("toggle_browse");
  }
  async zoomView(e, t, r) {
    return this.sendCommand("zoom_view", {
      direction: t,
      view: e,
      modifier_pressed: r
    });
  }
}
class le extends O {
  constructor(e, t) {
    super(e, "browser-item", t.id), this.raw = t, this.transformers = {
      children: (r) => r.map((n) => new le(e, n))
    }, this.cachedProps = {
      children: !0,
      is_device: !0,
      is_folder: !0,
      is_loadable: !1,
      is_selected: !1,
      name: !0,
      source: !0,
      uri: !0
    };
  }
}
class qi extends O {
  constructor(e) {
    super(e, "browser");
    const t = (r) => r.map((n) => new le(e, n));
    this.transformers = {
      audio_effects: t,
      clips: t,
      colors: t,
      current_project: t,
      drums: t,
      instruments: t,
      max_for_live: t,
      midi_effects: t,
      packs: t,
      plugins: t,
      samples: t,
      sounds: t,
      user_library: t,
      user_folders: t,
      hotswap_target: (r) => new le(e, r)
    }, this.cachedProps = {
      audio_effects: !0,
      clips: !0,
      colors: !0,
      current_project: !0,
      drums: !0,
      instruments: !0,
      max_for_live: !0,
      midi_effects: !0,
      packs: !0,
      plugins: !0,
      samples: !0,
      sounds: !0,
      user_library: !0,
      user_folders: !0,
      hotswap_target: !0
    };
  }
  /** Loads the provided browser item. */
  async loadItem(e) {
    return this.sendCommand("load_item", { id: e.raw.id });
  }
  /** Previews the provided browser item. */
  async previewItem(e) {
    return this.sendCommand("preview_item", { id: e.raw.id });
  }
  /** Stops the current preview. */
  async stopPreview() {
    return this.sendCommand("stop_preview");
  }
}
class ki extends O {
  constructor(e) {
    super(e, "application"), this.cachedProps = {
      unavailable_features: !0
    };
  }
  browser = new qi(this.ableton);
  view = new Pi(this.ableton);
  /** Returns true if the given entry exists in Options.txt. */
  async hasOption(e) {
    return this.sendCommand("has_option", [e]);
  }
  /** Presses a button, by index, on the current message box. */
  async pressCurrentDialogButton(e) {
    return this.sendCommand("press_current_dialog_button", [e]);
  }
  // Live's show_message is not wrapped: it requires a Base.Text, which cannot
  // be instantiated from Python. Use showOnTheFlyMessage for free-form strings.
  /**
   * Shows a message box with a free-form string, returning the pressed button index.
   *
   * This command blocks until the user pushes a button, so the timeout defaults to
   * 60000ms. Increase the timeout if you expect the user to take longer to close
   * the dialog.
   */
  async showOnTheFlyMessage(e, t = {}) {
    return this.sendCommand(
      "show_on_the_fly_message",
      {
        message: e,
        buttons: t.buttons ?? "OK_BUTTON",
        enable_markup: t.enableMarkup ?? !1,
        show_success_icon: t.showSuccessIcon ?? !1,
        push_dialog_type: t.pushDialogType ?? "MESSAGE_BOX"
      },
      void 0,
      t.timeout ?? 6e4
    );
  }
}
var an = /* @__PURE__ */ ((s) => (s[s.NoteOn = 128] = "NoteOn", s[s.NoteOff = 144] = "NoteOff", s[s.AfterTouch = 160] = "AfterTouch", s[s.ControlChange = 176] = "ControlChange", s[s.PatchChange = 192] = "PatchChange", s[s.ChannelPressure = 208] = "ChannelPressure", s[s.PitchBend = 224] = "PitchBend", s[s.SysExStart = 240] = "SysExStart", s[s.MidiTimeCodeQuarterFrame = 241] = "MidiTimeCodeQuarterFrame", s[s.SongPositionPointer = 242] = "SongPositionPointer", s[s.SongSelect = 243] = "SongSelect", s[s.TuneRequest = 246] = "TuneRequest", s[s.SysExEnd = 247] = "SysExEnd", s[s.TimingClock = 248] = "TimingClock", s[s.Start = 250] = "Start", s[s.Continue = 251] = "Continue", s[s.Stop = 252] = "Stop", s[s.ActiveSensing = 254] = "ActiveSensing", s[s.SystemReset = 255] = "SystemReset", s))(an || {});
class Fi {
  command;
  parameter1 = null;
  parameter2 = null;
  constructor(e) {
    switch (e.bytes.length) {
      case 0:
        throw "bytes missing from midi message";
      case 3:
        this.parameter1 = e.bytes[1], this.parameter2 = e.bytes[2];
        break;
      case 2:
        this.parameter1 = e.bytes[1];
        break;
      case 1:
        break;
      default:
        throw "invalid midi message length: " + e.bytes.length;
    }
    if (!(e.bytes[0] in an))
      throw "invalid midi command: " + e.bytes[0];
    this.command = e.bytes[0];
  }
  toCC() {
    if (this.command !== 176)
      throw "not a midi CC message";
    return {
      command: this.command,
      controller: this.parameter1,
      value: this.parameter2
    };
  }
  toNote() {
    if (this.command !== 128 && this.command !== 144)
      throw "not a midi note message";
    return {
      command: this.command,
      key: this.parameter1,
      velocity: this.parameter2
    };
  }
}
class Di extends O {
  constructor(e) {
    super(e, "midi"), this.transformers = {
      midi: (t) => new Fi(t)
    };
  }
}
const ji = (s) => s && "__cached" in s;
class zi extends O {
  constructor(e) {
    super(e, "session", void 0);
  }
  async setupSessionBox(e, t) {
    return this.sendCommand("setup_session_box", { num_tracks: e, num_scenes: t });
  }
  async setSessionOffset(e, t) {
    return this.sendCommand("set_session_offset", {
      track_offset: e,
      scene_offset: t
    });
  }
}
class Ui {
  listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    let r = this.listeners.get(e);
    return r || (r = /* @__PURE__ */ new Set(), this.listeners.set(e, r)), r.add(t), this;
  }
  once(e, t) {
    const r = ((...n) => {
      this.off(e, r), t(...n);
    });
    return this.on(e, r);
  }
  off(e, t) {
    return this.listeners.get(e)?.delete(t), this;
  }
  emit(e, ...t) {
    const r = this.listeners.get(e);
    if (!r || r.size === 0)
      return !1;
    for (const n of Array.from(r))
      n(...t);
    return !0;
  }
}
function Ds(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in s && s.BYTES_PER_ELEMENT === 1;
}
const Jt = (s) => s ? `"${s}" ` : "";
function js(s, e = "") {
  if (typeof s != "number")
    throw new TypeError(Jt(e) + "expected number, got " + typeof s);
  if (!Number.isSafeInteger(s) || s < 0)
    throw new RangeError(Jt(e) + "expected integer >= 0, got " + s);
  return s;
}
function ye(s, e, t = "") {
  if (Ds(s) && e === void 0)
    return s;
  const r = Ds(s), n = "", a = r ? `length=${s.length}` : `type=${typeof s}`, o = Jt(t) + "expected Uint8Array" + n + ", got " + a;
  throw r ? new RangeError(o) : new TypeError(o);
}
function Gi(s) {
  if (typeof s != "function" || typeof s.create != "function")
    throw new TypeError("expected hash wrapped by utils.createHasher");
  if (js(s.outputLen), js(s.blockLen), s.outputLen < 1 || s.blockLen < 1)
    throw new Error("hash blockLen / outputLen must be >= 1");
}
const zs = (s, e) => {
  if (s === null || typeof s != "object" || Array.isArray(s))
    throw new TypeError((e === "object" ? "" : `"${e}" `) + "expected object, got type=" + typeof s);
};
function de(s, e = !0) {
  if (s.destroyed)
    throw new Error("hash was destroyed");
  if (e && s.finished)
    throw new Error("digest() was already called");
}
function on(s, e) {
  ye(s, void 0, "output");
  const t = e.outputLen;
  if (!(s.length >= t))
    throw new RangeError('"output" expected length >= ' + t);
}
function Qt(...s) {
  for (let e = 0; e < s.length; e++)
    s[e].fill(0);
}
function Wt(s) {
  return new DataView(s.buffer, s.byteOffset, s.byteLength);
}
function M(s, e) {
  return s << 32 - e | s >>> e;
}
const Mi = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Hi = /* @__PURE__ */ Array.from({ length: 256 }, (s, e) => e.toString(16).padStart(2, "0"));
function Bi(s) {
  if (ye(s), Mi)
    return s.toHex();
  let e = "";
  for (let t = 0; t < s.length; t++)
    e += Hi[s[t]];
  return e;
}
function Us(s) {
  if (typeof s != "string")
    throw new TypeError("string expected");
  return new Uint8Array(new TextEncoder().encode(s));
}
function Vi(s, e, t = "opts") {
  return zs(s, "defaults"), e !== void 0 && zs(e, t), Object.assign(s, e);
}
function Wi(s, e = {}) {
  if (typeof s != "function")
    throw new TypeError('"hashCons" expected function, got type=' + typeof s);
  e = Vi({}, e, "info");
  const t = (n, a) => s(a).update(n).digest(), r = s(void 0);
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.canXOF = r.canXOF, t.create = (n) => s(n), Object.assign(t, e), Object.freeze(t);
}
const Xi = (s) => ({
  // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
  // Larger suffix values would need base-128 OID encoding and a different length byte.
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, s])
});
class Gs {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = !1;
  finished = !1;
  destroyed = !1;
  constructor(e, t) {
    if (Gi(e), ye(t, void 0, "key"), this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("expected Hash instance");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r = this.blockLen, n = new Uint8Array(r);
    n.set(t.length > r ? e.create().update(t).digest() : t);
    for (let a = 0; a < n.length; a++)
      n[a] ^= 54;
    this.iHash.update(n), this.oHash = e.create();
    for (let a = 0; a < n.length; a++)
      n[a] ^= 106;
    this.oHash.update(n), Qt(n);
  }
  update(e) {
    return de(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    de(this), on(e, this), this.finished = !0;
    const t = e.subarray(0, this.outputLen);
    this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash: t, iHash: r, finished: n, destroyed: a, blockLen: o, outputLen: u, canXOF: c } = this;
    return e = e, e.finished = n, e.destroyed = a, e.blockLen = o, e.outputLen = u, e.canXOF = c, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Yi = /* @__PURE__ */ (() => {
  const s = ((e, t, r) => new Gs(e, t).update(r).digest());
  return s.create = (e, t) => new Gs(e, t), s;
})(), Ji = (s) => s / 2 ** 32 | 0, Qi = (s) => s >>> 0;
function Ki(s, e, t, r) {
  const n = Ji(t), a = Qi(t);
  s.setUint32(e, r ? a : n, r), s.setUint32(e + 4, r ? n : a, r);
}
function Zi(s, e, t) {
  return s & e ^ ~s & t;
}
function ea(s, e, t) {
  return s & e ^ s & t ^ e & t;
}
class ta {
  blockLen;
  outputLen;
  canXOF = !1;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = !1;
  length = 0;
  pos = 0;
  destroyed = !1;
  constructor(e, t, r, n) {
    this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.buffer = new Uint8Array(e), this.view = Wt(this.buffer);
  }
  update(e) {
    de(this), ye(e);
    const { view: t, buffer: r, blockLen: n } = this, a = e.length;
    let o = !1;
    for (let u = 0; u < a; ) {
      const c = Math.min(n - this.pos, a - u);
      if (c === n) {
        const i = Wt(e);
        for (; n <= a - u; u += n)
          this.process(i, u);
        o = !0;
        continue;
      }
      r.set(u === 0 && c === a ? e : e.subarray(u, u + c), this.pos), this.pos += c, u += c, this.pos === n && (this.process(t, 0), this.pos = 0, o = !0);
    }
    return this.length += e.length, o && this.roundClean(), this;
  }
  digestInto(e) {
    de(this), on(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: n, isLE: a } = this;
    let { pos: o } = this;
    t[o++] = 128, t.fill(0, o), this.padOffset > n - o && (this.process(r, 0), t.fill(0)), Ki(r, n - 8, this.length * 8, a), this.process(r, 0), this.roundClean();
    const u = e === t ? r : Wt(e), c = this.outputLen, i = c / 4, l = this.get();
    if (c % 4 || i > l.length)
      throw new Error("invalid outputLen");
    for (let h = 0; h < i; h++)
      u.setUint32(4 * h, l[h], a);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneIntoMeta(e) {
    const { buffer: t, length: r, finished: n, destroyed: a, pos: o } = this;
    return e.destroyed = a, e.finished = n, e.length = r, e.pos = o, o && e.buffer.set(t), e;
  }
  clone() {
    return this._cloneInto();
  }
}
const ra = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), sa = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), V = /* @__PURE__ */ new Uint32Array(64);
class na extends ta {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  // Numeric initializers matter: starting the fields as `undefined` changes
  // V8's field representation and makes sha256 3x slower (measured).
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  constructor(e, t) {
    super(64, e, 8, !1), this.A = t[0] | 0, this.B = t[1] | 0, this.C = t[2] | 0, this.D = t[3] | 0, this.E = t[4] | 0, this.F = t[5] | 0, this.G = t[6] | 0, this.H = t[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: n, E: a, F: o, G: u, H: c } = this;
    return [e, t, r, n, a, o, u, c];
  }
  // prettier-ignore
  set(e, t, r, n, a, o, u, c) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = n | 0, this.E = a | 0, this.F = o | 0, this.G = u | 0, this.H = c | 0;
  }
  _cloneInto(e) {
    return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
  }
  process(e, t) {
    for (let h = 0; h < 16; h++, t += 4)
      V[h] = e.getUint32(t, !1);
    for (let h = 16; h < 64; h++) {
      const d = V[h - 15], m = V[h - 2], f = M(d, 7) ^ M(d, 18) ^ d >>> 3, _ = M(m, 17) ^ M(m, 19) ^ m >>> 10;
      V[h] = _ + V[h - 7] + f + V[h - 16] | 0;
    }
    let { A: r, B: n, C: a, D: o, E: u, F: c, G: i, H: l } = this;
    for (let h = 0; h < 64; h++) {
      const d = M(u, 6) ^ M(u, 11) ^ M(u, 25), m = l + d + Zi(u, c, i) + sa[h] + V[h] | 0, _ = (M(r, 2) ^ M(r, 13) ^ M(r, 22)) + ea(r, n, a) | 0;
      l = i, i = c, c = u, u = o + m | 0, o = a, a = n, n = r, r = m + _ | 0;
    }
    r = r + this.A | 0, n = n + this.B | 0, a = a + this.C | 0, o = o + this.D | 0, u = u + this.E | 0, c = c + this.F | 0, i = i + this.G | 0, l = l + this.H | 0, this.set(r, n, a, o, u, c, i, l);
  }
  roundClean() {
    Qt(V);
  }
  destroy() {
    this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), Qt(this.buffer);
  }
}
class ia extends na {
  constructor() {
    super(32, ra);
  }
}
const aa = /* @__PURE__ */ Wi(
  () => new ia(),
  /* @__PURE__ */ Xi(1)
);
function oa(s, e) {
  return Bi(Yi(aa, Us(s), Us(e)));
}
const ca = "127.0.0.1", ua = 39031, ha = Gn(200);
function la(s) {
  return s.ns === "internal" && s.name === "authenticate" ? "{ hash: *** }" : Pn(JSON.stringify(s.args), { length: 100 });
}
function da(s) {
  if (s.length === 0)
    return "commands[0]";
  const e = s[0], t = `${e.ns}.${e.name}(${la(e)})`;
  return s.length === 1 ? t : `commands[${s.length}] starting with ${t}`;
}
class fa extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class ma extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class _a extends Ui {
  /**
   * Creates a client for the AbletonJS Remote Script.
   * Call {@link Ableton.start} before sending commands.
   */
  constructor(e) {
    super(), this.options = e, this.logger = e?.logger, this.host = e?.host ?? ca, this.port = e?.port ?? ua, e?.disableCache || (this.cache = new J({
      max: 500,
      ttl: 1e3 * 60 * 10,
      ...e?.cacheOptions
    }));
  }
  client;
  msgMap = /* @__PURE__ */ new Map();
  commandQueue = [];
  flushScheduled = !1;
  eventListeners = /* @__PURE__ */ new Map();
  heartbeatInterval;
  reconnectTimer;
  connectTimer;
  _isConnected = !1;
  latency = 0;
  reconnectDelay = 250;
  shouldReconnect = !1;
  host;
  port;
  /** LRU cache used by cached property reads when caching is enabled. */
  cache;
  /** The current Live Set (tracks, scenes, tempo, playback, …). */
  song = new ii(this);
  /** Red box / session ring control. */
  session = new zi(this);
  /** Live application metadata and dialogs. */
  application = new ki(this);
  /** Internal plugin helpers (ping, version, auth). */
  internal = new Ni(this);
  /** Forwarded MIDI note/CC tracking. */
  midi = new Di(this);
  logger;
  clientState = "closed";
  cancelDisconnectEvents = [];
  lastId = BigInt(1);
  getId() {
    return String(this.lastId++);
  }
  handleConnect(e) {
    this._isConnected || (this._isConnected = !0, this.logger?.info("Live connected", { type: e }), this.emit("connect", e));
  }
  handleDisconnect(e) {
    this._isConnected && (this._isConnected = !1, this.eventListeners.clear(), this.cache?.clear(), e === "realtime" && (this.msgMap.forEach((t) => t.clearTimeout()), this.msgMap.clear(), this.rejectCommandQueue(
      new Error("Live disconnected before the command could be sent.")
    )), this.logger?.info("Live disconnected", { type: e }), this.emit("disconnect", e));
  }
  rejectCommandQueue(e) {
    const t = this.commandQueue;
    this.commandQueue = [], this.flushScheduled = !1;
    for (const r of t)
      r.rej(e);
  }
  /**
   * If connected, returns immediately. Otherwise,
   * it waits for a connection event before returning.
   */
  async waitForConnection() {
    if (!this._isConnected)
      return new Promise((e, t) => {
        this.once("connect", () => e()), this.once("error", (r) => t(r));
      });
  }
  /**
   * Starts the client and waits for a connection with Live to be established.
   *
   * @param timeoutMs
   * If set, the function will throw an error if it can't establish a connection
   * in the given time. Should be higher than 2000ms to avoid false positives.
   */
  async start(e) {
    if (this.clientState !== "closed")
      return this.logger?.warn(
        "Tried calling start, but client is already " + this.clientState
      ), this.waitForConnection();
    this.clientState = "starting", this.shouldReconnect = !0, this.logger?.info("Connecting to Live", { url: this.socketUrl() }), this.connectSocket(), this.logger?.info("Checking connection...");
    const t = this.waitForConnection();
    if (e)
      try {
        const n = new Promise(
          (a, o) => setTimeout(() => o(new Error("Connection timed out.")), e)
        );
        await Promise.race([t, n]);
      } catch (n) {
        throw await this.close(), n;
      }
    else
      await t;
    this.logger?.info("Got connection!"), this.clientState = "started", this.handleConnect("start");
    const r = async () => {
      if (!this._isConnected || !this.client || this.client.readyState !== WebSocket.OPEN || this.msgMap.size > 0 || this.commandQueue.length > 0)
        return;
      let n = !1;
      const a = () => {
        n = !0, this.logger?.debug("Cancelled heartbeat");
      };
      this.cancelDisconnectEvents.push(a);
      try {
        const o = performance.now();
        await this.internal.get("ping"), this.handleConnect("heartbeat"), this.latency = performance.now() - o, this.emit("ping", this.latency);
      } catch (o) {
        !n && this._isConnected && (this.logger?.warn("Heartbeat failed:", { error: o, canceled: n }), this.closeCurrentSocket());
      } finally {
        this.cancelDisconnectEvents = this.cancelDisconnectEvents.filter(
          (o) => o !== a
        );
      }
    };
    this.heartbeatInterval = setInterval(
      r,
      this.options?.heartbeatInterval ?? 2e3
    ), r(), this.internal.get("version").then((n) => {
      n !== Yt && this.logger?.warn(
        `The installed version of your AbletonJS plugin (${n}) is different from the JS library (${Yt}).`,
        "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu"
      );
    }).catch(() => {
    });
  }
  socketUrl() {
    return `ws://${this.host}:${this.port}`;
  }
  clearConnectTimer() {
    this.connectTimer && (clearTimeout(this.connectTimer), this.connectTimer = void 0);
  }
  connectSocket() {
    if (!this.shouldReconnect)
      return;
    if (this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = void 0), this.clearConnectTimer(), this.client) {
      const n = this.client;
      this.client = void 0, n.close();
    }
    const e = this.socketUrl(), t = new WebSocket(e);
    this.client = t;
    const r = this.options?.connectTimeoutMs ?? 5e3;
    this.connectTimer = setTimeout(() => {
      this.connectTimer = void 0, !(this.client !== t || t.readyState !== WebSocket.CONNECTING) && (this.logger?.warn("WebSocket connection timed out", { url: e, timeout: r }), this.client = void 0, t.close(), this.handleDisconnect("realtime"), this.scheduleReconnect());
    }, r), t.addEventListener("open", () => {
      this.client === t && (this.clearConnectTimer(), this.reconnectDelay = 250);
    }), t.addEventListener("message", (n) => {
      this.client === t && typeof n.data == "string" && this.handleIncoming(n.data);
    }), t.addEventListener("close", () => {
      this.client === t && (this.clearConnectTimer(), this.client = void 0, this.handleDisconnect("realtime"), this.scheduleReconnect());
    });
  }
  closeCurrentSocket() {
    if (!this.client || this.client.readyState === WebSocket.CLOSED) {
      this.client = void 0, this.scheduleReconnect();
      return;
    }
    this.client.close();
  }
  scheduleReconnect() {
    if (!this.shouldReconnect || this.reconnectTimer)
      return;
    const e = this.reconnectDelay;
    this.reconnectDelay = Math.min(this.reconnectDelay * 2, 2e3), this.logger?.info("Reconnecting to Live", { delay: e, url: this.socketUrl() }), this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = void 0, this.connectSocket();
    }, e);
  }
  /** Closes the client */
  async close() {
    if (this.logger?.info("Closing the client"), this.shouldReconnect = !1, this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = void 0), this.clearConnectTimer(), this.heartbeatInterval && clearInterval(this.heartbeatInterval), this.client) {
      const e = this.client;
      if (e.readyState === WebSocket.CLOSED)
        this.client = void 0;
      else {
        const t = new Promise((r) => {
          e.addEventListener("close", () => r(), { once: !0 });
        });
        e.close(), await t, this.client = void 0;
      }
    }
    this.clientState = "closed", this._isConnected = !1, this.logger?.info("Client closed");
  }
  /**
   * Returns the latency between the last command and its response.
   * This is a rough measurement, so don't rely too much on it.
   */
  getPing() {
    return this.latency;
  }
  handleIncoming(e) {
    try {
      this.emit("raw_message", e);
      const t = JSON.parse(e), r = this.msgMap.get(t.uuid);
      if (this.emit("message", t), t.event === "result" && r)
        return this.msgMap.delete(t.uuid), r.res(t.data);
      if (t.event === "error" && r)
        return this.msgMap.delete(t.uuid), r.rej(new Error(t.data));
      if (t.event === "result" || t.event === "error")
        return;
      if (t.event === "disconnect") {
        this.handleDisconnect("realtime"), this.closeCurrentSocket();
        return;
      }
      if (t.event === "connect") {
        this.handleServerConnect(t);
        return;
      }
      const n = this.eventListeners.get(t.event);
      if (n)
        return n.forEach((a) => a(t.data));
      t.uuid && this.logger?.warn("Message could not be assigned to any request:", {
        msg: e
      });
    } catch (t) {
      this.emit("error", t);
    }
  }
  async handleServerConnect(e) {
    if (this.cancelDisconnectEvents.forEach((t) => t()), e.data?.port && e.data?.port !== this.port && this.logger?.info("Got server port via connect:", {
      port: e.data.port
    }), e.data?.requiresAuth) {
      if (!this.options?.password) {
        this.abortAuthentication(
          new Error(
            "The AbletonJS plugin requires a password. Pass it to the constructor."
          )
        );
        return;
      }
      if (!e.data?.salt) {
        this.abortAuthentication(
          new Error(
            "The AbletonJS plugin did not send an authentication salt."
          )
        );
        return;
      }
      try {
        const t = oa(this.options.password, e.data.salt);
        await this.sendCommand({
          ns: "internal",
          name: "authenticate",
          args: { hash: t }
        });
      } catch (t) {
        const r = t instanceof Error ? t : new Error("Authentication failed");
        this.abortAuthentication(r);
        return;
      }
    }
    this.handleConnect(this.clientState === "starting" ? "start" : "realtime");
  }
  abortAuthentication(e) {
    this.logger?.error(e.message), this.shouldReconnect = !1, this.clientState = "closed", this.emit("error", e), this.closeCurrentSocket();
  }
  /**
   * Sends a raw command to Ableton. Usually, you won't need this.
   * A good starting point in general is the `song` prop.
   *
   * Commands issued in the same event-loop turn are automatically
   * coalesced into a single WebSocket round-trip.
   */
  async sendCommand(e) {
    return new Promise((t, r) => {
      this.commandQueue.push({ command: e, res: t, rej: r }), this.flushScheduled || (this.flushScheduled = !0, queueMicrotask(() => {
        this.flushScheduled = !1, this.flushCommandQueue();
      }));
    });
  }
  async flushCommandQueue() {
    if (this.commandQueue.length === 0)
      return;
    const e = this.commandQueue;
    this.commandQueue = [], e.length > 1 && this.logger?.debug("Flushing command queue", { length: e.length }), await ha(async () => {
      try {
        const t = await this.sendCommandEnvelope(
          e.map((r) => r.command)
        );
        if (!Array.isArray(t) || t.length !== e.length) {
          const r = new Error("Unexpected commands response from Ableton.");
          for (const n of e)
            n.rej(r);
          return;
        }
        for (let r = 0; r < e.length; r++) {
          const n = e[r], a = t[r];
          a.ok ? n.res(a.data) : n.rej(new Error(a.error ?? "Command failed"));
        }
      } catch (t) {
        for (const r of e)
          r.rej(t);
      }
    });
  }
  sendCommandEnvelope(e) {
    return new Promise((t, r) => {
      const n = this.getId(), a = {
        uuid: n,
        commands: e
      }, o = JSON.stringify(a), u = da(e), c = e.filter((f) => f.timeout).reduce(
        (f, _) => Math.max(f, _.timeout ?? 0),
        this.options?.commandTimeoutMs ?? 3e3
      );
      let i = null;
      const l = () => {
        i && clearTimeout(i);
      }, h = () => {
        this.msgMap.delete(n), l();
      }, d = () => {
        l(), i = setTimeout(() => {
          h(), r(
            new fa(
              `The command ${u} timed out after ${c} ms.`,
              a
            )
          );
        }, c);
      }, m = Date.now();
      this.msgMap.set(n, {
        res: (f) => {
          const _ = Date.now() - m;
          _ > (this.options?.commandWarnMs ?? 2e3) && this.logger?.warn("Commands took longer than expected", {
            commands: u,
            duration: _
          }), h(), t(f);
        },
        rej: (f) => {
          h(), r(f);
        },
        clearTimeout: () => {
          h(), r(
            new ma(
              `Live disconnected before being able to respond to ${u}`,
              a
            )
          );
        }
      }), this.sendRaw(o).then(d).catch((f) => {
        h(), r(f);
      });
    });
  }
  /**
   * Sends a command using the response cache when possible.
   * Used by cached `get_prop` calls; prefer {@link Ableton.getProp} or
   * `Namespace.get` instead of calling this directly.
   */
  async sendCachedCommand(e) {
    const t = e.args?.prop ?? JSON.stringify(e.args), r = [e.ns, e.nsid, t].filter(Boolean).join("/"), n = this.cache?.get(r), a = await this.sendCommand({
      ...e,
      etag: n?.etag,
      cache: !0
    });
    if (ji(a)) {
      if (n)
        return n.data;
      throw new Error("Tried to get an object that isn't cached.");
    } else
      return a.etag && this.cache?.set(r, a), a.data;
  }
  /**
   * Gets a property from a Live object.
   * Prefer the typed `get` helpers on namespaces such as `song` or `track`.
   *
   * @param ns Namespace name (e.g. `"song"`, `"track"`)
   * @param nsid Object id when addressing a specific Live object
   * @param prop Property name
   * @param cache When true and caching is enabled, use etag-based caching
   */
  async getProp(e, t, r, n) {
    const a = { ns: e, nsid: t, name: "get_prop", args: { prop: r } };
    return n && this.cache ? this.sendCachedCommand(a) : this.sendCommand(a);
  }
  /**
   * Sets a property on a Live object.
   * Prefer the typed `set` helpers on namespaces such as `song` or `track`.
   *
   * @param ns Namespace name (e.g. `"song"`, `"track"`)
   * @param nsid Object id when addressing a specific Live object
   * @param prop Property name
   * @param value Value to assign
   */
  async setProp(e, t, r, n) {
    return this.sendCommand({
      ns: e,
      nsid: t,
      name: "set_prop",
      args: { prop: r, value: n }
    });
  }
  /**
   * Subscribes to changes of a Live object property.
   * Prefer the typed `addListener` helpers on namespaces such as `song` or `track`.
   *
   * @returns A function that removes this listener
   */
  async addPropListener(e, t, r, n) {
    const a = this.getId(), o = await this.sendCommand({
      ns: e,
      nsid: t,
      name: "add_listener",
      args: { prop: r, nsid: t, eventId: a }
    });
    return this.eventListeners.has(o) ? this.eventListeners.set(o, [
      ...this.eventListeners.get(o),
      n
    ]) : this.eventListeners.set(o, [n]), () => this.removePropListener(e, t, r, o, n);
  }
  /**
   * Removes a property listener previously added with {@link Ableton.addPropListener}.
   * Usually you call the unsubscribe function returned by `addPropListener` instead.
   *
   * @returns `true` if the listener was removed, `false` if it was not found
   */
  async removePropListener(e, t, r, n, a) {
    const o = this.eventListeners.get(n);
    if (!o)
      return !1;
    if (o.length > 1)
      return this.eventListeners.set(
        n,
        o.filter((u) => u !== a)
      ), !0;
    if (o.length === 1)
      return this.eventListeners.delete(n), await this.sendCommand({
        ns: e,
        nsid: t,
        name: "remove_listener",
        args: { prop: r, nsid: t }
      }), !0;
  }
  /**
   * Removes all event listeners that were attached to properties.
   * This is useful for clearing all listeners when Live
   * disconnects, for example.
   */
  removeAllPropListeners() {
    this.eventListeners.clear();
  }
  /**
   * Sends a raw WebSocket text frame to the Remote Script.
   * This bypasses command queuing and batching; use with caution.
   */
  async sendRaw(e) {
    if (this.clientState === "closed")
      throw new Error(
        "The client hasn't been started yet. Please call start() first."
      );
    if (!this.client || this.client.readyState !== WebSocket.OPEN)
      throw new Error("The client is disconnected.");
    this.client.send(e);
  }
  /** Whether the client currently has an active connection to Live. */
  isConnected() {
    return this._isConnected;
  }
}
export {
  _a as Ableton,
  ma as DisconnectError,
  fa as TimeoutError,
  Yt as packageVersion
};
//# sourceMappingURL=ableton.js.map
