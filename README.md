# Pulumi AWS Deployment Packages

<div align="center">

**Production-ready Infrastructure as Code for Modern Web Applications**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Pulumi](https://img.shields.io/badge/Pulumi-3.192.0-purple.svg)](https://www.pulumi.com/)
[![AWS](https://img.shields.io/badge/AWS-SDK%207.6.0-orange.svg)](https://aws.amazon.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.11.0-blue.svg)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Deploy Next.js, SvelteKit, and React Router applications to AWS with enterprise-grade infrastructure, zero configuration overhead, and production-ready defaults.

[Documentation](./apps/docs) • [Examples](#examples) • [Quick Start](#quick-start) • [Features](#features)

</div>

---

## Overview

This monorepo provides battle-tested Pulumi components that transform modern web applications into globally scalable AWS deployments. Each package handles the complexity of AWS infrastructure while maintaining flexibility for customization.

### Why Use These Packages?

- **🚀 Production-Ready**: Enterprise-grade infrastructure patterns with security best practices
- **⚡ Performance Optimized**: CloudFront CDN, Lambda warming, ISR caching, and streaming SSR
- **🔧 Zero Configuration**: Sensible defaults that work out of the box
- **🎯 Framework-Specific**: Tailored adapters for Next.js, SvelteKit, and React Router
- **📦 Modular Design**: Use complete deployments or individual components
- **💰 Cost-Effective**: Serverless architecture with pay-per-request pricing
- **🔍 Observable**: Built-in monitoring with CloudWatch and X-Ray tracing

## Published Packages

| Package | Version | Description | Status |
|---------|---------|-------------|--------|
| [`@donswayo/pulumi-nextjs-aws`](https://www.npmjs.com/package/@donswayo/pulumi-nextjs-aws) | `1.1.4` | Next.js 14+ deployment with ISR, streaming SSR, and image optimization | Stable |
| [`@donswayo/pulumi-sveltekit-aws`](https://www.npmjs.com/package/@donswayo/pulumi-sveltekit-aws) | `0.1.2` | SvelteKit 2+ deployment with SSR and form actions | Beta |
| [`@donswayo/pulumi-react-router-aws`](https://www.npmjs.com/package/@donswayo/pulumi-react-router-aws) | `0.1.2` | React Router v7 deployment with SSR and data loading | Beta |

## Quick Start

### Prerequisites

- Node.js >= 22
- pnpm 10.11.0
- Pulumi CLI
- AWS Account with credentials configured

### Installation

Choose the package for your framework:

```bash
# For Next.js applications
pnpm add @donswayo/pulumi-nextjs-aws

# For SvelteKit applications
pnpm add @donswayo/pulumi-sveltekit-aws

# For React Router v7 applications
pnpm add @donswayo/pulumi-react-router-aws
```

### Basic Usage

#### Next.js Deployment

```typescript
import * as pulumi from "@pulumi/pulumi";
import { Next } from "@donswayo/pulumi-nextjs-aws";

const next = new Next("my-next-app", {
  appPath: "./",
  environment: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  domain: {
    name: "app.example.com",
    certificateArn: "arn:aws:acm:us-east-1:...",
  },
  lambda: {
    server: {
      memory: 1024,
      timeout: 30,
    },
    warmer: {
      enabled: true,
      concurrency: 5,
    },
  },
});

export const url = next.url;
export const distributionId = next.distributionId;
```

#### SvelteKit Deployment

```typescript
import { SvelteKitNucelAws } from "@donswayo/pulumi-sveltekit-aws";

const app = new SvelteKitNucelAws("my-sveltekit-app", {
  appPath: "./",
  environment: {
    PUBLIC_API_URL: "https://api.example.com",
  },
});

export const url = app.url;
```

#### React Router Deployment

```typescript
import { ReactRouterAwsDeployment } from "@donswayo/pulumi-react-router-aws";

const app = new ReactRouterAwsDeployment("my-react-router-app", {
  appPath: "./",
  environment: {
    API_ENDPOINT: "https://api.example.com",
  },
});

export const url = app.url;
```

### Deploy

```bash
# Initialize Pulumi stack
pulumi stack init production

# Preview changes
pulumi preview

# Deploy to AWS
pulumi up

# Get deployment URL
pulumi stack output url
```

## Features

### 🏗️ Infrastructure Components

Each deployment creates optimized AWS resources:

- **Lambda Functions**: Server-side rendering with configurable memory and timeout
- **S3 Buckets**: Static asset hosting with intelligent caching
- **CloudFront CDN**: Global content delivery with custom cache policies
- **DynamoDB Tables**: ISR cache management (Next.js)
- **SQS Queues**: Background revalidation jobs (Next.js)
- **IAM Roles**: Least-privilege security policies

### ⚡ Performance Features

- **Lambda Warming**: Eliminate cold starts with scheduled warmers (Next.js)
- **ISR Support**: Incremental Static Regeneration with tag-based invalidation (Next.js)
- **Streaming SSR**: Progressive rendering for better perceived performance
- **Edge Caching**: Intelligent CloudFront cache policies
- **Image Optimization**: On-demand image processing (Next.js)
- **Asset Compression**: Automatic Brotli/Gzip compression

### 🔒 Security Features

- **Origin Access Control**: Secure S3 access via CloudFront
- **HTTPS Only**: Enforced TLS with ACM certificates
- **IAM Best Practices**: Least-privilege access patterns
- **Geo-Restriction**: Optional location-based access control
- **WAF Integration**: Support for AWS WAF rules
- **X-Ray Tracing**: End-to-end request tracking

### 🎯 Framework-Specific Adapters

#### Next.js Features
- OpenNext v3 integration for full compatibility
- App Router and Pages Router support
- API Routes with streaming responses
- Middleware at the edge
- ISR with on-demand revalidation
- Image component optimization

#### SvelteKit Features
- Custom adapter for optimal bundling
- Form actions and progressive enhancement
- API endpoints with full SSR
- Static prerendering support
- HMR-compatible development

#### React Router Features
- Server-side rendering with data loaders
- File-based routing support
- Actions for form handling
- Streaming responses
- Meta tag generation
- Lambda Function URLs

## Advanced Configuration

### Custom CloudFront Settings

```typescript
const next = new Next("app", {
  appPath: "./",
  cloudfront: {
    priceClass: "PriceClass_100", // Use only North America and Europe
    logging: {
      bucket: "my-logs-bucket",
      prefix: "cloudfront/",
      includeCookies: true,
    },
    security: {
      webAclId: "arn:aws:wafv2:...",
      restrictGeoLocations: ["CN", "RU"],
    },
  },
});
```

### Lambda Configuration

```typescript
const next = new Next("app", {
  appPath: "./",
  lambda: {
    server: {
      memory: 2048,
      timeout: 30,
      provisionedConcurrency: 5,
      environment: {
        NODE_OPTIONS: "--max-old-space-size=1536",
      },
    },
    image: {
      memory: 1536,
      timeout: 60,
    },
    warmer: {
      enabled: true,
      schedule: "rate(5 minutes)",
      concurrency: 10,
    },
  },
});
```

### Using Individual Components

For advanced use cases, import and use individual components:

```typescript
import {
  createS3Component,
  createLambdaFunction,
  createCloudFrontDistribution,
  createISRTable,
} from "@donswayo/pulumi-nextjs-aws";

// Build your own custom deployment pipeline
const bucket = createS3Component("assets", { /* ... */ });
const lambda = createLambdaFunction("server", { /* ... */ });
const cdn = createCloudFrontDistribution("cdn", {
  origins: [bucket, lambda],
  /* ... */
});
```

## Examples

This repository includes complete example applications:

### Clone and Explore Examples

```bash
# Clone the repository
git clone https://github.com/donswayo/pulumi
cd pulumi

# Install dependencies
pnpm install

# Navigate to examples
cd apps/

# Available examples:
# - web/          Next.js 15 with App Router
# - sveltekit/    SvelteKit 2 with SSR
# - react-router/ React Router v7 with loaders
# - docs/         Documentation site
```

### Deploy Examples

```bash
# From the packages/infra directory
cd packages/infra

# Deploy Next.js example
pulumi up -s web

# Deploy SvelteKit example
pulumi up -s sveltekit

# Deploy React Router example
pulumi up -s react-router

# Deploy documentation
pulumi up -s docs
```

## Development

### Project Structure

```
.
├── packages/
│   ├── pulumi-nextjs-aws/        # Next.js Pulumi component
│   ├── pulumi-sveltekit-aws/     # SvelteKit Pulumi component
│   ├── pulumi-react-router-aws/  # React Router component
│   ├── infra/                     # Infrastructure orchestration
│   ├── ui/                        # Shared UI components
│   ├── eslint-config/             # ESLint configurations
│   ├── typescript-config/         # TypeScript configurations
│   └── tailwind-config/           # Tailwind CSS configurations
├── apps/
│   ├── web/                       # Next.js example
│   ├── sveltekit/                 # SvelteKit example
│   ├── react-router/              # React Router example
│   └── docs/                      # Documentation site
├── turbo.json                     # Turborepo configuration
├── pnpm-workspace.yaml            # pnpm workspace config
└── package.json                   # Root package.json
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development mode
pnpm dev

# Type checking
pnpm check-types

# Linting
pnpm lint

# Format code
pnpm format
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Monitoring & Debugging

### CloudWatch Logs

All Lambda functions automatically log to CloudWatch:

```bash
# View server function logs
aws logs tail /aws/lambda/my-next-app-server --follow

# View image optimization logs
aws logs tail /aws/lambda/my-next-app-image --follow
```

### X-Ray Tracing

Enable X-Ray tracing for distributed tracing:

```typescript
const next = new Next("app", {
  appPath: "./",
  lambda: {
    server: {
      tracingConfig: {
        mode: "Active",
      },
    },
  },
});
```

### Performance Metrics

Monitor key metrics in CloudWatch:

- Lambda invocations and errors
- Lambda duration and concurrent executions
- CloudFront cache hit ratio
- S3 GET requests
- DynamoDB read/write capacity (Next.js ISR)

## Cost Optimization

### Typical Monthly Costs (Estimate)

For a medium-traffic application (~100k requests/day):

- **Lambda**: ~$15-30 (compute time)
- **S3**: ~$5-10 (storage and requests)
- **CloudFront**: ~$20-40 (data transfer)
- **DynamoDB**: ~$5 (ISR cache, if used)
- **Total**: ~$45-85/month

### Cost Optimization Tips

1. **Use Lambda Warming Wisely**: Only warm critical functions
2. **Optimize CloudFront Cache**: Increase cache TTLs for static assets
3. **Choose Appropriate Price Class**: Use regional CloudFront if global isn't needed
4. **Monitor Lambda Memory**: Right-size based on actual usage
5. **Enable S3 Intelligent-Tiering**: For infrequently accessed assets

## Troubleshooting

### Common Issues

<details>
<summary>Lambda timeout errors</summary>

Increase the timeout in your configuration:

```typescript
lambda: {
  server: {
    timeout: 60, // Increase from default 30s
  }
}
```
</details>

<details>
<summary>Cold start latency</summary>

Enable Lambda warming:

```typescript
lambda: {
  warmer: {
    enabled: true,
    concurrency: 5,
    schedule: "rate(5 minutes)",
  }
}
```
</details>

<details>
<summary>CloudFront cache misses</summary>

Review and adjust cache policies:

```typescript
cloudfront: {
  cachePolicies: {
    static: {
      defaultTtl: 86400,    // 1 day
      maxTtl: 31536000,     // 1 year
    }
  }
}
```
</details>

## Resources

- [Documentation](./apps/docs)
- [Pulumi Documentation](https://www.pulumi.com/docs/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [OpenNext Documentation](https://open-next.js.org/)

## Support

- **Issues**: [GitHub Issues](https://github.com/donswayo/pulumi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/donswayo/pulumi/discussions)
- **Security**: Report vulnerabilities to security@example.com

## License

MIT © [DonWayo](https://github.com/donswayo)

---

<div align="center">

**Built with ❤️ for the modern web**

[⬆ Back to top](#pulumi-aws-deployment-packages)

</div>