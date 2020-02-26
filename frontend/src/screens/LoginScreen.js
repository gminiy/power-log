import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext } from '../context/AuthContext';
import KakaoLogins from '@react-native-seoul/kakao-login';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from '../modals/LoadingModal';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const KakaoLogin = async () => {
    try {
      await KakaoLogins.login();
      console.log('loginSuccess')
      setLoading(true);
      
      const { id: kakaoId } = await KakaoLogins.getProfile();

      return login({ kakaoId });
    } catch (e) {
      console.log(e)
      if (e.code === 'E_CANCELLED_OPERATION') {
        console.log('login stopped');
      } else {
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Icon
              name="dumbbell"
              color='#fffaf0'
              size={wp('12%')}
          />
          <Text style={styles.title}>파워 로그</Text>
        </View>
        <TouchableOpacity onPress={KakaoLogin}>
          <Image 
            source={require('../../public/kakao_account_login_btn_medium_wide.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('6%')
  },
  title: {
    fontSize: wp('10%'),
    color: 'white',
    marginLeft: wp('3%')
  }
});

export default LoginScreen;