@echo off
cls
set tag=%1
if [%tag%]==[] (set /p tag="tag (empty for latest): ")
if [%tag%]==[] (set tag=latest)
set image=reactapp:%tag%
cls
echo building image %image%...
docker build -f "../src/reactapp/Dockerfile" --build-arg --force-rm -t %image% ../src
echo pushing image %image%...
docker push %image%
pause