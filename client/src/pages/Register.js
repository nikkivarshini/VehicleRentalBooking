import React from 'react';
import { Row, Col, Form, Input, Button, Anchor } from 'antd';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';

function Register() {
    const dispatch = useDispatch();

    function onFinish(values) {
        const { cpassword, ...otherValues } = values;
        const formattedValues = {
            ...otherValues,
            confirmPassword: values.cpassword
        };
        console.log('Registering user with values:', formattedValues);
        dispatch(userRegister(formattedValues));
    }

    return (
        <div>
            <Row gutter={16} style={{ marginTop: 100 }}>
                <Col lg={8}></Col>
                <Col lg={8} className="login">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter your username' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="cpassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ marginBottom: 4 }}>
                            Register
                        </Button>
                        <br />
                        <Anchor
                            items={[
                                {
                                    key: 'login',
                                    href: '/login',
                                    title: 'Click here to login',
                                },
                            ]}
                        />
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
