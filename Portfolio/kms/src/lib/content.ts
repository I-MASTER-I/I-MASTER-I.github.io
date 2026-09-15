import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {AreaConfig,ContentDocument,ContentType} from "@/types/content";

const CONTENT_ROOT=path.join(process.cwd(),"content");
const TYPE_DIR:Record<ContentType,string>={
 home:"00_HOME",
 education:"01_PROFILE/01_EDUCATION",
 certification:"01_PROFILE/02_CERTIFICATIONS",
 award:"01_PROFILE/03_AWARDS",
 military:"01_PROFILE/04_MILITARY",
 career:"02_CAREER",
 project:"03_PROJECTS",
 expertise:"05_EXPERTISE",
 training:"06_TRAINING",
 archive:"07_ARCHIVE"
};

function parseFile(file:string):ContentDocument{
 const parsed=matter(fs.readFileSync(file,"utf8"));
 return {slug:path.basename(file,".md"),meta:parsed.data as ContentDocument["meta"],content:parsed.content};
}
function markdownFiles(dir:string,recursive=false):string[]{
 if(!fs.existsSync(dir))return[];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())return recursive?markdownFiles(full,true):[];
  return entry.isFile()&&entry.name.endsWith(".md")&&entry.name.toLowerCase()!=="readme.md"?[full]:[];
 });
}
function dateOf(d:ContentDocument){
 return String(d.meta.updatedDate??d.meta.createdDate??d.meta.date??d.meta.issuedDate??d.meta.startDate??"");
}
export function getDocuments(type:ContentType):ContentDocument[]{
 const dir=path.join(CONTENT_ROOT,TYPE_DIR[type]);
 return markdownFiles(dir,type==="expertise")
  .map(parseFile)
  .filter(d=>d.meta.enabled!==false&&d.meta.sample!==true)
  .sort((a,b)=>{
   if(type==="home")return Number(a.meta.order??999)-Number(b.meta.order??999);
   const byDate=dateOf(b).localeCompare(dateOf(a));
   if(byDate!==0)return byDate;
   return String(a.meta.title??a.meta.name??a.meta.school??a.meta.company??a.slug)
    .localeCompare(String(b.meta.title??b.meta.name??b.meta.school??b.meta.company??b.slug),"ko");
  });
}
export function getDocument(type:ContentType,slug:string){return getDocuments(type).find(d=>d.slug===slug);}
export function getDocumentById(type:ContentType,id:string){return getDocuments(type).find(d=>String(d.meta.id??"")===id);}
export function getHomeSection(section:string){return getDocuments("home").find(d=>String(d.meta.section??"")===section);}
export function getDocumentsByIds(type:ContentType,ids:string[]){
 const wanted=new Set(ids);return getDocuments(type).filter(d=>wanted.has(String(d.meta.id??"")));
}
export function getAreaConfig(directory:string):AreaConfig{
 const file=path.join(CONTENT_ROOT,directory,"README.md");
 const parsed=matter(fs.readFileSync(file,"utf8"));return {directory,...parsed.data} as AreaConfig;
}
export function getNavigation():AreaConfig[]{
 return fs.readdirSync(CONTENT_ROOT,{withFileTypes:true}).filter(e=>e.isDirectory()&&/^\d{2}_/.test(e.name))
  .map(e=>getAreaConfig(e.name)).filter(x=>x.enabled!==false).sort((a,b)=>Number(a.index)-Number(b.index));
}
export type ExpertiseGroup={id:string;title:string;description:string;order:number;enabled:boolean};
export function getExpertiseGroups():ExpertiseGroup[]{
 const root=path.join(CONTENT_ROOT,"05_EXPERTISE");
 if(!fs.existsSync(root))return[];
 return fs.readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()&&/^\d{2}_/.test(e.name)).map(e=>{
  const file=path.join(root,e.name,"README.md");
  const parsed=matter(fs.readFileSync(file,"utf8"));
  return parsed.data as ExpertiseGroup;
 }).filter(g=>g.enabled!==false).sort((a,b)=>Number(a.order)-Number(b.order));
}
