import { FormEventHandler, useEffect, useState } from "react";
import { CommentWithUsername } from "@factorio-sites/types";
import { useAuth } from "../providers/auth";
import { Button } from "./Button";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { getLocaleDateFormat } from "@factorio-sites/web-utils";
import Link from "next/link";
import { IoMdTrash } from "react-icons/io";

interface CommentsProps {
  blueprint_page_id: string;
}

const AddCommentDiv = styled.div`
  textarea {
    color: #fff;
    display: block;
    margin: 0.5rem 0;
    background: #414040;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    min-height: 140px;
    padding: 8px;
  }

  button {
    margin-top: 0.5rem;
  }
  .close {
    margin-left: 1rem;
  }
`;

const CommentDiv = styled.div`
  background: #575959;
  margin: 1rem 0;
  padding: 10px;
  border-radius: 4px;

  hr {
    border-color: #777;
    height: 2px;
    margin: 12px auto;
  }

  .username {
    color: #ffe6c0;
  }

  .delete {
    float: right;
    margin-right: 2px;

    button {
      vertical-align: middle;

      svg {
        fill: #ff7e00;
      }

      &:hover {
        svg {
          fill: #ee3f07;
        }
      }
    }
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
    if (!confirm("Are you sure you want to delete this comment?")) return;
    await fetch("/api/blueprint/comment", {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
      headers: { "Content-Type": "application/json" },
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
                Close
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
            <div className="comment-info">
              {(auth?.role === "moderator" ||
                auth?.role === "admin" ||
                auth?.user_id === comment.user_id) && (
                <div className="delete">
                  <button onClick={() => onDelete(comment.id)}>
                    <IoMdTrash />
                  </button>
                </div>
              )}
              <Link href={`/?user=${comment.user_id}`}>
                <a className="username">{comment.user.username}</a>
              </Link>{" "}
              at {format(new Date(comment.created_at), getLocaleDateFormat() + " HH:mm")}
            </div>
            <hr />
            <div>{comment.body}</div>
          </CommentDiv>
        ))
      ) : (
        <div>There are no comments yet</div>
      )}
    </div>
  );
};
