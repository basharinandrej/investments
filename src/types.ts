export type TicketType = 'FXRL' | 'FXUS'

export interface IFond {
  id: string | number,
  value: number,
  percent: number,
  ticket: TicketType | string,
  color: string
  isActiveFond?: boolean
}

export type ActiveFond = IFond | null
export type AllFonds = IFond[] | []

export type ReturnInit = [
  activeFond: IFond | null,
  passiveFonds: IFond[] | null,
  setActiveFond: (value: (prev: IFond | null) => IFond | null) => void,
  setPassiveFonds: (value: (prev: IFond[] | null) => IFond[] | null) => void,
  allFonds: AllFonds
]
