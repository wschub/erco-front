# Base Image
FROM nginx:alpine

# Set working directory
WORKDIR /app

# Copy project files
RUN rm -v /usr/share/nginx/html/index.html
COPY ./dist /usr/share/nginx/html


# expose port and define CMD
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]