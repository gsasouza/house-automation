import * as React from 'react';
import Wave from 'react-wavify';
import { ThemeContext } from 'styled-components'

interface Props {
  color?: string;
}

const LoadingWave = ({ color }: Props) => {
  const theme = React.useContext(ThemeContext);
  const fill = theme.palette[color || 'secondary'];
  return (
    <Wave
      fill={fill}
      paused={false}
      options={{
        height: 20,
        speed: 0.4,
        points: 4,
      }}
    />
  );
}

export default LoadingWave;
