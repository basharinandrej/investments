export type TicketType = 'FXRL' | 'FXUS'

export interface IFond {
  id: string | number,
  value: number,
  percent: number,
  ticket: TicketType | string,
  color: string
}

export type ActiveFond = IFond | null

export type ReturnInit = [
  activeFond: IFond | null,
  setActiveFond: (value: (prev: IFond | null) => IFond | null) => void
]
