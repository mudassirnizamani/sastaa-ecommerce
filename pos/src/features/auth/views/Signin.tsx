import {Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, MD2Colors, Paragraph, TextInput} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../../core/router/AuthStack';
import styles from '../styles/AuthStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../../../core/contexts/AuthContext';

type Props = NativeStackScreenProps<AuthStackParams, 'Signin'>;

export default function Signin({navigation}: Props) {
  const {loading, signin} = useAuthContext();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image
          source={require("../../../../assets/images/rn-social-logo.png")}
          style={styles.logo}
        /> */}
        <Text style={styles.header}>Sastaa Store</Text>

        <TextInput
          label="Username"
          mode="outlined"
          left={<TextInput.Icon icon="account-circle" />}
          style={styles.textInput}
          onChangeText={value => setUsername(value)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          left={<TextInput.Icon icon="lock" />}
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              icon={hidePassword ? 'eye' : 'eye-off'}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
          style={styles.textInput}
          onChangeText={value => setPassword(value)}
        />

        <Button
          icon="login"
          mode="contained"
          loading={loading}
          onPress={() => signin(username, password)}
          style={styles.button}>
          Sign In
        </Button>

        {/* <TouchableOpacity
          style={{marginVertical: 35}}
          onPress={() => navigation.navigate('Signup', {})}>
          <Paragraph style={{color: MD2Colors.blue400}}>
            Don't have an account? Sign Up
          </Paragraph>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}
