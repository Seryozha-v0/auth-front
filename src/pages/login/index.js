import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
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
        <div className='wrapper-forms'>
            <div className='container'>
                <div className="box"></div>
                <div className="container-forms">

                    <div className="container-info">
                        <div className="info-item">
                            <div className="table">
                                <div className="table-cell">
                                    <p>
                                        Нет аккаунта?
                                    </p>
                                    <Link to='/register' className="btn">
                                        Регистрация
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-form">

                        <form className="form-item log-in" onSubmit={handleSubmit(onSubmit)}>
                            <div className="table">
                                <div className="table-cell">
                                    <div className={errors.email ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="email"
                                            name="login"
                                            placeholder="Введите эл. почту"
                                            {...register('email', { required: 'Укажите почту' })} />
                                        <div className="form-item__error">{errors.email?.message}</div>
                                    </div>
                                    <div className={errors.password ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Введите пароль"
                                            {...register('password', { required: 'Введите пароль' })} />
                                        <div className="form-item__error">{errors.password?.message}</div>
                                    </div>
                                    <button className="btn" type="submit">Войти</button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth;