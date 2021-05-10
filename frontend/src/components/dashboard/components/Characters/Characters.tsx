import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../../../../features/character'
import { CharacterAction } from '../../../../features/character/actionTypes'
import { StatusType } from '../../../../features/global-types'
import { Loading } from '../../../loader/loader'
import { CharacterTableHeader } from './components/table/TableHeader'
import { CharacterTableRow } from './components/table/TableRow'

import styles from './styles.module.scss'

export const Characters = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({
    realm: '',
    name: '',
  })
  const dispatch = useDispatch()
  const characters = useSelector(selectors.getCharacters)
  const status = useSelector(selectors.getStatus)

  useEffect(() => {
    if (!characters.length && status !== StatusType.PENDING) {
      dispatch({ type: CharacterAction.GetCharacters })
    }
  }, [])

  const handleFormChange = (fieldName: string) => {
    return ({ target }: any) => {
      setAddForm({
        ...addForm,
        [fieldName]: target.value,
      })
    }
  }

  const onAddSubmit = (evt: any) => {
    evt.preventDefault()
    dispatch({ type: CharacterAction.AddCharacter, payload: addForm })
    setShowAdd(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <button type="button" onClick={() => setShowAdd(!showAdd)}>
          add<span className={styles.accent}>character</span>
        </button>
        {showAdd && (
          <form className={styles.addForm} onSubmit={onAddSubmit}>
            <div className={styles.field}>
              <span>name</span>
              <input onChange={handleFormChange('name')} value={addForm.name} />
            </div>
            <div className={styles.field}>
              <span>realm</span>
              <input
                onChange={handleFormChange('realm')}
                value={addForm.realm}
              />
            </div>
            <button type="submit" onClick={onAddSubmit}>
              <span className={styles.btnAccent}>add</span>
            </button>
          </form>
        )}
      </div>
      <Loading show={status === StatusType.PENDING} overlay duration={300} />
      <div className={styles.items}>
        <CharacterTableHeader />
        {characters.map((char) => (
          <CharacterTableRow key={char.id} char={char} />
        ))}
      </div>
    </div>
  )
}
