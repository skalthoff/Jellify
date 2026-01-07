# Self-Hosted GitHub Actions Runners

This directory contains the configuration for running self-hosted GitHub Actions runners with all required dependencies pre-installed.

## Pre-installed Tools

- **Node.js 20** (LTS)
- **Bun 1.x**
- **JDK 17** (for Android builds)
- **Android SDK** (platform-tools, android-34, build-tools)
- **Ruby + Bundler** (for Fastlane)

## Quick Start

1. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

2. Get a runner token from your repository:
   - Go to: `Settings > Actions > Runners > New self-hosted runner`
   - Copy the token

3. Update `.env` with your token

4. Build and start:
   ```bash
   docker compose up -d --build
   ```

## Scaling (Swarm-like Behavior)

To run multiple parallel runners:

```bash
# Set in .env
RUNNER_COUNT=3

# Or scale on the fly
docker compose up --scale github-runner=3 -d
```

Each runner will automatically pick up jobs as they become available, providing parallel execution.

## Alternative: Manual Multiple Runners

You can also run multiple separate containers:

```bash
for i in 1 2 3; do
  docker run -d \
    --name github-runner-$i \
    --env REPO_URL=https://github.com/skalthoff/jellify \
    --env RUNNER_TOKEN=YOUR_TOKEN \
    --env RUNNER_NAME=jellify-runner-$i \
    --env RUNNER_WORKDIR=/tmp/github-runner \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /tmp/github-runner-$i:/tmp/github-runner \
    --restart always \
    jellify-runner:latest
done
```

## Updating

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```
