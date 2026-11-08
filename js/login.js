
// Mengambil elemen form login
const formLogin = document.getElementById("formLogin");

// Proses login
formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Mencari pengguna berdasarkan email dan password
    const pengguna = dataPengguna.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (pengguna) {
        alert("Login berhasil! Selamat datang, " + pengguna.nama);

        // Menyimpan informasi pengguna
        localStorage.setItem("namaPengguna", pengguna.nama);
        localStorage.setItem("rolePengguna", pengguna.role);

        // Berpindah ke halaman dashboard
        window.location.href = "dashboard.html";
    } else {
        alert("email/password yang anda masukkan salah");
    }
});

// Mengambil elemen modal
const modalLupa = document.getElementById("modalLupa");
const modalDaftar = document.getElementById("modalDaftar");

// Membuka modal lupa password
document.getElementById("lupaPassword").addEventListener("click", function(event) {
    event.preventDefault();
    modalLupa.style.display = "flex";
});

// Membuka modal daftar
document.getElementById("daftarAkun").addEventListener("click", function(event) {
    event.preventDefault();
    modalDaftar.style.display = "flex";
});

// Menutup modal
document.getElementById("tutupLupa").addEventListener("click", function() {
    modalLupa.style.display = "none";
});

document.getElementById("tutupDaftar").addEventListener("click", function() {
    modalDaftar.style.display = "none";
});

// Menutup modal jika pengguna mengeklik area luar modal
window.addEventListener("click", function(event) {
    if (event.target === modalLupa) {
        modalLupa.style.display = "none";
    }

    if (event.target === modalDaftar) {
        modalDaftar.style.display = "none";
    }
});
