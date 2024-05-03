if [ ! -f ".env" ]; then
    cat Setting up configuration
    cp .env.example .env
    cat Done
end

cat Installing dependencies...
npm install --force
cat Done

cat Code is updated and ready to start
read -n 1 -s -r -p "Press any key to continue"