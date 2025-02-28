export interface Repo {
  id?: number;
  name: string;
  gitPeekUrl?: string | null;
  gitHubUrl: string;
  cloneable: boolean;
  cloneUrl: string;
  userId: number;
  username: string;
}
