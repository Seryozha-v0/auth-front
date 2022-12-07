import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, redirect } from 'react-router-dom';
import { fetchLogin, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';

function Registr() {
    const isAuth = useSelector(selectIsAuth);
    const [ avatarUrl, setAvatarUrl ] = React.useState('');

    const inputFileRef = React.useRef(null);
    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            setAvatarUrl(data.url);
        } catch (error) {
            console.log(error);
            alert('Ошибка загрузки файла');
        }
    };
    const onClickRemoveImage = () => {
        setAvatarUrl('');
    };

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            name: '',
            avatarUrl: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        values.avatarUrl = avatarUrl;
        const data = await dispatch(fetchRegister(values));

        if ('error' in data) {
            return window.confirm('Не удалось регистрироваться');
        }

        return <Navigate to="/" />;
    };

    if (isAuth) {
        console.log(true);
        return <Navigate to="/" />;
    } else {
        console.log(false);
    }

    return (
        <div className="registr">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="name"
                    placeholder="Введите ФИО"
                    {...register('name', { required: 'Укажите имя' })} />
                <button type="button" onClick={() => inputFileRef.current.click()}>
                    Загрузить автарку
                </button>
                <input
                    ref={inputFileRef}
                    onChange={handleChangeFile}
                    type="file"
                    name="avatarUrl"
                    hidden />
                {avatarUrl && (
                    <>
                        <img src={`http://localhost:4400${avatarUrl}`} width="5%" alt="avatarPreview" />
                        <button type="button" onClick={onClickRemoveImage}>
                            Удалить автарку
                        </button>
                    </>
                )}
                <input
                    type="email"
                    name="login"
                    placeholder="Введите эл. почту"
                    {...register('email', { required: 'Укажите почту' })} />
                <input
                    type="password"
                    name="password"
                    {...register('password', { required: 'Укажите пароль' })} />
                <button disabled={!isValid} type="submit">Регистрироватся</button>
            </form>
        </div>
    )
}

export default Registr;