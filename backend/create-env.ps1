# Create clean .env file
$envContent = @"
MONGODB_URI=mongodb+srv://user:12345@cluster0.q7dka.mongodb.net/contact-manager
PORT=5000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline
Write-Host "✅ Created clean .env file"
