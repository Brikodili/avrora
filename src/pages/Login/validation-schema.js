import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required')
});
