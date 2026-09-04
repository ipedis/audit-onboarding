import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const sourceRoot = resolve(import.meta.dirname, '..', 'src');
const layoutRoot = resolve(sourceRoot, 'layouts');
const allowedValues = {
  doctype: new Set(['html', 'none']),
  footer: new Set(['shared', 'none']),
  header: new Set(['shared', 'none']),
};

function indent(contents, spaces) {
  const prefix = ' '.repeat(spaces);
  return contents
    .trim()
    .split('\n')
    .map((line) => (line ? `${prefix}${line}` : line))
    .join('\n');
}

function parseAttributes(source, filename) {
  const attributes = {};
  const attributePattern = /([a-z-]+)="([^"]*)"/g;
  let match;

  while ((match = attributePattern.exec(source))) attributes[match[1]] = match[2];

  const remainder = source.replace(attributePattern, '').trim();
  if (remainder) throw new Error(`${filename}: attribut de layout invalide: ${remainder}`);

  return attributes;
}

function readSlot(contents, name, required = false) {
  const matches = [...contents.matchAll(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, 'g'))];
  if (matches.length > 1 || (required && matches.length !== 1)) {
    throw new Error(`${name}: ${required ? 'exactement un bloc requis' : 'un seul bloc autorisé'}`);
  }
  return matches[0]?.[1].trim() ?? '';
}

function renderPage(html, filename) {
  const contract = html.trim().match(/^<city-stars-page\s+([\s\S]*?)>([\s\S]*)<\/city-stars-page>$/);
  if (!contract) throw new Error(`${filename}: contrat city-stars-page absent ou invalide`);

  const attributes = parseAttributes(contract[1], filename);
  const requiredAttributes = ['title', 'lang', 'doctype', 'body-class', 'header', 'footer'];
  for (const name of requiredAttributes) {
    if (!(name in attributes)) throw new Error(`${filename}: attribut ${name} absent`);
  }
  for (const [name, values] of Object.entries(allowedValues)) {
    if (!values.has(attributes[name])) throw new Error(`${filename}: valeur ${name} invalide`);
  }
  if (attributes.lang !== 'none' && !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(attributes.lang)) {
    throw new Error(`${filename}: valeur lang invalide`);
  }

  const pageHead = readSlot(contract[2], 'page-head');
  const pageContent = readSlot(contract[2], 'page-content', true);
  const pageScripts = readSlot(contract[2], 'page-scripts');
  const withoutSlots = contract[2]
    .replace(/<page-(?:head|content|scripts)>[\s\S]*?<\/page-(?:head|content|scripts)>/g, '')
    .trim();
  if (withoutSlots) throw new Error(`${filename}: contenu hors slot interdit`);

  const header =
    attributes.header === 'shared'
      ? `<div id="site-header">\n${indent(readFileSync(resolve(layoutRoot, 'partials/header.html'), 'utf8'), 2)}\n</div>`
      : '';
  const footer =
    attributes.footer === 'shared'
      ? `<div id="site-footer">\n${indent(readFileSync(resolve(layoutRoot, 'partials/footer.html'), 'utf8'), 2)}\n</div>`
      : '';
  const shellContents = [header, pageContent, footer].filter(Boolean).join('\n');
  const pageShell = attributes['shell-class']
    ? `<div class="${attributes['shell-class']}">\n${indent(shellContents, 2)}\n</div>`
    : shellContents;
  const pageName = basename(filename, '.html');
  const replacements = {
    '{{body-class-attribute}}': attributes['body-class'] ? ` class="${attributes['body-class']}"` : '',
    '{{doctype}}': attributes.doctype === 'none' ? '' : '<!doctype html>\n',
    '{{lang-attribute}}': attributes.lang === 'none' ? '' : ` lang="${attributes.lang}"`,
    '{{page-head}}': pageHead ? indent(pageHead, 4) : '',
    '{{page-scripts}}': pageScripts ? indent(pageScripts, 4) : '',
    '{{page-shell}}': indent(pageShell, 4),
    '{{page-stylesheet}}': `/scss/pages/${pageName}.scss`,
    '{{title}}': attributes.title,
  };

  let page = readFileSync(resolve(layoutRoot, 'page.html'), 'utf8');
  for (const [token, value] of Object.entries(replacements)) page = page.replaceAll(token, value);
  return page;
}

export function cityStarsLayout() {
  return {
    name: 'city-stars-layout',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        return renderPage(html, context.filename);
      },
    },
  };
}
