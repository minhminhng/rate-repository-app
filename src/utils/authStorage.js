import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:tokens`,
    );

    return rawToken ? JSON.parse(rawToken) : [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await this.removeAccessToken();
    
    await AsyncStorage.setItem(
      `${this.namespace}:tokens`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:tokens`);
  }
}

export default AuthStorage;