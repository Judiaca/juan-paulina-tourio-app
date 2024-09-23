import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton, StyledButtonDelete } from "./StyledButton.js";
import { useState } from "react";
import { mutate } from "swr";

export default function Comments({ locationName, comments, placeId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  async function handleSubmitComment(e) {
    e.preventDefault();

    const newComment = {
      name,
      comment,
      place: placeId,
    };

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (response.ok) {
      setName("");
      setComment("");
      mutate(`/api/places/${placeId}`);
    } else {
      console.error("Error adding comment");
    }
  }

  async function handleDeleteComment(commentId) {
    const response = await fetch(`/api/comments?commentId=${commentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Comment successfully deleted.");
      mutate(`/api/places/${placeId}`);
    } else {
      console.error("Error deleting comment");
    }
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="comment">Your Comment</Label>
        <Input
          type="text"
          name="comment"
          placeholder="comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && comments.length > 0 && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ _id, name, comment }) => {
            return (
              <CommentContainer key={_id}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>

                <StyledButtonDelete
                  type="button"
                  onClick={() => handleDeleteComment(_id)}
                >
                  Delete
                </StyledButtonDelete>
              </CommentContainer>
            );
          })}
        </>
      )}
    </Article>
  );
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  text-align: center;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  // USER:
  p {
    border-bottom: solid 1px black;
    text-align: center;
    margin-bottom: 10px;
  }

  // COMMENT:
  span {
    word-break: break-word;
    max-width: 80%;
    margin-bottom: 10px;
  }
`;
