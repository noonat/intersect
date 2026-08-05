# The build output is committed, so it has to come out the same every time.
# Pinning the image by digest pins the Node version and, with it, the only
# native binary in the toolchain (esbuild ships a different binary per
# platform). Everything else is plain JavaScript and the lockfile pins it.
#
# Build locally with:  npm run build:container
#
# The digest below is a multi-architecture index, so it pins the Node version
# but not the architecture. --platform pins that too, which matters because
# esbuild's binary differs per architecture. On an arm64 machine this runs
# emulated; drop the flag if that gets annoying, and the build check in CI
# will say so if the output ever stops matching.
FROM --platform=linux/amd64 docker.io/library/node:22-slim@sha256:d649c27dae7ba0137b3cef5dd75baa422c08dc3d9e3fc0c23dfb172dc3cc6436

# npm writes its cache to $HOME, and the container runs as the invoking user
# so that generated files aren't owned by root on the host.
ENV HOME=/tmp
ENV npm_config_update_notifier=false

WORKDIR /app
