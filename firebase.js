// ════ BUEN FRUTO — Firebase Config ════
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc,
  collection, query, where, orderBy, onSnapshot, getDocs, writeBatch,
  serverTimestamp, Timestamp }
  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDFOypq8OfX1QmZpoZAdsXmqKYauswBjes",
  authDomain: "buen-fruto.firebaseapp.com",
  projectId: "buen-fruto",
  storageBucket: "buen-fruto.appspot.com",
  messagingSenderId: "931992831636",
  appId: "1:931992831636:web:65ee6652748f6418dc9681"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Helpers de fecha ──
function hoy() { return new Date().toISOString().slice(0, 10); }
function fmtFecha(f) {
  const DS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const MS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = new Date(f + 'T12:00:00');
  return DS[d.getDay()] + ' ' + d.getDate() + ' de ' + MS[d.getMonth()];
}

// ── Generar barcode único ──
function newBarcode() {
  return 'BF-' + Date.now().toString(36).toUpperCase() + '-' +
    Math.random().toString(36).slice(2, 6).toUpperCase();
}

// ── Obtener perfil del usuario actual ──
async function getPerfil(uid) {
  const snap = await getDoc(doc(db, 'empleados', uid));
  return snap.exists() ? snap.data() : null;
}

export {
  auth, db,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc,
  collection, query, where, orderBy, onSnapshot, getDocs, writeBatch,
  serverTimestamp, Timestamp,
  hoy, fmtFecha, newBarcode, getPerfil
};
