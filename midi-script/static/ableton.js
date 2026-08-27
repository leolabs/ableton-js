var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Q, Me;
function Rt() {
  if (Me) return Q;
  Me = 1;
  var n = typeof N == "object" && N && N.Object === Object && N;
  return Q = n, Q;
}
var X, Be;
function Wt() {
  if (Be) return X;
  Be = 1;
  var n = Rt(), e = typeof self == "object" && self && self.Object === Object && self, t = n || e || Function("return this")();
  return X = t, X;
}
var Y, We;
function Ie() {
  if (We) return Y;
  We = 1;
  var n = Wt(), e = n.Symbol;
  return Y = e, Y;
}
var K, Ge;
function Gt() {
  if (Ge) return K;
  Ge = 1;
  function n(e, t) {
    for (var s = -1, i = e == null ? 0 : e.length, r = Array(i); ++s < i; )
      r[s] = t(e[s], s, e);
    return r;
  }
  return K = n, K;
}
var Z, $e;
function $t() {
  if ($e) return Z;
  $e = 1;
  var n = Array.isArray;
  return Z = n, Z;
}
var ee, Ve;
function Vt() {
  if (Ve) return ee;
  Ve = 1;
  var n = Ie(), e = Object.prototype, t = e.hasOwnProperty, s = e.toString, i = n ? n.toStringTag : void 0;
  function r(a) {
    var o = t.call(a, i), h = a[i];
    try {
      a[i] = void 0;
      var c = !0;
    } catch {
    }
    var l = s.call(a);
    return c && (o ? a[i] = h : delete a[i]), l;
  }
  return ee = r, ee;
}
var te, Je;
function Jt() {
  if (Je) return te;
  Je = 1;
  var n = Object.prototype, e = n.toString;
  function t(s) {
    return e.call(s);
  }
  return te = t, te;
}
var se, Qe;
function zt() {
  if (Qe) return se;
  Qe = 1;
  var n = Ie(), e = Vt(), t = Jt(), s = "[object Null]", i = "[object Undefined]", r = n ? n.toStringTag : void 0;
  function a(o) {
    return o == null ? o === void 0 ? i : s : r && r in Object(o) ? e(o) : t(o);
  }
  return se = a, se;
}
var ne, Xe;
function Pt() {
  if (Xe) return ne;
  Xe = 1;
  function n(e) {
    return e != null && typeof e == "object";
  }
  return ne = n, ne;
}
var ie, Ye;
function Ft() {
  if (Ye) return ie;
  Ye = 1;
  var n = zt(), e = Pt(), t = "[object Symbol]";
  function s(i) {
    return typeof i == "symbol" || e(i) && n(i) == t;
  }
  return ie = s, ie;
}
var re, Ke;
function Ot() {
  if (Ke) return re;
  Ke = 1;
  var n = Ie(), e = Gt(), t = $t(), s = Ft(), i = n ? n.prototype : void 0, r = i ? i.toString : void 0;
  function a(o) {
    if (typeof o == "string")
      return o;
    if (t(o))
      return e(o, a) + "";
    if (s(o))
      return r ? r.call(o) : "";
    var h = o + "";
    return h == "0" && 1 / o == -1 / 0 ? "-0" : h;
  }
  return re = a, re;
}
var ae, Ze;
function Qt() {
  if (Ze) return ae;
  Ze = 1;
  function n(e, t, s) {
    var i = -1, r = e.length;
    t < 0 && (t = -t > r ? 0 : r + t), s = s > r ? r : s, s < 0 && (s += r), r = t > s ? 0 : s - t >>> 0, t >>>= 0;
    for (var a = Array(r); ++i < r; )
      a[i] = e[i + t];
    return a;
  }
  return ae = n, ae;
}
var oe, et;
function Xt() {
  if (et) return oe;
  et = 1;
  var n = Qt();
  function e(t, s, i) {
    var r = t.length;
    return i = i === void 0 ? r : i, !s && i >= r ? t : n(t, s, i);
  }
  return oe = e, oe;
}
var ce, tt;
function je() {
  if (tt) return ce;
  tt = 1;
  var n = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", i = e + t + s, r = "\\ufe0e\\ufe0f", a = "\\u200d", o = RegExp("[" + a + n + i + r + "]");
  function h(c) {
    return o.test(c);
  }
  return ce = h, ce;
}
var he, st;
function qt() {
  if (st) return he;
  st = 1;
  function n(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return he = n, he;
}
var ue, nt;
function Yt() {
  if (nt) return ue;
  nt = 1;
  var n = zt(), e = Pt(), t = "[object RegExp]";
  function s(i) {
    return e(i) && n(i) == t;
  }
  return ue = s, ue;
}
var le, it;
function Kt() {
  if (it) return le;
  it = 1;
  function n(e) {
    return function(t) {
      return e(t);
    };
  }
  return le = n, le;
}
var D = { exports: {} };
D.exports;
var rt;
function Zt() {
  return rt || (rt = 1, (function(n, e) {
    var t = Rt(), s = e && !e.nodeType && e, i = s && !0 && n && !n.nodeType && n, r = i && i.exports === s, a = r && t.process, o = (function() {
      try {
        var h = i && i.require && i.require("util").types;
        return h || a && a.binding && a.binding("util");
      } catch {
      }
    })();
    n.exports = o;
  })(D, D.exports)), D.exports;
}
var de, at;
function es() {
  if (at) return de;
  at = 1;
  var n = Yt(), e = Kt(), t = Zt(), s = t && t.isRegExp, i = s ? e(s) : n;
  return de = i, de;
}
var fe, ot;
function ts() {
  if (ot) return fe;
  ot = 1;
  function n(e) {
    return function(t) {
      return t?.[e];
    };
  }
  return fe = n, fe;
}
var me, ct;
function ss() {
  if (ct) return me;
  ct = 1;
  var n = ts(), e = n("length");
  return me = e, me;
}
var pe, ht;
function ns() {
  if (ht) return pe;
  ht = 1;
  var n = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", i = e + t + s, r = "\\ufe0e\\ufe0f", a = "[" + n + "]", o = "[" + i + "]", h = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + o + "|" + h + ")", l = "[^" + n + "]", u = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", f = "\\u200d", m = c + "?", g = "[" + r + "]?", p = "(?:" + f + "(?:" + [l, u, d].join("|") + ")" + g + m + ")*", v = g + m + p, C = "(?:" + [l + o + "?", o, u, d, a].join("|") + ")", w = RegExp(h + "(?=" + h + ")|" + C + v, "g");
  function y(S) {
    for (var x = w.lastIndex = 0; w.test(S); )
      ++x;
    return x;
  }
  return pe = y, pe;
}
var ge, ut;
function is() {
  if (ut) return ge;
  ut = 1;
  var n = ss(), e = je(), t = ns();
  function s(i) {
    return e(i) ? t(i) : n(i);
  }
  return ge = s, ge;
}
var _e, lt;
function rs() {
  if (lt) return _e;
  lt = 1;
  function n(e) {
    return e.split("");
  }
  return _e = n, _e;
}
var ye, dt;
function as() {
  if (dt) return ye;
  dt = 1;
  var n = "\\ud800-\\udfff", e = "\\u0300-\\u036f", t = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", i = e + t + s, r = "\\ufe0e\\ufe0f", a = "[" + n + "]", o = "[" + i + "]", h = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + o + "|" + h + ")", l = "[^" + n + "]", u = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", f = "\\u200d", m = c + "?", g = "[" + r + "]?", p = "(?:" + f + "(?:" + [l, u, d].join("|") + ")" + g + m + ")*", v = g + m + p, C = "(?:" + [l + o + "?", o, u, d, a].join("|") + ")", w = RegExp(h + "(?=" + h + ")|" + C + v, "g");
  function y(S) {
    return S.match(w) || [];
  }
  return ye = y, ye;
}
var ve, ft;
function os() {
  if (ft) return ve;
  ft = 1;
  var n = rs(), e = je(), t = as();
  function s(i) {
    return e(i) ? t(i) : n(i);
  }
  return ve = s, ve;
}
var we, mt;
function cs() {
  if (mt) return we;
  mt = 1;
  var n = /\s/;
  function e(t) {
    for (var s = t.length; s-- && n.test(t.charAt(s)); )
      ;
    return s;
  }
  return we = e, we;
}
var be, pt;
function hs() {
  if (pt) return be;
  pt = 1;
  var n = cs(), e = /^\s+/;
  function t(s) {
    return s && s.slice(0, n(s) + 1).replace(e, "");
  }
  return be = t, be;
}
var Se, gt;
function us() {
  if (gt) return Se;
  gt = 1;
  var n = hs(), e = qt(), t = Ft(), s = NaN, i = /^[-+]0x[0-9a-f]+$/i, r = /^0b[01]+$/i, a = /^0o[0-7]+$/i, o = parseInt;
  function h(c) {
    if (typeof c == "number")
      return c;
    if (t(c))
      return s;
    if (e(c)) {
      var l = typeof c.valueOf == "function" ? c.valueOf() : c;
      c = e(l) ? l + "" : l;
    }
    if (typeof c != "string")
      return c === 0 ? c : +c;
    c = n(c);
    var u = r.test(c);
    return u || a.test(c) ? o(c.slice(2), u ? 2 : 8) : i.test(c) ? s : +c;
  }
  return Se = h, Se;
}
var Ce, _t;
function ls() {
  if (_t) return Ce;
  _t = 1;
  var n = us(), e = 1 / 0, t = 17976931348623157e292;
  function s(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = n(i), i === e || i === -e) {
      var r = i < 0 ? -1 : 1;
      return r * t;
    }
    return i === i ? i : 0;
  }
  return Ce = s, Ce;
}
var xe, yt;
function ds() {
  if (yt) return xe;
  yt = 1;
  var n = ls();
  function e(t) {
    var s = n(t), i = s % 1;
    return s === s ? i ? s - i : s : 0;
  }
  return xe = e, xe;
}
var Te, vt;
function fs() {
  if (vt) return Te;
  vt = 1;
  var n = Ot();
  function e(t) {
    return t == null ? "" : n(t);
  }
  return Te = e, Te;
}
var Ae, wt;
function ms() {
  if (wt) return Ae;
  wt = 1;
  var n = Ot(), e = Xt(), t = je(), s = qt(), i = es(), r = is(), a = os(), o = ds(), h = fs(), c = 30, l = "...", u = /\w*$/;
  function d(f, m) {
    var g = c, p = l;
    if (s(m)) {
      var v = "separator" in m ? m.separator : v;
      g = "length" in m ? o(m.length) : g, p = "omission" in m ? n(m.omission) : p;
    }
    f = h(f);
    var C = f.length;
    if (t(f)) {
      var w = a(f);
      C = w.length;
    }
    if (g >= C)
      return f;
    var y = g - r(p);
    if (y < 1)
      return p;
    var S = w ? e(w, 0, y).join("") : f.slice(0, y);
    if (v === void 0)
      return S + p;
    if (w && (y += S.length - y), i(v)) {
      if (f.slice(y).search(v)) {
        var x, F = S;
        for (v.global || (v = RegExp(v.source, h(u.exec(v)) + "g")), v.lastIndex = 0; x = v.exec(F); )
          var L = x.index;
        S = S.slice(0, L === void 0 ? y : L);
      }
    } else if (f.indexOf(n(v), y) != y) {
      var k = S.lastIndexOf(v);
      k > -1 && (S = S.slice(0, k));
    }
    return S + p;
  }
  return Ae = d, Ae;
}
var ps = ms();
const gs = /* @__PURE__ */ Bt(ps), j = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, _s = typeof AbortController == "function", H = _s ? AbortController : class {
  constructor() {
    this.signal = new It();
  }
  abort(e = new Error("This operation was aborted")) {
    this.signal.reason = this.signal.reason || e, this.signal.aborted = !0, this.signal.dispatchEvent({
      type: "abort",
      target: this.signal
    });
  }
}, ys = typeof AbortSignal == "function", vs = typeof H.AbortSignal == "function", It = ys ? AbortSignal : vs ? H.AbortController : class {
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
    e === "abort" && (this._listeners = this._listeners.filter((s) => s !== t));
  }
}, De = /* @__PURE__ */ new Set(), Ee = (n, e) => {
  const t = `LRU_CACHE_OPTION_${n}`;
  W(t) && Ne(t, `${n} option`, `options.${e}`, O);
}, Le = (n, e) => {
  const t = `LRU_CACHE_METHOD_${n}`;
  if (W(t)) {
    const { prototype: s } = O, { get: i } = Object.getOwnPropertyDescriptor(s, n);
    Ne(t, `${n} method`, `cache.${e}()`, i);
  }
}, ws = (n, e) => {
  const t = `LRU_CACHE_PROPERTY_${n}`;
  if (W(t)) {
    const { prototype: s } = O, { get: i } = Object.getOwnPropertyDescriptor(s, n);
    Ne(t, `${n} property`, `cache.${e}`, i);
  }
}, jt = (...n) => {
  typeof process == "object" && process && typeof process.emitWarning == "function" ? process.emitWarning(...n) : console.error(...n);
}, W = (n) => !De.has(n), Ne = (n, e, t, s) => {
  De.add(n);
  const i = `The ${e} is deprecated. Please use ${t} instead.`;
  jt(i, "DeprecationWarning", n, s);
}, z = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n), Dt = (n) => z(n) ? n <= Math.pow(2, 8) ? Uint8Array : n <= Math.pow(2, 16) ? Uint16Array : n <= Math.pow(2, 32) ? Uint32Array : n <= Number.MAX_SAFE_INTEGER ? U : null : null;
class U extends Array {
  constructor(e) {
    super(e), this.fill(0);
  }
}
class bs {
  constructor(e) {
    if (e === 0)
      return [];
    const t = Dt(e);
    this.heap = new t(e), this.length = 0;
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class O {
  constructor(e = {}) {
    const {
      max: t = 0,
      ttl: s,
      ttlResolution: i = 1,
      ttlAutopurge: r,
      updateAgeOnGet: a,
      updateAgeOnHas: o,
      allowStale: h,
      dispose: c,
      disposeAfter: l,
      noDisposeOnSet: u,
      noUpdateTTL: d,
      maxSize: f = 0,
      maxEntrySize: m = 0,
      sizeCalculation: g,
      fetchMethod: p,
      fetchContext: v,
      noDeleteOnFetchRejection: C,
      noDeleteOnStaleGet: w,
      allowStaleOnFetchRejection: y,
      allowStaleOnFetchAbort: S,
      ignoreFetchAbort: x
    } = e, { length: F, maxAge: L, stale: k } = e instanceof O ? {} : e;
    if (t !== 0 && !z(t))
      throw new TypeError("max option must be a nonnegative integer");
    const V = t ? Dt(t) : Array;
    if (!V)
      throw new Error("invalid max value: " + t);
    if (this.max = t, this.maxSize = f, this.maxEntrySize = m || this.maxSize, this.sizeCalculation = g || F, this.sizeCalculation) {
      if (!this.maxSize && !this.maxEntrySize)
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize or maxEntrySize"
        );
      if (typeof this.sizeCalculation != "function")
        throw new TypeError("sizeCalculation set to non-function");
    }
    if (this.fetchMethod = p || null, this.fetchMethod && typeof this.fetchMethod != "function")
      throw new TypeError(
        "fetchMethod must be a function if specified"
      );
    if (this.fetchContext = v, !this.fetchMethod && v !== void 0)
      throw new TypeError(
        "cannot set fetchContext without fetchMethod"
      );
    if (this.keyMap = /* @__PURE__ */ new Map(), this.keyList = new Array(t).fill(null), this.valList = new Array(t).fill(null), this.next = new V(t), this.prev = new V(t), this.head = 0, this.tail = 0, this.free = new bs(t), this.initialFill = 1, this.size = 0, typeof c == "function" && (this.dispose = c), typeof l == "function" ? (this.disposeAfter = l, this.disposed = []) : (this.disposeAfter = null, this.disposed = null), this.noDisposeOnSet = !!u, this.noUpdateTTL = !!d, this.noDeleteOnFetchRejection = !!C, this.allowStaleOnFetchRejection = !!y, this.allowStaleOnFetchAbort = !!S, this.ignoreFetchAbort = !!x, this.maxEntrySize !== 0) {
      if (this.maxSize !== 0 && !z(this.maxSize))
        throw new TypeError(
          "maxSize must be a positive integer if specified"
        );
      if (!z(this.maxEntrySize))
        throw new TypeError(
          "maxEntrySize must be a positive integer if specified"
        );
      this.initializeSizeTracking();
    }
    if (this.allowStale = !!h || !!k, this.noDeleteOnStaleGet = !!w, this.updateAgeOnGet = !!a, this.updateAgeOnHas = !!o, this.ttlResolution = z(i) || i === 0 ? i : 1, this.ttlAutopurge = !!r, this.ttl = s || L || 0, this.ttl) {
      if (!z(this.ttl))
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
      const J = "LRU_CACHE_UNBOUNDED";
      W(J) && (De.add(J), jt("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", J, O));
    }
    k && Ee("stale", "allowStale"), L && Ee("maxAge", "ttl"), F && Ee("length", "sizeCalculation");
  }
  getRemainingTTL(e) {
    return this.has(e, { updateAgeOnHas: !1 }) ? 1 / 0 : 0;
  }
  initializeTTLTracking() {
    this.ttls = new U(this.max), this.starts = new U(this.max), this.setItemTTL = (s, i, r = j.now()) => {
      if (this.starts[s] = i !== 0 ? r : 0, this.ttls[s] = i, i !== 0 && this.ttlAutopurge) {
        const a = setTimeout(() => {
          this.isStale(s) && this.delete(this.keyList[s]);
        }, i + 1);
        a.unref && a.unref();
      }
    }, this.updateItemAge = (s) => {
      this.starts[s] = this.ttls[s] !== 0 ? j.now() : 0;
    }, this.statusTTL = (s, i) => {
      s && (s.ttl = this.ttls[i], s.start = this.starts[i], s.now = e || t(), s.remainingTTL = s.now + s.ttl - s.start);
    };
    let e = 0;
    const t = () => {
      const s = j.now();
      if (this.ttlResolution > 0) {
        e = s;
        const i = setTimeout(
          () => e = 0,
          this.ttlResolution
        );
        i.unref && i.unref();
      }
      return s;
    };
    this.getRemainingTTL = (s) => {
      const i = this.keyMap.get(s);
      return i === void 0 ? 0 : this.ttls[i] === 0 || this.starts[i] === 0 ? 1 / 0 : this.starts[i] + this.ttls[i] - (e || t());
    }, this.isStale = (s) => this.ttls[s] !== 0 && this.starts[s] !== 0 && (e || t()) - this.starts[s] > this.ttls[s];
  }
  updateItemAge(e) {
  }
  statusTTL(e, t) {
  }
  setItemTTL(e, t, s) {
  }
  isStale(e) {
    return !1;
  }
  initializeSizeTracking() {
    this.calculatedSize = 0, this.sizes = new U(this.max), this.removeItemSize = (e) => {
      this.calculatedSize -= this.sizes[e], this.sizes[e] = 0;
    }, this.requireSize = (e, t, s, i) => {
      if (this.isBackgroundFetch(t))
        return 0;
      if (!z(s))
        if (i) {
          if (typeof i != "function")
            throw new TypeError("sizeCalculation must be a function");
          if (s = i(t, e), !z(s))
            throw new TypeError(
              "sizeCalculation return invalid (expect positive integer)"
            );
        } else
          throw new TypeError(
            "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set."
          );
      return s;
    }, this.addItemSize = (e, t, s) => {
      if (this.sizes[e] = t, this.maxSize) {
        const i = this.maxSize - this.sizes[e];
        for (; this.calculatedSize > i; )
          this.evict(!0);
      }
      this.calculatedSize += this.sizes[e], s && (s.entrySize = t, s.totalCalculatedSize = this.calculatedSize);
    };
  }
  removeItemSize(e) {
  }
  addItemSize(e, t) {
  }
  requireSize(e, t, s, i) {
    if (s || i)
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
    for (const s of this.indexes()) {
      const i = this.valList[s], r = this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
      if (r !== void 0 && e(r, this.keyList[s], this))
        return this.get(this.keyList[s], t);
    }
  }
  forEach(e, t = this) {
    for (const s of this.indexes()) {
      const i = this.valList[s], r = this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
      r !== void 0 && e.call(t, r, this.keyList[s], this);
    }
  }
  rforEach(e, t = this) {
    for (const s of this.rindexes()) {
      const i = this.valList[s], r = this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
      r !== void 0 && e.call(t, r, this.keyList[s], this);
    }
  }
  get prune() {
    return Le("prune", "purgeStale"), this.purgeStale;
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
      const s = this.keyList[t], i = this.valList[t], r = this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
      if (r === void 0) continue;
      const a = { value: r };
      if (this.ttls) {
        a.ttl = this.ttls[t];
        const o = j.now() - this.starts[t];
        a.start = Math.floor(Date.now() - o);
      }
      this.sizes && (a.size = this.sizes[t]), e.unshift([s, a]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (const [t, s] of e) {
      if (s.start) {
        const i = Date.now() - s.start;
        s.start = j.now() - i;
      }
      this.set(t, s.value, s);
    }
  }
  dispose(e, t, s) {
  }
  set(e, t, {
    ttl: s = this.ttl,
    start: i,
    noDisposeOnSet: r = this.noDisposeOnSet,
    size: a = 0,
    sizeCalculation: o = this.sizeCalculation,
    noUpdateTTL: h = this.noUpdateTTL,
    status: c
  } = {}) {
    if (a = this.requireSize(e, t, a, o), this.maxEntrySize && a > this.maxEntrySize)
      return c && (c.set = "miss", c.maxEntrySizeExceeded = !0), this.delete(e), this;
    let l = this.size === 0 ? void 0 : this.keyMap.get(e);
    if (l === void 0)
      l = this.newIndex(), this.keyList[l] = e, this.valList[l] = t, this.keyMap.set(e, l), this.next[this.tail] = l, this.prev[l] = this.tail, this.tail = l, this.size++, this.addItemSize(l, a, c), c && (c.set = "add"), h = !1;
    else {
      this.moveToTail(l);
      const u = this.valList[l];
      if (t !== u) {
        if (this.isBackgroundFetch(u) ? u.__abortController.abort(new Error("replaced")) : r || (this.dispose(u, e, "set"), this.disposeAfter && this.disposed.push([u, e, "set"])), this.removeItemSize(l), this.valList[l] = t, this.addItemSize(l, a, c), c) {
          c.set = "replace";
          const d = u && this.isBackgroundFetch(u) ? u.__staleWhileFetching : u;
          d !== void 0 && (c.oldValue = d);
        }
      } else c && (c.set = "update");
    }
    if (s !== 0 && this.ttl === 0 && !this.ttls && this.initializeTTLTracking(), h || this.setItemTTL(l, s, i), this.statusTTL(c, l), this.disposeAfter)
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
    const t = this.head, s = this.keyList[t], i = this.valList[t];
    return this.isBackgroundFetch(i) ? i.__abortController.abort(new Error("evicted")) : (this.dispose(i, s, "evict"), this.disposeAfter && this.disposed.push([i, s, "evict"])), this.removeItemSize(t), e && (this.keyList[t] = null, this.valList[t] = null, this.free.push(t)), this.head = this.next[t], this.keyMap.delete(s), this.size--, t;
  }
  has(e, { updateAgeOnHas: t = this.updateAgeOnHas, status: s } = {}) {
    const i = this.keyMap.get(e);
    if (i !== void 0)
      if (this.isStale(i))
        s && (s.has = "stale", this.statusTTL(s, i));
      else return t && this.updateItemAge(i), s && (s.has = "hit"), this.statusTTL(s, i), !0;
    else s && (s.has = "miss");
    return !1;
  }
  // like get(), but without any LRU updating or TTL expiration
  peek(e, { allowStale: t = this.allowStale } = {}) {
    const s = this.keyMap.get(e);
    if (s !== void 0 && (t || !this.isStale(s))) {
      const i = this.valList[s];
      return this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
    }
  }
  backgroundFetch(e, t, s, i) {
    const r = t === void 0 ? void 0 : this.valList[t];
    if (this.isBackgroundFetch(r))
      return r;
    const a = new H();
    s.signal && s.signal.addEventListener(
      "abort",
      () => a.abort(s.signal.reason)
    );
    const o = {
      signal: a.signal,
      options: s,
      context: i
    }, h = (f, m = !1) => {
      const { aborted: g } = a.signal, p = s.ignoreFetchAbort && f !== void 0;
      return s.status && (g && !m ? (s.status.fetchAborted = !0, s.status.fetchError = a.signal.reason, p && (s.status.fetchAbortIgnored = !0)) : s.status.fetchResolved = !0), g && !p && !m ? l(a.signal.reason) : (this.valList[t] === d && (f === void 0 ? d.__staleWhileFetching ? this.valList[t] = d.__staleWhileFetching : this.delete(e) : (s.status && (s.status.fetchUpdated = !0), this.set(e, f, o.options))), f);
    }, c = (f) => (s.status && (s.status.fetchRejected = !0, s.status.fetchError = f), l(f)), l = (f) => {
      const { aborted: m } = a.signal, g = m && s.allowStaleOnFetchAbort, p = g || s.allowStaleOnFetchRejection, v = p || s.noDeleteOnFetchRejection;
      if (this.valList[t] === d && (!v || d.__staleWhileFetching === void 0 ? this.delete(e) : g || (this.valList[t] = d.__staleWhileFetching)), p)
        return s.status && d.__staleWhileFetching !== void 0 && (s.status.returnedStale = !0), d.__staleWhileFetching;
      if (d.__returned === d)
        throw f;
    }, u = (f, m) => {
      this.fetchMethod(e, r, o).then((g) => f(g), m), a.signal.addEventListener("abort", () => {
        (!s.ignoreFetchAbort || s.allowStaleOnFetchAbort) && (f(), s.allowStaleOnFetchAbort && (f = (g) => h(g, !0)));
      });
    };
    s.status && (s.status.fetchDispatched = !0);
    const d = new Promise(u).then(h, c);
    return d.__abortController = a, d.__staleWhileFetching = r, d.__returned = null, t === void 0 ? (this.set(e, d, { ...o.options, status: void 0 }), t = this.keyMap.get(e)) : this.valList[t] = d, d;
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
    updateAgeOnGet: s = this.updateAgeOnGet,
    noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
    // set options
    ttl: r = this.ttl,
    noDisposeOnSet: a = this.noDisposeOnSet,
    size: o = 0,
    sizeCalculation: h = this.sizeCalculation,
    noUpdateTTL: c = this.noUpdateTTL,
    // fetch exclusive options
    noDeleteOnFetchRejection: l = this.noDeleteOnFetchRejection,
    allowStaleOnFetchRejection: u = this.allowStaleOnFetchRejection,
    ignoreFetchAbort: d = this.ignoreFetchAbort,
    allowStaleOnFetchAbort: f = this.allowStaleOnFetchAbort,
    fetchContext: m = this.fetchContext,
    forceRefresh: g = !1,
    status: p,
    signal: v
  } = {}) {
    if (!this.fetchMethod)
      return p && (p.fetch = "get"), this.get(e, {
        allowStale: t,
        updateAgeOnGet: s,
        noDeleteOnStaleGet: i,
        status: p
      });
    const C = {
      allowStale: t,
      updateAgeOnGet: s,
      noDeleteOnStaleGet: i,
      ttl: r,
      noDisposeOnSet: a,
      size: o,
      sizeCalculation: h,
      noUpdateTTL: c,
      noDeleteOnFetchRejection: l,
      allowStaleOnFetchRejection: u,
      allowStaleOnFetchAbort: f,
      ignoreFetchAbort: d,
      status: p,
      signal: v
    };
    let w = this.keyMap.get(e);
    if (w === void 0) {
      p && (p.fetch = "miss");
      const y = this.backgroundFetch(e, w, C, m);
      return y.__returned = y;
    } else {
      const y = this.valList[w];
      if (this.isBackgroundFetch(y)) {
        const k = t && y.__staleWhileFetching !== void 0;
        return p && (p.fetch = "inflight", k && (p.returnedStale = !0)), k ? y.__staleWhileFetching : y.__returned = y;
      }
      const S = this.isStale(w);
      if (!g && !S)
        return p && (p.fetch = "hit"), this.moveToTail(w), s && this.updateItemAge(w), this.statusTTL(p, w), y;
      const x = this.backgroundFetch(e, w, C, m), F = x.__staleWhileFetching !== void 0, L = F && t;
      return p && (p.fetch = F && S ? "stale" : "refresh", L && S && (p.returnedStale = !0)), L ? x.__staleWhileFetching : x.__returned = x;
    }
  }
  get(e, {
    allowStale: t = this.allowStale,
    updateAgeOnGet: s = this.updateAgeOnGet,
    noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
    status: r
  } = {}) {
    const a = this.keyMap.get(e);
    if (a !== void 0) {
      const o = this.valList[a], h = this.isBackgroundFetch(o);
      return this.statusTTL(r, a), this.isStale(a) ? (r && (r.get = "stale"), h ? (r && (r.returnedStale = t && o.__staleWhileFetching !== void 0), t ? o.__staleWhileFetching : void 0) : (i || this.delete(e), r && (r.returnedStale = t), t ? o : void 0)) : (r && (r.get = "hit"), h ? o.__staleWhileFetching : (this.moveToTail(a), s && this.updateItemAge(a), o));
    } else r && (r.get = "miss");
  }
  connect(e, t) {
    this.prev[t] = e, this.next[e] = t;
  }
  moveToTail(e) {
    e !== this.tail && (e === this.head ? this.head = this.next[e] : this.connect(this.prev[e], this.next[e]), this.connect(this.tail, e), this.tail = e);
  }
  get del() {
    return Le("del", "delete"), this.delete;
  }
  delete(e) {
    let t = !1;
    if (this.size !== 0) {
      const s = this.keyMap.get(e);
      if (s !== void 0)
        if (t = !0, this.size === 1)
          this.clear();
        else {
          this.removeItemSize(s);
          const i = this.valList[s];
          this.isBackgroundFetch(i) ? i.__abortController.abort(new Error("deleted")) : (this.dispose(i, e, "delete"), this.disposeAfter && this.disposed.push([i, e, "delete"])), this.keyMap.delete(e), this.keyList[s] = null, this.valList[s] = null, s === this.tail ? this.tail = this.prev[s] : s === this.head ? this.head = this.next[s] : (this.next[this.prev[s]] = this.next[s], this.prev[this.next[s]] = this.prev[s]), this.size--, this.free.push(s);
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
        const s = this.keyList[e];
        this.dispose(t, s, "delete"), this.disposeAfter && this.disposed.push([t, s, "delete"]);
      }
    }
    if (this.keyMap.clear(), this.valList.fill(null), this.keyList.fill(null), this.ttls && (this.ttls.fill(0), this.starts.fill(0)), this.sizes && this.sizes.fill(0), this.head = 0, this.tail = 0, this.initialFill = 1, this.free.length = 0, this.calculatedSize = 0, this.size = 0, this.disposed)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
  }
  get reset() {
    return Le("reset", "clear"), this.clear;
  }
  get length() {
    return ws("length", "size"), this.size;
  }
  static get AbortController() {
    return H;
  }
  static get AbortSignal() {
    return It;
  }
}
class Ss {
  value;
  next;
  constructor(e) {
    this.value = e;
  }
}
class Cs {
  #e;
  #t;
  #s;
  constructor() {
    this.clear();
  }
  enqueue(e) {
    const t = new Ss(e);
    this.#e ? (this.#t.next = t, this.#t = t) : (this.#e = t, this.#t = t), this.#s++;
  }
  dequeue() {
    const e = this.#e;
    if (e)
      return this.#e = this.#e.next, this.#s--, this.#e || (this.#t = void 0), e.value;
  }
  peek() {
    if (this.#e)
      return this.#e.value;
  }
  clear() {
    this.#e = void 0, this.#t = void 0, this.#s = 0;
  }
  get size() {
    return this.#s;
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
function xs(n) {
  bt(n);
  const e = new Cs();
  let t = 0;
  const s = () => {
    t < n && e.size > 0 && (t++, e.dequeue()());
  }, i = () => {
    t--, s();
  }, r = async (h, c, l) => {
    const u = (async () => h(...l))();
    c(u);
    try {
      await u;
    } catch {
    }
    i();
  }, a = (h, c, l) => {
    new Promise((u) => {
      e.enqueue(u);
    }).then(r.bind(void 0, h, c, l)), t < n && s();
  }, o = (h, ...c) => new Promise((l) => {
    a(h, l, c);
  });
  return Object.defineProperties(o, {
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
      get: () => n,
      set(h) {
        bt(h), n = h, queueMicrotask(() => {
          for (; t < n && e.size > 0; )
            s();
        });
      }
    },
    map: {
      async value(h, c) {
        const l = Array.from(h, (u, d) => this(c, u, d));
        return Promise.all(l);
      }
    }
  }), o;
}
function bt(n) {
  if (!((Number.isInteger(n) || n === Number.POSITIVE_INFINITY) && n > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
}
class _ {
  constructor(e, t, s) {
    this.ableton = e, this.ns = t, this.nsid = s;
  }
  transformers = {};
  cachedProps = {};
  /** Returns the value of a gettable property on this Live object. */
  async get(e, t) {
    const s = t ?? !!this.cachedProps[e], i = await this.ableton.getProp(
      this.ns,
      this.nsid,
      String(e),
      s
    ), r = this.transformers[e];
    return i !== null && r ? r(i) : i;
  }
  /** Sets a settable property on this Live object. */
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
  /**
   * Subscribes to changes of an observable property on this Live object.
   * Returns an unsubscribe function.
   */
  async addListener(e, t) {
    const s = this.transformers[e];
    return this.ableton.addPropListener(
      this.ns,
      this.nsid,
      String(e),
      (i) => {
        t(i !== null && s ? s(i) : i);
      }
    );
  }
  /**
   * Sends a raw function invocation to Ableton.
   * This should be used with caution.
   */
  async sendCommand(e, t, s, i) {
    return this.ableton.sendCommand({
      ns: this.ns,
      nsid: this.nsid,
      name: e,
      args: t,
      etag: s,
      timeout: i
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
class b extends _ {
  constructor(e, t) {
    super(e, "device-parameter", t.id), this.raw = t;
  }
}
class Nt extends _ {
  constructor(e, t) {
    super(e, "chain-mixer-device", t.id), this.raw = t, this.transformers = {
      chain_activator: (s) => new b(e, s),
      panning: (s) => s ? new b(e, s) : null,
      sends: (s) => s.map((i) => new b(e, i)),
      volume: (s) => s ? new b(e, s) : null
    };
  }
}
class P extends _ {
  constructor(e, t) {
    super(e, "chain", t.id), this.raw = t, this.transformers = {
      devices: (s) => s.map((i) => q(e, i)),
      mixer_device: (s) => new Nt(e, s)
    }, this.cachedProps = {
      devices: !0,
      mixer_device: !0
    };
  }
  /**
   * Deletes a device identified by its index in this chain's `devices` list.
   */
  async deleteDevice(e) {
    return this.sendCommand("delete_device", { index: e });
  }
  /** Duplicates the device at `index` in this chain. */
  async duplicateDevice(e) {
    return this.sendCommand("duplicate_device", { index: e });
  }
  /**
   * Inserts a native Live device by UI name at `deviceIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const s = await this.sendCommand("insert_device", {
      device_name: e,
      device_index: t
    });
    return q(this.ableton, s);
  }
}
class Ut extends _ {
  constructor(e, t) {
    super(e, "drum-chain", t.id), this.raw = t, this.transformers = {
      devices: (s) => s.map((i) => q(e, i)),
      mixer_device: (s) => new Nt(e, s)
    }, this.cachedProps = {
      devices: !0,
      mixer_device: !0
    };
  }
  /**
   * Deletes a device identified by its index in this chain's `devices` list.
   */
  async deleteDevice(e) {
    return this.sendCommand("delete_device", { index: e });
  }
  /** Duplicates the device at `index` in this chain. */
  async duplicateDevice(e) {
    return this.sendCommand("duplicate_device", { index: e });
  }
  /**
   * Inserts a native Live device by UI name at `deviceIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const s = await this.sendCommand("insert_device", {
      device_name: e,
      device_index: t
    });
    return q(this.ableton, s);
  }
}
function ze(n, e) {
  return e.is_drum_chain ? new Ut(n, e) : new P(n, e);
}
class I extends _ {
  constructor(e, t) {
    super(e, "drum-pad", t.id), this.raw = t, this.transformers = {
      chains: (s) => s.map((i) => new Ut(e, i))
    }, this.cachedProps = {
      chains: !0
    };
  }
  /** Deletes all chains on this pad (same as clearing a drum rack pad in Live). */
  async deleteAllChains() {
    return this.sendCommand("delete_all_chains");
  }
}
class Ue extends _ {
  constructor(e, t) {
    super(e, "device-view", t);
  }
}
const Ts = "Looper";
class As extends _ {
  constructor(e, t) {
    super(e, "looper-device", t.id), this.raw = t, this.view = new Ue(e, t.id), this.transformers = {
      chains: (s) => s.map((i) => new P(e, i)),
      drum_pads: (s) => s.map((i) => new I(e, i)),
      parameters: (s) => s.map((i) => new b(e, i)),
      return_chains: (s) => s.map((i) => new P(e, i))
    }, this.cachedProps = {
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0
    };
  }
  view;
  /** Erases Looper's recorded content. */
  async clear() {
    return this.sendCommand("clear");
  }
  /** Doubles the length of Looper's buffer. */
  async doubleLength() {
    return this.sendCommand("double_length");
  }
  /** Doubles the speed of Looper's playback. */
  async doubleSpeed() {
    return this.sendCommand("double_speed");
  }
  /** Exports Looper's content to a Session Clip Slot. */
  async exportToClipSlot(e) {
    return this.sendCommand("export_to_clip_slot", {
      slot_id: typeof e == "string" ? e : e.raw.id
    });
  }
  /** Halves the length of Looper's buffer. */
  async halfLength() {
    return this.sendCommand("half_length");
  }
  /** Halves the speed of Looper's playback. */
  async halfSpeed() {
    return this.sendCommand("half_speed");
  }
  /** Plays back while adding additional layers of incoming audio. */
  async overdub() {
    return this.sendCommand("overdub");
  }
  /** Plays back without overdubbing. */
  async play() {
    return this.sendCommand("play");
  }
  /** Records incoming audio. */
  async record() {
    return this.sendCommand("record");
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  async savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Stops Looper's playback. */
  async stop() {
    return this.sendCommand("stop");
  }
  /** Sets the selected bank in the device for persistency. */
  async storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
  /**
   * Erases everything that was recorded since the last time Overdub was enabled.
   * Calling a second time will restore the material erased by the previous undo
   * operation.
   */
  async undo() {
    return this.sendCommand("undo");
  }
}
const Es = "PluginDevice";
class Ls extends _ {
  constructor(e, t) {
    super(e, "plugin-device", t.id), this.raw = t, this.view = new Ue(e, t.id), this.transformers = {
      chains: (s) => s.map((i) => new P(e, i)),
      drum_pads: (s) => s.map((i) => new I(e, i)),
      parameters: (s) => s.map((i) => new b(e, i)),
      return_chains: (s) => s.map((i) => new P(e, i))
    }, this.cachedProps = {
      chains: !0,
      drum_pads: !0,
      parameters: !0,
      return_chains: !0
    };
  }
  view;
  /**
   * Gets the range of plugin parameter names, bound by begin and end.
   * If end is smaller than 0 it is interpreted as the parameter count.
   */
  async getParameterNames(e = 0, t = -1) {
    return this.sendCommand("get_parameter_names", { begin: e, end: t });
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  async savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Sets the selected bank in the device for persistency. */
  async storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
}
class ks extends _ {
  constructor(e, t) {
    super(e, "rack-device-view", t), this.transformers = {
      selected_chain: (s) => s ? ze(e, s) : null,
      selected_drum_pad: (s) => s ? new I(e, s) : null
    }, this.cachedProps = {
      selected_chain: !0,
      selected_drum_pad: !0
    };
  }
}
const Rs = [
  "InstrumentGroupDevice",
  "DrumGroupDevice",
  "AudioEffectGroupDevice",
  "MidiEffectGroupDevice"
];
class zs extends _ {
  constructor(e, t) {
    super(e, "rack-device", t.id), this.raw = t, this.view = new ks(e, t.id), this.transformers = {
      chain_selector: (s) => s ? new b(e, s) : null,
      chains: (s) => s.map((i) => ze(e, i)),
      drum_pads: (s) => s.map((i) => new I(e, i)),
      parameters: (s) => s.map((i) => new b(e, i)),
      return_chains: (s) => s.map((i) => new P(e, i)),
      visible_drum_pads: (s) => s.map((i) => new I(e, i))
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
  async addMacro() {
    return this.sendCommand("add_macro");
  }
  /**
   * Copies all contents of a drum pad from a source pad into a destination pad.
   * Indices are note numbers (0–127). Throws if the source pad is empty or
   * indices are out of range.
   */
  async copyPad(e, t) {
    return this.sendCommand("copy_pad", {
      source_index: e,
      destination_index: t
    });
  }
  /** Deletes the currently selected macro variation. */
  async deleteSelectedVariation() {
    return this.sendCommand("delete_selected_variation");
  }
  /**
   * Inserts a new chain at `index`, or at the end when `index` is `-1`
   * (default).
   */
  async insertChain(e = -1) {
    const t = await this.sendCommand("insert_chain", { index: e });
    return ze(this.ableton, t);
  }
  /** Randomizes values for all macro controls not excluded from randomization. */
  async randomizeMacros() {
    return this.sendCommand("randomize_macros");
  }
  /** Recalls the macro variation that was recalled most recently. */
  async recallLastUsedVariation() {
    return this.sendCommand("recall_last_used_variation");
  }
  /** Recalls the currently selected macro variation. */
  async recallSelectedVariation() {
    return this.sendCommand("recall_selected_variation");
  }
  /** Decreases the number of visible macro controls in the rack. */
  async removeMacro() {
    return this.sendCommand("remove_macro");
  }
  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  async savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Sets the selected bank in the device for persistency. */
  async storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
  /** Stores a new variation of the values of all currently mapped macros. */
  async storeVariation() {
    return this.sendCommand("store_variation");
  }
}
function Ps(n) {
  return Rs.includes(n);
}
function q(n, e) {
  return e.class_name === Ts ? new As(n, e) : e.class_name === Es ? new Ls(n, e) : Ps(e.class_name) ? new zs(n, e) : new Fs(n, e);
}
class Fs extends _ {
  constructor(e, t) {
    super(e, "device", t.id), this.raw = t, this.view = new Ue(e, t.id), this.transformers = {
      chains: (s) => s.map((i) => new P(e, i)),
      drum_pads: (s) => s.map((i) => new I(e, i)),
      parameters: (s) => s.map((i) => new b(e, i)),
      return_chains: (s) => s.map((i) => new P(e, i))
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
  async savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }
  /** Sets the selected bank in the device for persistency. */
  async storeChosenBank(e, t) {
    return this.sendCommand("store_chosen_bank", [e, t]);
  }
}
class G {
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
class St extends _ {
  constructor(e, t) {
    super(e, "envelope", t.id), this.raw = t, this.transformers = {
      parameter: (s) => new b(e, s)
    }, this.cachedProps = {
      parameter: !0
    };
  }
  /**
   * Creates a new event at the specified time with the given value and,
   * optionally, control coefficients.
   */
  async createEvent(e, t, s) {
    return this.sendCommand("create_event", {
      time: e,
      value: t,
      control_coefficients: s
    });
  }
  /**
   * Deletes the events in the specified time range.
   */
  async deleteEventsInRange(e, t) {
    return this.sendCommand("delete_events_in_range", {
      from_time: e,
      to_time: t
    });
  }
  /**
   * Returns the events in the specified time range.
   */
  async eventsInRange(e, t) {
    return this.sendCommand("events_in_range", {
      from_time: e,
      to_time: t
    });
  }
  /**
   * Given a start time, a step length and a value, creates a step in the envelope.
   */
  async insertStep(e, t, s) {
    return this.sendCommand("insert_step", {
      start_time: e,
      length: t,
      value: s
    });
  }
  /**
   * Returns the parameter value at the specified time.
   */
  async valueAtTime(e) {
    return this.sendCommand("value_at_time", { time: e });
  }
}
const ke = (n) => ({
  pitch: n[0],
  time: n[1],
  duration: n[2],
  velocity: n[3],
  muted: n[4]
}), Ct = (n) => [
  n.pitch,
  n.time,
  n.duration,
  n.velocity,
  n.muted
];
class E extends _ {
  constructor(e, t) {
    super(e, "clip", t.id), this.raw = t, this.transformers = {
      color: (s) => new G(s),
      notes: (s) => s.map(ke)
    };
  }
  /**
   * Available for audio clips only.
   * Converts the given beat time to sample time.
   * Raises an error if the sample is not warped.
   */
  async beatToSampleTime(e) {
    return this.sendCommand("beat_to_sample_time", [e]);
  }
  /**
   * Clears all envelopes for this clip.
   */
  async clearAllEnvelopes() {
    return this.sendCommand("clear_all_envelopes");
  }
  /**
   * Returns the envelope for the given parameter, or `null` if it does not
   * exist. Arrangement clips and parameters from another track always return `null`.
   */
  async automationEnvelope(e) {
    const t = await this.sendCommand("automation_envelope", {
      parameter_id: typeof e == "string" ? e : e.raw.id
    });
    return t ? new St(this.ableton, t) : null;
  }
  /**
   * Clears the envelope of this clip's given parameter.
   */
  async clearEnvelope(e) {
    return this.sendCommand("clear_envelope", {
      parameter_id: typeof e == "string" ? e : e.raw.id
    });
  }
  /**
   * Creates an envelope for a given parameter and returns it.
   * This should only be used if the envelope doesn't exist.
   * Raises an error if the envelope can't be created.
   */
  async createAutomationEnvelope(e) {
    const t = await this.sendCommand("create_automation_envelope", {
      parameter_id: typeof e == "string" ? e : e.raw.id
    });
    return new St(this.ableton, t);
  }
  /**
   * Crops the clip. The region that is cropped depends on whether
   * the clip is looped or not. If looped, the region outside of
   * the loop is removed. If not looped, the region outside
   * the start and end markers is removed.
   */
  async crop() {
    return this.sendCommand("crop");
  }
  /**
   * Deselects all notes present in the clip.
   */
  async deselectAllNotes() {
    return this.sendCommand("deselect_all_notes");
  }
  /**
   * Makes the loop twice as long and duplicates notes and envelopes.
   * Duplicates the clip start/end range if the clip is not looped.
   */
  async duplicateLoop() {
    return this.sendCommand("duplicate_loop");
  }
  /**
   * Duplicates the notes in the specified region to the destination_time.
   * Only notes of the specified pitch are duplicated if pitch is not -1.
   * If the transposition_amount is not 0, the notes in the region will be
   * transposed by the transposition_amount of semitones.
   * Raises an error on audio clips.
   */
  async duplicateRegion(e, t, s, i = -1, r = 0) {
    return this.sendCommand("duplicate_region", [
      e,
      t,
      s,
      i,
      r
    ]);
  }
  /**
   * Starts playing this clip.
   */
  async fire() {
    return this.sendCommand("fire");
  }
  /**
   * Returns all notes that match the given range.
   */
  async getNotes(e, t, s, i) {
    return (await this.sendCommand("get_notes", {
      from_time: e,
      from_pitch: t,
      time_span: s,
      pitch_span: i
    })).map(ke);
  }
  /**
   * Returns all notes matching the given range with extended properties.
   * Compared to getNotes, this method returns additional note information.
   */
  async getNotesExtended(e, t, s, i) {
    return this.sendCommand("get_notes_extended", {
      from_pitch: t,
      pitch_span: i,
      from_time: e,
      time_span: s
    });
  }
  /**
   * Returns the clip's currently selected notes.
   */
  async getSelectedNotes() {
    return (await this.sendCommand("get_selected_notes")).map(ke);
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
  async applyNoteModifications(e) {
    return this.sendCommand("apply_note_modifications", { notes: e });
  }
  /**
   * Jumps forward or backward by the specified relative amount in beats.
   * Does nothing if the clip is not playing.
   */
  async movePlayingPos(e) {
    return this.sendCommand("move_playing_pos", [e]);
  }
  /**
   * Quantizes all notes in a clip or aligns warp markers.
   */
  async quantize(e, t) {
    return this.sendCommand("quantize", [e, t]);
  }
  /**
   * Quantizes all the notes of a given pitch.
   */
  async quantizePitch(e, t, s) {
    return this.sendCommand("quantize_pitch", [e, t, s]);
  }
  /**
   * Deletes all notes that start in the given area.
   *
   * @deprecated starting with Live 11, use `removeNotesExtended` instead
   */
  async removeNotes(e, t, s, i) {
    return this.sendCommand("remove_notes", [
      e,
      t,
      s,
      i
    ]);
  }
  /**
   * Deletes all notes that start in the given area.
   */
  async removeNotesExtended(e, t, s, i) {
    return this.sendCommand("remove_notes_extended", [
      t,
      i,
      e,
      s
    ]);
  }
  /**
   * Removes notes by given note ids.
   * Available since Live 11.0.
   */
  async removeNotesById(e) {
    return this.sendCommand("remove_notes_by_id", [e]);
  }
  /**
   * Replaces selected notes with an array of new notes.
   */
  async replaceSelectedNotes(e) {
    return this.sendCommand("replace_selected_notes", {
      notes: e.map(Ct)
    });
  }
  /**
   * Available for audio clips only.
   * Converts the given sample time to beat time.
   * Raises an error if the sample is not warped.
   */
  async sampleToBeatTime(e) {
    return this.sendCommand("sample_to_beat_time", [e]);
  }
  /**
   * Scrubs inside a clip.
   * `position` defines the position in beats that the scrub will start from.
   * The scrub will continue until `stop_scrub` is called.
   * Global quantization applies to the scrub's position and length.
   */
  async scrub(e) {
    return this.sendCommand("scrub", [e]);
  }
  /**
   * Available for audio clips only.
   * Converts the given seconds to sample time.
   * Raises an error if the sample is warped.
   */
  async secondsToSampleTime(e) {
    return this.sendCommand("seconds_to_sample_time", [e]);
  }
  /**
   * Selects all notes present in the clip.
   */
  async selectAllNotes() {
    return this.sendCommand("select_all_notes");
  }
  /**
   * Sets the clip's fire button state directly.
   * Supports all launch modes.
   */
  async setFireButtonState(e) {
    return this.sendCommand("set_fire_button_state", [e]);
  }
  /**
   * Adds the given notes to the clip.
   */
  async setNotes(e) {
    return this.sendCommand("set_notes", { notes: e.map(Ct) });
  }
  /**
   * Stops playing this clip.
   */
  async stop() {
    return this.sendCommand("stop");
  }
  /**
   * Stops the current scrub.
   */
  async stopScrub() {
    return this.sendCommand("stop_scrub");
  }
}
class He extends _ {
  constructor(e, t) {
    super(e, "clip_slot", t.id), this.raw = t, this.transformers = {
      clip: (s) => s ? new E(e, s) : null,
      color: (s) => new G(s)
    }, this.cachedProps = {
      clip: !0
    };
  }
  /**
   * Creates an empty clip with the given length in the slot.
   * Throws an error when called on non-empty slots or slots in non-MIDI tracks.
   */
  async createClip(e) {
    return this.sendCommand("create_clip", [e]);
  }
  /**
   * Removes the clip contained in the slot.
   * Raises an exception if the slot was empty.
   */
  async deleteClip() {
    return this.sendCommand("delete_clip");
  }
  /**
   * Duplicates the slot's clip to the target slot, replacing any clip there.
   * Raises if the source is empty, types differ (audio vs MIDI), or either
   * slot is a group slot.
   */
  async duplicateClipTo(e) {
    return this.sendCommand("duplicate_clip_to", {
      slot_id: typeof e == "string" ? e : e.raw.id
    });
  }
  /**
   * Fires a Clip if this Clipslot owns one,
   * else triggers the stop button, if we have one.
   */
  async fire() {
    return this.sendCommand("fire");
  }
  /**
   * Sets the ClipSlot's fire button state directly.
   * Supports all launch modes.
   */
  async setFireButtonState(e) {
    return this.sendCommand("set_fire_button_state", [e]);
  }
  /**
   * Stops playing the contained Clip,
   * if there is a Clip and its currently playing.
   */
  async stop() {
    return this.sendCommand("stop");
  }
}
class Os extends _ {
  constructor(e, t) {
    super(e, "mixer-device", t.id), this.raw = t, this.transformers = {
      crossfader: (s) => new b(e, s),
      cue_volume: (s) => new b(e, s),
      left_split_stereo: (s) => new b(e, s),
      panning: (s) => new b(e, s),
      right_split_stereo: (s) => new b(e, s),
      sends: (s) => s.map((i) => new b(e, i)),
      song_tempo: (s) => new b(e, s),
      track_activator: (s) => new b(e, s),
      volume: (s) => new b(e, s)
    };
  }
}
class qs extends _ {
  constructor(e, t) {
    super(e, "track-view", t), this.transformers = {
      selected_device: (s) => q(e, s)
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
class xt extends _ {
  constructor(e, t) {
    super(e, "take-lane", t.id), this.raw = t, this.transformers = {
      arrangement_clips: (s) => s.map((i) => new E(e, i))
    }, this.cachedProps = {
      arrangement_clips: !0
    };
  }
  /** Creates an audio clip in this take lane's arrangement at `startTime`. */
  async createAudioClip(e, t) {
    const s = await this.sendCommand("create_audio_clip", {
      file_path: e,
      start_time: t
    });
    return new E(this.ableton, s);
  }
  /** Creates an empty MIDI clip in this take lane's arrangement. */
  async createMidiClip(e, t) {
    const s = await this.sendCommand("create_midi_clip", {
      start_time: e,
      length: t
    });
    return new E(this.ableton, s);
  }
}
class A extends _ {
  constructor(e, t) {
    super(e, "track", t.id), this.raw = t, this.view = new qs(this.ableton, t.id), this.transformers = {
      arrangement_clips: (s) => s.map((i) => new E(e, i)),
      color: (s) => new G(s),
      devices: (s) => s.map((i) => q(e, i)),
      clip_slots: (s) => s.map((i) => new He(e, i)),
      group_track: (s) => s ? new A(e, s) : null,
      mixer_device: (s) => new Os(e, s),
      take_lanes: (s) => s.map((i) => new xt(e, i))
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
    const s = await this.sendCommand("duplicate_clip_to_arrangement", {
      clip_id: typeof e == "string" ? e : e.raw.id,
      time: t
    });
    return new E(this.ableton, s);
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
   * Deletes a device identified by the index in the 'devices' list of current track.
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
    return new xt(this.ableton, e);
  }
  /**
   * Inserts a native Live device by UI name at `targetIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(e, t = -1) {
    const s = await this.sendCommand("insert_device", {
      device_name: e,
      target_index: t
    });
    return q(this.ableton, s);
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
  /** Returns data previously stored on this track with {@link setData}. */
  async getData(e) {
    return this.sendCachedCommand("get_data", { key: e });
  }
  /** Stores persistent data on this track for the given key. */
  async setData(e, t) {
    return this.sendCommand("set_data", { key: e, value: t });
  }
  /**
   * Creates an audio clip referencing `filePath` and inserts it into the
   * arrangement at `position`. Only works on audio tracks.
   */
  async createAudioClip(e, t) {
    const s = await this.sendCommand("create_audio_clip", {
      file_path: e,
      position: t
    });
    return new E(this.ableton, s);
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
    const s = await this.sendCommand("create_midi_clip", {
      start_time: e,
      length: t
    });
    return new E(this.ableton, s);
  }
}
class Is extends _ {
  constructor(e, t) {
    super(e, "cue-point", t.id), this.raw = t;
  }
  /**
   * Jumps playback to this cue when the song is playing (quantized),
   * or moves the start position to this cue when stopped.
   */
  async jump() {
    return this.sendCommand("jump");
  }
}
class Pe extends _ {
  constructor(e, t) {
    super(e, "scene", t.id), this.raw = t, this.transformers = {
      color: (s) => new G(s),
      clip_slots: (s) => s.map((i) => new He(this.ableton, i))
    }, this.cachedProps = {
      clip_slots: !0
    };
  }
  /**
   * Fires the scene directly. Fires all clip slots
   * that this scene owns and selects the scene itself.
   */
  async fire() {
    return this.sendCommand("fire");
  }
}
class js extends _ {
  constructor(e) {
    super(e, "song-view"), this.transformers = {
      selected_parameter: (t) => new b(e, t),
      selected_track: (t) => new A(e, t),
      selected_scene: (t) => new Pe(e, t),
      highlighted_clip_slot: (t) => new He(e, t),
      detail_clip: (t) => new E(e, t)
    }, this.cachedProps = {
      detail_clip: !0,
      selected_parameter: !0,
      selected_track: !0,
      selected_scene: !0,
      highlighted_clip_slot: !0
    };
  }
  /** Selects the given device in Live. */
  async selectDevice(e) {
    return this.ableton.sendCommand({
      ns: this.ns,
      name: "select_device",
      args: {
        device_id: typeof e == "string" ? e : e.raw.id
      }
    });
  }
}
class Ds extends _ {
  constructor(e, t) {
    super(e, "groove", t.id), this.raw = t;
  }
}
class Ns extends _ {
  constructor(e) {
    super(e, "groove-pool"), this.transformers = {
      grooves: (t) => t.map((s) => new Ds(e, s))
    }, this.cachedProps = {
      grooves: !0
    };
  }
}
class Us extends _ {
  constructor(e, t) {
    super(e, "tuning-system", t.id), this.raw = t;
  }
}
class Hs extends _ {
  constructor(e) {
    super(e, "song"), this.transformers = {
      cue_points: (t) => t.map((s) => new Is(e, s)),
      master_track: (t) => new A(e, t),
      return_tracks: (t) => t.map((s) => new A(e, s)),
      tracks: (t) => t.map((s) => new A(e, s)),
      tuning_system: (t) => t ? new Us(e, t) : null,
      visible_tracks: (t) => t.map((s) => new A(e, s)),
      scenes: (t) => t.map((s) => new Pe(e, s))
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
  view = new js(this.ableton);
  groovePool = new Ns(this.ableton);
  /** Begins a grouped undo step for subsequent song edits. */
  async beginUndoStep() {
    return this.sendCommand("begin_undo_step");
  }
  /** Continues playing the song from the current position. */
  async continuePlaying() {
    return this.sendCommand("continue_playing");
  }
  /**
   * Creates a new audio track at the given index and returns it.
   * When `index` is `-1`, appends the track at the end.
   */
  async createAudioTrack(e = -1) {
    const t = await this.sendCommand("create_audio_track", { index: e });
    return new A(this.ableton, t);
  }
  /**
   * Creates a new MIDI track at the given index and returns it.
   * When `index` is `-1`, appends the track at the end.
   */
  async createMidiTrack(e = -1) {
    const t = await this.sendCommand("create_midi_track", { index: e });
    return new A(this.ableton, t);
  }
  /** Creates a new return track at the end and returns it. */
  async createReturnTrack() {
    const e = await this.sendCommand("create_return_track");
    return new A(this.ableton, e);
  }
  /**
   * Creates a new scene at the given index and returns it.
   * When `index` is `-1`, appends the scene at the end.
   */
  async createScene(e = -1) {
    const t = await this.sendCommand("create_scene", { index: e });
    return new Pe(this.ableton, t);
  }
  /** Deletes the return track at the given index. */
  async deleteReturnTrack(e) {
    return this.sendCommand("delete_return_track", [e]);
  }
  /** Deletes the scene at the given index. */
  async deleteScene(e) {
    return this.sendCommand("delete_scene", [e]);
  }
  /** Deletes the track at the given index. */
  async deleteTrack(e) {
    return this.sendCommand("delete_track", [e]);
  }
  /** Duplicates the scene at the given index and selects the new scene. */
  async duplicateScene(e) {
    return this.sendCommand("duplicate_scene", [e]);
  }
  /** Duplicates the track at the given index and selects the new track. */
  async duplicateTrack(e) {
    return this.sendCommand("duplicate_track", [e]);
  }
  /** Ends the current grouped undo step. */
  async endUndoStep() {
    return this.sendCommand("end_undo_step");
  }
  /** Returns data previously stored on the song with {@link setData}. */
  async getData(e) {
    return this.sendCachedCommand("get_data", { key: e });
  }
  /**
   * Returns the song's current playing position in the given SMPTE format.
   */
  async getCurrentSmpteSongTime(e) {
    return this.sendCommand("get_current_smpte_song_time", { timeFormat: e });
  }
  /** Returns true when the global play position is currently on a cue point. */
  async isCuePointSelected() {
    return this.sendCommand("is_cue_point_selected");
  }
  /** Moves the play position by the given amount relative to the current position. */
  async jumpBy(e) {
    return this.sendCommand("jump_by", [e]);
  }
  /** Jumps to the next cue (marker) when possible. */
  async jumpToNextCue() {
    return this.sendCommand("jump_to_next_cue");
  }
  /** Jumps to the previous cue (marker) when possible. */
  async jumpToPrevCue() {
    return this.sendCommand("jump_to_prev_cue");
  }
  /** Starts playing the current selection, or does nothing when none is set. */
  async playSelection() {
    return this.sendCommand("play_selection");
  }
  /** Discards overrides of automated parameters. */
  async reEnableAutomation() {
    return this.sendCommand("re_enable_automation");
  }
  /** Redoes the last undone action. */
  async redo() {
    return this.sendCommand("redo");
  }
  /**
   * Moves the play position by the given amount without stopping playback
   * (same as {@link jumpBy}, but keeps playing).
   */
  async scrubBy(e) {
    return this.sendCommand("scrub_by", [e]);
  }
  /** Stores persistent data on the song for the given key. */
  async setData(e, t) {
    return this.sendCommand("set_data", [e, t]);
  }
  /**
   * Deletes the selected cue when one is selected; otherwise creates a cue at
   * the current song time.
   */
  async setOrDeleteCue() {
    return this.sendCommand("set_or_delete_cue");
  }
  /** Starts playing from the start marker. */
  async startPlaying() {
    return this.sendCommand("start_playing");
  }
  /** Stops all playing clips while continuing song playback. */
  async stopAllClips() {
    return this.sendCommand("stop_all_clips");
  }
  /** Stops playing the song. */
  async stopPlaying() {
    return this.sendCommand("stop_playing");
  }
  /**
   * Starts playing only when Live is currently not playing, so Live does not
   * jump back to the start when already playing.
   *
   * @returns whether the command was executed
   */
  async safeStartPlaying() {
    return this.sendCommand("safe_start_playing");
  }
  /**
   * Stops playback only when Live is currently playing, so Live does not jump
   * back to the arrangement start when already stopped.
   *
   * @returns whether the command was executed
   */
  async safeStopPlaying() {
    return this.sendCommand("safe_stop_playing");
  }
  /** Triggers Live's tap-tempo function. */
  async tapTempo() {
    return this.sendCommand("tap_tempo");
  }
  /** Undoes the last action. */
  async undo() {
    return this.sendCommand("undo");
  }
}
const Fe = "5.0.0-4";
class Ms extends _ {
  constructor(e) {
    super(e, "internal");
  }
  /** Returns whether the MIDI Remote Script version satisfies this client. */
  async isPluginUpToDate() {
    return await this.get("version") === Fe;
  }
}
class Bs extends _ {
  constructor(e) {
    super(e, "application-view");
  }
  /** Returns the available main document subviews (e.g. Session, Arranger). */
  async availableMainViews() {
    return this.sendCachedCommand("available_main_views");
  }
  /** Shows and focuses the given view. */
  async focusView(e) {
    return this.sendCommand("focus_view", [e]);
  }
  /** Hides the given view. */
  async hideView(e) {
    return this.sendCommand("hide_view", [e]);
  }
  /**
   * Returns whether the given view is currently visible.
   * When `mainWindowOnly` is false, also checks the second window.
   */
  async isViewVisible(e, t = !0) {
    return this.sendCommand("is_view_visible", [e, t]);
  }
  /** Scrolls the given view in the given direction when possible. */
  async scrollView(e, t, s) {
    return this.sendCommand("scroll_view", {
      direction: t,
      view: e,
      modifier_pressed: s
    });
  }
  /** Shows the given view. */
  async showView(e) {
    return this.sendCommand("show_view", [e]);
  }
  /**
   * Reveals the device chain and browser and starts hot-swap for the selected
   * device. Calling again stops hot-swap.
   */
  async toggleBrowse() {
    return this.sendCommand("toggle_browse");
  }
  /** Zooms the given view in the given direction when possible. */
  async zoomView(e, t, s) {
    return this.sendCommand("zoom_view", {
      direction: t,
      view: e,
      modifier_pressed: s
    });
  }
}
class M extends _ {
  constructor(e, t) {
    super(e, "browser-item", t.id), this.raw = t, this.transformers = {
      children: (s) => s.map((i) => new M(e, i))
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
class Ws extends _ {
  constructor(e) {
    super(e, "browser");
    const t = (s) => s.map((i) => new M(e, i));
    this.transformers = {
      audio_effects: t,
      clips: t,
      colors: t,
      current_project: t,
      drums: t,
      instruments: t,
      legacy_libraries: t,
      max_for_live: t,
      midi_effects: t,
      packs: t,
      plugins: t,
      samples: t,
      sounds: t,
      user_library: t,
      user_folders: t,
      hotswap_target: (s) => new M(e, s)
    }, this.cachedProps = {
      audio_effects: !0,
      clips: !0,
      colors: !0,
      current_project: !0,
      drums: !0,
      filter_type: !1,
      instruments: !0,
      legacy_libraries: !0,
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
    return this.sendCommand("load_item", {
      id: typeof e == "string" ? e : e.raw.id
    });
  }
  /** Previews the provided browser item. */
  async previewItem(e) {
    return this.sendCommand("preview_item", {
      id: typeof e == "string" ? e : e.raw.id
    });
  }
  /** Returns the relation between the given browser item and the current hotswap target. */
  async relationToHotswapTarget(e) {
    return this.sendCommand("relation_to_hotswap_target", {
      id: typeof e == "string" ? e : e.raw.id
    });
  }
  /** Stops the current preview. */
  async stopPreview() {
    return this.sendCommand("stop_preview");
  }
}
class Gs extends _ {
  constructor(e) {
    super(e, "application"), this.cachedProps = {
      unavailable_features: !0
    };
  }
  browser = new Ws(this.ableton);
  view = new Bs(this.ableton);
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
var Ht = /* @__PURE__ */ ((n) => (n[n.NoteOn = 128] = "NoteOn", n[n.NoteOff = 144] = "NoteOff", n[n.AfterTouch = 160] = "AfterTouch", n[n.ControlChange = 176] = "ControlChange", n[n.PatchChange = 192] = "PatchChange", n[n.ChannelPressure = 208] = "ChannelPressure", n[n.PitchBend = 224] = "PitchBend", n[n.SysExStart = 240] = "SysExStart", n[n.MidiTimeCodeQuarterFrame = 241] = "MidiTimeCodeQuarterFrame", n[n.SongPositionPointer = 242] = "SongPositionPointer", n[n.SongSelect = 243] = "SongSelect", n[n.TuneRequest = 246] = "TuneRequest", n[n.SysExEnd = 247] = "SysExEnd", n[n.TimingClock = 248] = "TimingClock", n[n.Start = 250] = "Start", n[n.Continue = 251] = "Continue", n[n.Stop = 252] = "Stop", n[n.ActiveSensing = 254] = "ActiveSensing", n[n.SystemReset = 255] = "SystemReset", n))(Ht || {});
class $s {
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
    if (!(e.bytes[0] in Ht))
      throw "invalid midi command: " + e.bytes[0];
    this.command = e.bytes[0];
  }
  /** Returns this message as a control-change payload, or throws if it is not CC. */
  toCC() {
    if (this.command !== 176)
      throw "not a midi CC message";
    return {
      command: this.command,
      controller: this.parameter1,
      value: this.parameter2
    };
  }
  /** Returns this message as a note payload, or throws if it is not note on/off. */
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
class Vs extends _ {
  constructor(e) {
    super(e, "midi"), this.transformers = {
      midi: (t) => new $s(t)
    };
  }
}
const Js = (n) => n && "__cached" in n;
class Qs extends _ {
  constructor(e) {
    super(e, "session", void 0);
  }
  /** Creates the Session View highlight ("red box") with the given size. */
  async setupSessionBox(e, t) {
    return this.sendCommand("setup_session_box", { num_tracks: e, num_scenes: t });
  }
  /** Moves the Session View highlight to the given track and scene offsets. */
  async setSessionOffset(e, t) {
    return this.sendCommand("set_session_offset", {
      track_offset: e,
      scene_offset: t
    });
  }
}
class Xs {
  listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    let s = this.listeners.get(e);
    return s || (s = /* @__PURE__ */ new Set(), this.listeners.set(e, s)), s.add(t), this;
  }
  once(e, t) {
    const s = ((...i) => {
      this.off(e, s), t(...i);
    });
    return this.on(e, s);
  }
  off(e, t) {
    return this.listeners.get(e)?.delete(t), this;
  }
  emit(e, ...t) {
    const s = this.listeners.get(e);
    if (!s || s.size === 0)
      return !1;
    for (const i of Array.from(s))
      i(...t);
    return !0;
  }
}
function Tt(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in n && n.BYTES_PER_ELEMENT === 1;
}
const Oe = (n) => n ? `"${n}" ` : "";
function At(n, e = "") {
  if (typeof n != "number")
    throw new TypeError(Oe(e) + "expected number, got " + typeof n);
  if (!Number.isSafeInteger(n) || n < 0)
    throw new RangeError(Oe(e) + "expected integer >= 0, got " + n);
  return n;
}
function $(n, e, t = "") {
  if (Tt(n) && e === void 0)
    return n;
  const s = Tt(n), i = "", r = s ? `length=${n.length}` : `type=${typeof n}`, a = Oe(t) + "expected Uint8Array" + i + ", got " + r;
  throw s ? new RangeError(a) : new TypeError(a);
}
function Ys(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new TypeError("expected hash wrapped by utils.createHasher");
  if (At(n.outputLen), At(n.blockLen), n.outputLen < 1 || n.blockLen < 1)
    throw new Error("hash blockLen / outputLen must be >= 1");
}
const Et = (n, e) => {
  if (n === null || typeof n != "object" || Array.isArray(n))
    throw new TypeError((e === "object" ? "" : `"${e}" `) + "expected object, got type=" + typeof n);
};
function B(n, e = !0) {
  if (n.destroyed)
    throw new Error("hash was destroyed");
  if (e && n.finished)
    throw new Error("digest() was already called");
}
function Mt(n, e) {
  $(n, void 0, "output");
  const t = e.outputLen;
  if (!(n.length >= t))
    throw new RangeError('"output" expected length >= ' + t);
}
function qe(...n) {
  for (let e = 0; e < n.length; e++)
    n[e].fill(0);
}
function Re(n) {
  return new DataView(n.buffer, n.byteOffset, n.byteLength);
}
function T(n, e) {
  return n << 32 - e | n >>> e;
}
const Ks = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Zs = /* @__PURE__ */ Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function en(n) {
  if ($(n), Ks)
    return n.toHex();
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += Zs[n[t]];
  return e;
}
function Lt(n) {
  if (typeof n != "string")
    throw new TypeError("string expected");
  return new Uint8Array(new TextEncoder().encode(n));
}
function tn(n, e, t = "opts") {
  return Et(n, "defaults"), e !== void 0 && Et(e, t), Object.assign(n, e);
}
function sn(n, e = {}) {
  if (typeof n != "function")
    throw new TypeError('"hashCons" expected function, got type=' + typeof n);
  e = tn({}, e, "info");
  const t = (i, r) => n(r).update(i).digest(), s = n(void 0);
  return t.outputLen = s.outputLen, t.blockLen = s.blockLen, t.canXOF = s.canXOF, t.create = (i) => n(i), Object.assign(t, e), Object.freeze(t);
}
const nn = (n) => ({
  // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
  // Larger suffix values would need base-128 OID encoding and a different length byte.
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, n])
});
class kt {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = !1;
  finished = !1;
  destroyed = !1;
  constructor(e, t) {
    if (Ys(e), $(t, void 0, "key"), this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("expected Hash instance");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(t.length > s ? e.create().update(t).digest() : t);
    for (let r = 0; r < i.length; r++)
      i[r] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let r = 0; r < i.length; r++)
      i[r] ^= 106;
    this.oHash.update(i), qe(i);
  }
  update(e) {
    return B(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    B(this), Mt(e, this), this.finished = !0;
    const t = e.subarray(0, this.outputLen);
    this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash: t, iHash: s, finished: i, destroyed: r, blockLen: a, outputLen: o, canXOF: h } = this;
    return e = e, e.finished = i, e.destroyed = r, e.blockLen = a, e.outputLen = o, e.canXOF = h, e.oHash = t._cloneInto(e.oHash), e.iHash = s._cloneInto(e.iHash), e;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const rn = /* @__PURE__ */ (() => {
  const n = ((e, t, s) => new kt(e, t).update(s).digest());
  return n.create = (e, t) => new kt(e, t), n;
})(), an = (n) => n / 2 ** 32 | 0, on = (n) => n >>> 0;
function cn(n, e, t, s) {
  const i = an(t), r = on(t);
  n.setUint32(e, s ? r : i, s), n.setUint32(e + 4, s ? i : r, s);
}
function hn(n, e, t) {
  return n & e ^ ~n & t;
}
function un(n, e, t) {
  return n & e ^ n & t ^ e & t;
}
class ln {
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
  constructor(e, t, s, i) {
    this.blockLen = e, this.outputLen = t, this.padOffset = s, this.isLE = i, this.buffer = new Uint8Array(e), this.view = Re(this.buffer);
  }
  update(e) {
    B(this), $(e);
    const { view: t, buffer: s, blockLen: i } = this, r = e.length;
    let a = !1;
    for (let o = 0; o < r; ) {
      const h = Math.min(i - this.pos, r - o);
      if (h === i) {
        const c = Re(e);
        for (; i <= r - o; o += i)
          this.process(c, o);
        a = !0;
        continue;
      }
      s.set(o === 0 && h === r ? e : e.subarray(o, o + h), this.pos), this.pos += h, o += h, this.pos === i && (this.process(t, 0), this.pos = 0, a = !0);
    }
    return this.length += e.length, a && this.roundClean(), this;
  }
  digestInto(e) {
    B(this), Mt(e, this), this.finished = !0;
    const { buffer: t, view: s, blockLen: i, isLE: r } = this;
    let { pos: a } = this;
    t[a++] = 128, t.fill(0, a), this.padOffset > i - a && (this.process(s, 0), t.fill(0)), cn(s, i - 8, this.length * 8, r), this.process(s, 0), this.roundClean();
    const o = e === t ? s : Re(e), h = this.outputLen, c = h / 4, l = this.get();
    if (h % 4 || c > l.length)
      throw new Error("invalid outputLen");
    for (let u = 0; u < c; u++)
      o.setUint32(4 * u, l[u], r);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const s = e.slice(0, t);
    return this.destroy(), s;
  }
  _cloneIntoMeta(e) {
    const { buffer: t, length: s, finished: i, destroyed: r, pos: a } = this;
    return e.destroyed = r, e.finished = i, e.length = s, e.pos = a, a && e.buffer.set(t), e;
  }
  clone() {
    return this._cloneInto();
  }
}
const dn = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), fn = /* @__PURE__ */ Uint32Array.from([
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
]), R = /* @__PURE__ */ new Uint32Array(64);
class mn extends ln {
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
    const { A: e, B: t, C: s, D: i, E: r, F: a, G: o, H: h } = this;
    return [e, t, s, i, r, a, o, h];
  }
  // prettier-ignore
  set(e, t, s, i, r, a, o, h) {
    this.A = e | 0, this.B = t | 0, this.C = s | 0, this.D = i | 0, this.E = r | 0, this.F = a | 0, this.G = o | 0, this.H = h | 0;
  }
  _cloneInto(e) {
    return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
  }
  process(e, t) {
    for (let u = 0; u < 16; u++, t += 4)
      R[u] = e.getUint32(t, !1);
    for (let u = 16; u < 64; u++) {
      const d = R[u - 15], f = R[u - 2], m = T(d, 7) ^ T(d, 18) ^ d >>> 3, g = T(f, 17) ^ T(f, 19) ^ f >>> 10;
      R[u] = g + R[u - 7] + m + R[u - 16] | 0;
    }
    let { A: s, B: i, C: r, D: a, E: o, F: h, G: c, H: l } = this;
    for (let u = 0; u < 64; u++) {
      const d = T(o, 6) ^ T(o, 11) ^ T(o, 25), f = l + d + hn(o, h, c) + fn[u] + R[u] | 0, g = (T(s, 2) ^ T(s, 13) ^ T(s, 22)) + un(s, i, r) | 0;
      l = c, c = h, h = o, o = a + f | 0, a = r, r = i, i = s, s = f + g | 0;
    }
    s = s + this.A | 0, i = i + this.B | 0, r = r + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, h = h + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(s, i, r, a, o, h, c, l);
  }
  roundClean() {
    qe(R);
  }
  destroy() {
    this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), qe(this.buffer);
  }
}
class pn extends mn {
  constructor() {
    super(32, dn);
  }
}
const gn = /* @__PURE__ */ sn(
  () => new pn(),
  /* @__PURE__ */ nn(1)
);
function _n(n, e) {
  return en(rn(gn, Lt(n), Lt(e)));
}
const yn = "127.0.0.1", vn = 39031, wn = xs(200);
function bn(n) {
  return n.ns === "internal" && n.name === "authenticate" ? "{ hash: *** }" : gs(JSON.stringify(n.args), { length: 100 });
}
function Sn(n) {
  if (n.length === 0)
    return "commands[0]";
  const e = n[0], t = `${e.ns}.${e.name}(${bn(e)})`;
  return n.length === 1 ? t : `commands[${n.length}] starting with ${t}`;
}
class Cn extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class xn extends Error {
  constructor(e, t) {
    super(e), this.message = e, this.payload = t;
  }
}
class Ln extends Xs {
  /**
   * Creates a client for the AbletonJS Remote Script.
   * Call {@link Ableton.start} before sending commands.
   */
  constructor(e) {
    super(), this.options = e, this.logger = e?.logger, this.host = e?.host ?? yn, this.port = e?.port ?? vn, e?.disableCache || (this.cache = new O({
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
  song = new Hs(this);
  /** Red box / session ring control. */
  session = new Qs(this);
  /** Live application metadata and dialogs. */
  application = new Gs(this);
  /** Internal plugin helpers (ping, version, auth). */
  internal = new Ms(this);
  /** Forwarded MIDI note/CC tracking. */
  midi = new Vs(this);
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
    for (const s of t)
      s.rej(e);
  }
  /**
   * If connected, returns immediately. Otherwise,
   * it waits for a connection event before returning.
   */
  async waitForConnection() {
    if (!this._isConnected)
      return new Promise((e, t) => {
        this.once("connect", () => e()), this.once("error", (s) => t(s));
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
        const i = new Promise(
          (r, a) => setTimeout(() => a(new Error("Connection timed out.")), e)
        );
        await Promise.race([t, i]);
      } catch (i) {
        throw await this.close(), i;
      }
    else
      await t;
    this.logger?.info("Got connection!"), this.clientState = "started", this.handleConnect("start");
    const s = async () => {
      if (!this._isConnected || !this.client || this.client.readyState !== WebSocket.OPEN || this.msgMap.size > 0 || this.commandQueue.length > 0)
        return;
      let i = !1;
      const r = () => {
        i = !0, this.logger?.debug("Cancelled heartbeat");
      };
      this.cancelDisconnectEvents.push(r);
      try {
        const a = performance.now();
        await this.internal.get("ping"), this.handleConnect("heartbeat"), this.latency = performance.now() - a, this.emit("ping", this.latency);
      } catch (a) {
        !i && this._isConnected && (this.logger?.warn("Heartbeat failed:", { error: a, canceled: i }), this.closeCurrentSocket());
      } finally {
        this.cancelDisconnectEvents = this.cancelDisconnectEvents.filter(
          (a) => a !== r
        );
      }
    };
    this.heartbeatInterval = setInterval(
      s,
      this.options?.heartbeatInterval ?? 2e3
    ), s(), this.internal.get("version").then((i) => {
      i !== Fe && this.logger?.warn(
        `The installed version of your AbletonJS plugin (${i}) is different from the JS library (${Fe}).`,
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
      const i = this.client;
      this.client = void 0, i.close();
    }
    const e = this.socketUrl(), t = new WebSocket(e);
    this.client = t;
    const s = this.options?.connectTimeoutMs ?? 5e3;
    this.connectTimer = setTimeout(() => {
      this.connectTimer = void 0, !(this.client !== t || t.readyState !== WebSocket.CONNECTING) && (this.logger?.warn("WebSocket connection timed out", { url: e, timeout: s }), this.client = void 0, t.close(), this.handleDisconnect("realtime"), this.scheduleReconnect());
    }, s), t.addEventListener("open", () => {
      this.client === t && (this.clearConnectTimer(), this.reconnectDelay = 250);
    }), t.addEventListener("message", (i) => {
      this.client === t && typeof i.data == "string" && this.handleIncoming(i.data);
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
        const t = new Promise((s) => {
          e.addEventListener("close", () => s(), { once: !0 });
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
      const t = JSON.parse(e), s = this.msgMap.get(t.uuid);
      if (this.emit("message", t), t.event === "result" && s)
        return this.msgMap.delete(t.uuid), s.res(t.data);
      if (t.event === "error" && s)
        return this.msgMap.delete(t.uuid), s.rej(new Error(t.data));
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
      const i = this.eventListeners.get(t.event);
      if (i)
        return i.forEach((r) => r(t.data));
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
        const t = _n(this.options.password, e.data.salt);
        await this.sendCommand({
          ns: "internal",
          name: "authenticate",
          args: { hash: t }
        });
      } catch (t) {
        const s = t instanceof Error ? t : new Error("Authentication failed");
        this.abortAuthentication(s);
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
    return new Promise((t, s) => {
      this.commandQueue.push({ command: e, res: t, rej: s }), this.flushScheduled || (this.flushScheduled = !0, queueMicrotask(() => {
        this.flushScheduled = !1, this.flushCommandQueue();
      }));
    });
  }
  async flushCommandQueue() {
    if (this.commandQueue.length === 0)
      return;
    const e = this.commandQueue;
    this.commandQueue = [], e.length > 1 && this.logger?.debug("Flushing command queue", { length: e.length }), await wn(async () => {
      try {
        const t = await this.sendCommandEnvelope(
          e.map((s) => s.command)
        );
        if (!Array.isArray(t) || t.length !== e.length) {
          const s = new Error("Unexpected commands response from Ableton.");
          for (const i of e)
            i.rej(s);
          return;
        }
        for (let s = 0; s < e.length; s++) {
          const i = e[s], r = t[s];
          r.ok ? i.res(r.data) : i.rej(new Error(r.error ?? "Command failed"));
        }
      } catch (t) {
        for (const s of e)
          s.rej(t);
      }
    });
  }
  sendCommandEnvelope(e) {
    return new Promise((t, s) => {
      const i = this.getId(), r = {
        uuid: i,
        commands: e
      }, a = JSON.stringify(r), o = Sn(e), h = e.filter((m) => m.timeout).reduce(
        (m, g) => Math.max(m, g.timeout ?? 0),
        this.options?.commandTimeoutMs ?? 3e3
      );
      let c = null;
      const l = () => {
        c && clearTimeout(c);
      }, u = () => {
        this.msgMap.delete(i), l();
      }, d = () => {
        l(), c = setTimeout(() => {
          u(), s(
            new Cn(
              `The command ${o} timed out after ${h} ms.`,
              r
            )
          );
        }, h);
      }, f = Date.now();
      this.msgMap.set(i, {
        res: (m) => {
          const g = Date.now() - f;
          g > (this.options?.commandWarnMs ?? 2e3) && this.logger?.warn("Commands took longer than expected", {
            commands: o,
            duration: g
          }), u(), t(m);
        },
        rej: (m) => {
          u(), s(m);
        },
        clearTimeout: () => {
          u(), s(
            new xn(
              `Live disconnected before being able to respond to ${o}`,
              r
            )
          );
        }
      }), this.sendRaw(a).then(d).catch((m) => {
        u(), s(m);
      });
    });
  }
  /**
   * Sends a command using the response cache when possible.
   * Used by cached `get_prop` calls; prefer {@link Ableton.getProp} or
   * `Namespace.get` instead of calling this directly.
   */
  async sendCachedCommand(e) {
    const t = e.args?.prop ?? JSON.stringify(e.args), s = [e.ns, e.nsid, t].filter(Boolean).join("/"), i = this.cache?.get(s), r = await this.sendCommand({
      ...e,
      etag: i?.etag,
      cache: !0
    });
    if (Js(r)) {
      if (i)
        return i.data;
      throw new Error("Tried to get an object that isn't cached.");
    } else
      return r.etag && this.cache?.set(s, r), r.data;
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
  async getProp(e, t, s, i) {
    const r = { ns: e, nsid: t, name: "get_prop", args: { prop: s } };
    return i && this.cache ? this.sendCachedCommand(r) : this.sendCommand(r);
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
  async setProp(e, t, s, i) {
    return this.sendCommand({
      ns: e,
      nsid: t,
      name: "set_prop",
      args: { prop: s, value: i }
    });
  }
  /**
   * Subscribes to changes of a Live object property.
   * Prefer the typed `addListener` helpers on namespaces such as `song` or `track`.
   *
   * @returns A function that removes this listener
   */
  async addPropListener(e, t, s, i) {
    const r = this.getId(), a = await this.sendCommand({
      ns: e,
      nsid: t,
      name: "add_listener",
      args: { prop: s, nsid: t, eventId: r }
    });
    return this.eventListeners.has(a) ? this.eventListeners.set(a, [
      ...this.eventListeners.get(a),
      i
    ]) : this.eventListeners.set(a, [i]), () => this.removePropListener(e, t, s, a, i);
  }
  /**
   * Removes a property listener previously added with {@link Ableton.addPropListener}.
   * Usually you call the unsubscribe function returned by `addPropListener` instead.
   *
   * @returns `true` if the listener was removed, `false` if it was not found
   */
  async removePropListener(e, t, s, i, r) {
    const a = this.eventListeners.get(i);
    if (!a)
      return !1;
    if (a.length > 1)
      return this.eventListeners.set(
        i,
        a.filter((o) => o !== r)
      ), !0;
    if (a.length === 1)
      return this.eventListeners.delete(i), await this.sendCommand({
        ns: e,
        nsid: t,
        name: "remove_listener",
        args: { prop: s, nsid: t }
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
  Ln as Ableton,
  xn as DisconnectError,
  Cn as TimeoutError,
  Fe as packageVersion
};
//# sourceMappingURL=ableton.js.map
