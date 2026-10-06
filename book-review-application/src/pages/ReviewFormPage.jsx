import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ReviewContext } from '../context';
import Rating from '../components/Rating';

const ReviewFormPage = () => {
  const { id } = useParams();
  const { submitReview } = useContext(ReviewContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await submitReview(id, values);
    navigate(`/books/${id}`);
  };

  return (
    <div className="review-form-container">
      <h2>Write a Review</h2>
      <Formik
        initialValues={{ rating: 3, content: '' }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="rating-section">
              <label>Rating:</label>
              <Rating
                value={values.rating}
                onChange={(rating) => setFieldValue('rating', rating)}
              />
            </div>

            <Field
              name="content"
              as="textarea"
              placeholder="Your review..."
              className="review-textarea"
            />

            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};