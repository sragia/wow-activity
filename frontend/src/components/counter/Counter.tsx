import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionTypes, selectors } from '../../features/counter'
import { selectors as userSelectors } from '../../features/user'
import { UserActions } from '../../features/user/actionTypes'

const Counter: React.FC = () => {
  const count = useSelector(selectors.getCountValue)
  const user = useSelector(userSelectors.getUser)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Counter component</span>
              <h4>
                Counter: <strong>{count}</strong>
              </h4>
              <p>
                Here you can increment and decrement counter value using buttons
                below. All the state updates are performed via redux actions.
              </p>
            </div>
            <div className="card-action">
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat blue"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() =>
                    dispatch({ type: actionTypes.DECREMENT_COUNTER })
                  }
                >
                  decrement
                </button>
                <button
                  className="waves-effect waves-teal btn-flat red"
                  type="button"
                  data-qa="increment-counter"
                  onClick={() =>
                    dispatch({ type: actionTypes.INCREMENT_COUNTER })
                  }
                >
                  increment
                </button>
                {user && (
                  <div>
                    {user.username}
                    {user.avatar}
                  </div>
                )}
                <button
                  className="waves-effect waves-teal btn-flat red"
                  type="button"
                  data-qa="increment-counter"
                  onClick={() =>
                    dispatch({
                      type: UserActions.Login,
                      payload: { username: 'Exality', password: 'banaans94' },
                    })
                  }
                >
                  increment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Counter
