import MarkdownRenderer from "@/components/content/MarkdownRenderer";
export default function MarkdownView({ content }: { content: string }) {
  return <article className="markdown"><MarkdownRenderer>{content}</MarkdownRenderer></article>;
}
