import {getDocumentById,getDocuments,getDocumentsByIds,getHomeSection} from "@/lib/content";
import {getGitHubRepositories} from "@/lib/github";
import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import CareerDescriptionSection from "@/components/home/CareerDescriptionSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import ProjectSection from "@/components/home/ProjectSection";
import GitHubHomePanel from "@/components/github/GitHubHomePanel";

export default async function Home(){
 const hero=getHomeSection("hero");
 const profile=getHomeSection("profile");
 const careerDescription=getHomeSection("career-description");
 const expertise=getHomeSection("expertise");
 const pc=getHomeSection("projects");
 const careerDocs=getDocuments("career");
 const projectDocs=getDocuments("project");
 const current=hero?getDocumentById("career",String(hero.meta.careerId||"")):undefined;
 const projects=pc?getDocumentsByIds("project",Array.isArray(pc.meta.projects)?pc.meta.projects.map(String):[]):[];
 const gh=await getGitHubRepositories();

 const careerDescriptionCareers=careerDocs.map(career=>({
  id:String(career.meta.id||career.slug),slug:career.slug,company:String(career.meta.company||""),client:String(career.meta.client||""),
  position:String(career.meta.position||""),roles:Array.isArray(career.meta.roles)?career.meta.roles.map(String):[],
  startDate:String(career.meta.startDate||""),endDate:career.meta.endDate?String(career.meta.endDate):null,status:String(career.meta.status||""),
  skills:Array.isArray(career.meta.skills)?career.meta.skills.map(String):[],markdown:career.content,
  projects:projectDocs.filter(project=>String(project.meta.careerId||"")===String(career.meta.id||""))
   .slice(0,Number(careerDescription?.meta.projectLimitPerCareer||6)).map(project=>({
    slug:project.slug,title:String(project.meta.title||""),startDate:String(project.meta.startDate||""),
    endDate:project.meta.endDate?String(project.meta.endDate):null,status:String(project.meta.status||""),
    summary:String(project.meta.summary||""),skills:Array.isArray(project.meta.skills)?project.meta.skills.map(String):[],markdown:project.content
   }))
 }));

 return <>
  {hero&&<section className="hero identityHero"><div className="homeHeroDashboard"><HeroSection doc={hero} career={current}/><GitHubHomePanel owner={gh.config.owner} repositories={gh.repositories}/></div></section>}
  {profile&&<ProfileSection config={profile} careers={careerDocs} education={getDocuments("education")} training={getDocuments("training")} certifications={getDocuments("certification")} awards={getDocuments("award")} military={getDocuments("military")}/>}
  {careerDescription&&<CareerDescriptionSection config={{
   index:Number(careerDescription.meta.index||2),title:String(careerDescription.meta.title||""),note:String(careerDescription.meta.note||""),
   labels:(careerDescription.meta.labels||{}) as Record<string,string>,action:(careerDescription.meta.action||{}) as {label:string;href:string},
   presentLabel:String(careerDescription.meta.presentLabel||""),modalSourceLabel:String(careerDescription.meta.modalSourceLabel||""),
   modalCloseLabel:String(careerDescription.meta.modalCloseLabel||""),projectDetailLabel:String(careerDescription.meta.projectDetailLabel||""),
   careerModalSourceLabel:String(careerDescription.meta.careerModalSourceLabel||""),careerDetailLabel:String(careerDescription.meta.careerDetailLabel||"")
  }} careers={careerDescriptionCareers}/>}
  {expertise&&<ExpertiseSection doc={expertise}/>}
  {pc&&<ProjectSection config={pc} projects={projects}/>}
 </>;
}
