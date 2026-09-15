import Link from "next/link";
import type {ContentDocument} from "@/types/content";
import HomeCareerTable from "@/components/home/HomeCareerTable";
import ProfileItemTable from "@/components/home/ProfileItemTable";
import ProfileAwardTable from "@/components/home/ProfileAwardTable";
import ProfileTrainingTable from "@/components/home/ProfileTrainingTable";

function range(d:ContentDocument,presentLabel:string){
 const start=String(d.meta.startDate||d.meta.issuedDate||d.meta.date||"").replaceAll("-",".");
 const end=d.meta.endDate?String(d.meta.endDate).replaceAll("-","."):d.meta.status==="ongoing"?presentLabel:"";
 return end?`${start} — ${end}`:start;
}
function columns(meta:ContentDocument["meta"],key:string){return Array.isArray(meta[key])?(meta[key] as unknown[]).map(String):[];}

export default function ProfileSection({config,careers,education,training,certifications,awards,military}:{
 config:ContentDocument;careers:ContentDocument[];education:ContentDocument[];training:ContentDocument[];certifications:ContentDocument[];awards:ContentDocument[];military:ContentDocument[];
}){
 const action=(config.meta.action||{}) as Record<string,string>;
 const presentLabel=String(config.meta.presentLabel||"");
 const sourceLabel=String(config.meta.profileModalSourceLabel||"");
 const closeLabel=String(config.meta.modalCloseLabel||"");
 const detailLabel=String(config.meta.profileDetailLabel||"");
 const careerRows=careers.slice(0,Number(config.meta.careerLimit||careers.length)).map(d=>({
  slug:d.slug,company:String(d.meta.company||""),position:String(d.meta.position||""),
  roles:Array.isArray(d.meta.roles)?d.meta.roles.map(String):[],skills:Array.isArray(d.meta.skills)?d.meta.skills.map(String):[],
  startDate:String(d.meta.startDate||""),endDate:d.meta.endDate?String(d.meta.endDate):null,status:String(d.meta.status||""),markdown:d.content
 }));
 const educationRows=education.slice(0,Number(config.meta.educationLimit||education.length)).map(d=>({
  slug:d.slug,title:String(d.meta.school||""),subtitle:String(d.meta.major||""),period:range(d,presentLabel),markdown:d.content,
  cells:[range(d,presentLabel),String(d.meta.school||""),`${String(d.meta.major||"")}${d.meta.degree?` · ${String(d.meta.degree)}`:""}`,String(d.meta.gpa||"—")]
 }));
 const trainingRows=training.slice(0,Number(config.meta.trainingLimit||training.length)).map(d=>({
  slug:d.slug,title:String(d.meta.institution||""),subtitle:String(d.meta.title||""),period:range(d,presentLabel),markdown:d.content,
  cells:[range(d,presentLabel),String(d.meta.institution||""),String(d.meta.title||""),String(d.meta.focus||(Array.isArray(d.meta.skills)?d.meta.skills.slice(0,5).map(String).join(" / "):"—"))]
 }));
 const certificationRows=certifications.slice(0,Number(config.meta.certificationLimit||certifications.length)).map(d=>({
  slug:d.slug,title:String(d.meta.name||""),subtitle:String(d.meta.issuer||""),period:range(d,presentLabel),markdown:d.content,
  cells:[range(d,presentLabel),String(d.meta.name||""),String(d.meta.issuer||"")]
 }));
 const awardRows=awards.slice(0,Number(config.meta.awardsLimit||awards.length)).map(d=>({
  slug:d.slug,title:String(d.meta.title||""),subtitle:String(d.meta.issuer||""),period:range(d,presentLabel),markdown:d.content,
  cells:[range(d,presentLabel),String(d.meta.title||""),String(d.meta.grade||""),String(d.meta.issuer||"")],
  repository:d.meta.repository?String(d.meta.repository):undefined
 }));
 const militaryRows=military.map(d=>({
  slug:d.slug,title:String(d.meta.title||config.meta.militaryTitle||""),period:range(d,presentLabel),markdown:d.content,
  cells:[range(d,presentLabel),String(d.meta.title||config.meta.militaryTitle||"")]
 }));

 return <section className="section profileSection">
  <div className="sectionHead"><span>{String(config.meta.index).padStart(2,"0")} / {String(config.meta.title||"").toUpperCase()}</span>{action.href&&<Link href={action.href}>{action.label} ↗</Link>}</div>
  <p className="profileNote">{String(config.meta.note||config.content||"")}</p>
  <div className="resumeProfileTables">
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.careerTitle||"")}</strong></div>
    <HomeCareerTable careers={careerRows} columns={columns(config.meta,"careerColumns")} presentLabel={presentLabel}
      sourceLabel={String(config.meta.careerModalSourceLabel||"")} closeLabel={closeLabel} detailLabel={String(config.meta.careerDetailLabel||"")}/>
   </section>
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.educationTitle||"")}</strong></div>
    <ProfileItemTable items={educationRows} columns={columns(config.meta,"educationColumns")} className="resumeEducationTable"
      sourceLabel={sourceLabel} closeLabel={closeLabel} detailLabel={detailLabel} detailHref="/profile"/>
   </section>
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.trainingTitle||"")}</strong></div>
    <ProfileTrainingTable items={trainingRows} columns={columns(config.meta,"trainingColumns")}
      sourceLabel="LOCAL MARKDOWN / TRAINING" closeLabel={closeLabel} detailLabel="OPEN TRAINING PAGE"/>
   </section>
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.certificationTitle||"")}</strong></div>
    <ProfileItemTable items={certificationRows} columns={columns(config.meta,"certificationColumns")} className="resumeCertificationTable"
      sourceLabel={sourceLabel} closeLabel={closeLabel} detailLabel={detailLabel} detailHref="/profile"/>
   </section>
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.awardsTitle||"")}</strong></div>
    <ProfileAwardTable items={awardRows} columns={columns(config.meta,"awardsColumns")}
      sourceLabel={sourceLabel} closeLabel={closeLabel} detailLabel={detailLabel} detailHref="/profile"/>
   </section>
   <section className="resumeTableBlock">
    <div className="resumeTableTitle"><strong>{String(config.meta.militaryTitle||"")}</strong></div>
    <ProfileItemTable items={militaryRows} columns={[String(config.meta.militaryPeriodLabel||""),String(config.meta.militaryTitle||"")]} className="resumeMilitaryClickableTable"
      sourceLabel={sourceLabel} closeLabel={closeLabel} detailLabel={detailLabel} detailHref="/profile"/>
   </section>
  </div>
 </section>;
}
