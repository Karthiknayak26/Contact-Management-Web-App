// Test script to check environment variables
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Environment Variables Check ===');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length);
console.log('MONGODB_URI (with quotes):', JSON.stringify(process.env.MONGODB_URI));
console.log('PORT:', process.env.PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('===================================');

// Check for hidden characters
if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI;
    console.log('\nChecking for issues:');

    if (uri.includes('?')) {
        console.log('❌ WARNING: URI contains "?" - remove query parameters!');
        console.log('   Found at position:', uri.indexOf('?'));
    }

    if (uri.includes(' ')) {
        console.log('❌ WARNING: URI contains spaces!');
    }

    if (!uri.includes('/contact-manager')) {
        console.log('❌ WARNING: URI missing "/contact-manager" database name!');
    }

    if (uri.startsWith(' ') || uri.endsWith(' ')) {
        console.log('❌ WARNING: URI has leading or trailing spaces!');
    }

    console.log('\n✅ Correct format should be:');
    console.log('mongodb+srv://username:password@cluster.mongodb.net/contact-manager');
}
