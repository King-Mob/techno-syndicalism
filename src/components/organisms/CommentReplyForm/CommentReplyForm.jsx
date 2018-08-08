import React from "react";
import { StyledForm, StyledFormError } from "styles";
import { FormItem } from "components/molecules";
import { ButtonSubmit } from "components/atoms";
import { withFormik } from "formik";
import { validateSignup, catchGqlErrors } from "util/functions";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  isSubmitting,
  comment_id
}) => (
  <StyledForm key={`comment_reply_form_${comment_id}`} onSubmit={handleSubmit}>
    <FormItem
      labelText="Leave a Comment: "
      value={values.content}
      name="content"
      type="textarea"
      onBlur={handleBlur}
      handleChange={handleChange}
    />
    {touched.content &&
      errors.content && <StyledFormError>{errors.content}</StyledFormError>}
    <ButtonSubmit text="Submit Comment" />
  </StyledForm>
);

const CommentForm = withFormik({
  initialValues: {
    content: ""
  },
  mapPropsToValues: props => ({
    content: ""
  }),
  validate: validateSignup,
  handleSubmit: (
    { content },
    { props, setSubmitting, setErrors, resetForm }
  ) => {
    const userId = props.user.id;
    const postId = props.post.id;
    const replyToCommentId = props.comment_id;
    props
      .createCommentReply({
        variables: {
          content,
          postId,
          userId,
          replyToCommentId
        },
        refetchQueries: ["postById"]
      })
      .then(data => {
        resetForm(this.initialValues);
      })
      .catch(err => setErrors(catchGqlErrors(err)));
  }
})(InnerForm);

export default withRouter(withApollo(CommentForm));
