## Build Stage
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#USER app
#WORKDIR /app
#EXPOSE 5048
#EXPOSE 8080
#
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
#RUN apt-get update
#RUN apt-get install curl
#RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
#RUN apt-get -y install nodejs
#
## Copy the project file and restore dependencies
#COPY ["webapi.csproj", "./"]
#
## Copy the rest of the project and publish
#COPY . .
#
#RUN dotnet restore "webapi.csproj" --disable-parallel
#RUN dotnet publish "webapi.csproj" -c Release -o /app/publish
#
## Runtime Stage
#FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
#WORKDIR /app
#
## Copy the published output from the build stage
#COPY --from=build /app/publish .
#COPY ["appsettings.json", "./"]
#
#
## Define entry point
#ENTRYPOINT ["dotnet", "webapi.dll"]
#
#

# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5048
EXPOSE 8080
EXPOSE 8081


# Base runtime image for .NET apps
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5048
EXPOSE 7048
EXPOSE 8080
EXPOSE 8081

# Build image with Node.js and .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash && \
    apt-get -y install nodejs

# Build and restore dependencies
FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["./webapi.csproj", "webapi/"]
RUN dotnet restore "webapi/webapi.csproj"

COPY . .
WORKDIR "/src/webapi"
RUN dotnet build "/src/webapi/webapi.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish the application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish  "/src/webapi/webapi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage for production
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "webapi.dll"]