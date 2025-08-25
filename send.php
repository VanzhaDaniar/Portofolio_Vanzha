<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['nama'], $_POST['email'], $_POST['subjek'], $_POST['pesan'])) {
    $nama = htmlspecialchars($_POST['nama']);
    $email = htmlspecialchars($_POST['email']);
    $subjek = htmlspecialchars($_POST['subjek']);
    $pesan = htmlspecialchars($_POST['pesan']);

    // Format pesan WhatsApp
    $message = "*📩 Pesan dari Website*\n\n";
    $message .= "👤 Nama: $nama\n";
    $message .= "📧 Email: $email\n";
    $message .= "📌 Subjek: $subjek\n";
    $message .= "💬 Pesan:\n$pesan";

    // Nomor tujuan (format internasional tanpa +)
    $target = "6281216559792";

    // API Key Fonnte
    $token = "FWPAya7tWw4bVHnNYyZf";

    // Kirim menggunakan CURL
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.fonnte.com/send",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => array(
            'target' => $target,
            'message' => $message,
        ),
        CURLOPT_HTTPHEADER => array(
            "Authorization: $token"
        ),
    ));

    $response = curl_exec($curl);
    if ($response === false) {
        echo "Gagal mengirim pesan: " . curl_error($curl);
    } else {
        echo "Pesan berhasil dikirim!";
    }
    curl_close($curl);
} else {
    echo "Permintaan tidak valid.";
}
?>
