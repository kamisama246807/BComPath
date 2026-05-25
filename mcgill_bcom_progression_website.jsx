import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Search,
  Sparkles,
  Target,
  XCircle
} from "lucide-react";

const core = [
  { code: "MGCR 211", title: "Introduction to Financial Accounting", credits: 3, area: "Core management", prereq: "None", note: "Start early for Accounting, Finance, and HIM." },
  { code: "MGCR 222", title: "Introduction to Organizational Behaviour", credits: 3, area: "Core management", prereq: "None", note: "People, teams, motivation, and organizations." },
  { code: "MGCR 233", title: "Data Programming for Business", credits: 3, area: "Math / Quant", prereq: "U1 first-year core", note: "McGill U1 BCom students should complete this early." },
  { code: "MGCR 250", title: "Expressive Analysis for Management", credits: 3, area: "Core management", prereq: "U1 first-year core", note: "Management communication and analysis." },
  { code: "MGCR 271", title: "Business Statistics", credits: 3, area: "Math / Quant", prereq: "None", note: "Important before Finance and Operations." },
  { code: "MGCR 293", title: "Managerial Economics", credits: 3, area: "Economics", prereq: "None", note: "Normally before MGCR 294 unless taken together." },
  { code: "MGCR 294", title: "The Firm in the Macroeconomy", credits: 3, area: "Economics", prereq: "MGCR 293 before or with it", note: "Macroeconomic business environment." },
  { code: "MGCR 331", title: "Information Technology Management", credits: 3, area: "Core management", prereq: "None", note: "IT and business systems." },
  { code: "MGCR 341", title: "Introduction to Finance", credits: 3, area: "Core management", prereq: "MGCR 271 corequisite/equivalent", note: "Key course for Finance and HIM." },
  { code: "MGCR 352", title: "Principles of Marketing", credits: 3, area: "Core management", prereq: "None", note: "Marketing foundation." },
  { code: "MGCR 372", title: "Operations Management", credits: 3, area: "Core management", prereq: "MGCR 271", note: "Operations and process management." },
  { code: "MGCR 382", title: "International Business", credits: 3, area: "Core management", prereq: "None", note: "International business environment." },
  { code: "MGCR 423", title: "Strategic Management", credits: 3, area: "Capstone (U2/U3)", prereq: "U2/U3 standing", note: "Take later, after the foundation." },
  { code: "MGCR 460", title: "Social Context of Business", credits: 3, area: "Capstone (U2/U3)", prereq: "U2/U3 standing", note: "Business, society, ethics, and sustainability." }
];

const u0Foundation = [
  { code: "MATH 122", title: "Calculus for Management", credits: 3, area: "U0 foundation", prereq: "High school math", note: "Foundation math for non-CEGEP students." },
  { code: "MATH 123", title: "Linear Algebra and Probability", credits: 3, area: "U0 foundation", prereq: "High school math", note: "Foundation quantitative course." },
  { code: "ECON 208", title: "Microeconomic Analysis and Applications", credits: 3, area: "U0 foundation", prereq: "None", note: "Intro microeconomics before business economics." },
  { code: "ECON 209", title: "Macroeconomic Analysis and Applications", credits: 3, area: "U0 foundation", prereq: "None", note: "Intro macroeconomics." },
  { code: "MGCR 250", title: "Expressive Analysis for Management", credits: 3, area: "U0 / Core", prereq: "None", note: "Can appear early in the BCom foundation." },
  { code: "Elective", title: "Non-management elective", credits: 3, area: "Elective", prereq: "Varies", note: "Used to complete the 120-credit path." },
  { code: "Elective", title: "Non-management elective", credits: 3, area: "Elective", prereq: "Varies", note: "Choose based on interest or minor." },
  { code: "Elective", title: "Elective", credits: 3, area: "Elective", prereq: "Varies", note: "Keeps U0 balanced." }
];

