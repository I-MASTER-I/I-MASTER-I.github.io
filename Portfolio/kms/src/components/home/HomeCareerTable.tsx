"use client";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

export type HomeCareer = {
 slug:string;company:string;position:string;roles:string[];skills:string[];startDate:string;endDate?:string|null;status?:string;markdown:string;
};
export default function HomeCareerTable({careers,columns,presentLabel,sourceLabel,closeLabel,detailLabel}:{
 careers:HomeCareer[];columns:string[];presentLabel:string;sourceLabel:string;closeLabel:string;detailLabel:string;
}){
 const [doc,setDoc]=useState<MarkdownModalDocument|null>(null);
 const range=(d:HomeCareer)=>`${d.startDate.replaceAll("-",".")} — ${d.endDate?d.endDate.replaceAll("-","."):d.status==="ongoing"?presentLabel:""}`;
 return <>
  <div className="resumeTable resumeCareerTable">
   <div className="resumeTableHeader">{columns.map(x=><span key={x}>{x}</span>)}</div>
   {careers.map(d=><button type="button" className="resumeTableRow resumeTableButton" key={d.slug} onClick={()=>setDoc({
     slug:d.slug,title:d.company,subtitle:d.position,period:range(d),markdown:d.markdown,detailHref:`/career/${d.slug}`,sourceLabel
   })}>
    <span>{range(d)}</span><strong>{d.company}</strong>
    <span>{d.position}{d.roles.length?` · ${d.roles.join(" · ")}`:""}</span>
    <span>{d.skills.slice(0,5).join(" / ")}</span>
   </button>)}
  </div>
  <MarkdownDetailModal item={doc} closeLabel={closeLabel} detailLabel={detailLabel} onClose={()=>setDoc(null)}/>
 </>;
}
