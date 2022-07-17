import { PathStats } from "./PathStats";

export interface IPackageReader {
  readFile: (path: string) => Promise<Uint8Array>;
  exists: (path: string) => Promise<boolean>;
  getStats: (path: string) => Promise<PathStats>;
  readDir: (path: string) => Promise<string[]>;
}
