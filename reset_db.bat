@echo off
cd /d "%~dp0mysql\bin"
echo ==================================
echo Resetting Database: perfume_schema
echo ==================================

set DB_NAME=perfume_schema

echo Dropping database if it exists...
mysql -u root --execute="DROP DATABASE IF EXISTS %DB_NAME%;"

echo Recreating database...
mysql -u root --execute="CREATE DATABASE %DB_NAME% DEFAULT CHARACTER SET utf8mb4;"

echo Done! Database %DB_NAME% has been reset.
pause
