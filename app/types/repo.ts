export interface Repo {
  id: number;
  name: string;
  full_name: string;
  updated_at: string;
  private: boolean;
  html_url: string;
  clone_url: string;
  owner: {
    clone_url: string;
    login: string;
  };
}
