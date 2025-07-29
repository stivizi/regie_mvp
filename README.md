# regie_mvp

## Overview
Regie is a Supabase-based MVP application for managing advisor licenses. The application provides a simple interface to view advisor licenses, track their expiration dates, and identify licenses that are approaching expiration.

## Features
- **License Management**: View all advisor licenses in a clean, responsive table
- **Tenant Selection**: Switch between different advisor IDs (tenants) to view their specific licenses
- **Expiring License Alerts**: Automated check for licenses expiring within the next 30 days
- **Add New Licenses**: Interface to add new license records to the system

## Architecture
The application consists of:
- **Frontend**: HTML, CSS, and JavaScript running in the browser
- **Backend**: Supabase for data storage and authentication
- **Edge Functions**: Deno-based serverless functions running on Supabase

## Key Components
### Frontend (`index.html`, `script.js`, `style.css`)
- Responsive user interface with clean design
- Dynamic loading of advisor licenses based on selected tenant
- Real-time data fetching from Supabase

### Supabase Edge Function (`functions/check-expiring-licenses/index.ts`)
- Runs periodically to check for licenses expiring within 30 days
- Logs expiring licenses (in a production environment, this would send notifications)
- Uses Supabase service role key for direct database access

## Setup
1. Clone this repository
2. Ensure you have access to the Supabase project
3. No additional installation required - the application runs directly from static files

## Usage
1. Open `index.html` in a web browser
2. Select an advisor ID from the dropdown to view their licenses
3. Click "Add New License" to add a license record
4. The system automatically checks for expiring licenses via the edge function

## Environment Variables
The application uses the following Supabase credentials (currently hardcoded for the MVP):
- `SUPABASE_URL`: https://tyukutagxzwctduwlwmv.supabase.co
- `SUPABASE_ANON_KEY`: Public anonymous key for read access

## Future Improvements
- Implement proper authentication and authorization
- Add email notifications for expiring licenses
- Create a dashboard with license statistics
- Implement license renewal functionality
- Add search and filtering capabilities