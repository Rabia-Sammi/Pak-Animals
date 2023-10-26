import React from 'react'
import {Field, ErrorMessage } from 'formik'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import TimePicker from 'react-time-picker'


const TimePicker_ = (props) => {

    const{label, name, ...rest} = props;



    return (
        <Form.Group className="m-2 m-5">
           <Form.Label className="h6">{label}</Form.Label>

           <Field name={name}>
               {
                   (props) => {
                       const{ field, form, meta} = props;
                       const{ setFieldValue } = form;
                       const { value } = field;

                       return(
                           <TimePicker 
                                id={name} 
                                {...field} 
                                {...rest} 
                                className="form-control"
                                selected={value}
                                onChange={(val) => setFieldValue(name, val)}
                                // isInvalid={ meta.touched && !!meta.error }
                           />
                       )
                   }
               }
           </Field>
           <ErrorMessage name={name} component='div' className="text-danger" />
        
        
        </Form.Group>
)
}

export  default TimePicker_