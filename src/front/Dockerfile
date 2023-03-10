# Stage 1: Build an Angular Docker Image
FROM node:18.12.1 as build
WORKDIR /apps
COPY . .
RUN npm install
COPY . /apps
RUN npm run build --prod
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY /nginx-custom.conf /etc/nginx/conf.d/
COPY --from=build /apps/dist/commerce /usr/share/nginx/html


