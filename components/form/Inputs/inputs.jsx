import { useField } from 'formik';

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='input_group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CheckboxInput = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className='checkbox'>
        <input
          {...field}
          {...props}
          type='checkbox'
          className='checkbox-input'
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};
