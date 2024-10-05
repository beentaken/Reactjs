FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["reactapp/reactapp.csproj", "reactapp/"]
RUN dotnet restore "reactapp/reactapp.csproj"
COPY . .

# Build the application
RUN dotnet publish "reactapp.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "reactapp.dll"]
