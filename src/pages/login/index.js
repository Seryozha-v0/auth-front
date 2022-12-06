import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

function Auth() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if ('error' in data) {
            return window.confirm('Не удалось авторизоваться');
        }

        return <Navigate to="/" />;
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="auth">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="emailInput">
                    <input
                        type="email"
                        name="login"
                        placeholder="Введите эл. почту"
                        {...register('email', { required: 'Укажите почту' })} />
                    <span>{errors.email?.message}</span>
                </div>
                <div className="passwordlInput">
                    <input
                        type="password"
                        name="password"
                        {...register('password', { required: 'Введите пароль' })} />
                    <span>{errors.password?.message}</span>
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Auth;