# Build step
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve step
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: for SPA routing (React Router). If you add routes, you want this.
# We'll provide nginx.conf below; if you don't use React Router yet, you can skip it.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
