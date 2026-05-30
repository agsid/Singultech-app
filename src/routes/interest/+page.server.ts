import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { pb } from '$lib/pocketbase';

export const actions: Actions = {
    default: async ({ request }) => {
        console.log('=== [DEBUG] INTEREST FORM SUBMISSION STARTED ===');
        
        const formData = await request.formData();
        
        const name = formData.get('name')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const gradeRaw = formData.get('grade')?.toString().trim();
        const statement = formData.get('statement')?.toString().trim();

        // Debug incoming frontend data
        console.log('[DEBUG] Received Form Fields:', {
            name: name || 'MISSING',
            email: email || 'MISSING',
            gradeRaw: gradeRaw || 'MISSING',
            statement: statement ? `${statement.substring(0, 20)}...` : 'MISSING'
        });

        // Validation guard
        if (!name || !email || !gradeRaw || !statement) {
            console.warn('[DEBUG] Validation Failed: One or more fields are empty.');
            return fail(400, { 
                error: true, 
                message: 'All fields are required. Please check your inputs.' 
            });
        }

        try {
            // Build payload payload object
            // Note: If PocketBase expects 'grade' to be a Number, we supply a parsed Integer.
            // If it expects a String, change this to: grade: gradeRaw
            const payload = {
                name,
                email,
                grade: parseInt(gradeRaw, 10),
                statement
            };

            console.log('[DEBUG] Attempting PocketBase insert into collection "team_interest"...');
            console.log('[DEBUG] Payload Structure:', JSON.stringify(payload, null, 2));

            // Execute network insert action
            const result = await pb.collection('team_interest').create(payload);
            
            console.log('[DEBUG] PocketBase Database Success! Created record ID:', result.id);
            console.log('=== [DEBUG] SUBMISSION FINISHED (SUCCESS) ===');
            
            return { success: true };

        } catch (err: any) {
            console.error('=== [DEBUG ERROR] POCKETBASE WRITE CRASHED ===');
            console.error('Error Object:', err);
            
            // Check if PocketBase returned a specific API structure error details
            if (err.data) {
                console.error('[DEBUG] Detailed PocketBase API Context:', JSON.stringify(err.data, null, 2));
            }
            
            // Return safe fallback error message back to user UI screen
            let customErrorMessage = 'Failed to save submission. Please try again later.';
            if (err.status === 400) {
                customErrorMessage = `Database schema mismatch or validation failure (Status ${err.status}). Ensure column names match exactly.`;
            } else if (err.status === 403 || err.status === 401) {
                customErrorMessage = `Database permission error (Status ${err.status}). Verify API collection rule configuration.`;
            }

            return fail(500, { 
                error: true, 
                message: `${customErrorMessage} (Underlying details: ${err.message || 'Unknown'})`
            });
        }
    }
};