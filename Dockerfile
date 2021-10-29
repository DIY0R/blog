FROM node

WORKDIR /diyor/blog

COPY package.json ./

RUN yarn install 

COPY . .

ENV PORT 5000

EXPOSE  $PORT

VOLUME ["/diyor/blog/static"]

CMD ["yarn","index.js"]

