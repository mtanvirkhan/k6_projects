// Get the current date and time
const now = new Date();

// Format the date and time as YYYY-MM-DD HH:mm:ss
const formattedDateTime = now.toISOString().replace('T', ' ').split('.')[0];

console.log("Current date and time:", formattedDateTime);
