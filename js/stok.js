
// Mengambil elemen daftar buku
const daftarBuku = document.getElementById("daftarBuku");

// Fungsi untuk menampilkan katalog buku
function tampilkanBuku() {
    daftarBuku.innerHTML = "";

    dataKatalogBuku.forEach(function(buku) {

        // Membuat elemen kartu buku
        const kartu = document.createElement("div");
        kartu.className = "buku-card";

        // Membuat gambar buku
        const gambar = document.createElement("img");
        gambar.src = buku.cover;
        gambar.alt = buku.namaBarang;

        // Membuat judul buku
        const judul = document.createElement("h3");
        judul.textContent = buku.namaBarang;

        // Membuat informasi buku
        const kode = document.createElement("p");
        kode.textContent = "Kode: " + buku.kodeBarang;

        const jenis = document.createElement("p");
        jenis.textContent = "Jenis: " + buku.jenisBarang;

        const edisi = document.createElement("p");
        edisi.textContent = "Edisi: " + buku.edisi;

        const stok = document.createElement("p");
        stok.textContent = "Stok: " + buku.stok;

        const harga = document.createElement("p");
        harga.className = "harga-buku";
        harga.textContent = buku.harga;

        // Memasukkan semua elemen ke kartu
        kartu.appendChild(gambar);
        kartu.appendChild(judul);
        kartu.appendChild(kode);
        kartu.appendChild(jenis);
        kartu.appendChild(edisi);
        kartu.appendChild(stok);
        kartu.appendChild(harga);

        // Memasukkan kartu ke halaman
        daftarBuku.appendChild(kartu);
    });
}

// Menampilkan buku ketika halaman dibuka
tampilkanBuku();

// Proses menambahkan buku baru
const formStok = document.getElementById("formStok");

formStok.addEventListener("submit", function(event) {
    event.preventDefault();

    // Mengambil nilai dari form
    const kode = document.getElementById("kodeBarang").value.trim();
    const nama = document.getElementById("namaBarang").value.trim();
    const jenis = document.getElementById("jenisBarang").value.trim();
    const edisi = document.getElementById("edisi").value;
    const jumlahStok = document.getElementById("stok").value;
    const harga = document.getElementById("harga").value.trim();
    const cover = document.getElementById("cover").value.trim();

    // Memeriksa kode barang agar tidak sama
    const kodeSudahAda = dataKatalogBuku.some(function(buku) {
        return buku.kodeBarang.toLowerCase() === kode.toLowerCase();
    });

    if (kodeSudahAda) {
        alert("Kode barang sudah digunakan!");
        return;
    }

    // Membuat objek buku baru
    const bukuBaru = {
        kodeBarang: kode,
        namaBarang: nama,
        jenisBarang: jenis,
        edisi: edisi,
        stok: Number(jumlahStok),
        harga: harga,
        cover: cover
    };

    // Menambahkan buku ke dalam array
    dataKatalogBuku.push(bukuBaru);

    // Memperbarui tampilan katalog
    tampilkanBuku();

    // Mengosongkan form
    formStok.reset();

    alert("Buku berhasil ditambahkan!");
});
