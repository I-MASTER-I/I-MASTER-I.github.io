"use client";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

export type ProfileTableItem={
 slug:string; title:string; subtitle?:string; period:string; markdown:string; cells:string[];
};
export default function ProfileItemTable({items,columns,className,sourceLabel,closeLabel,detailLabel,detailHref}:{
 items:ProfileTableItem[];columns:string[];className:string;sourceLabel:string;closeLabel:string;detailLabel:string;detailHref:string;
}){
 const [item,setItem]=useState<MarkdownModalDocument|null>(null);
 return <>
  <div className={`resumeTable ${className}`}>
   <div className="resumeTableHeader">{columns.map(x=><span key={x}>{x}</span>)}</div>
   {items.map(d=><button type="button" className="resumeTableRow resumeTableButton" key={d.slug} onClick={()=>setItem({
    slug:d.slug,title:d.title,subtitle:d.subtitle,period:d.period,markdown:d.markdown,detailHref,sourceLabel
   })}>{d.cells.map((cell,i)=>i===1?<strong key={i}>{cell}</strong>:<span key={i}>{cell}</span>)}</button>)}
  </div>
  <MarkdownDetailModal item={item} closeLabel={closeLabel} detailLabel={detailLabel} onClose={()=>setItem(null)}/>
 </>;
}
