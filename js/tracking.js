
const daftarTracking = document.getElementById("daftarTracking");
const formTracking = document.getElementById("formTracking");
const inputNomorDO = document.getElementById("nomorDO");

// Mengambil data pesanan dari localStorage
let riwayatPesanan = JSON.parse(
    localStorage.getItem("riwayatPesanan")
) || [];

// Mencari pesanan berdasarkan Nomor DO
formTracking.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomorDO = inputNomorDO.value.trim();

    const pesananDitemukan = riwayatPesanan.find(function(pesanan) {
        return String(pesanan.idPesanan) === nomorDO;
    });

    if (!pesananDitemukan) {
        daftarTracking.innerHTML = `
            <div class="tracking-kosong">
                <h3>Pesanan Tidak Ditemukan</h3>
                <p>Periksa kembali Nomor Delivery Order Anda.</p>
            </div>
        `;
        return;
    }

    tampilkanDetailTracking(pesananDitemukan);
});

// Menampilkan detail pesanan
function tampilkanDetailTracking(pesanan) {
    daftarTracking.innerHTML = `
        <div class="kartu-tracking">

            <h3>Nomor Delivery Order: ${pesanan.idPesanan}</h3>

            <p><strong>Nama Pemesan:</strong>
                ${pesanan.namaPembeli}</p>

            <p><strong>Status Pengiriman:</strong>
                ${pesanan.status}</p>

            <p><strong>Ekspedisi:</strong>
                ${pesanan.ekspedisi || "JNE (Simulasi)"}</p>

            <p><strong>Tanggal Kirim:</strong>
                ${pesanan.tanggalKirim || "Belum ditentukan"}</p>

            <p><strong>Jenis Paket:</strong>
                ${pesanan.jenisPaket || "Reguler (Simulasi)"}</p>

            <p><strong>Total Pembayaran:</strong>
                ${pesanan.totalHarga}</p>

            <div class="status-tracking">
                <h4>Proses Pengiriman</h4>

                <div class="timeline">
                    <div class="timeline-item aktif">
                        <span>1</span>
                        <p>Menunggu</p>
                    </div>

                    <div class="timeline-item">
                        <span>2</span>
                        <p>Diproses</p>
                    </div>

                    <div class="timeline-item">
                        <span>3</span>
                        <p>Dikirim</p>
                    </div>

                    <div class="timeline-item">
                        <span>4</span>
                        <p>Selesai</p>
                    </div>
                </div>
            </div>

        </div>
    `;
}
