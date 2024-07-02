const branchNames = [
  {
    branchName: "ঢাকা মহানগরী শতদল",
    engBranchName: "Dhaka City Shotodol",
    branchCode: "১৫১",
  },
  {
    branchName: "ঢাকা মহানগরী অভিযাত্রী",
    engBranchName: "Dhaka City Obhijatri",
    branchCode: "১৫২",
  },
  {
    branchName: "ঢাকা মহানগরী ঝিঙেফুল",
    engBranchName: "Dhaka City Jhingephul",
    branchCode: "১৫৩",
  },
  {
    branchName: "গাজীপুর মহানগরী",
    engBranchName: "Gazipur City",
    branchCode: "১৫৪",
  },
  {
    branchName: "অরুণোদয়",
    engBranchName: "Orunudoy",
    branchCode: "১৫৫",
  },
  {
    branchName: "সাভার",
    engBranchName: "Savar",
    branchCode: "১৫৬",
  },
  {
    branchName: "মানিকগঞ্জ",
    engBranchName: "Manikgonj",
    branchCode: "১৫৭",
  },
  {
    branchName: "ঢাকা মহানগরী দিশারী",
    engBranchName: "Dhaka City Dishari",
    branchCode: "১৫৮",
  },
  {
    branchName: "ঢাকা মহানগরী কিশলয়",
    engBranchName: "Dhaka City Kisholoy",
    branchCode: "১৫৯",
  },
  {
    branchName: "নারায়ণগঞ্জ শহর",
    engBranchName: "Narayangonj Town",
    branchCode: "১৬০",
  },
  {
    branchName: "সবুজমেলা",
    engBranchName: "Sobujmela",
    branchCode: "১৬১",
  },
  {
    branchName: "ধ্রুবতারা",
    engBranchName: "Dhrubotara",
    branchCode: "১৬২",
  },
  {
    branchName: "নরসিংদী",
    engBranchName: "Norsingdi",
    branchCode: "১৬৩",
  },
  {
    branchName: "কেরাণীগঞ্জ",
    engBranchName: "Keranigonj",
    branchCode: "১৬৪",
  },
  {
    branchName: "কিশোরগঞ্জ",
    engBranchName: "Kishoregonj",
    branchCode: "১৬৫",
  },
  {
    branchName: "ময়মনসিংহ মহানগরী",
    engBranchName: "Mymensing City",
    branchCode: "১৬৬",
  },
  {
    branchName: "টাঙ্গাইল শহর",
    engBranchName: "Tangail Town",
    branchCode: "১৬৭",
  },
  {
    branchName: "বর্ণালী",
    engBranchName: "Bornali",
    branchCode: "১৬৮",
  },
  {
    branchName: "জামালপুর",
    engBranchName: "Jamalpur",
    branchCode: "১৬৯",
  },
  {
    branchName: "নেত্রকোনা",
    engBranchName: "Netrokona",
    branchCode: "১৭০",
  },
  {
    branchName: "শেরপুর",
    engBranchName: "Sherpur",
    branchCode: "১৭১",
  },
  {
    branchName: "ফরিদপুর শহর",
    engBranchName: "Faridpur Town",
    branchCode: "১৭২",
  },
  {
    branchName: "মাদারীপুর",
    engBranchName: "Madaripur",
    branchCode: "১৭৩",
  },
  {
    branchName: "শরিয়তপুর",
    engBranchName: "Shariatpur",
    branchCode: "১৭৪",
  },
  {
    branchName: "গোপালগঞ্জ",
    engBranchName: "Gopalgonj",
    branchCode: "১৭৫",
  },
  {
    branchName: "রাজবাড়ি",
    engBranchName: "Rajbari",
    branchCode: "১৭৬",
  },
  {
    branchName: "রাজশাহী মহানগরী",
    engBranchName: "Rajshahi City",
    branchCode: "১৭৭",
  },
  {
    branchName: "রংধনু",
    engBranchName: "Rongdhonu",
    branchCode: "১৭৮",
  },
  {
    branchName: "চাঁপাইনবাবগঞ্জ শহর",
    engBranchName: "Chapai Town",
    branchCode: "১৭৯",
  },
  {
    branchName: "পাবনা শহর",
    engBranchName: "Pabna Town",
    branchCode: "১৮০",
  },
  {
    branchName: "নাটোর",
    engBranchName: "Natore",
    branchCode: "১৮১",
  },
  {
    branchName: "বগুড়া শহর",
    engBranchName: "Bogura Town",
    branchCode: "১৮২",
  },
  {
    branchName: "সিরাজগঞ্জ শহর",
    engBranchName: "Sirajgonj Town",
    branchCode: "১৮৩",
  },
  {
    branchName: "নওগাঁ",
    engBranchName: "Naogaon",
    branchCode: "১৮৪",
  },
  {
    branchName: "জয়পুরহাট",
    engBranchName: "Joypurhat",
    branchCode: "১৮৫",
  },
  {
    branchName: "রংপুর মহানগরী",
    engBranchName: "Rangpur City",
    branchCode: "১৮৬",
  },
  {
    branchName: "দিনাজপুর শহর",
    engBranchName: "Dinajpur Town",
    branchCode: "১৮৭",
  },
  {
    branchName: "ঠাকুরগাঁও",
    engBranchName: "Thakurgaon",
    branchCode: "১৮৮",
  },
  {
    branchName: "কুড়িগ্রাম",
    engBranchName: "Kurigram",
    branchCode: "১৯০",
  },
  {
    branchName: "পঞ্চগড়",
    engBranchName: "Ponchogor",
    branchCode: "১৯১",
  },
  {
    branchName: "গাইবান্ধা",
    engBranchName: "Gaibandha",
    branchCode: "১৯২",
  },
  {
    branchName: "নীলফামারী",
    engBranchName: "Nilphamari",
    branchCode: "১৯৩",
  },
  {
    branchName: "লালমনিরহাট",
    engBranchName: "Lalmonirhat",
    branchCode: "১৯৪",
  },
  {
    branchName: "চট্টগ্রাম মহানগরী নীহারিকা",
    engBranchName: "Chattagram City Nihariaka",
    branchCode: "১৯৫",
  },
  {
    branchName: "চট্টগ্রাম মহানগরী সাগরিকা",
    engBranchName: "Chattagram City Sagorika",
    branchCode: "১৯৬",
  },
  {
    branchName: "সবুজকানন",
    engBranchName: "Sobujkanon",
    branchCode: "১৯৭",
  },
  {
    branchName: "কক্সবাজার শহর",
    engBranchName: "Cox's Bazar Town",
    branchCode: "১৯৮",
  },
  {
    branchName: "পাহাড়িকা",
    engBranchName: "Pahraika",
    branchCode: "১৯৯",
  },
  {
    branchName: "বান্দরবান",
    engBranchName: "Bandarban",
    branchCode: "২০০",
  },
  {
    branchName: "চট্টগ্রাম জেলা ঊত্তর",
    engBranchName: "Chattagram Dist. North",
    branchCode: "২০১",
  },
  {
    branchName: "কুমিল্লা মহানগরী",
    engBranchName: "Cumilla City",
    branchCode: "২০২",
  },
  {
    branchName: "চাঁদপুর",
    engBranchName: "Chandpur",
    branchCode: "২০৩",
  },
  {
    branchName: "নোয়াখালী শহর",
    engBranchName: "Noakhali Town",
    branchCode: "২০৪",
  },
  {
    branchName: "লক্ষ্মীপুর শহর",
    engBranchName: "Laxmipur",
    branchCode: "২০৫",
  },
  {
    branchName: "চৌমুহনী",
    engBranchName: "Choumohoni",
    branchCode: "২০৬",
  },
  {
    branchName: "কাশফুল",
    engBranchName: "Kashful",
    branchCode: "২০৭",
  },
  {
    branchName: "লাকসাম",
    engBranchName: "Laksam",
    branchCode: "২০৮",
  },
  {
    branchName: "ফেনী শহর",
    engBranchName: "Feni Town",
    branchCode: "২০৯",
  },
  {
    branchName: "খুলনা মহানগরী",
    engBranchName: "Khulna City",
    branchCode: "২১০",
  },
  {
    branchName: "সাতক্ষীরা শহর",
    engBranchName: "Satkhira Town",
    branchCode: "২১১",
  },
  {
    branchName: "বাগেরহাট",
    engBranchName: "Bagerhat",
    branchCode: "২১২",
  },
  {
    branchName: "পিরুজপুর",
    engBranchName: "Pirojpur",
    branchCode: "২১৪",
  },
  {
    branchName: "নড়াইল",
    engBranchName: "Narail",
    branchCode: "২১৫",
  },
  {
    branchName: "কুষ্টিয়া শহর",
    engBranchName: "Kushtia Shohor",
    branchCode: "২১৬",
  },
  {
    branchName: "যশোর শহর",
    engBranchName: "Jashore Shohor",
    branchCode: "২১৭",
  },
  {
    branchName: "ঝিনাইদহ শহর",
    engBranchName: "Jhinaidah Shohor",
    branchCode: "২১৮",
  },
  {
    branchName: "তারার মেলা",
    engBranchName: "Tararamela",
    branchCode: "২১৯",
  },
  {
    branchName: "চুয়াডাঙ্গা",
    engBranchName: "Chuadanga",
    branchCode: "২২০",
  },
  {
    branchName: "মেহেরপুর",
    engBranchName: "Meherpur",
    branchCode: "২২১",
  },
  {
    branchName: "মাগুরা",
    engBranchName: "Magura",
    branchCode: "২২২",
  },
  {
    branchName: "বরিশাল মহানগরী",
    engBranchName: "Barishal Mahanagari",
    branchCode: "২২৩",
  },
  {
    branchName: "ভোলা",
    engBranchName: "Bhola",
    branchCode: "২২৪",
  },
  {
    branchName: "ঝালকাঠি",
    engBranchName: "Jhalokathi",
    branchCode: "২২৫",
  },
  {
    branchName: "পটুয়াখালী",
    engBranchName: "Patuakhali",
    branchCode: "২২৬",
  },
  {
    branchName: "বরগুনা",
    engBranchName: "Barguna",
    branchCode: "২২৭",
  },
  {
    branchName: "সিলেট মহানগরী",
    engBranchName: "Sylhet Mahanagari",
    branchCode: "২২৮",
  },
  {
    branchName: "মৌলভীবাজার শহর",
    engBranchName: "Moulvibazar Shohor",
    branchCode: "২২৯",
  },
  {
    branchName: "সুনামগঞ্জ",
    engBranchName: "Sunamganj",
    branchCode: "২৩০",
  },
  {
    branchName: "হবিগঞ্জ",
    engBranchName: "Habiganj",
    branchCode: "২৩১",
  },
  {
    branchName: "বি.বাড়িয়া",
    engBranchName: "B. Bariya",
    branchCode: "২৩২",
  },
  {
    branchName: "কক্সবাজার জেলা",
    engBranchName: "Cox's Bazar Dist.",
    branchCode: "২৩৩",
  },
  {
    branchName: "আম্রকানন",
    engBranchName: "Amrakannon",
    branchCode: "২৩৪",
  },
  {
    branchName: "ধানসিঁড়ি",
    engBranchName: "Dhansiri",
    branchCode: "২৩৫",
  },
  {
    branchName: "সাতক্ষীরা জেলা (প্রস্তাবিত)",
    engBranchName: "Satkhira Dist. (Prop.)",
    branchCode: "২৩৬",
  },
  {
    branchName: "মিঠাপুকুর (প্রস্তাবিত)",
    engBranchName: "Mithapukur (Prop.)",
    branchCode: "২৩৭",
  },
  {
    branchName: "রাঙামাটি জেলা (প্রস্তাবিত)",
    engBranchName: "Rangamati (Prop.)",
    branchCode: "২৩৮",
  },
  {
    branchName: "মুন্সিগঞ্জ জেলা (প্রস্তাবিত)",
    engBranchName: "Munshigonj (Prop.)",
    branchCode: "২৩৯",
  },
  {
    branchName: "চলন্তিকা",
    engBranchName: "Cholontika",
    branchCode: "২৪০",
  },
  {
    branchName: "গাজীপুর জেলা (প্রস্তাবিত)",
    engBranchName: "Gazipur Dist. (Prop.)",
    branchCode: "২৪১",
  },
  {
    branchName: "বে রো বি (প্রস্তাবিত)",
    engBranchName: "B R B (Prop.)",
    branchCode: "২৪২",
  },
  {
    branchName: "নওয়াপাড়া (প্রস্তাবিত)",
    engBranchName: "Nowapara (Prop.)",
    branchCode: "২৪৩",
  },
  {
    branchName: "কোম্পানীগঞ্জ (প্রস্তাবিত)",
    engBranchName: "Companiganj (Prop.)",
    branchCode: "২৪৪",
  },
  {
    branchName: "জলঢাকা (প্রস্তাবিত)",
    engBranchName: "Jaldhaka (Prop.)",
    branchCode: "২৪৫",
  },
  {
    branchName: "পীরগাছা (প্রস্তাবিত)",
    engBranchName: "Pirgasa (Prop.)",
    branchCode: "২৪৬",
  },
  {
    branchName: "রায়পুর জেলা (প্রস্তাবিত)",
    engBranchName: "Raipur Dist. (Prop.)",
    branchCode: "২৪৭",
  },
  {
    branchName: "সাপাহার (প্রস্তাবিত)",
    engBranchName: "Sapahar (Prop.)",
    branchCode: "২৪৮",
  },
  {
    branchName: "কুলাউড়া (প্রস্তাবিত)",
    engBranchName: "Kulaura (Prop.)",
    branchCode: "২৪৯",
  },
  {
    branchName: "নোবিপ্রবি (প্রস্তাবিত)",
    engBranchName: "NSTU (Prop.)",
    branchCode: "২৫০",
  },
];

export default branchNames;
