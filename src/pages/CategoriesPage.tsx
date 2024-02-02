import {
    Divider,
    List,
    ListSubheader,
  } from "@mui/material";
  import LiTag from "../components/LiTag";
  import useCategories from "../hooks/useCategories";

  
  export default function CategoriesPage() {
      const { fetchedCategories, isLoading, isError } = useCategories();

      const style = {
          py: 0,
          width: '100vw',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          marginTop: '50px'
        };
    return (<>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ups! Error</p>}
      <List sx={style}
      subheader={
          <ListSubheader component='div' sx={{fontSize:"25px", position:"fixed", left:"50vw"}}>
              Categories List
          </ListSubheader>
          
      }>
      <Divider component="li" />
      {fetchedCategories && fetchedCategories.map((tag) => <LiTag key={tag.id} name={tag.name}/>)
    }
    </List>
    </>
    );
  }
  