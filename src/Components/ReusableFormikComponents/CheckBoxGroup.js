import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'


function CheckBoxGroup(props) {
    const { label, name, control, options, className, formGroupClassName, ...rest } = props;

    return (
        <>
            <h4>{label}</h4>

            <Form.Group className={formGroupClassName}>

                <Field name={name} {...rest}>
                    {(props) => {
                        const { field, form, meta } = props;
                        // console.log(props);
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key}>
                                    <Form.Check
                                        {...field}
                                        inline
                                        className={className}
                                        checked={Boolean(field.value.includes(option.value))}
                                        label={option.key}
                                        type='checkbox'
                                        id={option.value}
                                        value={option.value}
                                        isInvalid={meta.touched && !!meta.error}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                    }
                </Field>
            </Form.Group>
            <ErrorMessage name={name} component='div' className="text-danger mb-2" />
        </>
    )
}
export default CheckBoxGroup
