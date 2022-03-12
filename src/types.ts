export type TicketType = 'FXRL' | 'FXUS'

export interface IFondType {
  id: string | number,
  value: number,
  percent: number,
  ticket: TicketType | string,
  color: string
}

export type ActiveFond = IFondType | null

export type ReturnInit = [
  activeFond: IFondType | null,
  setActiveFond: (value: (prev: IFondType | null) => IFondType | null) => void
]
