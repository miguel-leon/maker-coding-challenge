import React, { useState } from 'react'

import './RectToRectTransition.scss'


export default function RectToRectTransition({
	activeContainer: initialContainer,
	largeContainer,
	smallContainer,
	naturalSize,
	smallFitRule,
	largeFitRule,
	duration,
	renderContent
}: RectToRectTransition) {
	const containers = {
		small: { ...smallContainer, fit: smallFitRule },
		large: { ...largeContainer, fit: largeFitRule },
	}

	const [activeContainer, setActiveContainer] = useState(initialContainer)
	const [contentStyle, setContentStyle] = useState(calculateTransform(initialContainer))

	return (
		<div className={ 'container' } style={ toStyle(largeContainer) }>
			<div className={ 'container' } style={ toStyle(smallContainer) }>
				<div className={ 'content' } style={ contentStyle } onClick={ () => toggleContainer() }>
					{ renderContent({}) }
				</div>
			</div>
		</div>
	)

	function calculateTransform(container: Container) {
		const { x, y, width, height, fit } = containers[container]

		const scaleX = width / naturalSize.width,
			scaleY = height / naturalSize.height,
			scale = fit === 'cover' ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY)

		const clipX = naturalSize.width - width / scale,
			clipY = naturalSize.height - height / scale

		const left = clipX / 2,
			top = clipY / 2,
			right = naturalSize.width - left,
			bottom = naturalSize.height - top

		return {
			...naturalSize,
			transform: `translate(${ x - left * scale }px, ${ y - top * scale }px) scale(${ scale })`,
			clip: `rect(${ top }px, ${ right }px, ${ bottom }px, ${ left }px)`,
			transitionDuration: `${ duration }ms`
		}
	}

	function toggleContainer() {
		const container = activeContainer === 'small' ? 'large' : 'small'
		setActiveContainer(container)
		setContentStyle(calculateTransform(container))
	}
}


type Container = 'small' | 'large'

interface Size {
	width: number
	height: number
}

interface Position {
	x: number
	y: number
}

type FitRule = 'cover' | 'contain'


interface RectToRectTransition {
	activeContainer: Container
	largeContainer: Size & Position
	smallContainer: Size & Position
	naturalSize: Size
	smallFitRule: FitRule
	largeFitRule: FitRule
	duration: number
	renderContent: React.FunctionComponent
}

function toStyle({ y: top, x: left, width, height }: Size & Position) {
	return { top, left, width, height }
}
