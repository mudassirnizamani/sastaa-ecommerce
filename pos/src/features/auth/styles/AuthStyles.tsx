import {StyleSheet} from 'react-native';

const SigninStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
  textInput: {
    marginTop: 15,
    width: '100%',
  },
  button: {
    marginTop: 40,
    padding: 5,
    width: '100%',
    paddingHorizontal: 8,
  },
});

export default SigninStyles;
