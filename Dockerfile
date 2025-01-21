# Use the official Node.js LTS image
FROM node:lts

# Create and set the working directory
RUN mkdir /project
WORKDIR /project

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Ensure the global npm binaries are in PATH
ENV PATH=$PATH:/usr/local/lib/node_modules/@ionic/cli/bin

COPY ./entrypoint.sh ./ 
# Add execution permissions to the entrypoint script
RUN chmod +x ./entrypoint.sh

# Copy the rest of the application files
COPY . .

# Expose the default Angular dev server port (4200)
EXPOSE 4200

# Define the entrypoint to run the script
ENTRYPOINT ["bash", "./entrypoint.sh"]

