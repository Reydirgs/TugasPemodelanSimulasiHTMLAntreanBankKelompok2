// Array untuk menyimpan data seluruh customer di dalam simulasi
let customers = [];

// Fungsi saat tombol "Tambah Customer" diklik
document.getElementById('btn-tambah').addEventListener('click', function() {
    // Ambil nilai dari input, default ke 0 jika kosong
    const iatInput = parseInt(document.getElementById('iat').value) || 0;
    const layananInput = parseInt(document.getElementById('waktu-layanan').value) || 0;

    if (layananInput <= 0) {
        alert("Waktu layanan harus lebih dari 0!");
        return;
    }

    let newCustomer = {};
    let index = customers.length; // Index 0 berarti customer ke-1
    
    newCustomer.id = index + 1; // Customer ke-
    newCustomer.iat = iatInput;
    newCustomer.layanan = layananInput;

    // Logika perhitungan berdasarkan rumus
    if (index === 0) {
        // --- CUSTOMER KE-1 ---
        newCustomer.kedatangan = newCustomer.iat;
        newCustomer.mulai = newCustomer.kedatangan;
        newCustomer.selesai = newCustomer.mulai + newCustomer.layanan;
        newCustomer.antri = 0;
        newCustomer.sistem = newCustomer.layanan + newCustomer.antri;
        newCustomer.idle = newCustomer.iat;
    } else {
        // --- CUSTOMER SETELAHNYA (ke-2, dst) ---
        let prevCustomer = customers[index - 1];
        
        newCustomer.kedatangan = prevCustomer.kedatangan + newCustomer.iat;
        
        // Kondisi if else untuk Waktu Mulai
        if (newCustomer.kedatangan < prevCustomer.selesai) {
            newCustomer.mulai = prevCustomer.selesai;
        } else {
            newCustomer.mulai = newCustomer.kedatangan;
        }

        newCustomer.selesai = newCustomer.mulai + newCustomer.layanan;
        newCustomer.antri = newCustomer.mulai - newCustomer.kedatangan;
        newCustomer.sistem = newCustomer.layanan + newCustomer.antri;
        newCustomer.idle = newCustomer.mulai - prevCustomer.selesai;
    }

    // Masukkan data baru ke dalam array dan update tabel
    customers.push(newCustomer);
    renderTable();
});

// Fungsi untuk me-reset simulasi dari awal
document.getElementById('btn-reset').addEventListener('click', function() {
    customers = [];
    renderTable();
});

// Fungsi untuk menggambar ulang tabel di HTML
function renderTable() {
    const tbody = document.querySelector('#tabel-simulasi tbody');
    tbody.innerHTML = ''; // Kosongkan isi tabel terlebih dahulu

    customers.forEach(cust => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cust.id}</td>
            <td>${cust.iat}</td>
            <td>${cust.layanan}</td>
            <td>${cust.kedatangan}</td>
            <td>${cust.mulai}</td>
            <td>${cust.selesai}</td>
            <td>${cust.antri}</td>
            <td>${cust.sistem}</td>
            <td>${cust.idle}</td>
        `;
        tbody.appendChild(tr);
    });
}