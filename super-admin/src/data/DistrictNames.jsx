const districtNames = [
  {
    bn_name: "ঢাকা",
    en_name: "Dhaka",
    id: 1,
  },
  {
    bn_name: "ফরিদপুর",
    en_name: "Faridpur",
    id: 2,
  },
  {
    bn_name: "গাজীপুর",
    en_name: "Gazipur",
    id: 3,
  },
  {
    bn_name: "গোপালগঞ্জ",
    en_name: "Gopalganj",
    id: 4,
  },
  {
    bn_name: "জামালপুর",
    en_name: "Jamalpur",
    id: 5,
  },
  {
    bn_name: "কিশোরগঞ্জ",
    en_name: "Kishoreganj",
    id: 6,
  },
  {
    bn_name: "মাদারীপুর",
    en_name: "Madaripur",
    id: 7,
  },
  {
    bn_name: "মানিকগঞ্জ",
    en_name: "Manikganj",
    id: 8,
  },
  {
    bn_name: "মুন্সিগঞ্জ",
    en_name: "Munshiganj",
    id: 9,
  },
  {
    bn_name: "ময়মনসিংহ",
    en_name: "Mymensingh",
    id: 10,
  },
  {
    bn_name: "নারায়াণগঞ্জ",
    en_name: "Narayanganj",
    id: 11,
  },
  {
    bn_name: "নরসিংদী",
    en_name: "Narsingdi",
    id: 12,
  },
  {
    bn_name: "নেত্রকোণা",
    en_name: "Netrakona",
    id: 13,
  },
  {
    bn_name: "রাজবাড়ি",
    en_name: "Rajbari",
    id: 14,
  },
  {
    bn_name: "শরীয়তপুর",
    en_name: "Shariatpur",
    id: 15,
  },
  {
    bn_name: "শেরপুর",
    en_name: "Sherpur",
    id: 16,
  },
  {
    bn_name: "টাঙ্গাইল",
    en_name: "Tangail",
    id: 17,
  },
  {
    bn_name: "বগুড়া",
    en_name: "Bogura",
    id: 18,
  },
  {
    bn_name: "জয়পুরহাট",
    en_name: "Joypurhat",
    id: 19,
  },
  {
    bn_name: "নওগাঁ",
    en_name: "Naogaon",
    id: 20,
  },
  {
    bn_name: "নাটোর",
    en_name: "Natore",
    id: 21,
  },
  {
    bn_name: "চাঁপাইনবাবগঞ্জ",
    en_name: "Chapainawabganj",
    id: 22,
  },
  {
    bn_name: "পাবনা",
    en_name: "Pabna",
    id: 23,
  },
  {
    bn_name: "রাজশাহী",
    en_name: "Rajshahi",
    id: 24,
  },
  {
    bn_name: "সিরাজগঞ্জ",
    en_name: "Sirajganj",
    id: 25,
  },
  {
    bn_name: "দিনাজপুর",
    en_name: "Dinajpur",
    id: 26,
  },
  {
    bn_name: "গাইবান্ধা",
    en_name: "Gaibandha",
    id: 27,
  },
  {
    bn_name: "কুড়িগ্রাম",
    en_name: "Kurigram",
    id: 28,
  },
  {
    bn_name: "লালমনিরহাট",
    en_name: "Lalmonirhat",
    id: 29,
  },
  {
    bn_name: "নীলফামারী",
    en_name: "Nilphamari",
    id: 30,
  },
  {
    bn_name: "পঞ্চগড়",
    en_name: "Panchagarh",
    id: 31,
  },
  {
    bn_name: "রংপুর",
    en_name: "Rangpur",
    id: 32,
  },
  {
    bn_name: "ঠাকুরগাঁও",
    en_name: "Thakurgaon",
    id: 33,
  },
  {
    bn_name: "বরগুনা",
    en_name: "Barguna",
    id: 34,
  },
  {
    bn_name: "বরিশাল",
    en_name: "Barisal",
    id: 35,
  },
  {
    bn_name: "ভোলা",
    en_name: "Bhola",
    id: 36,
  },
  {
    bn_name: "ঝালকাঠি",
    en_name: "Jhalokathi",
    id: 37,
  },
  {
    bn_name: "পটুয়াখালী",
    en_name: "Patuakhali",
    id: 38,
  },
  {
    bn_name: "পিরোজপুর",
    en_name: "Pirojpur",
    id: 39,
  },
  {
    bn_name: "বান্দরবান",
    en_name: "Bandarban",
    id: 40,
  },
  {
    bn_name: "ব্রাহ্মণবাড়িয়া",
    en_name: "Brahmanbaria",
    id: 41,
  },
  {
    bn_name: "চাঁদপুর",
    en_name: "Chandpur",
    id: 42,
  },
  {
    bn_name: "চট্টগ্রাম",
    en_name: "Chittagong",
    id: 43,
  },
  {
    bn_name: "কুমিল্লা",
    en_name: "Comilla",
    id: 44,
  },
  {
    bn_name: "কক্সবাজার",
    en_name: "Cox's Bazar",
    id: 45,
  },
  {
    bn_name: "ফেনী",
    en_name: "Feni",
    id: 46,
  },
  {
    bn_name: "খাগড়াছড়ি",
    en_name: "Khagrachari",
    id: 47,
  },
  {
    bn_name: "লক্ষ্মীপুর",
    en_name: "Lakshmipur",
    id: 48,
  },
  {
    bn_name: "নোয়াখালী",
    en_name: "Noakhali",
    id: 49,
  },
  {
    bn_name: "রাঙ্গামাটি",
    en_name: "Rangamati",
    id: 50,
  },
  {
    bn_name: "হবিগঞ্জ",
    en_name: "Habiganj",
    id: 51,
  },
  {
    bn_name: "মৌলভীবাজার",
    en_name: "Moulvibazar",
    id: 52,
  },
  {
    bn_name: "সুনামগঞ্জ",
    en_name: "Sunamganj",
    id: 53,
  },
  {
    bn_name: "সিলেট",
    en_name: "Sylhet",
    id: 54,
  },
  {
    bn_name: "বাগেরহাট",
    en_name: "Bagerhat",
    id: 55,
  },
  {
    bn_name: "চুয়াডাঙ্গা",
    en_name: "Chuadanga",
    id: 56,
  },
  {
    bn_name: "যশোর",
    en_name: "Jessore",
    id: 57,
  },
  {
    bn_name: "ঝিনাইদহ",
    en_name: "Jhenaidah",
    id: 58,
  },
  {
    bn_name: "খুলনা",
    en_name: "Khulna",
    id: 59,
  },
  {
    bn_name: "কুষ্টিয়া",
    en_name: "Kushtia",
    id: 60,
  },
  {
    bn_name: "মাগুরা",
    en_name: "Magura",
    id: 61,
  },
  {
    bn_name: "মেহেরপুর",
    en_name: "Meherpur",
    id: 62,
  },
  {
    bn_name: "নড়াইল",
    en_name: "Narail",
    id: 63,
  },
  {
    bn_name: "সাতক্ষীরা",
    en_name: "Satkhira",
    id: 64,
  },
];

export default districtNames;
