🛡️ AegisLedger : Yeni Nesil Kriptografik Tedarik Zinciri ve Finansal Doğrulama Platformu

Sıfır-Bilgi Kanıtları (ZK-SNARKs), IoT Sensör İmzaları ve Tam Homomorfik Şifreleme (FHE) Gücüyle

🚀 Problem: Şeffaflık vs. Ticari Sırlar
Geleneksel küresel tedarik zincirleri temel bir çelişkiyle karşı karşıyadır:

Şeffaflık Talebi: Müşteriler, denetçiler ve düzenleyici kurumlar; ürün orijinalliği, soğuk zincir uyumu ve etik tedarik kanıtı talep etmektedir.

Ticari Gizlilik Riski: Şirketler; tedarikçi listelerini, birim maliyetlerini, stok miktarlarını veya hassas operasyonel verilerini kamuya açık blokzincirlere veya rakiplerine ifşa edemezler.

💡 Çözüm: AegisLedger
AegisLedger, bu kritik çelişkiyi çözen kurumsal düzeyde bir B2B SaaS platformudur. Sıfır-Bilgi Kanıtları (zk-SNARKs / Groth16), Donanım Seviyesinde IoT İmzaları ve Homomorfik Şifreleme (FHE) teknolojilerini birleştirerek, şirketlerin ham verilerini açık etmeden kurallara uyum sağladığını kriptografik olarak kanıtlamasına olanak tanır.

✨ Öne Çıkan Özellikler ve Teknik Detaylar
🔒 Sıfır-Bilgi Kanıtı ile Tedarik Doğrulaması (Groth16): Sıcaklık geçmişini veya tedarikçi kimliğini ifşa etmeden, kurala uyumu (örneğin "Ürün taşıma boyunca 2°C ile 8°C arasında kalmıştır") kanıtlar.

📦 Donanım Seviyesinde IoT Sensör Doğrulaması: Akıllı konteynerlerden gelen fiziksel sensör verilerini donanım imzalarıyla doğrular; insani hataları ve veri manipülasyonunu engeller.

🧮 Homomorfik B2B Fatura Toplama: Faturadaki kalemleri ve tutarları açık etmeden, şifreli veriler üzerinde doğrudan toplam tutar ve vergi hesaplaması yapar.

🛂 Denetçi Portalı ve ZK Erişim İzinleri: Gümrük yetkilileri veya ISO denetçileri için hassas verileri göstermeyen, süreli ve kısıtlı Sıfır-Bilgi denetim izinleri üretir.

📱 Dinamik ZK Doğrulanmış QR Kodlar: Fiziksel paketlerin üzerine basılabilen ve mobil cihazlarla blokzincir üzerinden saniyeler içinde doğrulanabilen mühürler oluşturur.

⚡ Katman-2 (L2) Gaz Optimizasyonu: Minimum blokzincir işlem maliyeti ve anlık doğrulama hızı sunacak şekilde modüler yapıda tasarlanmıştır.

🛠️ Teknoloji Yığını (Tech Stack)
Arayüz ve Kontrol Paneli: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, QR Code React.

Web3 ve Blokzincir Katmanı: ethers.js (v6), MetaMask / Web3 Tarayıcı Cüzdanları, Solidity ^0.8.20, OpenZeppelin.

Kriptoloji & ZK Simülasyonu: Groth16 devre yapıları, Keccak-256 / Pedersen taahhütleri (commitments), FHE simülasyon katmanı.

📂 Proje Mimarisi
Plaintext
aegis-ledger/
├── app/                  # Next.js App Router (Dashboard, Doğrulama, Denetçi Portalı)
├── components/           # Modüler Arayüz Bileşenleri (Navbar, ZkProofForm, AuditorPortal vb.)
├── context/              # Global Web3 Durum Yönetimi (ethers.js v6)
├── utils/                # Kriptografi Simülatörleri, ZK-Prover ve Kontrat Bağlantıları
├── contracts/            # Solidity Akıllı Sözleşmeleri (AegisSupplyChain.sol, IZKVerifier)
└── types/                # Katı TypeScript Veri Tipleri ve Interface Tanımları
🏁 Hızlı Başlangıç ve Kurulum
AegisLedger'ı kendi bilgisayarınızda yerel olarak çalıştırmak için şu adımları izleyin:

1. Depoyu Klonlayın
Bash
git clone https://github.com/kullanici-adi/aegis-ledger.git
cd aegis-ledger
2. Bağımlılıkları Yükleyin
Bash
npm install
# veya yarn/pnpm kullanıyorsanız
yarn install
3. Geliştirici Sunucusunu Başlatın
Bash
npm run dev
Tarayıcınızda http://localhost:3000 adresine giderek kurumsal kontrol panelini görüntüleyebilirsiniz.

📜 Akıllı Sözleşmeye Genel Bakış (AegisSupplyChain.sol)
Blokzincir üzerindeki ana doğrulayıcı sözleşme, harici ZK kanıtlarını kontrol eder ve taahhütleri güvenceye alır:

Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IZKVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external view returns (bool);
}
🤝 Katkıda Bulunma
Katkılarınızı, hata bildirimlerinizi ve yeni özellik isteklerinizi memnuniyetle karşılıyoruz! Lütfen Issues sayfasını kontrol etmekten çekinmeyin.

📄 Lisans
Bu proje MIT Lisansı altında dağıtılmaktadır. Detaylar için LICENSE dosyasına göz atabilirsiniz.
