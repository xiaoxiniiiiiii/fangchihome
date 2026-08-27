import fs from 'node:fs'; import path from 'node:path'; import sharp from 'sharp';
const root=process.cwd(), source=path.join(root,'public','source-sheets'), out=path.join(root,'public','products'); fs.mkdirSync(out,{recursive:true});
const sheets=fs.readdirSync(source).filter(x=>x.endsWith('.png')).sort();
if(!sheets.length){console.log('No source sheets found.');process.exit(0)}
let generated=0; for(let sheetIndex=0; sheetIndex<sheets.length; sheetIndex++){const file=sheets[sheetIndex]; const input=sharp(path.join(source,file)); const meta=await input.metadata(); const cols=4, rows=3, w=Math.floor(meta.width/cols), h=Math.floor(meta.height/rows); for(let cell=0;cell<10;cell++){const row=Math.floor(cell/cols), col=cell%cols, id=sheetIndex*10+cell+1; await sharp(path.join(source,file)).extract({left:col*w,top:row*h,width:w,height:h}).resize(720,720,{fit:'cover'}).webp({quality:84}).toFile(path.join(out,`catalog-${String(id).padStart(2,'0')}.webp`)); generated++}}
console.log(`Generated ${generated} local WebP product images.`);
