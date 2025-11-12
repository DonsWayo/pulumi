# Pulumi AWS Deployment Packages

Pulumi components for deploying modern web applications to AWS. These packages provide infrastructure as code for Next.js, SvelteKit, and React Router applications.

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/donswayo/pulumi
cd pulumi
pnpm install
```

## Usage

Deploy your applications using Pulumi:

```bash
cd packages/infra

# Deploy Next.js app to AWS
pulumi up -s web

# Deploy SvelteKit app to AWS
pulumi up -s sveltekit

# Deploy React Router app to AWS
pulumi up -s react-router

# Preview changes before deploying
pulumi preview -s <stack-name>

# Destroy infrastructure
pulumi destroy -s <stack-name>
```

## Features

- **Next.js 14+** - App Router, Pages Router, ISR, Streaming SSR
- **SvelteKit 2+** - SSR, Form Actions, API Routes
- **React Router v7** - Server-side rendering with loaders and actions
- **AWS Infrastructure** - CloudFront CDN, Lambda functions, S3 storage, DynamoDB
- **Type-safe** - Full TypeScript support with Pulumi

## Documentation

See [./apps/docs](./apps/docs) for complete documentation.

## Packages

| Package | Description |
|---------|-------------|
| [@donswayo/pulumi-nextjs-aws](https://www.npmjs.com/package/@donswayo/pulumi-nextjs-aws) | Next.js Pulumi component |
| [@donswayo/pulumi-sveltekit-aws](https://www.npmjs.com/package/@donswayo/pulumi-sveltekit-aws) | SvelteKit Pulumi component |
| [@donswayo/pulumi-react-router-aws](https://www.npmjs.com/package/@donswayo/pulumi-react-router-aws) | React Router v7 Pulumi component |

## License

MIT
