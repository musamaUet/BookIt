import Layout from '../components/layout/Layout';
import Home from '../components/Home';
import { getRooms } from '../redux/actions/roomActions';
import { wrapper } from '../redux/store';

function Index() {
	return (
		<Layout>
			<Home />
		</Layout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, query }) => {
			await store.dispatch(getRooms(req, query.page));
		}
);

export default Index;
