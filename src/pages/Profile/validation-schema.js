import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  surname: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
});
