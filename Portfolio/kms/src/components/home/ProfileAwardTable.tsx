"use client";

import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";
import GitHubReadmeModal from "@/components/github/GitHubReadmeModal";

export type ProfileAwardItem={
 slug:string;title:string;subtitle?:string;period:string;markdown:string;cells:string[];repository?:string;
};

function parseGitHubRepository(value?:string){
 if(!value)return null;
 try{
  const url=new URL(value);
  if(url.hostname!=="github.com")return null;
  const [owner,repo]=url.pathname.split("/").filter(Boolean);
  if(!owner||!repo)return null;
  return {owner,repo:repo.replace(/\.git$/i,"")};
 }catch{return null;}
}

export default function ProfileAwardTable({items,columns,sourceLabel,closeLabel,detailLabel,detailHref}:{
 items:ProfileAwardItem[];columns:string[];sourceLabel:string;closeLabel:string;detailLabel:string;detailHref:string;
}){
 const [item,setItem]=useState<MarkdownModalDocument|null>(null);
 const [readme,setReadme]=useState<{owner:string;repo:string}|null>(null);
 const [markdown,setMarkdown]=useState("");
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState("");

 async function openReadme(repository:string){
  const target=parseGitHubRepository(repository);
  if(!target)return;
  setReadme(target);setMarkdown("");setError("");setLoading(true);
  try{
   const response=await fetch(`https://api.github.com/repos/${encodeURIComponent(target.owner)}/${encodeURIComponent(target.repo)}/readme`,{
    headers:{Accept:"application/vnd.github.raw+json","X-GitHub-Api-Version":"2022-11-28"}
   });
   if(!response.ok){setError("이 Repository에서 README.md를 읽을 수 없습니다.");return;}
   setMarkdown(await response.text());
  }catch{setError("GitHub README를 불러오는 중 오류가 발생했습니다.");}
  finally{setLoading(false);}
 }

 return <>
  <div className="resumeTable resumeAwardsTable">
   <div className="resumeTableHeader">{columns.map(x=><span key={x}>{x}</span>)}</div>
   {items.map(d=><div className="resumeTableRow resumeAwardRow" key={d.slug}>
    {d.cells.map((cell,i)=>i===1?
     <button type="button" className="resumeAwardDetailButton" key={i} onClick={()=>setItem({slug:d.slug,title:d.title,subtitle:d.subtitle,period:d.period,markdown:d.markdown,detailHref,sourceLabel})}><strong>{cell}</strong></button>
     :<span key={i}>{cell}</span>)}
    <span className="resumeAwardGithubCell">{parseGitHubRepository(d.repository)?<button type="button" className="resumeAwardGithubButton" onClick={()=>openReadme(d.repository!)}>README</button>:<span className="resumeAwardGithubEmpty">—</span>}</span>
   </div>)}
  </div>
  <MarkdownDetailModal item={item} closeLabel={closeLabel} detailLabel={detailLabel} onClose={()=>setItem(null)}/>
  <GitHubReadmeModal open={Boolean(readme)} owner={readme?.owner||""} repo={readme?.repo||""} markdown={markdown} loading={loading} error={error} onClose={()=>setReadme(null)}/>
 </>;
}
