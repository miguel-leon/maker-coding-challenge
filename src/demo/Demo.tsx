import RectToRectTransition from '../utils/RectToRectTransition';


export default function Demo() {
	const elWithTransition = RectToRectTransition({
		activeContainer: 'small',
		largeContainer: {
			x: 100,
			y: 100,
			width: 600,
			height: 400
		},
		smallContainer: {
			x: 100,
			y: 600,
			width: 200,
			height: 200
		},
		naturalSize: {
			width: 150,
			height: 100
		},
		smallFitRule: 'cover',
		largeFitRule: 'contain',
		duration: 1000,
		renderContent: render
	})

	return (
		<div>
			{ elWithTransition }
		</div>
	)
}

function render() {
	return (
		<h1>hello world</h1>
	)
}
