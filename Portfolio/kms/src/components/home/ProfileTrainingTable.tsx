"use client";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";
import type {ProfileTableItem} from "@/components/home/ProfileItemTable";

export default function ProfileTrainingTable({items,columns,sourceLabel,closeLabel,detailLabel}:{
 items:ProfileTableItem[];columns:string[];sourceLabel:string;closeLabel:string;detailLabel:string;
}){
 const [item,setItem]=useState<MarkdownModalDocument|null>(null);
 return <>
  <div className="resumeTable resumeTrainingTable">
   <div className="resumeTableHeader">{columns.map(x=><span key={x}>{x}</span>)}</div>
   {items.map(d=><button type="button" className="resumeTableRow resumeTableButton" key={d.slug} onClick={()=>setItem({
    slug:d.slug,title:d.title,subtitle:d.subtitle,period:d.period,markdown:d.markdown,detailHref:"/training",sourceLabel
   })}>{d.cells.map((cell,i)=><span className={i===1?"resumePrimaryCell":undefined} key={i}>{cell}</span>)}</button>)}
  </div>
  <MarkdownDetailModal item={item} closeLabel={closeLabel} detailLabel={detailLabel} onClose={()=>setItem(null)}/>
 </>;
}
