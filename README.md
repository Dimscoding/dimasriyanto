# Portfolio Dimas Riyanto

Website portofolio personal untuk graphic designer dengan fokus pada desain percetakan, visual digital, dan creative workflow berbasis AI. Project ini sudah menggunakan Next.js standar dan siap disimpan di GitHub lalu di-deploy melalui Vercel.

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

Untuk mengganti gambar folder proyek, masukkan file baru ke `public/assets/`, lalu ubah alamat gambar pada `app/page.tsx`.

## Catatan form kontak

Form kontak saat ini adalah preview interaktif dan belum mengirim pesan ke email atau WhatsApp. Setelah alamat kontak publik ditentukan, form dapat dihubungkan ke email service, Formspree, Resend, atau diarahkan ke WhatsApp.

## Build production

```bash
npm run build
npm start
```
