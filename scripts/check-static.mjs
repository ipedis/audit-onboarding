import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'src');
const publicRoot = resolve(sourceRoot, 'public');
const layoutsRoot = resolve(sourceRoot, 'layouts');
const layoutPartialsRoot = resolve(layoutsRoot, 'partials');
const stylesRoot = resolve(sourceRoot, 'scss');
const pageStylesRoot = resolve(stylesRoot, 'pages');
const docsRoot = resolve(projectRoot, 'docs');
const exerciseDocsRoot = resolve(docsRoot, 'exercices');
const trainerDocsRoot = resolve(docsRoot, 'formateur');
const outputRoot = resolve(projectRoot, 'dist');
const checkOutput = process.argv.includes('--dist');
const expectedPages = [
  'about.html',
  'blog-home.html',
  'blog-post.html',
  'components.html',
  'contact.html',
  'faq.html',
  'index.fr.html',
  'index.html',
  'inscription.html',
  'limite-temps.html',
  'outils-accessibles.html',
  'portfolio-item.html',
  'portfolio-overview.html',
  'pricing.html',
  'refresh-auto.html',
  'sitemap.html',
  'statistiques.html',
];
const expectedPageStyles = expectedPages.map((page) => `${basename(page, '.html')}.scss`).sort();
const styleSectionMarkers = ['STYLES TECHNIQUES', 'FIXTURES PÉDAGOGIQUES — NE PAS CORRIGER SANS CADRAGE'];
const errors = [];
const expectedExerciseFiles = Array.from({ length: 13 }, (_, index) => String(index + 1).padStart(2, '0'));

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function addError(file, message) {
  errors.push(`${relative(projectRoot, file)}: ${message}`);
}

function isExternal(reference) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(reference);
}

