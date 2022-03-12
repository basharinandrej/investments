import { countriesLogo } from '../../helper/helper';
import { ActiveFond, IFond, TicketType } from '../../types';
import React, { ChangeEvent, VFC } from 'react';

interface IProps {
  fond: IFond | ActiveFond;
  onChangeValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeColorHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const Fond:VFC<IProps> = (props) => {
  const {fond, onChangeValueHandler, onChangeColorHandler} = props
  return (
    <div key={fond?.id}>
      <label>{fond?.ticket} - {countriesLogo[fond?.ticket as TicketType]} </label>
      <input
        type="text"
        data-id={fond?.ticket}
        value={fond?.value}
        onChange={onChangeValueHandler}
      />
      <br/>
      <label>Цвет</label>
      <input
        type="color"
        data-id={fond?.ticket}
        value={fond?.color}
        onChange={onChangeColorHandler}
      />
      <br/>
      <strong>{fond?.percent}&nbsp;%</strong>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Fond