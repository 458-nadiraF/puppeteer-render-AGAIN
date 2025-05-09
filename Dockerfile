FROM ghcr.io/puppeteer/puppeteer:19.7.2
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app
COPY package*.JSON ./

COPY . .
EXPOSE 3000
CMD [ "node", "index.js"]
