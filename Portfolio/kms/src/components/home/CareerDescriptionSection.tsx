"use client";
import Link from "next/link";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

export type CareerDescriptionCareer={
 id:string;slug:string;company:string;client:string;position:string;roles:string[];startDate:string;endDate?:string|null;
 status:string;skills:string[];markdown:string;projects:CareerDescriptionProject[];
};
export type CareerDescriptionProject={
 slug:string;title:string;startDate:string;endDate?:string|null;status:string;summary:string;skills:string[];markdown:string;
};
export type CareerDescriptionConfig={
 index:number;title:string;note:string;labels:Record<string,string>;action:{label:string;href:string};presentLabel:string;
 modalSourceLabel:string;modalCloseLabel:string;projectDetailLabel:string;careerModalSourceLabel:string;careerDetailLabel:string;
};
function period(start:string,end:string|null|undefined,status:string,present:string){
 return `${start.replaceAll("-",".")} — ${end?end.replaceAll("-","."):status==="ongoing"?present:""}`;
}

export default function CareerDescriptionSection({config,careers}:{config:CareerDescriptionConfig;careers:CareerDescriptionCareer[]}){
 const [item,setItem]=useState<MarkdownModalDocument|null>(null);
 const [detailLabel,setDetailLabel]=useState(config.projectDetailLabel);
 const openCareer=(career:CareerDescriptionCareer)=>{
  setDetailLabel(config.careerDetailLabel);
  setItem({slug:career.slug,title:career.company,subtitle:[career.position,...career.roles].filter(Boolean).join(" · "),
   period:period(career.startDate,career.endDate,career.status,config.presentLabel),markdown:career.markdown,
   detailHref:`/career/${career.slug}`,sourceLabel:config.careerModalSourceLabel});
 };
 const openProject=(project:CareerDescriptionProject)=>{
  setDetailLabel(config.projectDetailLabel);
  setItem({slug:project.slug,title:project.title,subtitle:project.summary,
   period:period(project.startDate,project.endDate,project.status,config.presentLabel),markdown:project.markdown,
   detailHref:`/projects/${project.slug}`,sourceLabel:config.modalSourceLabel});
 };
 return <section className="section careerDescriptionSection">
  <div className="sectionHead"><span>{String(config.index).padStart(2,"0")} / {config.title.toUpperCase()}</span><Link href={config.action.href}>{config.action.label} ↗</Link></div>
  <p className="profileNote">{config.note}</p>
  <div className="careerIndexList">
   {careers.map(career=><article className="careerIndexCompany" key={career.id}>
    <button type="button" className="careerIndexCompanyName" onClick={()=>openCareer(career)}>
     <strong>{career.company}</strong><span>↗</span>
    </button>
    {career.projects.length>0?<div className="careerIndexProjects">
     {career.projects.map(project=><button type="button" key={project.slug} onClick={()=>openProject(project)}>
      <span>{project.title}</span><em>↗</em>
     </button>)}
    </div>:<div className="careerIndexEmpty">{config.labels.noProjects}</div>}
   </article>)}
  </div>
  <MarkdownDetailModal item={item} closeLabel={config.modalCloseLabel} detailLabel={detailLabel} onClose={()=>setItem(null)}/>
 </section>;
}
