import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SignupSection, SignupContainer, Title, SubmitButton, FormSection, InputGroup, Label, Input, ErrorMessage } from './StyledFormComponents';
import { LogInFormValues } from './types';
import { loginValidationSchema } from './validationSchemas';
import { signIn } from '../../controller/authController'

const SignInForm = () => {
    const navigate = useNavigate();

    const formik = useFormik<LogInFormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await signIn(values)

                if (response) {
                    navigate('/');
                } else {
                    // const error = await response.text();
                    // alert('LogIn failed: ' + error);
                }
            } catch (error) {
                console.error('LogIn error:', error);
                alert('An error occurred during login. Please try again.');
            }
        },
    });

    return (
        <SignupSection>
            <SignupContainer>
                <Title>Sign in to TowUp</Title>
                <form onSubmit={formik.handleSubmit}>
                    <FormSection>
                        <InputGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <ErrorMessage>{formik.errors.email}</ErrorMessage>
                            )}
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <ErrorMessage>{formik.errors.password}</ErrorMessage>
                            )}
                        </InputGroup>
                    </FormSection>
                    <SubmitButton type="submit">Sign In</SubmitButton>
                </form>
            </SignupContainer>
        </SignupSection>
    );
};

export default SignInForm; 