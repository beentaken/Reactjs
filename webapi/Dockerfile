# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
USER app
WORKDIR /app
EXPOSE 5048
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs

# Copy the project file and restore dependencies
COPY ["webapi.csproj", "./"]

# Copy the rest of the project and publish
COPY . .

RUN dotnet restore "webapi.csproj" --disable-parallel
RUN dotnet publish "webapi.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .
COPY ["appsettings.json", "./"]


# Define entry point
ENTRYPOINT ["dotnet", "webapi.dll"]



