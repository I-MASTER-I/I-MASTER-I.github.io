"use client";
import { useState } from "react";
import MarkdownDetailModal, { MarkdownModalDocument } from "@/components/content/MarkdownDetailModal";

export type TimelineProject = {
  id:string; slug:string; title:string; startDate:string; endDate?:string|null; status?:string;
  skills:string[]; markdown:string;
};
export type TimelineCareer = {
  kind?:"career"|"training"; id:string; slug:string; company:string; position:string; startDate:string; endDate?:string|null; status?:string;
  roles:string[]; skills:string[]; markdown:string; projects:TimelineProject[];
};
export type TimelineConfig = {
  timelineTitle:string; timelineDescription:string; presentLabel:string; projectLabel:string; emptyProjectLabel:string;
  careerModalSourceLabel:string; trainingModalSourceLabel:string; projectModalSourceLabel:string; modalCloseLabel:string;
  careerDetailLabel:string; trainingDetailLabel:string; projectDetailLabel:string; careerBadgeLabel:string; trainingBadgeLabel:string;
  filterCareerLabel:string; filterTrainingLabel:string;
};

function period(start:string,end:string|null|undefined,status:string|undefined,present:string){
  return `${start.replaceAll("-",".")} — ${end ? end.replaceAll("-",".") : status==="ongoing" ? present : ""}`;
}

export default function CareerTimeline({careers,config}:{careers:TimelineCareer[];config:TimelineConfig}){
  const [modal,setModal]=useState<{doc:MarkdownModalDocument;detailLabel:string}|null>(null);
  const [includeTraining,setIncludeTraining]=useState(false);
  const visibleCareers=includeTraining?careers:careers.filter(c=>c.kind!=="training");
  const openCareer=(c:TimelineCareer)=>{
    const training=c.kind==="training";
    setModal({detailLabel:training?config.trainingDetailLabel:config.careerDetailLabel,doc:{
      slug:c.slug,title:c.company,subtitle:c.position,period:period(c.startDate,c.endDate,c.status,config.presentLabel),
      markdown:c.markdown,detailHref:training?"/training":`/career/${c.slug}`,
      sourceLabel:training?config.trainingModalSourceLabel:config.careerModalSourceLabel
    }});
  };
  const openProject=(p:TimelineProject)=>setModal({detailLabel:config.projectDetailLabel,doc:{
    slug:p.slug,title:p.title,period:period(p.startDate,p.endDate,p.status,config.presentLabel),
    markdown:p.markdown,detailHref:`/projects/${p.slug}`,sourceLabel:config.projectModalSourceLabel
  }});

  return <>
    <div className="careerTimelineIntro">
      <div><span>{config.timelineTitle}</span><p>{config.timelineDescription}</p></div>
      <div className="careerTimelineFilter" role="group" aria-label="Career timeline filter">
        <button type="button" className={!includeTraining?"isActive":""} aria-pressed={!includeTraining} onClick={()=>setIncludeTraining(false)}>{config.filterCareerLabel}</button>
        <button type="button" className={includeTraining?"isActive":""} aria-pressed={includeTraining} onClick={()=>setIncludeTraining(true)}>{config.filterTrainingLabel}</button>
      </div>
    </div>
    <div className="careerTimeline">
      {visibleCareers.map((career,careerIndex)=><article className="careerTimelineNode" key={career.id}>
        <div className="careerTimelineRail"><span>{String(careerIndex+1).padStart(2,"0")}</span></div>
        <div className="careerTimelineContent">
          <button className="careerTimelineCompany" type="button" onClick={()=>openCareer(career)}>
            <span className="careerTimelinePeriod">{period(career.startDate,career.endDate,career.status,config.presentLabel)}</span>
            <strong>{career.company}</strong>
            <span className={`careerTimelineKind ${career.kind==="training"?"isTraining":"isCareer"}`}>{career.kind==="training"?config.trainingBadgeLabel:config.careerBadgeLabel}</span>
            <em>{career.position}</em>
            {career.roles.length>0 && <small>{career.roles.join(" · ")}</small>}
          </button>
          <div className="careerTimelineProjects">
            <div className="careerTimelineProjectsHead"><span>{config.projectLabel}</span><b>{career.projects.length}</b></div>
            {career.projects.length===0
              ? <p className="careerTimelineEmpty">{config.emptyProjectLabel}</p>
              : career.projects.map((project,projectIndex)=><button className="careerProjectNode" type="button" onClick={()=>openProject(project)} key={project.id}>
                  <span className="careerProjectIndex">{String(projectIndex+1).padStart(2,"0")}</span>
                  <span className="careerProjectPeriod">{period(project.startDate,project.endDate,project.status,config.presentLabel)}</span>
                  <strong>{project.title}</strong>
                  {project.skills.length>0 && <small>{project.skills.slice(0,5).join(" / ")}</small>}
                </button>)}
          </div>
        </div>
      </article>)}
    </div>
    <MarkdownDetailModal item={modal?.doc??null} closeLabel={config.modalCloseLabel} detailLabel={modal?.detailLabel??""} onClose={()=>setModal(null)}/>
  </>;
}
