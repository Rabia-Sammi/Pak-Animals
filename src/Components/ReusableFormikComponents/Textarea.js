import React from 'react'
import {Field, ErrorMessage} from 'formik'
import { Form, Button, Card } from 'react-bootstrap'


function Textarea(props) {
    const{ label , name , ...rest} = props

    return (
        <Form.Group className="" controlId={name}>
        <Form.Label className="h6">{label}</Form.Label>

        <Field  name={name}>
        {(props) => {
                const {field, form, meta} = props;
                    return (
                        <>
                            <Form.Control
                                as="textarea"
                                {...rest}
                                {...field}
                                isInvalid={ meta.touched && !!meta.error }
                            /> 
                            <Form.Control.Feedback type="invalid" className='mb-3 m-2'>
                                {meta.error}    
                            </Form.Control.Feedback>
                        </>                                  
                    )}
        }

        </Field>     
        </Form.Group>
)
}

export default Textarea
