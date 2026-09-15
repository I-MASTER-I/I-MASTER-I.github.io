"use client";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

type ProjectItem={slug:string;title:string;summary:string;startDate:string;endDate:string;skills:string[];markdown:string;};
export default function ProjectModalList({projects}:{projects:ProjectItem[]}){
 const [active,setActive]=useState<MarkdownModalDocument|null>(null);
 const open=(p:ProjectItem)=>setActive({
   slug:p.slug,title:p.title,subtitle:p.summary,
   period:[p.startDate,p.endDate||"PRESENT"].filter(Boolean).join(" — "),
   markdown:p.markdown,sourceLabel:"PROJECT / MARKDOWN"
 });
 return <>
  <div className="recordList projectModalList">
   {projects.map((p,i)=><button type="button" className="recordRow projectModalRow" key={p.slug} onClick={()=>open(p)}>
    <span>{String(i+1).padStart(3,"0")}</span>
    <strong>{p.title}</strong>
    <small>{p.skills.slice(0,4).join(" / ")}</small>
    <time>{p.startDate}</time>
    <b>＋</b>
   </button>)}
  </div>
  <MarkdownDetailModal item={active} closeLabel="ESC TO CLOSE" detailLabel="" onClose={()=>setActive(null)}/>
 </>;
}
