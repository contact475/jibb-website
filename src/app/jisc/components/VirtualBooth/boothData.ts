export interface BoothDocument {
  title: string;
  type: "pdf" | "image";
  file: string;
}

export interface BoothData {
  id: string;
  companyName: string;
  logo: string;
  city: string;
  country: 'Japan' | 'India' | string;
  objectives: ('Sale' | 'Procurement' | 'Joint Venture' | 'Technical tie-up' | 'Other' | string)[];
  specialization: string[];
  videoUrl: string;
  documents: BoothDocument[];
  website?: string;
}

export const boothData: BoothData[] = [
  {
    id: "companya",
    companyName: "Company A",
    logo: "", // Fallback will use text
    city: "Tokyo",
    country: "Japan",
    objectives: ["Sale"],
    specialization: ["Industrial Machinery", "Precision Parts"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Company Profile",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      },
      {
        title: "Product Brochure",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companya.com"
  },
  {
    id: "companyb",
    companyName: "Company B",
    logo: "",
    city: "Osaka",
    country: "Japan",
    objectives: ["Technical tie-up"],
    specialization: ["Automotive Electronics", "Sensors"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Corporate Overview",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyb.com"
  },
  {
    id: "companyc",
    companyName: "Company C",
    logo: "",
    city: "Mumbai",
    country: "India",
    objectives: ["Procurement"],
    specialization: ["Textile Manufacturing", "Export"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Sustainability Report",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyc.com"
  },
  {
    id: "companyd",
    companyName: "Company D",
    logo: "",
    city: "Bengaluru",
    country: "India",
    objectives: ["Joint Venture"],
    specialization: ["IT Services", "Cloud Computing", "AI Solutions"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Services Deck",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      },
      {
        title: "Case Studies",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyd.com"
  },
  {
    id: "companye",
    companyName: "Company E",
    logo: "",
    city: "Kyoto",
    country: "Japan",
    objectives: ["Sale"],
    specialization: ["Traditional Crafts", "Ceramic Insulators"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Product Catalog",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companye.com"
  },
  {
    id: "companyf",
    companyName: "Company F",
    logo: "",
    city: "Yokohama",
    country: "Japan",
    objectives: ["Technical tie-up"],
    specialization: ["Renewable Energy", "Smart Grid Tech"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Collaboration Proposal",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyf.com"
  },
  {
    id: "companyg",
    companyName: "Company G",
    logo: "",
    city: "New Delhi",
    country: "India",
    objectives: ["Procurement"],
    specialization: ["Medical Equipment", "Healthcare logistics"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Supplier Guidelines",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyg.com"
  },
  {
    id: "companyh",
    companyName: "Company H",
    logo: "",
    city: "Hyderabad",
    country: "India",
    objectives: ["Joint Venture"],
    specialization: ["Pharmaceutical R&D", "Biotech Systems"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Partnership Deck",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyh.com"
  },
  {
    id: "companyi",
    companyName: "Company I",
    logo: "",
    city: "Nagoya",
    country: "Japan",
    objectives: ["Sale"],
    specialization: ["Aerospace Materials", "Carbon Fiber"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Material Safety Data Sheet",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyi.com"
  },
  {
    id: "companyj",
    companyName: "Company J",
    logo: "",
    city: "Kobe",
    country: "Japan",
    objectives: ["Procurement"],
    specialization: ["Logistics Services", "Cold Chain Storage"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Network Overview",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyj.com"
  },
  {
    id: "companyk",
    companyName: "Company K",
    logo: "",
    city: "Chennai",
    country: "India",
    objectives: ["Joint Venture"],
    specialization: ["Automotive Components", "Chassis Design"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Joint Venture Proposal",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyk.com"
  },
  {
    id: "companyl",
    companyName: "Company L",
    logo: "",
    city: "Pune",
    country: "India",
    objectives: ["Procurement"],
    specialization: ["Forging & Castings", "Alloy Steel Components"],
    videoUrl: "https://www.image2url.com/r2/default/videos/1781370722643-76ff9abf-90fb-4d45-9a71-cb669e7ad04e.mp4",
    documents: [
      {
        title: "Quality Assurance Certificate",
        type: "pdf",
        file: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      }
    ],
    website: "https://www.companyl.com"
  }
];
