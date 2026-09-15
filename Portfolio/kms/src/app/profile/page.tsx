import {getAreaConfig,getDocuments,getHomeSection} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
import ProfileSection from "@/components/home/ProfileSection";

export default function ProfilePage(){
 const config=getAreaConfig("01_PROFILE");
 const profile=getHomeSection("profile");
 return <section className="section pageTop">
  <PageHeader config={config}/>
  {profile&&<ProfileSection config={profile} careers={getDocuments("career")} education={getDocuments("education")} training={getDocuments("training")}
    certifications={getDocuments("certification")} awards={getDocuments("award")} military={getDocuments("military")}/>}
 </section>;
}
