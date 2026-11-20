FROM node:22-bookworm@sha256:e13726ca604184d7a91fcacab1fc09eefd642dc28e79ac34e85540dd93b78cfb AS node

FROM jenkins/inbound-agent:3391.va_37fa_a_305d6d-1-jdk21@sha256:22529a3dd1857c0ebedf38a936808350a1f6a52bd04ff5f0cff51ee20aa8e65d

USER root
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
    && apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates python3 make g++ \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /home/jenkins/.npm \
    && chown jenkins:jenkins /home/jenkins/.npm \
    && node --version && npm --version && git --version

USER jenkins
WORKDIR /home/jenkins/agent
