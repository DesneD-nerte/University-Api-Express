FROM node 

WORKDIR /app

COPY . .

RUN npm install
# RUN npm install -g typescript
# RUN npm install -g ts-node

ENV PORT=5000
ENV connectionString="mongodb+srv://admin:admin@cluster0.jpggl.mongodb.net/db_thesis?retryWrites=true&w=majority"

EXPOSE 5000

# RUN tsc

CMD npm run production