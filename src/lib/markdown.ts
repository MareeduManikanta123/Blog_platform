import md from 'markdown-it';
import hljs from 'highlight.js';

const markdown: ReturnType<typeof md> = md({
  html: true,
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre data-testid="code-block"><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre data-testid="code-block"><code class="hljs">${markdown.utils.escapeHtml(code)}</code></pre>`;
  },
});

export async function renderMarkdown(content: string): Promise<string> {
  return markdown.render(content);
}
