import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../styles/Signup.css'

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};


// And now we can use these
export default function LoginForm() {
    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    userName: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    password: Yup.string().required("Please provide a valid password"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);


                }}
            >
                <Form>
                    <MyTextInput
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Enter username"
                    />

                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    />

                    <button type="submit" >Submit</button>
                </Form>
            </Formik>
        </>
    );
};