const banks = {
  accounting: [
    ["ACCT 351", "Intermediate Financial Accounting 1"], ["ACCT 361", "Management Accounting"], ["ACCT 385", "Principles of Taxation"], ["ACCT 352", "Intermediate Financial Accounting 2"], ["ACCT 362", "Cost Accounting"], ["ACCT 455", "Development of Accounting Thought"],
    ["Accounting Comp 1", "Complementary Accounting course option — choose from McGill Accounting list"], ["Accounting Comp 2", "Complementary Accounting course option — choose from McGill Accounting list"], ["Accounting Comp 3", "Complementary Accounting course option — choose from McGill Accounting list"], ["Accounting Comp 4", "Complementary Accounting course option — choose from McGill Accounting list"]
  ],
  analytics: [
    ["INSY 336", "Data Handling and Coding for Analytics"], ["MGSC 401", "Statistical Foundations of Data Analytics"], ["MGSC 416", "Data-Driven Models for Operations Analytics"], ["INSY 446", "Data Mining for Business Analytics"],
    ["Analytics Comp 1", "Complementary Business Analytics course option — choose from McGill list"], ["Analytics Comp 2", "Complementary Business Analytics course option — choose from McGill list"], ["Analytics Comp 3", "Complementary Business Analytics course option — choose from McGill list"], ["Analytics Comp 4", "Complementary Business Analytics course option — choose from McGill list"], ["Analytics Comp 5", "Complementary Business Analytics course option — choose from McGill list"], ["Analytics Comp 6", "Complementary Business Analytics course option — choose from McGill list"]
  ],
  entrepreneurship: [
    ["Entrepreneurship Req 1", "Required Entrepreneurship course option — choose from McGill list"], ["Entrepreneurship Comp 1", "Complementary Entrepreneurship course option — choose from McGill list"], ["Entrepreneurship Comp 2", "Complementary Entrepreneurship course option — choose from McGill list"], ["Entrepreneurship Comp 3", "Complementary Entrepreneurship course option — choose from McGill list"], ["Entrepreneurship Comp 4", "Complementary Entrepreneurship course option — choose from McGill list"]
  ],
  ethics: [
    ["MGCR 460", "Social Context of Business"],
    ["Ethics Comp 1", "Complementary Ethics course option — choose from McGill list"], ["Ethics Comp 2", "Complementary Ethics course option — choose from McGill list"], ["Ethics Comp 3", "Complementary Ethics course option — choose from McGill list"], ["Ethics Comp 4", "Complementary Ethics course option — choose from McGill list"]
  ],
  finance: [
    ["FINE 342", "Corporate Finance"], ["FINE 441", "Investment Management"], ["MGSC 372", "Advanced Business Statistics"], ["FINE 443", "Applied Corporate Finance"], ["FINE 448", "Financial Derivatives"], ["FINE 482", "International Finance 1"],
    ["Finance Comp FINE 1", "Complementary FINE course option — choose any undergraduate FINE course"], ["Finance Comp FINE 2", "Complementary FINE course option — choose any undergraduate FINE course"], ["Finance Comp FINE 3", "Complementary FINE course option — choose any undergraduate FINE course"], ["Finance Comp 4", "Complementary option — FINE course or approved ACCT course"]
  ],
  it: [
    ["INSY 331", "Managing and Organizing Digital Technology"], ["INSY 333", "Systems Analysis and Modeling"], ["INSY 334", "Design Thinking for User Experience"], ["INSY 341", "Developing Business Applications"], ["INSY 431", "IT Implementation Management"], ["INSY 437", "Managing Data and Databases"], ["INSY 450", "Information Systems Project Management"],
    ["ITM Comp 1", "Complementary ITM course option — choose from McGill list"], ["ITM Comp 2", "Complementary ITM course option — choose from McGill list"], ["ITM Comp 3", "Complementary ITM course option — choose from McGill list"]
  ],
  international: [
    ["BUSA 356", "Management in Global Context"],
    ["International Comp 1", "International Business Component option — choose from McGill list"], ["International Comp 2", "International Business Component option — choose from McGill list"], ["International Comp 3", "International Business Component option — choose from McGill list"], ["International Comp 4", "International Business Component option — choose from McGill list"], ["International Comp 5", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 6", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 7", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 8", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 9", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 10", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 11", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 12", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 13", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 14", "International interdisciplinary/language/experiential option — choose from McGill list"], ["International Comp 15", "International interdisciplinary/language/experiential option — choose from McGill list"]
  ],
  hr: [
    ["HR Req 1", "Required Labour/HR course option — choose from McGill list"], ["HR Req 2", "Required Labour/HR course option — choose from McGill list"], ["HR Comp 1", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 2", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 3", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 4", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 5", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 6", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 7", "Complementary Labour/HR course option — choose from McGill list"], ["HR Comp 8", "Complementary Labour/HR course option — choose from McGill list"]
  ],
  sustainability: [
    ["Sustainability Req 1", "Required Sustainability course option — choose from McGill list"], ["Sustainability Req 2", "Required Sustainability course option — choose from McGill list"], ["Sustainability Comp 1", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 2", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 3", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 4", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 5", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 6", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 7", "Complementary Sustainability course option — choose from McGill list"], ["Sustainability Comp 8", "Complementary Sustainability course option — choose from McGill list"]
  ],
  marketing: [
    ["MRKT 354", "Marketing Research"], ["MRKT 357", "Consumer Behaviour"], ["MRKT 452", "Marketing Strategy"],
    ["Marketing Comp 1", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 2", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 3", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 4", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 5", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 6", "Complementary Marketing course option — choose from McGill list"], ["Marketing Comp 7", "Complementary Marketing course option — choose from McGill list"]
  ],
  mathStats: [
    ["MATH 133", "Linear Algebra and Geometry"], ["MATH 140", "Calculus 1"], ["MATH 141", "Calculus 2", 4], ["MATH 222", "Calculus 3"], ["MATH 323", "Probability"], ["MATH 324", "Statistics"],
    ["MathStats Comp 1", "Complementary Mathematics/Statistics course option — choose from McGill list"], ["MathStats Comp 2", "Complementary Mathematics/Statistics course option — choose from McGill list"], ["MathStats Comp 3", "Complementary Mathematics/Statistics course option — choose from McGill list"]
  ],
  operations: [
    ["MGSC 372", "Advanced Business Statistics"], ["MGSC 373", "Operations Research 1"],
    ["Operations Comp 1", "Complementary Operations course option — choose from McGill list"], ["Operations Comp 2", "Complementary Operations course option — choose from McGill list"], ["Operations Comp 3", "Complementary Operations course option — choose from McGill list"]
  ],
  ob: [
    ["ORGB 321", "Leadership"], ["ORGB 325", "Negotiations and Conflict Resolution"],
    ["OB Comp 1", "Complementary Organizational Behaviour course option — choose from McGill list"], ["OB Comp 2", "Complementary Organizational Behaviour course option — choose from McGill list"], ["OB Comp 3", "Complementary Organizational Behaviour course option — choose from McGill list"]
  ],
  retail: [
    ["RETL 301", "Retail Management"], ["RETL 407", "Retail Analytics"],
    ["Retail Comp 1", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 2", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 3", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 4", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 5", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 6", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 7", "Complementary Retail course option — choose from McGill list"], ["Retail Comp 8", "Complementary Retail course option — choose from McGill list"]
  ],
  strategic: [
    ["MGPO 362", "Fundamentals of Strategy"],
    ["Strategy Comp 1", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 2", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 3", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 4", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 5", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 6", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 7", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 8", "Complementary Strategic Management course option — choose from McGill list"], ["Strategy Comp 9", "Complementary Strategic Management course option — choose from McGill list"]
  ],
  him: [
    ["ACCT 354", "Financial Statement Analysis"], ["FINE 342", "Corporate Finance"], ["FINE 441", "Investment Management"], ["FINE 443", "Applied Corporate Finance"], ["MGSC 372", "Advanced Business Statistics"], ["FINE 448", "Financial Derivatives"], ["FINE 451", "Fixed Income Analysis"], ["FINE 482", "International Finance 1"],
    ["FINE 440D1", "Honours Investment Management Research Project 1", 1.5], ["FINE 440D2", "Honours Investment Management Research Project 1", 1.5], ["FINE 450D1", "Honours Investment Management Research Project 2", 1.5], ["FINE 450D2", "Honours Investment Management Research Project 2", 1.5],
    ["Quantitative Option 1", "Quantitative Course option — choose from McGill HIM list"], ["Quantitative Option 2", "Quantitative Course option — choose from McGill HIM list"], ["Quantitative Option 3", "Quantitative Course option — choose from McGill HIM list"], ["Industry Option 1", "Industry Specialization option — choose from McGill HIM list"], ["Industry Option 2", "Industry Specialization option — choose from McGill HIM list"]
  ]
};

const verifiedCourseInfo = {
  "MGCR 211": { prereq: "None listed", note: "Start early for Accounting, Finance, and HIM." },
  "MGCR 222": { prereq: "None listed", note: "People, teams, motivation, and organizations." },
  "MGCR 233": { prereq: "U1 first-year BCom core", note: "McGill U1 BCom students should complete this early." },
  "MGCR 250": { prereq: "U1 first-year BCom core", note: "Management communication and analysis." },
  "MGCR 271": { prereq: "MATH 122 and MATH 123 or equivalent", note: "Business Statistics; not open to U0 students and has overlap restrictions with ECON/MATH/PSYC stats courses." },
  "MGCR 293": { prereq: "None listed", note: "Normally before MGCR 294 unless taken together." },
  "MGCR 294": { prereq: "MGCR 293 before or with it", note: "Macroeconomic business environment." },
  "MGCR 331": { prereq: "None listed", note: "IT and business systems." },
  "MGCR 341": { prereq: "MGCR 271 corequisite/equivalent", note: "Key course for Finance and HIM." },
  "MGCR 352": { prereq: "None listed", note: "Marketing foundation." },
  "MGCR 372": { prereq: "MGCR 271", note: "Operations and process management." },
  "MGCR 382": { prereq: "None listed", note: "International business environment." },
  "MGCR 423": { prereq: "U2/U3 standing", note: "Take later, after the foundation." },
  "MGCR 460": { prereq: "U2/U3 standing", note: "Business, society, ethics, and sustainability." },
  "ACCT 351": { prereq: "MGCR 211; not open to U0 students", note: "Intermediate Financial Accounting 1 is placed only after MGCR 211 in the prerequisite-aware schedule." },
  "ACCT 352": { prereq: "ACCT 351 and MGCR 341", note: "Intermediate Financial Accounting 2 is placed only after ACCT 351 and Intro to Finance." },
  "ACCT 361": { prereq: "MGCR 211; not open to U0 students", note: "Management Accounting is placed after Financial Accounting." },
  "ACCT 385": { prereq: "MGCR 211; not open to U0 students", note: "Principles of Taxation is placed after Financial Accounting." },
  "ACCT 354": { prereq: "MGCR 211", note: "Required HIM/finance analysis course. Place after Financial Accounting." },
  "FINE 342": { prereq: "MGCR 341", note: "Verified prerequisite: MGCR 341. Corporate finance should come after Intro to Finance." },
  "FINE 441": { prereq: "MGCR 341", note: "Verified prerequisite: MGCR 341. Core investments course before advanced HIM/finance work." },
  "MGSC 372": { prereq: "MGCR 271 or equivalent", note: "Verified prerequisite: MGCR 271 or equivalent. Not open with several overlapping stats courses." },
  "FINE 443": { prereq: "FINE 342", note: "Applied corporate finance should come after Corporate Finance." },
  "FINE 448": { prereq: "MGSC 372 or equivalent AND MGCR 341", note: "Verified prerequisite: MGSC 372 or equivalent plus MGCR 341." },
  "FINE 451": { prereq: "FINE 441", note: "Fixed Income Analysis. Verified prerequisite: FINE 441; official listing shows Winter offering in the checked eCalendar." },
  "FINE 455": { prereq: "FINE 441; coreqs FINE 448 and FINE 451; HIM only", note: "Verified: restricted to Honours Investment Management; FINE 448 and FINE 451 are corequisites." },
  "FINE 480": { prereq: "Check current eCalendar listing", note: "Global investments course. Verify current prerequisite and term offering before registration." },
  "FINE 482": { prereq: "MGCR 341", note: "Verified prerequisite: MGCR 341." },
  "Finance Comp FINE 1": { prereq: "Choose any undergraduate FINE course; check course-specific prerequisites", note: "Finance Major complementary requirement: 9–12 credits must come from undergraduate FINE courses. Do not pre-select for the student." },
  "Finance Comp FINE 2": { prereq: "Choose any undergraduate FINE course; check course-specific prerequisites", note: "Second required FINE complementary option for the Finance Major." },
  "Finance Comp FINE 3": { prereq: "Choose any undergraduate FINE course; check course-specific prerequisites", note: "Third required FINE complementary option for the Finance Major." },
  "Finance Comp 4": { prereq: "Choose either another undergraduate FINE course or one approved ACCT course", note: "Finance Major complementary rule: the last 3 credits can be a FINE course or one approved ACCT course such as ACCT 351, ACCT 352, ACCT 354, ACCT 385, or ACCT 452." },
  "FINE 440D1": { prereq: "Restricted to U2 BCom HIM; Fall term; must also register FINE 440D2", note: "FINE 440D1 is the Fall half of Research Project 1. It is not taken in the same term as D2; D1 and D2 must be completed in consecutive terms." },
  "FINE 440D2": { prereq: "FINE 440D1; Winter term; must complete FINE 440D1/D2 in consecutive terms", note: "FINE 440D2 is the Winter continuation of FINE 440D1. No credit unless both halves are successfully completed in consecutive terms." },
  "FINE 450D1": { prereq: "FINE 440 or completed FINE 440D1/D2; restricted to U3 BCom HIM; Fall term", note: "FINE 450D1 is the Fall half of Research Project 2 and should come after the Research Project 1 sequence is completed." },
  "FINE 450D2": { prereq: "FINE 450D1; restricted to U3 BCom HIM; Winter term", note: "FINE 450D2 is the Winter continuation of FINE 450D1. Keep D1 in Fall and D2 in the next Winter term." },
  "Quantitative Option 1": { prereq: "Choose from McGill HIM Quantitative Courses list", note: "Do not pre-select a course. McGill requires 6–9 credits from the HIM Quantitative Courses list." },
  "Quantitative Option 2": { prereq: "Choose from McGill HIM Quantitative Courses list", note: "Second Quantitative Course option. Student should choose based on the current eCalendar, prerequisites, and availability." },
  "Quantitative Option 3": { prereq: "Choose from McGill HIM Quantitative Courses list", note: "Third Quantitative Course option. The planner uses 9 quantitative credits plus 6 industry credits to reach the 15 complementary credits." },
  "Industry Option 1": { prereq: "Choose from McGill HIM Industry Specialization Courses list", note: "Do not pre-select a course for the student. McGill lists this as an Industry Specialization option; examples include courses such as FINE 442, FINE 444, FINE 445, FINE 446, FINE 447, FINE 455, FINE 456, and other approved options depending on the current eCalendar." },
  "Industry Option 2": { prereq: "Choose from McGill HIM Industry Specialization Courses list", note: "Second Industry Specialization option. The student should select the actual course from McGill's current HIM Industry Specialization list based on availability, prerequisites, and advising." }
};

function makeCourse([code, title, credits = 3], type = "Program course") {
  const verified = verifiedCourseInfo[code];
  return {
    code,
    title,
    credits,
    area: type,
    prereq: verified?.prereq || "Verify in current eCalendar before registration",
    note: verified?.note || "Program course from the selected area of study. Verify exact prerequisite, restriction, and term offering in the current eCalendar."
  };
}

const programs = [
  { id: "major-accounting", kind: "Major", name: "Accounting", credits: 72, programCredits: 30, bank: "accounting" },
  { id: "major-analytics", kind: "Major", name: "Business Analytics", credits: 72, programCredits: 30, bank: "analytics" },
  { id: "major-econ", kind: "Major", name: "Economics for Management Students", credits: 69, programCredits: 27, bank: "international", special: "economics" },
  { id: "major-finance", kind: "Major", name: "Finance", credits: 72, programCredits: 30, bank: "finance" },
  { id: "major-it", kind: "Major", name: "Information Technology Management", credits: 72, programCredits: 30, bank: "it" },
  { id: "major-im", kind: "Major", name: "International Management", credits: 90, programCredits: 48, bank: "international", special: "international-management" },
  { id: "major-hr", kind: "Major", name: "Organizational Behaviour and Human Resources", credits: 72, programCredits: 30, bank: "hr" },
  { id: "major-sustainability", kind: "Major", name: "Managing for Sustainability", credits: 72, programCredits: 30, bank: "sustainability" },
  { id: "major-marketing", kind: "Major", name: "Marketing", credits: 72, programCredits: 30, bank: "marketing" },
  { id: "major-math", kind: "Major", name: "Mathematics and Statistics for Management", credits: 75, programCredits: 30, bank: "mathStats" },
  { id: "major-retail", kind: "Major", name: "Retail Management", credits: 72, programCredits: 30, bank: "retail" },
  { id: "major-strategy", kind: "Major", name: "Strategic Management", credits: 72, programCredits: 30, bank: "strategic" },
  { id: "conc-accounting", kind: "Concentration", name: "Accounting", credits: 15, programCredits: 15, bank: "accounting" },
  { id: "conc-analytics", kind: "Concentration", name: "Business Analytics", credits: 15, programCredits: 15, bank: "analytics" },
  { id: "conc-entrepreneurship", kind: "Concentration", name: "Entrepreneurship", credits: 15, programCredits: 15, bank: "entrepreneurship" },
  { id: "conc-ethics", kind: "Concentration", name: "Ethics", credits: 15, programCredits: 15, bank: "ethics" },
  { id: "conc-finance", kind: "Concentration", name: "Finance", credits: 15, programCredits: 15, bank: "finance" },
  { id: "conc-it", kind: "Concentration", name: "Information Technology Management", credits: 15, programCredits: 15, bank: "it" },
  { id: "conc-international", kind: "Concentration", name: "International Business", credits: 15, programCredits: 15, bank: "international" },
  { id: "conc-hr", kind: "Concentration", name: "Labour-Management Relations & Human Resources", credits: 15, programCredits: 15, bank: "hr" },
  { id: "conc-sustainability", kind: "Concentration", name: "Managing for Sustainability", credits: 15, programCredits: 15, bank: "sustainability" },
  { id: "conc-marketing", kind: "Concentration", name: "Marketing", credits: 15, programCredits: 15, bank: "marketing" },
  { id: "conc-operations", kind: "Concentration", name: "Operations Management", credits: 15, programCredits: 15, bank: "operations" },
  { id: "conc-ob", kind: "Concentration", name: "Organizational Behaviour", credits: 15, programCredits: 15, bank: "ob" },
  { id: "conc-retail", kind: "Concentration", name: "Retail Management", credits: 15, programCredits: 15, bank: "retail" },
  { id: "conc-strategy-global", kind: "Concentration", name: "Strategic Management – Global Strategy", credits: 15, programCredits: 15, bank: "strategic" },
  { id: "conc-strategy-social", kind: "Concentration", name: "Strategic Management – Social Business & Enterprise", credits: 15, programCredits: 15, bank: "strategic" },
  { id: "honours-him", kind: "Honours", name: "Investment Management Honours", credits: 87, programCredits: 45, bank: "him", special: "him" }
];

const baseU0Terms = ["U0 Fall", "U0 Winter", "U1 Fall", "U1 Winter", "U2 Fall", "U2 Winter", "U3 Fall", "U3 Winter"];
const baseU1Terms = ["U1 Fall", "U1 Winter", "U2 Fall", "U2 Winter", "U3 Fall", "U3 Winter"];

function makeTermSequence(startYear, maxYear = 7) {
  const start = startYear === "U0" ? 0 : 1;
  const terms = [];
  for (let year = start; year <= maxYear; year++) {
    terms.push(`U${year} Fall`, `U${year} Winter`);
  }
  return terms;
}

function defaultClassCounts(startYear) {
  const terms = startYear === "U0" ? baseU0Terms : baseU1Terms;
  return Object.fromEntries(terms.map((t) => [t, t.includes("U0") ? 4 : 5]));
}

function inferExtraTermCount(counts, startYear) {
  const values = Object.values(counts).filter((n) => Number.isFinite(n));
  if (!values.length) return startYear === "U0" ? 4 : 5;
  const frequency = values.reduce((map, n) => ({ ...map, [n]: (map[n] || 0) + 1 }), {});
  return Number(Object.entries(frequency).sort((a, b) => b[1] - a[1])[0][0]);
}

function getDynamicTerms(startYear, counts, requiredClassCount, minimumLastTerm = null) {
  const allTerms = makeTermSequence(startYear);
  const baseTerms = startYear === "U0" ? baseU0Terms : baseU1Terms;
  const extraDefault = inferExtraTermCount(counts, startYear);
  const minimumLastIndex = minimumLastTerm ? allTerms.indexOf(minimumLastTerm) : -1;
  let totalSlots = 0;
  const terms = [];

  for (const term of allTerms) {
    terms.push(term);
    totalSlots += counts[term] || (baseTerms.includes(term) ? (term.includes("U0") ? 4 : 5) : extraDefault);
    const reachedRequiredClasses = totalSlots >= requiredClassCount;
    const reachedRequiredTerm = minimumLastIndex === -1 || allTerms.indexOf(term) >= minimumLastIndex;
    if (reachedRequiredClasses && reachedRequiredTerm) break;
  }

  return terms;
}

function trimToCredits(courses, creditLimit) {
  const selected = [];
  let credits = 0;
  for (const course of courses) {
    if (credits + course.credits <= creditLimit) {
      selected.push(course);
      credits += course.credits;
    }
  }
  return selected;
}

function getPool(program, startYear) {
  const fullBankCourses = banks[program.bank].map((c) => makeCourse(c, program.kind === "Honours" ? "Honours" : program.kind));
  const bankCourses = trimToCredits(fullBankCourses, program.programCredits);
  let pool = [];

  if (startYear === "U0") pool.push(...u0Foundation);

  if (program.special === "economics") {
    pool.push(
      core[0], core[1], core[2], core[3], core[4],
      { code: "ECON 230D1", title: "Microeconomic Theory", credits: 3, area: "Major / replacement", prereq: "Economics path", note: "Economics-major replacement path for MGCR 293." },
      { code: "ECON 230D2", title: "Microeconomic Theory", credits: 3, area: "Major / replacement", prereq: "ECON 230D1", note: "Second half of micro theory." },
      core[8], core[9], core[10], core[11],
      { code: "ECON 332", title: "Macroeconomic Theory 1", credits: 3, area: "Major / replacement", prereq: "Economics path", note: "Economics-major replacement path for MGCR 294." },
      { code: "ECON 333", title: "Macroeconomic Theory 2", credits: 3, area: "Major / replacement", prereq: "ECON 332", note: "Second macro course." },
      core[12], core[13]
    );
  } else {
    pool.push(...core, ...bankCourses);
  }

  const target = program.special === "him" ? (startYear === "U0" ? 117 : 87) : (startYear === "U0" ? 120 : 90);
  while (pool.reduce((s, c) => s + c.credits, 0) < target) {
    pool.push({ code: "Elective", title: "Management or non-management elective", credits: 3, area: "Elective", prereq: "Varies", note: "Use electives/minors to complete the total degree credits." });
  }
  return pool;
}

const prerequisiteRules = {
  // Core management flow
  "MGCR 294": { prereqsOrCoreqs: ["MGCR 293"] },
  "MGCR 341": { prereqsOrCoreqs: ["MGCR 271"] },
  "MGCR 372": { prereqs: ["MGCR 271"] },
  "MGCR 423": { minYear: 2 },
  "MGCR 460": { minYear: 2 },

  // Accounting flow
  "ACCT 351": { prereqs: ["MGCR 211"], minYear: 1 },
  "ACCT 352": { prereqs: ["ACCT 351", "MGCR 341"] },
  "ACCT 354": { prereqs: ["MGCR 211"] },
  "ACCT 361": { prereqs: ["MGCR 211"], minYear: 1 },
  "ACCT 385": { prereqs: ["MGCR 211"], minYear: 1 },

  // Finance / HIM flow
  "FINE 342": { prereqs: ["MGCR 341"] },
  "FINE 441": { prereqs: ["MGCR 341"] },
  "FINE 443": { prereqs: ["FINE 342"] },
  "FINE 448": { prereqs: ["MGSC 372", "MGCR 341"] },
  "FINE 451": { prereqs: ["FINE 441"] },
  "FINE 482": { prereqs: ["MGCR 341"] },
  "FINE 440D1": { minYear: 2, onlySeason: "Fall" },
  "FINE 440D2": { prereqs: ["FINE 440D1"], onlySeason: "Winter" },
  "FINE 450D1": { prereqs: ["FINE 440D1", "FINE 440D2"], minYear: 3, onlySeason: "Fall" },
  "FINE 450D2": { prereqs: ["FINE 450D1"], onlySeason: "Winter" },

  // Statistics / quantitative flow
  "MGSC 372": { prereqs: ["MGCR 271"] },
  "MGSC 373": { prereqs: ["MGCR 271"] },

  // Marketing flow
  "MRKT 354": { prereqs: ["MGCR 352"] },
  "MRKT 357": { prereqs: ["MGCR 352"] },
  "MRKT 452": { prereqs: ["MRKT 354", "MRKT 357"] },

  // Math/statistics flow
  "MATH 141": { prereqs: ["MATH 140"] },
  "MATH 222": { prereqs: ["MATH 141"] },
  "MATH 323": { prereqs: ["MATH 141"] },
  "MATH 324": { prereqs: ["MATH 323"] }
};

function cleanCourseCode(code) {
  return code === "MGCR 271" ? "MGCR 271" : code;
}

function parseTerm(term) {
  const match = term.match(/^U([0-9]+) (Fall|Winter)$/);
  return {
    year: match ? Number(match[1]) : 0,
    season: match ? match[2] : "Fall"
  };
}

function courseRequirementsMet(course, completed, selectedThisTerm, term = "U1 Fall") {
  const rule = prerequisiteRules[cleanCourseCode(course.code)];
  if (!rule) return true;
  const { year, season } = parseTerm(term);

  // Prerequisites must be completed in a previous semester.
  // They cannot be taken in the same semester unless listed under prereqsOrCoreqs.
  const prereqsOk = (rule.prereqs || []).every((code) => completed.has(code));
  const coreqsOk = (rule.prereqsOrCoreqs || []).every((code) => completed.has(code) || selectedThisTerm.has(code));
  const yearOk = rule.minYear === undefined || year >= rule.minYear;
  const seasonOk = !rule.onlySeason || rule.onlySeason === season;

  return prereqsOk && coreqsOk && yearOk && seasonOk;
}

function takeNextEligibleCourse(pool, completed, selectedThisTerm, term) {
  const eligibleIndex = pool.findIndex((course) => courseRequirementsMet(course, completed, selectedThisTerm, term));
  if (eligibleIndex >= 0) return pool.splice(eligibleIndex, 1)[0];
  return null;
}

function buildTermsUntilComplete(startYear, initialTerms, classCounts, scheduleOneTerm, hasRemainingCourses) {
  const allTerms = makeTermSequence(startYear);
  const usedTerms = [...initialTerms];
  const plan = [];

  for (const term of usedTerms) {
    const semester = scheduleOneTerm(term);
    if (semester?.courses?.length) plan.push(semester);
  }

  let nextIndex = usedTerms.length;
  while (hasRemainingCourses() && nextIndex < allTerms.length) {
    const term = allTerms[nextIndex];
    usedTerms.push(term);
    const semester = scheduleOneTerm(term);
    if (semester?.courses?.length) plan.push(semester);
    nextIndex += 1;
  }

  return plan;
}

function buildPlan(program, startYear, classCounts, terms) {
  if (program.special === "him") return buildHimPlan(program, startYear, classCounts, terms);

  const pool = [...getPool(program, startYear)];
  const extraDefault = inferExtraTermCount(classCounts, startYear);
  const completed = new Set();

  function scheduleOneTerm(term) {
    const count = classCounts[term] || extraDefault;
    const selectedThisTerm = new Set();
    const courses = [];

    while (courses.length < count && pool.length > 0) {
      const next = takeNextEligibleCourse(pool, completed, selectedThisTerm, term);
      if (!next) break;
      courses.push(next);
      selectedThisTerm.add(cleanCourseCode(next.code));
    }

    courses.forEach((course) => completed.add(cleanCourseCode(course.code)));
    return { term, courses };
  }

  return buildTermsUntilComplete(startYear, terms, classCounts, scheduleOneTerm, () => pool.length > 0);
}

function buildHimPlan(program, startYear, classCounts, terms) {
  const extraDefault = inferExtraTermCount(classCounts, startYear);
  const allCourses = getPool(program, startYear);
  const fixedByTerm = {
    "U2 Fall": ["FINE 440D1"],
    "U2 Winter": ["FINE 440D2"],
    "U3 Fall": ["FINE 450D1"],
    "U3 Winter": ["FINE 450D2"]
  };
  const fixedCodes = new Set(Object.values(fixedByTerm).flat());
  const fixedCourseMap = Object.fromEntries(allCourses.filter((c) => fixedCodes.has(c.code)).map((c) => [c.code, c]));
  const flexiblePool = allCourses.filter((c) => !fixedCodes.has(c.code));
  const completed = new Set();

  function scheduleOneTerm(term) {
    const targetCount = classCounts[term] || extraDefault;
    const fixed = (fixedByTerm[term] || []).map((code) => fixedCourseMap[code]).filter(Boolean);
    const selectedThisTerm = new Set();
    const courses = [];

    for (const fixedCourse of fixed) {
      if (courseRequirementsMet(fixedCourse, completed, selectedThisTerm, term)) {
        courses.push(fixedCourse);
        selectedThisTerm.add(cleanCourseCode(fixedCourse.code));
      }
    }

    while (courses.length < targetCount && flexiblePool.length > 0) {
      const next = takeNextEligibleCourse(flexiblePool, completed, selectedThisTerm, term);
      if (!next) break;
      courses.push(next);
      selectedThisTerm.add(cleanCourseCode(next.code));
    }

    courses.forEach((course) => completed.add(cleanCourseCode(course.code)));
    return { term, courses };
  }

  return buildTermsUntilComplete(startYear, terms, classCounts, scheduleOneTerm, () => flexiblePool.length > 0);
}

function Pill({ children, active, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${active ? "bg-neutral-950 text-white" : "border border-neutral-200 bg-white text-neutral-600 hover:border-red-200"}`}>
      {children}
    </button>
  );
}

function StepCard({ n, title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-sm font-black text-white">{n}</div>
      <h3 className="font-semibold text-neutral-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-500">{children}</p>
    </div>
  );
}

function CourseLoadPicker({ term, value, planned, isExtra, onChange, electiveCount, electiveNeeded, electivePlaced, onElectiveCountChange, complementaryCount, complementaryNeeded, complementaryPlaced, onComplementaryCountChange }) {
  const options = [3, 4, 5, 6];
  const isPartialFinal = planned < value;
  const hideLoadChoices = isPartialFinal;
  const intensity = isPartialFinal ? "Final term" : value <= 3 ? "Light" : value === 4 ? "Balanced" : value === 5 ? "Full-time" : "Heavy";
  const credits = isPartialFinal ? planned * 3 : value * 3;

  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm transition ${isPartialFinal ? "border-emerald-300 ring-2 ring-emerald-100" : isExtra ? "border-amber-300 ring-2 ring-amber-100" : "border-neutral-200 hover:border-red-200"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">Semester</p>
          <h3 className="mt-1 font-serif text-2xl font-black text-neutral-950">{term}</h3>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isExtra && <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-800">Extra</span>}
          {isPartialFinal && <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">Finishes here</span>}
        </div>
      </div>

      {isPartialFinal && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Actual final semester</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="text-4xl font-black text-emerald-900">{planned}</p>
              <p className="text-sm font-semibold text-emerald-800">class{planned === 1 ? "" : "es"} scheduled</p>
            </div>
            <p className="text-right text-sm leading-6 text-emerald-700">
              This is the last semester in the roadmap.
            </p>
          </div>
        </div>
      )}

      {!hideLoadChoices && (
        <div className={`${isPartialFinal ? "mt-4 opacity-70" : "mt-5"} rounded-2xl bg-[#f7f5f1] p-2`}>
          <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500">Preferred maximum load</p>
          <div className="grid grid-cols-4 gap-2">
            {options.map((n) => (
              <button
                key={n}
                onClick={() => onChange(term, n)}
                className={`rounded-xl px-3 py-3 text-center transition ${value === n ? "bg-red-600 text-white shadow-md shadow-red-600/20" : "bg-white text-neutral-600 hover:bg-red-50"}`}
              >
                <span className="block text-xl font-black">{n}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-80">classes</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className={`rounded-full px-3 py-1 font-semibold ${isPartialFinal ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-700"}`}>{intensity}</span>
        <span className="text-neutral-500">{credits} credits shown</span>
      </div>

      {electiveNeeded > 0 && (
        <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-neutral-500">Electives this semester</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">Choose how many elective classes you want placed here.</p>
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-red-700">{electiveCount} selected</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((n) => {
              const semesterCapacity = planned;
              const allowed = Math.min(electiveNeeded - electivePlaced + electiveCount, Math.max(0, semesterCapacity - complementaryCount));
              const disabled = n > allowed;
              return (
                <button
                  key={n}
                  disabled={disabled}
                  onClick={() => onElectiveCountChange(term, n)}
                  className={`rounded-xl px-3 py-3 text-center text-sm font-black transition ${electiveCount === n ? "bg-neutral-950 text-white" : disabled ? "cursor-not-allowed bg-neutral-100 text-neutral-300" : "bg-[#f7f5f1] text-neutral-600 hover:bg-red-50"}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {complementaryNeeded > 0 && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Complementary options this semester</p>
              <p className="mt-1 text-xs leading-5 text-emerald-700">Choose how many complementary option classes you want placed here.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">{complementaryCount} selected</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((n) => {
              const semesterCapacity = planned;
              const allowed = Math.min(complementaryNeeded - complementaryPlaced + complementaryCount, Math.max(0, semesterCapacity - electiveCount));
              const disabled = n > allowed;
              return (
                <button
                  key={n}
                  disabled={disabled}
                  onClick={() => onComplementaryCountChange(term, n)}
                  className={`rounded-xl px-3 py-3 text-center text-sm font-black transition ${complementaryCount === n ? "bg-emerald-800 text-white" : disabled ? "cursor-not-allowed bg-neutral-100 text-neutral-300" : "bg-white text-emerald-800 hover:bg-emerald-100"}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CourseRow({ course }) {
  const displayCode = course.code.startsWith("Industry Option") ? "Industry Specialization" : course.code.startsWith("Quantitative Option") ? "Quantitative Option" : course.code.includes("Comp") ? "Complementary Option" : course.code.includes("Req") ? "Program Requirement" : course.code;
  const color = course.area.includes("Quant") || course.area.includes("foundation") ? "border-l-blue-600 bg-blue-50/40" : course.area.includes("Economics") ? "border-l-amber-600 bg-amber-50/40" : course.area.includes("Capstone") ? "border-l-red-600 bg-red-50/50" : course.area.includes("Elective") ? "border-l-neutral-400 bg-neutral-50" : course.area.includes("Honours") ? "border-l-purple-600 bg-purple-50/40" : "border-l-emerald-700 bg-emerald-50/40";
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl border border-neutral-100 border-l-4 ${color} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-emerald-800">{displayCode}</p>
          <h4 className="mt-1 font-medium text-neutral-950">{course.title}</h4>
          <p className="mt-2 text-xs text-neutral-500">Prereq / restriction: {course.prereq}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-600 shadow-sm">{course.credits} cr</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{course.note}</p>
    </motion.div>
  );
}

function isComplementaryChoice(course) {
  return course.area !== "Elective" && (course.code.includes("Comp") || course.code.includes("Option"));
}

function sanitizePlacementCounts(basePlan, electiveCounts, complementaryCounts, electiveNeeded, complementaryNeeded) {
  let electivesLeft = electiveNeeded;
  let complementariesLeft = complementaryNeeded;
  const safeElectives = {};
  const safeComplementaries = {};

  for (const semester of basePlan) {
    const capacity = semester.courses.length;
    const requestedElectives = Number(electiveCounts[semester.term] || 0);
    const electiveCount = Math.min(requestedElectives, capacity, electivesLeft);
    safeElectives[semester.term] = electiveCount;
    electivesLeft -= electiveCount;

    const requestedComplementaries = Number(complementaryCounts[semester.term] || 0);
    const complementaryCount = Math.min(requestedComplementaries, Math.max(0, capacity - electiveCount), complementariesLeft);
    safeComplementaries[semester.term] = complementaryCount;
    complementariesLeft -= complementaryCount;
  }

  return {
    electiveCounts: safeElectives,
    complementaryCounts: safeComplementaries,
    electivePlaced: electiveNeeded - electivesLeft,
    complementaryPlaced: complementaryNeeded - complementariesLeft
  };
}

function applyPlacementCounts(plan, electiveCounts, complementaryCounts) {
  const fixedCodes = new Set(["FINE 440D1", "FINE 440D2", "FINE 450D1", "FINE 450D2"]);
  const fixedByTerm = Object.fromEntries(plan.map((semester) => [semester.term, semester.courses.filter((course) => fixedCodes.has(course.code))]));
  const movable = plan.flatMap((semester) => semester.courses.filter((course) => !fixedCodes.has(course.code)));
  const electiveQueue = movable.filter((course) => course.area === "Elective");
  const complementaryQueue = movable.filter((course) => isComplementaryChoice(course));
  const courseQueue = movable.filter((course) => course.area !== "Elective" && !isComplementaryChoice(course));
  const hasPlacementRequest =
    Object.values(electiveCounts).some((value) => Number(value || 0) > 0) ||
    Object.values(complementaryCounts).some((value) => Number(value || 0) > 0);

  if (!hasPlacementRequest) return plan;

  return plan.map((semester) => {
    const originalCount = semester.courses.length;
    const fixed = fixedByTerm[semester.term] || [];
    const capacity = Math.max(0, originalCount - fixed.length);

    const requestedElectives = Math.min(Number(electiveCounts[semester.term] || 0), capacity, electiveQueue.length);
    const chosenElectives = electiveQueue.splice(0, requestedElectives);

    const remainingAfterElectives = Math.max(0, capacity - chosenElectives.length);
    const requestedComplementaries = Math.min(Number(complementaryCounts[semester.term] || 0), remainingAfterElectives, complementaryQueue.length);
    const chosenComplementaries = complementaryQueue.splice(0, requestedComplementaries);

    const courses = [...fixed, ...chosenElectives, ...chosenComplementaries];

    while (courses.length < originalCount) {
      const nextCourse = courseQueue.shift() || complementaryQueue.shift() || electiveQueue.shift();
      if (!nextCourse) break;
      courses.push(nextCourse);
    }

    return { ...semester, courses };
  }).filter((semester) => semester.courses.length > 0);
}

function SemesterCard({ semester }) {
  const credits = semester.courses.reduce((s, c) => s + c.credits, 0);
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">Semester</p>
          <h3 className="font-serif text-2xl font-black text-neutral-950">{semester.term}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-neutral-950">{credits}</p>
          <p className="text-xs text-neutral-500">credits</p>
        </div>
      </div>
      <div className="space-y-3">{semester.courses.map((c, i) => <CourseRow key={`${semester.term}-${c.code}-${i}`} course={c} />)}</div>
    </section>
  );
}

export default function McGillBComPlanner() {
  const [step, setStep] = useState(0);
  const [startYear, setStartYear] = useState("U1");
  const [programId, setProgramId] = useState("honours-him");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState(defaultClassCounts("U1"));
  const [electiveCounts, setElectiveCounts] = useState({});
  const [complementaryCounts, setComplementaryCounts] = useState({});

  const program = programs.find((p) => p.id === programId) || programs[0];
  const requiredClassCount = useMemo(() => getPool(program, startYear).length, [program, startYear]);
  const minimumLastTerm = program.special === "him" ? "U3 Winter" : null;
  const terms = useMemo(() => getDynamicTerms(startYear, counts, requiredClassCount, minimumLastTerm), [startYear, counts, requiredClassCount, minimumLastTerm]);
  const basePlan = useMemo(() => buildPlan(program, startYear, counts, terms), [program, startYear, counts, terms]);
  const electiveNeeded = useMemo(() => basePlan.flatMap((semester) => semester.courses).filter((course) => course.area === "Elective").length, [basePlan]);
  const complementaryNeeded = useMemo(() => basePlan.flatMap((semester) => semester.courses).filter((course) => isComplementaryChoice(course)).length, [basePlan]);
  const safePlacements = useMemo(() => sanitizePlacementCounts(basePlan, electiveCounts, complementaryCounts, electiveNeeded, complementaryNeeded), [basePlan, electiveCounts, complementaryCounts, electiveNeeded, complementaryNeeded]);
  const electivePlaced = safePlacements.electivePlaced;
  const complementaryPlaced = safePlacements.complementaryPlaced;
  const plan = useMemo(() => applyPlacementCounts(basePlan, safePlacements.electiveCounts, safePlacements.complementaryCounts), [basePlan, safePlacements]);
  const totalCredits = plan.reduce((s, sem) => s + sem.courses.reduce((x, c) => x + c.credits, 0), 0);
  const baseTermCount = startYear === "U0" ? baseU0Terms.length : baseU1Terms.length;
  const addedSemesters = Math.max(0, terms.length - baseTermCount);
  const displayedYears = Math.ceil(terms.length / 2);
  const plannedClassCounts = useMemo(() => Object.fromEntries(plan.map((semester) => [semester.term, semester.courses.length])), [plan]);
  const placementComplete = electivePlaced === electiveNeeded && complementaryPlaced === complementaryNeeded;
  const visiblePrograms = programs.filter((p) => {
    const matchesFilter = filter === "All" || p.kind === filter;
    const q = search.toLowerCase();
    const matchesSearch = !q || `${p.name} ${p.kind}`.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  function chooseStart(value) {
    setStartYear(value);
    setCounts(defaultClassCounts(value));
  }

  function updateCount(term, value) {
    setCounts((prev) => ({ ...prev, [term]: Number(value) }));
  }

  function updateElectiveCount(term, value) {
    setElectiveCounts((prev) => {
      const nextValue = Number(value);
      const currentSafe = safePlacements.electiveCounts[term] || 0;
      const remainingAfterOtherTerms = electiveNeeded - electivePlaced + currentSafe;
      const semesterRoom = Math.max(0, (plannedClassCounts[term] || 0) - (safePlacements.complementaryCounts[term] || 0));
      const maxForThisTerm = Math.min(3, semesterRoom, remainingAfterOtherTerms);
      return { ...prev, [term]: Math.min(nextValue, maxForThisTerm) };
    });
  }

  function updateComplementaryCount(term, value) {
    setComplementaryCounts((prev) => {
      const nextValue = Number(value);
      const currentSafe = safePlacements.complementaryCounts[term] || 0;
      const remainingAfterOtherTerms = complementaryNeeded - complementaryPlaced + currentSafe;
      const semesterRoom = Math.max(0, (plannedClassCounts[term] || 0) - (safePlacements.electiveCounts[term] || 0));
      const maxForThisTerm = Math.min(3, semesterRoom, remainingAfterOtherTerms);
      return { ...prev, [term]: Math.min(nextValue, maxForThisTerm) };
    });
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-neutral-950">
      {step === 0 && (
        <main className="mx-auto max-w-5xl px-6 py-12 text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl font-serif text-5xl font-black leading-tight sm:text-7xl">
            Plan your <span className="text-red-600">BCom</span> journey, semester by semester.
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-500">
            See which courses to take, when to take them, and how the plan changes based on starting year, program, and number of classes per semester.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <StepCard n="1" title="Tell us your starting year">U0 for non-CEGEP, or U1 if you finished Quebec CEGEP and received advanced standing.</StepCard>
            <StepCard n="2" title="Choose your program">Major, Concentration, or Honours — including Honours in Investment Management.</StepCard>
            <StepCard n="3" title="Set classes per semester">Pick exactly how many classes you want each term, then see your full roadmap.</StepCard>
          </div>
          <button onClick={() => setStep(1)} className="mt-12 inline-flex items-center gap-3 rounded-full bg-red-600 px-10 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">
            Build my schedule <ArrowRight size={18} />
          </button>
        </main>
      )}

      {step === 1 && (
        <main className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Step 1 of 3 — Starting year</p>
          <h1 className="mt-3 font-serif text-4xl font-black">When are you starting your BCom?</h1>
          <p className="mt-4 max-w-2xl leading-8 text-neutral-500">Your starting year changes the first courses and total credits. Quebec CEGEP students usually start in U1 with 90 credits remaining.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <button onClick={() => chooseStart("U0")} className={`rounded-2xl border p-7 text-left transition ${startYear === "U0" ? "border-red-500 bg-white shadow-md" : "border-neutral-200 bg-white hover:border-red-200"}`}>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-blue-700">U0 · Foundation year</span>
              <h2 className="mt-5 text-2xl font-black">Starting in U0</h2>
              <p className="mt-3 leading-7 text-neutral-500">You are coming from high school outside Quebec or without CEGEP advanced standing. Plan is usually 4 years / 120 credits.</p>
              <hr className="my-5" />
              <p className="text-sm"><b>First courses:</b> MATH 122, ECON 208, electives</p>
            </button>
            <button onClick={() => chooseStart("U1")} className={`rounded-2xl border p-7 text-left transition ${startYear === "U1" ? "border-red-500 bg-white shadow-md" : "border-neutral-200 bg-white hover:border-red-200"}`}>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-700">U1 · First business year</span>
              <h2 className="mt-5 text-2xl font-black">Starting in U1</h2>
              <p className="mt-3 leading-7 text-neutral-500">You completed Quebec CEGEP or equivalent advanced standing. Plan is usually 3 years / 90 credits.</p>
              <hr className="my-5" />
              <p className="text-sm"><b>First courses:</b> MGCR 211, MGCR 233, MGCR 271</p>
            </button>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => setStep(0)} className="text-sm text-neutral-500 underline">Back</button>
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 font-bold text-white">Continue <ChevronRight size={18} /></button>
          </div>
        </main>
      )}

      {step === 2 && (
        <main className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Step 2 of 3 — Your program</p>
          <h1 className="mt-3 font-serif text-4xl font-black">Which program are you in?</h1>
          <p className="mt-4 max-w-2xl leading-8 text-neutral-500">Choose your major, concentration, or honours program. Honours in Investment Management is included and uses verified finance/HIM prerequisites where available.</p>
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-red-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent outline-none" placeholder="Search programs, e.g. Finance, Marketing..." />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "All", "Major", "Concentration", "Honours"
            ].map((f) => <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>)}
          </div>
          <div className="mt-6 grid max-h-[460px] gap-3 overflow-y-auto pr-2 md:grid-cols-3">
            {visiblePrograms.map((p) => (
              <button key={p.id} onClick={() => setProgramId(p.id)} className={`rounded-xl border p-5 text-left transition ${programId === p.id ? "border-red-500 bg-white shadow-md" : "border-neutral-200 bg-white hover:border-red-200"}`}>
                <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${p.kind === "Honours" ? "bg-purple-50 text-purple-700" : p.kind === "Major" ? "bg-blue-50 text-blue-700" : "bg-indigo-50 text-indigo-700"}`}>{p.kind}</span>
                <h3 className="mt-4 font-semibold">{p.name}</h3>
                <p className="mt-3 text-sm text-neutral-500">{p.kind === "Concentration" ? `${p.programCredits} concentration credits` : `${p.credits} program credit weight`}</p>
              </button>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => setStep(1)} className="text-sm text-neutral-500 underline">Back</button>
            <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 font-bold text-white">Continue <ChevronRight size={18} /></button>
          </div>
        </main>
      )}

      {step === 3 && (
        <main className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Step 3 of 3 — Classes per semester</p>
          <h1 className="mt-3 font-serif text-4xl font-black">How many classes do you want each semester?</h1>
          <p className="mt-4 max-w-3xl leading-8 text-neutral-500">Choose the number of classes for every semester. If 3 or 4 classes per semester is not enough to finish on time, the planner automatically adds U4/U5 extra semesters. You can also place elective and complementary option classes by semester.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
              <p className="text-4xl font-black text-red-600">{electiveNeeded}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">elective class{electiveNeeded === 1 ? "" : "es"} needed</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
              <p className="text-4xl font-black text-neutral-950">{electivePlaced}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">electives placed</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
              <p className="text-4xl font-black text-emerald-700">{complementaryNeeded}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">complementary option{complementaryNeeded === 1 ? "" : "s"} needed</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
              <p className="text-4xl font-black text-neutral-950">{complementaryPlaced}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">complementaries placed</p>
            </div>
          </div>
          {!placementComplete && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-900">
              <b>Placement required:</b> Before seeing the roadmap, place all required electives and complementary options. You still need to place {electiveNeeded - electivePlaced} elective{electiveNeeded - electivePlaced === 1 ? "" : "s"} and {complementaryNeeded - complementaryPlaced} complementary option{complementaryNeeded - complementaryPlaced === 1 ? "" : "s"}.
            </div>
          )}
          {placementComplete && (electiveNeeded > 0 || complementaryNeeded > 0) && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
              <b>Ready:</b> All elective and complementary option slots have been placed by semester.
            </div>
          )}
          {addedSemesters > 0 && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
              <b>Extra time added:</b> With your current class choices, this plan needs {addedSemesters} extra semester{addedSemesters === 1 ? "" : "s"}. The extra semester boxes below were added automatically, and you can change the number of classes in them.
            </div>
          )}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {terms.map((term) => {
              const baseTerms = startYear === "U0" ? baseU0Terms : baseU1Terms;
              const selected = counts[term] || inferExtraTermCount(counts, startYear);
              const planned = plannedClassCounts[term] || selected;
              return (
                <CourseLoadPicker
                  key={term}
                  term={term}
                  value={selected}
                  planned={planned}
                  isExtra={!baseTerms.includes(term)}
                  onChange={updateCount}
                  electiveCount={safePlacements.electiveCounts[term] || 0}
                  electiveNeeded={electiveNeeded}
                  electivePlaced={electivePlaced}
                  onElectiveCountChange={updateElectiveCount}
                  complementaryCount={safePlacements.complementaryCounts[term] || 0}
                  complementaryNeeded={complementaryNeeded}
                  complementaryPlaced={complementaryPlaced}
                  onComplementaryCountChange={updateComplementaryCount}
                />
              );
            })}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => setStep(2)} className="text-sm text-neutral-500 underline">Back</button>
            <button disabled={!placementComplete} onClick={() => placementComplete && setStep(4)} className={`inline-flex items-center gap-2 rounded-full px-8 py-3 font-bold transition ${placementComplete ? "bg-red-600 text-white hover:bg-red-700" : "cursor-not-allowed bg-neutral-300 text-neutral-500"}`}>See my roadmap <ChevronRight size={18} /></button>
          </div>
        </main>
      )}

      {step === 4 && (
        <div>
          <header className="sticky top-0 z-20 border-b border-neutral-200 bg-[#f7f5f1]/95 px-6 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 font-serif font-black text-white">M</div>
                <div>
                  <h2 className="font-semibold">{program.name}</h2>
                  <p className="text-xs text-neutral-500">{startYear} entry · {program.kind} · {program.kind === "Concentration" ? program.programCredits : program.credits} program credit weight · {totalCredits} credits shown</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setStep(2)} className="text-sm font-medium text-red-600">Change program</button>
                <button onClick={() => setStep(3)} className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-medium">Change classes</button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-6 py-10">
            <p className="text-sm text-neutral-500">Desautels Faculty of Management</p>
            <h1 className="mt-2 font-serif text-4xl font-black">{program.name} — Course Progression Chart</h1>
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center"><p className="text-3xl font-black">{program.kind === "Concentration" ? program.programCredits : program.credits}</p><p className="text-sm text-neutral-500">program credit weight</p></div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center"><p className="text-3xl font-black">{program.programCredits}</p><p className="text-sm text-neutral-500">area credits</p></div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center"><p className="text-3xl font-black">{totalCredits}</p><p className="text-sm text-neutral-500">credits shown</p></div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center"><p className="text-3xl font-black">{displayedYears}</p><p className="text-sm text-neutral-500">years shown</p></div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center"><p className="text-3xl font-black">{terms.length}</p><p className="text-sm text-neutral-500">semesters shown</p></div>
            </div>

            <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-600" /> Math / Quant / Foundation</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-700" /> Core / Program</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-600" /> Economics</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-purple-600" /> Honours</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-600" /> Capstone</span>
                <span className="italic">Click Change classes to adjust semester load or place elective classes by semester. The scheduler checks prerequisite rules globally: true prerequisites must be completed in an earlier semester, corequisites may be placed in the same semester, and term-locked courses stay in the correct Fall/Winter sequence.</span>
              </div>
            </div>

            {addedSemesters > 0 && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
                <b>Longer roadmap:</b> Because of the selected number of classes per semester, this plan extends beyond the standard timeline. Extra semesters are marked in Step 3 and shown here in the progression chart.
              </div>
            )}

            {program.kind === "Major" && program.id !== "major-im" && program.id !== "major-econ" && (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
                <b>Credit note:</b> McGill lists the major's program credit weight as 72 credits for most majors: 42 core credits plus 30 major credits. The full U1 BCom still reaches 90 credits after electives.
              </div>
            )}

            {program.kind !== "Honours" && program.bank !== "him" && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
                <b>Complementary course note:</b> This planner now avoids turning program requirements into random electives. When McGill lets students choose from a complementary course list, the roadmap shows a “Complementary Option” slot. Students should pick the exact course from the current McGill program page and confirm prerequisites/availability in Minerva.
              </div>
            )}

            {program.id === "major-finance" && (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
                <b>Finance Major note:</b> The planner now includes the Finance complementary requirement as 12 credits: 9–12 credits from undergraduate FINE courses, and 0–3 credits from the approved ACCT list. These appear as complementary option slots instead of generic electives.
              </div>
            )}

            {program.special === "him" && (
              <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5 text-sm leading-7 text-purple-900">
                <b>HIM note:</b> Official McGill Course Catalogue data lists Investment Management Honours as 87 program credit weight. The planner uses only that official value: 42 core credits plus 45 Honours area credits. It does not add an extra elective to HIM unless McGill lists it in the official requirement page. The planner locks the split courses into the correct sequence: FINE 440D1 in Fall, FINE 440D2 in the next Winter, FINE 450D1 in Fall, and FINE 450D2 in the next Winter. FINE 541N1/N2 are not listed inside the HIM program requirements, so they are not included. Quantitative and Industry Specialization courses are shown as option slots because students must pick from the current McGill HIM lists and confirm Minerva/eCalendar availability.
              </div>
            )}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {plan.map((semester) => <SemesterCard key={semester.term} semester={semester} />)}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
