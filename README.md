## Apa itu BaTaGOR?
BaTaGOR (Bantuan Tag GOR) adalah perangkat lunak berbasis web-app yang dapat digunakan untuk menyewa dan mengelola lapangan futsal. Fleksibilitas metode pemesanan dan kemudahan pengelolaan lapangan menjadi titik fokus pengembangan perangkat lunak BaTaGOR. Dengan bantuan BaTaGOR, penyewa lapangan futsal dapat menyewa lapangan futsal dari jarak jauh dan dari waktu yang lama. Pemilik lapangan futsal dapat menambah, menghapus, dan mengelola data lapangan futsalnya dengan mudah pada satu perangkat lunak terpusat.

## Cara menjalankan BaTaGOR 
Untuk sekarang, BaTaGOR belum di-deploy ke sebuah pusat hosting. Oleh karena itu, BaTaGOR hanya dapat dijalankan secara lokal di perangkat masing-masing pengguna

### Setup
#### 1. Initiate web-app batagor di terminal perangkat yang digunakan
```bash
npm run dev
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
Bila sign in sukses, Anda akan diarahkan kembali ke halaman utama. 

#### 5. Lakukan pencarian lapangan dan pilih sebuah lapangan
Pilih lapangan dengan mengklik kartunya. Jika diinginkan, Anda juga dapat mencari pencarian terlebih dahulu.
Anda akan ditampilkan informasi terkait lapangan.

#### 6. Melakukan Pemesanan
Untuk melakukan pemesanan, klik tombol "BOOK NOW". Anda akan ditampilkan informasi terkait jadwal yang tersedia.
Pilih jadwal dengan memilih tanggal dan waktu yang tersedia, lalu klik "Confirm Booking" untuk mengkonfirmasi pemesanan.
 
### Jika anda seorang karyawan
#### 3. Sign In
Pencet tombol "SIGN IN" di kanan atas bila Anda belum masuk ke dalam akun Anda.
Masukkan kredensial akun pengguna Anda, sesuai dengan data yang didaftarkan saat melakukan registrasi akun pengguna baru
Bila sign in sukses, Anda akan diarahkan kembali ke halaman utama. 

### Jika anda seorang admin
#### 3. Sign In
Pencet tombol "SIGN IN" di kanan atas bila Anda belum masuk ke dalam akun Anda.
Masukkan kredensial akun pengguna Anda. Untuk admin, username yang digunakan adalah "admin", dengan password "admin".
Bila sign in sukses, Anda akan diarahkan kembali ke halaman utama. 

#### 4. Menambahkan Lapangan


#### 5. Mengubah Data dan Menghapus Lapangan
Klik salah satu lapangan untuk melihat informasi lebih detail terkaitnya.
Jika Anda ingin menghapus lapangan, klik gambar tong sampah. 
Sementara itu, jika Anda ingin mengedit lapangan, klik tulisan "Edit". Masukkan data baru ke input field untuk atribut yang hendak diedit - jika ada atribut yang tidak ingin diedit, cukup kosongkan input field.

#### 6. Melihat Pemasukan
Klik tombol "Income" di kanan atas untuk melihat total pemasukan untuk seluruh lapangan yang dimiliki.

## Daftar Use Case yang Diimplementasikan

| Kode Use Case | Judul Use Case                     | NIM dan Nama Penanggung Jawab   | Keterangan | Tangkapan Layar Gambar                                                                            |
|---------------|------------------------------------|---------------------------------|------------|---------------------------------------------------------------------------------------------------|
| -             | Home Logged Out                    | -                               | -          | ![](doc/home_logged_out.png)                                                                      |
| -             | Home Logged In                     | -                               | -          | ![](doc/home_logged_in.png)                                                                       |
| -             | Admin Home                         | -                               | -          | ![](doc/admin_home.png)                                                                           |
| U01           | Menyunting Data Lapangan           | 18221102 Salman Ma'arif Achsien | -          | ![U01](doc/edit_form.png)                                                                         |
| U02           | Menghapus Lapangan                 | 18221102 Salman Ma'arif Achsien | -          | ![U02](doc/admin_delete.png)                                                                      |
| U03           | Menambah Lapangan                  | 18221100 Vincent Franstyo       | -          | ![U03](doc/admin_add_field.png)                                                                   |
| U04, U05      | Melihat Informasi Lapangan         | 18221100 Vincent Franstyo       | Digabung   | ![U04](doc/customer_field_info.png) ![U04](doc/customer_field_info_hover.png)                     |
| U06           | Register                           | 18221148 Kean Nafis Santang     | -          | ![U06](doc/register_empty.png) ![U06](doc/register_failed.png) ![U06](doc/register_incorrect.png) |
| U07           | Login                              | 18221148 Kean Nafis Santang     | -          | ![U07](doc/signin_empty.png) ![U07](doc/signin_failed.png)                                        |
| U08           | Memesan Lapangan                   | 18221108 Farhan Algani Putra    | -          | ![U08]()                                                                                          |
| U09           | Mengubah Detail Pemesanan Lapangan | 18221108 Farhan Algani Putra    | -          | ![U09]()                                                                                          |
| U11           | Melihat Riwayat Pemesanan Akun     | 18221080 Fakhri Putra Mahardika | -          | ![U11](doc/customer_history.png)                                                                  |
| U12           | Melihat Riwayat Pemesanan Lapangan | 18221080 Fakhri Putra Mahardika | -          | ![U12](doc/customer_history.png)                                                                  |
| -             | Melihat Rekapitulasi Penghasilan   | 18221102 Salman Ma'arif Achsien | -          | ![](doc/admin_income.png)                                                                         |

## Basis Data, Tabel, dan Atribut

Basis data yang digunakan dalam implementasi BaTaGOR adalah PostgreSQL yang di-host oleh/di Supabase. Transaksi dengan basis data dilakukan menggunakan Prisma ORM. 

Berikut merupakan tabel-tabel di dalam basis data:

### Nama Tabel: archives
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| history_id         | int4      | PK, NOT NULL     |
| booking_id         | int4      | FK, NOT NULL     |
| field_id           | int4      | FK, NOT NULL     |

### Nama Tabel: booking
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| booking_id         | int4      | PK, NOT NULL     |
| duration_minute    | int4      | NOT NULL         |
| start_time         | time      | NOT NULL         |
| booking_date       | date      | NOT NULL         |
| total_price        | int4      | NOT NULL         |
| user_id            | int4      | FK, NOT NULL     |
| field_id           | int4      | FK, NOT NULL     |

### Nama Tabel: customer
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| user_id            | int4      | PK, FK, NOT NULL |
| domicile           | text      | NOT NULL         |

### Nama Tabel: field
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| field_id           | int4      | PK, NOT NULL     |
| field_name         | text      | NOT NULL         |
| street             | text      | NOT NULL         |
| city               | text      | NOT NULL         |
| province           | text      | NOT NULL         |
| postal_code        | int4      | NOT NULL         |
| image_url          | text      | NOT NULL         |
| rate_per_hour      | int4      | NOT NULL         |
| operational_status | text      | NOT NULL         |
| owner_id           | int4      | FK, NOT NULL     |

### Nama Tabel: manage_booking
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| booking_id         | int4      | FK, PK, NOT NULL |
| staff_id           | int4      | FK, PK, NOT NULL |

### Nama Tabel: owner
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| user_id            | int4      | FK, PK, NOT NULL |

### Nama Tabel: staff
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| field_id           | int4      | FK, PK, NOT NULL |
| user_id            | int4      | FK, PK, NOT NULL |

### Nama Tabel: user
| Atribut            | Tipe Data | Constraint       |
|--------------------|-----------|------------------|
| user_id            | int4      | PK, NOT NULL     |
| username           | text      | UNIQUE, NOT NULL |
| name               | text      | NOT NULL         |
| phone_num          | text      | NOT NULL         |
| email              | text      | NOT NULL         |
| hashed_pass        | text      | NOT NULL         |
| access_level       | text      | NOT NULL         |
