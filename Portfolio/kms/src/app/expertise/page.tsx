import {getAreaConfig,getDocuments,getExpertiseGroups} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
import ExpertiseKnowledgeBase from "@/components/expertise/ExpertiseKnowledgeBase";

export default function Page(){
 const docs=getDocuments("expertise");
 const groups=getExpertiseGroups();
 const config=getAreaConfig("05_EXPERTISE");
 const articles=docs.map(d=>({
  id:String(d.meta.id||d.slug),slug:d.slug,title:String(d.meta.title||""),group:String(d.meta.group||""),
  category:String(d.meta.category||""),summary:String(d.meta.summary||""),createdDate:String(d.meta.createdDate||""),
  updatedDate:String(d.meta.updatedDate||d.meta.createdDate||""),featured:Boolean(d.meta.featured),
  tags:Array.isArray(d.meta.tags)?d.meta.tags.map(String):[],markdown:d.content
 }));
 const ui={
  explorerTitle:String(config.explorerTitle||""),recentTitle:String(config.recentTitle||""),featuredTitle:String(config.featuredTitle||""),
  allArticlesLabel:String(config.allArticlesLabel||""),articleCountLabel:String(config.articleCountLabel||""),
  updatedLabel:String(config.updatedLabel||""),createdLabel:String(config.createdLabel||""),readLabel:String(config.readLabel||""),
  modalSourceLabel:String(config.modalSourceLabel||""),modalCloseLabel:String(config.modalCloseLabel||""),
  fullArticleLabel:String(config.fullArticleLabel||""),emptyLabel:String(config.emptyLabel||""),
  searchPlaceholder:String(config.searchPlaceholder||""),searchLabel:String(config.searchLabel||""),boardIndexLabel:String(config.boardIndexLabel||""),boardUpdatedLabel:String(config.boardUpdatedLabel||""),boardCategoryLabel:String(config.boardCategoryLabel||""),boardArticleLabel:String(config.boardArticleLabel||""),boardTagsLabel:String(config.boardTagsLabel||""),pageSize:Number(config.pageSize||10),previousLabel:String(config.previousLabel||""),nextLabel:String(config.nextLabel||""),pageLabel:String(config.pageLabel||"")
 };
 return <section className="section pageTop expertiseWorkspace"><PageHeader config={config} count={docs.length}/>
  <ExpertiseKnowledgeBase groups={groups} articles={articles} config={ui}/></section>;
}
