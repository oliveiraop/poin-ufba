import styles from '../styles/Home.module.css'
import Head from 'next/head'

export default function Login() {

    return (
        <div className={styles.container} >
            <h1>Login</h1>
            <div className={styles.main}>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />
                
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />


                <button type="submit">Login</button>
                <Link href='/'>
                    <button type="submit">Cancel</button>
                </Link>
                <label>
                <input className={styles.input} type="checkbox" name="remember" /> Remember me
                </label>
            </div>
        </div>
    )
}