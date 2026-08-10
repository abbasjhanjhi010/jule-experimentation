#!/bin/bash

echo "========================================="
echo " Starting Jules Student Dashboard        "
echo "========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed. Please install Node.js to run the backend server."
    exit 1
fi

echo "1. Installing backend dependencies..."
cd server
npm install --silent

echo "2. Starting the backend server..."
# Start the server in the background
node index.js &
SERVER_PID=$!

echo ""
echo "========================================="
echo " Server is now running in the background."
echo " (PID: $SERVER_PID)"
echo "========================================="
echo ""
echo "3. Next Steps:"
echo "   Please open the following file in your web browser:"
echo "   file://$(dirname $(pwd))/client/index.html"
echo ""
echo "   (You can drag and drop the 'index.html' file from the 'client' folder directly into your browser window)"
echo ""
echo "Press [CTRL+C] to stop the server and exit."

# Wait for the user to press Ctrl+C to kill the server
trap "kill $SERVER_PID" EXIT
wait $SERVER_PID
