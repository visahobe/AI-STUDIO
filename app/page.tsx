"use client";

import React from "react";
import { Printer, CheckSquare, Square, Fingerprint, ShieldCheck, X, Upload, Trash2, Camera, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const MOM_BLUE = "#0084c2";
const LIGHT_BLUE_BG = "#e1f5fe";
const GRAY_BG = "#f5f5f5";
const RED_TEXT = "#d32f2f";

const Header = ({ pageNumber, status, setStatus }: { pageNumber: number; status: string; setStatus: (s: string) => void }) => {
  const stages = [
    { name: 'Pending', label: 'Pending / У обради', color: 'bg-amber-500' },
    { name: 'Approved', label: 'Approved / Одобрено', color: 'bg-green-600' },
    { name: 'Rejected', label: 'Rejected / Одбијено', color: 'bg-red-600' }
  ];

  return (
    <div className="flex justify-between items-start text-[10px] mb-6 border-b border-gray-300 pb-4">
      <div className="flex flex-col flex-grow">
        <span className="font-bold">In-Principle Approval – FDW - 0 08425795 | 06 Oct 2023</span>
        
        {/* Progress Indicator */}
        <div className="mt-3 flex items-center gap-4 print:hidden">
          <div className="flex items-center gap-1">
            {stages.map((stage, idx) => (
              <React.Fragment key={stage.name}>
                <div 
                  onClick={() => setStatus(stage.name)}
                  className={`flex items-center gap-1 cursor-pointer transition-all ${
                    status === stage.name ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${stage.color} border border-white shadow-sm`} />
                  <span className={`font-bold ${status === stage.name ? 'text-black' : 'text-gray-500'}`}>
                    {stage.name}
                  </span>
                </div>
                {idx < stages.length - 1 && <div className="w-4 h-px bg-gray-300 mx-1" />}
              </React.Fragment>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300 mx-2" />
          <div className="flex items-center gap-2">
            <span className="text-gray-400 uppercase font-bold text-[8px]">Quick Toggle:</span>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded px-1 font-bold text-blue-600 cursor-pointer focus:ring-1 focus:ring-blue-500 h-5 text-[9px]"
            >
              {stages.map(s => <option key={s.name} value={s.name}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Print-only status display */}
        <div className="hidden print:block mt-1">
          <span className="font-bold text-gray-500 uppercase tracking-wider">Application Status: </span>
          <span className={`font-bold ${
            status === 'Approved' ? 'text-green-600' : status === 'Rejected' ? 'text-red-600' : 'text-amber-500'
          }`}>
            {status}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-bold">EMPLOYEE&apos;S COPY</div>
        <div className={`mt-2 px-3 py-1 rounded-sm text-[10px] font-black text-white shadow-sm transition-colors ${
          status === 'Approved' ? 'bg-green-600' : status === 'Rejected' ? 'bg-red-600' : 'bg-amber-500'
        }`}>
          {status.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, tooltip }: { label: string; value: string | React.ReactNode; tooltip: string }) => (
  <div className="relative group">
    <p className="text-gray-500 uppercase flex items-center gap-1">
      {label}
      <AlertCircle size={10} className="text-gray-300 group-hover:text-blue-400 transition-colors print:hidden" />
    </p>
    <div className="font-bold text-sm">{value}</div>
    <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-[9px] p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all z-50 pointer-events-none translate-y-1 group-hover:translate-y-0 print:hidden">
      <div className="font-bold mb-1 border-b border-gray-600 pb-1">Field Info:</div>
      {tooltip}
      <div className="absolute left-4 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-800"></div>
    </div>
  </div>
);

const Footer = ({ pageNumber }: { pageNumber: number }) => (
  <div className="mt-auto pt-4 border-t border-gray-300 text-[9px] flex justify-between items-end">
    <div className="flex flex-col">
      <span className="font-bold uppercase tracking-tighter">Ministry of Manpower / Министарство рада</span>
      <div className="flex gap-4">
        <span>Web: <span className="text-blue-600 underline">https://www.mom.gov.sg</span></span>
        <span>Contact: <span className="text-blue-600 underline">https://www.mom.gov.sg/contact</span></span>
      </div>
    </div>
    <div className="font-bold italic">Page {pageNumber} of 5 / Страна {pageNumber} од 5</div>
  </div>
);

const Page = ({ children, pageNumber, status, setStatus }: { children: React.ReactNode; pageNumber: number; status: string; setStatus: (s: string) => void }) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto my-8 shadow-lg flex flex-col print:shadow-none print:my-0 print:w-full print:h-screen print:overflow-hidden">
    <Header pageNumber={pageNumber} status={status} setStatus={setStatus} />
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
  const [status, setStatus] = React.useState("Pending");
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [showSignatureError, setShowSignatureError] = React.useState(false);
  const [showValidationModal, setShowValidationModal] = React.useState(false);
  const [comment, setComment] = React.useState("");
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
      setShowValidationModal(true);
      return;
    }
    window.print();
  };

  return (
    <div className="bg-gray-200 min-h-screen py-10 print:p-0 print:bg-white">
      {/* Print Button */}
      <div className="fixed top-6 right-6 print:hidden z-[100]">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all active:scale-95 group"
        >
          <Printer size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold tracking-wide">PRINT APPLICATION (A4)</span>
        </button>
        <div className="mt-2 bg-white/80 backdrop-blur-sm p-2 rounded text-[9px] text-gray-500 border border-gray-200 shadow-sm text-center">
          Ensures high-fidelity A4 output
        </div>
      </div>

      {/* Page 1 */}
      <Page pageNumber={1} status={status} setStatus={setStatus}>
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
          <div className="font-mono mt-2">||&apos;|&apos;|&apos;&apos;||&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;|&apos;</div>
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
      <Page pageNumber={2} status={status} setStatus={setStatus}>
        <SectionHeader 
          title="1. Applicant Details" 
          subtitle="1. Подаци о подносиоцу захтева"
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
          <InfoField 
            label="Your Name / Име и презиме / Nama Anda" 
            value="FITRIYANI" 
            tooltip="Full name as per passport."
          />
          <InfoField 
            label="Date of Birth / Датум рођења / Tanggal Lahir" 
            value="14 Apr 1988" 
            tooltip="Applicant's date of birth in DD MMM YYYY format."
          />
          <InfoField 
            label="Nationality / Држављанство / Kebangsaan" 
            value="INDONESIAN" 
            tooltip="Country of citizenship."
          />

          <InfoField 
            label="Passport No / Број пасоша / No. Paspor" 
            value="E5062912" 
            tooltip="Current valid passport number."
          />
          <InfoField 
            label="FIN / ФИН" 
            value="G2571121T" 
            tooltip="Foreign Identification Number assigned by MOM."
          />
          <InfoField 
            label="Work Permit No / Број радне дозволе / No. Izin Kerja" 
            value="0 08425795" 
            tooltip="Unique Work Permit reference number."
          />

          <div className="col-span-3">
            <InfoField 
              label="Additional Comments / Додатне напомене (Optional)" 
              value={
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter any additional information here..."
                  className="w-full border border-gray-300 p-2 text-[10px] h-20 resize-none focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                />
              }
              tooltip="Any extra information relevant to the application."
            />
          </div>

          <InfoField 
            label="Date of Application / Датум пријаве / Tanggal Permohonan" 
            value="06 Oct 2023" 
            tooltip="The date when the application was submitted."
          />
          <div className="col-span-2">
            <InfoField 
              label="Occupation / Занимање / Pekerjaan" 
              value={
                <>
                  <p className="font-bold text-sm">Foreign Domestic Worker</p>
                  <p className="italic text-gray-600">Pekerja Domestik Asing</p>
                </>
              }
              tooltip="The specific job role approved for the applicant."
            />
          </div>

          <InfoField 
            label="Basic Monthly Salary* / Основна месечна плата* / Gaji Pokok Bulanan*" 
            value="$700.00" 
            tooltip="The agreed monthly salary before deductions."
          />
          <div className="col-span-2">
            <InfoField 
              label="Your Employer / Послодавац / Majikan Anda" 
              value="Lim Kun Min Jonathan" 
              tooltip="The name of the individual or company employing you."
            />
          </div>

          <InfoField 
            label="Singapore Employment Agency (EA) / Агенција за запошљавање / Badan Tenaga Kerja Singapura (EA)" 
            value="WORKLE PTE. LTD." 
            tooltip="The registered employment agency handling the application."
          />
          <InfoField 
            label="Number of Rest Days Per Month* / Број дана одмора месечно* / Jumlah Hari Istirahat Per Bulan*" 
            value="4" 
            tooltip="Number of mandatory rest days per month."
          />

          <InfoField 
            label="Salary per rest day worked / Плата по радном дану одмора" 
            value="$26.92" 
            tooltip="Calculated compensation for working on a rest day (monthly salary / 26 days)."
          />
          <div className="col-span-2">
            <InfoField 
              label="Agency fee / Накнада агенцији" 
              value="$0.00" 
              tooltip="Total service fees payable to the Singapore EA based on 2-year work contract."
            />
          </div>
        </div>

        <div className="mt-8 text-[11px] space-y-2">
          <p>* You and your employer may mutually agree in writing to change your rest day and monthly salary. Your employer must inform MOM of any changes.</p>
          <p className="italic text-gray-600">* Anda dan majikan Anda dapat membuat persetujuan tertulis untuk mengubah hari libur dan gaji bulanan. Majikan Anda harus memberi tahu MOM terkait perubahan apa pun.</p>
        </div>
      </Page>

      {/* Page 3 */}
      <Page pageNumber={3} status={status} setStatus={setStatus}>
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
              <p className="font-bold">These steps need to be completed or MOM&apos;s approval will be withdrawn and you will need to return home.</p>
              <p className="italic text-gray-700">Langkah-langkah ini harus diselesaikan, atau persetujuan dari MOM akan ditolak dan Anda harus kembali ke negara asal.</p>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 4 */}
      <Page pageNumber={4} status={status} setStatus={setStatus}>
        <SectionHeader 
          title="4. Purpose of Journey" 
          subtitle="4. Сврха путовања"
        />

        <div className="mb-6 overflow-hidden border border-gray-300 rounded">
          <table className="w-full text-[10px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-2 border-r border-gray-300">Type of Visit / Врста посете</th>
                <th className="p-2 border-r border-gray-300">Duration / Трајање</th>
                <th className="p-2">Details / Детаљи</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="p-2 border-r border-gray-300">Employment / Запослење</td>
                <td className="p-2 border-r border-gray-300">24 Months</td>
                <td className="p-2 italic">Foreign Domestic Worker contract</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="p-2 border-r border-gray-300">Business / Посао</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 italic">N/A</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="p-2 border-r border-gray-300">Tourism / Туризам</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 italic">N/A</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="p-2 border-r border-gray-300">Other / Остало</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 italic">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>

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
            <p>The Singapore Government is unable to help you with any disputes between you and your home country&apos;s agent.</p>
            <p className="mt-2 italic text-gray-600">Jika Anda menggunakan agen di negara asal, mohon konfirmasi biaya dan perencanaan sebelum Anda meninggalkan negara asal.</p>
            <p className="italic text-gray-600">Pemerintah Singapura tidak bisa membantu Anda apabila ada sengketa antara Anda dan agen dari negara asal.</p>
          </div>

          <div className="bg-gray-100 p-4">
            <p className="font-bold">Your Singapore EA cannot charge you more than one month&apos;s salary for each year of your contract or Work Permit, whichever is shorter, up to a maximum of two months&apos; salary.</p>
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
      <Page pageNumber={5} status={status} setStatus={setStatus}>
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
            <p className="font-bold">You must not break Singapore&apos;s laws, e.g. Conditions of the Work Permit. If you do, we may cancel your Work Permit, prosecute you and send you home.</p>
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

          {/* Section 8: Means of Support */}
          <section className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase">8. Means of Support / Средства за издржавање</h3>
            <div className="grid grid-cols-2 gap-4 text-[10px]">
              <div className="flex items-center gap-2">
                <CheckSquare size={14} className="text-blue-600" />
                <span>Cash / Готовина</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={14} className="text-gray-400" />
                <span>Traveller&apos;s Cheques / Путнички чекови</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare size={14} className="text-blue-600" />
                <span>Credit Cards / Кредитне картице</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={14} className="text-gray-400" />
                <span>Pre-paid Accommodation / Унапред плаћен смештај</span>
              </div>
            </div>
          </section>

          {/* Section 9: Accommodation & Health */}
          <section className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase">9. Accommodation & Health / Смештај и здравље</h3>
            <div className="space-y-2 text-[10px]">
              <p><span className="font-bold">Address in Serbia:</span> 143 SERANGOON NORTH AVENUE 1, #11-359, SINGAPORE 550143</p>
              <p><span className="font-bold">Health Insurance:</span> Valid until 07 Jan 2024 (Policy #MOM-236629)</p>
            </div>
          </section>

          {/* Section 10: Document Checklist */}
          <section className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase">10. Document Checklist / Листа докумената</h3>
            <div className="space-y-2">
              {[
                { label: "Valid Passport / Важећи пасош", status: "completed" },
                { label: "Proof of Financial Means / Доказ о средствима", status: "completed" },
                { label: "Health Insurance / Здравствено осигурање", status: "uploading" },
                { label: "Invitation Letter / Позивно писмо", status: "error" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 text-[10px]">
                  <div className="flex items-center gap-2">
                    {item.status === 'completed' ? <CheckCircle2 size={14} className="text-green-600" /> : 
                     item.status === 'uploading' ? <Loader2 size={14} className="text-blue-600 animate-spin" /> :
                     <AlertCircle size={14} className="text-red-600" />}
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase ${
                      item.status === 'completed' ? 'text-green-600' : 
                      item.status === 'uploading' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {item.status}
                    </span>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: Biometrics & e-Application */}
          <section id="section-11" className="mt-8 border-t-2 border-gray-300 pt-6 scroll-mt-20">
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
                    showSignatureError ? 'border-red-500 bg-red-50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-gray-300 bg-white'
                  }`}
                />
                {!hasSignature && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded">
                    <div className="flex items-center gap-2 text-red-600 mb-1">
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-bold uppercase">Signature Required</span>
                    </div>
                    <p className="text-[9px] text-red-500 leading-tight">
                      Please provide your electronic signature in the box above. This is mandatory for the e-Application process.
                    </p>
                    {showSignatureError && (
                      <div className="mt-2 pt-2 border-t border-red-200">
                        <p className="text-[11px] text-red-700 font-black uppercase flex items-center gap-1">
                          <X size={12} />
                          Validation Error: Signature missing
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="border-l-2 border-gray-300 pl-8 flex flex-col gap-4">
                {/* Serbian Embassy Info */}
                <div className="bg-blue-50 p-3 border border-blue-100 rounded">
                  <h4 className="text-[10px] font-bold text-blue-800 uppercase mb-2">Serbian Embassy Contact / Контакт амбасаде</h4>
                  <div className="space-y-1 text-[9px]">
                    <p><span className="font-bold">Address:</span> 123 Embassy Row, Singapore 123456</p>
                    <p><span className="font-bold">Phone:</span> +65 6789 0123</p>
                    <p><span className="font-bold">Email:</span> embassy.singapore@mfa.rs</p>
                    <p><span className="font-bold">Hours:</span> Mon-Fri, 09:00 - 17:00</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <ShieldCheck size={40} className="mb-2 opacity-20" />
                  <p className="text-[9px] font-bold uppercase tracking-widest">Official Validation Block</p>
                  <p className="text-[8px] italic">For Embassy Use Only / Само за службену употребу</p>
                  <div className="mt-4 w-full border-t border-gray-200 pt-2 flex justify-between text-[7px]">
                    <span>Date: ________________</span>
                    <span>Stamp: ________________</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="text-[10px] text-gray-600 italic mt-4">
            <p>Note: Client-side validation for the signature canvas will be implemented to ensure it&apos;s not empty before submission or printing, along with error message display.</p>
          </div>
        </div>
      </Page>
      {showValidationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-t-8 border-red-600 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 text-red-600 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Signature Required</h3>
                <p className="text-[10px] font-bold text-red-400 mt-1 uppercase tracking-widest">Validation Error</p>
              </div>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              You must provide an electronic signature in <span className="font-bold text-black">Section 11</span> before you can print or submit this application. This is a mandatory requirement for the e-Application process.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowValidationModal(false);
                  const element = document.getElementById('section-11');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Add a brief highlight effect to the signature box
                    setTimeout(() => {
                      setShowSignatureError(true);
                    }, 500);
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Go to Signature Section
              </button>
              <button 
                onClick={() => setShowValidationModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-colors text-xs uppercase"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
