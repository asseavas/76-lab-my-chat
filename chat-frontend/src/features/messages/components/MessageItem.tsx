import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { Message } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  message: Message;
}

const MessageItem: React.FC<Props> = ({ message }) => {
  return (
    <Grid container direction="column">
      <Grid item sx={{ alignSelf: 'end', mb: 1 }} color="text.secondary">
        <Typography variant="body2">
          <span>{dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}</span>
        </Typography>
      </Grid>
      <Grid item>
        <Card sx={{ width: '100%' }}>
          <div style={{ paddingInline: '15px', paddingBlock: '20px' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                pb: 1,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              {message.author}
            </Typography>
            <Typography variant="body1">{message.message}</Typography>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MessageItem;
