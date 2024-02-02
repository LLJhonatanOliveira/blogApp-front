import styled from "styled-components";
import { Post } from "../protocols/postsProtocol";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { filter, page, postState, valueState } from "../atom/postAtom";
import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import DeleteItemDialog from "../dialog/DeleteItemDialog";
import { useNavigate } from "react-router-dom";
interface BoxPostProps {
  post: Post;
}
export default function BoxPost({ post }: BoxPostProps) {
  const value = useRecoilValue(valueState);
  const pageNumber = useRecoilValue(page);
  const filterData = useRecoilValue(filter);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [postEdit, setPost] = useRecoilState(postState)
  const navigate = useNavigate()

  const handleOpenDeleteDialog = (id: number) => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  function handleDeleteItem() {
    const promise = axios.delete(`/delete-post/${post.id}`);
    promise
      .then((res) => {
        console.log(res.data);
        mutate(`/get-posts-user?page=${pageNumber}&filter=${filterData}`);
        mutate(`/get-posts?page=${pageNumber}&filter=${filterData}`);
      })
      .catch((err) => {
        console.log(err);
      });

    handleCloseDeleteDialog();
  }

  return (
    <ContainerPost>
      <img src={post.image} alt="" />
      <PostBody>
        <h1>
          {post.title} | @{post.user.userName}
        </h1>
        <span>{post.description}</span>
        <h2>
          {post.category?.name} | #{post.tag?.name}
        </h2>
      </PostBody>
      {value === 1 && (
        <>
          <DeleteIcon
          onClick={() => handleOpenDeleteDialog(post.id)}
            sx={{ position: "absolute", right: "2%", top: "5%" }}
            
          />
          <EditIcon onClick={() => {
            setPost(post)
            navigate(`/posts/${post.id}`)}} 
          sx={{ position: "absolute", right: "5%", top: "5%" }} />
        </>
      )}
      <DeleteItemDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onDelete={() => handleDeleteItem()}
                    post={post}
                  />
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  display: flex;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: relative;
  img {
    width: 180px;
    height: 120px;
   
  }
  h1 {
    font-size: 25px;
    margin-bottom: 5px;
    color: #831515;
  }
  h2 {
    margin-top: 5px;
    font-size: 15px;
    position: absolute;
    bottom: 8px;
    color: #831515;
  }
  span {
    display: flex;
    font-size: 18px;
    margin-top: 3px;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px;
`;
