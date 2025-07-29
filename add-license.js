// Initialize Supabase client
const supabaseUrl = 'https://tyukutagxzwctduwlwmv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dWt1dGFneHp3Y3RkdXdsd212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTEzNjYsImV4cCI6MjA2MjI4NzM2Nn0.SkJfDv9SqMgmGBX4WlSMWbqmfE1NY5EQhgfUeq0JFB4';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase client initialized.');

// Handle form submission
document.getElementById('license-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const licenseData = {
        advisor_id: formData.get('advisor-id').trim().toLowerCase(),
        license_number: formData.get('license-number'),
        issuing_body: formData.get('issuing-body'),
        license_type: formData.get('license-type'),
        status: formData.get('status'),
        issue_date: formData.get('issue-date'),
        expiry_date: formData.get('expiry-date'),
        renewal_frequency: formData.get('renewal-frequency'),
        notes: formData.get('notes') || null
    };

    try {
        const { data, error } = await supabaseClient
            .from('advisor_licenses')
            .insert([licenseData]);

        if (error) {
            throw error;
        }

        document.getElementById('message').textContent = 'License added successfully!';
        document.getElementById('license-form').reset();
        console.log('License added successfully:', data);
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
        console.error('Error adding license:', error);
        // Log the full error object for more details
        console.error('Full error object:', error);
    }
});