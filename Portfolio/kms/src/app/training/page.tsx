import {getAreaConfig,getDocuments} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
import TrainingModalList from "@/components/training/TrainingModalList";
export default function Page(){const docs=getDocuments("training"),config=getAreaConfig("06_TRAINING");const items=docs.map(d=>({slug:d.slug,title:String(d.meta.title||""),institution:String(d.meta.institution||""),startDate:String(d.meta.startDate||""),endDate:String(d.meta.endDate||""),skills:Array.isArray(d.meta.skills)?d.meta.skills.map(String):[],markdown:d.content}));return <section className="section pageTop"><PageHeader config={config} count={docs.length}/><TrainingModalList items={items}/></section>}
