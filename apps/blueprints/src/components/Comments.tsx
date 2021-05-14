import { FormEventHandler, useEffect, useState } from "react";
import { CommentWithUsername } from "@factorio-sites/types";
import { useAuth } from "../providers/auth";
import { Button } from "./Button";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { getLocaleDateFormat } from "@factorio-sites/web-utils";

interface CommentsProps {
  blueprint_page_id: string;
}

const AddCommentDiv = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  textarea {
    color: #fff;
    display: block;
    margin-top: 0.5rem;
    background: #414040;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 400px;
    min-height: 80px;
  }

  button {
    margin-top: 0.5rem;
  }
  .close {
    margin-left: 1rem;
  }
`;

const CommentDiv = styled.div`
  background: #4e4c4c;
  margin: 0.5rem 0;

  .delete {
    float: right;
  }
`;

export const Comments: React.FC<CommentsProps> = ({ blueprint_page_id }) => {
  const auth = useAuth();
  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [comments, setComments] = useState<CommentWithUsername[]>([]);
  const [commentBody, setCommentBody] = useState("");

  const fetchTopLevelComments = async () => {
    const result = await fetch(`/api/blueprint/comments?blueprint_page_id=${blueprint_page_id}`);
    const body = await result.json();
    setComments(body.comments);
  };

  useEffect(() => {
    fetchTopLevelComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitComment: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const result = await fetch("/api/blueprint/comment", {
      method: "POST",
      body: JSON.stringify({ blueprint_page_id, body: commentBody }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCommentBody("");
    setAddCommentOpen(false);
    console.log("result", await result.json());
    fetchTopLevelComments();
  };

  const onDelete = async (comment_id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    await fetch("/api/blueprint/comment", {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchTopLevelComments();
  };

  return (
    <div>
      {auth && (
        <AddCommentDiv>
          {addCommentOpen ? (
            <form onSubmit={onSubmitComment}>
              <div>Add a new comment</div>
              <textarea
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
              />
              <Button primary type="submit">
                Send
              </Button>
              <Button type="button" className="close" onClick={() => setAddCommentOpen(false)}>
                close
              </Button>
            </form>
          ) : (
            <Button onClick={() => setAddCommentOpen(true)}>Add comment</Button>
          )}
        </AddCommentDiv>
      )}
      {comments?.length ? (
        comments.map((comment) => (
          <CommentDiv key={comment.id}>
            <div>
              {(auth?.role === "moderator" || auth?.role === "admin") && (
                <div className="delete">
                  <Button onClick={() => onDelete(comment.id)}>[moderator] Delete</Button>
                </div>
              )}
              {comment.user.username} at{" "}
              {format(new Date(comment.created_at), getLocaleDateFormat() + " HH:mm")}
            </div>
            <div>{comment.body}</div>
          </CommentDiv>
        ))
      ) : (
        <div>There are no comments yet</div>
      )}
    </div>
  );
};
