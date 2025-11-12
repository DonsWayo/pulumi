import type { Config } from "@react-router/dev/config";
import reactRouterNucelAwsAdapter from "@donswayo/pulumi-react-router-aws/adapter";

const adapter = reactRouterNucelAwsAdapter({
  out: '.nucel-build',
  polyfill: true,
  precompress: false,
});

export default {
  ssr: true,
  // Build configuration
  buildDirectory: "build",
  serverBuildFile: "index.js",
  
  async buildEnd({ buildManifest }) {
    console.log('Running AWS adapter...');
    await adapter.build({
      serverBuildFile: 'build/server/index.js',
      buildDirectory: 'build/client',
      routes: buildManifest?.routes || {},
    });
  },
} satisfies Config;
