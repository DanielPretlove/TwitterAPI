import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Graph from '../components/Graph';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300
	}
}));

/*
 * grabs the keyword that are currently being streamed
 * and maps it to the drop down box
*/
export default function DropDownMenu() {
	const classes = useStyles();
	const [selected, setSelected] = useState('');
	const { keywords } = useSelector((state) => state.tweets);

	const handleChange = (e) => {
		setSelected(e.target.value);
	};

	return (
		<>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel style={{ color: 'black' }}>
					Choose topic to analyse
				</InputLabel>
				<Select value={selected} onChange={handleChange}>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{keywords.map((k, i) => (
						<MenuItem value={k.name} key={i}>
							{k.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{selected && <Graph selected={selected} />}
		</>
	);
}
