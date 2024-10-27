import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Button, Input, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .required('Zorunlu Alan')
      .email('Lütfen geçerli bir e-posta adresi giriniz'),
    phone: Yup.string()
      .required('Zorunlu Alan')
      .min(5, 'Lütfen en az beş haneli bir numara giriniz')
      .max(13, 'Lütfen en fazla on üç haneli bir numara giriniz'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
        'Şartlar sağlanmıyor',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
    agreementConfirm: Yup.bool()
      .required('Zorunlu Alan')
      .oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor'),
  });

  const imagePath = require('../../assets/pexels7.jpg');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imagePath}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#86AB89',
            minHeight: 125,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            KAYIT OLUŞTUR
          </Text>
        </View>

        <View style={{flex: 1, padding: 10}}>
          <ScrollView>
            <Formik
              initialValues={{
                name: '',
                surname: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: '',
                agreementConfirm: false,
              }}
              validationSchema={registerSchema}
              onSubmit={values =>
                Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
              }>
              {({
                handleChange,
                handleSubmit,
                values,
                setFieldValue,
                errors,
              }) => (
                <View>
                  <Input
                    status={errors.name ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.name}
                    label={'İsim'}
                    placeholder="İsim giriniz"
                    onChangeText={handleChange('name')}
                    caption={errors.name}
                  />

                  <Input
                    status={errors.surname ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.surname}
                    label={'Soyisim'}
                    placeholder="Soyisim giriniz"
                    onChangeText={handleChange('surname')}
                    caption={errors.surname}
                  />

                  <Input
                    status={errors.email ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.email}
                    label={'E-posta'}
                    placeholder="E-posta giriniz"
                    onChangeText={handleChange('email')}
                    caption={errors.email}
                  />

                  <Input
                    status={errors.phone ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.phone}
                    label={'Telefon'}
                    placeholder="Telefon numarası giriniz"
                    onChangeText={handleChange('phone')}
                    caption={errors.phone}
                  />

                  <Input
                    status={errors.password ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.password}
                    label={'Şifre'}
                    placeholder="Şifre giriniz"
                    onChangeText={handleChange('password')}
                    caption={errors.password}
                  />

                  <Input
                    status={errors.passwordConfirm ? 'danger' : 'success'}
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.passwordConfirm}
                    label={'Şifre Onay'}
                    placeholder="Şifre giriniz"
                    onChangeText={handleChange('passwordConfirm')}
                    caption={errors.passwordConfirm}
                  />
                  <View style={{marginTop: 20}}>
                    <Toggle
                      checked={values.agreementConfirm}
                      onChange={value =>
                        setFieldValue('agreementConfirm', value)
                      }></Toggle>
                    <Text style={{color: '#FCF8F3', marginTop: 10}}>
                      Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını kabul
                      ediyorum.
                    </Text>
                    {errors.agreementConfirm && (
                      <Text style={{color: 'red'}}>
                        {errors.agreementConfirm}
                      </Text>
                    )}
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Button
                      style={{
                        marginTop: 30,
                        width: 250,
                        backgroundColor: '#86AB89',
                      }}
                      onPress={handleSubmit}
                      status="success">
                      KAYDET
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
