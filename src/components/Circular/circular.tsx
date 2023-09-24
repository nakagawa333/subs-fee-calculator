import { Box, CircularProgress, CircularProgressProps, CircularProgressPropsColorOverrides } from "@mui/material"
import { OverridableStringUnion } from '@mui/types';

type Props = {
  isLoading: boolean
  color:  OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
    CircularProgressPropsColorOverrides
  >
}

export default function CircularIndeterminate(props:Props) {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center'}}
    >
      {
        props.isLoading ? (
          <CircularProgress
            color={props.color}
          />
        ) : (
            <></>
        )
      }
    </Box>
  )
}
