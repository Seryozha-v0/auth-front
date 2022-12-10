import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

function Registr() {
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if ('error' in data) {
            return window.confirm('Не удалось регистрироваться');
        }

        return <Navigate to="/" />;
    };

    if (isAuth) {
        console.log(true);
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
                                        Уже есть аккаунт?
                                    </p>
                                    <Link to='/auth' className="btn">
                                        Авторизоваться
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-form">

                        <form className="form-item log-in" onSubmit={handleSubmit(onSubmit)}>
                            <div className="table">
                                <div className="table-cell">
                                    <div className={errors.name ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Введите ФИО"
                                            {...register('name', { required: 'Укажите имя' })} />
                                        <div className='form-item__error'>{errors.name?.message}</div>
                                    </div>
                                    <div className={errors.email ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="email"
                                            name="login"
                                            placeholder="Введите эл. почту"
                                            {...register('email', { required: 'Укажите почту' })} />
                                        <div className='form-item__error'>{errors.email?.message}</div>
                                    </div>
                                    <div className={errors.password ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Введите пароль"
                                            {...register('password', { required: 'Укажите пароль', minLength: {value: 8, message: "Слишком короткий пароль"}  })} />
                                        <div className='form-item__error'>{errors.password?.message}</div>
                                    </div>
                                    <div className={errors.cpassword ? 'form-item__input form-item__input_error' : 'form-item__input'}>
                                        <input
                                            type="password"
                                            name="cpassword"
                                            placeholder="Повторите пароль"
                                            {...register('cpassword', { required: true, minLength: 8, validate: (value) => value === getValues("password") || 'Пароли не совпадают'})} />
                                        <div className='form-item__error'>{errors.cpassword?.message}</div>
                                    </div>
                                    <button className="btn" type="submit">Регистрироватся</button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Registr;