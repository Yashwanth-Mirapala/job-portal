@echo off
cd /d "%~dp0job_portal"
call npm install
call npm run dev
