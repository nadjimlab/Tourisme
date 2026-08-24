import { jsPDF } from 'jspdf';
import { TouristSite, InvestmentOpportunity, DigitalRequest } from '../types';

export const generateSitePDF = (site: TouristSite, lang: 'ar' | 'fr' | 'en' = 'ar') => {
  const doc = new jsPDF();
  const siteName = site.name[lang] || site.name.ar;
  const commune = site.commune[lang] || site.commune.ar;
  const desc = site.description[lang] || site.description.ar;
  const hours = site.visitingHours[lang] || site.visitingHours.ar;
  const fee = site.entryFee[lang] || site.entryFee.ar;
  const address = site.address[lang] || site.address.ar;

  // Header Colors (Algeria Navy & Gold)
  doc.setFillColor(15, 30, 54);
  doc.rect(0, 0, 210, 35, 'F');

  // Gold accent bar
  doc.setFillColor(200, 157, 102);
  doc.rect(0, 35, 210, 3, 'F');

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text("PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA", 105, 12, { align: 'center' });
  doc.setFontSize(11);
  doc.text("Ministry of Tourism and Handicrafts - Wilaya of El Oued", 105, 20, { align: 'center' });
  doc.setFontSize(9);
  doc.text("Official Tourist Site Heritage Dossier", 105, 28, { align: 'center' });

  // Body content
  doc.setTextColor(20, 30, 45);
  doc.setFontSize(16);
  doc.text(siteName, 20, 50);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${commune}`, 20, 58);
  doc.text(`GPS Coordinates: ${site.coordinates[0].toFixed(4)} N, ${site.coordinates[1].toFixed(4)} E`, 20, 64);
  doc.text(`Category: ${site.category.toUpperCase()}`, 20, 70);

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.line(20, 75, 190, 75);

  // Description Section
  doc.setFontSize(12);
  doc.setTextColor(15, 30, 54);
  doc.text('Description & Historical Overview', 20, 85);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const splitDesc = doc.splitTextToSize(desc, 170);
  doc.text(splitDesc, 20, 93);

  const afterDescY = 93 + (splitDesc.length * 6) + 10;

  // Visiting Information Box
  doc.setFillColor(245, 240, 230);
  doc.rect(20, afterDescY, 170, 45, 'F');
  doc.setDrawColor(200, 157, 102);
  doc.rect(20, afterDescY, 170, 45, 'S');

  doc.setFontSize(11);
  doc.setTextColor(15, 30, 54);
  doc.text('Visitor Information & Guidelines', 25, afterDescY + 10);
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text(`Visiting Hours: ${hours}`, 25, afterDescY + 18);
  doc.text(`Entry Fee: ${fee}`, 25, afterDescY + 26);
  doc.text(`Official Address: ${address}`, 25, afterDescY + 34);
  doc.text(`Tourism Emergency Hotline: 1077`, 25, afterDescY + 40);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Generated via Directorate of Tourism & Handicrafts – Wilaya of El Oued Official Portal', 105, 285, { align: 'center' });
  doc.text(`Issue Date: ${new Date().toLocaleDateString('en-GB')}`, 105, 290, { align: 'center' });

  doc.save(`${site.id}_tourist_guide.pdf`);
};

export const generateInvestmentPDF = (invest: InvestmentOpportunity, lang: 'ar' | 'fr' | 'en' = 'fr') => {
  const doc = new jsPDF();
  const title = invest.title[lang] || invest.title.fr;
  const location = invest.location[lang] || invest.location.fr;
  const zet = invest.zetZoneName?.[lang] || invest.zetZoneName?.fr || 'Zone d Expansion Touristique';
  const desc = invest.description[lang] || invest.description.fr;
  const advantages = invest.advantages[lang] || invest.advantages.fr;

  // Header
  doc.setFillColor(15, 30, 54);
  doc.rect(0, 0, 210, 38, 'F');
  doc.setFillColor(200, 157, 102);
  doc.rect(0, 38, 210, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.text("RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE", 105, 12, { align: 'center' });
  doc.setFontSize(11);
  doc.text("MINISTÈRE DU TOURISME ET DE L'ARTISANAT", 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text("Direction du Tourisme et de l'Artisanat de la Wilaya d'El Oued", 105, 27, { align: 'center' });
  doc.setFontSize(9);
  doc.text("FICHE TECHNIQUE D'OPPORTUNITÉ D'INVESTISSEMENT (AAPI / SDAT)", 105, 34, { align: 'center' });

  // Body
  doc.setTextColor(15, 30, 54);
  doc.setFontSize(14);
  const splitTitle = doc.splitTextToSize(title, 170);
  doc.text(splitTitle, 20, 50);

  const curY = 50 + (splitTitle.length * 7);

  // Meta box
  doc.setFillColor(248, 245, 240);
  doc.rect(20, curY, 170, 30, 'F');
  doc.setDrawColor(200, 157, 102);
  doc.rect(20, curY, 170, 30, 'S');

  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text(`Zone ZET: ${zet}`, 25, curY + 8);
  doc.text(`Localisation: ${location}`, 25, curY + 15);
  doc.text(`Superficie: ${invest.areaHectares} Hectares`, 25, curY + 22);
  doc.text(`Coût Estimatif: ${invest.estimatedCostDZD}`, 110, curY + 22);

  // Description
  const descY = curY + 38;
  doc.setFontSize(12);
  doc.setTextColor(15, 30, 54);
  doc.text('Présentation Générale du Projet', 20, descY);

  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  const splitDesc = doc.splitTextToSize(desc, 170);
  doc.text(splitDesc, 20, descY + 8);

  // Key Advantages
  const advY = descY + 8 + (splitDesc.length * 5.5) + 8;
  doc.setFontSize(12);
  doc.setTextColor(15, 30, 54);
  doc.text("Incitations Légales et Avantages Majeurs (Loi AAPI)", 20, advY);

  let itemY = advY + 8;
  advantages.forEach((adv) => {
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const splitAdv = doc.splitTextToSize(`• ${adv}`, 165);
    doc.text(splitAdv, 25, itemY);
    itemY += (splitAdv.length * 5) + 3;
  });

  // Contact Box
  doc.setFillColor(15, 30, 54);
  doc.rect(20, itemY + 5, 170, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Bureau de Promotion de l'Investissement Touristique - Wilaya d'El Oued", 105, itemY + 14, { align: 'center' });
  doc.setFontSize(8.5);
  doc.text("Tél : +213 (0) 32 12 24 98 | Fax : +213 (0) 32 12 24 99 | Email : dta.eloued@mta.gov.dz", 105, itemY + 22, { align: 'center' });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text("Dossier officiel - Portail: https://el-oued.mta.gov.dz | AAPI Guichet Unique", 105, 285, { align: 'center' });

  doc.save(invest.pdfTitle || 'Dossier_Investissement_ElOued.pdf');
};

export const generateFilingReceiptPDF = (req: DigitalRequest) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(15, 30, 54);
  doc.rect(0, 0, 210, 36, 'F');
  doc.setFillColor(200, 157, 102);
  doc.rect(0, 36, 210, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA", 105, 11, { align: 'center' });
  doc.setFontSize(10);
  doc.text("Directorate of Tourism and Handicrafts - El Oued Province", 105, 18, { align: 'center' });
  doc.setFontSize(9);
  doc.text("OFFICIAL CITIZEN FILING & SERVICE RECEIPT", 105, 26, { align: 'center' });

  // Tracking Code Banner
  doc.setFillColor(245, 240, 230);
  doc.rect(20, 46, 170, 26, 'F');
  doc.setDrawColor(200, 157, 102);
  doc.rect(20, 46, 170, 26, 'S');

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('OFFICIAL TRACKING NUMBER:', 30, 56);
  doc.setFontSize(16);
  doc.setTextColor(15, 30, 54);
  doc.text(req.trackingNumber, 30, 66);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Date of Filing: ${new Date(req.createdAt).toLocaleString()}`, 110, 56);
  doc.text(`Current Status: ${req.status.toUpperCase()}`, 110, 64);

  // Applicant Details
  doc.setFontSize(12);
  doc.setTextColor(15, 30, 54);
  doc.text('Applicant Information', 20, 84);

  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  doc.text(`Full Name: ${req.fullName}`, 25, 92);
  doc.text(`National ID / Passport: ${req.nationalIdOrPassport}`, 25, 98);
  doc.text(`Email: ${req.email}`, 25, 104);
  doc.text(`Phone: ${req.phone}`, 25, 110);
  doc.text(`Service Category: ${req.serviceType.toUpperCase()}`, 25, 116);

  // Subject and details
  doc.setFontSize(12);
  doc.setTextColor(15, 30, 54);
  doc.text('Subject & Request Summary', 20, 128);

  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text(`Subject: ${req.subject}`, 25, 136);

  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const splitDetails = doc.splitTextToSize(req.details, 160);
  doc.text(splitDetails, 25, 144);

  // Official Seal Simulation
  const sealY = 210;
  doc.setDrawColor(15, 30, 54);
  doc.setLineWidth(1);
  doc.circle(150, sealY, 20);
  doc.circle(150, sealY, 18);
  doc.setFontSize(6.5);
  doc.setTextColor(15, 30, 54);
  doc.text('WILAYA D EL OUED', 150, sealY - 8, { align: 'center' });
  doc.text('DIRECTION DU TOURISME', 150, sealY - 2, { align: 'center' });
  doc.text('* SERVICE DU GUICHET *', 150, sealY + 4, { align: 'center' });
  doc.text('ELECTRONIC SEAL', 150, sealY + 10, { align: 'center' });

  // Verification Note
  doc.setFillColor(240, 245, 250);
  doc.rect(20, 235, 170, 35, 'F');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 60, 80);
  doc.text('Notice:', 25, 243);
  doc.text('1. This digital filing receipt certifies the reception of your request by the Directorate.', 25, 249);
  doc.text('2. You may track the status of this ticket anytime using the tracking code on our official portal: https://el-oued.mta.gov.dz', 25, 255);
  doc.text('3. Inquiries desk: Cité Echatt 08 Mai 1945, El Oued 39000 | Direct Line: +213 (0) 32 12 24 98', 25, 261);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('Directorate of Tourism and Handicrafts – Wilaya of El Oued (el-oued.mta.gov.dz) © 2026', 105, 285, { align: 'center' });

  doc.save(`Receipt_${req.trackingNumber}.pdf`);
};
