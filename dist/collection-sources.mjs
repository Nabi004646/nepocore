const paper=['Mifflin et al. — resting energy equation','https://pubmed.ncbi.nlm.nih.gov/2305711/'];
const nhs=['NHS — estimated due date and dating scans','https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/'];
const cycle=['NHS — fertility in the menstrual cycle','https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/'];
const planning=['NHS — fertility-awareness limitations','https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/'];
export const collectionSources={
 bmr:[paper],tdee:[paper,['FAO/WHO/UNU — adult energy requirements and PAL','https://www.fao.org/4/Y5686e/y5686e07.htm']],
 'macro-calculator':[['USDA FNIC — macronutrient energy factors','https://www.nal.usda.gov/programs/fnic']],
 'calories-burned':[['Compendium of Physical Activities — unit conversions','https://pacompendium.com/unite-conversions/']],
 'sleep-planner':[['CDC — sleep duration and sleep needs','https://www.cdc.gov/sleep/about/']],
 'due-date':[nhs], 'pregnancy-weeks':[nhs,['ACOG — fetal development and trimesters','https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy']],
 'period-calendar':[cycle,planning],'ovulation-window':[cycle,planning],
 'contraction-timer':[['NHS — signs of labour','https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/']],
 'bs-ad-converter':[['Nepali Date — bundled MIT calendar data, version 3.4.0','https://github.com/subeshb1/Nepali-Date']],
 'unicode-preeti':[['Lacspace — Preeti conversion library, version 1.1.0','https://developer.lacspace.com/packages/preeti']],
 'neb-grade':[['Nepal CDC — Letter Grading Directive 2078, fourth amendment 2081','https://moecdc.gov.np/content/22/letter-gradinging-directory--2078--fourth-amendment-2081-/']],
 'nepali-holidays':[['Nepal Ministry of Home Affairs — public holidays BS 2083','https://moha.gov.np/page/government-and-public-holidays-in-2083']],
 'nepali-words':[['Nepali number-word vocabulary — MIT source with common-spelling normalization','https://github.com/kushal1o1/nepali-num2word']],
 'sensitivity-converter':[['id Software — Quake III default m_yaw','https://github.com/id-Software/Quake-III-Arena/blob/master/code/client/cl_main.c'],['Valve — Source SDK mouse yaw','https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/client/in_mouse.cpp']],
 passphrase:[['EFF — short word list and passphrase guidance','https://www.eff.org/dice']],
 'certificate-viewer':[['Peculiar Ventures — X.509 parsing library','https://github.com/PeculiarVentures/x509']],
 'csp-builder':[['MDN — Content Security Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP']],
 'gif-maker':[['Modern GIF — local encoding library','https://github.com/qq15725/modern-gif']]
};
