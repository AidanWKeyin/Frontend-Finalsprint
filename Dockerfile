# Build step
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Copy everything needed for Vite build
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
COPY src ./src
COPY public ./public
COPY nginx.conf ./nginx.conf

RUN npm run build

# Serve step
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
