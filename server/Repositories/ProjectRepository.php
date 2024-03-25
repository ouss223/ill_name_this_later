<?php

    include_once '../models/db.php';
    global $myDB;
    function addFavorite($show_name,$user_id)
    {
        global $myDB;
        $query = "INSERT INTO favorites (user_id, show_name) VALUES (?, ?)";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $success = $stmt->execute();
        return $success;
    }
    function addWatchlist($show_name,$user_id)
    {
        global $myDB;
        $query = "INSERT INTO watchlist (user_id, show_name) VALUES (?, ?)";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $success = $stmt->execute();
        return $success;
    }
    function getBlogPost()
    {
        global $myDB;
        $query = "SELECT * FROM blog_post";
        $result = $myDB->executeQuery($query);
        
        $blogpost = array();
        while ($row = $result->fetch_assoc()) {
            $blogpost[] = $row;
        }
        return $blogpost;
    }
    function getFavorites($user_id)
    {
        global $myDB;
        $query = "SELECT show_name FROM favorites WHERE user_id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $favorites = array();
        while ($row = $result->fetch_assoc()) {
            $favorites[] = $row['show_name'];
        }
        return $favorites;
    }
    function getWatchlist($user_id)
    {
        global $myDB;
        $query = "SELECT show_name FROM watchlist WHERE user_id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $watchlist = array();
        while ($row = $result->fetch_assoc()) {
            $watchlist[] = $row['show_name'];
        }
        return $watchlist;
    }
    function PostBlogPost($title,$content,$admin_id)
    {
        global $myDB;
        $query = "INSERT INTO blog_post (title, content,admin_id) VALUES (?, ?, ?)";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("ssi", $title, $content, $admin_id);
        $success = $stmt->execute();
        return $success;
    }
    function    removeFavorite($show_name,$user_id)
    {
        global $myDB;
        $query = "DELETE FROM favorites WHERE user_id = ? AND show_name = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $success = $stmt->execute();
        return $success;
    }
    function removeWatchlist($show_name,$user_id)
    {
        global $myDB;
        $query = "DELETE FROM watchlist WHERE user_id = ? AND show_name = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $success = $stmt->execute();
        return $success;
    }
    function checkInFavorites($show_name,$user_id)
    {
        global $myDB;
        $query = "SELECT * FROM favorites WHERE user_id = ? AND show_name = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    function checkInWatchlist($show_name,$user_id)
    {
        global $myDB;
        $query = "SELECT * FROM watchlist WHERE user_id = ? AND show_name = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("is", $user_id, $show_name);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }
    function    addComment($show_id,$comment,$user_id)
    {
        global $myDB;
        $query = "INSERT INTO comments (show_id, content, user_id) VALUES (?, ?, ?)";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("isi", $show_id, $comment, $user_id);
        $success = $stmt->execute();
        return $success;
    }
    function getComments($show_id,$user_id)
    {
        global $myDB;
        $query = "SELECT content,user_id FROM comments WHERE show_id = ? ";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("i", $show_id);
        $stmt->execute();
        $result = $stmt->get_result();
        //if its the user's comment add in head else add in tail , and include the entire row not only comment in array
        $comments = array();
        while ($row = $result->fetch_assoc()) {
            if($row['user_id'] == $user_id){
                array_unshift($comments,$row);
            }
            else{
                $comments[] = $row;
            }
        }
        return $comments;

    }
    function deleteComment($comment_id,$user_id)
    {
        global $myDB;
        $query = "DELETE FROM comments WHERE id = ? AND user_id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("ii", $comment_id, $user_id);
        $success = $stmt->execute();
        return $success;
    }
    function modifyComment($comment_id,$new_comment,$user_id)
    {
        global $myDB;
        $query = "UPDATE comments SET content = ? WHERE id = ? AND user_id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("sii", $new_comment, $comment_id, $user_id);
        $success = $stmt->execute();
        return $success;
    }


?>