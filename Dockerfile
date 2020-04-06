FROM node:11.15.0-alpine

RUN cd /opt && wget https://github.com/yarnpkg/yarn/releases/download/v1.22.1/yarn-v1.22.1.tar.gz -O /opt/yarn-1.22.1.tar.gz
RUN cd /opt && tar -xvf /opt/yarn-1.22.1.tar.gz

RUN mv /usr/local/bin/yarn /usr/local/bin/yarn-orig
RUN ln -s /opt/yarn-v1.22.1/bin/yarn /usr/local/bin/yarn

WORKDIR /app

COPY . /app/

CMD ["tail", "-F", "/dev/null"]
