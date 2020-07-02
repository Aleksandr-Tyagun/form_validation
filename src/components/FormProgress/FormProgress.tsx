import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './FormProgress.scss';

type Props = {
  total: number;
  current: number;
}

export const FormProgress: React.FC<Props> = ({ total, current }) => {
  const circles = Array.from(Array(total), (_, i) => i + 1);

  return (
    <div className="FormProgress">
      {circles.map(circle => (
        <React.Fragment key={uuidv4()}>
          <span
            key={uuidv4()}
            className={classNames(
              'FormProgress__Circle',
              { 'FormProgress__Circle--active': circle === current },
              { 'FormProgress__Circle--disabled': circle > current }
            )}>
            {circle}
          </span>
          {circle !== circles.length && (
            <span className="FormProgress__Line" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
