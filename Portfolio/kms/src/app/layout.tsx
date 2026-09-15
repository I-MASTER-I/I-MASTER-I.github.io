import packageInfo from "../../package.json";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHomeSection, getNavigation } from "@/lib/content";

export const metadata={title:{default:"KIM MINSEO | Azure Cloud AI Engineer",template:"%s | KIM MINSEO"},description:"Azure Cloud AI Engineer career, projects, GitHub and technical knowledge base."};

export default function RootLayout({children}:{children:React.ReactNode}){
 const nav=getNavigation(); const hero=getHomeSection("hero");
 const name=String(hero?.meta.name||""); const subtitle=String(hero?.meta.eyebrow||"");
 return <html lang="ko"><body><Header nav={nav} brand={name} subtitle={subtitle} version={packageInfo.version}/><main>{children}</main><Footer name={name} subtitle={String(hero?.meta.footerText||subtitle)}/></body></html>;
}
