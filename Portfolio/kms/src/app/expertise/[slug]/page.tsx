import {notFound} from "next/navigation";
import {getAreaConfig,getDocument,getDocuments} from "@/lib/content";
import MarkdownView from "@/components/content/MarkdownView";

export function generateStaticParams(){return getDocuments("expertise").map(doc=>({slug:doc.slug}));}

export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const doc=getDocument("expertise",slug);const config=getAreaConfig("05_EXPERTISE");
 if(!doc)notFound();
 const tags=Array.isArray(doc.meta.tags)?doc.meta.tags.map(String):[];
 return <section className="section detail expertiseArticle">
  <p className="eyebrow">{String(config.pageEyebrow||"")}</p>
  <h1>{String(doc.meta.title||"")}</h1>
  <p className="lead">{String(doc.meta.summary||"")}</p>
  <div className="expertiseArticleMeta"><span>{String(doc.meta.category||"")}</span><time>{String(config.updatedLabel||"")} {String(doc.meta.updatedDate||"").replaceAll("-",".")}</time></div>
  <div className="tags">{tags.map(tag=><span key={tag}>{tag}</span>)}</div>
  <MarkdownView content={doc.content}/>
 </section>;
}
