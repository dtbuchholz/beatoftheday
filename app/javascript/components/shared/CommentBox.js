import React from "react";
import styled from "styled-components";
import $ from "jquery";

const Wrapper = styled.div`
  display: flex;
  background: purple;
  height: 100%;
  flex-direction: column;
  border-radius: 3px;
  padding: 5px;
  position: relative;
  box-shadow: 0 8px 6px -6px black;
  transform: scale(1, 1);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.03, 1.03);
  }
`;

const Heading = styled.div`
  font-size: 40px;
  width: 100%;
`;

const ThreadBox = styled.div`
  width: 100%;
`;

const Comment = styled.div`
  font-size: 14px;
  width: 100%;
`;

const CommentText = styled.div`
  font-size: 14px;
  color: white;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;

  input {
    margin: 0 5px 5px 5px;
    border-radius: 3px;
    border: 0;
  }

  div {
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  flex-grow: 3;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 3px;
  flex-grow: 1;
  background: white;
  color: #7d7d7d;
  margin-right: 5px;
  border: 0px;
  border-radius: 3px;
`;

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thread: [],
      newCommentText: "",
      loading: false,
    };
  }

  componentDidMount() {
    $.get(`/track_comments/${this.props.trackId}`).done((res) => {
      if (res.thread) {
        this.setState({
          thread: res.thread,
        });
      }
    });
  }

  createComment = () => {
    if (this.state.newCommentText.length === 0) return;
    this.setState({ loading: true });
    $.post(`/create_track_comment/${this.props.trackId}`, {
      text_content: this.state.newCommentText,
    }).done((res) => {
      const newThread = this.state.thread;
      newThread.push(res.comment);
      this.setState({
        thread: newThread,
        newCommentText: "",
        loading: false,
      });
    });
  };

  _handleKeyDown = (e) => {
    if (!this.state.loading && e.key === "Enter") {
      this.createComment();
    }
  };

  render() {
    return (
      <Wrapper>
        <Heading></Heading>
        <ThreadBox>
          {this.state.thread.map((comment, i) => {
            return (
              <Comment key={i}>
                <CommentText>{comment.text}</CommentText>
              </Comment>
            );
          })}
        </ThreadBox>
        {window.OPTIONS.current_user && (
          <React.Fragment>
            <InputWrapper>
              <StyledInput
                type="text"
                maxLength="766"
                onKeyDown={this._handleKeyDown}
                value={this.state.newCommentText}
                onChange={(event) => {
                  this.setState({
                    newCommentText: event.target.value,
                  });
                }}
              />
              <SubmitButton
                onClick={() => {
                  if (!this.state.loading) this.createComment();
                }}
              >
                Send
              </SubmitButton>
            </InputWrapper>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default CommentBox;