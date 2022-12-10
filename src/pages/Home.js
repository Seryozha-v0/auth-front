import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchLogOut, fetchLogin, selectIsAuth } from '../redux/slices/auth';
import './index.css';

function Home() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    
    const onClickLogout = async (values) => {
        if (window.confirm('Выйти из аккаунта?')) {
            const data = await dispatch(fetchLogOut(values));

            if ('error' in data) {
                window.confirm('Не удалось выйти');
            }
        };
    }

    return (
        <div className='wrapper-forms'>
            <div className='container'>
                <div className="box"></div>
                <div className="container-forms">
                    <div className="container-info">

                        {isAuth ? (
                            <div className="info-item">
                                <div className="table">
                                    <div className="table-cell">
                                        <p>
                                            {`Добро пожаловать ${isAuth.name}!`}
                                        </p>
                                        <button onClick={onClickLogout} type="button" className="btn">Выйти из аккаунта</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )

};

export default Home;