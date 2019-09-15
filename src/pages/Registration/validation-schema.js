import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  surname: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  email: Yup.string()
    .min(2, 'Too Short!')
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  role: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
    .min(8, 'Too Short!')
});
