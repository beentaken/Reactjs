# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

ARG BUILD_CONFIGURATION=Release

# Copy project file(s)
COPY ["webapi.csproj", "./"]

# Restore dependencies
RUN dotnet restore "webapi.csproj" 

# Copy all source files
COPY . .

# Set working directory and build the project
WORKDIR "/src/webapi"
RUN dotnet build "../webapi.csproj" -c $BUILD_CONFIGURATION -o /app/build
# Publish the app
RUN dotnet publish "../webapi.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5048
EXPOSE 7048
EXPOSE 8080
# Copy the build artifacts
COPY --from=build /app/publish .

# Run the app
ENTRYPOINT ["dotnet", "webapi.dll"]