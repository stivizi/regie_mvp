import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (_req) => {
  try {
    // Get licenses that expire within the next 30 days
    const { data: expiringLicenses, error } = await supabase
      .from('advisor_licenses')
      .select('id, advisor_id, license_number, issuing_body, expiry_date')
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .lte('expiry_date', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    if (error) {
      throw error;
    }

    // For each expiring license, send an alert
    for (const license of expiringLicenses) {
      // This is a placeholder for sending an email or in-app notification
      console.log(`License ${license.license_number} for advisor ${license.advisor_id} expires on ${license.expiry_date}`);
      // In a real implementation, you would call an email service or update a notifications table
    }

    return new Response(JSON.stringify({ success: true, count: expiringLicenses.length }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});