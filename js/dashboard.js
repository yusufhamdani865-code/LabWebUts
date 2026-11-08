
// Mengambil nama pengguna dari localStorage
const namaPengguna = localStorage.getItem("namaPengguna");

// Menampilkan nama pengguna
const namaNavbar = document.getElementById("namaNavbar");

if (namaPengguna) {
    namaNavbar.textContent = namaPengguna;
} else {
    window.location.href = "login.html";
}

// Menampilkan sapaan berdasarkan waktu
const jam = new Date().getHours();
const sapaan = document.getElementById("sapaan");

let ucapan;

if (jam >= 4 && jam < 11) {
    ucapan = "Selamat Pagi";
} else if (jam >= 11 && jam < 15) {
    ucapan = "Selamat Siang";
} else if (jam >= 15 && jam < 18) {
    ucapan = "Selamat Sore";
} else {
    ucapan = "Selamat Malam";
}

sapaan.textContent = ucapan + ", " + namaPengguna + "!";

// Fungsi Logout
document.getElementById("btnLogout").addEventListener("click", function() {
    localStorage.removeItem("namaPengguna");
    localStorage.removeItem("rolePengguna");

    window.location.href = "login.html";
});


// Mengambil data riwayat pesanan dari localStorage
const riwayatPesanan = JSON.parse(
    localStorage.getItem("riwayatPesanan")
) || [];

// Mengambil elemen laporan dan history
const daftarLaporan = document.getElementById("daftarLaporan");
const daftarHistory = document.getElementById("daftarHistory");

// Menampilkan laporan pemesanan
function tampilkanLaporan() {
    if (riwayatPesanan.length === 0) {
        daftarLaporan.innerHTML = "<p>Belum ada data pemesanan.</p>";
        return;
    }

    let tabel = `
        <table>
            <thead>
                <tr>
                    <th>Nomor Pesanan</th>
                    <th>Nama Pemesan</th>
                    <th>Total Pembayaran</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    riwayatPesanan.forEach(function(pesanan) {
        tabel += `
            <tr>
                <td>${pesanan.idPesanan}</td>
                <td>${pesanan.namaPembeli}</td>
                <td>${pesanan.totalHarga}</td>
                <td>${pesanan.status}</td>
            </tr>
        `;
    });

    tabel += `
            </tbody>
        </table>
    `;

    daftarLaporan.innerHTML = tabel;
}

// Menampilkan history transaksi
function tampilkanHistory() {
    if (riwayatPesanan.length === 0) {
        daftarHistory.innerHTML = "<p>Belum ada riwayat transaksi.</p>";
        return;
    }

    let tabel = `
        <table>
            <thead>
                <tr>
                    <th>Nomor Transaksi</th>
                    <th>Nama Pembeli</th>
                    <th>Metode Pembayaran</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    riwayatPesanan.forEach(function(pesanan) {
        tabel += `
            <tr>
                <td>${pesanan.idPesanan}</td>
                <td>${pesanan.namaPembeli}</td>
                <td>${pesanan.metodePembayaran}</td>
                <td>${pesanan.totalHarga}</td>
            </tr>
        `;
    });

    tabel += `
            </tbody>
        </table>
    `;

    daftarHistory.innerHTML = tabel;
}

// Menjalankan kedua fungsi
tampilkanLaporan();
tampilkanHistory();
