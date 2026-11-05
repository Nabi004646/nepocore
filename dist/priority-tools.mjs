// Task-specific instructions shared by the HTML and plain-text tool pages.
export const priorityTools={
 'image-compressor':{
  keyword:'compress image to 100 KB without upload',
  title:'Compress Images to a Target KB Size — No Upload | Nepocore',
  heading:'Image compressor with a target file size',
  description:'Compress photos to a target KB size in your browser. Choose JPEG or WebP, set maximum width and compare actual bytes before downloading.',
  intro:'Prepare a photo for an upload limit. Set a target in KB, keep control of dimensions, and check the actual output size before downloading.',
  purpose:'Compress a browser-readable photo to JPEG or WebP on your device. Use manual quality for visual control, or choose a target file size such as 100 KB. Target mode searches export quality at the chosen dimensions and clearly reports whether the limit was met.',
  steps:['Choose your image and check the visible original preview. Inputs are limited to 25 MB and 24 megapixels.','Choose JPEG or WebP and set Maximum width. The tool keeps the proportions and does not enlarge a smaller image.','Choose a Target file size in KB, or leave it at 0 for manual quality. Run Compress image.','Check the exact byte count, dimensions and target status. Inspect text and faces before downloading the copy.'],
  example:'For a form asking for a JPEG under 100 KB, choose JPEG, enter 100 in Target file size and start with the maximum width the form permits. If the target is not met, lower the width and try again. This tool treats 100 KB as 100,000 bytes.',
  tip:'A file-size target is not guaranteed. Target mode keeps the chosen dimensions and tries qualities from 1 to 100. Lowering width may be necessary. JPEG replaces transparency with white, and animated inputs become one still frame.',
  sections:[
   {title:'Fit an upload limit without guessing',paragraphs:['An application form can impose three separate requirements: image format, pixel dimensions and maximum file size. Meeting only the KB limit is not enough. Read all three requirements before processing the image, then use the preview and the exported dimensions to check your copy.','In target mode, Nepocore tries a bounded search of browser encoder quality settings and keeps an output only after measuring its actual bytes. It shows Target met or Target not met. It does not rename an oversized file or label the quality slider as a percentage of detail preserved.']},
   {title:'Choose the next adjustment',table:{headers:['What you see','What to try'],rows:[['Target not met','Reduce maximum width if the receiving service permits it, then compress again.'],['Blurred lettering','Use a higher quality or larger allowed dimensions; inspect at normal viewing size.'],['Output larger than original','Keep the original when it already meets the requirements.'],['Transparent logo','Use WebP if accepted, or the PNG image converter when preserving transparency matters.']]}},
  ],
  questions:[['Can I compress an image to 50 KB, 100 KB or 200 KB?','Enter 50, 100 or 200 as the target. The result measures against 50,000, 100,000 or 200,000 bytes. Some images cannot fit at the chosen dimensions; check the status and reduce the width if allowed.'],['Is the quality setting the amount of detail retained?','No. It is a browser encoder setting. Different photographs and browsers can produce different sizes and artifacts at the same setting. Inspect the exported image.'],['Is the original photo uploaded or overwritten?','Processing takes place in your browser. The download is a new copy, and the original is not overwritten by the tool.']],
  related:[['image-resizer','Set exact image dimensions'],['image-converter','Convert PNG, JPEG and WebP'],['passport-photo','Arrange a photo for printing']],
  sources:[['MDN: canvas image export and quality','https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob']]
 },
 'pdf-compressor':{
  keyword:'compress PDF locally without upload',
  title:'PDF Compressor — Local Processing, Clear Tradeoffs | Nepocore',
  heading:'Compress a PDF in your browser',
  description:'Reduce PDF size locally with a structure rewrite or an image-based copy. Compare original and output bytes, with clear text and form limitations.',
  intro:'Make a PDF copy on your device. Compare file size and choose whether keeping selectable text or reducing a scanned document matters most.',
  purpose:'Create a PDF copy using one of two methods. Structure rewrite saves the document without intentionally rendering its pages as pictures. Image-based copy renders each page as JPEG at your chosen resolution and quality. Neither method promises that every PDF will shrink.',
  steps:['Choose an unprotected PDF of up to 30 MB and wait for its page count to appear.','Start with Structure rewrite when selectable text and document features matter.','For a scan, consider Image-based copy and choose Raster resolution and JPEG quality. This method supports up to 40 pages.','Create the copy, compare input and output bytes, then open the downloaded PDF and inspect every important page. Keep the original.'],
  example:'For a photo-heavy scan, try an image-based copy at 120 DPI and 65% JPEG quality. Inspect small text and stamps. If they are unclear, raise the resolution or keep the original. These are starting settings, not a promised size reduction.',
  tip:'Rewriting a PDF changes its bytes and can invalidate digital signatures. Image-based copies remove selectable text, links, forms and annotations. A structure rewrite is not a guarantee that every advanced PDF feature is preserved.',
  sections:[
   {title:'Choose a compression method for your document',table:{headers:['Method','Useful starting point','Tradeoff to check'],rows:[['Structure rewrite','Text-based documents where page rasterization is undesirable','May make little difference or increase file size; verify document features.'],['Image-based copy','Large scans where a readable picture of each page is sufficient','Text is no longer selectable and interactive features are removed.']]}},
   {title:'Check more than the file size',paragraphs:['Open the new file before submitting it. Check page count, orientation, small text, stamps and any required signatures. If the recipient needs searchable text, accessible reading order or fillable fields, an image-based copy can make the document unsuitable even when it is smaller.','A PDF already optimized by its creator may not shrink. Nepocore reports the measured percentage change and offers the original alongside the new file. There is no guaranteed 100 KB or 1 MB result. Avoid repeated recompression of the only copy of an important document.']},
  ],
  questions:[['Can this compress a PDF without uploading it?','Yes. PDF processing uses locally loaded browser libraries. The PDF contents are not sent to a Nepocore processing server. The libraries and page assets still need to load.'],['Why did my PDF get larger?','The original may already use efficient compression, while a new structure or raster copy can add data. Compare the measured output with the original and retain the smaller suitable version.'],['Can I process a password-protected PDF?','No. Choose an unprotected copy that you are authorized to process.']],
  related:[['pdf-extract','Extract only the pages you need'],['pdf-merge','Combine PDF files'],['pdf-to-images','Export PDF pages as images']],
  sources:[['pdf-lib: document creation and modification','https://pdf-lib.js.org/'],['PDF.js: browser rendering engine','https://mozilla.github.io/pdf.js/']]
 },
 'resume-builder':{
  keyword:'free resume builder PDF no signup',
  title:'Free Resume Builder — PDF, No Signup or Watermark | Nepocore',
  heading:'Free resume builder with PDF export',
  description:'Build a single-column resume with live preview and optional sections. Save as PDF or HTML in your browser, with no account, payment or watermark.',
  intro:'Write a clear resume, review it as you type, and save a PDF through your browser. No account, payment or added watermark.',
  purpose:'Build a readable single-column resume from your own name, contact details, profile, experience, education and skills. The preview updates as you type. Leave optional sections blank to omit them, then use Print / Save PDF or download an HTML copy.',
  steps:['Replace the example name and contact line with details you want to share.','Add a role headline and your own profile, experience, education and skills. Leave sections you do not need blank.','Review the live preview. Keep claims accurate and adapt the evidence to the role you are applying for.','Choose Print / Save PDF, select your browser’s PDF destination, inspect page breaks and turn off browser headers and footers if necessary.'],
  example:'For a first developer application, describe a real coursework or personal project in the Experience section: what you built, which technologies you used and what you verified. Include results only when you can support them. You do not need to invent employment to fill the page.',
  tip:'PDF export uses the browser print dialog rather than a direct PDF download. Print options vary by device. The builder does not automatically save your draft; export a copy before leaving. No hiring outcome or universal ATS compatibility is promised.',
  sections:[
   {title:'Write useful evidence for a first resume',paragraphs:['Start with the role you want, then choose education, projects, volunteering or work that demonstrates relevant skills. A specific contribution is more useful than an unsupported label such as expert. Describe your action and the result you can honestly explain in an interview.','For example, “Built a responsive class timetable with HTML, CSS and JavaScript; checked its printable layout on a phone and laptop” describes a concrete task. This is a writing example, not text to copy as your own experience. Add dates and links in the fields where they help the reader verify your work.']},
   {title:'Before sending the PDF',table:{headers:['Check','Why it matters'],rows:[['Contact details','A recruiter needs a working way to reach you.'],['Example text removed','Default names and qualifications are not your application.'],['Page breaks and text selection','The saved document should remain readable and copyable.'],['Employer instructions','Some applications ask for a particular file format or additional documents.']]}},
  ],
  questions:[['Is the PDF export free?','Yes. There is no payment step, subscription or Nepocore watermark. Select Save as PDF or the equivalent destination in your browser print dialog.'],['Can I make a resume with no work experience?','Yes. Use accurate project, volunteering or education details that support the role. Optional sections can be omitted; the tool does not invent qualifications or experience.'],['Does the site store my resume?','This builder does not automatically save or upload the entered resume. Download an HTML copy or save the PDF before closing the page.']],
  related:[['cover-letter','Write a matching cover letter'],['word-counter','Check a short profile or statement'],['pdf-compressor','Check a PDF upload size']],
  sources:[['Harvard MCS: creating a strong resume','https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/']]
 },
 'ielts-overall':{
  keyword:'IELTS overall band calculator rounding examples',
  title:'IELTS Overall Band Calculator — Rounding & Examples | Nepocore',
  heading:'IELTS overall band score calculator',
  description:'Calculate your IELTS overall band from four section scores. See the exact average, official rounding rule and worked 6.25 and 7.75 examples.',
  intro:'Enter four awarded section bands to see the average and rounded overall score. Try the examples to understand half-band boundaries.',
  purpose:'Add Listening, Reading, Writing and Speaking band scores, divide by four, then round to the nearest whole or half band using IELTS scoring guidance. This calculation uses component bands, not raw correct-answer totals.',
  steps:['Choose your Listening, Reading, Writing and Speaking bands from 0 to 9 in half-band steps.','Select Calculate overall band, or try one of the worked example buttons.','Compare Average before rounding with the overall result. An average ending in .25 rounds up to a half band; .75 rounds up to the next whole band.','Check the receiving institution’s individual section requirements separately. The overall number alone does not establish eligibility.'],
  example:'Listening 6.5 + Reading 6.5 + Writing 5.0 + Speaking 7.0 = 25.0. Divide by four to get 6.25, which rounds to overall 6.5. The Writing band remains 5.0.',
  tip:'This is an independent arithmetic tool, not an official score report or an affiliation with IELTS. Raw-score conversions for Reading and Listening are estimates in separate tools. Admission, visa and test-validity requirements must be checked with the recipient.',
  sections:[
   {title:'Worked IELTS rounding examples',table:{headers:['Listening / Reading / Writing / Speaking','Average','Overall'],rows:[['6.5 / 6.5 / 5.0 / 7.0','6.25','6.5'],['6.5 / 6.5 / 5.5 / 6.0','6.125','6.0'],['8.0 / 8.0 / 7.5 / 7.5','7.75','8.0'],['7.5 / 7.0 / 6.5 / 7.0','7.0','7.0']]}},
   {title:'Overall band and section minimums answer different questions',paragraphs:['Rounding changes the overall reported band; it does not raise a low Writing or Speaking score. If a programme asks for an overall score plus a minimum in every section, compare both conditions against its current published requirements.','Academic and General Training use the same overall averaging method. Their Reading raw-mark interpretations can differ. Use the appropriate raw-score tool when you have a practice mark out of 40, then treat the conversion as indicative rather than a promised official result.']},
  ],
  questions:[['Does an average of 6.25 become 6.5?','Yes. IELTS rounds an average ending in .25 up to the next half band. An average of 6.125 rounds to 6.0 instead.'],['Does 7.75 round to 8.0?','Yes. An average ending in .75 rounds up to the next whole band. Add all four components before applying the rounding rule.'],['Do Academic and General Training use the same overall rule?','Yes. Both average the four component bands and round to the nearest whole or half band. Raw Reading conversions are a separate question.']],
  related:[['ielts-listening','Estimate a Listening practice band'],['ielts-reading','Estimate an Academic or General Reading band'],['typing-test','Practise timed typing']],
  sources:[['IELTS: official overall band scoring and examples','https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail']]
 },
 age:{
  keyword:'age calculator on a specific date years months days',
  title:'Age Calculator on a Specific Date — Years, Months, Days | Nepocore',
  heading:'Age calculator in years, months and days',
  description:'Calculate your age today or on a chosen date. See years, months, days, total days and full weeks, with month-end and leap-year examples.',
  intro:'Find calendar age on today’s date or a chosen application deadline. Check completed years, remaining months and days in one place.',
  purpose:'Calculate Gregorian calendar age between a date of birth and an Age on date. The result shows completed years, remaining months and days, total elapsed days and full weeks. Choose a future or past comparison date on or after the birth date.',
  steps:['Enter Date of birth using your browser’s date picker. This tool uses the Gregorian / AD calendar.','Set Age on date to today, an application deadline or another date you want to compare.','Choose Calculate age. Review the calendar breakdown, total days and full weeks.','Check the month-end convention below when the birth date falls on the 29th, 30th or 31st. For an official application, follow the recipient’s stated age rules.'],
  example:'For a birth date of 15 June 2006 and comparison date of 1 March 2027, the result is 20 years, 8 months and 14 days. The 21st birthday has not yet occurred on that comparison date.',
  tip:'The method clamps monthly anniversaries to the last valid day in shorter months. A 29 February birthday therefore reaches its anniversary on 28 February in a non-leap year in this tool. Institutions may use different conventions. BS dates must be converted separately.',
  sections:[
   {title:'Age on an application deadline',paragraphs:['The date a form asks about can be different from today. Enter the exact stated cutoff in Age on date, then read the completed years and the months-and-days breakdown. Changing the deadline by one day can change whether a birthday has occurred.','This result is calendar arithmetic. It does not interpret a school, employer, government or visa rule and should not be presented as proof of eligibility. Read the recipient’s wording and verify any special treatment of leap-day birthdays.']},
   {title:'Check the date convention with examples',table:{headers:['Date of birth','Age on date','Calendar result'],rows:[['15 June 2006','1 March 2027','20 years, 8 months, 14 days'],['31 January 2026','1 March 2026','0 years, 1 month, 1 day'],['29 February 2000','28 February 2025','25 years, 0 months, 0 days']]}},
   {title:'Why total days is a separate result',paragraphs:['Calendar months have different lengths, so multiplying years by 365 or months by 30 does not reproduce calendar age. Total days counts the elapsed UTC calendar-day boundaries between the entered dates; the birth date itself is not added as an extra day. Full weeks is that total divided by seven, rounded down.']},
  ],
  questions:[['Can I find my age on a future date?','Yes. Set Age on date to the date you need. It must be on or after Date of birth. The result uses that date rather than today.'],['Does this accept Nepali BS dates?','No. This age calculator expects Gregorian / AD dates. Use the separate BS to AD converter within its supported range, then enter the converted date here.'],['Why can another age calculator differ by a day?','Month-end and leap-day conventions can differ. This tool clamps an anniversary to the final valid day of the target month and explains that method in its examples.']],
  related:[['bs-ad-converter','Convert a BS date to AD'],['date-difference','Count days between dates'],['birthday-countdown','Make a birthday or event countdown']],
  sources:[['Nepocore: implemented UTC and month-end calculation','https://github.com/Nabi004646/nepocore/blob/main/dist/core.mjs']]
 }
};

