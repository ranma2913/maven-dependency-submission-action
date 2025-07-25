import * as fs from 'fs';
import * as core from '@actions/core';


//TODO remove this or make it work...


export type MavenScope = 'provided' | 'compile' | 'test'

export type MavenArtifactType = 'jar' | 'pom' | 'test' | 'sources' | 'test-sources' | 'war' | 'maven-plugin'

export type MavenArtifact = {
  groupId: string
  artifactId: string
  version: string
  dependencies?: MavenArtifact[]
  scope: MavenScope
  type: MavenArtifactType
}

export function parseDependencyTree(file: string): MavenArtifact | undefined {
  const lines = loadFileContents(file);

  if (!lines) {
    return;
  }

  lines.forEach(line => {
    if (line.length > 0 && (line.startsWith('\\+-') || line.startsWith('\\-') || line.startsWith('\\|'))) {
      // 💡Resolve typescript:S108 Nested blocks of code should not be left empty.
      // Configured during 'npm run build-exe'
    }
  });
}

function loadFileContents(file: string): string[] | undefined {
  const exists = fs.existsSync(file);
  if (exists) {
    const fileStats = fs.statSync(file);
    if (fileStats.isFile()) {
      const contents = fs.readFileSync(file, {encoding: 'utf-8'});
      return contents.split(/\r?\n/);
    } else {
      core.setFailed(`Dependency file was not a file; '${file}'.`);
    }
  } else {
    core.setFailed(`Dependency file was not found; '${file}'.`);
  }
  return undefined;
}
