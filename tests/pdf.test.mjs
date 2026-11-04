import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {rotatePages,numberPages} from '../dist/pdf-core.mjs';
const require=createRequire(import.meta.url),PDF=require('../dist/assets/vendor/pdf-lib.min.js');
test('PDF rotation survives serialization and changes only selected pages once',async()=>{
 const doc=await PDF.PDFDocument.create();doc.addPage([300,400]);doc.addPage([300,400]).setRotation(PDF.degrees(270));
 rotatePages(PDF,doc,[1,1],180);const saved=await PDF.PDFDocument.load(await doc.save());
 assert.equal(saved.getPageCount(),2);assert.equal(saved.getPage(0).getRotation().angle,0);assert.equal(saved.getPage(1).getRotation().angle,90);
 assert.throws(()=>rotatePages(PDF,doc,[2],90));assert.throws(()=>rotatePages(PDF,doc,[0],45));
});
test('PDF numbering adds actual text streams with custom start and keeps all pages',async()=>{
 const doc=await PDF.PDFDocument.create();doc.addPage([300,400]);doc.addPage([300,400]);
 await numberPages(PDF,doc,{start:4,position:'right',size:12});const saved=await PDF.PDFDocument.load(await doc.save());
 assert.equal(saved.getPageCount(),2);
 for(const [i,p]of saved.getPages().entries()){
  const streams=p.node.Contents();assert.ok(streams.size()>0);
  const decoded=PDF.decodePDFRawStream(saved.context.lookup(streams.get(0))).decode();
  const content=new TextDecoder().decode(decoded);assert.ok(content.includes(Buffer.from(`Page ${i+4} of 5`).toString('hex').toUpperCase()),content);
 }
 await assert.rejects(()=>numberPages(PDF,doc,{start:-1}));
});
