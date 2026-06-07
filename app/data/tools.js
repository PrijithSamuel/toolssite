const tools = [
  // PDF Tools
  { name: "Merge PDF", description: "Combine multiple PDF files into one", href: "/pdf/merge", category: "PDF Tools", icon: "📎", badge: "Hot" },
  { name: "Split PDF", description: "Split a PDF into separate pages or extract specific pages", href: "/pdf/split", category: "PDF Tools", icon: "✂️", badge: "" },
  { name: "Compress PDF", description: "Reduce PDF file size without losing quality", href: "/pdf/compress", category: "PDF Tools", icon: "🗜️", badge: "" },
  { name: "PDF to Text", description: "Extract text content from any PDF file", href: "/pdf/pdf-to-text", category: "PDF Tools", icon: "📝", badge: "" },

  // Calculators
  { name: "Percentage Calculator", description: "Calculate percentages, increases and decreases", href: "/calculators/percentage", category: "Calculators", icon: "%", badge: "" },
  { name: "EMI Calculator", description: "Calculate loan EMI, interest and total payment", href: "/calculators/emi", category: "Calculators", icon: "🏦", badge: "Popular" },
  { name: "BMI Calculator", description: "Calculate your Body Mass Index instantly", href: "/calculators/bmi", category: "Calculators", icon: "⚖️", badge: "Popular" },
  { name: "Age Calculator", description: "Calculate exact age from date of birth", href: "/calculators/age", category: "Calculators", icon: "🎂", badge: "" },
  { name: "Tip Calculator", description: "Calculate tip and split the bill between people", href: "/calculators/tip", category: "Calculators", icon: "🍽️", badge: "" },
  { name: "Discount Calculator", description: "Find final price and savings after a discount", href: "/calculators/discount", category: "Calculators", icon: "🏷️", badge: "" },
  { name: "Scientific Calculator", description: "Full calculator with sin, cos, log, sqrt and more", href: "/calculators/scientific", category: "Calculators", icon: "🔬", badge: "" },
  { name: "GPA Calculator", description: "Calculate GPA from course grades and credit hours", href: "/calculators/gpa", category: "Calculators", icon: "🎓", badge: "" },

  // Finance
  { name: "Loan Calculator", description: "Monthly payment, total interest and amortization schedule", href: "/finance/loan-calculator", category: "Finance", icon: "🏦", badge: "New" },
  { name: "Compound Interest", description: "Calculate investment growth with compounding interest", href: "/finance/compound-interest", category: "Finance", icon: "📈", badge: "New" },
  { name: "Salary Calculator", description: "Break annual salary into monthly, weekly, hourly rates", href: "/finance/salary-calculator", category: "Finance", icon: "💰", badge: "New" },
  { name: "Invoice Generator", description: "Create and print professional invoices with line items", href: "/finance/invoice-generator", category: "Finance", icon: "🧾", badge: "New" },

  // Health
  { name: "Calorie Calculator", description: "Calculate BMR and daily calorie needs (Mifflin-St Jeor)", href: "/health/calorie-calculator", category: "Health", icon: "🔥", badge: "New" },
  { name: "Water Intake Calculator", description: "Recommended daily water intake by weight and activity", href: "/health/water-intake", category: "Health", icon: "💧", badge: "New" },
  { name: "Ideal Weight Calculator", description: "Calculate ideal weight using 4 medical formulas", href: "/health/ideal-weight", category: "Health", icon: "⚖️", badge: "New" },
  { name: "Body Fat Calculator", description: "US Navy method body fat percentage with category breakdown", href: "/health/body-fat", category: "Health", icon: "📊", badge: "New" },
  { name: "Sleep Calculator", description: "Ideal bedtimes and wake times based on 90-min sleep cycles", href: "/health/sleep-calculator", category: "Health", icon: "😴", badge: "New" },
  { name: "Calories Burned Calculator", description: "Calories burned by activity using MET values with food equivalents", href: "/health/calories-burned", category: "Health", icon: "🔥", badge: "New" },
  { name: "Pregnancy Due Date Calculator", description: "Estimated due date, trimester, weeks remaining and milestone timeline", href: "/health/pregnancy-due-date", category: "Health", icon: "🤰", badge: "New" },
  { name: "Running Pace Calculator", description: "Calculate pace, finish time or distance with per-km splits table", href: "/health/running-pace", category: "Health", icon: "🏃", badge: "New" },

  // Converters
  { name: "Unit Converter", description: "Convert length, weight, temperature, speed and more", href: "/converters/unit", category: "Converters", icon: "📏", badge: "Popular" },
  { name: "Currency Converter", description: "Convert between 20 world currencies instantly", href: "/converters/currency", category: "Converters", icon: "💱", badge: "" },
  { name: "Color Converter", description: "Convert HEX, RGB, HSL color codes", href: "/converters/color", category: "Converters", icon: "🎨", badge: "" },
  { name: "Time Zone Converter", description: "Convert date and time between world time zones", href: "/converters/timezone", category: "Converters", icon: "🌐", badge: "" },
  { name: "Number Base Converter", description: "Convert numbers between Binary, Octal, Decimal, Hex", href: "/converters/number-base", category: "Converters", icon: "🔢", badge: "" },

  // Text Tools
  { name: "Word Counter", description: "Count words, characters, sentences and paragraphs", href: "/text-tools/word-counter", category: "Text Tools", icon: "✍️", badge: "Popular" },
  { name: "Case Converter", description: "Convert text to UPPER, lower or Title Case", href: "/text-tools/case-converter", category: "Text Tools", icon: "🔤", badge: "" },
  { name: "Text Reverser", description: "Reverse characters, words or lines instantly", href: "/text-tools/text-reverser", category: "Text Tools", icon: "🔁", badge: "" },
  { name: "Remove Duplicates", description: "Remove duplicate lines from any text", href: "/text-tools/remove-duplicates", category: "Text Tools", icon: "🗑️", badge: "" },
  { name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs and mockups", href: "/text-tools/lorem-ipsum", category: "Text Tools", icon: "📄", badge: "" },
  { name: "Text to Slug", description: "Convert text to URL-friendly slug instantly", href: "/text-tools/text-to-slug", category: "Text Tools", icon: "🔗", badge: "" },
  { name: "Line Counter", description: "Count lines and get detailed line statistics", href: "/text-tools/line-counter", category: "Text Tools", icon: "🔢", badge: "" },
  { name: "Sort Lines", description: "Sort lines alphabetically, by length or randomly", href: "/text-tools/sort-lines", category: "Text Tools", icon: "↕️", badge: "" },
  { name: "Text Compare", description: "Highlight differences between two texts line by line", href: "/text-tools/text-compare", category: "Text Tools", icon: "🔀", badge: "New" },

  // Image Tools
  { name: "Image Compressor", description: "Compress JPG and PNG images without losing quality", href: "/image-tools/compress", category: "Image Tools", icon: "🗜️", badge: "Hot" },
  { name: "Image Resizer", description: "Resize images to any dimension instantly", href: "/image-tools/resize", category: "Image Tools", icon: "📐", badge: "" },
  { name: "Image to PDF", description: "Convert images to PDF in one click", href: "/image-tools/image-to-pdf", category: "Image Tools", icon: "📑", badge: "" },
  { name: "Image Format Converter", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format", category: "Image Tools", icon: "🔄", badge: "" },

  // Developer Tools
  { name: "JSON Formatter", description: "Format, minify and validate JSON instantly", href: "/developer-tools/json-formatter", category: "Developer Tools", icon: "📋", badge: "" },
  { name: "QR Code Generator", description: "Generate QR codes for any text or URL", href: "/developer-tools/qr-code", category: "Developer Tools", icon: "📱", badge: "" },
  { name: "Regex Tester", description: "Test and debug regular expressions instantly", href: "/developer-tools/regex-tester", category: "Developer Tools", icon: "🔍", badge: "" },
  { name: "Password Generator", description: "Generate strong, secure passwords instantly", href: "/developer-tools/password-generator", category: "Developer Tools", icon: "🔑", badge: "" },
  { name: "Base64 Encoder/Decoder", description: "Encode text to Base64 or decode Base64 strings", href: "/developer-tools/base64", category: "Developer Tools", icon: "🔐", badge: "" },
  { name: "URL Encoder/Decoder", description: "Encode or decode URL percent-encoded strings", href: "/developer-tools/url-encoder", category: "Developer Tools", icon: "🔗", badge: "" },
  { name: "Markdown Previewer", description: "Write Markdown and see a live HTML preview", href: "/developer-tools/markdown", category: "Developer Tools", icon: "📝", badge: "" },
  { name: "UUID Generator", description: "Generate cryptographically random UUID v4 values", href: "/developer-tools/uuid-generator", category: "Developer Tools", icon: "🎲", badge: "New" },
  { name: "Hash Generator", description: "Generate MD5, SHA-1 and SHA-256 hashes from text", href: "/developer-tools/hash-generator", category: "Developer Tools", icon: "🔒", badge: "New" },

  // SEO Tools
  { name: "Meta Tag Generator", description: "Generate SEO, Open Graph and Twitter Card meta tags", href: "/seo-tools/meta-tag-generator", category: "SEO Tools", icon: "🏷️", badge: "" },
  { name: "Word Density Analyzer", description: "Find the most used keywords in any text", href: "/seo-tools/word-density", category: "SEO Tools", icon: "📊", badge: "" },

  // Timer Tools
  { name: "Stopwatch", description: "Precise stopwatch with lap times and HH:MM:SS.ms display", href: "/timer-tools/stopwatch", category: "Timer Tools", icon: "⏱️", badge: "New" },
  { name: "Countdown Timer", description: "Set a countdown with alarm beep on completion", href: "/timer-tools/countdown-timer", category: "Timer Tools", icon: "⏳", badge: "New" },
  { name: "Pomodoro Timer", description: "25/5 Pomodoro technique timer with session counter", href: "/timer-tools/pomodoro", category: "Timer Tools", icon: "🍅", badge: "New" },

  // Random Tools
  { name: "Random Number Generator", description: "Generate random numbers with custom range and dice roller", href: "/random-tools/random-number", category: "Random Tools", icon: "🎲", badge: "New" },
  { name: "Coin Flip", description: "Flip a coin and track heads/tails statistics", href: "/random-tools/coin-flip", category: "Random Tools", icon: "🪙", badge: "New" },
  { name: "Random Name Picker", description: "Pick random winner(s) from a list with animation", href: "/random-tools/random-name-picker", category: "Random Tools", icon: "🎯", badge: "New" },
  { name: "Spin the Wheel", description: "Create a custom spin wheel and spin for a random result", href: "/random-tools/spin-wheel", category: "Random Tools", icon: "🎡", badge: "New" },

  // Math Tools
  { name: "Fraction Calculator", description: "Add, subtract, multiply and divide fractions with steps", href: "/math-tools/fraction-calculator", category: "Math Tools", icon: "½", badge: "New" },
  { name: "Percentage Change", description: "Calculate % of, what % is, and % increase/decrease", href: "/math-tools/percentage-change", category: "Math Tools", icon: "%", badge: "New" },
  { name: "Prime Checker", description: "Check primality, find factors, list primes up to N", href: "/math-tools/prime-checker", category: "Math Tools", icon: "🔢", badge: "New" },
  { name: "LCM & GCD Calculator", description: "Find LCM and GCD of up to 5 numbers with prime factorization and steps", href: "/math-tools/lcm-gcd", category: "Math Tools", icon: "÷", badge: "New" },
  { name: "Quadratic Equation Solver", description: "Solve ax² + bx + c = 0 — roots, discriminant, vertex, step-by-step", href: "/math-tools/quadratic", category: "Math Tools", icon: "²", badge: "New" },
  { name: "Standard Deviation Calculator", description: "Mean, median, mode, variance and population/sample standard deviation", href: "/math-tools/standard-deviation", category: "Math Tools", icon: "σ", badge: "New" },
  { name: "Roman Numeral Converter", description: "Convert numbers 1–3999 to Roman numerals or decode Roman numerals", href: "/math-tools/roman-numerals", category: "Math Tools", icon: "Ⅻ", badge: "New" },

  // Date Tools
  { name: "Date Difference Calculator", description: "Find the exact difference between two dates", href: "/date-tools/date-difference", category: "Date Tools", icon: "📅", badge: "" },
  { name: "Days Until", description: "Count down to any event — holidays, birthdays and more", href: "/date-tools/days-until", category: "Date Tools", icon: "🗓️", badge: "" },
  { name: "Unix Timestamp Converter", description: "Convert between Unix timestamps and human-readable dates", href: "/date-tools/unix-timestamp", category: "Date Tools", icon: "🕐", badge: "" },

  // Food Tools
  { name: "Recipe Converter", description: "Scale recipe ingredients up or down for any servings", href: "/food-tools/recipe-converter", category: "Food Tools", icon: "👨‍🍳", badge: "New" },
  { name: "Cooking Converter", description: "Convert cooking weights, volumes and oven temperatures", href: "/food-tools/cooking-converter", category: "Food Tools", icon: "⚖️", badge: "New" },
  { name: "Calorie Counter", description: "Track daily calorie intake with 30 pre-loaded foods", href: "/food-tools/calorie-counter", category: "Food Tools", icon: "🥗", badge: "New" },

  // Student Tools
  { name: "Grade Calculator", description: "Calculate weighted grades and predict needed scores", href: "/student-tools/grade-calculator", category: "Student Tools", icon: "📊", badge: "New" },
  { name: "Study Timer", description: "Custom study/break timer with session log", href: "/student-tools/study-timer", category: "Student Tools", icon: "⏱️", badge: "New" },
  { name: "Citation Generator", description: "Generate APA, MLA and Chicago citations instantly", href: "/student-tools/citation-generator", category: "Student Tools", icon: "📚", badge: "New" },

  // Finance additions
  { name: "TVA Calculator", description: "Calculate French VAT (TVA) — add or remove tax (HT/TTC)", href: "/finance/vat-calculator", category: "Finance", icon: "🧾", badge: "New" },
  { name: "French Tax Calculator", description: "Estimate 2024 French income tax (Impôt sur le revenu)", href: "/finance/french-tax-calculator", category: "Finance", icon: "🇫🇷", badge: "New" },

  // German Finance Tools
  { name: "Brutto-Netto-Rechner 2025", description: "German salary calculator — Steuerklassen, Bundesland, all social deductions", href: "/finance/brutto-netto", category: "Finance", icon: "🇩🇪", badge: "New" },
  { name: "Mehrwertsteuer-Rechner", description: "German VAT calculator — MwSt berechnen 19% / 7%, Netto ↔ Brutto", href: "/finance/mehrwertsteuer", category: "Finance", icon: "🧾", badge: "New" },
  { name: "Notendurchschnitt Rechner", description: "German grade average calculator with weighted subjects and Bavarian formula", href: "/finance/german-grade-calculator", category: "Finance", icon: "🎓", badge: "New" },
  { name: "Kurzarbeitergeld-Rechner", description: "Calculate German short-time work allowance (60% or 67% net difference)", href: "/finance/kurzarbeit", category: "Finance", icon: "⏸️", badge: "New" },
  { name: "Elterngeld-Rechner", description: "German parental allowance — Basis-Elterngeld & ElterngeldPlus comparison", href: "/finance/elterngeld", category: "Finance", icon: "👶", badge: "New" },

  // German Converter
  { name: "German / EU Unit Converter", description: "EU clothing, shoe, ring, and paper sizes — convert to UK and US", href: "/converters/german-units", category: "Converters", icon: "📏", badge: "New" },

  // Converter addition
  { name: "Euro Converter", description: "Convert EUR to 9 major European currencies simultaneously", href: "/converters/euro-converter", category: "Converters", icon: "💶", badge: "New" },

  // Abfindung
  { name: "Abfindungsrechner", description: "German severance pay calculator with Fünftelregelung tax benefit", href: "/calculators/abfindung", category: "Calculators", icon: "📋", badge: "New" },

  // Irish Finance Tools
  { name: "Irish Income Tax Calculator 2025", description: "Calculate PAYE, USC and PRSI — Ireland take-home pay 2025", href: "/finance/ireland-tax", category: "Finance", icon: "🇮🇪", badge: "New" },
  { name: "Irish VAT Calculator 2025", description: "Add or remove Irish VAT — 23%, 13.5%, 9%, 4.8% and 0% rates", href: "/finance/ireland-vat", category: "Finance", icon: "🧾", badge: "New" },
  { name: "Mortgage Calculator Ireland 2025", description: "Monthly repayments with Central Bank LTV rules and stamp duty", href: "/finance/ireland-mortgage", category: "Finance", icon: "🏠", badge: "New" },
  { name: "Rent Tax Credit Ireland 2025", description: "Calculate your Irish rent tax credit — max €1,000 or €2,000 for couples", href: "/finance/ireland-rent-tax-credit", category: "Finance", icon: "🏘️", badge: "New" },
  { name: "Stamp Duty Calculator Ireland 2025", description: "Stamp duty on residential and commercial property in Ireland", href: "/finance/ireland-stamp-duty", category: "Finance", icon: "📑", badge: "New" },
  { name: "USC Calculator Ireland 2025", description: "Universal Social Charge — full band-by-band breakdown with reduced rates", href: "/finance/ireland-usc", category: "Finance", icon: "📊", badge: "New" },
  { name: "Irish Pension Calculator 2025", description: "Pension tax relief by age, net cost, and retirement pot projection", href: "/finance/ireland-pension", category: "Finance", icon: "🏦", badge: "New" },

  // Dutch / Netherlands Finance Tools
  { name: "Dutch Income Tax Calculator 2025", description: "Bruto netto berekenen — Box 1 tax, heffingskortingen, 30% ruling Netherlands", href: "/finance/netherlands-tax", category: "Finance", icon: "🇳🇱", badge: "New" },
  { name: "BTW Calculator Nederland 2025", description: "Dutch VAT calculator — 21%, 9%, 0% BTW, excl. and incl. berekenen", href: "/finance/netherlands-btw", category: "Finance", icon: "🧾", badge: "New" },
  { name: "30% Ruling Calculator Netherlands 2025", description: "Calculate 30%-regeling tax saving — eligibility check for expats", href: "/finance/netherlands-30-percent", category: "Finance", icon: "💼", badge: "New" },
  { name: "Hypotheek Calculator Nederland 2025", description: "Dutch mortgage — maandlast, hypotheekrenteaftrek, overdrachtsbelasting, NHG", href: "/finance/netherlands-mortgage", category: "Finance", icon: "🏠", badge: "New" },
  { name: "ZZP Belasting Calculator 2025", description: "Dutch freelancer tax — winst, MKB-winstvrijstelling, zelfstandigenaftrek, BTW", href: "/finance/netherlands-zzp", category: "Finance", icon: "💻", badge: "New" },
  { name: "Toeslagen Calculator Nederland 2025", description: "Dutch allowances — zorgtoeslag, huurtoeslag, kinderbijslag, kinderopvangtoeslag", href: "/finance/netherlands-toeslagen", category: "Finance", icon: "🏛️", badge: "New" },

  // Sri Lanka Finance Tools
  { name: "Sri Lanka Salary Calculator 2025", description: "EPF (8%), ETF (3%) and APIT deductions — net take-home salary LKR 2025", href: "/finance/sri-lanka-salary", category: "Finance", icon: "🇱🇰", badge: "New" },
  { name: "EPF ETF Retirement Calculator Sri Lanka 2025", description: "Project EPF/ETF savings balance at retirement with 8% compound interest", href: "/finance/sri-lanka-epf", category: "Finance", icon: "🏦", badge: "New" },
  { name: "Vehicle Import Duty Calculator Sri Lanka 2025", description: "Customs duty, excise, VAT and total landed cost for vehicle imports to Sri Lanka", href: "/finance/sri-lanka-vehicle", category: "Finance", icon: "🚗", badge: "New" },
  { name: "Income Tax Calculator Sri Lanka 2025", description: "APIT annual PIT slabs 2025 — salary, business, rent and interest income LKR", href: "/finance/sri-lanka-income-tax", category: "Finance", icon: "📊", badge: "New" },
  { name: "Stamp Duty Calculator Sri Lanka 2025", description: "Stamp duty and transfer fees for property transactions in Sri Lanka", href: "/finance/sri-lanka-stamp-duty", category: "Finance", icon: "📑", badge: "New" },
  { name: "Fixed Deposit Calculator Sri Lanka 2025", description: "FD interest, withholding tax (5%) and net maturity — bank rate comparison LKR", href: "/finance/sri-lanka-fixed-deposit", category: "Finance", icon: "🏧", badge: "New" },
  { name: "VAT Calculator Sri Lanka 2025", description: "Calculate VAT at 18% and SSCL 2.5% in Sri Lanka — add or remove VAT LKR", href: "/finance/sri-lanka-vat", category: "Finance", icon: "🧾", badge: "New" },

  // Canada Finance Tools
  { name: "Canadian Income Tax Calculator 2025", description: "Federal + provincial tax, CPP and EI — CRA 2025 rates all provinces and territories", href: "/finance/canada-income-tax", category: "Finance", icon: "🇨🇦", badge: "New" },
  { name: "GST HST Calculator Canada 2025", description: "GST, HST and PST for all Canadian provinces and territories — add or remove tax", href: "/finance/canada-gst-hst", category: "Finance", icon: "🧾", badge: "New" },
  { name: "Canadian Mortgage Calculator 2025", description: "CMHC insurance, stress test, land transfer tax for all Canadian provinces", href: "/finance/canada-mortgage", category: "Finance", icon: "🏠", badge: "New" },
  { name: "RRSP Calculator Canada 2025", description: "CRA RRSP tax refund, contribution room and retirement projection 2025", href: "/finance/canada-rrsp", category: "Finance", icon: "🏦", badge: "New" },
  { name: "TFSA Calculator Canada 2025", description: "TFSA contribution room, over-contribution warning and tax-free growth projection", href: "/finance/canada-tfsa", category: "Finance", icon: "💰", badge: "New" },
  { name: "CPP Benefits Calculator Canada 2025", description: "Estimate Canada Pension Plan retirement benefit — early, standard and delayed CPP", href: "/finance/canada-cpp", category: "Finance", icon: "👴", badge: "New" },
  { name: "HST Reverse Calculator Canada 2025", description: "Remove HST/GST from receipt total — all provinces, perfect for CRA expense reports", href: "/finance/canada-hst-reverse", category: "Finance", icon: "🔄", badge: "New" },

  // India Finance Tools
  { name: "Income Tax Calculator India FY 2025-26", description: "Old vs New Regime — 87A rebate, 80C/80D deductions, cess, monthly TDS India", href: "/finance/india-income-tax", category: "Finance", icon: "🇮🇳", badge: "New" },
  { name: "GST Calculator India 2025", description: "CGST SGST IGST — add or remove GST at 5%, 12%, 18%, 28% India", href: "/finance/india-gst", category: "Finance", icon: "🧾", badge: "New" },
  { name: "SIP Calculator India 2025", description: "Mutual fund SIP returns calculator with step-up SIP and year-wise growth India", href: "/finance/india-sip", category: "Finance", icon: "📈", badge: "New" },
  { name: "HRA Calculator India 2025", description: "HRA exemption under Section 10(13A) — metro/non-metro, tax saving India", href: "/finance/india-hra", category: "Finance", icon: "🏠", badge: "New" },
  { name: "PPF Calculator India 2025", description: "Public Provident Fund at 7.1% p.a. — EEE tax status, 80C benefit India", href: "/finance/india-ppf", category: "Finance", icon: "🏦", badge: "New" },
  { name: "EPF Calculator India 2025", description: "Employee Provident Fund at 8.25% — retirement corpus with salary increment India", href: "/finance/india-epf", category: "Finance", icon: "💼", badge: "New" },
  { name: "Gratuity Calculator India 2025", description: "Gratuity under Payment of Gratuity Act — tax exempt up to ₹20 Lakhs India", href: "/finance/india-gratuity", category: "Finance", icon: "📋", badge: "New" },
  { name: "FD Calculator India 2025", description: "Fixed Deposit returns with TDS (10%/20%), compounding and bank rate comparison India", href: "/finance/india-fd", category: "Finance", icon: "🏧", badge: "New" },
  { name: "Home Loan EMI Calculator India 2025", description: "Home loan EMI, total interest, amortisation schedule and prepayment savings India", href: "/finance/india-home-loan", category: "Finance", icon: "🏗️", badge: "New" },
  { name: "CTC to In-Hand Salary Calculator India 2025", description: "Convert CTC to monthly take-home — EPF, Professional Tax, Income Tax FY 2025-26", href: "/finance/india-ctc", category: "Finance", icon: "💰", badge: "New" },

  // Singapore Finance Tools
  { name: "Singapore Income Tax Calculator 2025", description: "IRAS YA2026 progressive rates with reliefs — resident and non-resident S$", href: "/finance/singapore-income-tax", category: "Finance", icon: "🇸🇬", badge: "New" },
  { name: "CPF Calculator Singapore 2025", description: "CPF contributions, OA/SA/MA allocation and take-home pay — all age groups", href: "/finance/singapore-cpf", category: "Finance", icon: "💼", badge: "New" },
  { name: "Stamp Duty Calculator Singapore 2025", description: "BSD and ABSD for all buyer types — Singapore Citizen, PR, Foreigner, Entity", href: "/finance/singapore-stamp-duty", category: "Finance", icon: "🏠", badge: "New" },
  { name: "HDB Loan Calculator Singapore 2025", description: "HDB vs bank loan — MSR, TDSR check, CPF usage and side-by-side comparison", href: "/finance/singapore-hdb-loan", category: "Finance", icon: "🏗️", badge: "New" },
  { name: "CPF Retirement Sum Calculator Singapore 2025", description: "Project CPF at 55, BRS/FRS/ERS status and CPF LIFE monthly payout at 65", href: "/finance/singapore-cpf-retirement", category: "Finance", icon: "🏦", badge: "New" },
  { name: "GST Calculator Singapore 2025", description: "Singapore GST at 9% — add or remove GST with tourist refund scheme info", href: "/finance/singapore-gst", category: "Finance", icon: "🧾", badge: "New" },
  { name: "Property Tax Calculator Singapore 2025", description: "Annual property tax from Annual Value — owner-occupied and investment rates", href: "/finance/singapore-property-tax", category: "Finance", icon: "🏛️", badge: "New" },

  // Developer tool addition
  { name: "JSON to CSV", description: "Convert JSON arrays to CSV with flattening of nested objects", href: "/developer-tools/json-to-csv", category: "Developer Tools", icon: "📊", badge: "New" },

  // Text tool additions
  { name: "HTML Encoder / Decoder", description: "Encode HTML special characters or decode HTML entities", href: "/text-tools/html-encode", category: "Text Tools", icon: "🔤", badge: "New" },
  { name: "Text to Speech", description: "Convert text to speech using browser Web Speech API", href: "/text-tools/text-to-speech", category: "Text Tools", icon: "🔊", badge: "New" },
  { name: "Palindrome Checker", description: "Check if text is a palindrome ignoring spaces and punctuation", href: "/text-tools/palindrome", category: "Text Tools", icon: "🔁", badge: "New" },
  { name: "Text to Binary", description: "Convert text to 8-bit binary or decode binary back to text", href: "/text-tools/text-to-binary", category: "Text Tools", icon: "💻", badge: "New" },
  { name: "Morse Code", description: "Encode or decode Morse code with audio playback", href: "/text-tools/morse-code", category: "Text Tools", icon: "📡", badge: "New" },
  { name: "Number to Words", description: "Convert any number up to 1 trillion into English words", href: "/text-tools/number-to-words", category: "Text Tools", icon: "🔢", badge: "New" },
  { name: "Remove Spaces", description: "Remove all, extra, or leading/trailing spaces from text", href: "/text-tools/remove-spaces", category: "Text Tools", icon: "✂️", badge: "New" },
  { name: "Add Line Numbers", description: "Add line numbers to any text with custom separators", href: "/text-tools/add-line-numbers", category: "Text Tools", icon: "#️⃣", badge: "New" },

  // PDF addition
  { name: "Word Count / Text Analyzer", description: "Count words, characters, pages and reading time", href: "/pdf/word-count", category: "PDF Tools", icon: "📝", badge: "New" },
];

export default tools;
