import fs from "node:fs";import path from "node:path";
const root=path.join(process.cwd(),"content");const errors=[];const seen=new Map();
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith(".md")&&e.name.toLowerCase()!=="readme.md")files.push(p);}}
walk(root);
function field(text,name){const m=text.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)["']?\\s*$`,"m"));const v=m?.[1]?.trim()||"";return v==="null"?"":v;}
function validDate(v){return !v||/^\d{4}-\d{2}-\d{2}$/.test(v);}
const careerIds=new Set();const trainingIds=new Set();const groups=new Set();
for(const f of files){const txt=fs.readFileSync(f,"utf8"),rel=path.relative(process.cwd(),f);const id=field(txt,"id"),type=field(txt,"type");
 if(["career","project","expertise","education","certification","award","military","training"].includes(type)&&!id)errors.push(`${rel}: missing id`);else if(id&&seen.has(id))errors.push(`${rel}: duplicate id '${id}' (also ${seen.get(id)})`);else if(id)seen.set(id,rel);
 for(const k of ["startDate","endDate","issuedDate","createdDate","updatedDate","date"]){const v=field(txt,k);if(!validDate(v))errors.push(`${rel}: ${k} must be YYYY-MM-DD (got '${v}')`);}
 if(type==="career"&&id)careerIds.add(id);
 if(type==="training"&&id)trainingIds.add(id);
}
const expRoot=path.join(root,"05_EXPERTISE");
if(fs.existsSync(expRoot))for(const e of fs.readdirSync(expRoot,{withFileTypes:true})){if(e.isDirectory()){const r=path.join(expRoot,e.name,"README.md");if(fs.existsSync(r)){const id=field(fs.readFileSync(r,"utf8"),"id");if(id)groups.add(id);}}}
for(const f of files){const txt=fs.readFileSync(f,"utf8"),rel=path.relative(process.cwd(),f),type=field(txt,"type");
 if(type==="project"){const c=field(txt,"careerId");if(c&&!careerIds.has(c))errors.push(`${rel}: unknown careerId '${c}'`);const t=field(txt,"trainingId");if(t&&!trainingIds.has(t))errors.push(`${rel}: unknown trainingId '${t}'`);}
 if(type==="expertise"){const g=field(txt,"group");if(g&&!groups.has(g))errors.push(`${rel}: unknown expertise group '${g}'`);}
}
if(errors.length){console.error("\\nCONTENT VALIDATION FAILED\\n"+errors.map(x=>" - "+x).join("\\n"));process.exit(1);}
console.log(`CONTENT VALIDATION OK: ${files.length} Markdown documents`);
