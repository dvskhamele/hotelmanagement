import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Provider as PaperProvider, HelperText } from 'react-native-paper';
import localStorageService from './localStorageService';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const result = localStorageService.login(email, password);
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Hotel Operations Login" />
        </Appbar.Header>
        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {error ? (
            <HelperText type="error" visible={true}>
              {error}
            </HelperText>
          ) : null}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={!email || !password}
          >
            Login
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;