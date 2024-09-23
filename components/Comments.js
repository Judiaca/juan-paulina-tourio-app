import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
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

    // console.log("NEW COMMENT:", newComment);

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
          {comments.map(({ name, comment }, idx) => {
            return (
              <>
                <p key={idx}>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </>
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
  p {
    border-bottom: solid 1px black;
    padding: 20px;
  }
`;
