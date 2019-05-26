import React, { Fragment, useState, useEffect } from 'react';

const App = () => {
	const [count, setCount] = useState(0);
	const [isOn, setIsOn] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: null, y: null });
	const [status, setStatus] = useState(navigator.onLine);

	useEffect(
		() => {
			//componentDidMount and componentDidUpdate
			document.title = `You have clicked ${count} times`;
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('online', handleOnline);
			window.addEventListener('offline', handleOffline);

			//componentWillUnmount
			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('online', handleOnline);
				window.removeEventListener('offline', handleOffline);
			};
		},
		/**
		 * With this EMPYT array, the useEffect ONLY run on Mount and Unmount.
		 * With this array with some value/variable, the useEffect will be run on Mount, Unmount and when this value/variable change.
		 */
		[count]
	);

	const handleOnline = () => {
		setStatus(true);
	};

	const handleOffline = () => {
		setStatus(false);
	};

	const handleMouseMove = event => {
		setMousePosition({
			x: event.pageX,
			y: event.pageY
		});
	};

	const incrementCount = () => {
		setCount(prevCount => prevCount + 1);
	};

	const toggleLight = () => {
		setIsOn(prevIsOn => !prevIsOn);
	};

	return (
		<Fragment>
			<h2>{'Counter'}</h2>
			<button
				onClick={incrementCount}
			>{`LOL! I was clicked ${count} times.`}</button>
			<h2>{'Toggle Light'}</h2>
			<img
				src={
					isOn
						? 'https://icon.now.sh/highlight/fd0'
						: 'https://icon.now.sh/highlight/aaa'
				}
				style={{
					height: '50px',
					width: '50px'
				}}
				alt={'Flashlight'}
				onClick={toggleLight}
			/>
			<h2>{'Mouse Position'}</h2>
			<p>{JSON.stringify(mousePosition, null, 2)}</p>
			<br />
			<h2>{'Network Status'}</h2>
			<p>{`You are ${status ? 'online' : 'offline'}`}</p>
			<br />
		</Fragment>
	);
};

export default App;
