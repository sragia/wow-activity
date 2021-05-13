import { IActivity, ICharacter, IGear } from './character.interface'

export interface IActivityResult {
  activity: IActivity
  gear?: IGear
  character: ICharacter
  createdAt: string
}
