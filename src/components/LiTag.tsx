import { Divider, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
interface LiTagProps {
  name: string;
}
export default function LiTag({name} :LiTagProps) {
  return (
    <>
      <ListItem>
        <ListItemText primary={name} />
        <EditIcon />
        <DeleteIcon />
      </ListItem>
      <Divider component="li" />
    </>
  );
}
