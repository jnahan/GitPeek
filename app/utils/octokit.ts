import { App } from "octokit";

const APP_ID = process.env.GITHUB_APP_ID as string;
const PRIVATE_KEY = (process.env.GITHUB_PRIVATE_KEY as string).replace(/\\n/g, "\n");

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
});

export async function getOctokit(installationId: number) {
  return app.getInstallationOctokit(installationId);
}
