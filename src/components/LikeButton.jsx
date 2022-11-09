import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData, useDbUpdate } from '../utilities/firebase';
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({user, pageID, review, data}) => {
    const reviewIndex = data[pageID].reviews.findIndex((element) => element.date === review.date)
    //console.log("reviewIndex", reviewIndex)

    const [update, result] = useDbUpdate(`/${pageID}/reviews/${reviewIndex}`);
    
    const findTimestamp = () => {
      
    }

    const likeReview = () => {
      if (!data[pageID].reviews[reviewIndex].likes) {
        update(
          {"likes": [user.id]}
        );       
      }
      else {
        update(
          {"likes": [user.id, ...data[pageID].reviews[reviewIndex].likes]}
        );  
      }
    };
  
    const unlikeReview = () => {
      const new_likes_list = data[pageID].reviews[reviewIndex].likes.filter((element) => {element !== user.id});

      update(
        {"likes": new_likes_list.length > 0 ? new_likes_list : ""}
      );  
    }

    const isLiking = user ? data[pageID].reviews[reviewIndex].likes.includes(user.id) : false;  

    return isLiking ? 
      <IconButton onClick={unlikeReview} color={"error"}>
        <FavoriteIcon />
      </IconButton> : 
      <IconButton onClick={likeReview}>
        <FavoriteBorderIcon />
      </IconButton>
}

export default LikeButton;