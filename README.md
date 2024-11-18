# Autentikasi Login Google pada Aplikasi Vue dengan Firebase 

## Prasyarat
- Firebase Project
- Google Cloud Console Project
- Client ID Google
- Dependensi:
  - `firebase`
  - `@codetrix-studio/capacitor-google-auth`
  - `pinia`
  - `vue-router`
  - `@ionic/vue`

## Konfigurasi Awal Firebase (`src/utils/firebase.ts`)

### Langkah Konfigurasi
1. Impor library Firebase
2. Definisikan konfigurasi Firebase
3. Inisialisasi Firebase
4. Konfigurasi Google Auth Provider

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    // ... konfigurasi lainnya
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
```

## Implementasi Autentikasi Store (`src/stores/auth.ts`)

### Fitur Utama Store
- Manajemen state pengguna
- Fungsi login Google
- Fungsi logout
- Tracking status autentikasi

### Alur Autentikasi Login Google

#### 1. Inisialisasi Google Auth
```typescript
await GoogleAuth.initialize({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
});
```

#### 2. Proses Login
- Panggil `GoogleAuth.signIn()`
- Dapatkan ID Token
- Buat kredensial menggunakan `GoogleAuthProvider.credential()`
- Autentikasi dengan Firebase melalui `signInWithCredential()`

#### 3. Penanganan Error
- Tampilkan alert menggunakan Ionic AlertController
- Log error ke konsol

#### 4. Logout
- Keluar dari Firebase
- Keluar dari Google Auth
- Reset state pengguna
- Redirect ke halaman login
  
## Tampilan Aplikasi
<img width="209" alt="image" src="https://github.com/user-attachments/assets/fae5d1e8-607b-4d27-aeeb-7ac16403500c">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/eab2138e-ce48-4eee-9cf9-f75c58c36694">

