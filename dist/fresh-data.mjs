export const freshCategories=[{id:'education',name:'Education & worksheets',icon:'book'}];
export const latestTools=[
 {id:'text-to-speech',title:'Text to speech',description:'Listen to your text with your browser’s voices, speed and pitch controls.',category:'text',icon:'headphones',kind:'speech'},
 {id:'text-formatter',title:'All-in-one text formatter',description:'Change case, clean spaces, count words and copy tidy text.',category:'text',icon:'type',kind:'formatter'},
 {id:'anime-character',title:'Anime character creator',description:'Design an original chibi character. Choose hair, eyes, outfits and accessories.',category:'creators',icon:'spark',kind:'anime'},
 {id:'kids-worksheets',title:'Kids’ printable worksheets',description:'Create alphabet, math, handwriting and coloring sheets. Print or download.',category:'education',icon:'book',kind:'worksheets'}
];
export const latestDetails={
 'text-to-speech':['Read text aloud using the speech voices supplied by your browser or operating system. Choose a voice and adjust speed, pitch and volume without a Nepocore account.','Paste a short paragraph, choose an available English voice and press Speak. Pause, resume or stop the reading whenever you need.','Voice availability depends on your device. Some system voices use an online service. This tool plays speech; the browser API does not provide an audio-file export.'],
 'text-formatter':['Format text in one place: uppercase, lowercase, title case, sentence case, whitespace cleanup and live word counts. Undo a change, copy the output or download a text file.','Paste a paragraph with extra spaces, choose Clean spacing, then check the word count and copy the tidy result.','Remove all whitespace also removes line breaks. Case conversion follows your browser’s Unicode rules; proofread names and language-specific capitalization.'],
 'anime-character':['Create a customizable original chibi-style anime character from vector artwork. Change the hairstyle, colors, expression, outfit, accessory and background, then download PNG or editable SVG.','Design a blue-haired character with a hoodie and headphones. Choose a transparent background and download a PNG for your profile or a creative project.','This is a character builder with illustrated parts, not a photo-to-anime or AI portrait service. The exported artwork uses your chosen design, without an account or paid API.'],
 'kids-worksheets':['Generate free printable alphabet, arithmetic, handwriting and coloring worksheets in the Education section. Choose A4 or US Letter, preview the page and download PDF, PNG or SVG, or print the pages.','Create 20 subtraction problems with an answer key, trace a child’s first name, practice the alphabet or print a friendly animal coloring page.','Check the preview before printing. Handwriting uses pale tracing letters with writing guides. Download PDF creates the chosen paper size directly. Printing uses your browser’s print dialog; turn off headers and footers for a clean page.']
};
export const latestAliases={
 'text-to-speech':'tts voice read aloud reader speak pronunciation audio',
 'text-formatter':'uppercase lowercase remove spaces word count character count title sentence tidy',
 'anime-character':'anime avatar maker character chibi dress up custom cartoon creator png svg',
 'kids-worksheets':'education children kids printable alphabet abc math maths handwriting tracing coloring colouring worksheet kindergarten school homework pdf'
};

export const latestSteps={
 'text-to-speech':['Type or paste the text you want to hear.','Choose an available voice, speed, pitch and volume.','Press Speak text. Use Pause, Resume or Stop to control playback.'],
 'text-formatter':['Paste your text and check the live counts.','Choose a formatting action or undo a change.','Copy the formatted result or download a TXT file.'],
 'anime-character':['Choose your character’s hairstyle, expression and colors.','Try an outfit, accessory and background.','Download the finished character as PNG or editable SVG.'],
 'kids-worksheets':['Choose alphabet, math, handwriting or coloring and your paper size.','Customize the practice sheet and review the page preview.','Download PDF, PNG or SVG, or print. Math can include an answer key.'],
 'qr-code':['Enter the text or URL to encode.','Choose a style, dark code color and light background.','Download PNG or SVG, then verify the code with a scanner.']
};
