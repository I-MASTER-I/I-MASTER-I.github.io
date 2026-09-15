import {getAreaConfig,getDocuments} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
import CareerTimeline from "@/components/career/CareerTimeline";

export default function Page(){
  const careers=getDocuments("career");
  const trainings=getDocuments("training");
  const projects=getDocuments("project");
  const config=getAreaConfig("02_CAREER");
  const careerEntries=careers.map(c=>({
    kind:"career" as const,id:String(c.meta.id||c.slug),slug:c.slug,
    company:String(c.meta.company||c.meta.title||""),position:String(c.meta.position||""),
    startDate:String(c.meta.startDate||""),endDate:c.meta.endDate?String(c.meta.endDate):null,status:String(c.meta.status||""),
    roles:Array.isArray(c.meta.roles)?c.meta.roles.map(String):[],skills:Array.isArray(c.meta.skills)?c.meta.skills.map(String):[],markdown:c.content,
    projects:projects.filter(p=>String(p.meta.careerId||"")===String(c.meta.id||"")).map(p=>({
      id:String(p.meta.id||p.slug),slug:p.slug,title:String(p.meta.title||""),startDate:String(p.meta.startDate||""),
      endDate:p.meta.endDate?String(p.meta.endDate):null,status:String(p.meta.status||""),skills:Array.isArray(p.meta.skills)?p.meta.skills.map(String):[],markdown:p.content
    }))
  }));
  const trainingEntries=trainings.map(t=>({
    kind:"training" as const,id:String(t.meta.id||t.slug),slug:t.slug,
    company:String(t.meta.institution||""),position:String(t.meta.title||""),
    startDate:String(t.meta.startDate||""),endDate:t.meta.endDate?String(t.meta.endDate):null,status:String(t.meta.status||""),
    roles:["Professional Training"],skills:Array.isArray(t.meta.skills)?t.meta.skills.map(String):[],markdown:t.content,
    projects:projects.filter(p=>String(p.meta.trainingId||"")===String(t.meta.id||"")).map(p=>({
      id:String(p.meta.id||p.slug),slug:p.slug,title:String(p.meta.title||""),startDate:String(p.meta.startDate||""),
      endDate:p.meta.endDate?String(p.meta.endDate):null,status:String(p.meta.status||""),skills:Array.isArray(p.meta.skills)?p.meta.skills.map(String):[],markdown:p.content
    }))
  }));
  const entries=[...careerEntries,...trainingEntries].sort((a,b)=>b.startDate.localeCompare(a.startDate));
  const timelineConfig={
    timelineTitle:String(config.timelineTitle||""),timelineDescription:String(config.timelineDescription||""),presentLabel:String(config.presentLabel||""),
    projectLabel:String(config.projectLabel||""),emptyProjectLabel:String(config.emptyProjectLabel||""),careerBadgeLabel:String(config.careerBadgeLabel||"CAREER"),
    trainingBadgeLabel:String(config.trainingBadgeLabel||"TRAINING"),careerModalSourceLabel:String(config.careerModalSourceLabel||""),
    trainingModalSourceLabel:String(config.trainingModalSourceLabel||""),projectModalSourceLabel:String(config.projectModalSourceLabel||""),modalCloseLabel:String(config.modalCloseLabel||""),
    careerDetailLabel:String(config.careerDetailLabel||""),trainingDetailLabel:String(config.trainingDetailLabel||""),projectDetailLabel:String(config.projectDetailLabel||""),
    filterCareerLabel:String(config.filterCareerLabel||"CAREER ONLY"),filterTrainingLabel:String(config.filterTrainingLabel||"CAREER + TRAINING")
  };
  return <section className="section pageTop"><PageHeader config={config} count={entries.length}/><CareerTimeline careers={entries} config={timelineConfig}/></section>;
}
