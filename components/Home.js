import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/roomActions';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	let { page = 1 } = router.query;
	page = Number(page);
	const { rooms, resPerPage, roomsCount, filteredRoomCount, error } =
		useSelector((state) => {
			return state.allRooms;
		});

	useEffect(() => {
		toast.error(error);
		dispatch(clearErrors());
	}, []);

	const handlePagination = (pageNumber) => {
		window.location.href = `/?page=${pageNumber}`;
	};
	let count = roomsCount;
	if (location) {
		count = filteredRoomCount;
	}
	return (
		<React.Fragment>
			<section id='rooms' className='container mt-5'>
				<h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

				<Link href='/search'>
					<a className='ml-2 back-to-search'>
						<i className='fa fa-arrow-left'></i> Back to Search
					</a>
				</Link>
				<div className='row'>
					{rooms && rooms.length === 0 ? (
						<div className='alert alert-danger mt-5 ml-1 w-100'>
							<b>No Room.</b>
						</div>
					) : (
						rooms &&
						rooms.map((room) => <RoomItem key={room._id} room={room} />)
					)}
				</div>
			</section>
			{resPerPage < count && (
				<div className='d-flex justify-content-center mt-5'>
					<Pagination
						activePage={page}
						itemsCountPerPage={resPerPage}
						totalItemsCount={roomsCount}
						onChange={handlePagination}
						firstPageText={'First'}
						lastPageText={'Last'}
						itemClass='page-item'
						linkClass='page-link'
					/>
				</div>
			)}
		</React.Fragment>
	);
};

export default Home;
