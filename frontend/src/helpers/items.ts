import { IGear } from '../interfaces/character.interface'

export const prepareWowheadItem = (gear: IGear) => {
  let itemString = `item=${gear.itemId}`

  if (gear.bonusList) {
    itemString += '&bonus='
    itemString += gear.bonusList.join(':')
  }

  return itemString
}
