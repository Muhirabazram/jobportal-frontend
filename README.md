# 🚀 JobPortal Indonesia - Frontend

[![Website Status](https://img.shields.io/badge/Website-Live-brightgreen?style=for-the-badge)](https://jobportal-indonesia.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-blue?style=for-the-badge)](https://github.com/Muhirabazram/jobportal-frontend)
[![Backend Repo](https://img.shields.io/badge/Backend-Repository-orange?style=for-the-badge)](https://github.com/Muhirabazram/jobportal-backend)

Selamat datang di repositori **Frontend JobPortal Indonesia**! Ini adalah antarmuka web modern, responsif, dan interaktif untuk platform pencarian kerja (Job Seeker) dan manajemen lowongan pekerjaan bagi pihak HRD. Seluruh sistem—mulai dari basis data, backend API, hingga frontend ini—telah dideploy secara penuh dan dapat diakses secara publik.

---

## 📌 Deskripsi Proyek

**JobPortal Indonesia** adalah platform pencarian kerja yang dirancang untuk menghubungkan para pencari kerja (Job Seekers) dengan perusahaan penyedia lowongan kerja (Employers/HRD). Aplikasi ini menyediakan pengalaman yang mulus bagi pengguna untuk mencari pekerjaan sesuai keahlian, melamar secara online, melacak status lamaran secara real-time, serta memudahkan HRD untuk mengelola lowongan pekerjaan dan memproses dokumen pelamar.

* **🌐 Tautan Aplikasi Utama (Live):** [https://jobportal-indonesia.vercel.app/](https://jobportal-indonesia.vercel.app/)
* **💻 Repositori Frontend:** [Muhirabazram/jobportal-frontend](https://github.com/Muhirabazram/jobportal-frontend)
* **⚙️ Repositori Backend:** [Muhirabazram/jobportal-backend](https://github.com/Muhirabazram/jobportal-backend)

---

## 🛠️ Fitur Utama

Aplikasi ini memiliki dua peran pengguna utama dengan fitur lengkap masing-masing:

### 👤 1. Fitur Pencari Kerja (Job Seeker)
* **Beranda & Pencarian Lowongan**: Mencari pekerjaan berdasarkan kata kunci, lokasi, kategori, dan jenis pekerjaan.
* **Detail Lowongan**: Informasi lengkap mengenai deskripsi pekerjaan, kualifikasi, estimasi gaji, dan profil perusahaan.
* **Dashboard Pelamar**: Visualisasi statistik status lamaran secara real-time (Terkirim, Menunggu Review, Wawancara, Diterima, Ditolak).
* **Manajemen Lamaran**:
  * Mengirim lamaran dengan melampirkan berkas CV/Resume.
  * Memantau tahapan seleksi secara terperinci untuk masing-masing lamaran.
  * Menyimpan lowongan kerja untuk dilamar di kemudian hari (*Bookmark*).
* **Pengaturan Profil**: Mengelola informasi pribadi, mengunggah foto profil, mengunggah CV/Resume terbaru, menentukan daftar keahlian, dan memperbarui riwayat pendidikan.

### 🏢 2. Fitur HRD / Perusahaan (Recruiter)
* **Dashboard HRD**: Ringkasan data statistik jumlah lowongan aktif yang dikelola dan total pelamar yang masuk.
* **Manajemen Lowongan**:
  * Membuat dan mempublikasikan lowongan pekerjaan baru (*Buka Lowongan*).
  * Mengedit informasi atau menghapus lowongan pekerjaan yang telah dipublikasikan.
* **Seleksi Pelamar**:
  * Melihat daftar pelamar untuk setiap lowongan yang dibuka.
  * Melakukan review dokumen CV/Resume pelamar melalui modal preview interaktif.
  * Mengubah status tahapan lamaran secara real-time (Melanjutkan ke tahap *Wawancara*, *Menerima* lamaran, atau *Menolak* lamaran).
* **Profil Perusahaan**: Memperbarui informasi detail perusahaan seperti deskripsi, lokasi, industri, dan logo perusahaan.

---

## 💻 Teknologi yang Digunakan

Aplikasi frontend ini dibangun menggunakan teknologi modern untuk menjamin performa, skalabilitas, dan kemudahan pemeliharaan kode:

* **React 19** – Library JavaScript utama untuk membangun antarmuka pengguna berbasis komponen (*component-based*).
* **Vite** – Build tool super cepat untuk pengembangan aplikasi web modern dengan HMR (*Hot Module Replacement*).
* **Tailwind CSS v4** – Framework CSS utility-first untuk desain UI yang modern, responsif, dan konsisten.
* **React Router DOM v7** – Library routing untuk navigasi halaman yang mulus khas *Single Page Application* (SPA).
* **Axios** – HTTP client untuk melakukan komunikasi data dengan Backend API melalui RESTful endpoints.
* **Lucide React** – Kumpulan ikon modern, clean, dan minimalis.

---

## 📁 Struktur Folder Proyek

Berikut adalah struktur folder utama dari repositori frontend ini untuk mempermudah navigasi kode:

```text
jobportal-frontend/
├── public/                 # Aset statis publik
├── src/
│   ├── assets/             # Gambar, ilustrasi, dan aset visual lainnya
│   ├── komponen/           # Komponen UI reusable (Footer, Navigasi, Modal, dll)
│   │   ├── Footer.jsx
│   │   ├── ModalAlert.jsx
│   │   ├── ModalPreviewLamaran.jsx
│   │   └── Navigasi.jsx
│   ├── halaman/            # Halaman-halaman utama aplikasi (Pages)
│   │   ├── Beranda.jsx
│   │   ├── CariKerja.jsx
│   │   ├── Login.jsx
│   │   ├── Daftar.jsx
│   │   ├── DashboardPencari.jsx
│   │   ├── DashboardHRD.jsx
│   │   ├── BukaLowongan.jsx
│   │   ├── KelolaLowongan.jsx
│   │   ├── DataPelamar.jsx
│   │   └── ... (halaman pelacakan lamaran & pengaturan lainnya)
│   ├── utils/              # Konfigurasi utilitas (Axios interceptor, dll)
│   │   └── axios.js
│   ├── App.jsx             # Pengaturan routing utama aplikasi
│   ├── index.css           # Integrasi Tailwind CSS dan stylesheet global
│   └── main.jsx            # Entry point React
├── vercel.json             # Konfigurasi deployment untuk Vercel SPA Routing
├── vite.config.js          # Konfigurasi Vite & Tailwind CSS v4
└── package.json            # Informasi proyek, skrip, dan dependencies
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk memasang dan menjalankan proyek ini di lingkungan lokal Anda:

### 📋 Prasyarat
Sebelum memulai, pastikan komputer Anda telah terinstal:
* [Node.js](https://nodejs.org/) (versi 18 ke atas sangat direkomendasikan)
* [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)

### 🛠️ Langkah-Langkah Instalasi

1. **Clone Repositori**
   ```bash
   git clone https://github.com/Muhirabazram/jobportal-frontend.git
   cd jobportal-frontend
   ```

2. **Instalasi Dependencies**
   Instal semua library pendukung proyek dengan menjalankan perintah:
   ```bash
   npm install
   ```

3. **Menjalankan Server Pengembangan**
   Jalankan aplikasi dalam mode pengembangan lokal:
   ```bash
   npm run dev
   ```
   Setelah berhasil dijalankan, silakan buka browser Anda dan akses tautan lokal yang muncul pada terminal Anda (biasanya `http://localhost:5173`).

4. **Build untuk Produksi**
   Untuk melakukan kompilasi proyek sebelum di-deploy ke server produksi:
   ```bash
   npm run build
   ```
   Hasil build yang teroptimasi secara otomatis akan disimpan di dalam folder `dist/`.

---

## 🔗 Integrasi dan Informasi Hubungan Sistem

* **Backend API**: Frontend ini secara default terhubung ke Backend API yang dideploy di Render dengan alamat endpoint: `https://jobportal-api-zebb.onrender.com/api` (Pengaturan ini dapat disesuaikan pada file `src/utils/axios.js`).
* **Hubungan Repositori**:
  * Untuk memahami logika server, skema database, autentikasi berbasis JWT, serta endpoint API yang digunakan oleh aplikasi ini, silakan kunjungi [Repositori Backend](https://github.com/Muhirabazram/jobportal-backend).

---

## ✍️ Penulis & Kontributor

Proyek ini dikembangkan oleh **Muhirabazram** sebagai bagian dari pemenuhan tugas praktikum kuliah Full Stack Semester 4 (Pak Rena). Terima kasih yang sebesar-besarnya atas bimbingan dan dukungan yang diberikan selama pengembangan proyek ini.

Jika Anda memiliki pertanyaan, saran, atau ingin berkolaborasi terkait proyek ini, silakan hubungi melalui akun GitHub resmi penulis.

---
*Dibuat dengan penuh dedikasi untuk mendukung ekosistem pencarian kerja digital yang lebih baik di Indonesia.*
