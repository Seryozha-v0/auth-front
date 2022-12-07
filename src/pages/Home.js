import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLogOut, fetchLogin, selectIsAuth } from '../redux/slices/auth';
import './index.css';

function Home() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();


    console.log(isAuth);

    const onClickLogout = async (values) => {
        if (window.confirm('Выйти из аккаунта?')) {
            const data = await dispatch(fetchLogOut(values));

            if ('error' in data) {
                window.confirm('Не удалось выйти');
            }
        };
    }

    return (
        <>
            {isAuth ? (
                <button onClick={onClickLogout} type="button">Выйти из аккаунта</button>
            ) : (
                <>
                    <p><Link to='/auth'>Sign in</Link></p>
                    <p><Link to='/register'>Register</Link></p>
                </>
            )}
        </>
    )

};

export default Home;