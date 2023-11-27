## Apa itu BaTaGOR?
BaTaGOR (Bantuan Tag GOR) adalah perangkat lunak berbasis web-app yang dapat digunakan untuk menyewa dan mengelola lapangan futsal. Fleksibilitas metode pemesanan dan kemudahan pengelolaan lapangan menjadi titik fokus pengembangan perangkat lunak BaTaGOR. Dengan bantuan BaTaGOR, penyewa lapangan futsal dapat menyewa lapangan futsal dari jarak jauh dan dari waktu yang lama. Pemilik lapangan futsal dapat menambah, menghapus, dan mengelola data lapangan futsalnya dengan mudah pada satu perangkat lunak terpusat.


## Cara menjalankan BaTaGOR 
Untuk sekarang, BaTaGOR belum di-deploy ke sebuah pusat hosting. Oleh karena itu, BaTaGOR hanya dapat dijalankan secara lokal di perangkat masing-masing pengguna

### Setup
#### 1. Initiate web-app batagor di terminal perangkat yang digunakan
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```
#### 2. Buka localhost:3000
Buka [http://localhost:3000](http://localhost:3000) pada browse manapun untuk menampilkan web-app BaTaGOR

### Jika anda seorang pelanggan
#### 3. Daftarkan sebuah akun pengguna yang baru
Anda dapat melewati langkah ini bila sudah memiliki akun pengguna
Pencet tombol "REGISTER" untuk masuk ke halaman registrasi
Kemudian, masukkan data pengguna sesuai dengan keinginan pengguna ke dalam registration form
Pastikan data yang dimasukkan sesuai dengan syarat masing-masing kategori data

#### 4. Sign In
Pencet tombol "SIGN IN" di kanan atas bila Anda belum masuk ke dalam akun Anda.
Masukkan kredensial akun pengguna Anda, sesuai dengan data yang didaftarkan saat melakukan registrasi akun pengguna baru
Bila sign in sukses, Anda akan diarahkan kembali ke halaman utama untuk 

### 5. Lakukan pencarian lapagan dan pilih sebuah lapangan


## Daftar Use Case yang Diimplementasikan

Berikut merupakan use case dan NIM yang berangkutan

- Menyunting Lapangan
- Menghapus Lapangan
- Menambah Lapangan
- Melihat Informasi Lapangan (pengguna dan pemilik)
- Melakukan Registrasi akun baru
- Log in atau Sign in
- Memesan Lapangan
- Mengubah Detail Pemesanan Lapangan
- Melihat Riwayat Pemesanan Akun
- Melihat Riwayat Pemesanan Lapangan (Karyawan)

## Basis Data, Tabel, dan Atribut
