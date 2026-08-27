var ne = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gs(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var ye, ur;
function Hs() {
  if (ur) return ye;
  ur = 1;
  var s = typeof ne == "object" && ne && ne.Object === Object && ne;
  return ye = s, ye;
}
var we, hr;
function an() {
  if (hr) return we;
  hr = 1;
  var s = Hs(), e = typeof self == "object" && self && self.Object === Object && self, t = s || e || Function("return this")();
  return we = t, we;
}
var Se, lr;
function Jt() {
  if (lr) return Se;
  lr = 1;
  var s = an(), e = s.Symbol;
  return Se = e, Se;
}
var be, dr;
function on() {
  if (dr) return be;
  dr = 1;
  function s(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
      a[r] = t(e[r], r, e);
    return a;
  }
  return be = s, be;
}
var Re, fr;
function cn() {
  if (fr) return Re;
  fr = 1;
  var s = Array.isArray;
  return Re = s, Re;
}
var Te, mr;
function un() {
  if (mr) return Te;
  mr = 1;
  var s = Jt(), e = Object.prototype, t = e.hasOwnProperty, r = e.toString, n = s ? s.toStringTag : void 0;
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
  return Te = a, Te;
}
var Ce, pr;
function hn() {
  if (pr) return Ce;
  pr = 1;
  var s = Object.prototype, e = s.toString;
  function t(r) {
    return e.call(r);
  }
  return Ce = t, Ce;
}
var Le, gr;
function Ms() {
  if (gr) return Le;
  gr = 1;
  var s = Jt(), e = un(), t = hn(), r = "[object Null]", n = "[object Undefined]", a = s ? s.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? n : r : a && a in Object(u) ? e(u) : t(u);
  }
  return Le = o, Le;
}
var Ae, _r;
function Bs() {
  if (_r) return Ae;
  _r = 1;
  function s(e) {
    return e != null && typeof e == "object";
  }
  return Ae = s, Ae;
}
var xe, vr;
function Vs() {
  if (vr) return xe;
  vr = 1;
  var s = Ms(), e = Bs(), t = "[object Symbol]";
  function r(n) {
    return typeof n == "symbol" || e(n) && s(n) == t;
  }
  return xe = r, xe;
}
var Ie, Er;
function Ws() {
  if (Er) return Ie;
  Er = 1;
  var s = Jt(), e = on(), t = cn(), r = Vs(), n = s ? s.prototype : void 0, a = n ? n.toString : void 0;
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
  return Ie = o, Ie;
}
var Oe, yr;
function ln() {
  if (yr) return Oe;
  yr = 1;
  function s(e, t, r) {
    var n = -1, a = e.length;
    t < 0 && (t = -t > a ? 0 : a + t), r = r > a ? a : r, r < 0 && (r += a), a = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var o = Array(a); ++n < a; )
      o[n] = e[n + t];
    return o;
  }
  return Oe = s, Oe;
}
var $e, wr;
function dn() {
  if (wr) return $e;
  wr = 1;
  var s = ln();
  function e(t, r, n) {
    var a = t.length;
    return n = n === void 0 ? a : n, !r && n >= a ? t : s(t, r, n);
  }
  return $e = e, $e;
}
var Ne, Sr;
function Qt() {
  if (Sr) return Ne;
  Sr = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + s + n + a + "]");
  function c(i) {
    return u.test(i);
  }
  return Ne = c, Ne;
}
var Pe, br;
function Xs() {
  if (br) return Pe;
  br = 1;
  function s(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return Pe = s, Pe;
}
var qe, Rr;
function fn() {
  if (Rr) return qe;
  Rr = 1;
  var s = Ms(), e = Bs(), t = "[object RegExp]";
  function r(n) {
    return e(n) && s(n) == t;
  }
  return qe = r, qe;
}
var ke, Tr;
function mn() {
  if (Tr) return ke;
  Tr = 1;
  function s(e) {
    return function(t) {
      return e(t);
    };
  }
  return ke = s, ke;
}
var te = { exports: {} };
te.exports;
var Cr;
function pn() {
  return Cr || (Cr = 1, (function(s, e) {
    var t = Hs(), r = e && !e.nodeType && e, n = r && !0 && s && !s.nodeType && s, a = n && n.exports === r, o = a && t.process, u = (function() {
      try {
        var c = n && n.require && n.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    s.exports = u;
  })(te, te.exports)), te.exports;
}
var Fe, Lr;
function gn() {
  if (Lr) return Fe;
  Lr = 1;
  var s = fn(), e = mn(), t = pn(), r = t && t.isRegExp, n = r ? e(r) : s;
  return Fe = n, Fe;
}
var je, Ar;
function _n() {
  if (Ar) return je;
  Ar = 1;
  function s(e) {
    return function(t) {
      return t?.[e];
    };
  }
  return je = s, je;
}
var De, xr;
function vn() {
  if (xr) return De;
  xr = 1;
  var s = _n(), e = s("length");
  return De = e, De;
}
var ze, Ir;
function En() {
  if (Ir) return ze;
  Ir = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "[" + s + "]", u = "[" + n + "]", c = "\\ud83c[\\udffb-\\udfff]", i = "(?:" + u + "|" + c + ")", l = "[^" + s + "]", h = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", m = "\\u200d", f = i + "?", _ = "[" + a + "]?", g = "(?:" + m + "(?:" + [l, h, d].join("|") + ")" + _ + f + ")*", R = _ + f + g, N = "(?:" + [l + u + "?", u, h, d, o].join("|") + ")", w = RegExp(c + "(?=" + c + ")|" + N + R, "g");
  function x(I) {
    for (var A = w.lastIndex = 0; w.test(I); )
      ++A;
    return A;
  }
  return ze = x, ze;
}
var Ue, Or;
function yn() {
  if (Or) return Ue;
  Or = 1;
  var s = vn(), e = Qt(), t = En();
  function r(n) {
    return e(n) ? t(n) : s(n);
  }
  return Ue = r, Ue;
}
var Ge, $r;
function wn() {
  if ($r) return Ge;
  $r = 1;
  function s(e) {
    return e.split("");
  }
  return Ge = s, Ge;
}
var He, Nr;
function Sn() {
  if (Nr) return He;
  Nr = 1;
  var s = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", n = e + t + r, a = "\\ufe0e\\ufe0f", o = "[" + s + "]", u = "[" + n + "]", c = "\\ud83c[\\udffb-\\udfff]", i = "(?:" + u + "|" + c + ")", l = "[^" + s + "]", h = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", m = "\\u200d", f = i + "?", _ = "[" + a + "]?", g = "(?:" + m + "(?:" + [l, h, d].join("|") + ")" + _ + f + ")*", R = _ + f + g, N = "(?:" + [l + u + "?", u, h, d, o].join("|") + ")", w = RegExp(c + "(?=" + c + ")|" + N + R, "g");
  function x(I) {
    return I.match(w) || [];
  }
  return He = x, He;
}
var Me, Pr;
function bn() {
  if (Pr) return Me;
  Pr = 1;
  var s = wn(), e = Qt(), t = Sn();
  function r(n) {
    return e(n) ? t(n) : s(n);
  }
  return Me = r, Me;
}
var Be, qr;
function Rn() {
  if (qr) return Be;
  qr = 1;
  var s = /\s/;
  function e(t) {
    for (var r = t.length; r-- && s.test(t.charAt(r)); )
      ;
    return r;
  }
  return Be = e, Be;
}
var Ve, kr;
function Tn() {
  if (kr) return Ve;
  kr = 1;
  var s = Rn(), e = /^\s+/;
  function t(r) {
    return r && r.slice(0, s(r) + 1).replace(e, "");
  }
  return Ve = t, Ve;
}
var We, Fr;
function Cn() {
  if (Fr) return We;
  Fr = 1;
  var s = Tn(), e = Xs(), t = Vs(), r = NaN, n = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
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
  return We = c, We;
}
var Xe, jr;
function Ln() {
  if (jr) return Xe;
  jr = 1;
  var s = Cn(), e = 1 / 0, t = 17976931348623157e292;
  function r(n) {
    if (!n)
      return n === 0 ? n : 0;
    if (n = s(n), n === e || n === -e) {
      var a = n < 0 ? -1 : 1;
      return a * t;
    }
    return n === n ? n : 0;
  }
  return Xe = r, Xe;
}
var Ye, Dr;
function An() {
  if (Dr) return Ye;
  Dr = 1;
  var s = Ln();
  function e(t) {
    var r = s(t), n = r % 1;
    return r === r ? n ? r - n : r : 0;
  }
  return Ye = e, Ye;
}
var Je, zr;
function xn() {
  if (zr) return Je;
  zr = 1;
  var s = Ws();
  function e(t) {
    return t == null ? "" : s(t);
  }
  return Je = e, Je;
}
var Qe, Ur;
function In() {
  if (Ur) return Qe;
  Ur = 1;
  var s = Ws(), e = dn(), t = Qt(), r = Xs(), n = gn(), a = yn(), o = bn(), u = An(), c = xn(), i = 30, l = "...", h = /\w*$/;
  function d(m, f) {
    var _ = i, g = l;
    if (r(f)) {
      var R = "separator" in f ? f.separator : R;
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
    if (R === void 0)
      return I + g;
    if (w && (x += I.length - x), n(R)) {
      if (m.slice(x).search(R)) {
        var A, P = I;
        for (R.global || (R = RegExp(R.source, c(h.exec(R)) + "g")), R.lastIndex = 0; A = R.exec(P); )
          var S = A.index;
        I = I.slice(0, S === void 0 ? x : S);
      }
    } else if (m.indexOf(s(R), x) != x) {
      var D = I.lastIndexOf(R);
      D > -1 && (I = I.slice(0, D));
    }
    return I + g;
  }
  return Qe = d, Qe;
}
var On = In();
const $n = /* @__PURE__ */ Gs(On), ee = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, Nn = typeof AbortController == "function", oe = Nn ? AbortController : class {
  constructor() {
    this.signal = new Ys();
  }
  abort(e = new Error("This operation was aborted")) {
    this.signal.reason = this.signal.reason || e, this.signal.aborted = !0, this.signal.dispatchEvent({
      type: "abort",
      target: this.signal
    });
  }
}, Pn = typeof AbortSignal == "function", qn = typeof oe.AbortSignal == "function", Ys = Pn ? AbortSignal : qn ? oe.AbortController : class {
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
}, Zt = /* @__PURE__ */ new Set(), Ze = (s, e) => {
  const t = `LRU_CACHE_OPTION_${s}`;
  le(t) && Kt(t, `${s} option`, `options.${e}`, J);
}, Ke = (s, e) => {
  const t = `LRU_CACHE_METHOD_${s}`;
  if (le(t)) {
    const { prototype: r } = J, { get: n } = Object.getOwnPropertyDescriptor(r, s);
    Kt(t, `${s} method`, `cache.${e}()`, n);
  }
}, kn = (s, e) => {
  const t = `LRU_CACHE_PROPERTY_${s}`;
  if (le(t)) {
    const { prototype: r } = J, { get: n } = Object.getOwnPropertyDescriptor(r, s);
    Kt(t, `${s} property`, `cache.${e}`, n);
  }
}, Js = (...s) => {
  typeof process == "object" && process && typeof process.emitWarning == "function" ? process.emitWarning(...s) : console.error(...s);
}, le = (s) => !Zt.has(s), Kt = (s, e, t, r) => {
  Zt.add(s);
  const n = `The ${e} is deprecated. Please use ${t} instead.`;
  Js(n, "DeprecationWarning", s, r);
}, W = (s) => s && s === Math.floor(s) && s > 0 && isFinite(s), Qs = (s) => W(s) ? s <= Math.pow(2, 8) ? Uint8Array : s <= Math.pow(2, 16) ? Uint16Array : s <= Math.pow(2, 32) ? Uint32Array : s <= Number.MAX_SAFE_INTEGER ? ae : null : null;
class ae extends Array {
  constructor(e) {
    super(e), this.fill(0);
  }
}
class Fn {
  constructor(e) {
    if (e === 0)
      return [];
    const t = Qs(e);
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
      fetchContext: R,
      noDeleteOnFetchRejection: N,
      noDeleteOnStaleGet: w,
      allowStaleOnFetchRejection: x,
      allowStaleOnFetchAbort: I,
      ignoreFetchAbort: A
    } = e, { length: P, maxAge: S, stale: D } = e instanceof J ? {} : e;
    if (t !== 0 && !W(t))
      throw new TypeError("max option must be a nonnegative integer");
    const X = t ? Qs(t) : Array;
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
    if (this.fetchContext = R, !this.fetchMethod && R !== void 0)
      throw new TypeError(
        "cannot set fetchContext without fetchMethod"
      );
    if (this.keyMap = /* @__PURE__ */ new Map(), this.keyList = new Array(t).fill(null), this.valList = new Array(t).fill(null), this.next = new X(t), this.prev = new X(t), this.head = 0, this.tail = 0, this.free = new Fn(t), this.initialFill = 1, this.size = 0, typeof i == "function" && (this.dispose = i), typeof l == "function" ? (this.disposeAfter = l, this.disposed = []) : (this.disposeAfter = null, this.disposed = null), this.noDisposeOnSet = !!h, this.noUpdateTTL = !!d, this.noDeleteOnFetchRejection = !!N, this.allowStaleOnFetchRejection = !!x, this.allowStaleOnFetchAbort = !!I, this.ignoreFetchAbort = !!A, this.maxEntrySize !== 0) {
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
    if (this.allowStale = !!c || !!D, this.noDeleteOnStaleGet = !!w, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!u, this.ttlResolution = W(n) || n === 0 ? n : 1, this.ttlAutopurge = !!a, this.ttl = r || S || 0, this.ttl) {
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
      le(Y) && (Zt.add(Y), Js("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", Y, J));
    }
    D && Ze("stale", "allowStale"), S && Ze("maxAge", "ttl"), P && Ze("length", "sizeCalculation");
  }
  getRemainingTTL(e) {
    return this.has(e, { updateAgeOnHas: !1 }) ? 1 / 0 : 0;
  }
  initializeTTLTracking() {
    this.ttls = new ae(this.max), this.starts = new ae(this.max), this.setItemTTL = (r, n, a = ee.now()) => {
      if (this.starts[r] = n !== 0 ? a : 0, this.ttls[r] = n, n !== 0 && this.ttlAutopurge) {
        const o = setTimeout(() => {
          this.isStale(r) && this.delete(this.keyList[r]);
        }, n + 1);
        o.unref && o.unref();
      }
    }, this.updateItemAge = (r) => {
      this.starts[r] = this.ttls[r] !== 0 ? ee.now() : 0;
    }, this.statusTTL = (r, n) => {
      r && (r.ttl = this.ttls[n], r.start = this.starts[n], r.now = e || t(), r.remainingTTL = r.now + r.ttl - r.start);
    };
    let e = 0;
    const t = () => {
      const r = ee.now();
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
    this.calculatedSize = 0, this.sizes = new ae(this.max), this.removeItemSize = (e) => {
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
    return Ke("prune", "purgeStale"), this.purgeStale;
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
        const u = ee.now() - this.starts[t];
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
        r.start = ee.now() - n;
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
    const o = new oe();
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
      const { aborted: f } = o.signal, _ = f && r.allowStaleOnFetchAbort, g = _ || r.allowStaleOnFetchRejection, R = g || r.noDeleteOnFetchRejection;
      if (this.valList[t] === d && (!R || d.__staleWhileFetching === void 0 ? this.delete(e) : _ || (this.valList[t] = d.__staleWhileFetching)), g)
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
    signal: R
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
      signal: R
    };
    let w = this.keyMap.get(e);
    if (w === void 0) {
      g && (g.fetch = "miss");
      const x = this.backgroundFetch(e, w, N, f);
      return x.__returned = x;
    } else {
      const x = this.valList[w];
      if (this.isBackgroundFetch(x)) {
        const D = t && x.__staleWhileFetching !== void 0;
        return g && (g.fetch = "inflight", D && (g.returnedStale = !0)), D ? x.__staleWhileFetching : x.__returned = x;
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
    return Ke("del", "delete"), this.delete;
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
    return Ke("reset", "clear"), this.clear;
  }
  get length() {
    return kn("length", "size"), this.size;
  }
  static get AbortController() {
    return oe;
  }
  static get AbortSignal() {
    return Ys;
  }
}
class jn {
  value;
  next;
  constructor(e) {
    this.value = e;
  }
}
class Dn {
  #e;
  #t;
  #r;
  constructor() {
    this.clear();
  }
  enqueue(e) {
    const t = new jn(e);
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
function zn(s) {
  Gr(s);
  const e = new Dn();
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
        Gr(c), s = c, queueMicrotask(() => {
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
function Gr(s) {
  if (!((Number.isInteger(s) || s === Number.POSITIVE_INFINITY) && s > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
}
class $ {
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
class z extends $ {
  constructor(e, t) {
    super(e, "device-parameter", t.id), this.raw = t;
  }
}
class Zs extends $ {
  constructor(e, t) {
    super(e, "mixer-device", t.id), this.raw = t, this.transformers = {
      crossfader: (r) => new z(e, r),
      cue_volume: (r) => new z(e, r),
      left_split_stereo: (r) => new z(e, r),
      panning: (r) => new z(e, r),
      right_split_stereo: (r) => new z(e, r),
      sends: (r) => r.map((n) => new z(e, n)),
      song_tempo: (r) => new z(e, r),
      track_activator: (r) => new z(e, r),
      volume: (r) => new z(e, r)
    };
  }
}
class Q extends $ {
  constructor(e, t) {
    super(e, "chain", t.id), this.raw = t, this.transformers = {
      devices: (r) => r.map((n) => ce(e, n)),
      mixer_device: (r) => new Zs(e, r)
    }, this.cachedProps = {
      devices: !0,
      mixer_device: !0
    };
  }
}
class er extends $ {
  constructor(e, t) {
    super(e, "drum-pad", t.id), this.raw = t, this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n))
    }, this.cachedProps = {
      chains: !0
    };
  }
}
class tr extends $ {
  constructor(e, t) {
    super(e, "device-view", t);
  }
}
const Un = "Looper";
class Gn extends $ {
  constructor(e, t) {
    super(e, "looper-device", t.id), this.raw = t, this.view = new tr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new er(e, n)),
      parameters: (r) => r.map((n) => new z(e, n)),
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
const Hn = "PluginDevice";
class Mn extends $ {
  constructor(e, t) {
    super(e, "plugin-device", t.id), this.raw = t, this.view = new tr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new er(e, n)),
      parameters: (r) => r.map((n) => new z(e, n)),
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
function ce(s, e) {
  return e.class_name === Un ? new Gn(s, e) : e.class_name === Hn ? new Mn(s, e) : new Bn(s, e);
}
class Bn extends $ {
  constructor(e, t) {
    super(e, "device", t.id), this.raw = t, this.view = new tr(e, t.id), this.transformers = {
      chains: (r) => r.map((n) => new Q(e, n)),
      drum_pads: (r) => r.map((n) => new er(e, n)),
      parameters: (r) => r.map((n) => new z(e, n)),
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
class de {
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
class Hr extends $ {
  constructor(e, t) {
    super(e, "envelope", t.id), this.raw = t, this.transformers = {
      parameter: (r) => new z(e, r)
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
const et = (s) => ({
  pitch: s[0],
  time: s[1],
  duration: s[2],
  velocity: s[3],
  muted: s[4]
}), Mr = (s) => [
  s.pitch,
  s.time,
  s.duration,
  s.velocity,
  s.muted
];
class B extends $ {
  constructor(e, t) {
    super(e, "clip", t.id), this.raw = t, this.transformers = {
      color: (r) => new de(r),
      notes: (r) => r.map(et)
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
    })).map(et);
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
    return (await this.sendCommand("get_selected_notes")).map(et);
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
      notes: e.map(Mr)
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
    return this.sendCommand("set_notes", { notes: e.map(Mr) });
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
class rr extends $ {
  constructor(e, t) {
    super(e, "clip_slot", t.id), this.raw = t, this.transformers = {
      clip: (r) => r ? new B(e, r) : null,
      color: (r) => new de(r)
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
class Vn extends $ {
  constructor(e, t) {
    super(e, "track-view", t), this.transformers = {
      selected_device: (r) => ce(e, r)
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
class Br extends $ {
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
class M extends $ {
  constructor(e, t) {
    super(e, "track", t.id), this.raw = t, this.view = new Vn(this.ableton, t.id), this.transformers = {
      arrangement_clips: (r) => r.map((n) => new B(e, n)),
      color: (r) => new de(r),
      devices: (r) => r.map((n) => ce(e, n)),
      clip_slots: (r) => r.map((n) => new rr(e, n)),
      group_track: (r) => r ? new M(e, r) : null,
      mixer_device: (r) => new Zs(e, r),
      take_lanes: (r) => r.map((n) => new Br(e, n))
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
    return new Br(this.ableton, e);
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
    return ce(this.ableton, r);
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
class Wn extends $ {
  constructor(e, t) {
    super(e, "cue-point", t.id), this.raw = t;
  }
  async jump() {
    return this.sendCommand("jump");
  }
}
class Vt extends $ {
  constructor(e, t) {
    super(e, "scene", t.id), this.raw = t, this.transformers = {
      color: (r) => new de(r),
      clip_slots: (r) => r.map((n) => new rr(this.ableton, n))
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
class Xn extends $ {
  constructor(e) {
    super(e, "song-view"), this.transformers = {
      selected_parameter: (t) => new z(e, t),
      selected_track: (t) => new M(e, t),
      selected_scene: (t) => new Vt(e, t),
      highlighted_clip_slot: (t) => new rr(e, t),
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
class Yn extends $ {
  constructor(e, t) {
    super(e, "groove", t.id), this.raw = t;
  }
}
class Jn extends $ {
  constructor(e) {
    super(e, "groove-pool"), this.transformers = {
      grooves: (t) => t.map((r) => new Yn(e, r))
    }, this.cachedProps = {
      grooves: !0
    };
  }
}
class Qn extends $ {
  constructor(e, t) {
    super(e, "tuning-system", t.id), this.raw = t;
  }
}
class Zn extends $ {
  constructor(e) {
    super(e, "song"), this.transformers = {
      cue_points: (t) => t.map((r) => new Wn(e, r)),
      master_track: (t) => new M(e, t),
      return_tracks: (t) => t.map((r) => new M(e, r)),
      tracks: (t) => t.map((r) => new M(e, r)),
      tuning_system: (t) => t ? new Qn(e, t) : null,
      visible_tracks: (t) => t.map((r) => new M(e, r)),
      scenes: (t) => t.map((r) => new Vt(e, r))
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
  view = new Xn(this.ableton);
  groovePool = new Jn(this.ableton);
  async beginUndoStep() {
    return this.sendCommand("begin_undo_step");
  }
  async continuePlaying() {
    return this.sendCommand("continue_playing");
  }
  async createAudioTrack(e = -1) {
    const t = await this.sendCommand("create_audio_track", { index: e });
    return new M(this.ableton, t);
  }
  async createMidiTrack(e = -1) {
    const t = await this.sendCommand("create_midi_track", { index: e });
    return new M(this.ableton, t);
  }
  async createReturnTrack() {
    const e = await this.sendCommand("create_return_track");
    return new M(this.ableton, e);
  }
  async createScene(e = -1) {
    const t = await this.sendCommand("create_scene", { index: e });
    return new Vt(this.ableton, t);
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
const Wt = "5.0.0-3";
var ie = { exports: {} }, tt, Vr;
function fe() {
  if (Vr) return tt;
  Vr = 1;
  const s = "2.0.0", e = 256, t = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, r = 16, n = e - 6;
  return tt = {
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
  }, tt;
}
var rt, Wr;
function me() {
  return Wr || (Wr = 1, rt = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  }), rt;
}
var Xr;
function re() {
  return Xr || (Xr = 1, (function(s, e) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: t,
      MAX_SAFE_BUILD_LENGTH: r,
      MAX_LENGTH: n
    } = fe(), a = me();
    e = s.exports = {};
    const o = e.re = [], u = e.safeRe = [], c = e.src = [], i = e.t = {};
    let l = 0;
    const h = "[a-zA-Z0-9-]", d = [
      ["\\s", 1],
      ["\\d", n],
      [h, r]
    ], m = (_) => {
      for (const [g, R] of d)
        _ = _.split(`${g}*`).join(`${g}{0,${R}}`).split(`${g}+`).join(`${g}{1,${R}}`);
      return _;
    }, f = (_, g, R) => {
      const N = m(g), w = l++;
      a(_, w, g), i[_] = w, c[w] = g, o[w] = new RegExp(g, R ? "g" : void 0), u[w] = new RegExp(N, R ? "g" : void 0);
    };
    f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f("MAINVERSION", `(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${c[i.NUMERICIDENTIFIER]}|${c[i.NONNUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${c[i.NUMERICIDENTIFIERLOOSE]}|${c[i.NONNUMERICIDENTIFIER]})`), f("PRERELEASE", `(?:-(${c[i.PRERELEASEIDENTIFIER]}(?:\\.${c[i.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${c[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[i.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${h}+`), f("BUILD", `(?:\\+(${c[i.BUILDIDENTIFIER]}(?:\\.${c[i.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${c[i.MAINVERSION]}${c[i.PRERELEASE]}?${c[i.BUILD]}?`), f("FULL", `^${c[i.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${c[i.MAINVERSIONLOOSE]}${c[i.PRERELEASELOOSE]}?${c[i.BUILD]}?`), f("LOOSE", `^${c[i.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${c[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${c[i.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:${c[i.PRERELEASE]})?${c[i.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:${c[i.PRERELEASELOOSE]})?${c[i.BUILD]}?)?)?`), f("XRANGE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), f("COERCE", `${c[i.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", c[i.COERCEPLAIN] + `(?:${c[i.PRERELEASE]})?(?:${c[i.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", c[i.COERCE], !0), f("COERCERTLFULL", c[i.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${c[i.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", f("TILDE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${c[i.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", f("CARET", `^${c[i.LONECARET]}${c[i.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${c[i.LONECARET]}${c[i.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${c[i.GTLT]}\\s*(${c[i.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]}|${c[i.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${c[i.XRANGEPLAIN]})\\s+-\\s+(${c[i.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${c[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[i.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(ie, ie.exports)), ie.exports;
}
var st, Yr;
function sr() {
  if (Yr) return st;
  Yr = 1;
  const s = Object.freeze({ loose: !0 }), e = Object.freeze({});
  return st = (r) => r ? typeof r != "object" ? s : r : e, st;
}
var nt, Jr;
function Ks() {
  if (Jr) return nt;
  Jr = 1;
  const s = /^[0-9]+$/, e = (r, n) => {
    const a = s.test(r), o = s.test(n);
    return a && o && (r = +r, n = +n), r === n ? 0 : a && !o ? -1 : o && !a ? 1 : r < n ? -1 : 1;
  };
  return nt = {
    compareIdentifiers: e,
    rcompareIdentifiers: (r, n) => e(n, r)
  }, nt;
}
var it, Qr;
function j() {
  if (Qr) return it;
  Qr = 1;
  const s = me(), { MAX_LENGTH: e, MAX_SAFE_INTEGER: t } = fe(), { safeRe: r, t: n } = re(), a = sr(), { compareIdentifiers: o } = Ks();
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
  return it = u, it;
}
var at, Zr;
function Z() {
  if (Zr) return at;
  Zr = 1;
  const s = j();
  return at = (t, r, n = !1) => {
    if (t instanceof s)
      return t;
    try {
      return new s(t, r);
    } catch (a) {
      if (!n)
        return null;
      throw a;
    }
  }, at;
}
var ot, Kr;
function Kn() {
  if (Kr) return ot;
  Kr = 1;
  const s = Z();
  return ot = (t, r) => {
    const n = s(t, r);
    return n ? n.version : null;
  }, ot;
}
var ct, es;
function ei() {
  if (es) return ct;
  es = 1;
  const s = Z();
  return ct = (t, r) => {
    const n = s(t.trim().replace(/^[=v]+/, ""), r);
    return n ? n.version : null;
  }, ct;
}
var ut, ts;
function ti() {
  if (ts) return ut;
  ts = 1;
  const s = j();
  return ut = (t, r, n, a, o) => {
    typeof n == "string" && (o = a, a = n, n = void 0);
    try {
      return new s(
        t instanceof s ? t.version : t,
        n
      ).inc(r, a, o).version;
    } catch {
      return null;
    }
  }, ut;
}
var ht, rs;
function ri() {
  if (rs) return ht;
  rs = 1;
  const s = Z();
  return ht = (t, r) => {
    const n = s(t, null, !0), a = s(r, null, !0), o = n.compare(a);
    if (o === 0)
      return null;
    const u = o > 0, c = u ? n : a, i = u ? a : n, l = !!c.prerelease.length;
    if (!!i.prerelease.length && !l)
      return !i.patch && !i.minor ? "major" : c.patch ? "patch" : c.minor ? "minor" : "major";
    const d = l ? "pre" : "";
    return n.major !== a.major ? d + "major" : n.minor !== a.minor ? d + "minor" : n.patch !== a.patch ? d + "patch" : "prerelease";
  }, ht;
}
var lt, ss;
function si() {
  if (ss) return lt;
  ss = 1;
  const s = j();
  return lt = (t, r) => new s(t, r).major, lt;
}
var dt, ns;
function ni() {
  if (ns) return dt;
  ns = 1;
  const s = j();
  return dt = (t, r) => new s(t, r).minor, dt;
}
var ft, is;
function ii() {
  if (is) return ft;
  is = 1;
  const s = j();
  return ft = (t, r) => new s(t, r).patch, ft;
}
var mt, as;
function ai() {
  if (as) return mt;
  as = 1;
  const s = Z();
  return mt = (t, r) => {
    const n = s(t, r);
    return n && n.prerelease.length ? n.prerelease : null;
  }, mt;
}
var pt, os;
function U() {
  if (os) return pt;
  os = 1;
  const s = j();
  return pt = (t, r, n) => new s(t, n).compare(new s(r, n)), pt;
}
var gt, cs;
function oi() {
  if (cs) return gt;
  cs = 1;
  const s = U();
  return gt = (t, r, n) => s(r, t, n), gt;
}
var _t, us;
function ci() {
  if (us) return _t;
  us = 1;
  const s = U();
  return _t = (t, r) => s(t, r, !0), _t;
}
var vt, hs;
function nr() {
  if (hs) return vt;
  hs = 1;
  const s = j();
  return vt = (t, r, n) => {
    const a = new s(t, n), o = new s(r, n);
    return a.compare(o) || a.compareBuild(o);
  }, vt;
}
var Et, ls;
function ui() {
  if (ls) return Et;
  ls = 1;
  const s = nr();
  return Et = (t, r) => t.sort((n, a) => s(n, a, r)), Et;
}
var yt, ds;
function hi() {
  if (ds) return yt;
  ds = 1;
  const s = nr();
  return yt = (t, r) => t.sort((n, a) => s(a, n, r)), yt;
}
var wt, fs;
function pe() {
  if (fs) return wt;
  fs = 1;
  const s = U();
  return wt = (t, r, n) => s(t, r, n) > 0, wt;
}
var St, ms;
function ir() {
  if (ms) return St;
  ms = 1;
  const s = U();
  return St = (t, r, n) => s(t, r, n) < 0, St;
}
var bt, ps;
function en() {
  if (ps) return bt;
  ps = 1;
  const s = U();
  return bt = (t, r, n) => s(t, r, n) === 0, bt;
}
var Rt, gs;
function tn() {
  if (gs) return Rt;
  gs = 1;
  const s = U();
  return Rt = (t, r, n) => s(t, r, n) !== 0, Rt;
}
var Tt, _s;
function ar() {
  if (_s) return Tt;
  _s = 1;
  const s = U();
  return Tt = (t, r, n) => s(t, r, n) >= 0, Tt;
}
var Ct, vs;
function or() {
  if (vs) return Ct;
  vs = 1;
  const s = U();
  return Ct = (t, r, n) => s(t, r, n) <= 0, Ct;
}
var Lt, Es;
function rn() {
  if (Es) return Lt;
  Es = 1;
  const s = en(), e = tn(), t = pe(), r = ar(), n = ir(), a = or();
  return Lt = (u, c, i, l) => {
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
  }, Lt;
}
var At, ys;
function li() {
  if (ys) return At;
  ys = 1;
  const s = j(), e = Z(), { safeRe: t, t: r } = re();
  return At = (a, o) => {
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
  }, At;
}
var xt, ws;
function di() {
  if (ws) return xt;
  ws = 1;
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
  return xt = s, xt;
}
var It, Ss;
function G() {
  if (Ss) return It;
  Ss = 1;
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
        if (this.set = this.set.filter((T) => !_(T[0])), this.set.length === 0)
          this.set = [E];
        else if (this.set.length > 1) {
          for (const T of this.set)
            if (T.length === 1 && g(T[0])) {
              this.set = [T];
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
      const E = ((this.options.includePrerelease && m) | (this.options.loose && f)) + ":" + p, T = r.get(E);
      if (T)
        return T;
      const y = this.options.loose, C = y ? c[i.HYPHENRANGELOOSE] : c[i.HYPHENRANGE];
      p = p.replace(C, se(this.options.includePrerelease)), o("hyphen replace", p), p = p.replace(c[i.COMPARATORTRIM], l), o("comparator trim", p), p = p.replace(c[i.TILDETRIM], h), o("tilde trim", p), p = p.replace(c[i.CARETTRIM], d), o("caret trim", p);
      let O = p.split(" ").map((k) => N(k, this.options)).join(" ").split(/\s+/).map((k) => Y(k, this.options));
      y && (O = O.filter((k) => (o("loose invalid filter", k, this.options), !!k.match(c[i.COMPARATORLOOSE])))), o("range list", O);
      const L = /* @__PURE__ */ new Map(), q = O.map((k) => new a(k, this.options));
      for (const k of q) {
        if (_(k))
          return [k];
        L.set(k.value, k);
      }
      L.size > 1 && L.has("") && L.delete("");
      const F = [...L.values()];
      return r.set(E, F), F;
    }
    intersects(p, b) {
      if (!(p instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((E) => R(E, b) && p.set.some((T) => R(T, b) && E.every((y) => T.every((C) => y.intersects(C, b)))));
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
        if (Ee(this.set[b], p, this.options))
          return !0;
      return !1;
    }
  }
  It = e;
  const t = di(), r = new t(), n = sr(), a = ge(), o = me(), u = j(), {
    safeRe: c,
    t: i,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: d
  } = re(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: f } = fe(), _ = (v) => v.value === "<0.0.0-0", g = (v) => v.value === "", R = (v, p) => {
    let b = !0;
    const E = v.slice();
    let T = E.pop();
    for (; b && E.length; )
      b = E.every((y) => T.intersects(y, p)), T = E.pop();
    return b;
  }, N = (v, p) => (o("comp", v, p), v = A(v, p), o("caret", v), v = x(v, p), o("tildes", v), v = S(v, p), o("xrange", v), v = X(v, p), o("stars", v), v), w = (v) => !v || v.toLowerCase() === "x" || v === "*", x = (v, p) => v.trim().split(/\s+/).map((b) => I(b, p)).join(" "), I = (v, p) => {
    const b = p.loose ? c[i.TILDELOOSE] : c[i.TILDE];
    return v.replace(b, (E, T, y, C, O) => {
      o("tilde", v, E, T, y, C, O);
      let L;
      return w(T) ? L = "" : w(y) ? L = `>=${T}.0.0 <${+T + 1}.0.0-0` : w(C) ? L = `>=${T}.${y}.0 <${T}.${+y + 1}.0-0` : O ? (o("replaceTilde pr", O), L = `>=${T}.${y}.${C}-${O} <${T}.${+y + 1}.0-0`) : L = `>=${T}.${y}.${C} <${T}.${+y + 1}.0-0`, o("tilde return", L), L;
    });
  }, A = (v, p) => v.trim().split(/\s+/).map((b) => P(b, p)).join(" "), P = (v, p) => {
    o("caret", v, p);
    const b = p.loose ? c[i.CARETLOOSE] : c[i.CARET], E = p.includePrerelease ? "-0" : "";
    return v.replace(b, (T, y, C, O, L) => {
      o("caret", v, T, y, C, O, L);
      let q;
      return w(y) ? q = "" : w(C) ? q = `>=${y}.0.0${E} <${+y + 1}.0.0-0` : w(O) ? y === "0" ? q = `>=${y}.${C}.0${E} <${y}.${+C + 1}.0-0` : q = `>=${y}.${C}.0${E} <${+y + 1}.0.0-0` : L ? (o("replaceCaret pr", L), y === "0" ? C === "0" ? q = `>=${y}.${C}.${O}-${L} <${y}.${C}.${+O + 1}-0` : q = `>=${y}.${C}.${O}-${L} <${y}.${+C + 1}.0-0` : q = `>=${y}.${C}.${O}-${L} <${+y + 1}.0.0-0`) : (o("no pr"), y === "0" ? C === "0" ? q = `>=${y}.${C}.${O}${E} <${y}.${C}.${+O + 1}-0` : q = `>=${y}.${C}.${O}${E} <${y}.${+C + 1}.0-0` : q = `>=${y}.${C}.${O} <${+y + 1}.0.0-0`), o("caret return", q), q;
    });
  }, S = (v, p) => (o("replaceXRanges", v, p), v.split(/\s+/).map((b) => D(b, p)).join(" ")), D = (v, p) => {
    v = v.trim();
    const b = p.loose ? c[i.XRANGELOOSE] : c[i.XRANGE];
    return v.replace(b, (E, T, y, C, O, L) => {
      o("xRange", v, E, T, y, C, O, L);
      const q = w(y), F = q || w(C), k = F || w(O), K = k;
      return T === "=" && K && (T = ""), L = p.includePrerelease ? "-0" : "", q ? T === ">" || T === "<" ? E = "<0.0.0-0" : E = "*" : T && K ? (F && (C = 0), O = 0, T === ">" ? (T = ">=", F ? (y = +y + 1, C = 0, O = 0) : (C = +C + 1, O = 0)) : T === "<=" && (T = "<", F ? y = +y + 1 : C = +C + 1), T === "<" && (L = "-0"), E = `${T + y}.${C}.${O}${L}`) : F ? E = `>=${y}.0.0${L} <${+y + 1}.0.0-0` : k && (E = `>=${y}.${C}.0${L} <${y}.${+C + 1}.0-0`), o("xRange return", E), E;
    });
  }, X = (v, p) => (o("replaceStars", v, p), v.trim().replace(c[i.STAR], "")), Y = (v, p) => (o("replaceGTE0", v, p), v.trim().replace(c[p.includePrerelease ? i.GTE0PRE : i.GTE0], "")), se = (v) => (p, b, E, T, y, C, O, L, q, F, k, K) => (w(E) ? b = "" : w(T) ? b = `>=${E}.0.0${v ? "-0" : ""}` : w(y) ? b = `>=${E}.${T}.0${v ? "-0" : ""}` : C ? b = `>=${b}` : b = `>=${b}${v ? "-0" : ""}`, w(q) ? L = "" : w(F) ? L = `<${+q + 1}.0.0-0` : w(k) ? L = `<${q}.${+F + 1}.0-0` : K ? L = `<=${q}.${F}.${k}-${K}` : v ? L = `<${q}.${F}.${+k + 1}-0` : L = `<=${L}`, `${b} ${L}`.trim()), Ee = (v, p, b) => {
    for (let E = 0; E < v.length; E++)
      if (!v[E].test(p))
        return !1;
    if (p.prerelease.length && !b.includePrerelease) {
      for (let E = 0; E < v.length; E++)
        if (o(v[E].semver), v[E].semver !== a.ANY && v[E].semver.prerelease.length > 0) {
          const T = v[E].semver;
          if (T.major === p.major && T.minor === p.minor && T.patch === p.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return It;
}
var Ot, bs;
function ge() {
  if (bs) return Ot;
  bs = 1;
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
  Ot = e;
  const t = sr(), { safeRe: r, t: n } = re(), a = rn(), o = me(), u = j(), c = G();
  return Ot;
}
var $t, Rs;
function _e() {
  if (Rs) return $t;
  Rs = 1;
  const s = G();
  return $t = (t, r, n) => {
    try {
      r = new s(r, n);
    } catch {
      return !1;
    }
    return r.test(t);
  }, $t;
}
var Nt, Ts;
function fi() {
  if (Ts) return Nt;
  Ts = 1;
  const s = G();
  return Nt = (t, r) => new s(t, r).set.map((n) => n.map((a) => a.value).join(" ").trim().split(" ")), Nt;
}
var Pt, Cs;
function mi() {
  if (Cs) return Pt;
  Cs = 1;
  const s = j(), e = G();
  return Pt = (r, n, a) => {
    let o = null, u = null, c = null;
    try {
      c = new e(n, a);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      c.test(i) && (!o || u.compare(i) === -1) && (o = i, u = new s(o, a));
    }), o;
  }, Pt;
}
var qt, Ls;
function pi() {
  if (Ls) return qt;
  Ls = 1;
  const s = j(), e = G();
  return qt = (r, n, a) => {
    let o = null, u = null, c = null;
    try {
      c = new e(n, a);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      c.test(i) && (!o || u.compare(i) === 1) && (o = i, u = new s(o, a));
    }), o;
  }, qt;
}
var kt, As;
function gi() {
  if (As) return kt;
  As = 1;
  const s = j(), e = G(), t = pe();
  return kt = (n, a) => {
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
  }, kt;
}
var Ft, xs;
function _i() {
  if (xs) return Ft;
  xs = 1;
  const s = G();
  return Ft = (t, r) => {
    try {
      return new s(t, r).range || "*";
    } catch {
      return null;
    }
  }, Ft;
}
var jt, Is;
function cr() {
  if (Is) return jt;
  Is = 1;
  const s = j(), e = ge(), { ANY: t } = e, r = G(), n = _e(), a = pe(), o = ir(), u = or(), c = ar();
  return jt = (l, h, d, m) => {
    l = new s(l, m), h = new r(h, m);
    let f, _, g, R, N;
    switch (d) {
      case ">":
        f = a, _ = u, g = o, R = ">", N = ">=";
        break;
      case "<":
        f = o, _ = c, g = a, R = "<", N = "<=";
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
      }), I.operator === R || I.operator === N || (!A.operator || A.operator === R) && _(l, A.semver))
        return !1;
      if (A.operator === N && g(l, A.semver))
        return !1;
    }
    return !0;
  }, jt;
}
var Dt, Os;
function vi() {
  if (Os) return Dt;
  Os = 1;
  const s = cr();
  return Dt = (t, r, n) => s(t, r, ">", n), Dt;
}
var zt, $s;
function Ei() {
  if ($s) return zt;
  $s = 1;
  const s = cr();
  return zt = (t, r, n) => s(t, r, "<", n), zt;
}
var Ut, Ns;
function yi() {
  if (Ns) return Ut;
  Ns = 1;
  const s = G();
  return Ut = (t, r, n) => (t = new s(t, n), r = new s(r, n), t.intersects(r, n)), Ut;
}
var Gt, Ps;
function wi() {
  if (Ps) return Gt;
  Ps = 1;
  const s = _e(), e = U();
  return Gt = (t, r, n) => {
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
  }, Gt;
}
var Ht, qs;
function Si() {
  if (qs) return Ht;
  qs = 1;
  const s = G(), e = ge(), { ANY: t } = e, r = _e(), n = U(), a = (h, d, m = {}) => {
    if (h === d)
      return !0;
    h = new s(h, m), d = new s(d, m);
    let f = !1;
    e: for (const _ of h.set) {
      for (const g of d.set) {
        const R = c(_, g, m);
        if (f = f || R !== null, R)
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
    let R;
    if (_ && g) {
      if (R = n(_.semver, g.semver, m), R > 0)
        return null;
      if (R === 0 && (_.operator !== ">=" || g.operator !== "<="))
        return null;
    }
    for (const S of f) {
      if (_ && !r(S, String(_), m) || g && !r(S, String(g), m))
        return null;
      for (const D of d)
        if (!r(S, String(D), m))
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
      if (!S.operator && (g || _) && R !== 0)
        return !1;
    }
    return !(_ && x && !g && R !== 0 || g && I && !_ && R !== 0 || P || A);
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
  return Ht = a, Ht;
}
var Mt, ks;
function bi() {
  if (ks) return Mt;
  ks = 1;
  const s = re(), e = fe(), t = j(), r = Ks(), n = Z(), a = Kn(), o = ei(), u = ti(), c = ri(), i = si(), l = ni(), h = ii(), d = ai(), m = U(), f = oi(), _ = ci(), g = nr(), R = ui(), N = hi(), w = pe(), x = ir(), I = en(), A = tn(), P = ar(), S = or(), D = rn(), X = li(), Y = ge(), se = G(), Ee = _e(), v = fi(), p = mi(), b = pi(), E = gi(), T = _i(), y = cr(), C = vi(), O = Ei(), L = yi(), q = wi(), F = Si();
  return Mt = {
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
    sort: R,
    rsort: N,
    gt: w,
    lt: x,
    eq: I,
    neq: A,
    gte: P,
    lte: S,
    cmp: D,
    coerce: X,
    Comparator: Y,
    Range: se,
    satisfies: Ee,
    toComparators: v,
    maxSatisfying: p,
    minSatisfying: b,
    minVersion: E,
    validRange: T,
    outside: y,
    gtr: C,
    ltr: O,
    intersects: L,
    simplifyRange: q,
    subset: F,
    SemVer: t,
    re: s.re,
    src: s.src,
    tokens: s.t,
    SEMVER_SPEC_VERSION: e.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: e.RELEASE_TYPES,
    compareIdentifiers: r.compareIdentifiers,
    rcompareIdentifiers: r.rcompareIdentifiers
  }, Mt;
}
var Ri = bi();
const Ti = /* @__PURE__ */ Gs(Ri);
class Ci extends $ {
  constructor(e) {
    super(e, "internal");
  }
  async isPluginUpToDate() {
    const e = await this.get("version");
    return !Ti.lt(e, Wt);
  }
}
class Li extends $ {
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
class ue extends $ {
  constructor(e, t) {
    super(e, "browser-item", t.id), this.raw = t, this.transformers = {
      children: (r) => r.map((n) => new ue(e, n))
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
class Ai extends $ {
  constructor(e) {
    super(e, "browser");
    const t = (r) => r.map((n) => new ue(e, n));
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
      hotswap_target: (r) => new ue(e, r)
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
class xi extends $ {
  constructor(e) {
    super(e, "application"), this.cachedProps = {
      unavailable_features: !0
    };
  }
  browser = new Ai(this.ableton);
  view = new Li(this.ableton);
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
var sn = /* @__PURE__ */ ((s) => (s[s.NoteOn = 128] = "NoteOn", s[s.NoteOff = 144] = "NoteOff", s[s.AfterTouch = 160] = "AfterTouch", s[s.ControlChange = 176] = "ControlChange", s[s.PatchChange = 192] = "PatchChange", s[s.ChannelPressure = 208] = "ChannelPressure", s[s.PitchBend = 224] = "PitchBend", s[s.SysExStart = 240] = "SysExStart", s[s.MidiTimeCodeQuarterFrame = 241] = "MidiTimeCodeQuarterFrame", s[s.SongPositionPointer = 242] = "SongPositionPointer", s[s.SongSelect = 243] = "SongSelect", s[s.TuneRequest = 246] = "TuneRequest", s[s.SysExEnd = 247] = "SysExEnd", s[s.TimingClock = 248] = "TimingClock", s[s.Start = 250] = "Start", s[s.Continue = 251] = "Continue", s[s.Stop = 252] = "Stop", s[s.ActiveSensing = 254] = "ActiveSensing", s[s.SystemReset = 255] = "SystemReset", s))(sn || {});
class Ii {
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
    if (!(e.bytes[0] in sn))
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
class Oi extends $ {
  constructor(e) {
    super(e, "midi"), this.transformers = {
      midi: (t) => new Ii(t)
    };
  }
}
const $i = (s) => s && "__cached" in s;
class Ni extends $ {
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
class Pi {
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
function Fs(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in s && s.BYTES_PER_ELEMENT === 1;
}
const Xt = (s) => s ? `"${s}" ` : "";
function js(s, e = "") {
  if (typeof s != "number")
    throw new TypeError(Xt(e) + "expected number, got " + typeof s);
  if (!Number.isSafeInteger(s) || s < 0)
    throw new RangeError(Xt(e) + "expected integer >= 0, got " + s);
  return s;
}
function ve(s, e, t = "") {
  if (Fs(s) && e === void 0)
    return s;
  const r = Fs(s), n = "", a = r ? `length=${s.length}` : `type=${typeof s}`, o = Xt(t) + "expected Uint8Array" + n + ", got " + a;
  throw r ? new RangeError(o) : new TypeError(o);
}
function qi(s) {
  if (typeof s != "function" || typeof s.create != "function")
    throw new TypeError("expected hash wrapped by utils.createHasher");
  if (js(s.outputLen), js(s.blockLen), s.outputLen < 1 || s.blockLen < 1)
    throw new Error("hash blockLen / outputLen must be >= 1");
}
const Ds = (s, e) => {
  if (s === null || typeof s != "object" || Array.isArray(s))
    throw new TypeError((e === "object" ? "" : `"${e}" `) + "expected object, got type=" + typeof s);
};
function he(s, e = !0) {
  if (s.destroyed)
    throw new Error("hash was destroyed");
  if (e && s.finished)
    throw new Error("digest() was already called");
}
function nn(s, e) {
  ve(s, void 0, "output");
  const t = e.outputLen;
  if (!(s.length >= t))
    throw new RangeError('"output" expected length >= ' + t);
}
function Yt(...s) {
  for (let e = 0; e < s.length; e++)
    s[e].fill(0);
}
function Bt(s) {
  return new DataView(s.buffer, s.byteOffset, s.byteLength);
}
function H(s, e) {
  return s << 32 - e | s >>> e;
}
const ki = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Fi = /* @__PURE__ */ Array.from({ length: 256 }, (s, e) => e.toString(16).padStart(2, "0"));
function ji(s) {
  if (ve(s), ki)
    return s.toHex();
  let e = "";
  for (let t = 0; t < s.length; t++)
    e += Fi[s[t]];
  return e;
}
function zs(s) {
  if (typeof s != "string")
    throw new TypeError("string expected");
  return new Uint8Array(new TextEncoder().encode(s));
}
function Di(s, e, t = "opts") {
  return Ds(s, "defaults"), e !== void 0 && Ds(e, t), Object.assign(s, e);
}
function zi(s, e = {}) {
  if (typeof s != "function")
    throw new TypeError('"hashCons" expected function, got type=' + typeof s);
  e = Di({}, e, "info");
  const t = (n, a) => s(a).update(n).digest(), r = s(void 0);
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.canXOF = r.canXOF, t.create = (n) => s(n), Object.assign(t, e), Object.freeze(t);
}
const Ui = (s) => ({
  // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
  // Larger suffix values would need base-128 OID encoding and a different length byte.
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, s])
});
class Us {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = !1;
  finished = !1;
  destroyed = !1;
  constructor(e, t) {
    if (qi(e), ve(t, void 0, "key"), this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("expected Hash instance");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r = this.blockLen, n = new Uint8Array(r);
    n.set(t.length > r ? e.create().update(t).digest() : t);
    for (let a = 0; a < n.length; a++)
      n[a] ^= 54;
    this.iHash.update(n), this.oHash = e.create();
    for (let a = 0; a < n.length; a++)
      n[a] ^= 106;
    this.oHash.update(n), Yt(n);
  }
  update(e) {
    return he(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    he(this), nn(e, this), this.finished = !0;
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
const Gi = /* @__PURE__ */ (() => {
  const s = ((e, t, r) => new Us(e, t).update(r).digest());
  return s.create = (e, t) => new Us(e, t), s;
})(), Hi = (s) => s / 2 ** 32 | 0, Mi = (s) => s >>> 0;
function Bi(s, e, t, r) {
  const n = Hi(t), a = Mi(t);
  s.setUint32(e, r ? a : n, r), s.setUint32(e + 4, r ? n : a, r);
}
function Vi(s, e, t) {
  return s & e ^ ~s & t;
}
function Wi(s, e, t) {
  return s & e ^ s & t ^ e & t;
}
class Xi {
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
    this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.buffer = new Uint8Array(e), this.view = Bt(this.buffer);
  }
  update(e) {
    he(this), ve(e);
    const { view: t, buffer: r, blockLen: n } = this, a = e.length;
    let o = !1;
    for (let u = 0; u < a; ) {
      const c = Math.min(n - this.pos, a - u);
      if (c === n) {
        const i = Bt(e);
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
    he(this), nn(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: n, isLE: a } = this;
    let { pos: o } = this;
    t[o++] = 128, t.fill(0, o), this.padOffset > n - o && (this.process(r, 0), t.fill(0)), Bi(r, n - 8, this.length * 8, a), this.process(r, 0), this.roundClean();
    const u = e === t ? r : Bt(e), c = this.outputLen, i = c / 4, l = this.get();
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
const Yi = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Ji = /* @__PURE__ */ Uint32Array.from([
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
class Qi extends Xi {
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
      const d = V[h - 15], m = V[h - 2], f = H(d, 7) ^ H(d, 18) ^ d >>> 3, _ = H(m, 17) ^ H(m, 19) ^ m >>> 10;
      V[h] = _ + V[h - 7] + f + V[h - 16] | 0;
    }
    let { A: r, B: n, C: a, D: o, E: u, F: c, G: i, H: l } = this;
    for (let h = 0; h < 64; h++) {
      const d = H(u, 6) ^ H(u, 11) ^ H(u, 25), m = l + d + Vi(u, c, i) + Ji[h] + V[h] | 0, _ = (H(r, 2) ^ H(r, 13) ^ H(r, 22)) + Wi(r, n, a) | 0;
      l = i, i = c, c = u, u = o + m | 0, o = a, a = n, n = r, r = m + _ | 0;
    }
    r = r + this.A | 0, n = n + this.B | 0, a = a + this.C | 0, o = o + this.D | 0, u = u + this.E | 0, c = c + this.F | 0, i = i + this.G | 0, l = l + this.H | 0, this.set(r, n, a, o, u, c, i, l);
  }
  roundClean() {
    Yt(V);
  }
  destroy() {
    this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), Yt(this.buffer);
  }
}
class Zi extends Qi {
  constructor() {
    super(32, Yi);
  }
}
const Ki = /* @__PURE__ */ zi(
  () => new Zi(),
  /* @__PURE__ */ Ui(1)
);
function ea(s, e) {
  return ji(Gi(Ki, zs(s), zs(e)));
}
const ta = "127.0.0.1", ra = 39031, sa = zn(200);
function na(s) {
  return s.ns === "internal" && s.name === "authenticate" ? "{ hash: *** }" : $n(JSON.stringify(s.args), { length: 100 });
}
function ia(s) {
  if (s.length === 0)
    return "commands[0]";
  const e = s[0], t = `${e.ns}.${e.name}(${na(e)})`;
  return s.length === 1 ? t : `commands[${s.length}] starting with ${t}`;
}
class aa extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class oa extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class ha extends Pi {
  /**
   * Creates a client for the AbletonJS Remote Script.
   * Call {@link Ableton.start} before sending commands.
   */
  constructor(e) {
    super(), this.options = e, this.logger = e?.logger, this.host = e?.host ?? ta, this.port = e?.port ?? ra, e?.disableCache || (this.cache = new J({
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
  song = new Zn(this);
  /** Red box / session ring control. */
  session = new Ni(this);
  /** Live application metadata and dialogs. */
  application = new xi(this);
  /** Internal plugin helpers (ping, version, auth). */
  internal = new Ci(this);
  /** Forwarded MIDI note/CC tracking. */
  midi = new Oi(this);
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
      n !== Wt && this.logger?.warn(
        `The installed version of your AbletonJS plugin (${n}) is different from the JS library (${Wt}).`,
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
        const t = ea(this.options.password, e.data.salt);
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
    this.commandQueue = [], e.length > 1 && this.logger?.debug("Flushing command queue", { length: e.length }), await sa(async () => {
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
      }, o = JSON.stringify(a), u = ia(e), c = e.filter((f) => f.timeout).reduce(
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
            new aa(
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
            new oa(
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
    if ($i(a)) {
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
  ha as Ableton,
  oa as DisconnectError,
  aa as TimeoutError,
  Wt as packageVersion
};
//# sourceMappingURL=ableton.js.map
