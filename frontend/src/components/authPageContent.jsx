// components/AuthPageContent.jsx
import { useEffect, useState } from 'react';
import { useAuthStore } from './authStore';

export const AuthPageContent = () => {
    // Access the accessToken from Zustand state
    const { accessToken } = useAuthStore();

    // State to store the data fetched from the authenticated endpoint
    const [contentData, setContentData] = useState(null);

    // useEffect to run the fetch operation when the component mounts or accessToken changes
    useEffect(() => {
        // Define an asynchronous function to fetch authenticated content
        const fetchAuthenticatedContent = async () => {
            try {
                // Make a GET request to the authenticated endpoint
                const response = await fetch('http://localhost:8081/secrets', {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                // Check if the response is successful 
                if (response.ok) {
                    // Parse the JSON response
                    const data = await response.json();
                    // Update the state with the fetched data
                    setContentData(data);
                } else {
                    // Handle errors if the response is not successful
                    console.error('Error fetching authenticated content');
                }
            } catch (error) {
                // Handle network or other errors
                console.error('Error:', error.message);
            }
        };

        // Check if there is a valid accessToken before making the request
        if (accessToken) {
            // Call the fetchAuthenticatedContent function
            fetchAuthenticatedContent();
        }
    }, [accessToken]); // useEffect will re-run if accessToken changes

    return (
        <div>
            <h2>Authenticated Content Page</h2>
            {contentData === null ? (
                // Loading state
                <p>Loading...</p>
            ) : contentData ? (
                // If contentData is available, display the page content
                <p>{contentData.secret}</p>
            ) : (
                // If contentData is not available, display an error message
                <p>Content not found</p>
            )}
        </div>
    );
};