FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

ARG PACKAGE_TOKEN
ARG PACKAGE_SOURCE=https://gitlab.com/api/v4/projects/48501160/packages/nuget/index.json
ARG DEPLOY_USERNAME=webapi

RUN wget -qO- https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh | bash

COPY ["webapi/webapi.csproj", "webapi/"]
RUN dotnet restore -s ${PACKAGE_SOURCE} -s "https://api.nuget.org/v3/index.json" "webapi/webapi.csproj"
COPY . .
RUN dotnet publish "webapi/webapi.csproj" -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .


ENTRYPOINT ["dotnet", "webapi.dll"]