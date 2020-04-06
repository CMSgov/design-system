# This produces the expected build environment with node 11 and yarn 1.21+
# The intent with this is to do something like
# `docker run -v ~/design-system:/app sh -c "yarn install && yarn build --root=my-branch"`
# Because /app is a mounted volume the resulting output is now available in your local directory.

FROM node:11.15.0-alpine

RUN cd /opt && wget https://github.com/yarnpkg/yarn/releases/download/v1.22.1/yarn-v1.22.1.tar.gz -O /opt/yarn-1.22.1.tar.gz
RUN cd /opt && tar -xvf /opt/yarn-1.22.1.tar.gz
RUN mv /usr/local/bin/yarn /usr/local/bin/yarn-orig
RUN ln -s /opt/yarn-v1.22.1/bin/yarn /usr/local/bin/yarn

WORKDIR /app

# turn this on to keep the container alive for interactive poking around
# CMD ["tail", "-F", "/dev/null"]
