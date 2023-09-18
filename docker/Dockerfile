ARG NODE_VERSION="18.16.1"
ARG DISTROLESS_VERSION="18"
ARG YARN_VERSION="3.6.1"
ARG PORT

#  ＿人人人人人人人人＿
#  > Install Part　 <
# ￣Y^Y^Y^Y^Y^Y^Y￣

FROM node:${NODE_VERSION}-bullseye AS Install

ARG YARN_VERSION
WORKDIR /Astvel

RUN yarn set version $YARN_VERSION

COPY package.json yarn.lock .yarnrc.yml ./

RUN echo "yarnPath: ./.yarn/releases/yarn-${YARN_VERSION}.cjs" >> /Astvel/.yarnrc.yml
RUN yarn install --frozen-lockfile

#  ＿人人人人人人人人＿
#  >  Build Part　 <
# ￣Y^Y^Y^Y^Y^Y^Y￣

FROM node:${NODE_VERSION}-bullseye AS Build

ARG YARN_VERSION
WORKDIR /Astvel

COPY . .
COPY --from=Install /Astvel/node_modules ./node_modules
COPY --from=Install /Astvel/.yarn ./.yarn
COPY --from=Install /Astvel/.yarnrc.yml ./
COPY --from=Install /Astvel/next.config.js ./next.config.js

RUN yarn build

#  ＿人人人人人人＿
#  > Run Part <
# ￣Y^Y^Y^Y^Y￣

FROM gcr.io/distroless/nodejs:${DISTROLESS_VERSION}-debug AS Run

ARG YARN_VERSION
WORKDIR /Astvel

COPY --from=Build /Astvel/.next ./.next
COPY --from=Build /Astvel/dist ./dist
COPY --from=Build /Astvel/public ./public
COPY --from=Build /Astvel/node_modules ./node_modules
COPY --from=Build /Astvel/next.config.js ./next.config.js

ENV NODE_ENV=production
EXPOSE 3000

CMD ["dist/server/index.js"]