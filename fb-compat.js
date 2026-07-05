// ════════════════════════════════════════════════════
//  BUEN FRUTO — Firebase Compat + Shim de API modular
//  Un solo sistema para index, admin y chef
// ════════════════════════════════════════════════════

firebase.initializeApp({
  apiKey: "AIzaSyDFOypq8OfX1QmZpoZAdsXmqKYauswBjes",
  authDomain: "buen-fruto.firebaseapp.com",
  projectId: "buen-fruto",
  storageBucket: "buen-fruto.appspot.com",
  messagingSenderId: "931992831636",
  appId: "1:931992831636:web:65ee6652748f6418dc9681"
});

var auth = firebase.auth();
var db = firebase.firestore();

// Mantener sesión iniciada entre recargas
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ==== SHIM: API modular v10 → compat v9 ====
function signInWithEmailAndPassword(a, email, pass) { return a.signInWithEmailAndPassword(email, pass); }
function createUserWithEmailAndPassword(a, email, pass) { return a.createUserWithEmailAndPassword(email, pass); }
function signOut(a) { return a.signOut(); }
function onAuthStateChanged(a, cb) { return a.onAuthStateChanged(cb); }

function collection(dbOrRef, path) {
  if (dbOrRef === db) return db.collection(path);
  return dbOrRef.collection(path);
}
function doc(dbOrRef, col, id) {
  if (col === undefined) return dbOrRef;
  if (dbOrRef === db) return db.collection(col).doc(id);
  return dbOrRef.collection(col).doc(id);
}
function getDoc(ref) { return ref.get(); }
function getDocs(q) { return q.get(); }
function setDoc(ref, data) { return ref.set(data); }
function addDoc(colRef, data) { return colRef.add(data); }
function updateDoc(ref, data) { return ref.update(data); }
function deleteDoc(ref) { return ref.delete(); }
function onSnapshot(q, cb) { return q.onSnapshot(cb); }
function serverTimestamp() { return firebase.firestore.FieldValue.serverTimestamp(); }
function writeBatch(d) { return d.batch(); }

function where(field, op, val) { return { _t: 'where', field: field, op: op, val: val }; }
function orderBy(field, dir) { return { _t: 'orderBy', field: field, dir: dir || 'asc' }; }
function query(colRef) {
  var q = colRef;
  for (var i = 1; i < arguments.length; i++) {
    var c = arguments[i];
    if (!c) continue;
    if (c._t === 'where') q = q.where(c.field, c.op, c.val);
    else if (c._t === 'orderBy') q = q.orderBy(c.field, c.dir);
  }
  return q;
}

// Helpers de fecha (compartidos)
function hoy() { return new Date().toISOString().slice(0, 10); }
function fmtFecha(f) {
  var DS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  var MS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  var d = new Date(f + 'T12:00:00');
  return DS[d.getDay()] + ' ' + d.getDate() + ' de ' + MS[d.getMonth()];
}
function newBarcode() {
  return 'BF' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}
function getPerfil(uid) {
  return db.collection('empleados').doc(uid).get().then(function(s) {
    return s.exists ? s.data() : null;
  });
}

// Exponer para uso global
window._auth = auth;
window._db = db;
window._signIn = function(a, e, p) { return auth.signInWithEmailAndPassword(e, p); };
window._fbReady = true;
console.log('[BuenFruto] Firebase compat listo');
