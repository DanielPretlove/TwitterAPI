import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Tooltip
} from 'recharts';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

/*
 * graphs the positive, netural and negative tweets of the current keyword 
*/
const Graph = ({ selected }) => {
	const keywords = useSelector((state) =>
		state.tweets.keywords.filter((k) => k.name === selected)
	);

	let data = [
		{
			name: 'Positive',
			'amount of tweet(s)': keywords[0].positive
		},
		{
			name: 'Neutral',
			'amount of tweet(s)': keywords[0].neutral
		},
		{
			name: 'Negative',
			'amount of tweet(s)': keywords[0].negative
		}
	
	];

	return (
		<Container maxWidth="sm">
			<LineChart
				width={600}
				height={450}
				data={data}
				style={{ margin: 'auto' }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Legend />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="amount of tweet(s)"
					stroke="#8884d8"
					// activeDot={{ r: 8 }}
				/>
			</LineChart>
			<span>
				Positive:{keywords[0].positive}
				<br />
				Neutral:{keywords[0].neutral}
				<br />
				Negative:{keywords[0].negative}
				<br />
				Total:
				{keywords[0].positive + keywords[0].neutral + keywords[0].negative}
				<br />
			</span>
		</Container>
	);
};

export default Graph;
