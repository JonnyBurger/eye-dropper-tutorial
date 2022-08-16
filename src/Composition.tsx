import {
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
	Video,
} from 'remotion';
import {random} from 'remotion';
import {useState} from 'react';
import React from 'react';
import {AbsoluteFill} from 'remotion';

const radius = 400;

const dropper: React.CSSProperties = {
	height: radius,
	width: radius,
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50%',
	border: '4px solid rgba(0, 0, 0, 0.15)',
	display: 'flex',
};

const dropperCenter: React.CSSProperties = {
	height: 20,
	width: 20,
	border: '4px solid rgba(255, 255, 255, 0.15)',
	borderRadius: 4,
};

const row: React.CSSProperties = {
	width: '80%',
	height: 100,
	borderRadius: 20,
	background: 'linear-gradient(to right, yellow, #4290f5,  red)',
};

export const MyComposition = () => {
	const [clipId] = useState(() => String(random(null)));
	const {height, width, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const spr = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const sprX = spring({
		fps,
		frame: frame - 5,
		config: {
			damping: 200,
		},
	});

	const press = spring({
		fps,
		frame: frame - 25,
		config: {
			damping: 200,
		},
		durationInFrames: 10,
	});

	const translateY = interpolate(spr, [0, 1], [height, 0]);
	const translateX = interpolate(sprX, [0, 1], [width / 2, 0]);

	const blueCircle1 = spring({
		fps,
		frame: frame - 35,
		config: {},
		durationInFrames: 30,
	});
	const blueCircle2 = spring({
		fps,
		frame: frame - 70,
		config: {damping: 200},
		durationInFrames: 20,
	});
	const blueCircle3 = spring({
		fps,
		frame: frame - 240,
		config: {damping: 200},
	});

	const scale = interpolate(press, [0, 1], [1, 0.7]) + blueCircle1 * 4;

	const vidScale = 1.5;

	const videoPush = spring({
		fps,
		frame: frame - 150,
		config: {damping: 200},
		durationInFrames: 45,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div style={row} />
			</AbsoluteFill>
			<AbsoluteFill>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						clipPath: `url(#${clipId})`,
					}}
				>
					<div style={{...row, transform: `scale(1.5)`}} />
				</AbsoluteFill>
				<AbsoluteFill>
					<svg viewBox={`0 0 ${width} ${height}`}>
						<circle
							r={Math.sqrt(width * width + height * height) * blueCircle1}
							cx={width / 2}
							cy={height / 2}
							fill="#4290f5"
						/>
					</svg>
				</AbsoluteFill>

				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: translateY,
						marginLeft: translateX,
					}}
				>
					<div style={{...dropper, transform: `scale(${scale})`}}>
						<div style={dropperCenter} />
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
			<AbsoluteFill>
				<svg viewBox={`0 0 ${width} ${height}`} width={0} height={0}>
					<defs>
						<clipPath id={clipId}>
							<circle
								r={(radius / 2) * scale}
								cx={width / 2 + translateX}
								cy={height / 2 + translateY}
							/>
						</clipPath>
					</defs>
				</svg>
			</AbsoluteFill>
			<AbsoluteFill>
				<AbsoluteFill
					style={{
						transform: `translateY(${interpolate(
							blueCircle2,
							[0, 1],
							[height, 0]
						)}px)`,
						backgroundColor: 'white',
					}}
				>
					<Sequence
						from={70}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							transform: `scale(${vidScale * 2}) translateX(${interpolate(
								videoPush,
								[0, 1],
								[300, 0]
							)}px) translateY(${
								interpolate(videoPush, [0, 1], [150, 130]) + blueCircle3 * 500
							}px)`,
						}}
					>
						<Video
							style={{
								height: 600,
								borderRadius: 4,
								boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
							}}
							startFrom={30}
							src={staticFile('screenrec.mov')}
						/>
					</Sequence>
				</AbsoluteFill>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					transform: `translateY(${interpolate(
						blueCircle3,
						[0, 1],
						[-height, 0]
					)}px)`,
				}}
			>
				<div style={row} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
