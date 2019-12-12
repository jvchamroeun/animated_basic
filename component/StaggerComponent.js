import React, { Component } from 'react';
import { 
	StyleSheet, Text, View, 
	Animated, Easing,
} from 'react-native';

export default class StaggerComponent extends Component {
	constructor() {
		super();
		var animatedValues = [];
		for (var i = 0; i < 1000; i++) {
			animatedValues.push(new Animated.Value(0));
		}
		this.state = {
			animatedValues: animatedValues
		};
	}

	componentDidMount() {
		this.staggerAnimate();
	}

	staggerAnimate = () => {
		const animations = this.state.animatedValues.map((animatedValue) => {
			return Animated.timing(
				animatedValue,
				{
					toValue: 1,
					duration: 3000
				}
			)
		});
		Animated.stagger(10, animations).start();
	}
	render() {
		const animatedViews = this.state.animatedValues.map((animatedValue, index) =>{
			return <Animated.View 
				key={index}
				style={[styles.animatedView, {
					opacity: animatedValue,
					backgroundColor: index % 2 === 0 ? 'skyblue' : 'steelblue' 
				}]}
			/>
		});
		return(
			<View style={styles.container}>
				{animatedViews}
			</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 40,
	},
	animatedView: {
		height: 40,
		width: 40,
		borderRadius: 20,
		// backgroundColor: 'red',
		margin: 3,
	},
})

