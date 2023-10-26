import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Field, ErrorMessage } from 'formik'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'

const DatePicker_ = (props) => {

    const { label, name, placeholderText, iconColor, ...rest } = props;



    return (
        <Form.Group className="m-1">
            <Form.Label className="h6">{label}</Form.Label>

            <Field name={name}>
                {
                    (props) => {
                        const { field, form, meta } = props;
                        const { setFieldValue } = form;
                        const { value } = field;

                        return (
                            <div className="d-flex">
                                {/* <div className='input-group'></div> */}
                                <ReactDatePicker
                                    id={name}
                                    {...field}
                                    {...rest}
                                    className="form-control rounded-0 border border-end-0"
                                    
                                    selected={value}
                                    placeholderText={placeholderText}
                                    onChange={(val) => setFieldValue(name, val)}
                                // isInvalid={ meta.touched && !!meta.error }
                                />
                                <label 
                                 style={{'backgroundColor' : 'white'}}
                                className="input-group-text rounded-0 border border-start-0" htmlFor={name}>
                                    <i className={`bi bi-calendar-event-fill  text-${iconColor}`} ></i>
                                </label>



                            </div>
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component='div' className="text-danger" />


        </Form.Group>
    )
}

export default DatePicker_