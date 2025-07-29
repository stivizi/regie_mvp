// Initialize Supabase client
const SUPABASE_URL = 'https://tyukutagxzwctduwlwmv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dWt1dGFneHp3Y3RkdXdsd212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTEzNjYsImV4cCI6MjA2MjI4NzM2Nn0.SkJfDv9SqMgmGBX4WlSMWbqmfE1NY5EQhgfUeq0JFB4';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Data Fetching Functions ---
async function fetchAdvisorLicenses(advisorId) {
    const { data, error } = await supabaseClient
        .from('advisor_licenses')
        .select('*')
        .eq('advisor_id', advisorId);

    if (error) {
        console.error('Error fetching licenses:', error);
        return [];
    }

    return data;
}

async function fetchLicenseApplications(licenseId) {
    const { data, error } = await supabaseClient
        .from('license_applications')
        .select('*')
        .eq('advisor_license_id', licenseId);

    if (error) {
        console.error('Error fetching applications:', error);
        return [];
    }

    return data;
}

// --- DOM Elements ---
const tenantSelect = document.getElementById('tenant-select');
const licensesTableBody = document.querySelector('#licenses-table tbody');
const applicationsList = document.getElementById('applications-list');
const alertsContainer = document.getElementById('alerts');

// --- Functions ---

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertsContainer.appendChild(alert);

    // Remove the alert after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

async function populateTenantSelector() {
    const { data, error } = await supabaseClient
        .from('advisor_licenses')
        .select('advisor_id', { distinct: true });

    if (error) {
        console.error('Error fetching distinct advisor IDs:', error);
        return;
    }

    tenantSelect.innerHTML = ''; // Clear existing options
    const uniqueIds = new Set(data.map(row => row.advisor_id));
    uniqueIds.forEach(advisorId => {
        const option = document.createElement('option');
        option.value = advisorId;
        option.textContent = advisorId;
        tenantSelect.appendChild(option);
    });
}

async function renderLicenses(tenantId) {
    licensesTableBody.innerHTML = '';
    const licenses = await fetchAdvisorLicenses(tenantId);

    licenses.forEach(license => {
        const row = document.createElement('tr');
        row.dataset.licenseId = license.id;
        row.innerHTML = `
            <td>${license.license_number}</td>
            <td>${license.issuing_body}</td>
            <td>${license.status}</td>
            <td>${license.expiry_date}</td>
        `;
        licensesTableBody.appendChild(row);
    });
}



// --- Event Listeners ---

tenantSelect.addEventListener('change', async (event) => {
    const selectedTenant = event.target.value;
    await renderLicenses(selectedTenant);
});


// --- Initial Load ---

document.addEventListener('DOMContentLoaded', async () => {
    populateTenantSelector();
    const initialTenant = tenantSelect.value;
    if (initialTenant) {
        await renderLicenses(initialTenant);
    }
});
