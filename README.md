# Portfolio Dimas Riyanto

Website portofolio personal untuk graphic designer dengan fokus pada desain percetakan, visual digital, dan creative workflow berbasis AI. Project ini sudah menggunakan Next.js standar dan siap disimpan di GitHub lalu di-deploy melalui Vercel.

Versi terbaru mencakup opening animation 3D sekitar 8 detik dengan tombol skip, kartu transparan dan organic glow, elemen blur-gradient yang bergerak saat setiap bagian memasuki layar, hero dengan foto profil di kartu Creative ID, indikator persentase scroll, preview CV, custom cursor, serta galeri karya dan dokumentasi yang responsif di desktop maupun handphone.

Tipografi memakai Times New Roman untuk heading editorial, Metropolis Bold untuk teks utama, dan Geist Pixel Variable untuk navigasi, label, angka, serta aksen digital. File Metropolis dan Geist Pixel tersimpan di folder `public/fonts/` agar tampil konsisten di semua perangkat.

## Menjalankan di komputer

Pastikan Node.js versi 20.9 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Upload ke GitHub

1. Ekstrak file ZIP ini.
2. Buat repository baru di GitHub.
3. Pilih **Add file → Upload files**.
4. Upload seluruh isi folder hasil ekstrak—bukan file ZIP-nya.
5. Klik **Commit changes**.

Alternatif melalui Git:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin URL_REPOSITORY_GITHUB
git push -u origin main
```

## Deploy ke Vercel

1. Masuk ke Vercel dengan akun GitHub.
2. Pilih **Add New → Project**.
3. Import repository portfolio ini.
4. Pastikan framework yang terdeteksi adalah **Next.js**.
5. Klik **Deploy**.

Setelah terhubung, setiap perubahan yang di-push ke branch `main` akan otomatis dibuatkan versi terbaru oleh Vercel.

## Bagian yang biasa diedit

- `app/page.tsx` — teks, daftar layanan, proyek, menu, dan interaksi.
- `app/globals.css` — warna, layout, font, motion, dan tampilan mobile.
- `app/layout.tsx` — judul serta deskripsi website untuk browser dan mesin pencari.
- `public/assets/` — gambar proyek dan aset visual lainnya.
- `public/fonts/` — file Metropolis Bold dan Geist Pixel Variable.

Untuk mengganti gambar folder proyek, masukkan file baru ke `public/assets/`, lalu ubah alamat gambar pada `app/page.tsx`.

## Galeri karya dan dokumentasi

- `public/assets/galleries/print/` - karya Print & Production.
- `public/assets/galleries/brand/` - karya Brand & Social.
- `public/assets/galleries/ai/` - karya AI Exploration.
- `public/assets/galleries/journey/` - dokumentasi Digital Content Writer, BNN Kota Mataram, dan UIN Mataram.

Semua gambar galeri sudah diubah ke WebP dan dioptimalkan agar tetap tajam tanpa membuat halaman terlalu berat.
Kotak Education pada bagian About membuka dokumentasi UIN Mataram, menampilkan judul skripsi Dimas, dan menyediakan tombol menuju repository e-theses UIN Mataram.

## Form kontak WhatsApp

Form kontak langsung membuka chat WhatsApp Dimas dengan nama, email, dan isi pesan yang sudah tersusun otomatis. Fitur ini tidak memerlukan Environment Variables atau konfigurasi Supabase.

## Build production

```bash
npm run build
npm start
```
