<?php

    include_once '../models/db.php';
    global $myDB;
    function sanitizeInput($input) {
        //confused cause it screws with some data
        return $input;
    }
    
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
    function PostBlogPost($title, $content, $admin_id, $imagePath)
{
    global $myDB;
    $query = "INSERT INTO blog_post (title, content, admin_id, image) VALUES (?, ?, ?, ?)";
    $stmt = $myDB->prepare($query);
    
    $stmt->bind_param("ssis", $title, $content, $admin_id, $imagePath);
    
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
    function addComment($show_id, $comment, $user_id, $episode, $season)
{
    global $myDB;
    $query = "INSERT INTO comments (show_id, content, user_id, episode, season) VALUES (?, ?, ?, ?, ?)";
    $stmt = $myDB->prepare($query);
    $stmt->bind_param("ssiii", $show_id, $comment, $user_id, $episode, $season);
    $success = $stmt->execute();
    return $success;
}

function getComments($show_id, $user_id, $episode, $season)
{
    global $myDB;
    $query = "SELECT c.user_id, c.id, c.content, c.timestamp, u.username 
              FROM comments c
              LEFT JOIN users u ON c.user_id = u.id
              WHERE c.show_id = ? AND c.episode = ? AND c.season = ?";
    $stmt = $myDB->prepare($query);
    $stmt->bind_param("sii", $show_id, $episode, $season);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // if it's the user's comment, add at the beginning; otherwise, add at the end
    $comments = array();
    while ($row = $result->fetch_assoc()) {
        $row['own'] = ($row['user_id'] == $user_id) ? true : false;

        if ($row['own']) {
            array_unshift($comments, $row);
        } else {
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
        $query = "UPDATE comments SET content = ? WHERE id = ? ";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("si", $new_comment, $comment_id);
        $success = $stmt->execute();
        return $success;
    }
    function uploadImage($imageBase64)
{
    $targetDir = "/Users/ous223/Documents/projet sellaouti/ill_name_this_later/front/public/storage/";

    $imageData = base64_decode($imageBase64);

    $uniqueFilename = uniqid() . '.png';

    $targetFile = $targetDir . $uniqueFilename;

    if (file_put_contents($targetFile, $imageData) !== false) {
        $relativePath = '/storage/' . $uniqueFilename;
        return $relativePath;
    } else {
        return false;
    }
}

    

    




?>