import { useEffect, useState } from 'react';
import { ActiveFond, AllFonds, IFond, ReturnInit } from '../types';

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

export function useInit(fonds: IFond[]): ReturnInit {
  const initialActiveFond: ActiveFond = { ...fonds[0], isActiveFond: true }
  const [activeFond, setActiveFond] = useState<ActiveFond|null>( initialActiveFond|| null)


  const passiveFondsLocal = fonds
    .filter((_, idx) => idx > 0)
    .map((fond) => {
      return {...fond, isActiveFond:false}
    })
  const [passiveFonds, setPassiveFonds] = useState<IFond[]|null>(passiveFondsLocal || null)


  const [allFonds, setAllFonds] = useState(setInitAllFonds())

  function setInitAllFonds(): AllFonds {
    if(activeFond?.id && (Array.isArray(passiveFonds) && passiveFonds.length > 0)) {
      return passiveFonds.concat([activeFond])
    }
    return []
  }

  useEffect(() => {
    setAllFonds((prevAllFonds) => {

      if(prevAllFonds.length > 0) {
        return prevAllFonds
          .map((fond) => {
            return {
              ...fond,
              isActiveFond: false
            }
          })
          .map((fond) => {
            if(fond.ticket === activeFond?.ticket) {
              return {
                ...fond,
                color:activeFond.color,
                percent:activeFond.percent,
                value:activeFond.value,
                isActiveFond: true
              }
            } else {
              return fond
            }
          })
      }
      return []
    })
  }, [activeFond])


  return [activeFond, passiveFonds, setActiveFond, setPassiveFonds, allFonds]
}