export const priorityIntents=Object.fromEntries(Object.entries(priorityTools).map(([id,p])=>[id,{keyword:p.keyword,title:p.title,heading:p.heading,description:p.description,questions:p.questions}]));
export function priorityHTML(id,e){
 const p=priorityTools[id];if(!p)return '';
 return `<section class="task-reference" aria-label="Worked examples and method">${p.sections.map(s=>`<section><h2>${e(s.title)}</h2>${(s.paragraphs||[]).map(x=>`<p>${e(x)}</p>`).join('')}${s.table?`<div class="table-scroll"><table class="data-table"><thead><tr>${s.table.headers.map(x=>`<th scope="col">${e(x)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(row=>`<tr>${row.map(x=>`<td>${e(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</section>`).join('')}<section><h2>Continue your task</h2><ul>${p.related.map(([tool,label])=>`<li><a href="./tools/${e(tool)}/">${e(label)}</a></li>`).join('')}</ul></section><aside class="method-sources"><h3>Method & references</h3><ul>${p.sources.map(([label,url])=>`<li><a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a></li>`).join('')}</ul><p>References explain the method or writing guidance; they do not endorse Nepocore.</p></aside></section>`;
}

export function priorityMarkdown(id,escape,link){
 const p=priorityTools[id];if(!p)return '';
 return '\n\n'+p.sections.map(s=>'## '+escape(s.title)+'\n\n'+(s.paragraphs||[]).map(escape).join('\n\n')+(s.table?'\n\n| '+s.table.headers.map(escape).join(' | ')+' |\n| '+s.table.headers.map(()=>'---').join(' | ')+' |\n'+s.table.rows.map(row=>'| '+row.map(escape).join(' | ')+' |').join('\n'):'')).join('\n\n')+'\n\n## Task questions\n\n'+p.questions.map(([q,a])=>'### '+escape(q)+'\n\n'+escape(a)).join('\n\n')+'\n\n## Continue your task\n\n'+p.related.map(([id,label])=>'- '+link(label,'tools/'+id+'/')).join('\n')+'\n\n## Method and references\n\n'+p.sources.map(([label,url])=>'- ['+escape(label)+']('+url+')').join('\n');
}
