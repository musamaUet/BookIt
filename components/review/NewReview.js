import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { newReview, clearErrors } from '../../redux/actions/roomActions';
import { NEW_REVIEW_RESET } from '../../redux/constants/roomConstants';

const NewReview = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	console.log('router.query', router.query);
	const { id } = router.query;

	const { success, error } = useSelector((state) => state.newReview);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (success) {
			toast.success('Review is posted successfully!');
			dispatch({ type: NEW_REVIEW_RESET });
		}
	}, [dispatch, error, success]);

	function setUserRatings() {
		const stars = document.querySelectorAll('.star');
		stars.forEach((star, index) => {
			star.starValue = index + 1;
			['click', 'mouseover', 'mouseout'].forEach(function (e) {
				star.addEventListener(e, showRatings);
			});
		});

		function showRatings(e) {
			stars.forEach((star, index) => {
				if (e.type === 'click') {
					if (index < this.starValue) {
						star.classList.add('red');
						setRating(this.starValue);
					} else {
						star.classList.remove('red');
					}
				}
				if (e.type === 'mouseover') {
					if (index < this.starValue) {
						star.classList.add('light-red');
					} else {
						star.classList.remove('light-red');
					}
				}
				if (e.type === 'mouseout') {
					star.classList.remove('light-red');
				}
			});
		}
	}
	const handleSubmit = () => {
		const reviewData = {
			roomId: id,
			comment,
			rating,
		};

		dispatch(newReview(reviewData));
		console.log('Im handleSubmit called!');
	};
	return (
		<div className='container'>
			<div className='row d-flex justify-content-between'>
				<button
					id='review_btn'
					type='button'
					className='btn btn-primary mt-4 mb-5'
					data-toggle='modal'
					data-target='#ratingModal'
					onClick={setUserRatings}
				>
					Submit Your Review
				</button>

				<div
					className='modal fade'
					id='ratingModal'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='ratingModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='ratingModalLabel'>
									Submit Review
								</h5>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								<ul className='stars'>
									<li className='star'>
										<i className='fa fa-star'></i>
									</li>
									<li className='star'>
										<i className='fa fa-star'></i>
									</li>
									<li className='star'>
										<i className='fa fa-star'></i>
									</li>
									<li className='star'>
										<i className='fa fa-star'></i>
									</li>
									<li className='star'>
										<i className='fa fa-star'></i>
									</li>
								</ul>
								<textarea
									name='review'
									id='review'
									className='form-control mt-3'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<button
									className='btn my-3 float-right review-btn px-4 text-white'
									data-dismiss='modal'
									aria-label='Close'
									onClick={handleSubmit}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewReview;
