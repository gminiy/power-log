import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { state: { error } } = useContext(AuthContext);

  useEffect(() => {
    if (error) navigation.navigate('Error', { error });
  }, [error]);

  return (
    <View style={styles.container}>
      <AuthForm type="login"/>
      <Text>아직 회원이 아니신가요? </Text>
      <Text>간편하게 가입하고 운동을 기록해보세요.</Text>
      <Button
        title="회원가입"
        styles={buttonStyles}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('15%')
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
    marginRight: wp('18%'),
  },
  title: {
    fontSize: wp('4%'),
    color: 'blue'
  },
});


export default LoginScreen;