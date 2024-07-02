const branchNames = [
  {
    branchName: " ঢাকা মহানগরী শতদল",
    branchCode: "১৫১",
  },
  {
    branchName: " ঢাকা মহানগরী অভিযাত্রী",
    branchCode: "১৫২",
  },
  {
    branchName: " ঢাকা মহানগরী ঝিঙেফুল",
    branchCode: "১৫৩",
  },
  {
    branchName: " গাজীপুর মহানগরী",
    branchCode: "১৫৪",
  },
  {
    branchName: " অরুণোদয়",
    branchCode: "১৫৫",
  },
  {
    branchName: " সাভার",
    branchCode: "১৫৬",
  },
  {
    branchName: " মানিকগঞ্জ",
    branchCode: "১৫৭",
  },
  {
    branchName: " ঢাকা মহানগরী দিশারী",
    branchCode: "১৫৮",
  },
  {
    branchName: " ঢাকা মহানগরী কিশলয়",
    branchCode: "১৫৯",
  },
  {
    branchName: " নারায়ণগঞ্জ শহর",
    branchCode: "১৬০",
  },
  {
    branchName: " সবুজমেলা",
    branchCode: "১৬১",
  },
  {
    branchName: " ধ্রুবতারা",
    branchCode: "১৬২",
  },
  {
    branchName: " নরসিংদী",
    branchCode: "১৬৩",
  },
  {
    branchName: " কেরাণীগঞ্জ",
    branchCode: "১৬৪",
  },
  {
    branchName: " কিশোরগঞ্জ",
    branchCode: "১৬৫",
  },
  {
    branchName: " ময়মনসিংহ মহানগরী",
    branchCode: "১৬৬",
  },
  {
    branchName: " টাঙ্গাইল শহর",
    branchCode: "১৬৭",
  },
  {
    branchName: " বর্ণালী",
    branchCode: "১৬৮",
  },
  {
    branchName: " জামালপুর",
    branchCode: "১৬৯",
  },
  {
    branchName: " নেত্রকোনা",
    branchCode: "১৭০",
  },
  {
    branchName: " শেরপুর",
    branchCode: "১৭১",
  },
  {
    branchName: " ফরিদপুর শহর",
    branchCode: "১৭২",
  },
  {
    branchName: " মাদারীপুর",
    branchCode: "১৭৩",
  },
  {
    branchName: " শরিয়তপুর",
    branchCode: "১৭৪",
  },
  {
    branchName: " গোপালগঞ্জ",
    branchCode: "১৭৫",
  },
  {
    branchName: " রাজবাড়ি",
    branchCode: "১৭৬",
  },
  {
    branchName: " রাজশাহী মহানগরী",
    branchCode: "১৭৭",
  },
  {
    branchName: " রংধনু",
    branchCode: "১৭৮",
  },
  {
    branchName: " চাঁপাইনবাবগঞ্জ শহর",
    branchCode: "১৭৯",
  },
  {
    branchName: " পাবনা শহর",
    branchCode: "১৮০",
  },
  {
    branchName: " নাটোর",
    branchCode: "১৮১",
  },
  {
    branchName: " বগুড়া শহর",
    branchCode: "১৮২",
  },
  {
    branchName: " সিরাজগঞ্জ শহর",
    branchCode: "১৮৩",
  },
  {
    branchName: " নওগাঁ",
    branchCode: "১৮৪",
  },
  {
    branchName: " জয়পুরহাট",
    branchCode: "১৮৫",
  },
  {
    branchName: " রংপুর মহানগরী",
    branchCode: "১৮৭",
  },
  {
    branchName: " দিনাজপুর শহর",
    branchCode: "১৮৮",
  },
  {
    branchName: " ঠাকুরগাঁও",
    branchCode: "১৮৯",
  },
  {
    branchName: " কুড়িগ্রাম",
    branchCode: "১৯০",
  },
  {
    branchName: " পঞ্চগড়",
    branchCode: "১৯১",
  },
  {
    branchName: " গাইবান্ধা",
    branchCode: "১৯২",
  },
  {
    branchName: " নীলফামারী",
    branchCode: "১৯৩",
  },
  {
    branchName: " লালমনিরহাট",
    branchCode: "১৯৪",
  },
  {
    branchName: " চট্টগ্রাম মহানগরী নীহারিকা",
    branchCode: "১৯৫",
  },
  {
    branchName: " চট্টগ্রাম মহানগরী সাগরিকা",
    branchCode: "১৯৬",
  },
  {
    branchName: " সবুজকানন",
    branchCode: "১৯৭",
  },
  {
    branchName: " কক্সবাজার শহর",
    branchCode: "১৯৮",
  },
  {
    branchName: " পাহাড়িকা",
    branchCode: "১৯৯",
  },
  {
    branchName: " বান্দরবান",
    branchCode: "২০০",
  },
  {
    branchName: " চট্টগ্রাম জেলা ঊত্তর",
    branchCode: "২০১",
  },
  {
    branchName: " কুমিল্লা মহানগরী",
    branchCode: "২০২",
  },
  {
    branchName: " চাঁদপুর",
    branchCode: "২০৩",
  },
  {
    branchName: " নোয়াখালী শহর",
    branchCode: "২০৪",
  },
  {
    branchName: " লক্ষ্মীপুর শহর",
    branchCode: "২০৫",
  },
  {
    branchName: " চৌমুহনী",
    branchCode: "২০৬",
  },
  {
    branchName: " কাশফুল",
    branchCode: "২০৭",
  },
  {
    branchName: " লাকসাম",
    branchCode: "২০৮",
  },
  {
    branchName: " ফেনী শহর",
    branchCode: "২০৯",
  },
  {
    branchName: " খুলনা মহানগরী",
    branchCode: "২১০",
  },
  {
    branchName: " সাতক্ষীরা শহর",
    branchCode: "২১১",
  },
  {
    branchName: " বাগেরহাট",
    branchCode: "২১২",
  },
  {
    branchName: " পিরোজপুর",
    branchCode: "২১৪",
  },
  {
    branchName: " নড়াইল",
    branchCode: "২১৫",
  },
  {
    branchName: " কুষ্টিয়া শহর",
    branchCode: "২১৬",
  },
  {
    branchName: " যশোর শহর",
    branchCode: "২১৭",
  },
  {
    branchName: " ঝিনাইদহ শহর",
    branchCode: "২১৮",
  },
  {
    branchName: " তারার মেলা",
    branchCode: "২১৯",
  },
  {
    branchName: " চুয়াডাঙ্গা",
    branchCode: "২২০",
  },
  {
    branchName: " মেহেরপুর",
    branchCode: "২২১",
  },
  {
    branchName: " মাগুরা",
    branchCode: "২২২",
  },
  {
    branchName: " বরিশাল মহানগরী",
    branchCode: "২২৩",
  },
  {
    branchName: " ভোলা",
    branchCode: "২২৪",
  },
  {
    branchName: " ঝালকাঠি",
    branchCode: "২২৫",
  },
  {
    branchName: " পটুয়াখালি",
    branchCode: "২২৬",
  },
  {
    branchName: " বরগুনা",
    branchCode: "২২৭",
  },
  {
    branchName: " সিলেট মহানগরী",
    branchCode: "২২৮",
  },
  {
    branchName: " মৌলভীবাজার শহর",
    branchCode: "২২৯",
  },
  {
    branchName: " সুনামগঞ্জ",
    branchCode: "২৩০",
  },
  {
    branchName: " হবিগঞ্জ",
    branchCode: "২৩১",
  },
  {
    branchName: " বি.বাড়িয়া",
    branchCode: "২৩২",
  },
  {
    branchName: " কক্সবাজার জেলা",
    branchCode: "২৩৩",
  },
  {
    branchName: " আম্রকানন",
    branchCode: "২৩৪",
  },
  {
    branchName: "ধানসিঁড়ি",
    branchCode: "২৩৫",
  },
  {
    branchName: "সাতক্ষীরা জেলা (প্রস্তাবিত)",
    branchCode: "২৩৬",
  },
  {
    branchName: "মিঠাপুকুর (প্রস্তাবিত)",
    branchCode: "২৩৭",
  },
  {
    branchName: "রাঙামাটি জেলা (প্রস্তাবিত)",
    branchCode: "২৩৮",
  },
  {
    branchName: "মুন্সিগঞ্জ জেলা (প্রস্তাবিত)",
    branchCode: "২৩৯",
  },
  {
    branchName: "চলন্তিকা",
    branchCode: "২৪০",
  },
  {
    branchName: "গাজীপুর জেলা (প্রস্তাবিত)",
    branchCode: "২৪১",
  },
  {
    branchName: "বে রো বি (প্রস্তাবিত)",
    branchCode: "২৪২",
  },
  {
    branchName: "নওয়াপাড়া (প্রস্তাবিত)",
    branchCode: "২৪৩",
  },
  {
    branchName: "কোম্পানীগঞ্জ (প্রস্তাবিত)",
    branchCode: "২৪৪",
  },
  {
    branchName: "জলঢাকা (প্রস্তাবিত)",
    branchCode: "২৪৫",
  },
  {
    branchName: "পীরগাছা (প্রস্তাবিত)",
    branchCode: "২৪৬",
  },
  {
    branchName: "রায়পুর (প্রস্তাবিত)",
    branchCode: "২৪৭",
  },
  {
    branchName: "সাপাহার (প্রস্তাবিত)",
    branchCode: "২৪৮",
  },
  {
    branchName: "কুলাউড়া (প্রস্তাবিত)",
    branchCode: "২৪৯",
  },
  {
    branchName: "নোবিপ্রবি (প্রস্তাবিত)",
    branchCode: "২৫০",
  },
];

export default branchNames