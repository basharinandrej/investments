import { useState } from 'react';
import { ActiveFond, IFondType, ReturnInit } from '../types';

export const LIMIT_HEIGHT = 500
export const ONE_PERCENT = 5 // 1% = 5
export const ONE_HUNDRED_PERCENT = 100

export const boxStyle = {
  height: LIMIT_HEIGHT,
  maxHeight: LIMIT_HEIGHT
}

export const countriesLogo = {
  'FXRL': '🇷🇺',
  'FXUS':'🇺🇸'
}

export const getBoxElementStyle = (color: string, height= 200, width = 300 ) => {
  return {
    backgroundColor: color,
    height: height + 'px',
    maxHeight: LIMIT_HEIGHT + 'px',
    width: width + 'px',
    transition: '.3s'
  }
}

export function calcNewPercent(value: number): number {
  return value/ONE_PERCENT
}

export function useInit(fonds: IFondType[]): ReturnInit {
  const [activeFond, setActiveFond] = useState<ActiveFond|null>(fonds[0] || null)
  return [activeFond, setActiveFond]
}