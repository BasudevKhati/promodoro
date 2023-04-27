import { useNavigate } from 'react-router-dom';
import './login.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export const LoginPage = () => {

    const schema = z
        .object({
            email: z
                .string()
                .email(),
            password: z
                .string()
                .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
                .regex(new RegExp(".*[a-z].*"), "One lowercase character")
                .regex(new RegExp(".*\\d.*"), "One number")
                .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),"One special character" )
                .min(8, "Must be at least 8 characters in length")
        })

    const { register, handleSubmit, formState: { errors, isValid }, } = useForm({ resolver: zodResolver(schema) });

    const navigate = useNavigate();

    const handleLogin=()=>{
        const token = Math.random().toString(36).substr(2);
        localStorage.setItem("token", token);
        if (isValid && token) {
            navigate('/timer');
        }
        console.log(token)
    };

    
    useEffect(() => {
    
        const storeToken = localStorage.getItem('token');
        if (storeToken && isValid) {
            navigate('/timer');
        }
    }, []); 

    return (
        <section className="login-page">
            <div className="container">
                <div className="login-box">
                    <div className="login-heading">
                        <h2>Login Form</h2>
                    </div>
                    <div className="login-wrapper">
                        <div className="login-input">
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <label>
                                    <b>Email*</b>
                                    <input type="email" name="email" placeholder="Enter your email" {...register('email')} />
                                    {errors.email && <i> {errors.email.message} </ i>}
                                </label>
                                <label>
                                    <b>Password*</b>
                                    <input type="password" name="password" placeholder="Enter your password"  {...register('password')} />
                                    {errors.password && <i>{errors.password.message}</i>}
                                </label>
                                <div className="login-checkbox">
                                    <label>
                                        <input type="checkbox" id='login' value='login' />
                                        <span>Remember me</span>
                                    </label>
                                </div>
                                <button type='submit' className="login-btn" onClick={handleLogin}>
                                    LOGIN
                                </button>
                            </form>
                        </div>
                        <div className="forgot-login">
                            <span>Don't have an account?</span>
                            <span>Forget password?</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

