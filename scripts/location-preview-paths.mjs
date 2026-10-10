import { realpath } from 'node:fs/promises';
import { resolve, dirname, basename, relative, isAbsolute, sep } from 'node:path';

export function isWithinPath(parent, destination) {
  const path = relative(parent, destination);
  return !path || (path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path));
}

async function resolvedDestination(path) {
  try { return await realpath(path); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return resolve(await resolvedDestination(dirname(path)), basename(path));
  }
}

export async function assertPreviewDestination(output, root, airportDraft) {
  const destination = await resolvedDestination(resolve(output));
  const repository = await realpath(root);
  if (airportDraft && isWithinPath(repository, destination)) throw new Error('Draft preview output must remain outside the repository');
  for (const folder of ['app', 'public']) {
    const protectedPath = await realpath(resolve(repository, folder));
    if (isWithinPath(protectedPath, destination) || isWithinPath(destination, protectedPath)) throw new Error('Fixture output must remain outside app/ and public/');
  }
  return destination;
}
