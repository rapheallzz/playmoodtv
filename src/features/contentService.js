import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

// Function to update localStorage for adding or removing content from the watchlist
const updateLocalStorage = (contentId, action) => {
  // Retrieve user object from localStorage
  let user = JSON.parse(localStorage.getItem('user'));

  // Check if action is 'add' or 'remove'
  if (action === 'add') {
      // Push the new contentId to the watchlist array
      user.watchlist.push(contentId);
  } else if (action === 'remove') {
      // Find the index of the contentIdToRemove in the watchlist array
      let index = user.watchlist.indexOf(contentId);

      // If the contentIdToRemove exists in the watchlist array, remove it
      if (index !== -1) {
          user.watchlist.splice(index, 1);
      }
  }

  // Stringify the updated user object
  let updatedUser = JSON.stringify(user);

  // Save the updated user object back to localStorage
  localStorage.setItem('user', updatedUser);
};

const updateLocalStorageLike = (contentId, action) => {
  // Retrieve user object from localStorage
  let user = JSON.parse(localStorage.getItem('user'));

  // Check if action is 'add' or 'remove'
  if (action === 'like') {
      // Push the new contentId to the watchlist array
      user.like.push(contentId);
  } else if (action === 'unlike') {
      // Find the index of the contentIdToRemove in the watchlist array
      let index = user.like.indexOf(contentId);

      // If the contentIdToRemove exists in the watchlist array, remove it
      if (index !== -1) {
          user.like.splice(index, 1);
      }
  }

  // Stringify the updated user object
  let updatedUser = JSON.stringify(user);

  // Save the updated user object back to localStorage
  localStorage.setItem('user', updatedUser);
};


// const likeContent = async ({ userId, contentId }) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/user/like/${userId}`, { contentId }); // Ensure userId is passed correctly as a string
//       console.log('Content liked successfully:', response);
      
//       return response.data; // Assuming the response contains updated content data
//     } catch (error) {
//       console.error('Error liking content:', error);
//       throw error;
//     }
//   };

const likeContent = async ({ userId, contentId }) => {
  try {
    const response = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/like/${userId}`, { contentId }); // Ensure userId is passed correctly as a string
    updateLocalStorageLike(contentId, "like");
      alert("user liked this content");
  
    // console.log('Content liked successfully:', response);
    
    return response.data; // Assuming the response contains updated content data
  } catch (error) {
    console.error('Error liking content:', error);
    throw error;
  }
};

// // Unlike content
const unlikeContent = async ({userId, contentId}) => {
    try {
      // Make the PUT request to unlike the content
      const response = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/unlike/${userId}`, { contentId });
      updateLocalStorageLike(contentId, "unlike");
      alert("user unlike this content");


      console.log('Content unliked successfully:', response); // Log the response data
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error unliking content:', error);
      throw error;
    }
  };

  const addToWatchlist = async ({ userId, contentId }) => {
    try {
        // Make the API call to add content to watchlist
        const response = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/watchlist/${userId}`, { contentId });

        // Update localStorage
        updateLocalStorage(contentId, "add");

        // Optionally, you can dispatch an action to update the UI here

        // Alert user
        alert("Content added to watchlist");

        // Log the response data
        console.log('Content added to watchlist:', response.data);

        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        // Handle error, show error message to the user
    }
};

  const removeFromWatchlist = async ({ userId, contentId }) => {
    try {
        // Make the API call to remove content from watchlist
        const response = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/unwatch/${userId}`, { contentId });

        // Update localStorage
        updateLocalStorage(contentId, 'remove');

        // Optionally, you can dispatch an action to update the UI here

        // Alert user
        alert("Content removed from watchlist");

        // Log the response data
        console.log(response);

        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        // Handle error, show error message to the user
    }
};

  

const contentService = {
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist, 
};

export default contentService;
