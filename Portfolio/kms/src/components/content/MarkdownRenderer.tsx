"use client";
import {useEffect,useId,useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MermaidDiagram({chart}:{chart:string}){
 const id=useId().replace(/:/g,"-");
 const [svg,setSvg]=useState("");
 const [error,setError]=useState(false);
 useEffect(()=>{let live=true;(async()=>{try{const mermaid=(await import("mermaid")).default;mermaid.initialize({startOnLoad:false,theme:"dark",securityLevel:"strict",themeVariables:{background:"#11191d",primaryColor:"#14252c",primaryTextColor:"#dbe7ec",primaryBorderColor:"#1d6978",lineColor:"#65d7ea",secondaryColor:"#172126",tertiaryColor:"#10171b",fontFamily:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"}});const result=await mermaid.render(`mermaid-${id}`,chart);if(live){setSvg(result.svg);setError(false);}}catch{if(live)setError(true);}})();return()=>{live=false};},[chart,id]);
 if(error)return <pre className="markdownCode"><code>{chart}</code></pre>;
 return <div className="mermaidViewport"><div className="mermaidDiagram" dangerouslySetInnerHTML={{__html:svg}} /></div>;
}

function CodeBlock({language,code}:{language:string;code:string}){
 const [copied,setCopied]=useState(false);
 const copy=async()=>{await navigator.clipboard.writeText(code);setCopied(true);window.setTimeout(()=>setCopied(false),1200)};
 return <div className="markdownCodeShell"><div className="markdownCodeHead"><span>{language||"TEXT"}</span><button type="button" onClick={copy}>{copied?"COPIED":"COPY"}</button></div><pre className={`markdownCode language-${language||"text"}`}><code>{code}</code></pre></div>;
}

export default function MarkdownRenderer({children}:{children:string}){
 return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
  table:({children})=><div className="markdownTableScroll"><table>{children}</table></div>,
  code:({className,children,...props})=>{const code=String(children).replace(/\n$/,"");const language=/language-([^\s]+)/.exec(className||"")?.[1]||"";if(language==="mermaid")return <MermaidDiagram chart={code}/>;if(className)return <CodeBlock language={language} code={code}/>;return <code className={className} {...props}>{children}</code>;}
 }}>{children}</ReactMarkdown>;
}
