import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from '@mui/material';
import { Post } from '../protocols/postsProtocol';
  
  interface DeleteItemDialogProps {
      open: boolean;
      onClose: () => void;
      onDelete: () => void;
      post: Post;
    }
    
  
  export default function DeleteItemDialog({ open, onClose, onDelete, post }:DeleteItemDialogProps){
      const handleDeleteItem = () => {
          onDelete();
        };
      return (
          <Dialog open={open} onClose={onClose}>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete post {post.title}?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteItem} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )
  }