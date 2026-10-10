// Test-only Node hooks: transpile workspace TSX and resolve the app alias.
import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import swc from 'next/dist/build/swc/index.js';

const root = fileURLToPath(new URL('../', import.meta.url));
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'next/image') return { url: new URL('./location-image.stub.mjs', import.meta.url).href, shortCircuit: true };
    if (specifier.startsWith('@/')) {
      const base = root + specifier.slice(2);
      const path = ['.tsx', '.ts', '.js'].map(ext => base + ext).find(existsSync);
      if (path) return { url: pathToFileURL(path).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(pathToFileURL(root).href) && /\.tsx?$/.test(url) && !url.includes('/node_modules/')) {
      return { format: 'module', shortCircuit: true, source: swc.transformSync(readFileSync(fileURLToPath(url), 'utf8'), {
        filename: fileURLToPath(url), jsc: { parser: { syntax: 'typescript', tsx: url.endsWith('.tsx') }, target: 'es2022', transform: { react: { runtime: 'automatic' } } }, module: { type: 'es6' },
      }).code };
    }
    return nextLoad(url, context);
  },
});
