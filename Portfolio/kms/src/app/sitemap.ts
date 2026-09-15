import type {MetadataRoute} from "next";
import {getDocuments} from "@/lib/content";
const origin=process.env.NEXT_PUBLIC_SITE_URL||"https://min-ser.github.io/Portfolio";
export default function sitemap():MetadataRoute.Sitemap{const fixed=["","/profile","/career","/projects","/github","/expertise","/training","/archive"];const dynamic=[...getDocuments("career").map(d=>`/career/${d.slug}`),...getDocuments("project").map(d=>`/projects/${d.slug}`),...getDocuments("expertise").map(d=>`/expertise/${d.slug}`)];return [...fixed,...dynamic].map(route=>({url:`${origin}${route}/`,lastModified:new Date()}));}
