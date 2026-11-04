import {wordSearch,crossword,sudoku} from './puzzle-core.mjs';
self.onmessage=ev=>{const {kind,args}=ev.data;try{const fn={wordSearch,crossword,sudoku}[kind];if(!fn)throw Error('Unknown puzzle request.');self.postMessage({result:fn(...args)});}catch(ex){self.postMessage({error:ex.message});}};
