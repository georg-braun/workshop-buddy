FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["WorkshopBuddy.csproj", "./"]
RUN dotnet restore "WorkshopBuddy.csproj"
COPY . .
RUN dotnet build "WorkshopBuddy.csproj" -c Release -o /app/build
RUN dotnet publish "WorkshopBuddy.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "WorkshopBuddy.dll"]
