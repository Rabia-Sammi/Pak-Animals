import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form, Button, Card } from 'react-bootstrap'


function Input(props) {

    const { label, name, type, placeholder, formGroupWidth, labelIcon, iconStyle, className, ...rest } = props;

    return (
        <>

            <Form.Group className={formGroupWidth}
                controlId={name}>

                {label &&
                    <label htmlFor={name} className="h6">{label}</label>
                }
                <Field name={name}>
                    {(props) => {
                        const { field, form, meta } = props;
                        // console.log('className ==== ', className);

                        return (
                            <>



                                <Form.Control
                                    {...field}
                                    type={type}
                                    className={className !== undefined ? className : ''}
                                    placeholder={placeholder}
                                    isInvalid={meta.touched && !!meta.error}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {/* {meta.error}     */}
                                    <ErrorMessage name={name} component='div' className="text-danger mb-2" />

                                </Form.Control.Feedback>

                            </>
                        )
                    }
                    }
                </Field>
            </Form.Group>
        </>
    )
}
export default Input
