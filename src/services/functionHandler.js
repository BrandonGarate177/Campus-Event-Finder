import { supabase } from './supabaseClient';

/**
 * Helper function to call Supabase Edge Functions
 * @param {string} functionName - The name of the Edge Function
 * @param {object} payload - The payload to send (body for POST/PUT/PATCH, query params for GET/DELETE)
 * @param {string} method - The HTTP method (default: POST)
 * @returns {Promise<{data: any, error: any}>}
 */
export const callEdgeFunction = async (functionName, payload = null, method = 'POST') => {
  let url = `${supabase.supabaseUrl}/functions/v1/${functionName}`;
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = {
    'apikey': supabase.supabaseKey,
    'Authorization': session ? `Bearer ${session.access_token}` : `Bearer ${supabase.supabaseKey}`,
  };

  const options = {
    method: method.toUpperCase(),
    headers,
  };

  if (payload) {
    if (['GET', 'DELETE'].includes(options.method)) {
      const params = new URLSearchParams(payload);
      url = `${url}?${params.toString()}`;
    } else {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(payload);
    }
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Edge Function call failed: ${response.status} - ${errorText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return { data: null, error: null };
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return { data, error: null };
    }
    
    return { data: null, error: null };

  } catch (error) {
    console.error(`Error calling ${functionName}:`, error.message);
    return { data: null, error };
  }
};

/**
 * Delete an event
 * @param {string} id - The ID of the event to delete
 * @returns {Promise<{data: any, error: any}>}
 */
export const deleteEvent = (id) => callEdgeFunction('delete-event', { id }, 'DELETE');

/**
 * Get event details
 * @param {string} id - The ID of the event
 * @returns {Promise<{data: any, error: any}>}
 */
export const getEventDetails = (id) => callEdgeFunction('get-event-details', { id }, 'GET');

/**
 * Get events with optional filters
 * @param {object} filters - Optional filters for fetching events
 * @returns {Promise<{data: any, error: any}>}
 */
export const getEvents = async (filters = {}) => {
  const { data, error } = await callEdgeFunction('get-events', filters, 'GET');

  // The edge function returns { events: [...] }, so we unwrap it here
  if (data && data.events) {
    return { data: data.events, error };
  }

  return { data, error };
};

/**
 * Call the rapid endpoint
 * @param {object} payload - The payload to send
 * @returns {Promise<{data: any, error: any}>}
 */
export const callRapidEndpoint = (payload) => callEdgeFunction('rapid-endpoint', payload, 'POST');

/**
 * Toggle event registration for the current user
 * @param {string} event_id - The ID of the event
 * @returns {Promise<{data: any, error: any}>}
 */
export const toggleRegistration = (event_id) => callEdgeFunction('Toggle-registration', { event_id }, 'POST');

/**
 * Update an event
 * @param {object} payload - The event update payload
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateEvent = (payload) => callEdgeFunction('update-event', payload, 'PATCH');

/**
 * Update user profile
 * @param {object} payload - The profile update payload
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateProfile = (payload) => callEdgeFunction('Update-profile', payload, 'PATCH');

/**
 * Fetches all events the currently authenticated user is registered for.
 * The user ID is implicitly passed via the Authorization header.
 * @returns {Promise<{data: Array<Object>, error: Object | null}>} A list of registered event objects.
 */
export const getMyRegisteredEvents = async () => 
  callEdgeFunction('quick-api', null, 'GET');
