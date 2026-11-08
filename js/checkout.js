
// Mengambil elemen HTML
const daftarPesanan = document.getElementById("daftarPesanan");
const tombolTambah = document.getElementById("tambahBuku");
const totalHarga = document.getElementById("totalHarga");
const formCheckout = document.getElementById("formCheckout");

// Menyimpan daftar buku yang dipesan
let pesanan = [];

// Mengubah harga menjadi angka
function ubahHarga(harga) {
    return Number(harga.replace("Rp ", "").replace(/\./g, ""));
}

// Menampilkan daftar pesanan
function tampilkanPesanan() {
    daftarPesanan.innerHTML = "";

    pesanan.forEach(function(item, index) {
        const baris = document.createElement("div");

        const nama = document.createElement("p");
        nama.textContent = item.namaBarang + " - " + item.harga;

        const jumlah = document.createElement("input");
        jumlah.type = "number";
        jumlah.min = "1";
        jumlah.value = item.jumlah;

        jumlah.addEventListener("change", function() {
            item.jumlah = Math.max(1, Number(jumlah.value) || 1);
            tampilkanPesanan();
        });

        const hapus = document.createElement("button");
        hapus.type = "button";
        hapus.textContent = "Hapus";

        hapus.addEventListener("click", function() {
            pesanan.splice(index, 1);
            tampilkanPesanan();
        });

        baris.appendChild(nama);
        baris.appendChild(jumlah);
        baris.appendChild(hapus);

        daftarPesanan.appendChild(baris);
    });

    hitungTotal();
}

// Menghitung total harga pesanan
function hitungTotal() {
    let total = 0;

    pesanan.forEach(function(item) {
        total += ubahHarga(item.harga) * item.jumlah;
    });

    totalHarga.textContent = "Total: Rp " +
        total.toLocaleString("id-ID");
}

// Menambahkan buku ke pesanan
tombolTambah.addEventListener("click", function() {
    const pilihan = prompt(
        "Masukkan kode buku:\n" +
        dataKatalogBuku.map(function(buku) {
            return buku.kodeBarang + " - " + buku.namaBarang;
        }).join("\n")
    );

    if (pilihan === null || pilihan.trim() === "") {
        return;
    }

    const bukuDipilih = dataKatalogBuku.find(function(buku) {
        return buku.kodeBarang.toLowerCase() === pilihan.trim().toLowerCase();
    });

    if (!bukuDipilih) {
        alert("Kode buku tidak ditemukan!");
        return;
    }

    const sudahAda = pesanan.find(function(item) {
        return item.kodeBarang === bukuDipilih.kodeBarang;
    });

    if (sudahAda) {
        sudahAda.jumlah++;
    } else {
        pesanan.push({
            ...bukuDipilih,
            jumlah: 1
        });
    }

    tampilkanPesanan();
});

// Memproses checkout
formCheckout.addEventListener("submit", function(event) {
    event.preventDefault();

    if (pesanan.length === 0) {
        alert("Silakan tambahkan buku terlebih dahulu!");
        return;
    }

    const nama = document.getElementById("namaPembeli").value;
    const email = document.getElementById("emailPembeli").value;
    const alamat = document.getElementById("alamatPembeli").value;
    const telepon = document.getElementById("teleponPembeli").value;
    const pembayaran = document.getElementById("metodePembayaran").value;

  
    // Membuat data pesanan
    const dataPesananBaru = {
        idPesanan: Date.now(),
        namaPembeli: nama,
        emailPembeli: email,
        alamatPembeli: alamat,
        teleponPembeli: telepon,
        metodePembayaran: pembayaran,
        totalHarga: totalHarga.textContent,
        detailPesanan: pesanan.map(function(item) {
            return {
                ...item
            };
        }),
        status: "Menunggu"
    };

    // Mengambil riwayat pesanan sebelumnya
    let riwayatPesanan = JSON.parse(
        localStorage.getItem("riwayatPesanan")
    ) || [];

    // Menambahkan pesanan baru
    riwayatPesanan.push(dataPesananBaru);

    // Menyimpan data ke localStorage
    localStorage.setItem(
        "riwayatPesanan",
        JSON.stringify(riwayatPesanan)
    );

    alert(
        "Pesanan berhasil dibuat!\n\n" +
        "Nomor Pesanan: " + dataPesananBaru.idPesanan + "\n" +
        "Nama: " + nama + "\n" +
        "Email: " + email + "\n" +
        "Alamat: " + alamat + "\n" +
        "Telepon: " + telepon + "\n" +
        "Pembayaran: " + pembayaran + "\n" +
        totalHarga.textContent
    );

    formCheckout.reset();
    pesanan = [];
    tampilkanPesanan();

    pesanan = [];
    tampilkanPesanan();
});

// Menampilkan total awal
tampilkanPesanan();
