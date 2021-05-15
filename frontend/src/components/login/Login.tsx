import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../features/user/actionTypes'

import styles from './styles.module.scss'

export const Login = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const onChange = (name: string) => {
    return ({ target }: any) => {
      setForm({
        ...form,
        [name]: target.value,
      })
    }
  }

  const onSubmit = (evt: any) => {
    evt.preventDefault()
    dispatch({
      type: UserActions.Login,
      payload: {
        username: form.username.trim(),
        password: form.password.trim(),
      },
    })
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginWrapper}>
        <div className={styles.landingImg}>
          <LazyLoad height={400}>
            <img src="/img/landingpage.jpg" alt="landing" />
          </LazyLoad>
        </div>
        <div className={styles.form}>
          <h3>Login</h3>
          <form onSubmit={onSubmit}>
            <div className={styles.input}>
              <span className={styles.label}>username</span>
              <input
                type="input"
                value={form.username}
                name="username"
                onChange={onChange('username')}
              />
            </div>
            <div className={styles.input}>
              <span className={styles.label}>password</span>
              <input
                type="password"
                value={form.password}
                name="username"
                onChange={onChange('password')}
              />
            </div>
            <button className={styles.submit} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
