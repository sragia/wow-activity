import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../../../../features/character'
import { CharacterAction } from '../../../../features/character/actionTypes'
import { StatusType } from '../../../../features/global-types'
import { Loading } from '../../../loader/loader'
import { CharacterHeader } from './components/CharacterHeader/CharacterHeader'

import styles from './styles.module.scss'

type Props = {
  params?: { [index: string]: string | undefined }
}

export const Character = ({ params }: Props) => {
  const dispatch = useDispatch()
  const character = useSelector(selectors.getCharacter)
  const status = useSelector(selectors.getStatus)
  useEffect(() => {
    if (params?.id) {
      dispatch({ type: CharacterAction.GetCharacter, payload: params?.id })
    }
  }, [params?.id])

  return (
    <div className={styles.wrapper}>
      {character && (
        <Helmet>
          <title>
            {character?.name}-{character?.realm} - wowactivity
          </title>
        </Helmet>
      )}
      <Loading show={status === StatusType.PENDING} duration={400} overlay />
      <CharacterHeader character={character} />
    </div>
  )
}

Character.defaultProps = {
  params: {},
}
