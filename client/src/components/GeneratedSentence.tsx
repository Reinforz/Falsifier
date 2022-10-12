import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

export default function GeneratedSentenceComponent(props:any) {
  const [checked, setChecked] = React.useState([0]);




  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.generatedSentencesArr.map((value:string,id:number) => {
        const labelId = `checkbox-list-label-${id}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
    
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${id+1}. ${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
