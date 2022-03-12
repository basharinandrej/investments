import React, { useState, ChangeEvent, FocusEvent } from 'react';
import './App.css'
import {
  boxStyle, calcNewPercent,
  countriesLogo,
  getBoxElementStyle, LIMIT_HEIGHT, useInit
} from './helper/helper';
import { ActiveFond, IFondType } from './types';
import Fond from './components/Fond/Fond';


const initialState:IFondType[] | [] = [{id: 1, value: 100, percent: 20, ticket: 'FXRL', color: '#2a19bb'}]

const initialStateForFiledFocus: string | null = initialState[0]?.ticket || null

function App() {
  const [idFieldFocus, setIdFieldFocus] = useState<string | null>(initialStateForFiledFocus)
  const [fonds, setFonds] = useState<IFondType[] | []>(initialState)
  const [err, setErr] = useState<string | null>(null)

  const [activeFond, setActiveFond] = useInit(fonds)

  function onChangeValueHandler(e: ChangeEvent<HTMLInputElement>): void {
    const {id: inputId} = e.target.dataset
    const value = e.target.value
    const isNumberValue = typeof Number(value) === 'number' && !isNaN(Number(value))

    if(isNumberValue) {
      setActiveFond((prev: ActiveFond) => {
        if (Number(value) > LIMIT_HEIGHT) {
          setErr(`Введённое значение не может быть больше ${LIMIT_HEIGHT}`)
          return prev
        }
        if(prev) {
          if(prev.ticket === inputId) {
            setErr(null)
            return {
              ...prev,
              value: Number(value),
              percent: calcNewPercent(Number(value))
            }
          } else {
            return prev
          }
        } else {
          return fonds[0]
        }
      })
    }
  }

  function onChangeColorHandler(e: ChangeEvent<HTMLInputElement>): void {
    const {id: inputId} = e.target.dataset
    const color = e.target.value
    setFonds((prev) => {
      return prev.map((fond) => {
        if(fond.ticket === inputId) {
          return {
            ...fond, color
          }
        } else {
          return fond
        }
      })
    })
  }

  function onFocusWrapperHandler(e: FocusEvent<HTMLDivElement>): void {
    const {id: inputId} = e.target.dataset
    setIdFieldFocus(inputId as string)
  }

  return (
    <div className="app">
      <div className="app-row" onFocus={onFocusWrapperHandler}>
        <div className="app-wrapper">
          {err ?? <p>{err}</p>}
          <br/>
          {JSON.stringify([activeFond])}
          <br/>
          <br/>

          {activeFond?.id ? <Fond
            fond={activeFond}
            onChangeColorHandler={onChangeColorHandler}
            onChangeValueHandler={onChangeValueHandler}
          /> : <p>not found fonds</p>}
        </div>
      </div>


      <div className={'box'} style={boxStyle}>
        {fonds.map((fond, idx) => {
          return (
            <div key={idx} style={getBoxElementStyle(fond.color, fond.value)}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;