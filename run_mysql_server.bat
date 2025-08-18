@echo off
cd /d "%~dp0mysql\bin"
echo ==================================
echo Starting Portable MySQL Server...
echo ==================================

:: Check if data directory exists
if not exist "%~dp0mysql\data\mysql" (
    echo No MySQL system tables found. Initializing first-time setup...
    mysqld --initialize-insecure ^
           --basedir="%~dp0mysql" ^
           --datadir="%~dp0mysql\data" ^
           --console
    echo Initialization complete.
)

:: Start MySQL server
echo Launching server...
echo 'Ctrl + c' to to exit server 
mysqld --defaults-file="%~dp0mysql\my.ini" --console
