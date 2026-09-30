# 📱 QueueLess — NEXA Bank Digital Queue Management System

> **Tagline:** Smart Branch Ticketing, QR Fast Entry & Real-time Counter Synchronization.  
> **Production Live Web:** [https://queue.wisnutri.my.id](https://queue.wisnutri.my.id)  
> **Portfolio Showcase:** [https://www.wisnutri.my.id](https://www.wisnutri.my.id)

Aplikasi antrean perbankan cross-platform (Mobile & Web) modern untuk **NEXA Bank (QueueLess)** yang dibangun menggunakan **React Native**, **Expo SDK 54**, **TypeScript**, **Expo Router**, dan **Supabase Realtime Database**. 

QueueLess dirancang untuk mentransformasi pengalaman nasabah di kantor cabang perbankan dari antrean fisik konvensional menjadi sistem antrean digital nirsentuh berbasis QR Code dan pelacakan tiket realtime.

---

## 🌟 Fitur Utama

### 1. Customer Ticket Portal
* **QR Camera Scanner & Dynamic Routing:** Nasabah memindai QR Code cabang (contoh: Cabang Depok, Sudirman, Bogor) untuk langsung membuka portal pengambilan tiket sesuai cabang spesifik (`/branch/[branchId]`).
* **Instant Ticket Generation:** Pengambilan nomor antrean untuk berbagai kategori layanan (Customer Service, Teller, Pembukaan Rekening, Layanan Prioritas).
* **Live Status Stepper:** Pelacakan progres status tiket secara realtime (`waiting` ➔ `called` ➔ `in_service` ➔ `completed`) tanpa perlu refresh halaman.
* **Counter Call Notification:** Alert interaktif saat nomor antrean dipanggil menuju loket counter tertentu.
* **Riwayat Tiket (History):** Dokumentasi riwayat nomor antrean dan status penyelesaian transaksi nasabah.

### 2. Staff & Counter Operator Console
* **Teller Operational Command:** Kontrol antrean loket dengan aksi instan:
  * **Call Next:** Memanggil nomor antrean berikutnya dari antrean aktif.
  * **Start Service:** Mengubah status nasabah ke tahap pelayanan aktif dengan penghitung durasi.
  * **Complete Service:** Menyelesaikan transaksi tiket dan memperbarui riwayat.
  * **Recall Ticket:** Memanggil ulang nomor nasabah jika belum merapat ke loket.
* **Counter Switcher:** Fleksibilitas memilih dan bertukar nomor loket operasional (Counter 01, Counter 02, Counter 03, dll).
* **Branch QR Display & Generator:** Menampilkan QR Code resmi kantor cabang dengan parameter branch ID dinamis untuk dicetak atau ditampilkan pada display monitor lobby.

### 3. Realtime Engine & Cloud Infrastructure
* **Supabase Realtime Channels:** Sinkronisasi instan dua arah antara aksi staff di loket dengan layar tiket nasabah melalui WebSocket Supabase.
* **Multi-Branch Context Resolution:** Dukungan operasional multi-cabang (Kantor Cabang Depok Margonda, Jakarta Sudirman, Bogor Pajajaran) dengan isolasi antrean masing-masing cabang.
* **Production Custom Domain:** Terhubung penuh dengan custom production domain [queue.wisnutri.my.id](https://queue.wisnutri.my.id).

---

## 🛠️ Tech Stack

* **Mobile & Web Framework:** [React Native](https://reactnative.dev/) + [Expo SDK 54](https://docs.expo.dev/)
* **Routing & Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based nested layout routes)
* **Language:** TypeScript (Strict type-checking)
* **Backend Database & Realtime:** [Supabase](https://supabase.com/) (PostgreSQL Database + Realtime WebSockets)
* **QR & Camera:** `expo-camera` (Cross-platform barcode & QR scanning)
* **Safe Area & UI Components:** `react-native-safe-area-context`
* **Icons:** Lucide Icons & `@expo/vector-icons`
* **Web Bundler & Production Hosting:** Expo Web / Metro Bundler + Vercel Production

---

## 📁 Struktur Project

```text
Quequeless/
├── app/
│   ├── (auth)/                  # Autentikasi staff perbankan
│   │   ├── _layout.tsx
│   │   └── login.tsx            # Form login teller & supervisor
│   ├── (customer)/              # Modul nasabah (Customer Experience)
│   │   ├── _layout.tsx          # Tab bar customer
│   │   ├── home.tsx             # Halaman beranda tiket & scan shortcut
│   │   ├── queue.tsx            # Live ticket tracker & stepper
│   │   ├── history.tsx          # Riwayat transaksi tiket
│   │   └── profile.tsx          # Profil nasabah & pengaturan
│   ├── (staff)/                 # Modul staf teller / counter operator
│   │   ├── _layout.tsx          # Tab bar staf
│   │   ├── home.tsx             # Ringkasan statistik antrean cabang
│   │   ├── queue.tsx            # Konsol kontrol teller (Call/Start/Done)
│   │   ├── branch-qr.tsx        # Tampilan QR Code cabang
│   │   ├── history.tsx          # Riwayat pemanggilan loket
│   │   └── profile.tsx          # Profil staf & ganti loket
│   ├── branch/
│   │   └── [branchId].tsx       # Dynamic route check-in cabang via QR
│   ├── _layout.tsx              # Root layout & Stack navigator
│   ├── index.tsx                # Entry routing gateway
│   └── scan.tsx                 # Full-screen QR scanner camera
├── assets/                      # App icons, splash, & favicons
├── components/                  # Reusable UI Components
│   ├── Button.tsx               # Button standar NEXA Bank
│   ├── Screen.tsx               # SafeArea wrapper container
│   └── StatusBadge.tsx          # Badge status tiket antrean dinamis
├── constants/
│   ├── branchQr.ts              # Konfigurasi URL QR production
│   ├── colors.ts                # NEXA Bank design palette
│   └── mockData.ts              # Data fallback operasional
├── lib/
│   └── supabase.ts              # Inisialisasi Supabase client & realtime
├── services/
│   └── queueService.ts          # Layanan manipulasi antrean & RPC
├── supabase/
│   └── schema.sql               # Skema PostgreSQL, tabel, & RLS policies
├── types/
│   └── index.ts                 # Definisi tipe data & interfaces
├── app.json                     # Expo manifest & native app config
├── eas.json                     # Konfigurasi EAS build cloud
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript compiler options
├── vercel.json                  # Konfigurasi rewrite SPA web deployment
├── .env.example                 # Panduan variabel lingkungan
├── .gitignore                   # Aturan pengabaian file git & keamanan
└── README.md
```

---

## 🗄️ Database Architecture (PostgreSQL / Supabase)

Sistem menggunakan database relasional dengan tabel inti:

* **`branches`**: Menyimpan daftar kantor cabang (`id`, `name`, `code`, `address`, `qr_slug`).
* **`counters`**: Menyimpan loket pelayanan cabang (`id`, `branch_id`, `counter_number`, `service_type`, `is_active`).
* **`queues`**: Menyimpan tiket antrean aktif (`id`, `ticket_number`, `branch_id`, `counter_id`, `service_type`, `status`, `created_at`, `called_at`).
* **`queue_history`**: Arsip rekam jejak penyelesaian antrean untuk analitik SLA pelayanan perbankan.

---

## ⚙️ Variabel Lingkungan (`.env`)

Salin file template `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi kredensial Supabase dan URL aplikasi Anda:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_APP_URL=https://queue.wisnutri.my.id
```

---

## 🚀 Panduan Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/Wisnutri690/Quequeless.git
cd Quequeless
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Menjalankan di Mode Development

```bash
# Menjalankan Expo development server (Expo Go / Simulator)
npx expo start

# Menjalankan langsung di browser (Web Mode)
npx expo start --web
```

### 4. Pengecekan Type-safety & Linter

```bash
npx tsc --noEmit
```

---

## 🔒 Keamanan & Praktik Bersih Git

Project ini mematuhi standar keamanan ketat:
* Seluruh kredensial sensitif, file environment (`.env*`), log, dan file cache diabaikan oleh `.gitignore`.
* Konfigurasi internal AI / agent (`AGENTS.md`, `.gemini/`, `.claude/`, dll.) dan folder IDE (`.vscode/`, `.idea/`) tidak dimasukkan ke dalam repositori publik.

---

## 👤 Author

**Wisnu Triandika**  
* *Portfolio:* [https://www.wisnutri.my.id](https://www.wisnutri.my.id)  
* *GitHub:* [@Wisnutri690](https://github.com/Wisnutri690)  
* *LinkedIn:* [Wisnu Triandika](https://www.linkedin.com/in/wisnutri-andika)
