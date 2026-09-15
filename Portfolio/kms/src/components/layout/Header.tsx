"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AreaConfig } from "@/types/content";

function active(pathname:string,href:string){return href==="/"?pathname==="/":pathname===href||pathname.startsWith(`${href}/`);}
export default function Header({nav,brand,subtitle,version}:{nav:AreaConfig[];brand:string;subtitle:string;version:string}){
 const pathname=usePathname(); return <header className="siteHeader"><div className="headerInner">
 <div className="brandCluster"><Link className={`brand ${pathname==="/"?"activeBrand":""}`} href="/"><strong>{brand}</strong><span>{subtitle}</span></Link><span className="siteVersion">v{version}</span></div>
 <nav className="desktopNav" aria-label="Primary navigation">{nav.map(item=><Link key={item.href} href={item.href} className={active(pathname,item.href)?"activeNav":""}><span>{String(item.index).padStart(2,"0")}</span>{item.navLabel}</Link>)}</nav>
 </div></header>;
}
