"use client";

import React from "react";
import { Printer } from "lucide-react";

const MOM_BLUE = "#0084c2";
const LIGHT_BLUE_BG = "#e1f5fe";
const GRAY_BG = "#f5f5f5";
const RED_TEXT = "#d32f2f";

const Header = ({ pageNumber }: { pageNumber: number }) => (
  <div className="flex justify-between items-start text-[10px] mb-6 border-b border-gray-300 pb-2">
    <div className="flex flex-col">
      <span className="font-bold">In-Principle Approval – FDW - 0 08425795 | 06 Oct 2023</span>
    </div>
    <div className="font-bold">EMPLOYEE'S COPY</div>
  </div>
);

const Footer = ({ pageNumber }: { pageNumber: number }) => (
  <div className="mt-auto pt-4 border-t border-gray-300 text-[9px] flex justify-between items-end">
    <div className="flex flex-col">
      <span className="font-bold">Ministry of Manpower Work Pass Division</span>
      <div className="flex gap-4">
        <span>Web <span className="text-blue-600 underline">https://www.mom.gov.sg</span></span>
        <span>Contact us <span className="text-blue-600 underline">https://www.mom.gov.sg/contact</span></span>
      </div>
    </div>
    <div className="font-bold">Page {pageNumber} of 5</div>
  </div>
);

const Page = ({ children, pageNumber }: { children: React.ReactNode; pageNumber: number }) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto my-8 shadow-lg flex flex-col print:shadow-none print:my-0 print:w-full print:h-screen print:overflow-hidden">
    <Header pageNumber={pageNumber} />
    <div className="flex-grow flex flex-col">{children}</div>
    <Footer pageNumber={pageNumber} />
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="bg-[#0084c2] text-white p-3 mb-4">
    <h2 className="text-xl font-bold leading-tight">{title}</h2>
    {subtitle && <p className="text-sm italic">{subtitle}</p>}
  </div>
);

