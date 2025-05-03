// App.tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { GOOGLE_CLIENT_ID } from '@/lib/constant';

export default function Tester() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        picture: '',
    });
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
    });

    // Handle the response after authentication
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log("Google ID Token:", id_token);

            // Now fetch user info using the token
            fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('User Info:', data);  // Console log the user data
                    setUserInfo(data);  // Set user data to state
                })
                .catch((error) => console.error(error));
        }
    }, [response]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!userInfo ? (
                <Button
                    title="Login with Google"
                    disabled={!request}
                    onPress={() => promptAsync()}
                />
            ) : (
                <View>
                    <Text>Welcome, {userInfo.name}!</Text>
                    <Text>Email: {userInfo.email}</Text>
                    <Text>Picture:</Text>
                    <img src={userInfo.picture} alt="profile picture" />
                </View>
            )}
        </View>
    );
};