function cleanReference(reference) {
  return decodeURIComponent(reference.split(/[?#]/, 1)[0]);
}

function sourceReferenceExists(file, reference) {
  const clean = cleanReference(reference);
  const fromSiteRoot = file.startsWith(resolve(publicRoot, 'partials')) || clean.startsWith('/');
  const relativePath = clean.replace(/^\//, '');
  const candidates = fromSiteRoot
    ? [resolve(sourceRoot, relativePath), resolve(publicRoot, relativePath)]
    : [resolve(file, '..', relativePath), resolve(publicRoot, relativePath)];
  return candidates.some(existsSync);
}

function outputReferenceExists(file, reference) {
  const clean = cleanReference(reference);
  const fromSiteRoot = file.startsWith(resolve(outputRoot, 'partials')) || clean.startsWith('/');
  const path = fromSiteRoot ? resolve(outputRoot, clean.replace(/^\//, '')) : resolve(file, '..', clean);
  return existsSync(path);
}

function checkHtml(file, referenceExists) {
  const contents = readFileSync(file, 'utf8');
  if (/<!--|-->/.test(contents)) addError(file, 'commentaire HTML interdit');
  if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(contents)) addError(file, 'script distant interdit');
  if (/<link\b[^>]*\bhref=["']https?:\/\//i.test(contents)) addError(file, 'ressource link distante interdite');

  const resourceTag = /<(?:script|link|img|source|video|audio)\b[^>]*>/gi;
  for (const tag of contents.match(resourceTag) ?? []) {
    const attributes = /\b(?:src|href|poster)=["']([^"']+)["']/gi;
    for (const match of tag.matchAll(attributes)) {
      const reference = match[1];
      if (!isExternal(reference) && !referenceExists(file, reference)) {
        addError(file, `référence locale absente: ${reference}`);
      }
    }
  }
}

function checkStylesheet(file, referenceExists) {
  const contents = readFileSync(file, 'utf8');
  if (/@import\s+(?:url\()?\s*["']?https?:\/\//i.test(contents)) addError(file, '@import distant interdit');

  for (const match of contents.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const reference = match[1];
    if (/^https?:\/\//i.test(reference)) {
      if (!/^https:\/\/dummyimage\.com\//i.test(reference)) addError(file, `url distante interdite: ${reference}`);
      continue;
    }
    if (!isExternal(reference) && !reference.startsWith('data:') && !referenceExists(file, reference)) {
      addError(file, `référence CSS locale absente: ${reference}`);
    }
  }
}

function stripScripts(contents) {
  return contents.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function parseContract(file) {
  const contents = readFileSync(file, 'utf8');
  const contract = contents.trim().match(/^<city-stars-page\s+([\s\S]*?)>([\s\S]*)<\/city-stars-page>$/);
  if (!contract) {
    addError(file, 'contrat city-stars-page unique absent ou invalide');
    return null;
  }

  const attributes = {};
  const attributePattern = /([a-z-]+)="([^"]*)"/g;
  let match;
  while ((match = attributePattern.exec(contract[1]))) attributes[match[1]] = match[2];

  const remainder = contract[1].replace(attributePattern, '').trim();
  if (remainder) addError(file, `attribut de contrat invalide: ${remainder}`);

  const allowedAttributes = new Set(['title', 'lang', 'doctype', 'body-class', 'shell-class', 'header', 'footer']);
  for (const name of Object.keys(attributes)) {
    if (!allowedAttributes.has(name)) addError(file, `attribut de contrat non supporté: ${name}`);
  }
  for (const name of ['title', 'lang', 'doctype', 'body-class', 'header', 'footer']) {
    if (!(name in attributes)) addError(file, `attribut de contrat absent: ${name}`);
  }
  if (attributes.lang !== 'none' && !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(attributes.lang ?? '')) {
    addError(file, `lang invalide: ${attributes.lang ?? ''}`);
  }
  if (!['html', 'none'].includes(attributes.doctype)) addError(file, `doctype invalide: ${attributes.doctype ?? ''}`);
  if (!['shared', 'none'].includes(attributes.header)) addError(file, `header invalide: ${attributes.header ?? ''}`);
  if (!['shared', 'none'].includes(attributes.footer)) addError(file, `footer invalide: ${attributes.footer ?? ''}`);

  const slots = [...contract[2].matchAll(/<page-(head|content|scripts)>[\s\S]*?<\/page-\1>/g)];
  const slotNames = slots.map((slot) => slot[1]);
  if (slotNames.filter((name) => name === 'content').length !== 1) {
    addError(file, 'exactement un slot page-content requis');
  }
  for (const optionalSlot of ['head', 'scripts']) {
    if (slotNames.filter((name) => name === optionalSlot).length > 1) {
      addError(file, `un seul slot page-${optionalSlot} autorisé`);
    }
  }
  const outsideSlots = contract[2]
    .replace(/<page-(?:head|content|scripts)>[\s\S]*?<\/page-(?:head|content|scripts)>/g, '')
    .trim();
  if (outsideSlots) addError(file, 'contenu hors slot interdit');

  const withoutScripts = stripScripts(contents);
  if (/<style\b/i.test(withoutScripts)) addError(file, 'bloc style statique interdit dans un template');
  if (/\sstyle\s*=/i.test(withoutScripts)) addError(file, 'attribut style statique interdit dans un template');

  return attributes;
}

function checkStyleArchitecture() {
  if (!existsSync(resolve(stylesRoot, 'global.scss'))) errors.push('src/scss/global.scss: feuille globale absente');
  if (!existsSync(pageStylesRoot)) {
    errors.push('src/scss/pages: dossier de feuilles par page absent');
    return;
  }

  const actualPageStyles = readdirSync(pageStylesRoot)
    .filter((file) => file.endsWith('.scss'))
    .sort();
  if (JSON.stringify(actualPageStyles) !== JSON.stringify(expectedPageStyles)) {
    errors.push('src/scss/pages: les 17 feuilles correspondant exactement aux pages sont requises');
  }

  for (const file of [
    resolve(stylesRoot, 'global.scss'),
    ...actualPageStyles.map((name) => resolve(pageStylesRoot, name)),
  ]) {
    if (!existsSync(file)) continue;
    const contents = readFileSync(file, 'utf8');
    for (const marker of styleSectionMarkers) {
      if (!contents.includes(marker)) addError(file, `section de classement absente: ${marker}`);
    }
    if (contents.indexOf(styleSectionMarkers[0]) > contents.indexOf(styleSectionMarkers[1])) {
      addError(file, 'la section technique doit précéder les fixtures pédagogiques');
    }
  }
}

function checkLayoutArchitecture() {
  const layout = resolve(layoutsRoot, 'page.html');
  if (!existsSync(layout)) errors.push('src/layouts/page.html: layout source absent');
  else {
    const contents = readFileSync(layout, 'utf8');
    for (const token of ['{{page-shell}}', '{{page-head}}', '{{page-scripts}}', '{{page-stylesheet}}']) {
      if (!contents.includes(token)) addError(layout, `point d'injection absent: ${token}`);
    }
  }

  for (const fragment of ['header.html', 'footer.html']) {
    const file = resolve(layoutPartialsRoot, fragment);
    if (!existsSync(file)) errors.push(`src/layouts/partials/${fragment}: fragment source absent`);
  }
}

function checkPageInventory(directory) {
  const actualPages = readdirSync(directory)
    .filter((file) => file.endsWith('.html'))
    .sort();
  if (JSON.stringify(actualPages) !== JSON.stringify(expectedPages)) {
    errors.push(`${relative(projectRoot, directory)}: les 17 pages attendues ne sont pas présentes exactement`);
  }
}

function checkDocumentation() {
  if (!existsSync(docsRoot)) {
    errors.push('docs: dossier documentaire absent');
    return;
  }

  for (const directory of [exerciseDocsRoot, trainerDocsRoot]) {
    if (!existsSync(directory)) errors.push(`${relative(projectRoot, directory)}: dossier documentaire absent`);
  }
  if (!existsSync(exerciseDocsRoot) || !existsSync(trainerDocsRoot)) return;

  const markdownFiles = walk(docsRoot).filter((file) => extname(file) === '.md');
  const exerciseFiles = walk(exerciseDocsRoot)
    .filter((file) => extname(file) === '.md')
    .map((file) => relative(exerciseDocsRoot, file).split('/').at(-1))
    .filter((file) => /^\d{2}\./.test(file))
    .map((file) => file.slice(0, 2))
    .sort();
  if (JSON.stringify(exerciseFiles) !== JSON.stringify(expectedExerciseFiles)) {
    errors.push('docs: les 13 fiches numérotées ne sont pas présentes exactement');
  }

  const requiredTrainerFiles = ['Corrections.md', 'Corrigé des exercices.md', 'Traçabilité interne.md'];
  for (const filename of requiredTrainerFiles) {
    const file = resolve(trainerDocsRoot, filename);
    if (!existsSync(file)) errors.push(`${relative(projectRoot, file)}: document formateur absent`);
  }

  const trainerCorrection = resolve(trainerDocsRoot, 'Corrigé des exercices.md');
  if (existsSync(trainerCorrection)) {
    const correction = readFileSync(trainerCorrection, 'utf8');
    for (const number of expectedExerciseFiles) {
      if (!new RegExp(`^## Thématique ${Number(number)}(?:\\s| —)`, 'm').test(correction)) {
        addError(trainerCorrection, `thématique ${Number(number)} absente`);
      }
    }
  }

  const allowedHtmlFiles = new Set([...expectedPages, 'header.html', 'footer.html']);
  for (const file of markdownFiles) {
    const contents = readFileSync(file, 'utf8');
    for (const match of contents.matchAll(/(?<![\w.-])((?:partials\/)?[A-Za-z0-9.-]+\.html)\b/g)) {
      const reference = match[1].trim().split('/').at(-1);
      if (!allowedHtmlFiles.has(reference)) {
        addError(file, `nom de page HTML absent de l'inventaire Vite: ${reference}`);
      }
    }
    if (/Index\.html|blog\.html|index%20|blog%20|portfolio overview\.html/.test(contents)) {
      addError(file, 'ancienne variante de nom de page interdite');
    }
  }
}

checkPageInventory(sourceRoot);
checkDocumentation();
checkLayoutArchitecture();
checkStyleArchitecture();
const pageContracts = new Map();
for (const page of expectedPages) {
  const file = resolve(sourceRoot, page);
  if (existsSync(file)) pageContracts.set(page, parseContract(file));
}
for (const file of walk(sourceRoot)) {
  if (extname(file) === '.html' && !file.startsWith(layoutsRoot)) checkHtml(file, sourceReferenceExists);
  if (extname(file) === '.html' && file.startsWith(layoutPartialsRoot)) checkHtml(file, sourceReferenceExists);
  if (['.css', '.scss'].includes(extname(file))) checkStylesheet(file, sourceReferenceExists);
}

if (checkOutput) {
  if (!existsSync(outputRoot)) errors.push('dist: build absent');
  else {
    checkPageInventory(outputRoot);
    for (const file of walk(outputRoot)) {
      const extension = extname(file);
      const contents = ['.css', '.html', '.js'].includes(extension) ? readFileSync(file, 'utf8') : '';
      if (/jsdelivr|node_modules/i.test(contents)) addError(file, 'référence de dépendance non empaquetée');
      if (extension === '.html') checkHtml(file, outputReferenceExists);
      if (extension === '.css') checkStylesheet(file, outputReferenceExists);
    }

    for (const page of expectedPages) {
      const outputPage = resolve(outputRoot, page);
      if (!existsSync(outputPage)) continue;
      const contents = readFileSync(outputPage, 'utf8');
      const contract = pageContracts.get(page);
      const outputHtmlAttributes = contents.match(/<html([^>]*)>/i)?.[1] ?? '';
      const outputLang = outputHtmlAttributes.match(/\blang="([^"]*)"/i)?.[1] ?? 'none';
      const outputTitle = contents.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null;
      const outputBodyClass = contents.match(/<body\b[^>]*\bclass="([^"]*)"/i)?.[1] ?? '';
      if (/<city-stars-page|<page-(?:head|content|scripts)>/i.test(contents)) {
        addError(outputPage, 'balise de template non transformée');
      }
      if ((contents.match(/<link\b[^>]*rel="stylesheet"/gi) ?? []).length < 2) {
        addError(outputPage, 'feuilles globale puis locale non injectées');
      }
      if ((/^\s*<!doctype html>/i.test(contents) ? 'html' : 'none') !== contract?.doctype) {
        addError(outputPage, 'doctype différent du contrat');
      }
      if (outputLang !== contract?.lang) addError(outputPage, 'langue différente du contrat');
      if (outputTitle !== contract?.title) addError(outputPage, 'titre différent du contrat');
      if (outputBodyClass !== contract?.['body-class']) addError(outputPage, 'classes body différentes du contrat');
      if (contract?.['shell-class'] && !contents.includes(`<div class="${contract['shell-class']}">`)) {
        addError(outputPage, 'conteneur de shell absent');
      }
      if (contract?.header === 'shared' && !contents.includes('id="navbarSupportedContent"')) {
        addError(outputPage, 'en-tête partagé non injecté');
      }
      if (contract?.header === 'none' && contents.includes('id="navbarSupportedContent"')) {
        addError(outputPage, 'en-tête partagé injecté malgré header="none"');
      }
      if (contract?.footer === 'shared' && !contents.includes('href="sitemap.html"')) {
        addError(outputPage, 'pied partagé non injecté');
      }
      if (contract?.footer === 'none' && contents.includes('href="sitemap.html"')) {
        addError(outputPage, 'pied partagé injecté malgré footer="none"');
      }
    }

    if (existsSync(resolve(outputRoot, 'partials')))
      errors.push('dist/partials: les fragments de layout ne doivent pas être publiés');
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Contrôles statiques réussis${checkOutput ? ' pour les sources et dist' : ''}.`);
}