export default function MOMIPAClone() {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [showSignatureError, setShowSignatureError] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
    setHasSignature(true);
    setShowSignatureError(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
  };

  const handlePrint = () => {
    if (!hasSignature) {
      setShowSignatureError(true);
      alert("Please provide an electronic signature before printing/submitting.");
      return;
    }
    window.print();
  };

  return (
    <div className="bg-gray-200 min-h-screen py-10 print:p-0 print:bg-white">
      {/* Print Button */}
      <div className="fixed top-4 right-4 print:hidden z-50">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
        >
          <Printer size={20} />
          <span>Print PDF</span>
        </button>
      </div>

      {/* Page 1 */}
      <Page pageNumber={1}>
        <div className="flex justify-between items-start mb-8">
          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center border border-gray-300 text-[8px] text-center p-1">
            [Singapore Crest]
          </div>
          <div className="flex flex-col items-end">
            <div className="w-40 h-10 bg-gray-100 flex items-center justify-center border border-gray-300 text-[8px] text-center mb-2">
              [MOM Logo]
            </div>
            <div className="text-right text-[10px]">
              <div className="font-mono tracking-tighter text-lg">|||||||||||||||||||||||||||||||||||||||||||||</div>
              <div className="relative group inline-block">
                <p className="cursor-help border-b border-dotted border-gray-400">IPA No.: 008425795061023</p>
                <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-left">
                  This number is dynamically managed and provides a reference for the application.
                </div>
              </div>
              <p>SB Transmission Ref No.: Q236629</p>
            </div>
          </div>
        </div>

        <div className="text-[11px] mb-8">
          <p className="font-bold">FITRIYANI</p>
          <p>143 SERANGOON NORTH AVENUE 1</p>
          <p>#11-359</p>
          <p>SINGAPORE 550143</p>
          <div className="font-mono mt-2">||'|'|''||'|'|'|'|'|'|'|'|'|'|'|'|'|'|</div>
          <p className="mt-4">08 Oct 2023</p>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-grow">
            <SectionHeader 
              title="Your Work Permit application has been approved" 
              subtitle="Permohonan izin kerja Anda telah disetujui"
            />
            <div className="text-[11px] space-y-4">
              <p>Dear FITRIYANI,<br/><span className="italic">FITRIYANI yang terhormat,</span></p>
              <p>
                Your application for a Work Permit has been approved in-principle. This letter tells you what to do next.<br/>
                <span className="italic text-gray-600">Pada dasarnya, permohonan izin kerja Anda telah disetujui. Surat ini ditujukan untuk memberi tahu Anda apa yang harus dilakukan selanjutnya.</span>
              </p>
              <p>You can use this letter:<br/><span className="italic text-gray-600">Anda dapat menggunakan surat ini:</span></p>
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  As a visa to enter Singapore (you will need to show the whole letter to the Singapore Immigration).<br/>
                  <span className="italic text-gray-600 text-[10px]">Sebagai visa untuk masuk ke Singapura (Anda perlu menunjukkan keseluruhan surat kepada pihak Imigrasi Singapura).</span>
                </li>
                <li>
                  To start work as a Foreign Domestic Worker for Lim Kun Min Jonathan.<br/>
                  <span className="italic text-gray-600 text-[10px]">Untuk mulai bekerja sebagai Pekerja Domestik Asing pada Lim Kun Min Jonathan.</span>
                </li>
              </ul>
              <p className="font-bold">
                You must enter Singapore by 07 Jan 2024. Otherwise, this approval will expire.<br/>
                <span className="italic font-normal text-gray-600">Anda harus masuk ke Singapura sebelum 07 Jan 2024. Jika tidak, persetujuan ini tidak berlaku.</span>
              </p>
              <div className="pt-4">
                <p>Yours sincerely<br/><span className="italic">Hormat kami,</span></p>
                <div className="my-2 h-16 flex items-end">
                  <span className="font-serif text-3xl italic text-gray-700 opacity-80">Penny Han</span>
                </div>
                <p className="font-bold">Penny Han (Mrs)</p>
                <p>Controller of Work Passes</p>
                <p className="italic text-gray-600">Pengontrol Izin Kerja</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-[#e1f5fe] p-4 text-[11px] flex flex-col">
            <h3 className="text-blue-800 font-bold text-lg leading-tight mb-1">What happens next?</h3>
            <p className="italic text-blue-600 mb-4">Apa selanjutnya?</p>
            <p className="font-bold mb-2">Please follow the steps in the next few pages to get your Work Permit.</p>
            <p className="italic text-gray-600">Ikuti langkah di beberapa halaman berikutnya untuk mendapatkan izin kerja.</p>
          </div>
        </div>
      </Page>

      {/* Page 2 */}
      <Page pageNumber={2}>
        <SectionHeader 
          title="Before you leave home" 
          subtitle="Sebelum meninggalkan rumah"
        />

        <div className="text-[11px] mb-6">
          <p className="font-bold">1. Check your details</p>
          <p className="font-bold">Make sure the employment details in this letter are correct.</p>
          <p>If you find a problem, please contact your employer or employment agent straight away.</p>
          <p className="mt-2 font-bold uppercase">1. PERIKSA DETAIL INFORMASI ANDA</p>
          <p className="font-bold">Pastikan informasi pekerjaan di dalam surat ini sudah benar.</p>
          <p>Jika terdapat masalah, hubungi majikan Anda atau agen tenaga kerja saat itu juga.</p>
        </div>

        <div className="border border-gray-300 p-4 bg-gray-50 grid grid-cols-3 gap-y-6 text-[10px]">
          <div>
            <p className="text-gray-500 uppercase">Your Name / Nama Anda</p>
            <p className="font-bold text-sm">FITRIYANI</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase">Date of Birth / Tanggal Lahir</p>
            <p className="font-bold text-sm">14 Apr 1988</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase">Nationality/Citizenship / Kebangsaan</p>
            <p className="font-bold text-sm">INDONESIAN</p>
          </div>

          <div>
            <p className="text-gray-500 uppercase">Passport No / No. Paspor</p>
            <p className="font-bold text-sm">E5062912</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase">FIN / FIN</p>
            <p className="font-bold text-sm">G2571121T</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase">Work Permit No / No. Izin Kerja</p>
            <p className="font-bold text-sm">0 08425795</p>
          </div>

          <div>
            <p className="text-gray-500 uppercase">Date of Application / Tanggal Permohonan</p>
            <p className="font-bold text-sm">06 Oct 2023</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 uppercase">Occupation / Pekerjaan</p>
            <p className="font-bold text-sm">Foreign Domestic Worker</p>
            <p className="italic text-gray-600">Pekerja Domestik Asing</p>
          </div>

          <div>
            <p className="text-gray-500 uppercase">Basic Monthly Salary* / Gaji Pokok Bulanan*</p>
            <p className="font-bold text-sm">$700.00</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 uppercase">Your Employer / Majikan Anda</p>
            <p className="font-bold text-sm">Lim Kun Min Jonathan</p>
          </div>

          <div>
            <p className="text-gray-500 uppercase">Singapore Employment Agency (EA) / Badan Tenaga Kerja Singapura (EA)</p>
            <p className="font-bold text-sm">WORKLE PTE. LTD.</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase">Number of Rest Days Per Month* / Jumlah Hari Istirahat Per Bulan*</p>
            <p className="font-bold text-sm">4</p>
          </div>

          <div>
            <p className="text-gray-500 uppercase">Salary you will get for each rest day worked (monthly salary / 26 days) / Gaji per hari yang akan Anda peroleh ketika bekerja di hari libur (gaji bulanan/26 hari)</p>
            <p className="font-bold text-sm">$26.92</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 uppercase">Agency fee to be paid to Singapore EA based on 2-year work contract (exclude fees for overseas expenses) / Biaya agensi harus dibayar ke agensi pemasok tenaga kerja (EA) berdasarkan kontrak kerja 2 tahun (tidak termasuk biaya untuk pengeluaran di luar negeri)</p>
            <p className="font-bold text-sm">$0.00</p>
          </div>
        </div>

        <div className="mt-8 text-[11px] space-y-2">
          <p>* You and your employer may mutually agree in writing to change your rest day and monthly salary. Your employer must inform MOM of any changes.</p>
          <p className="italic text-gray-600">* Anda dan majikan Anda dapat membuat persetujuan tertulis untuk mengubah hari libur dan gaji bulanan. Majikan Anda harus memberi tahu MOM terkait perubahan apa pun.</p>
        </div>
      </Page>

      {/* Page 3 */}
      <Page pageNumber={3}>
        <div className="text-[11px] space-y-6">
          <div>
            <p className="font-bold">2. Make sure this In-Principle Approval is still valid</p>
            <p>Go to www.mom.gov.sg &gt; search for “validity check” &gt; click on Work Permit Validity Check via Work Permit Online (Non-login)</p>
            <p className="mt-2">Enter your Work Permit number and Date of Application. If you cannot go online, call us at +65 6438 5122.</p>
          </div>

          <div>
            <p className="font-bold uppercase">2. PASTIKAN PERSETUJUAN SEMENTARA INI MASIH BERLAKU</p>
            <p>Buka www.mom.gov.sg &gt; cari “pemeriksaan validitas” &gt; klik Pemeriksaan Validitas Izin Kerja melalui Izin Kerja Online (tanpa login)</p>
            <p className="mt-2">Masukkan nomor izin kerja Anda dan Tanggal Permohonan. Jika Anda tidak bisa online, hubungi kami di +65 6438 5122.</p>
          </div>

          <SectionHeader 
            title="After you arrive" 
            subtitle="Setelah kedatangan"
          />

          <div className="flex gap-8">
            <div className="w-1/3">
              <p className="font-bold text-blue-800">Within 14 days</p>
              <p className="italic text-blue-600">Dalam waktu 14 hari</p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Your employer will need to:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Send you for a medical check-up if required.</li>
                <li>Ask for your Work Permit card to be issued and delivered.</li>
              </ul>
              <p className="font-bold mt-4">Majikan Anda harus:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Meminta Anda untuk melakukan pemeriksaan medis.</li>
                <li>Meminta agar kartu izin kerja Anda dikeluarkan dan dikirim.</li>
              </ul>
            </div>
          </div>

          <div className="border-2 border-red-600 p-4 mt-8">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-red-600 text-white px-2 py-0.5 font-bold text-[10px]">IMPORTANT</div>
              <div className="font-bold text-red-600">PENTING</div>
            </div>
            <div className="text-[10px] space-y-2">
              <p className="font-bold">You must be fully vaccinated, based on the COVID-19 vaccination requirements stated in our website at https://www.mom.gov.sg/vac-reqmts, in accordance with the following where applicable - the prevailing guidelines of the Singapore Ministry of Health and Ministry of Manpower, or the Employment of Foreign Manpower (Work Passes) Regulations 2012. If you fail to do so, we may take action against you, including cancelling this approval.</p>
              <p className="italic text-gray-700">Anda harus divaksinasi secara lengkap, berdasarkan persyaratan vaksinasi COVID-19 yang tertera pada laman berikut (https://www.mom.gov.sg/vac-reqmts) sesuai dengan peraturan yang berlaku yaitu – pedoman dari Kementerian Kesehatan dan Kementerian Ketenagakerjaan Singapura yang berlaku, atau Peraturan Ketenagakerjaan Tenaga Kerja Asing (Izin Kerja) 2012. Jika Anda tidak mematuhinya, kami dapat mengambil tindakan tegas terhadap proses pengajuan Anda, termasuk membatalkan proses persetujuan ini.</p>
              <p className="font-bold">These steps need to be completed or MOM's approval will be withdrawn and you will need to return home.</p>
              <p className="italic text-gray-700">Langkah-langkah ini harus diselesaikan, atau persetujuan dari MOM akan ditolak dan Anda harus kembali ke negara asal.</p>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 4 */}
      <Page pageNumber={4}>
        <SectionHeader 
          title="Protect yourself – know your rights and responsibilities" 
          subtitle="Lindungi diri Anda – ketahui hak dan kewajiban Anda"
        />

        <div className="space-y-4 text-[11px]">
          <div className="bg-gray-100 p-4">
            <p className="font-bold">Your employer or agent should give you a copy of your contract before you leave for Singapore.</p>
            <p>Your contract must state your salary and any terms, such as rest days and compensation-in-lieu of rest day.</p>
            <p className="mt-2 italic text-gray-600">Anda harus meminta salinan kontrak ke majikan atau agen Anda sebelum pergi ke Singapura.</p>
            <p className="italic text-gray-600">Kontrak Anda harus menyebutkan gaji dan ketentuan apa pun, seperti hari libur dan kompensasi pengganti hari libur.</p>
          </div>

          <div className="bg-gray-100 p-4">
            <p className="font-bold">If you use an agent in your home country, please confirm your fees and arrangements before you leave home.</p>
            <p>The Singapore Government is unable to help you with any disputes between you and your home country's agent.</p>
            <p className="mt-2 italic text-gray-600">Jika Anda menggunakan agen di negara asal, mohon konfirmasi biaya dan perencanaan sebelum Anda meninggalkan negara asal.</p>
            <p className="italic text-gray-600">Pemerintah Singapura tidak bisa membantu Anda apabila ada sengketa antara Anda dan agen dari negara asal.</p>
          </div>

          <div className="bg-gray-100 p-4">
            <p className="font-bold">Your Singapore EA cannot charge you more than one month's salary for each year of your contract or Work Permit, whichever is shorter, up to a maximum of two months' salary.</p>
            <p>If your employer ends your contract within the first six months, your Singapore EA must refund you at least half of the fees. Your Singapore EA must give you a receipt for the service fees you pay.</p>
            <p className="mt-2 italic text-gray-600">EA Singapura tidak akan mengenakan biaya kepada Anda lebih dari gaji satu bulan untuk setiap tahun kontrak atau izin kerja, mana saja yang lebih pendek, hingga maksimum gaji dua bulan.</p>
            <p className="italic text-gray-600">Jika majikan Anda mengakhiri kontrak dalam waktu enam bulan pertama, EA Singapura Anda harus mengembalikan dana kepada Anda minimal setengah dari biaya tersebut. EA Singapura Anda harus memberi Anda tanda terima untuk biaya layanan yang Anda bayarkan.</p>
          </div>

          <div className="bg-gray-100 p-4">
            <p className="font-bold">You can only work in Singapore as a Foreign Domestic Worker for Lim Kun Min Jonathan.</p>
            <p>Your employer should not deploy you to work for someone else or to do non-domestic work.</p>
            <p className="mt-2 italic text-gray-600">Anda hanya dapat bekerja di Singapura sebagai Pekerja Domestik Asing untuk Lim Kun Min Jonathan.</p>
            <p className="italic text-gray-600">Majikan Anda tidak boleh meminta Anda bekerja untuk orang lain atau melakukan pekerjaan non-domestik.</p>
          </div>
        </div>
      </Page>

      {/* Page 5 */}
      <Page pageNumber={5}>
        <div className="space-y-6 text-[11px]">
          <div className="bg-gray-100 p-4">
            <p className="font-bold">You should carry your Work Permit card. Your employer must not hold your passport without your permission.</p>
            <p className="italic text-gray-600">Anda harus membawa kartu izin kerja. Majikan Anda tidak boleh menahan paspor Anda tanpa izin.</p>
          </div>

          <div>
            <p className="font-bold">It is against the law for your employer to make you pay:</p>
            <div className="grid grid-cols-2 gap-x-8 mt-2">
              <ul className="list-disc ml-5 space-y-1">
                <li>The $5,000 Security Bond</li>
                <li>Fees for the Work Permit application, renewal or cancellation</li>
                <li>The Foreign Worker Levy</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Fees for personal accident insurance, medical insurance, medical checks or training courses</li>
                <li>The cost of your journey home</li>
              </ul>
            </div>
            <p className="mt-4 italic text-gray-600">Majikan Anda melanggar hukum bila mengharuskan Anda untuk membayar:</p>
            <div className="grid grid-cols-2 gap-x-8 mt-2 italic text-gray-600">
              <ul className="list-disc ml-5 space-y-1">
                <li>Asuransi Penjaminan sebesar $5,000</li>
                <li>Biaya untuk pengajuan, perpanjangan, atau pembatalan Izin Kerja</li>
                <li>Levi Pekerja Asing</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Biaya asuransi kecelakaan pribadi, asuransi kesehatan, pemeriksaan medis, atau kursus pelatihan</li>
                <li>Biaya pulang ke negara asal</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 p-4">
            <p className="font-bold">You must not break Singapore's laws, e.g. Conditions of the Work Permit. If you do, we may cancel your Work Permit, prosecute you and send you home.</p>
            <p>You can read the rules at www.mom.gov.sg/legislation/work-passes</p>
            <p className="mt-2 italic text-gray-600">Anda tidak boleh melanggar UU Singapura, misalnya Ketentuan Izin Kerja. Jika demikian, kami dapat membatalkan izin kerja Anda, menuntut Anda, dan memulangkan Anda.</p>
            <p className="italic text-gray-600 text-[10px]">Anda dapat membaca peraturan tersebut di www.mom.gov.sg/legislation/work-passes</p>
          </div>

          <div>
            <p className="font-bold">Your employer must ensure your safety, health and well-being, including:</p>
            <div className="grid grid-cols-2 gap-x-8 mt-2">
              <ul className="list-disc ml-5 space-y-1">
                <li>Adequate rest daily</li>
                <li>Weekly rest day or pay for each rest day worked</li>
                <li>Sufficient food</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Appropriate place to sleep</li>
                <li>Safety at work</li>
                <li>Medical care</li>
              </ul>
            </div>
            <p className="mt-4 italic text-gray-600">Majikan Anda harus memastikan keselamatan, kesehatan, dan kesejahteraan Anda, termasuk:</p>
            <div className="grid grid-cols-2 gap-x-8 mt-2 italic text-gray-600">
              <ul className="list-disc ml-5 space-y-1">
                <li>Libur harian yang memadai</li>
                <li>Hari libur mingguan atau biaya per hari ketika bekerja di hari libur</li>
                <li>Makanan yang cukup</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Tempat istirahat yang layak</li>
                <li>Keselamatan di tempat kerja</li>
                <li>Perawatan medis</li>
              </ul>
            </div>
          </div>

          <div className="border-2 border-red-600 p-4 mt-8">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-red-600 text-white px-2 py-0.5 font-bold text-[10px]">IMPORTANT</div>
              <div className="font-bold text-red-600">PENTING</div>
            </div>
            <div className="text-[10px] space-y-2">
              <p className="font-bold">If you are found to be under 23 years old or have less than eight years of education, you will have to return home and may be banned from working here in future.</p>
              <p className="italic text-gray-700">Jika ditemukan bahwa Anda berumur di bawah 23 tahun atau mengenyam pendidikan kurang dari delapan tahun, Anda harus kembali ke negara Anda dan mungkin dilarang bekerja lagi di sini di masa mendatang.</p>
              <p className="font-bold">If you encounter any employment issues, please call the FDW hotline at 1800 339 5505.</p>
              <p className="italic text-gray-700">Jika Anda mengalami masalah pekerjaan, hubungi saluran siaga FDW di 1800 339 5505.</p>
            </div>
          </div>

          {/* Section 11: Biometrics & e-Application */}
          <section className="mt-8 border-t-2 border-gray-300 pt-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4">11. Biometrics & e-Application</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Electronic Signature / Е-потпис</span>
                  <button 
                    onClick={clearSignature}
                    className="text-[10px] bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <canvas 
                  ref={canvasRef}
                  width={300}
                  height={120}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  className={`border rounded cursor-crosshair touch-none transition-colors ${
                    showSignatureError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                />
                {!hasSignature && (
                  <div className="mt-1">
                    <p className="text-[10px] text-red-600 font-bold animate-pulse">Signature required *</p>
                    {showSignatureError && (
                      <p className="text-[11px] text-red-700 font-black uppercase mt-1 bg-red-100 p-1 border border-red-300 rounded">
                        Error: You must sign before submitting or printing!
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="text-[10px] text-gray-600 italic flex items-end">
                <p>Note: Client-side validation for the signature canvas will be implemented to ensure it's not empty before submission or printing, along with error message display.</p>
              </div>
            </div>
          </section>
        </div>
      </Page>
    </div>
  );
}
