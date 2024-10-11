import PropTypes from 'prop-types';
import React from 'react';
import { useFormik } from 'formik';
import { v4 as uuid4 } from 'uuid';

function NewBoxForm({ addBox }) {
  const formik = useFormik({
    initialValues: {
      backgroundColor: '',
      width: '',
      height: ''
    },
    validate: values => {
      const errors = {};
      if (!values.backgroundColor ||
        !values.width ||
        !values.height) {
        errors.task = 'Required';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      addBox(prev => [...prev, {...values, key: uuid4() }]);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} >
      <input
        id="backgroundColor"
        name="backgroundColor"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.backgroundColor}
        placeholder="Background Color"
        />
      <input
        id="width"
        name="width"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.width}
        placeholder="Width"
        />
      <input
        id="height"
        name="height"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.height}
        placeholder="Height"
        style={{
          maxWidth: "100px"
        }}
        />
      <button type="submit">Add Box</button>
    </form>
  );
}

NewBoxForm.propTypes = {
  addBox: PropTypes.func.isRequired
};

export default NewBoxForm;