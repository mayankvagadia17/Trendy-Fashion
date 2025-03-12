const Header = ({ title }) => {
	return (
		<header className='custom-bg-sidebar backdrop-blur-md shadow-lg border-b border-gray-700 rounded'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
		</header>
	);
};
export default Header;
