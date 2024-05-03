IF NOT EXIST ".env" (
    echo Setting up configuration
    copy /y .env.example .env
    echo Done
)

echo Installing dependencies...
npm install --force
echo Done

echo Code is updated and ready to start
pause